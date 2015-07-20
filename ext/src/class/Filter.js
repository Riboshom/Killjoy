/*
The base for filters used in usage-monitoring extensions.
Contributing authors : Gabriel Dupont-Francoeur

*/

/*-------------------------------------Filter class------------------------------------------*/

//Contructor.
var Filter = function(filterPattern,timeAllowed){
	this.filterPattern = filterPattern;
	this.timeAllowed = timeAllowed;
	
};

//Determines the action taken after the time allowed has counted down to zero
Filter.prototype.timeUpPolicy = function(){
	
	//TODO
};

//Determines the action taken after the filter has expired
Filter.prototype.expirationPolicy = function(){
	
	//TODO
};

/*------------------------ActiveFilter class (inherits from filter)----------------------------*/
//Consider splitting in two files
function ActiveFilter(filterPattern, timeAllowed,timeOfActivation){
	Filter.call(this, filterPattern, timeAllowed);
	this.timeOfActivation = timeOfActivation;
};