var postalCode_q12;

function find_postal_code_q12(list, item) {
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

function load_postal_code_q12() {
  console.log("load_postal_code_q12 started...");

  var country = api.fn.answers().Q12_6_text;

  if (country.includes("Czech Republic"))  {
    postalCode_q12 = JSON.parse(postalCodeCzech);
  } else if (country.includes("Germany")) {
    postalCode_q12 = JSON.parse(postalCodeGermany);
  }
  else if (country.includes("Poland"))  {
    postalCode_q12 = JSON.parse(postalCodePoland);
  }
  else {
    postalCode_q12 = JSON.parse(postalCodeNone);
  }

  console.log("country: ", country);
  console.log("load_postal_code_q12 done!");
}

function search_postal_code_q12() {
  var input = document.getElementById('inputpostalCode_q12ID').value;
  var list = document.getElementById('postalCode_q12List');
  
  list.innerHTML = '';
  input = input.toLowerCase();

  console.log("search_postal_code_q12 started...");
  var count = 0;
  for (i = 0; i < postalCode_q12.length; i++) {
    let postcalCode = postalCode_q12[i];

    if (postcalCode.Name.toLowerCase().includes(input)) {
      const elem = document.createElement("option");
      elem.value = postcalCode.Name;
      list.appendChild(elem);
      count++;
    }
    if (count > 30) break;
  }

  console.log("search_postal_code_q12 done!");
  
  if (find_postal_code_q12(postalCode_q12, document.getElementById('inputpostalCode_q12ID').value)) {
    console.log("Found ", document.getElementById('inputpostalCode_q12ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputpostalCode_q12ID').value);
  }
}

function select_postal_code_q12() {
  var postalCode = document.getElementById('inputpostalCode_q12ID').value;
  api.fn.answers({Q12_postal_code:  postalCode});
  api.fn.answers({urlVar20:  postalCode});
  console.log("ADV_6_3_search_list:", postalCode);
  
    
  if (find_postal_code_q12(postalCode_q12, document.getElementById('inputpostalCode_q12ID').value)) {
    console.log("Found ", document.getElementById('inputpostalCode_q12ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputpostalCode_q12ID').value);
    alert("Please select a postal code from the list.");
  }

  console.log("select_postal_code_q12 done!");
}

function showPostalCodeSection_q12() {
    load_postal_code_q12();  

    $('.rt-element.rt-text-container').append(`<input list="postalCode_q12List" onchange="select_postal_code_q12()"  onkeyup="search_postal_code_q12()" name="inputpostalCode_q12ID" id="inputpostalCode_q12ID" >
    <datalist id="postalCode_q12List"> </datalist>`);
    document.getElementById('inputpostalCode_q12ID').value = "";

    var currentValue  = api.fn.answers().ADV_6_3a_postalcode;
    if (currentValue) {
      if (currentValue !== "") {
        //document.getElementById('inputpostalCode_q12ID').value = currentValue;
      }
    }

    if (find_postal_code_q12(postalCode_q12, document.getElementById('inputpostalCode_q12ID').value)) {
      console.log("Found ", document.getElementById('inputpostalCode_q12ID').value);
    }
    else{
      console.log("not found ", document.getElementById('inputpostalCode_q12ID').value);
    }

    $('.rt-btn.rt-btn-next').hide(); 
    $('#inputpostalCode_q12ID').show(); 
}

function hidePostalCodeSection_q12() {
  $('#inputpostalCode_q12ID').hide();
}