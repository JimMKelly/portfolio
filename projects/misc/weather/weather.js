var countriesAndCities = {};
countriesAndCities['Australia'] = [
    { id: 2147714, name: 'Sydney'},
    { id: 2158177, name: 'Melbourne'}],
countriesAndCities['Germany'] = [
    { id: 2950159, name: 'Berlin'},
    { id: 2925533, name: 'Frankfurt am Main'},
    { id: 2867714, name: 'Muenchen'},  
    { id: 2934246, name: 'Dusseldorf'},    
    { id: 2935517, name: 'Dortmund'},    
    { id: 2886242, name: 'Koeln'}],
countriesAndCities['New Zealand'] = [
    { id: 2193733, name: 'Auckland'},
    { id: 2192362, name: 'Christchurch'},
    { id: 2179537, name: 'Wellington'},
    { id: 2190324, name: 'Hamilton'},
    { id: 2208032, name: 'Tauranga'},
    { id: 2191562, name: 'Dunedin'}],
countriesAndCities['Spain'] = [
    { id: 3117735, name: 'Madrid' }, 
    { id: 3128760, name: 'Barcelona'},
    { id: 2509954, name: 'Valencia'},
    { id: 2510911, name: 'Sevilla'},
    { id: 2514256, name: 'Malaga'},
    { id: 2512989, name: 'Palma'}];

var currentCity = { id: 0, name: "", tempDeg: 0,  tempDescrip: "",  icon: "", tempMax: 0, tempMin: 0 }; 
var citiesUsed = [];
var citiesData = [];
var numCities = 0;
var currentCityName = "";

function startUp(){
    loadCities();
    getCityData();
}

function getWeather(){
    currentCityName = getCityName();
    currentCity = getData(currentCityName);
    if(currentCity.name){
        addCity(currentCity);
    }
}

function getCityData(){

    //GET DATA FOR ALL CITIES FROM API
    const apiKey = `0c657c2917f8e93ef2c66198aedd498d`;
    var cityIds = "";

    for (var country in countriesAndCities) {
        //Sort cities alphabetially
        var obj = countriesAndCities[country];
        for (var prop in obj) {
            cityIds = cityIds + obj[prop].id + ",";
        }
    }
    
    cityIds = cityIds.substring(0, cityIds.length - 1);
    const api = `http://api.openweathermap.org/data/2.5/group?id=${cityIds}&appid=${apiKey}&units=metric`;
    
    fetch(api)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log(data);
        let currentCity = {};
        let l = data.list.length;
        for (let i = 0; i < l; ++i) {
            currentCity = {};
            currentCity.id = data.list[i].id;
            currentCity.name = data.list[i].name;
            currentCity.tempDeg = data.list[i].main.temp;
            currentCity.tempMin = data.list[i].main.temp_min;
            currentCity.tempMax = data.list[i].main.temp_max;
            currentCity.tempDescrip = data.list[i].weather[0].description;
            let icon = data.list[i].weather[0].icon;
            currentCity.icon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            //STORE DATA FOR EACH CITIES
            citiesData.push(currentCity);
        }
    })
    .then(function() {
        document.getElementById("btnsFS").style.display="inline-flex";
        document.getElementById("loader").style.display="none";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

function getData(cityName) {
    let name = cityName;

    //GET CURRENT CITY DETAILS FROM ARRAY
    currentCity = { id: 0, name: "", tempDeg: 0,  tempDescrip: "",  icon : "", tempMax: 0, tempMin: 0 }; 
    let l = citiesData.length;
    for (let i = 0; i < l; ++i) {
        if(name == citiesData[i].name) { 
            currentCity.id = citiesData[i].id;
            currentCity.name = citiesData[i].name;
            currentCity.tempDeg = citiesData[i].tempDeg;
            currentCity.tempMin = citiesData[i].tempMin;
            currentCity.tempMax = citiesData[i].tempMax;
            currentCity.tempDescrip = citiesData[i].tempDescrip;
            currentCity.icon = citiesData[i].icon;
            break;
        }
    }
    return currentCity;
}

function addCity(city){
    //ADD CITY TO HTML
    var name = city.name;
    var tempDeg = city.tempDeg.toFixed(1);
    var tempMin = city.tempMin;
    var tempMax = city.tempMax;
    var tempDescrip = city.tempDescrip;
    var icon = city.icon;

    //Create fieldset
    var fs = document.createElement("fieldset");
    var idName = name + "fs";
    fs.setAttribute("class", "fieldsetClass");
    fs.setAttribute("id", idName);

    var removeBtn = document.createElement("button");
    removeBtn.setAttribute("class","projBtn");
    removeBtn.setAttribute("onclick","removeOne(" + idName + ")");
    removeBtn.style.marginLeft = "70%";
    removeBtn.style.fontSize = "12px";
    removeBtn.innerText = "Remove";
    fs.appendChild(removeBtn);

    var div1 = document.createElement("div");
    div1.setAttribute("class", "location");
    fs.appendChild(div1);

    var h1Name = document.createElement("h1");
    h1Name.setAttribute("class","location-name");
    h1Name.textContent = name;
    div1.appendChild(h1Name);

    var iconDiv = document.createElement("div");
    iconDiv.setAttribute("class", "description");
    div1.appendChild(iconDiv);

    var img1 = document.createElement("img");
    img1.setAttribute("class","imageIcon");
    img1.setAttribute("src", icon);
    iconDiv.appendChild(img1);

    var descDiv = document.createElement("div");
    descDiv.setAttribute("class", "temperature-description");
    descDiv.textContent = tempDescrip;
    iconDiv.appendChild(descDiv);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "temperature");
    fs.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "degree-section");
    div2.appendChild(div3);

    var currtempDiv = document.createElement("div");
    currtempDiv.setAttribute("class", "temperature-section");
    div3.appendChild(currtempDiv);

    var h2Deg = document.createElement("h2");
    h2Deg.setAttribute("class","temperature-degree");
    h2Deg.textContent = tempDeg;
    currtempDiv.appendChild(h2Deg);

    var span1 = document.createElement("span");
    span1.textContent = "C";
    currtempDiv.appendChild(span1);

    //Formula for Celsius
    let celsius = tempDeg;
    let fahreinheit = (celsius * 9 / 5 + 32).toFixed(1);

    currtempDiv.addEventListener('click', () => {
        if(span1.textContent === "F"){
            span1.textContent = "C";
            h2Deg.textContent = celsius;
        }else if(span1.textContent === "C"){
            span1.textContent = "F";
            h2Deg.textContent = fahreinheit;
        }
    });
/*
    var mintempDiv = document.createElement("div");
    mintempDiv.setAttribute("class", "temperature-section");
    div3.appendChild(mintempDiv);

    var h2Min = document.createElement("h2");
    h2Min.setAttribute("class","temperature-degree");
    h2Min.style.fontSize = "20px;"
    h2Min.style.color = "blue";
    h2Min.textContent = "Min: " + tempMin;
    mintempDiv.appendChild(h2Min);

    var span2 = document.createElement("span");
    span2.style.fontSize = "20px;"
    span2.style.color = "blue";
    span2.textContent = "C";
    mintempDiv.appendChild(span2);

    var maxtempDiv = document.createElement("div");
    maxtempDiv.setAttribute("class", "temperature-section");
    div3.appendChild(maxtempDiv);

    var h2Max = document.createElement("h2");
    h2Max.setAttribute("class","temperature-degree");
    h2Max.style.fontSize = "20px;"
    h2Max.style.color = "red";
    h2Max.textContent = "Max: " + tempMax;
    maxtempDiv.appendChild(h2Max);

    var span3 = document.createElement("span");
    span3.style.fontSize = "20px;"
    span3.style.color = "red";
    span3.textContent = "C";
    maxtempDiv.appendChild(span3);
*/
    document.getElementById("citiesDiv").appendChild(fs);
}

function removeCities() {
    //Remove current cities
    numCities = citiesUsed.length;
    for(let i = numCities - 1; i >= 0; i--) {
        document.getElementsByClassName('fieldsetClass')[i].remove();
    }
    citiesUsed = [];
}

function loadCities() {
    for (var country in countriesAndCities) {
        //Sort cities alphabetially
        var obj = countriesAndCities[country];
        for (var prop in obj) {
            obj.sort(function(a, b) {
                if(a.name < b.name) { return -1 }
                if(a.name > b.name) { return 1 }
                return 0;
            });
        }
    
        //Load countries to list
        listItem = document.createElement('option'); // create an item for each one
        listItem.innerHTML = country; // Add the item text
        listItem.value = country;
        document.getElementById("country").appendChild(listItem);
    }
  }

function getCityName() {
    //Get data for new clock
    var e = document.getElementById("city");
    var name = e.options[e.selectedIndex].value;
    
    currentCityName = name;
    var cityUsed = false;
    for (let i = 0; i < citiesUsed.length; i++) {
      if(name == citiesUsed[i]) { 
        cityUsed = true;
      }
    }
    if((!cityUsed) && (name != "none")) { //Check city is viable
      citiesUsed.push(currentCityName);
      return currentCityName;
    }
}

function ChangeCountryList() {
    var countryList = document.getElementById("country");
    var cityList = document.getElementById("city");
    var selCountry = countryList.options[countryList.selectedIndex].value;

    while (cityList.options.length) {
      cityList.remove(0);
    }
    var cities = countriesAndCities[selCountry];
    if (cities) {
      var i;
      document.getElementById("city").style.display="block";
      var listItem = document.createElement('option');
      listItem.innerHTML = "-- Select a City --";
      document.getElementById("city").appendChild(listItem);
      for (i = 0; i < cities.length; i++) {
        var city = new Option(cities[i].name, i);
        var opt = document.createElement('option');
        city.value = cities[i].name;
        cityList.options.add(city);
      }
    }
}

function removeOne(idName){
    var elID = idName.id;
    var el = document.getElementById(elID);
    var cityName = elID.substring(0, elID.length - 2);
    var index = citiesUsed.indexOf(cityName);
    if (index !== -1) citiesUsed.splice(index, 1);

    el.remove();
}