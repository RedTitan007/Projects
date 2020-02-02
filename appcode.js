
var button=document.querySelector('.button');
var inputvalue=document.querySelector('.inputValue');
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};

weather.temperature = {
    unit : "celsius"
}


const KELVIN = 273;
const key = "849f03371263ef1b4c978192dd739188";

button.addEventListener('click',function(inputValue){
    let api = 'https://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid=849f03371263ef1b4c978192dd739188';
    
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
});

function displayWeather(){
    if ('speechSynthesis' in window) {
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    var greetings = new SpeechSynthesisUtterance('Hai  Dude Todays Weather for '+weather.city+"  "+weather.country+" is ");
    window.speechSynthesis.speak(greetings);

    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    var msg = new SpeechSynthesisUtterance("Temperature Is "+weather.temperature.value+"Degree Celcius");
    window.speechSynthesis.speak(msg);

    descElement.innerHTML = weather.description;
    var msg1 = new SpeechSynthesisUtterance("Status is "+weather.description);
    window.speechSynthesis.speak(msg1);

    var Thank = new SpeechSynthesisUtterance('Thank you Visit Again ');
    window.speechSynthesis.speak(Thank);
    }
}


















































