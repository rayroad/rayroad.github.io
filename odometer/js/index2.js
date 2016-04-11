// The number to display
var odometerMiles = 21000573;
// Create an Array to store number positions later
window.odometerPositions = new Array();
// Change numbers to a strings
var odometerMilesStr = odometerMiles.toString();
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
var odometerSpeed = 18000;
// Create positions
function positionNums() {
	// The height of one number and set of numbers
	// odometerNumHeight = $('#ones .odometer-num-0').outerHeight();
	var odometerNumHeight = $('.odometer-box').outerHeight();
	var odometerNumWidth = $('.odometer-box').outerWidth();
	var fontSize = (odometerNumWidth+46) >> 0;
	$(".odometer-nums li").css({"height":odometerNumHeight+"px","lineHeight":odometerNumHeight+"px","fontSize":fontSize+"px"})
	singleColHeight = odometerNumHeight*10;

	// Create positions based on Kilometer since it's a bigger number
	for(var i = 0; i < odometerMilesStr.length; i++){
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
		window.odometerPositions[i] = finalNumHeight;
	}
}
// Animate numbers
function animateNums() {
	for(var i = 0; i < odometerMilesStr.length; i++){
		$('#'+odometerPlaces[i]+' .odometer-nums').animate({
			top: -window.odometerPositions[i]+'px'
		}, odometerSpeed, 'easeOutQuad');
	}
	odometerSpeed = 800;
	$window.unbind('scroll');
}

jQuery(window).load(function() {
	// Create numbers
	for(var i = 0; i < odometerMilesStr.length; i++){
		$('.odometer').prepend('<div id="'+odometerPlaces[i]+'" class="odometer-box"><ul class="odometer-nums"></ul></div>');
		numOfNums = odometerMilesStr.length-i;
		//Create sets of numbers
		for(var x = 0; x < numOfNums; x++){
			// Create one set of numbers
			for(var y = 0; y < 10; y++){
				$('.odometer-nums').append('<li class="odometer-num-'+y+'">'+y+'</li>');
			}
		}
	}
	positionNums();
	animateNums();

	$(window).resize(function() {
		positionNums();
		animateNums();
	})
});