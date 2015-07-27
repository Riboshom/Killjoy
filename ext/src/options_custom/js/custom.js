

var filterId = 1;
var filterList; //filter list. only used on page load
var policyType;
var policyTime;
var policyTimeMin;
var policyTimeHours;

var blacklist;


$(document).ready(function(){
	
	var emptyArray = [];
	populateContainer();
	$("#addFilterButton").on('click', function(){
		
		addFilterLine("true", emptyArray, true )
	
	
	});
});


	  
//Add preexisting filters
function populateContainer(){
	
	refreshBlackList().then(function(){
		var argsArray = [];
		filterList = blacklist.refFilterList;
		for (var index = 0; index < filterList.length; ++index) {
			if(filterList[index].timeAllowedPolicy.hasOwnProperty("delay")){
				policyType = "AFTER";
				policyTime = (filterList[index].timeAllowedPolicy.delay);
			}else{
					
				policyType = "AT";
				policyTime = (filterList[index].timeAllowedPolicy.mark).getTime();
					
			}
			policyTimeMin = ~~(policyTime/60000);

			policyTimeHours = (Math.floor(policyTimeMin / 60) ) % 24;

			argsArray[0]= filterList[index].filterPattern.replace("/", "//");
			argsArray[1]= pad(policyTimeHours.toString()) + ":" + pad(policyTimeMin % 60).toString() ;
			argsArray[2]= policyType;

			addFilterLine("true", argsArray, false);

		}
	
	});

	
	
	
}
//Add a filter line. disabled : html disabled property (String), args : default values for input, append : append or prepend to end of div
function addFilterLine(disabled, args, append){
		var div = document.createElement('div');
		var newFilter;
		console.log("Arguments length : " + args.length);
		//var tableRow = document.createElement('tr');
		if(args.length == 0){
			
			newFilter = true;
		
		}else{
		
			newFilter = false;
			
		}
		
		/*chrome.runtime.sendMessage({
			request: "blacklist"
		},
		function(response) {
		  var blacklist = response.obj;
		  var filter = blacklist.getFilterByPattern(pattern);
		var time = Date.now()-alarm.scheduledTime;
		});*/
		
		/*div.id = "filter" + filterId;*/

		
		
		if(newFilter){
		div.innerHTML = "<form id = 'filter" + filterId + "' action = '#'>" +
						"<div class = 'inputDiv'><input type = 'url' name = 'pattern' required = 'true' width = '20%' disabled = '" + disabled + "'></div>" +  
						"<div class = 'inputDiv'><input type = 'time' name = 'timeAllowed' required = 'true' width = '20%' disabled = '" + disabled + "'></div>" +
						"<input type='hidden' name='lineId' value= '" + filterId + "'>" +
						"<div class = 'inputDiv'><select name = 'timeUpPolicy' width = '20%' disabled = '" + disabled + "'>" +
						
							"<option value = 'AT'>Partir au temps indiqu&eacute;</option>" +
"<option value = 'AFTER' selected>Bloquer apr&egrave;s le temps indiqu&eacute;</option>" +
						
						"</select></div>" +
						"<div class = 'inputDiv'><input type = 'submit' value = 'Ajouter' width = '20%' disabled = '" + disabled + "'></div>" +
					"</form>" +
					"<div class = 'inputDiv'><button id = 'removeButton" + filterId.toString() + "' type = 'button' class = 'removeButton' width = '20' onclick = 'removeFilterLine("+ filterId +")'>X</button></div><br>";
		
		}else{
			
			div.innerHTML = "<form id = 'filter" + filterId + "' action = '#'>" +
						"<div class = 'inputDiv'><input type = 'url' name = 'pattern' value = '" + args[0] + "' required = 'true' width = '20%' disabled = '" + disabled + "'></div>" +  
						"<div class = 'inputDiv'><input type = 'time' name = 'timeAllowed' value = '" + args[1] + "'required = 'true' width = '20%' disabled = '" + disabled + "'></div>" +
						"<input type='hidden' name='patternAsId' value= '" + args[0] + "'>" +
						"<div class = 'inputDiv'><select name = 'timeUpPolicy' value = '" + args[2] + "' width = '20%' disabled = '" + disabled + "'>" +
						
							"<option value = 'AT'>Partir au temps indiqu&eacute;</option>" +
"<option value = 'AFTER' selected>Bloquer apr&egrave;s le temps indiqu&eacute;</option>" +
						
						"</select></div>" +
						"<div class = 'inputDiv'><input type = 'submit' value = 'Ajouter' width = '20%' disabled = '" + disabled + "'></div>" +
					"</form>" +
					"<div class = 'inputDiv'><button id = 'removeButton" + filterId.toString() + "' type = 'button' class = 'removeButton' width = '20' onclick = 'removeFilter("+ args[0] +")'>X</button></div><br>";
			
			
		}
		if(append){
			$('#filterContainer').append(div);
		}else{
			$('#filterContainer').prepend(div);
		}
		$('#filter' + filterId).submit(function () {
				console.log('Adding filter ' + filterId);
			addFilter($(this).attr("id"));
		 return false;
		});
		
		/*document.getElementById('filterContainer').appendChild(div);*/
		
		
		console.log('Added line');
		
		filterId++;
	}

function removeFilter(removePattern)	 {
	var filterToRemove;
	refreshBlackList().then(function(){
	filterToRemove = blacklist.getFilterByPattern(removePattern);
	blacklist.remove(filterToRemove);
	chrome.storage.local.set({'blacklist': blacklist});
	location.reload();
	});
}

function addFilter(filterFormName){
	var form;
	var pattern;
	var time;
	var policy;
	var newPattern;
	var timeArray;
	var timeMin;
	//only adds. does not edit.
	
	var inputs = $("#"+filterFormName).serializeArray();
	
	console.log("Content of " + filterFormName + " : " + inputs);
	
	jQuery.each( inputs, function( i, field ) {
      switch (field.name){
		  
		  case "pattern" :
			
			pattern = field.value;
		  
			break;
			
		case "timeAllowed" :
		
			time = field.value;
			
			break;
			
		case "timeUpPolicy" :
		
		
			policy = field.value;
		
			break;
			
		
		
		  
	  }
	  
    });
	
	newPattern = pattern.replace(/.*?:\/\/www/g, "*");
	newPattern = newPattern.replace(/.*?:\/\//g, "*");
	
	timeArray = time.split(":");
	timeMin = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
	var filterToAdd = new Filter(newPattern,  new TimePolicy(policy, timeMin), function(){
			
			//dostuff at timeUpPolicy
			
		
		return true
		}, function(){
			
			//dostuff at expirationpolicy
			
			return true
		});
	
	
	console.log("adding filter : " + "" + newPattern.toString() + ", " + policy + timeMin + ", " + policy.toString());
	//document.getElementById(
	
	refreshBlackList();
		
	blacklist.add(filTerToAdd);
	chrome.storage.local.set({'blacklist': blacklist});
	$("#"+filterFormName + " :input").prop("disabled", true);
}
//http://stackoverflow.com/questions/8089875/show-a-leading-zero-if-a-number-is-less-than-10
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function refreshBlackList() {
 return new Promise(function (resolve, reject) {
    chrome.storage.local.get('blacklist', (function(item){
      if(item.blacklist === undefined || Object.keys(item.blacklist).length === 0){
        this.blacklist = new Blacklist(defaultFilters)
        chrome.storage.local.set({'blacklist': this.blacklist});
        console.log('Blacklist created');
        resolve()
      } else {
        this.blacklist = item.blacklist;
        this.blacklist.__proto__ = Blacklist.prototype;
        this.blacklist.restorePrototypes();
        console.log('Blacklist loaded');
        resolve()
      }
    }).bind(this));
  }.bind(this));
}
console.log('Settings script loaded');
