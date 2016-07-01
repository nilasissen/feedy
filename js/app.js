var feedRead = angular.module('feedy', [])
feedRead.controller('feedyReady', [
	'FeedService',
	'$scope',
	'$http',
	 function(FeedService,$scope,$http){
	 	var self = this;
	 	//self.url = 'http://feeds2.feedburner.com/Mashable';
	 	//self.url = 'http://feeds.bbci.co.uk/news/rss.xml?edition=int';
	 	self.bbctechno = 'http://feeds.bbci.co.uk/news/technology/rss.xml?edition=int';
	 	self.katMovies = 'https://kat.cr/movies/?rss=1';	

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
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}])