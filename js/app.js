
$('#search').click(function() {


	// if (navigator.geolocation) {
 //    	navigator.geolocation.getCurrentPosition(function(position){
 //    		console.log('fuck');
 //    		console.log('Your latitude is :' + position.coords.latitude + ' and longitude is ' + position.coords.longitude);
 //    	});
	// } else {
 //    	alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
	// }

	$.get('https://api.foursquare.com/v2/venues/search?ll=37.3175,-122.0419&radius=1000&categoryId=4d4b7105d754a06374d81259&client_id=TFXPVJEYX03UAUEMVSNRDWD40BWCECBN14G4SILJLLNQHNHQ&client_secret=IIKJYI12T5IUQ5MUFB0STWXU4BZ5WNTESVCLW1HOFJQCUPTV&v=20140806&m=foursquare',
		function(data) { console.log(data); });

});