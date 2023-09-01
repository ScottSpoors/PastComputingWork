window.addEventListener('load', function(){
	"use strict";
	
	const URL = 'getOffers.php';
	
	const fetchData = function(){
		fetch(URL)
		.then(
			function(response){
				if(response.status===200)
				{
					return response.json();
				}
			}
		)
		.then(
			function(json){
				document.getElementById("offers").innerHTML = "<h2>Current Offers</h2>";
				document.getElementById("offers").innerHTML += json.toyName;
				document.getElementById("offers").innerHTML += "<br>";
				document.getElementById("offers").innerHTML += json.catDesc;
				document.getElementById("offers").innerHTML += "<br>";
				document.getElementById("offers").innerHTML += json.toyPrice;
			}
		)
		.catch(
			function(err){
				console.log("Something went wrong.", err);
			}
		);
	}
	fetchData();
	setInterval(fetchData, 5000);
});