$(document).ready(function(){

	$('.alert').hide();

});

$("#searchbox").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
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


				if((response["venues"][i]["name"].toLowerCase().replace(/[^a-z0-9]+/g,''))
					.indexOf(location.toLowerCase().replace(/[^a-z0-9]+/g,'')) > -1){
					
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

				$('#menu-table tbody').empty();

				$('.alert').hide();

				$('#searchbox').val(response["venues"][i]["name"]);

				var clientSecret = 'IIKJYI12T5IUQ5MUFB0STWXU4BZ5WNTESVCLW1HOFJQCUPTV';
				var clientId = 'TFXPVJEYX03UAUEMVSNRDWD40BWCECBN14G4SILJLLNQHNHQ';
				var food = [];

				$.get('https://api.foursquare.com/v2/venues/' + id + '/menu?' + 'client_id=' + clientId
					+ '&client_secret=' + clientSecret + '&v=20140806&m=foursquare',
					function (data) {
						var menu = data["response"]["menu"]["menus"]["items"][0]["entries"]["items"];
						for(var i = 0; i < menu.length; i++){
							for(var j = 0; j < menu[i]["entries"]["items"].length; j++){

								
								food.push(menu[i]["entries"]["items"][j]["name"]);
								
								var nextRow = '<tr><td>' + menu[i]["entries"]["items"][j]["name"] + '</td>'
								+ '<td>' + menu[i]["entries"]["items"][j]["price"] + '</td>' + '</tr>';
								$('#menu-table tbody').append(nextRow);								

							}
						}
						var q = 'https://api.nutritionix.com/v1_1/search/' 
								+ location 
								+ '?results=0%3A50&fields='
								+ 'item_name%2Cbrand_name%2Citem_id%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_sodium'
								+ '&appId=afe236a3&appKey=a612738872e7761fa189ce3794796d50';

						var dataObj = [];

						var CAL = 1;
						var PRICE = 80;
						var LOW_PROTEIN = 1000;
						var HIGH_PROTEIN = 10000;
						var LOW_FAT = 100;
						var HIGH_FAT = 10;
						
						$.get(q,function(data){
							for(var i = 0; i < food.length; i++){
								for(var j = 0; j < data["hits"].length; j++){
									var f = food[i].toLowerCase().replace(/[^a-z0-9]+/g,'');
									var of = data["hits"][j]["fields"]["item_name"].toLowerCase().replace(/[^a-z0-9]+/g,'');
									if(of.indexOf(f) > -1){
										dataObj.push( {
											"food" : food[i],
											"calories" : data["hits"][j]["fields"]["nf_calories"],
											"fat" : data["hits"][j]["fields"]["nf_total_fat"],
											"protein" : data["hits"][j]["fields"]["nf_protein"],

											

											"score" : ((1 / (((parseInt(data["hits"][j]["fields"]["nf_calories"]))+1)/CAL)) * ((parseInt(data["hits"][j]["fields"]["nf_protein"])+1)/LOW_PROTEIN) * (1/((parseInt(data["hits"][j]["fields"]["nf_total_fat"])+1)*HIGH_FAT)))*10000000

										});
										break;
									} 
								}	
							}
							

							function compare(a,b) {
									if (a["score"] < b["score"])
     									return 1;
  									if (a["score"] > b["score"])
   										return -1;
  									return 0;
								
							}						

							dataObj.sort(compare);
							
							var calUI = 300;

							console.log(dataObj);

							
							// deletes objects with calories out of bounds	
							for (var i = 0 ; i < dataObj.length; i++){
								if (dataObj[i]["calories"] > calUI)
									delete dataObj[i];
							}


							function compareCal(a,b) {
									if (a["calories"] > b["calories"])
     									return 1;
  									if (a["calories"] < b["calories"])
   										return -1;
  									return 0;
								
							}

							dataObj.sort(compareCal)


							var max = 0;
							// debug this part, this method gives all of the possible combination for food items that have less than the maximum amount of calories.
							function combinations(){
								for (var i = 0 ; i < dataObj.length; i++){

									if (max < calUI){
										max+=parseInt(dataObj[i]["calories"]); 
										alert(parseInt(dataObj[i]["calories"]));
										//m.push(i);
									} else {
										alert(dataObj);
										delete dataObj[i];
									}

								} 

							}

							dataObj.sort(compare);

							console.log(dataObj);
						});

					});

			}

		});

});