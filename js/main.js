var temperature, degreeCelsius;

	$(document).ready(function(){

		getLocation();

		function getLocation(){
			var url = 'http://ipinfo.io';
			
			/*if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(location){
					getWeather(location.coords.latitude, location.coords.longitude);
				});
			}*/

			$.get(url, function(data){
				var d = data.loc.split(',');
				getWeather(d[0], d[1]);	
			},"jsonp");
		}

		$('.search').keyup(function(event){
			if(event.keyCode == 13){
				var name = $('.search').val();

				getCityWeather(name);
			}
		});

		$('#unit').on('click',function(){
			if(degreeCelsius)
				$('#temp').html(parseInt(toDegreeFahreneit(temperature)));
			else{
				degreeCelsius = true;
				$('#temp').html(parseInt(temperature));
			}
		});

	});

	function getWeather(latitude, longitude){

		var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+"&units=metric"+'&appid=03fa3dff1c6db5047f530c1ceaf5d3b3';

		$.get(weatherAPI,function(weatherData){

				temperature = weatherData.main.temp;
				temperature = parseInt(temperature);
				degreeCelsius = true;
				
				$('.location').animate({opacity: 0},500,function(){
					$('.location').animate({opacity: 1},500);
					$('#name').html(weatherData.name+" , "+weatherData.sys.country);
					$('#t').html(weatherData.weather[0].main);
				});

				$('.displayWeather').animate({opacity: 0},500,function(){
					$('.displayWeather').animate({opacity: 1},500);
					$('#temp').html(temperature);
				});

				$('#icon').animate({opacity: 0}, 500, function(){
					$('#icon').animate({opacity: 1}, 500);
					$('#icon').attr('src','http://openweathermap.org/img/w/'+weatherData.weather[0].icon+'.png');
				});
				
				$('#windContent').animate({opacity: 0}, 500, function(){
					$('#windContent').animate({opacity: 1}, 500);
					$('#windContent').html(weatherData.wind.speed+" mps");	
				});
				
				$('#humidityContent').animate({opacity: 0}, 500, function(){
					$('#humidityContent').animate({opacity: 1}, 500);
					$('#humidityContent').html(weatherData.main.humidity+" %");
				});
				
				$('#pressureContent').animate({opacity: 0}, 500, function(){
					$('#pressureContent').animate({opacity: 1}, 500);
					$('#pressureContent').html(weatherData.main.pressure+" hPa");
				});
				
			},"jsonp");
	}

	function getCityWeather(cityName){
		console.log(cityName);

		var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+"&units=metric"+'&appid=03fa3dff1c6db5047f530c1ceaf5d3b3';


		$.get(weatherAPI,function(weatherData){

				temperature = weatherData.main.temp;
				temperature = parseInt(temperature);
				degreeCelsius = true;
				
				$('.location').animate({opacity: 0},500,function(){
					$('.location').animate({opacity: 1},500);
					$('#name').html(weatherData.name+" , "+weatherData.sys.country);
					$('#t').html(weatherData.weather[0].main);
				});

				$('.displayWeather').animate({opacity: 0},500,function(){
					$('.displayWeather').animate({opacity: 1},500);
					$('#temp').html(temperature);
				});

				$('#icon').animate({opacity: 0}, 500, function(){
					$('#icon').animate({opacity: 1}, 500);
					$('#icon').attr('src','http://openweathermap.org/img/w/'+weatherData.weather[0].icon+'.png');
				});
				
				$('#windContent').animate({opacity: 0}, 500, function(){
					$('#windContent').animate({opacity: 1}, 500);
					$('#windContent').html(weatherData.wind.speed+" mps");	
				});
				
				$('#humidityContent').animate({opacity: 0}, 500, function(){
					$('#humidityContent').animate({opacity: 1}, 500);
					$('#humidityContent').html(weatherData.main.humidity+" %");
				});
				
				$('#pressureContent').animate({opacity: 0}, 500, function(){
					$('#pressureContent').animate({opacity: 1}, 500);
					$('#pressureContent').html(weatherData.main.pressure+" hPa");
				});
				
			},"jsonp");
	}
	
	function toDegreeFahreneit(temp){
		degreeCelsius = false;
		return temp*1.8+32;
	}