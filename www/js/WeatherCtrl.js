// Main Controller moved in different file suggested by Adam Vigneaux
app.controller('WeatherCtrl', function($scope, $ionicSideMenuDelegate,
    ForecastFactory) {

    var weather = this;
    var celsius = false;
    var kmh = false;
    var SPEED_UNIT_CONSTANT = 0.62137;

    weather.forecast = ForecastFactory;

    $scope.temperatureUnitList = [
        { text: "Fahrenheit", value: "f" },
        { text: "Celcius", value: "c" }
    ];

    $scope.speedUnitList = [
        { text: "Mph", value: "mph" },
        { text: "Km/h", value: "kmh" }
    ];

    $scope.data = {
        temperature: 'f',
        speed: 'mph'
    };

    weather.currentUnits = {
        temperature: 'F',
        speed: 'mph'
    };

    $scope.speedUnitChange = function(item) {
        kmh = !kmh;

        //today
        weather.forecast.today.windSpeed = invertSpeedUnit(weather.forecast.today.windSpeed);

        //week
        weather.forecast.week.forEach(function(day) {
            day.windSpeed = invertSpeedUnit(day.windSpeed);
        });

        //unit
        if(kmh) {
            weather.currentUnits.speed = 'km/h';
        }
        else {
            weather.currentUnits.speed = 'mph';
        }
    };

    $scope.temperatureUnitChange = function(item) {
        celsius = !celsius;

        //today
        weather.forecast.today.high = invertTempUnit(weather.forecast.today.high);
        weather.forecast.today.low = invertTempUnit(weather.forecast.today.low);
        weather.forecast.today.feelsLike = invertTempUnit(weather.forecast.today.feelsLike);

        //week
        weather.forecast.week.forEach(function(day) {
            day.high = invertTempUnit(day.high);
            day.low = invertTempUnit(day.low);
        });
    };

    /* Converts temperature from Celsius to Fahrenheit or
    from Fahrenheit to Celsius */
    function invertTempUnit(temp) {
        var newTemp;

        if(celsius) {
            newTemp = Math.round((temp - 32) * (5/9));
        }
        else {
            newTemp = Math.round((temp * 1.8) + 32);
        }
        return newTemp;
    };

    /* Converts speed from mph to km/h or from km/h to mph */
    function invertSpeedUnit(speed) {
        var newSpeed;

        if(kmh) {
            newTemp = Math.round(speed/SPEED_UNIT_CONSTANT);
        }
        else {
            newTemp = Math.round(speed * SPEED_UNIT_CONSTANT);
        }
        return newTemp;
    };
});
