// Factory that returns the forecast in the form of a single object
app.factory('ForecastFactory', function(ApiCallFactory) {
    var forecast = {};

    ApiCallFactory.then(function (response) {
        var data = response.data;
        console.log(data);
        forecast.today = {
            day: data.daily.data[0].time * 1000,
            state: normalizeState(data.currently.icon, true),
            high: Math.round(data.daily.data[0].temperatureMax),
            low: Math.round(data.daily.data[0].temperatureMin),
            precipitation: data.daily.data[0].precipProbability,
            humidity: data.daily.data[0].humidity,
            feelsLike: Math.round(data.currently.apparentTemperature),
            windSpeed: Math.round(data.currently.windSpeed)
        };

        forecast.week = new Array();

        for (var i = 1; i < 7; i++) {
            forecast.week.push({
                day: data.daily.data[i].time * 1000,
                state: normalizeState(data.daily.data[i].icon, false),
                high: Math.round(data.daily.data[i].temperatureMax),
                low: Math.round(data.daily.data[i].temperatureMin),
                precipitation: data.daily.data[i].precipProbability,
                humidity: data.daily.data[i].humidity,
                windSpeed: Math.round(data.daily.data[i].windSpeed)
            });
        };
    }, function(error) {
        console.log(error);
    });

    /* Converts the state of a day to a known state if different */
    function normalizeState(state, today) {
        var newState = state;
        if(!today) {
            if(state == 'clear-night') {
                newState = 'clear-day';
            }
            else if (state == 'partly-cloudy-night') {
                newState = 'partly-cloudy-day';
            }
        }
        if (state == 'sleet') {
            newState = 'snow';
        }
        else if (state == 'wind' || state == 'fog') {
            newState = 'cloudy';
        }
        return newState;
    };

    return forecast;
});
