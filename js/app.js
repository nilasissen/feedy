var feedRead = angular.module('feedy', [])
feedRead.controller('feedyReady', [
	'FeedService',
	'$scope',
	'$http',
	'$rootScope',
	'$filter',
	 function(FeedService,$scope,$http,$rootScope,$filter){
	 	var self = this;
	 	//self.url = 'http://feeds2.feedburner.com/Mashable';
	 	//self.url = 'http://feeds.bbci.co.uk/news/rss.xml?edition=int';
	 	self.bbctechno = 'http://feeds.bbci.co.uk/news/technology/rss.xml?edition=int';
	 	self.katMovies = 'https://kat.cr/movies/?rss=1';	
	 	self.weatherStat = 'http://open.live.bbc.co.uk/weather/feeds/en/1275004/observations.rss';
		// conditions.sunny=Sunny
		// conditions.sunny-intervals=Sunny Intervals
		// conditions.partly-cloudy=Partly Cloudy
		// conditions.white-cloud=White Cloud
		// conditions.grey-cloud=Grey Cloud
		// conditions.light-rain-shower=Light Rain Shower
		// conditions.heavy-rain-shower=Heavy Rain Shower
		// conditions.light-rain=Light Rain
		// conditions.drizzle=Drizzle
		// conditions.heavy-rain=Heavy Rain
		// conditions.heavy-snow=Heavy Snow
		// conditions.clear-sky=Clear Sky
		// conditions.mist=Mist
	 	self.weatherDetails = [{
 				 "title": "Sunny",
 				 "img": "./img/sunny.jpg"
			},
			{
 				 "title": "Sunny Intervals",
 				 "img": "./img/sunnyIntrvl.jpg"
			},
			{
 				 "title": "Partly Cloudy",
 				 "img": "./img/partialySunny.jpg"
			},
			{
 				 "title": "White Cloud",
 				 "img": "./img/whiteCloud.jpg" 
			},
			{
 				 "title": "Grey Cloud",
 				 "img": "./img/geryCloud.jpg"
			},
			{
 				 "title": "Light Rain Shower",
 				 "img": "./img/lightRain.jpg"
			},
			{
 				 "title": "Heavy Rain Shower",
 				 "img": "./img/hvyrain.jpg"
			},
			{
 				 "title": "Light Rain",
 				 "img": "./img/lightRain.jpg"
			},
			{
 				 "title": "Drizzle",
 				 "img": "./img/drizzle.jpg"
			},
			{
 				 "title": "Heavy Rain",
 				 "img": "./img/hvyrain.jpg"
			},
			{
 				 "title": "Heavy Snow",
 				 "img": "./img/hvysnow.jpg"
			},
			{
 				 "title": "Clear Sky",
 				 "img": "./img/clrsky.jpg"
			},
			{
 				 "title": "Mist",
 				 "img": "./img/mist.jpg"
			},
			];			 	
	 	FeedService.parseFeed(self.weatherStat).then(function(res){	
	 		 self.weather=res.data.responseData.feed.entries;
	 		 self.weatherDetails.forEach(function(v,i){
	 		 	//console.log(v);
	 		 	if(self.weather[0].title.toLowerCase().indexOf(v.title.toLowerCase()) != -1){ /// text match from bbc string
	 		 		v.found = true;
	 		 		$rootScope.imgsrc = v.img;
	 		 		
	 		 	}
	 		 })
	 	})

	 	FeedService.parseFeed(self.bbctechno).then(function(res){
	 		 self.bbctechno=res.data.responseData.feed.entries;
	 	})
	 	// for kat.cr moviess
	 	self.katmov = [];
	 	FeedService.parseFeed(self.katMovies).then(function(res){
	 		if(res){
	 		 res.data.responseData.feed.entries.forEach(function(v,i){
	 		 	if(v.categories[0]==="Movies - Highres Movies"){
	 		 		v.hdTrue = true;
	 		 		self.katmov.push(v);
	 		 	}
	 		 	else {
	 		 		v.hdTrue = false;
	 		 		self.katmov.push(v);
	 		 	}
	 		 })
	 		  		console.log(self.katmov);
	 		 }
	 	})

}
])
feedRead.factory('FeedService', [
	'$http',
	 function($http){
	 return {
        parseFeed : function(url){
        	console.log(url);
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}])