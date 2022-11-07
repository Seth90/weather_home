const Counter = {
    data() {
      return {
        city: 'Иваново',
        currentTemp: -1,
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
        ]
      }
    },
    methods: {
        GetData () {
            let options = {
                method: 'GET',      
                headers: {}
              };
              
              fetch('http://127.0.0.1:3000/ya_data', options)
              .then(response => response.json())
              .then(json => {
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

                this.parts[0].partName = json.forecast.parts[0].part_name;
                this.parts[0].tempMin = json.forecast.parts[0].temp_min;
                this.parts[0].tempMax = json.forecast.parts[0].temp_max;
                this.parts[0].condition = json.forecast.parts[0].condition;

                this.parts[1].partName = json.forecast.parts[1].part_name;
                this.parts[1].tempMin = json.forecast.parts[1].temp_min;
                this.parts[1].tempMax = json.forecast.parts[1].temp_max;
                this.parts[1].condition = json.forecast.parts[1].condition;

              });
              
        }
    }
  }


Vue.createApp(Counter).mount('#app')