var currentFlightList = [];
var flightListQ3;
/************************************/
function getToDate() {
  var d = new Date();
      
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month,year].join('-');
}

function find_flight_q3_departure(list, item) {
  item = item.toLowerCase();
  
  if (item) {
    if (item !== "") {
      for (i = 0; i < list.length; i++) {
        if (list[i].Show.toLowerCase() === item) {
          $('.rt-btn.rt-btn-next').show(); 
          return true;
        }
      }
    }
  }
  $('.rt-btn.rt-btn-next').hide(); 
  return false;
}

function load_flight_q3_departure() {
  flightListQ3 = JSON.parse(departuresFlightList);
}


function notDeparted_flight_search(flight_time) {
  var current_time = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin', hour12: false});
  //15:13:27
  var current_time_value  = current_time.substring(current_time.length-8,current_time.length-6) * 60;
  current_time_value += current_time.substring(current_time.length-5,current_time.length-3)*1;

  //Time: 0805    
  var flight_time_value = flight_time.substring(0,2) * 60 + flight_time.substring(2,4)*1;
  
  //plus  4 hour
  flight_time_value = flight_time_value + 240;

  var result = (flight_time_value > current_time_value);
  return (result);
}

function search_flight_q3_departure() {
  var input = document.getElementById('inputFlightCodeQ3ID').value;
  var searchList = document.getElementById('flightSearchList');
  
  searchList.innerHTML = '';
  currentFlightList = [];
  currentFlightList.length = 0;
  input = input.toLowerCase();

  var today = getToDate();
  var count = 0;
  for (i = 0; i < flightListQ3.length; i++) {
    let flight = flightListQ3[i];

    if ((today == flight.Date) 
        && notDeparted_flight_search(flight.Time)) //today flight && departure{ 
    {      
      if (flight.Show.toLowerCase().includes(input)) {
        const elem = document.createElement("option");
        elem.value = flight.Show;
        searchList.appendChild(elem);
        currentFlightList.push(flight);
        count++;
      }
    }
    
    if (count > 30) {
      break;
    }
  }

  if (find_flight_q3_departure(flightListQ3, document.getElementById('inputFlightCodeQ3ID').value)) {
    console.log("Found ", document.getElementById('inputFlightCodeQ3ID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputFlightCodeQ3ID').value);
  }  
  
  console.log("search_flight_q3_departure done!");
}

function select_flight_q3_departure() {
  var selectedFlight = document.getElementById('inputFlightCodeQ3ID').value;
  var flightDestinationValue;
  var found = false;
 //$('.rt-btn.rt-btn-next').hide(); 

  for (i = 0; i < currentFlightList.length; i++) {
    var currentFlight = currentFlightList[i];
    if (currentFlight.Show == selectedFlight) { 
      flightDestinationValue = currentFlight.Airport_name + " (" + currentFlight.Airport_code  + ")";
      api.fn.answers({flightDestination: flightDestinationValue});

      api.fn.answers({Core_q3_ext:  selectedFlight});
      api.fn.answers({Core_q3_Airline:  currentFlight.Airline });
      api.fn.answers({Core_q3_Airport:  flightDestinationValue });
      api.fn.answers({flightDestination:  flightDestinationValue });
      api.fn.answers({Core_q3_Flight_Number:  currentFlight.Flight });

      if (currentFlight.Schengen) api.fn.answers({Schengen_flight:  currentFlight.Schengen});
      
      found = true;
      $('.rt-btn.rt-btn-next').show(); 
      break;
    }
  }
  if (!found) {
    alert("Please select a flight number from the list.");
  }
}

function showFlightCodeSection_q3_departure() {
  load_flight_q3_departure();

  $('.rt-element.rt-text-container').append(`<input list="flightSearchList" onchange="select_flight_q3_departure()"  onkeyup="search_flight_q3_departure()" name="inputFlightCodeQ3ID" id="inputFlightCodeQ3ID" >
  <datalist id="flightSearchList"> </datalist>`);

  var currentValue  = api.fn.answers().Core_q3_departure_ext;
  if (currentValue) {
    if (currentValue !== "") {
      document.getElementById('inputFlightCodeQ3ID').value = currentValue;
    }
  }

  if (find_flight_q3_departure(flightListQ3, document.getElementById('inputFlightCodeQ3ID').value)) {
    console.log("Found ", document.getElementById('inputFlightCodeQ3ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputFlightCodeQ3ID').value);
  }
  $('#inputFlightCodeQ3ID').show(); 
}


function hideFlightCodeSection_q3_departure() {
  $('#inputFlightCodeQ3ID').hide();
  //var x = document.getElementById('inputFlightCodeQ3ID');
  //x.style.display = "none";
}