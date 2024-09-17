var postalCodeq8;

function find_postal_code_q8(list, item) {
  item = item.toLowerCase();
  
  if (item) {
    if (item !== "") {
      for (i = 0; i < list.length; i++) {
        if (list[i].Name.toLowerCase() === item) {
          $('.rt-btn.rt-btn-next').show(); 
          return true;
        }
      }
    }
  }
  $('.rt-btn.rt-btn-next').hide(); 
  return false;
}

function load_postal_code_q8() {
  console.log("load_postal_code_q8 started...");

  var country = api.fn.answers().Q8_Core_Q27_6_text;

  console.log("Q8_Core_Q27_6_text: country...", country);

  

  if (country.includes('Czech Republic'))  {
    postalCodeq8 = JSON.parse(postalCodeCzech);
  } 
  else if (country.includes('Germany')) {
    postalCodeq8 = JSON.parse(postalCodeGermany);
  }
  else if (country.includes('Poland'))  {
    postalCodeq8 = JSON.parse(postalCodePoland);
  }
  else {
    postalCodeq8 = JSON.parse(postalCodeNone);
  }

  console.log("load_postal_code_q8 done!");
}

function search_postal_code_q8() {
  var input = document.getElementById('inputpostalCodeq8ID').value;
  var list = document.getElementById('postalCodeq8List');
  
  list.innerHTML = '';
  input = input.toLowerCase();

  console.log("search_postal_code_q8 started...");
  var count = 0;
  for (i = 0; i < postalCodeq8.length; i++) {
    let postcalCode = postalCodeq8[i];

    if (postcalCode.Name.toLowerCase().includes(input)) {
      const elem = document.createElement("option");
      elem.value = postcalCode.Name;
      list.appendChild(elem);
      count++;
    }
    if (count > 30) break;
  }

  console.log("search_postal_code_q8 done!");
  
  if (find_postal_code_q8(postalCodeq8, document.getElementById('inputpostalCodeq8ID').value)) {
    console.log("Found ", document.getElementById('inputpostalCodeq8ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputpostalCodeq8ID').value);
  }
}

function select_postal_code_q8() {
  var postalCode = document.getElementById('inputpostalCodeq8ID').value;
  api.fn.answers({Q8_Core_q27_postal_code:  postalCode});
  api.fn.answers({urlVar18:  postalCode});
  console.log("q27_search_list:", postalCode);
  
    
  if (find_postal_code_q8(postalCodeq8, document.getElementById('inputpostalCodeq8ID').value)) {
    console.log("Found ", document.getElementById('inputpostalCodeq8ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputpostalCodeq8ID').value);
    alert("Please select a postal code from the list.");
  }

  console.log("select_postal_code_q8 done!");
}

function showPostalCodeSection_q8() {
    load_postal_code_q8();  

    $('.rt-element.rt-text-container').append(`<input list="postalCodeq8List" onchange="select_postal_code_q8()"  onkeyup="search_postal_code_q8()" name="inputpostalCodeq8ID" id="inputpostalCodeq8ID" >
    <datalist id="postalCodeq8List"> </datalist>`);
    document.getElementById('inputpostalCodeq8ID').value = "";

    var currentValue  = api.fn.answers().urlVar18;
    if (currentValue) {
      if (currentValue !== "") {
        //document.getElementById('inputpostalCodeq8ID').value = currentValue;
      }
    }

    if (find_postal_code_q8(postalCodeq8, document.getElementById('inputpostalCodeq8ID').value)) {
      console.log("Found ", document.getElementById('inputpostalCodeq8ID').value);
    }
    else{
      console.log("not found ", document.getElementById('inputpostalCodeq8ID').value);
    }

    $('.rt-btn.rt-btn-next').hide(); 
    $('#inputpostalCodeq8ID').show(); 
}

function hidePostalCodeSection_q8() {
  $('#inputpostalCodeq8ID').hide();
}

