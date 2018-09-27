// declaratie van de overview
const parkingOverview = document.getElementById('parking-overview');
let parent = document.getElementById("parking-overview");

// functie expressie om JSON-request via url uit te voeren
const getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

// get json data
getJSON('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json', function(error, data) {
    
    // show error
    if(error) {
        
        // do something here

        return false;
    }

    // loop through all parking places
    for(let i = 0; i < data.length; i++) {

        // current parking object
        let parking = data[i];

        // do magic here
        makeDiv(parent,parking);
        
    }
});

function makeDiv(parent, parking){
    let div = document.createElement('DIV');
    div.className = "parking";

    parent.appendChild(div);

    let h2 = document.createElement('H2');
    div.appendChild(h2);
    let name = document.createTextNode(parking.description);
    h2.appendChild(name)

    let ul = document.createElement('UL');
    div.appendChild(ul);

    let li = document.createElement('LI');
    ul.appendChild(li);
    let totalCapacity = document.createTextNode("Capaciteit: " + parking.totalCapacity);
    li.appendChild(totalCapacity)

    let li2 = document.createElement('LI');
    ul.appendChild(li2);
    let availableCapacity = document.createTextNode("Beschikbaar: " + parking.parkingStatus.availableCapacity);
    li2.appendChild(availableCapacity)

    checkAvailableCapacity(parking.totalCapacity, parking.parkingStatus.availableCapacity, div)
}
function checkAvailableCapacity(totalCapacity, availableCapacity, div){
    
    //console.log(procent + " - " + availableCapacity);
    if(availableCapacity > totalCapacity*0.5){
        div.style.backgroundColor = "lightgreen";
    }
    else if(availableCapacity <= totalCapacity*0.5 && availableCapacity >= totalCapacity*0.2){
        div.style.backgroundColor = "orange";
    }
    else if(availableCapacity < totalCapacity*0.2){
        div.style.backgroundColor = "tomato";
    }
}


