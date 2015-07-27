function init(){
  this.filters = chrome.storage.sync.get('filters', function(response){
    console.log("Filtres " + filters + " chargés en options");
  });

  this.settings = [];
  var timeOptions = {
    "values" : [
      {
        "value" : 0,
        "text" : "Instant"
      },{
        "value" : 15,
        "text" : "15 min"
      },{
        "value" : 30,
        "text" : "30 min"
      },{
        "value" : 60,
        "text" : "1 h"
      },{
        "value" : 90,
        "text" : "1.5 h"
      },{
        "value" : 120,
        "text" : "2 h"
      },{
        "value" : 180,
        "text" : "3 h"
      },{
        "value" : 240,
        "text" : "4 h"
      },{
        "value" : 300,
        "text" : "5 h"
      },{
        "value" : 360,
        "text" : "6 h"
      },{
        "value" : 420,
        "text" : "7 h"
      },{
        "value" : 480,
        "text" : "8 h"
      },{
        "value" : 540,
        "text" : "9 h"
      },{
        "value" : 600,
        "text" : "10 h"
      },{
        "value" : 660,
        "text" : "11 h"
      },{
        "value" : 720,
        "text" : "12 h"
      },{
        "value" : 780,
        "text" : "13 h"
      },{
        "value" : 840,
        "text" : "14 h"
      },{
        "value" : 900,
        "text" : "15 h"
      },{
        "value" : 960,
        "text" : "16 h"
      },{
        "value" : 1020,
        "text" : "17 h"
      },{
        "value" : 1080,
        "text" : "18 h"
      },{
        "value" : 1140,
        "text" : "19 h"
      },{
        "value" : 1200,
        "text" : "20 h"
      },{
        "value" : 1260,
        "text" : "21 h"
      },{
        "value" : 1320,
        "text" : "22 h"
      },{
        "value" : 1380,
        "text" : "23 h"
      },{
        "value" : 1440,
        "text" : "24 h"
      }
    ]
  }

  for(i = 0; i < filtres.length; i++){
    var pattern = {};
    var time = {};
    var policy = {};
    var timeOut = {};
    /*pattern pattern*/
    pattern["tab"] = "Filtres";
    pattern["group"] = "Filtre " + (i+1);
    pattern["name"] = "pattern" + i + "Pattern";
    pattern["type"] = "text";
    pattern["label"] = "Masque : ";
    pattern["text"] = "Veuillez entrer un site web valide";
    pattern["default"] : filter.filterPattern;
    
    settings.push(filter);
    
    /*Time allowed*/
    time["tab"] = "Filtres";
    time["group"] = "Filtre " + (i+1);
    time["name"] = "time" + i;
    time["type"] = "PopupButton";
    time["label"] = "Temps allou&eacute; : "
    time["options"] = timeOptions;
    time["default"] = 60; //si ça marche pas mettre "1h" je sais pas encore si ça fonctionne
    
    settings.push(time);
    
    /*End of allowed time policy*/
    policy["tab"] = "Filtres";
    policy["group"] = "Filtre " + (i+1);
    policy["name"] = "policy" + i;
    policy["type"] = "PopupButton";
    policy["label"] = "Type de filtre : "
    policy["options"] = {
      "values" : [
        {
          "value" : "DENY";
          "text" : "Bloquer"
        },
        {
          "value" : "ALERT";
          "text" : "Avertissement"
        }
    };
    policy["default"] = filter.expirationPolicy; //voir ligne 170
    
    
    settings.push(policy);
    
    /*The time in-between re-activations of filters*/
    timeOut["tab"] = "Filtres";
    timeOut["group"] = "Filtre " + (i+1);
    timeOut["name"] = "timeOut" + i;
    timeOut["type"] = "PopupButton";
    timeOut["label"] = "Temps inactif : "
    timeOut["options"] = timeOptions;
    timeOut["default"] = filter.expirationPolicy;
    
    settings.push(timeout);
  }
}

this.manifest = {
    "name": "Killjoy",
    "icon": "icon.png",
    "settings": this.settings
};
