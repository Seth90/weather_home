const partsTranslate = {
  'morning': 'Утро',
  'day': 'День',
  'evening': 'Вечер',
  'night': 'Ночь'
}
const weekdayShortTranslate = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const weekdayFullTranslate = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const conditionTranslate = {
  'overcast': ['Пасмурно', '08-s.png'],
  'dreary': ['Пасмурно', '08-s.png'],
  'mostly cloudy': ['Облачно с прояснениями', '03-s.png'],
  'clear': ['Ясно', '01-s.png'],
  'partly-cloudy': ['Малооблачно', '01-s.png'],
  'cloudy': ['Облачно с прояснениями', '03-s.png'],
  'drizzle': ['Морось', '14-s.png'],
  'light-rain': ['Небольшой дождь', '12-s.png'],
  'rain': ['Дождь', '18-s.png'],
  'moderate-rain': ['Умеренно сильный дождь', '12-s.png'],
  'heavy-rain': ['Сильный дождь', '15-s.png'],
  'continuous-heavy-rain': ['Длительный сильный дождь', '15-s.png'],
  'showers': ['Ливень', '12-s.png'],
  'wet-snow': ['Дождь со снегом', '29-s.png'],
  'light-snow': ['Небольшой снег', '22-s.png'],
  'snow': ['Снег', '22-s.png'],
  'snow-showers': ['Снегопад', '22-s.png'],
  'hail': ['Град', '26-s.png'],
  'thunderstorm': ['Гроза', '15-s.png'],
  'thunderstorm-with-rain': ['Дождь с грозой', '15-s.png'],
  'thunderstorm-with-hail': ['Гроза с градом', '15-s.png']
}
const rusMonth = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const app = {
    data() {
      return {
        error: true,
        erorrLst: '',
        city: 'Иваново',
        currentTemp: 0,
        currentCondition: 'Облачно',
        icon: '01-s.png',
        thisDayHighTemp: 5,
        thisDayLowTemp: -1,
        updateTime: '12:28',
        feelsLike: 5,
        windSpeed: 2,
        visibilityRange: 10,
        pressure: 764,
        humidity: 74,
        dewPoint: -6,
        parts: [
            {
                icon: '01-s.png',
                partName: 'evening',
                tempMin: 0,
                tempMax:0,
                condition: 'none'
            },
            {
                icon: '01-s.png',
                partName: 'day',
                tempMin: 0,
                tempMax:0,
                condition: 'none'
            }
        ],
        accuForecast: new Array(5).fill().map(item => (
          {
            id: 0,
            iconPath: '01-s.png',
            date: "2022-11-07T07:00:00+03:00",
            epochDate: '99.99 Пн',
            tempMin: -99,
            tempMax: -99,
            icon: 12,
            iconPhrase: 'Rain'
          }
        )),
      }
    },
    methods: {
        GetYandexData () {
          
          let divError = document.getElementsByClassName('errorMessages__yandex hidden')[0];
            let options = {
                method: 'GET',      
                headers: {}
              };
              
            setInterval(async () => {
              try {
                const response = await fetch('http://127.0.0.1:3000/ya_data', options);
                if (response.ok) {
                  const json = await response.json();
                  this.currentTemp = json.fact.temp;
                  //this.currentCondition = json.fact.condition;
                  if (conditionTranslate[json.fact.condition]){
                    this.currentCondition = conditionTranslate[json.fact.condition][0];
                    this.icon = conditionTranslate[json.fact.condition][1];
                  }
                  else
                    this.currentCondition = json.fact.condition;
                  //this.thisDayHighTemp = 'N';
                  //this.thisDayLowTemp = 'N';
                  let date = new Date(json.fact.obs_time);
                  this.updateTime = `${date.getHours()}:${date.getMinutes()}`;
                  this.feelsLike = json.fact.feels_like;
                  this.windSpeed = json.fact.wind_speed;
                  this.visibilityRange = 'N';
                  this.pressure = json.fact.pressure_mm;
                  this.humidity = json.fact.humidity;
                  this.dewPoint = 'N';

                  this.parts[0].partName = partsTranslate[json.forecast.parts[0].part_name];
                  this.parts[0].tempMin = json.forecast.parts[0].temp_min;
                  this.parts[0].tempMax = json.forecast.parts[0].temp_max;
                  if (conditionTranslate[json.forecast.parts[0].condition])
                    this.parts[0].condition = conditionTranslate[json.forecast.parts[0].condition][0];
                  else
                    this.parts[0].condition = json.forecast.parts[0].condition;
                  this.parts[0].icon = conditionTranslate[json.forecast.parts[0].condition][1],

                  this.parts[1].partName = partsTranslate[json.forecast.parts[1].part_name];
                  this.parts[1].tempMin = json.forecast.parts[1].temp_min;
                  this.parts[1].tempMax = json.forecast.parts[1].temp_max;
                  if (conditionTranslate[json.forecast.parts[1].condition])
                    this.parts[1].condition = conditionTranslate[json.forecast.parts[1].condition][0];
                  else
                    this.parts[1].condition = json.forecast.parts[1].condition;

                  this.parts[1].icon = conditionTranslate[json.forecast.parts[1].condition][1],
                  
                  //console.log('GetYandexData - OK')
                  divError.classList.add('hidden');

                  swiper.loopDestroy();
                  swiper.loopCreate();
                }
                else {
                  divError.classList.remove('hidden');
                  divError.innerHTML = 'Ошибка получения данных с ресурса: Yandex';
                }
            }
            catch (err) {
                divError.classList.remove('hidden');
                divError.innerHTML = 'Ошибка получения данных с ресурса: Yandex';
                console.log(err);
            }
            }, 5000);
              
        },
        GetAccuWeatherForecast () {
          const url = 'http://127.0.0.1:3000/accu_data';
          let divError = document.getElementsByClassName('errorMessages__accu')[0];
          let options = {
            method: 'GET',      
            headers: {}
          };
              
          setInterval(async () => {

            try {
              const response = await fetch(url, options);
              if (response.ok) {
                  const json = await response.json();
                  json.DailyForecasts.forEach((item, i) => {
                    let date = new Date(item.EpochDate * 1000);
                    //console.log(item.EpochDate);
                    //console.log(date);
                    this.accuForecast[i].epochDate = `${date.getDate()}.${date.getMonth() + 1} ${weekdayShortTranslate[date.getDay()]}`;
                    let maxtemp = Math.round(item.Temperature.Maximum.Value), 
                        mintemp = Math.round(item.Temperature.Minimum.Value);
                    this.accuForecast[i].tempMin = mintemp;
                    this.accuForecast[i].tempMax = maxtemp;
                    if (conditionTranslate[item.Day.IconPhrase.toLowerCase()]) {
                      this.accuForecast[i].iconPhrase = conditionTranslate[item.Day.IconPhrase.toLowerCase()][0];
                    }
                    else {
                      this.accuForecast[i].iconPhrase = item.Day.IconPhrase;
                    }
                    
                    let iconp = item.Day.Icon;
                    this.accuForecast[i].iconPath = iconp < 10 ? `0${iconp}-s.png` : `${iconp}-s.png`;

                    if (i === 0) {
                      this.thisDayHighTemp = maxtemp;
                      this.thisDayLowTemp = mintemp;
                    }
                    
                  });           
                  //console.log('GetAccuData - OK')
                  divError.classList.add('hidden');
                  swiper.loopDestroy();
                  swiper.loopCreate();
                }
                else {
                  divError.classList.remove('hidden');
                  divError.innerHTML = 'Ошибка получения данных с ресурса: AccuWeather';
                }
            }
            catch (err) {
                divError.classList.remove('hidden');
                divError.innerHTML = 'Ошибка получения данных с ресурса: AccuWeather';
                console.log(err);
            }
            }, 5000);
        },
        GetOpenWeatherAirData () {
          return 0
        },
        Todo (){
          this.GetYandexData();
          this.GetAccuWeatherForecast();
        }
    },
    mounted: function(){
      this.Todo()
      //setTimeout(this.GetYandexData(), 5000);
    }
  }


Vue.createApp(app).mount('#app')

setInterval(() => {
  let currentDate = new Date();
  console.log(currentDate);
  let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
  document.getElementById('time').innerText = `${currentDate.getHours()}:${minutes}`;
  document.getElementById('dayOfWeek').innerText = `${weekdayFullTranslate[currentDate.getDay()]}`;
  document.getElementById('date').innerText = `${currentDate.getDate()} ${rusMonth[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}, 30000);

