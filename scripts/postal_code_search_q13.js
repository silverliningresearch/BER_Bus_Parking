var postalCodeQ13;

function find_postal_code_q13(list, item) {
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

function load_postal_code_q13() {
  console.log("load_postal_code_q13 started...");

  var country = api.fn.answers().Q13_1_text;

  if (country ==="Republica Checa" || country ==="Tchéquie" || country ==="Republika Czeska" 
      || country ==="Çek Cumhuriyeti" || country ==="Tschechien" || country ==="Czech Republic")  {
    postalCodeQ13 = JSON.parse(postalCodeCzech);
  } else if (country ==="Germany" || country ==="Deutschland" || country ==="Almanya" 
             || country ==="Niemcy" || country ==="Allemagne" || country ==="Alemania") {
    postalCodeQ13 = JSON.parse(postalCodeGermany);
  }
  else if (country ==="Poland" || country ==="Polonya" || country ==="Polska" 
          || country ==="Pologne" || country ==="Polonia" || country ==="Polen")  {
    postalCodeQ13 = JSON.parse(postalCodePoland);
  }
  else {
    postalCodeQ13 = JSON.parse(postalCodeNone);
  }

  console.log("country: ", country);
  console.log("load_postal_code_q13 done!");
}

function search_postal_code_q13() {
  var input = document.getElementById('inputpostalCodeQ13ID').value;
  var list = document.getElementById('postalCodeQ13List');
  
  list.innerHTML = '';
  input = input.toLowerCase();

  console.log("search_postal_code_q13 started...");
  var count = 0;
  for (i = 0; i < postalCodeQ13.length; i++) {
    let postcalCode = postalCodeQ13[i];

    if (postcalCode.Name.toLowerCase().includes(input)) {
      const elem = document.createElement("option");
      elem.value = postcalCode.Name;
      list.appendChild(elem);
      count++;
    }
    if (count > 30) break;
  }

  console.log("search_postal_code_q13 done!");
  
  if (find_postal_code_q13(postalCodeQ13, document.getElementById('inputpostalCodeQ13ID').value)) {
    console.log("Found ", document.getElementById('inputpostalCodeQ13ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputpostalCodeQ13ID').value);
  }
}

function select_postal_code_q13() {
  var postalCode = document.getElementById('inputpostalCodeQ13ID').value;
  api.fn.answers({Q13_postal_code:  postalCode});
  api.fn.answers({urlVar19:  postalCode});
    
  console.log("select_postal_code_q13 started...");
      
  if (find_postal_code_q13(postalCodeQ13, document.getElementById('inputpostalCodeQ13ID').value)) {
    console.log("Found ", document.getElementById('inputpostalCodeQ13ID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputpostalCodeQ13ID').value);
    alert("Please select a postal code from the list.");
  }

  console.log("select_postal_code_q13 done!");
}

function showPostalCodeSection_q13() {
    load_postal_code_q13();  

    $('.rt-element.rt-text-container').append(`<input list="postalCodeQ13List" onchange="select_postal_code_q13()"  onkeyup="search_postal_code_q13()" name="inputpostalCodeQ13Name" id="inputpostalCodeQ13ID" >
    <datalist id="postalCodeQ13List"> </datalist>`);
    document.getElementById('inputpostalCodeQ13ID').value = "";

    var currentValue  = api.fn.answers().urlVar19;
    if (currentValue) {
      if (currentValue !== "") {
        document.getElementById('inputpostalCodeQ13ID').value = currentValue;
      }
    }

    if (find_postal_code_q13(postalCodeQ13, document.getElementById('inputpostalCodeQ13ID').value)) {
      console.log("Found ", document.getElementById('inputpostalCodeQ13ID').value);
    }
    else{
      console.log("not found ", document.getElementById('inputpostalCodeQ13ID').value);
    }

    $('.rt-btn.rt-btn-next').hide(); 
    $('#inputpostalCodeQ13ID').show(); 
}

function hidePostalCodeSection_q13() {
  $('#inputpostalCodeQ13ID').hide();
}
