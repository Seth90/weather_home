const partsTranslate = {
  'morning': 'Утро',
  'day': 'День',
  'evening': 'Вечер',
  'night': 'Ночь'
}
const weekdayShortTranslate = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const weekdayFullTranslate = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const conditionTranslate = {
  'overcast': 'Пасмурно',
  'rain': 'Дождь',
  'cloudy': 'Облачно'
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
                partName: 'evening',
                tempMin: 0,
                tempMax:0,
                condition: 'none'
            },
            {
                partName: 'day',
                tempMin: 0,
                tempMax:0,
                condition: 'none'
            }
        ],
        accuForecast: new Array(5).fill().map(item => (
          {
            id: 0,
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
                  this.currentCondition = json.fact.condition;
                  this.thisDayHighTemp = 'N';
                  this.thisDayLowTemp = 'N';
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
                    this.parts[0].condition = conditionTranslate[json.forecast.parts[0].condition];
                  else
                    this.parts[0].condition = json.forecast.parts[0].condition;

                  this.parts[1].partName = partsTranslate[json.forecast.parts[1].part_name];
                  this.parts[1].tempMin = json.forecast.parts[1].temp_min;
                  this.parts[1].tempMax = json.forecast.parts[1].temp_max;
                  if (conditionTranslate[json.forecast.parts[1].condition])
                    this.parts[1].condition = conditionTranslate[json.forecast.parts[1].condition];
                  else
                    this.parts[1].condition = json.forecast.parts[1].condition;
                  
                  console.log('GetYandexData - OK')
                  divError.classList.add('hidden');

                  swiper.loopDestroy();
                  swiper.loopCreate();
                }
                else {
                  divError.classList.remove('hidden');
                  divError.innerHTML = 'Ошибка получения данных с ресурса: Yandex';
                }
            }
            catch {
                divError.classList.remove('hidden');
                divError.innerHTML = 'Ошибка получения данных с ресурса: Yandex';
            }
            }, 30000);
              
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
                    console.log(item.EpochDate);
                    console.log(date);
                    this.accuForecast[i].epochDate = `${date.getDate()}.${date.getMonth() + 1} ${weekdayShortTranslate[date.getDay()]}`;
                    let maxtemp = Math.round(item.Temperature.Maximum.Value), 
                        mintemp = Math.round(item.Temperature.Minimum.Value);
                    this.accuForecast[i].tempMin = mintemp;
                    this.accuForecast[i].tempMax = maxtemp;
                    this.accuForecast[i].iconPhrase = item.Day.IconPhrase;

                    if (i === 0) {
                      this.thisDayHighTemp = maxtemp;
                      this.thisDayLowTemp = mintemp;
                    }
                    
                  });           
                  console.log('GetAccuData - OK')
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
            }, 30000);
        },
        GetOpenWeatherAirData () {
          return 0
        },
        Todo (){
          //this.GetYandexData();
          this.GetAccuWeatherForecast();
        }
    },
    mounted: function(){
      this.Todo()
      //setTimeout(this.GetYandexData(), 5000);
    }
  }


Vue.createApp(app).mount('#app')

function SetTime(){
  let currentDate = new Date();
  let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
  document.getElementById('time').innerText = `${currentDate.getHours()}:${minutes}`;
  document.getElementById('dayOfWeek').innerText = `${weekdayFullTranslate[currentDate.getDay()]}`;
  document.getElementById('date').innerText = `${currentDate.getDate()} ${rusMonth[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

setInterval(SetTime(), 30000);

