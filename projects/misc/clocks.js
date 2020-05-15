var numClocks = 0;
var citiesUsed = [];
var currentCity = "";
var allCities = [
  { name: "Madrid"  ,
    timeDiff: 0     },
  { name: "Auckland",
    timeDiff: 10    },
  { name: "London"  ,
    timeDiff: -1    },
  { name: "Sydney"  ,
    timeDiff: 8     },
  { name: "New York",
    timeDiff: -6    },
  { name: "Tokyo"   ,
    timeDiff: 7     },
  { name: "Moscow"  ,
    timeDiff: 1     },
  { name: "Beijing"  ,
    timeDiff: 6     }

]

function resetAll() {
  removeClocks();
  numClocks = 0;
  citiesUsed = [];
  currentCity = "";
  document.getElementById("resetBtn").style.display = "none";
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

function newClock() {
  removeClocks();
  getData();
  numClocks = citiesUsed.length;
  if(numClocks > 0 ) {
    document.getElementById("resetBtn").style.display = "block";
  }
  for (let i = 0; i < numClocks; i++) {
    createClock(citiesUsed[i].name, citiesUsed[i].timeDiff, citiesUsed[i].arc, citiesUsed[i].hands, citiesUsed[i]._24hour);
  }
  updateTime();
}

function removeClocks() {
  //Remove current clocks
  numClocks = citiesUsed.length;
  for(let i = numClocks; i > 0; i--) {
    if(numClocks==1) {
      document.getElementsByClassName('fieldsetClass')[1].remove();
    } else {
      document.getElementsByClassName('fieldsetClass')[i].remove();
    }
  }
}

function getData() {
  //Get data for new clock
  var e = document.getElementById("cities");
  var name = e.options[e.selectedIndex].value;
  var timeDiff = 0;
  let l = allCities.length;
  for (let i = 0; i < l; ++i) {
    if(name == allCities[i].name) { timeDiff = allCities[i].timeDiff; }
  }
  currentCity = name;
  var city = { name: name, timeDiff: timeDiff, arc: true, hands: false, showTime: true, _24hour: false};
  var cityUsed = false;
  for (let i = 0; i < citiesUsed.length; i++) {
    if(city.name == citiesUsed[i].name) { 
      cityUsed = true;
    }
  }
  if(!cityUsed && name != "none") { //Check city is viable
    citiesUsed.push(city);
  }
}

function updateTime() { 
  removeClocks();
  numClocks = citiesUsed.length;
  for (let i = 0; i < numClocks; i++) {
    createClock(citiesUsed[i].name, citiesUsed[i].timeDiff, citiesUsed[i].arc, citiesUsed[i].hands, citiesUsed[i]._24hour);
  }
  
  var t = setTimeout(updateTime, 1000);
}

function createClock(_name, _diff, _arc, _hands, _24hr) {
  var timeDiff = _diff;
  var name = _name;
  var showArcs = _arc;
  var showHands = _hands;
  var showTime = true;
  var _24hour = _24hr;
  var width = 275;
  var height = 300;
  var xPos = width / 2;
  var yPos = height / 2 + 20;
  
  //Create fieldset
  var fieldSet1 = document.createElement("fieldset");
  fieldSet1.setAttribute("class", "fieldsetClass");
  
  //Create buttons
  var btnsNav = document.createElement("div");
  btnsNav.setAttribute("class", "btnsDiv");
  var handsArc = document.createElement("button");
  handsArc.setAttribute("class", "btn2");
  handsArc.onclick = function() {
    showArcs = !showArcs;
    showHands = !showHands;
    for(let i=0; i<citiesUsed.length; i++) {
      if(citiesUsed[i].name == name) {
        citiesUsed[i].arc = showArcs;
        citiesUsed[i].hands = showHands;
      }
    }
  };
  var txt = showHands  ? "Show as Arcs" : "Show as Hands";
  handsArc.innerHTML = txt;
  btnsNav.appendChild(handsArc);

  showTime = showArcs;

  if(showTime){
    var _24or12 = document.createElement("button");
    _24or12.setAttribute("class", "btn2");
    _24or12.style.float = "right";
    var _24txt = _24hour  ? "12 hr" : "24 hr";
    _24or12.innerHTML = _24txt;
    _24or12.onclick = function() {
      _24hour = !_24hour;
      for(let i=0; i<citiesUsed.length; i++) {
        if(citiesUsed[i].name == name) {
          citiesUsed[i]._24hour = _24hour;
        }
      }
    };
    btnsNav.appendChild(_24or12);
  } 
 
  fieldSet1.appendChild(btnsNav);

  //Create SVG
  var svg1 = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg1.setAttribute("width", width);
  svg1.setAttribute("height", height);
  svg1.setAttribute("stroke-width", "2");
  svg1.setAttribute("class", "svgClass");
  fieldSet1.appendChild(svg1);

  //Set time variables
  var d = new Date();
  var hr = (d.getHours() + timeDiff) % 24;
  var mins = d.getMinutes();
  var secs = d.getSeconds();
  var hr2 = hr;
  if(!_24hour) {
    hr2 = hr > 12 ? hr - 12 : hr;
  }
  var hr3 = leadingZero(hr2);
  var min2 = leadingZero(mins);
  var sec2 = leadingZero(secs);
  var ampm = hr < 12  ? "am" : "pm";
  var hourDegs = hr % 12 * 360 / 12;
  var minDegs = mins * 360 / 60;
  var secDegs = secs * 360 / 60;
  var timeText = hr3 + ":" + min2 + ":" + sec2;

  //Create city name above clock
  let text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text1.setAttribute("class", "textName");
  text1.textContent = name;
  text1.setAttribute("x", "50%");
  text1.setAttribute("text-anchor", "middle");
  text1.setAttribute("y", "10%");
  svg1.appendChild(text1);
  
  if(showArcs) {
    //Create hours arc
    let hourArc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hourArc.setAttribute("d", describeArc(xPos, yPos, 80, 20, 0, hourDegs));
    hourArc.setAttribute("class", "arc");
    hourArc.setAttribute("fill", "#000099");
    svg1.appendChild(hourArc);

    //Create mins arc
    let minsArc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    minsArc.setAttribute("d", describeArc(xPos, yPos, 60, 15, 0, minDegs));
    minsArc.setAttribute("class", "arc");
    minsArc.setAttribute("fill", "#e60073");
    svg1.appendChild(minsArc);

    //Create secs arc
    let secsArc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    secsArc.setAttribute("d", describeArc(xPos, yPos, 45, 10, 0, secDegs));
    secsArc.setAttribute("class", "arc");
    secsArc.setAttribute("fill", "#00e600");
    svg1.appendChild(secsArc);
  }
  
  if(showTime) {
    //Add time
    let text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text2.setAttribute("class", "textClass");
    text2.textContent = timeText;
    text2.setAttribute("x", "50%");
    text2.setAttribute("text-anchor", "middle");
    text2.setAttribute("y", yPos);
    svg1.appendChild(text2);

    if(!_24hour){
      //Add am/pm
      let text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text3.setAttribute("class", "textClass");
      text3.textContent = ampm;
      text3.setAttribute("x", "50%");
      text3.setAttribute("y", yPos + 15);
      text3.setAttribute("text-anchor", "middle");
      svg1.appendChild(text3);
    }
  }
  
  if(showHands) {
    //Add numbers
    let num12 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    num12.setAttribute("class", "textClass");
    num12.textContent = "12";
    num12.setAttribute("x", "50%");
    num12.setAttribute("y", yPos - 95);
    num12.setAttribute("text-anchor", "middle");
    svg1.appendChild(num12);

    let num3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    num3.setAttribute("class", "textClass");
    num3.textContent = "3";
    num3.setAttribute("x", "85%");
    num3.setAttribute("y", yPos);
    num3.setAttribute("text-anchor", "middle");
    svg1.appendChild(num3);

    let num6 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    num6.setAttribute("class", "textClass");
    num6.textContent = "6";
    num6.setAttribute("x", "50%");
    num6.setAttribute("y", yPos + 95);
    num6.setAttribute("text-anchor", "middle");
    svg1.appendChild(num6);

    let num9 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    num9.setAttribute("class", "textClass");
    num9.textContent = "9";
    num9.setAttribute("x", "15%");
    num9.setAttribute("y", yPos);
    num9.setAttribute("text-anchor", "middle");
    svg1.appendChild(num9);

    //Add hour hand
    let hourHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hourHand.setAttribute("class", "hand");
    hourHand.setAttribute("x1", xPos);
    hourHand.setAttribute("y1", yPos);
    var hourAngleInRadians = polarToCartesian(xPos, yPos, 60, hourDegs);
    hourHand.setAttribute("x2", hourAngleInRadians.x);
    hourHand.setAttribute("y2", hourAngleInRadians.y);
    hourHand.setAttribute("stroke", "black");
    hourHand.setAttribute("stroke-width", 4);
    svg1.appendChild(hourHand);

    //Add minute hand
    let minuteHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    minuteHand.setAttribute("class", "hand");
    minuteHand.setAttribute("x1", xPos);
    minuteHand.setAttribute("y1", yPos);
    var minAngleInRadians = polarToCartesian(xPos, yPos, 75, minDegs);
    minuteHand.setAttribute("x2", minAngleInRadians.x);
    minuteHand.setAttribute("y2", minAngleInRadians.y);
    minuteHand.setAttribute("stroke", "black");
    minuteHand.setAttribute("stroke-width", 3);
    svg1.appendChild(minuteHand);

    //Add second hand
    let secondHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    secondHand.setAttribute("class", "hand");
    secondHand.setAttribute("x1", xPos);
    secondHand.setAttribute("y1", yPos);
    var secAngleInRadians = polarToCartesian(xPos, yPos, 80, secDegs);
    secondHand.setAttribute("x2", secAngleInRadians.x);
    secondHand.setAttribute("y2", secAngleInRadians.y);
    secondHand.setAttribute("stroke", "red");
    secondHand.setAttribute("stroke-width", 2);
    svg1.appendChild(secondHand);
  }
  
  //console.log("The time in " + name + " is " + hr2 + ":" + min2 + ":" + sec2 + " " + ampm);
  document.getElementById("clocksDiv").appendChild(fieldSet1);
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, spread, startAngle, endAngle){
  var innerStart = polarToCartesian(x, y, radius, endAngle);
  var innerEnd = polarToCartesian(x, y, radius, startAngle);
  var outerStart = polarToCartesian(x, y, radius + spread, endAngle);
  var outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
      "M", outerStart.x, outerStart.y,
      "A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y, 
      "A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y, 
      "L", outerStart.x, outerStart.y, "Z"
  ].join(" ");

  return d;     
}

function leadingZero(n){
  return n > 9 ? "" + n: "0" + n;
}