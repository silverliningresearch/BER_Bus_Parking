var postalCodeq29;

function find_postal_code_q29(list, item) {
  item = item.toLowerCase();
  
  if (item) {
    if (item !== "") {
      for (i = 0; i < list.length; i++) {
        if (list[i].Name.toLowerCase() === item) {
          //$('.rt-btn.rt-btn-next').show(); 
          return true;
        }
      }
    }
  }
  //$('.rt-btn.rt-btn-next').hide(); 
  return false;
}

function load_postal_code_q29() {
  console.log("load_postal_code_q29 started...");

  postalCodeq29 = JSON.parse(postalCodeGermany);

  console.log("load_postal_code_q29 done!");
}

function search_postal_code_q29() {
  var input = document.getElementById('inputPostalCodeQ29ID').value;
  var list = document.getElementById('postalCodeq29List');
  
  list.innerHTML = '';
  input = input.toLowerCase();

  console.log("search_postal_code_q29 started...");
  var count = 0;
  for (i = 0; i < postalCodeq29.length; i++) {
    let postcalCode = postalCodeq29[i];

    if (postcalCode.Name.toLowerCase().includes(input)) {
      const elem = document.createElement("option");
      elem.value = postcalCode.Name;
      list.appendChild(elem);
      count++;
    }
    if (count > 30) break;
  }

  console.log("search_postal_code_q29 done!");
  
  if (find_postal_code_q29(postalCodeq29, document.getElementById('inputPostalCodeQ29ID').value)) {
    console.log("Found ", document.getElementById('inputPostalCodeQ29ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputPostalCodeQ29ID').value);
  }
}

function select_postal_code_q29() {
  var postalCode = document.getElementById('inputPostalCodeQ29ID').value;
  api.fn.answers({q29_postalcode:  postalCode});
  console.log("q29_search_list:", postalCode);
  
    
  if (find_postal_code_q29(postalCodeq29, document.getElementById('inputPostalCodeQ29ID').value)) {
    console.log("Found ", document.getElementById('inputPostalCodeQ29ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputPostalCodeQ29ID').value);
    alert("Please select a postal code from the list.");
  }

  console.log("select_postal_code_q29 done!");
}

function showPostalCodeSection_q29() {
    load_postal_code_q29();  

    $('.rt-element.rt-text-container').append(`<input list="postalCodeq29List" onchange="select_postal_code_q29()"  onkeyup="search_postal_code_q29()" name="inputPostalCodeQ29ID" id="inputPostalCodeQ29ID" >
    <datalist id="postalCodeq29List"> </datalist>`);
    document.getElementById('inputPostalCodeQ29ID').value = "";

    var currentValue  = api.fn.answers().q29_postalcode;
    if (currentValue) {
      if (currentValue !== "") {
        document.getElementById('inputPostalCodeQ29ID').value = currentValue;
      }
    }

    if (find_postal_code_q29(postalCodeq29, document.getElementById('inputPostalCodeQ29ID').value)) {
      console.log("Found ", document.getElementById('inputPostalCodeQ29ID').value);
    }
    else{
      console.log("not found ", document.getElementById('inputPostalCodeQ29ID').value);
    }

    //$('.rt-btn.rt-btn-next').hide(); 
    $('#inputPostalCodeQ29ID').show(); 
}

function hidePostalCodeSection_q29() {
  $('#inputPostalCodeQ29ID').hide();
}