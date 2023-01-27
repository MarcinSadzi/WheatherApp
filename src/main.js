import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './DOMActions.js';

class WeatherApp {
  constructor() {
    this.viewElems = {}
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectDOMElements();
    this.setupListeners();
  }

  connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
    this.viewElems = mapListToDOMElements(listOfIds);
  }

  setupListeners = () => {
    this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
    this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
    this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
  }

    handleSubmit = () => {
        if (event.type === 'click' || event.key === 'Enter') {
            this.fadeInOut();
            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query).then(data => {
                this.displayWeatherData(data);
                this.viewElems.searchButton.style.borderColor = 'black';
            }).catch(() => {
                this.returnToSearch();
                this.viewElems.searchButton.style.borderColor = 'red';
                alert('Nie znaleziono wprowdzonego mista, sprawdź czy poprawinie podano nazwe misata');
            })
        }
    }

  fadeInOut = () => {
    if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
      this.viewElems.mainContainer.style.opacity = '0';
    } else {
      this.viewElems.mainContainer.style.opacity = '1';
    }
  }

  switchView = () => {
    if (this.viewElems.weatherSearchView.style.display !== 'none') {
      this.viewElems.weatherSearchView.style.display = 'none';
      this.viewElems.weatherForecastView.style.display = 'block';
    } else {
      this.viewElems.weatherForecastView.style.display = 'none';
      this.viewElems.weatherSearchView.style.display = 'flex';
    }
  }

  returnToSearch = () => {
    this.fadeInOut();

    setTimeout(() => {
      this.switchView();
      this.fadeInOut();
    }, 500);
  }
  displayWeatherData = data => {
            this.switchView();
            this.fadeInOut()
            
            const weatherInfo = data;
           
            
           
            this.viewElems.weatherCity.innerText = weatherInfo.name;
            this.viewElems.weatherIcon.src = `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;                                    //weatherInfo.weather[0].icon;    
            
            const currTemp = weatherInfo.main.temp;
            const maxTemp = weatherInfo.main.temp_max;
            const minTemp = weatherInfo.main.temp_min;
            
            this.viewElems.weatherCurrentTemp.innerText = `Aktualna temperatura: ${currTemp}℃`;
            this.viewElems.weatherMaxTemp.innerText = `Maksymalna temperatura: ${maxTemp}℃`;
            this.viewElems.weatherMinTemp.innerText = `Minimalna temperatura: ${minTemp}℃`;
            
        }
    }




document.addEventListener('DOMContentLoaded', new WeatherApp());


