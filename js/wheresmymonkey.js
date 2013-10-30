/* 
	Why we need to use pageinit instead of $(document).ready
	http://stackoverflow.com/questions/14468659/jquery-mobile-document-ready-vs-page-events and http://jquerymobile.com/demos/1.2.0/docs/api/events.html
*/

/* If you include the id of a "page" in the pageinit, it will only run the script when the "page" is active */
// $(document).bind('pageinit') {
// $( document ).ready(function() {  // Used for websites other than mobile

$( document ).on( "pageinit", "#keno", function( event ) {
	/* Keno page */
	var gmNbr = [12,22,29,38,52,18,72,69,77,10,14];
	var index = 0;
	/* Keno show numbers. In a timeout so it doesn't start right away. */
	setTimeout(function() {
		function showNum() {
			var card = document.getElementById ("gmNbr" + gmNbr[index]);
			card.className = "gmNbr gmNbrOn";
			index = index + 1;
			if( index < gmNbr.length )
				setTimeout(function(){showNum()},1000);
			else
				document.getElementById('completeMsg').innerHTML = 'Game Complete';
			return false;
		}
		
	showNum();
		
	},4000);
});

// Ajax request for dynamic content
$( document ).on( "pageinit", "#home", function( event ) {
	var siteURL = $(location).attr('href');
	$.ajax({
		url: siteURL + "/pages/home.html",
		cache: false
	})
	.done(function( html ) {
		$( "#homeContent" ).append( html );
	}); 
});

// Geolocation - http://the-jquerymobile-tutorial.org/jquery-mobile-tutorial-CH23.php
$( document ).on( "pageinit", "#geolocation", function( event ) {
	navigator.geolocation.getCurrentPosition (function (pos)
	{
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		$("#lat").val (lat);
		$("#lng").val (lng);
	});

	$("#btnMap").bind ("click", function (event) {
		var lat = $("#lat").val ();
		var lng = $("#lng").val ();
		var latlng = new google.maps.LatLng (lat, lng);
		var options = { 
			zoom : 13, 
			center : latlng, 
			mapTypeId : google.maps.MapTypeId.ROADMAP 
		};
		var $content = $("#map div:jqmData(role=content)");
		$content.height (screen.height - 50);
		var map = new google.maps.Map ($content[0], options);
		$.mobile.changePage ($("#map"));

		new google.maps.Marker ( 
		{ 
			map : map, 
			animation : google.maps.Animation.DROP,
			position : latlng  
		});  
	});
});

// Random Excuse Generator
$( document ).on( "pageinit", "#reg", function excuse( event ) {
	var myRandom = Math.floor((Math.random()*11)+1);
	var myQuotes = [];
	myQuotes[0] = "Everything is on track";
	myQuotes[1] = "Have an update for you Wednesday";
	myQuotes[2] = "Paperwork is signed, lawyers need to finish up a few more details";
	myQuotes[3] = "Let's meet at 10am tomorrow";
	myQuotes[4] = "Moving the meeting to 3pm";
	myQuotes[5] = "Let's meet at the pub around 4pm";
	myQuotes[6] = "Have an update by close of Business Friday";
	myQuotes[7] = "We have another group that is interested. Literally on the phone with them now";
	myQuotes[8] = "CSRH is due to close funding by close of business tomorrow";
	myQuotes[9] = "Can't discuss the details right now, let's meet first thing tomorrow";
	myQuotes[10] = "On track";
	myQuotes[11] = "Call you on Saturday";
	myQuotes[12] = "Bally has come back to us with an offer";
	$("#excuse").text(myQuotes[ myRandom ]);
	
	$( "#newExcuse" ).bind( "click", function(event) {
	  excuse();
	});
});

