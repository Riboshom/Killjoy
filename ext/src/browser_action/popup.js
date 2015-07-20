

var filterId = 1;

document.addEventListener('DOMContentLoaded', function()
{
	
	document.getElementById('addFilterButton').addEventListener('click', addFilterLine);
	
}, false);

function populateTable(){
	
	var alarms = chrome.alarms.getAll(function(alarmArray){
		
		alarmArray.forEach(function(alarm){
			
			addFilterLine(alarm);
			
		});
		
	});
	
	
}

function addFilterLine(alarm){
		/*var div = document.createElement('div');*/
		var tableRow = document.createElement('tr');
		var pattern = alarm.name;
		
		chrome.runtime.sendMessage({
			request: "blacklist"
		},
		function(response) {
		  var blacklist = response.obj;
		  var filter = blacklist.getFilterByPattern(pattern);
		var time = Date.now()-alarm.scheduledTime;
		});
		
		div.id = "filter" + filterId;

		
		
		/*
		div.innerHTML = "<form name = 'filter" + filterId + "' onsubmit= 'addFilter()'>" +
						"<input type = 'url' name = 'pattern' required = 'true' width = '20%'>" +  
						"<input type = 'time' name = 'timeAllowed' required = 'true' width = '20%'>" +
						"<input type='hidden' name='lineId' value= '" + filterId + "'>" +
						"<select name = 'timeUpPolicy' width = '20%'>" +
						
							"<option value = 'DENY'>Bloquer l&rsquo;acc&egrave;s</option>" +
							"<option value = 'ALERT' selected>Afficher un avertissement</option>" +
						
						"</select>" +
						"<input type = 'submit' value = 'Ajouter' width = '20%'>" +
					"</form>" +
					"<button id = 'removeButton" + filterId + "' type = 'button' class = 'removeButton' width = '20'>X</button>";
		*/
		
		row.innerHTML = "<tr> <td>" + pattern + "</td>" + "<td>" + time + "</td> </tr>";
		
		document.getElementById('filterTable').appendChild(row);
		
		/*document.getElementById('filterContainer').appendChild(div);*/
		
		document.getElementById('removeButton' + filterId).addEventListener('click', function(){
			
			//DOSTUFF TO REMOVE FILTER FROM BLACKLIST
			removeFilterLine(filterId);
	
			console.log("removed line");
});
		
		console.log('Added line');
		
		filterId++;
	}

function removeFilterLine(removeId)	 {
	console.log('Removing filter ' + removeId);
	var divToRemove = document.getElementById('filter'+removeId);
	console.log('Removing content of : ' + divToRemove-1);
	var parent = divToRemove.parentNode;
	
	parent.removeChild(divToRemove);
	
}

function addFilter(){
	
	

}



console.log('Popup script loaded');