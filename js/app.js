$(document).ready(function(){

	$('.alert').hide();



});



$('#search').click(function() {

	var location = $("#searchbox").val();


	// if (navigator.geolocation) {
 //    	navigator.geolocation.getCurrentPosition(function(position){
 //    		console.log('Your latitude is :' + position.coords.latitude + ' and longitude is ' + position.coords.longitude);
 //    	});
	// } else {
 //    	alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
	// }

	var query = {
		ll : '37.3175,-122.0419',
		radius : '1000',
		categoryId : '4d4b7105d754a06374d81259',
		clientId : 'TFXPVJEYX03UAUEMVSNRDWD40BWCECBN14G4SILJLLNQHNHQ',
		clientSecret : 'IIKJYI12T5IUQ5MUFB0STWXU4BZ5WNTESVCLW1HOFJQCUPTV',
		version : '20140806',
		m : 'foursquare'
	};

	$.get('https://api.foursquare.com/v2/venues/search?ll=' + query['ll'] 
		+ '&radius=' + query['radius'] 
		+ '&categoryId=' + query['categoryId'] 
		+ '&client_id=' + query['clientId'] 
		+ '&client_secret=' + query['clientSecret'] 
		+ '&v=' + query['version'] 
		+ '&m=' + query['m'],
		function(data) { 
			var response = data["response"];
			var id = '';
			for( var i = 0; i < response["venues"].length; i++){

				// console.log(location.toLowerCase().replace(/\s/g,''));
				// console.log((response["venues"][i]["name"].toLowerCase().replace(/\s/g,'')));

				if((response["venues"][i]["name"].toLowerCase().replace(/\s/g,''))
					.indexOf(location.toLowerCase().replace(/\s/g,'')) > -1){
					
					// console.log(location.toLowerCase().replace(/\s/g,''));
					id = response["venues"][i]["id"];
					// console.log(id);
					break;
				}
			}
			if(id.length === 0){
				console.log("unable to find restaurant near location");
				$('.alert').show();
			}
			else{
				var clientSecret = 'IIKJYI12T5IUQ5MUFB0STWXU4BZ5WNTESVCLW1HOFJQCUPTV';
				var clientId = 'TFXPVJEYX03UAUEMVSNRDWD40BWCECBN14G4SILJLLNQHNHQ';

				$.get('https://api.foursquare.com/v2/venues/' + id + '/menu?' + 'client_id=' + clientId
					+ '&client_secret=' + clientSecret + '&v=20140806&m=foursquare',
					function (data) {
						var menu = data["response"]["menu"]["menus"]["items"][0]["entries"]["items"];
						for(var i = 0; i < menu.length; i++){
							for(var j = 0; j < menu[i]["entries"]["items"].length; j++){
								var nextRow = '<tr><td>' + menu[i]["entries"]["items"][j]["name"] + '</td>'
								+ '<td>' + menu[i]["entries"]["items"][j]["price"] + '</td>' + '</tr>';
								$('#menu-table tbody').append(nextRow);
								// console.log(menu[i]["entries"]["items"][j]["name"]);
							}
						}

					});

			}




		});

});