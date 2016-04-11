// Default to miles
var milesOrKilo = 'miles';
// The number to display
var odometerMiles = 2100573;
// Create Kilometers
var odometerKilometers = Math.floor(odometerMiles*1.60934);
// Create an Array to store number positions later
window.odometerPositions = new Array();
// Change numbers to a strings
var odometerKilometersStr = odometerKilometers.toString();
var odometerMilesStr = odometerMiles.toString();
// Make Miles and Kilometers have the same number of "places"
if (odometerKilometersStr.length != odometerMilesStr.length) {
  odometerMilesStr = '0'+odometerMilesStr;
}
// Store window in var (performance)
var $window = $(window);
// ID names for places within the number
var odometerPlaces = [
  'ones',
	'tens',
	'hundreds',
	'thousands',
	'ten-thousands',
	'hundred-thousands',
	'millions',
	'ten-millions',
	'hundred-millions',
	'billions',
	'fuck-ton'
];
// Odometer Speed
var odometerSpeed = 8000;
// Create positions
function positionNums() {
	// The height of one number and set of numbers
	odometerNumHeight = $('#ones .odometer-num-0').outerHeight();
	singleColHeight = odometerNumHeight*10;

	// Create positions based on Kilometer since it's a bigger number
	for(var i = 0; i < odometerKilometersStr.length; i++){
		// Which number are we looking at?
		numOfNums = odometerMilesStr.length-i;
		placeNum = odometerMilesStr.substr(numOfNums-1,1);

		// What's the total height of this column
		totalColHeight = $('#'+odometerPlaces[i]+' .odometer-nums').height();
		// Find the amount to subtract from the column
		reminderColHeight = singleColHeight-(placeNum*odometerNumHeight);
		// Subtract total and remainder to get the final number position
		finalNumHeight = totalColHeight-reminderColHeight;

		// Create empty object in positions array
		window.odometerPositions[i] = {};
		// Store Miles in array
		window.odometerPositions[i].miles = finalNumHeight;

		// Repeat for Kilometers
		numOfNums = odometerKilometersStr.length-i;
		placeNum = odometerKilometersStr.substr(numOfNums-1,1);
		reminderColHeight = singleColHeight-(placeNum*odometerNumHeight);
		finalNumHeight = totalColHeight-reminderColHeight;

		// Store Kilometers in array
		window.odometerPositions[i].kilometers = finalNumHeight;
	}
}
// Animate numbers
function animateNums() {
	for(var i = 0; i < odometerKilometersStr.length; i++){
		$('#'+odometerPlaces[i]+' .odometer-nums').animate({
			top: -window.odometerPositions[i][milesOrKilo]+'px'
		}, odometerSpeed, 'easeOutCirc');
	}
	odometerSpeed = 800;
	$window.unbind('scroll');
}

jQuery(window).load(function() {
	// Create numbers
	for(var i = 0; i < odometerKilometersStr.length; i++){
		$('.odometer').prepend('<div id="'+odometerPlaces[i]+'" class="odometer-box"><ul class="odometer-nums"></ul></div>');
		numOfNums = odometerKilometersStr.length-i;
		//Create sets of numbers
		for(var x = 0; x < numOfNums; x++){
			// Create one set of numbers
			for(var y = 0; y < 10; y++){
				$('.odometer-nums').append('<li class="odometer-num-'+y+'">'+y+'</li>');
			}
		}
	}
	positionNums();
	// Animate when the element is visible on screen
	var curTop = ($('.odometer').offset().top)+150;
	var screenHeight = $(window).height();
	var screenOffSet = curTop-screenHeight;
	if(curTop > screenHeight) {
		// If Odometer is below the fold
		$window.scroll( function(){
			if ($window.scrollTop() > screenOffSet) {
				animateNums();
			}
		});
	} else {
		// If Odometer is above the fold
		animateNums();
	}
	// Miles/Kilometers Switch
	$('.odometer-miles-kilo a').click( function(event) {
		event.preventDefault();
		if (milesOrKilo != 'miles') {
			$('.odometer-miles-kilo a').text(milesOrKilo);
			milesOrKilo = 'miles';
			$('.odometer-logged span').text(milesOrKilo);
			animateNums();
		} else {
			$('.odometer-miles-kilo a').text(milesOrKilo);
			milesOrKilo = 'kilometers';
			$('.odometer-logged span').text(milesOrKilo);
			animateNums();
		}
	});
});