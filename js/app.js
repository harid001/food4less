var click = 0;
var tname;

$(document).ready(function(){

	$('.alert').hide();
<<<<<<< HEAD
	// $('#menu-table').empty();

=======
    $('#money').hide();
    $('#calories').hide();
    $('#sidenote').hide();
    $('#search').hide();
    $('#next').hide();
    $('#again').hide();
    $('#menu-table').hide();
    $('#save').hide();
    $('#chart').hide();
    $("input:text:visible:first").focus();
    $('.element').hide();
    $('#final-table').hide();
    $('#calories-input').hide();
    $('#eat').hide();
    
>>>>>>> trevor-format
});
$('.alert').hide();

$('.form-control').keyup(function(event){
    if(event.keyCode == 13){
        if(click % 3 < 2){
            $('#next').click();
        }
        else{
            $('#search').click();
        }
    }
});

$('#next').click(function() {
    click++;
    switch(click){
            case 1:
                tname = $('#restaurant-input').val();
                
               
                if(tname == '' ){
                    click--;
                } else{
                    $('#restaurant').fadeOut('slow');
                    
                    $('#money').delay("slow").fadeIn('slow'); 
                    $('#sidenote').delay("slow").fadeIn('slow'); 
                    $('#calories-input').val("");
                    $('#money').focus();
                }
                break;
            case 2:
                var cost = $('#money-input').val();
                if(cost == '' ){
                    click--;
                }
                else{
                    $('#money').fadeOut('slow'); 
                    $('#next').fadeOut("slow");
                    $('#calories').delay("slow").fadeIn('slow');
                }
                break;
    }
});

$('#low').click(function(){
    $('#calories-input').val('low');
    $('#search').click();
});
    
$('#medium').click(function(){
    $('#calories-input').val('medium');
    $('#search').click();
});

$('#high').click(function(){
    $('#calories-input').val('high');
    $('#search').click();
});

$('#again').click(function() {
    click = 0;
    //reset chart
    //reset variables
    $('#restaurant').delay("slow").fadeIn("slow");
    //reset inputs
    $('#calories-input').val("");
    $('#money-input').val("");
});

$('#search').click(function() {
    var calories = $('#calories-input').val()
    if(calories == ''){
    }
    else{
    $('#calories').fadeOut('slow'); 
    $('#t1-caption').text("menu for " + tname);
    $('#sidenote').fadeOut("slow");
    $("#final-table").find("tr:gt(0)").remove();
    click = 0;
    //reset chart
    //reset variables

    
    $('#restaurant').delay("slow").fadeIn("slow");
    
    //reset inputs
    
    $('#money-input').val("");
    // fade in restaurant name
        
    
    
    
	

//     var llong = '';
//	 if (navigator.geolocation) {
//     	navigator.geolocation.getCurrentPosition(function(position){
//     		llong = '37' + ',' + '-122';
//            console.log(llong);
//     	});
//	 } else {
//     	alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which             supports it.');
//	 }
        
        //'37.3175,-122.0419'

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
			var response = data['response'];
			var id = '';
			for( var i = 0; i < response['venues'].length; i++){


				if((response['venues'][i]['name'].toLowerCase().replace(/[^a-z0-9]+/g,''))
					.indexOf(tname.toLowerCase().replace(/[^a-z0-9]+/g,'')) > -1){
					
					// console.log(tname.toLowerCase().replace(/\s/g,''));
					id = response['venues'][i]['id'];
					// console.log(id);
					break;
				}
			}
			if(id.length === 0){
				console.log('unable to find restaurant near location');
				$('.alert').show();
			}
			else{
<<<<<<< HEAD

				$('#menu-table').empty();


				



				// var table_header = '<th>'+"Item"+'</th><th>'+"Cost"+'</th>';
				// console.log("before table");
				// $('#menu-table thead').append(table_header);
				// console.log("thead built");
				// console.log($('#menu-table').html());
				createTHead();
				$('menu-table').show();
=======
                $('.form-group').delay("fast").animate({paddingTop: '0'},800, "linear");
                
				$('#menu-table tbody').empty();
>>>>>>> trevor-format

				$('.alert').hide();

				$('#searchbox').val(response['venues'][i]['name']);

				var clientSecret = 'IIKJYI12T5IUQ5MUFB0STWXU4BZ5WNTESVCLW1HOFJQCUPTV';
				var clientId = 'TFXPVJEYX03UAUEMVSNRDWD40BWCECBN14G4SILJLLNQHNHQ';
				var food = [];
                var dataObj = [];
                var prices = [];

				$.get('https://api.foursquare.com/v2/venues/' + id + '/menu?' + 'client_id=' + clientId
					+ '&client_secret=' + clientSecret + '&v=20140806&m=foursquare',
					function (data) {
						var menu = data['response']['menu']['menus']['items'][0]['entries']['items'];
						for(var i = 0; i < menu.length; i++){
							for(var j = 0; j < menu[i]['entries']['items'].length; j++){

								
								food.push(menu[i]['entries']['items'][j]['name']);
                                if(menu[i]['entries']['items'][j]['price'] === undefined){
                                    var o = Math.floor((Math.random()*5)+1);
										if (o < 3)
											o+=0.99;
										else
											o+=0.49;
                                    prices.push(o);
                                }
                                else{
                                    prices.push(menu[i]['entries']['items'][j]['price']);
                                }
								
<<<<<<< HEAD
								var nextRow = '<tr><td>' + menu[i]["entries"]["items"][j]["name"] + '</td>'
								+ '<td>' + menu[i]["entries"]["items"][j]["price"] + '</td>' + '</tr>';
								// console.log(nextRow);
								$('#menu-table').append(nextRow);	
								// console.log($('#menu-table tbody').html());
								// console.log($('#menu-table').html());							
=======
								var nextRow = '<tr><td>' + menu[i]['entries']['items'][j]['name'] + '</td>'
								+ '<td class = "price">' + menu[i]['entries']['items'][j]['price'] + '</td>' + '</tr>';
								$('#menu-table tbody').append(nextRow);
                                
>>>>>>> trevor-format

							}
						}
                        
                        
                        
						var q = 'https://api.nutritionix.com/v1_1/search/' 
								+ tname 
								+ '?results=0%3A50&fields='
								+ 'item_name%2Cbrand_name%2Citem_id%2Cnf_calories%2Cnf_protein%2Cnf_total_fat%2Cnf_sodium'
								+ '&appId=afe236a3&appKey=a612738872e7761fa189ce3794796d50';
                    
                        var CAL = 1;
                        var PRICE = 75;
                        var LOW_PROTEIN = 1000;
                        var HIGH_PROTEIN = 10000;
                        var LOW_FAT = 100;
                        var HIGH_FAT = 10;
                     

						$.get(q,function(data){
							for(var i = 0; i < food.length; i++){
								for(var j = 0; j < data['hits'].length; j++){
									var f = food[i].toLowerCase().replace(/[^a-z0-9]+/g,'');
									var of = data['hits'][j]['fields']['item_name'].toLowerCase().replace(/[^a-z0-9]+/g,'');
									if(of.indexOf(f) > -1){
										dataObj.push({
                                            'food' : food[i],
											'calories' : data['hits'][j]['fields']['nf_calories'],
											'fat' : data['hits'][j]['fields']['nf_total_fat'],
											'protein' : data['hits'][j]['fields']['nf_protein'],
                                            'prices' : prices[i]
										});
                                        //if(prices[i] !== "undefined") { dataObj['prices'] = prices[i]; }
										break;
									} 
								}
                                
//                                for(var z = 0; z < dataObj.length; z++){
//									if (prices[z] === undefined){
//										var r = Math.floor((Math.random()*5)+1);
//										if (r < 3)
//											r+=0.99;
//										else
//											r+=0.49;
//										
//										dataObj[z]["prices"] = r;
//                                        prices[z] = r;
//
//									}
//                                    prices[z] = r;
//                                    //$('#menu-table tbody:nth-child(' + z + '):nth-child(2)').val(dataObj[z]["prices"]);
//                                    
//                                }
                                
                                for(var x = 0; x < dataObj.length; x++){
									// take out prices it screws up 
								
									
									var calor = (1 / (((dataObj[x]["calories"])+1)/CAL));
									var prot = ((dataObj[x]["protein"]+1)/LOW_PROTEIN);
									var tfat = (1/((dataObj[x]["fat"]+1)*HIGH_FAT));
									var prce = (1/((dataObj[x]["prices"]+.01)*PRICE));

									dataObj[x]["score"] = (calor * prot * tfat * prce)*10000000;
									
								}   
							}
                            $(".price").each(function(index){
                                $(this).text(prices[index]);
                            });
                            
                            var calUI = 300;
                           
							
							var sum = 0;
							for (var i = 0; i < dataObj.length; i++){
								sum += dataObj[i]["calories"];
							}
                            
							calUI = sum/dataObj.length;
                            
                           
                            
                            var cals = [];
                            for(var i = 0; i < dataObj.length; i++){
                                cals.push(dataObj[i]["calories"]);
                            }
                            
                            var sd = Math.sqrt(variance(cals));
                            
                            function isNum(args)
                            {
                                args = args.toString();

                                if (args.length == 0) return false;

                                for (var i = 0;  i<args.length;  i++)
                                {
                                    if ((args.substring(i,i+1) < "0" || args.substring(i, i+1) > "9") && args.substring(i, i+1) != "."&&                                        args.substring(i, i+1) != "-")
                                    {
                                        return false;
                                    }
                                }

                                return true;
                            }

                            //calculate the mean of a number array
                            function mean(arr)
                            {
                                var len = 0;
                                var sum = 0;

                                for(var i=0;i<arr.length;i++)
                                {
                                      if (arr[i] == ""){}
                                      else if (!isNum(arr[i]))
                                      {
                                          alert(arr[i] + " is not number!");
                                          return;
                                      }
                                      else
                                      {
                                         len = len + 1;
                                         sum = sum + parseFloat(arr[i]); 
                                      }
                                }

                                return sum / len;    
                            }

                            function variance(arr)
                            {
                                var len = 0;
                                var sum=0;
                                for(var i=0;i<arr.length;i++)
                                {
                                      if (arr[i] == ""){}
                                      else if (!isNum(arr[i]))
                                      {
                                          alert(arr[i] + " is not number, Variance Calculation failed!");
                                          return 0;
                                      }
                                      else
                                      {
                                         len = len + 1;
                                         sum = sum + parseFloat(arr[i]); 
                                      }
                                }

                                var v = 0;
                                if (len > 1)
                                {
                                    var mean = sum / len;
                                    for(var i=0;i<arr.length;i++)
                                    {
                                          if (arr[i] == ""){}
                                          else
                                          {
                                              v = v + (arr[i] - mean) * (arr[i] - mean);              
                                          }        
                                    }

                                    return v / len;
                                }
                                else
                                {
                                     return 0;
                                }    
                            }
                            
                            var alpha = $('#calories-input').val();
                            if(alpha.toLowerCase().replace(/[^a-z0-9]+/g,'') === 'high'){
                               calUI += 1.5*sd;     
                            }
                            else if(alpha.toLowerCase().replace(/[^a-z0-9]+/g,'') === "medium"){
                                
                            }
                            else if(alpha.toLowerCase().replace(/[^a-z0-9]+/g,'') === "low"){
                                calUI -= 1.5*sd  
                            } else {
                                console.log("fucked");    
                            }

                            
                            function compare(a,b) {
									if (a["score"] < b["score"])
     									return 1;
  									if (a["score"] > b["score"])
   										return -1;
  									return 0;
								
							}						
							

							var dataObj2 = [];
                            var maxMoney = $('#money-input').val();
                            console.log(maxMoney);
							// deletes objects with calories out of bounds	
							for (var i = 0 ; i < dataObj.length; i++){
								if (dataObj[i]["calories"] < calUI || dataObj[i]["prices"] < parseInt(maxMoney)){
									//delete dataObj[i];
                                    dataObj2.push(dataObj[i]);
								}
							}


							function compareCal(a,b) {
									if (a["calories"] > b["calories"])
     									return 1;
  									if (a["calories"] < b["calories"])
   										return -1;
  									return 0;
								
							}


							var ans = [];
							var foodNum = 1;
							//console.log(dataObj2);
							dataObj2.sort(compare);

							if (foodNum == 2){	

								for (var i = 0; i < dataObj2.length; i++){
									for (var j = i+1; j < dataObj2.length; j++){
										if (dataObj2[i]["calories"]+dataObj2[j]["calories"] < calUI){
											ans.push(dataObj2[i]);
											ans.push(dataObj2[j]);
										} 
									}
								}

                                
                                

							} else {
								console.log(dataObj2);
                                var cost = ['Cost'];
                                var calories = ['Calories'];
                                var foodNames = [];    
                            
                                for(var l = 0; l < 5; l++){
                                    try {
                                        cost.push(dataObj2[l]["prices"]);
                                        calories.push(dataObj2[l]["calories"]);
                                        foodNames.push(dataObj2[l]["food"]);
                                    } catch(err) {continue;}
                                }
                                
                                 var chart = c3.generate({
                                    data: {
                                        columns: [
                                            cost,
                                            calories
                                        ],
                                        type: 'bar',
                                        colors:{
                                            Cost: '#5cb85c',
                                            Calories: '#000000'
                                        },
                                        axes: {
                                            Calories: 'y',
                                            Cost: 'y2'
                                        }
                                    },
                                    bar: {
                                        width: {
                                            ratio: 0.5 // this makes bar width 50% of length between ticks
                                        }
                                        // or
                                        //width: 100 // this makes bar width 100px
                                    },
                                    axis: {
                                        x: {
                                            type: 'category',
                                            categories: foodNames
                                        },
                                        y2: {
                                            show: true
                                        }
                                    }
                                });
                                
                                
                                $('#chart').delay("slow").fadeIn("slow");

                                
                                for(var i = 0; i < 5; i++){
                                    console.log(dataObj2[0]['food']);
                                    try{
                                        
                                        var nextRow = '<tr><td>' + dataObj2[i]['food']+ '</td>'
                                        + '<td class = "price">' + dataObj2[i]['prices'] + '</td><td class = "price" >' + dataObj2[i]                                                ['calories']
                                        + '</td><td class = "price">' +  dataObj2[i]['fat'] + '</td><td class = "price">' + dataObj2[i]                                             ['protein'] + '</td></tr>';
                                        
                                        $('#final-table tbody').append(nextRow);
                                        
                                    } catch(err) {continue;}
                                }
                                
                                $('.element').delay("slow").fadeIn('slow');
                                
                                go();
                                                                
                                $('#final-table').delay('slow').fadeIn('slow');
                                
                                $('#menu-table').delay('slow').fadeIn('slow');
                                
                                $('#eat').delay('slow').fadeIn('slow');
                                
                                
							}
                            
						});

					});

			}


		});
<<<<<<< HEAD

function createTHead() {
        var x = document.getElementById("menu-table");
        // if (!x.tHead) {
            var header = x.createTHead();
            var row = header.insertRow(0);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = "Item";
            var cell1 = row.insertCell(1);
            cell1.innerHTML = "Cost";
        // }
    }


=======
    }
>>>>>>> trevor-format
});