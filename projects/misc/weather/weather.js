<<<<<<< HEAD
var allCities = [
    {   id: 3117735,
        name: "Madrid"},
    {   id: 2193733,
        name: "Auckland"},
    {   id: 2643743,
        name: "London"},
    {   id: 2147714,
        name: "Sydney"},
    {   id: 5128581,
        name: "New York"},
    {   id: 1850147,
        name: "Tokyo"},
    {   id: 524901,
        name: "Moscow"},
    {   id: 1816670,
        name: "Beijing"},
    {   id: 3128760,
        name: "Barcelona"},
    {   id: 2988507,
        name: "Paris"},
    {   id: 2950159,
        name: "Berlin"}
  ]

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
    const apiKey = `f9c8276aa2d5f5595499589d39c2611a`;
    var cityIds = "";
    for(let i=0; i< allCities.length; i++){
        cityIds = cityIds + allCities[i].id + ",";
    }
    cityIds = cityIds.substring(0, cityIds.length - 1);
    /*### USE PROXY FOR WORKING IN LOCAL DIRECTORY### */
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}http://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}&units=metric`
    
    //###USE ON LIVE SERVER###
   //const api = `http://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}&units=metric`

    fetch(api)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log(data);
        let currentCity = {};
        //data.forEach(myFunction);
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
        document.getElementById("btnsFS").style.display="block";
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
    let l = allCities.length;
    //Sort cities alphabetially
    allCities.sort(function(a, b) {
      if(a.name < b.name) { return -1 }
      if(a.name > b.name) { return 1 }
      return 0;
    });
  
    for (let i = 0; i < l; ++i) {
      listItem = document.createElement('option'); // create an item for each one
      listItem.innerHTML = allCities[i].name; // Add the item text
      document.getElementById("cities").appendChild(listItem); // Add listItem to the listElement
    }
  }

function getCityName() {
    //Get data for new clock
    var e = document.getElementById("cities");
    var name = e.options[e.selectedIndex].value;
    let l = allCities.length;
    
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
=======
var allCities = [
    {   id: 3117735,
        name: "Madrid"},
    {   id: 2193733,
        name: "Auckland"},
    {   id: 2643743,
        name: "London"},
    {   id: 2147714,
        name: "Sydney"},
    {   id: 5128581,
        name: "New York"},
    {   id: 1850147,
        name: "Tokyo"},
    {   id: 524901,
        name: "Moscow"},
    {   id: 1816670,
        name: "Beijing"},
    {   id: 3128760,
        name: "Barcelona"},
    {   id: 2988507,
        name: "Paris"},
    {   id: 2950159,
        name: "Berlin"}
  ]

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
    const apiKey = `f9c8276aa2d5f5595499589d39c2611a`;
    var cityIds = "";
    for(let i=0; i< allCities.length; i++){
        cityIds = cityIds + allCities[i].id + ",";
    }
    cityIds = cityIds.substring(0, cityIds.length - 1);
    /*### USE PROXY FOR WORKING IN LOCAL DIRECTORY### */
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}http://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}&units=metric`
    
    //###USE ON LIVE SERVER###
   //const api = `http://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}&units=metric`

    fetch(api)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log(data);
        let currentCity = {};
        //data.forEach(myFunction);
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
        document.getElementById("btnsFS").style.display="block";
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
    let l = allCities.length;
    //Sort cities alphabetially
    allCities.sort(function(a, b) {
      if(a.name < b.name) { return -1 }
      if(a.name > b.name) { return 1 }
      return 0;
    });
  
    for (let i = 0; i < l; ++i) {
      listItem = document.createElement('option'); // create an item for each one
      listItem.innerHTML = allCities[i].name; // Add the item text
      document.getElementById("cities").appendChild(listItem); // Add listItem to the listElement
    }
  }

function getCityName() {
    //Get data for new clock
    var e = document.getElementById("cities");
    var name = e.options[e.selectedIndex].value;
    let l = allCities.length;
    
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
>>>>>>> 60d103c... Updated a lot...
}