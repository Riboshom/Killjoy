

var filterId = 1;

document.addEventListener('DOMContentLoaded', function()
{
	
	document.getElementById('addFilterButton').addEventListener('click', addFilterLine);
	
}, false);


function addFilterLine(){
		var div = document.createElement('div');
		
		div.id = "filter" + filterId;
		
		
		div.innerHTML = "<form name = 'filter" + filterId + "' onsubmit= 'addFilter()'>" +
						"<input type = 'url' name = 'pattern' required = 'true' width = '20%'>" +  
						"<input type = 'time' name = 'timeAllowed' required = 'true' width = '20%'>" +
						"<select name = 'timeUpPolicy' width = '20%'>" +
						
							"<option value = 'DENY'>Bloquer l&rsquo;acc&egrave;s</option>" +
							"<option value = 'ALERT' selected>Afficher un avertissement</option>" +
						
						"</select>" +
						"<input type = 'submit' value = 'Ajouter' width = '20%'>" +
					"</form>" +
					"<button id = 'removeButton" + filterId + "' type = 'button' class = 'removeButton' width = '20'>X</button>";
		
		document.getElementById('filterContainer').appendChild(div);
		
		document.getElementById('removeButton' + filterId).addEventListener('click', function(){
			
			//DOSTUFF TO REMOVE FILTER FROM BLACKLIST
			removeFilterLine(filterId);
	
	console.log("removed line");
}});
		
		console.log('Added line');
		
		filterId++;
	}

function removeFilterLine()	 {
	console.log('Removing filter ' + removeId);
	divToRemove = document.getElementById('filter'+removeId);
	divToRemove.parentNode.removeChild(divToRemove);
	
}

function addFilter(){
	
	

}



console.log('Popup script loaded');