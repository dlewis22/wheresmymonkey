<!-- flogin - http://garyrafferty.com/flogin/ -->
$(function() {
	$('#login').facebook_login({
		appId: '61553152672',							// your facebook application id
		endpoint: 'sessions/new',						// where to POST the response to
		onSuccess: function(data) {alert("Success");},	// what to do on success
		onError: function(data) {alert("Failed");},		// what to do on error
		permissions: 'read_stream'						// what permissions you need, default is just email
	});
});

<!-- Activity - https://developers.facebook.com/docs/plugins/activity/ -->
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=61553152672";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* 
	Why we need to use pageinit instead of $(document).ready
	http://stackoverflow.com/questions/14468659/jquery-mobile-document-ready-vs-page-events and http://jquerymobile.com/demos/1.2.0/docs/api/events.html
*/

/* If you include the id of a "page" in the pageinit, it will only run the script when the "page" is active */
// $(document).bind('pageinit') {
// alert ("pageinit complete");
// $( document ).ready(function() {  // Used for websites other than mmobile

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
