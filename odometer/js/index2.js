var odometerMiles = 21000573;
window.odometerPositions = new Array();
var odometerMilesStr = odometerMiles.toString();
var $window = $(window);
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
var odometerSpeed = 18000;

function positionNums() {
  var odometerNumHeight = $('.odometer-box').outerHeight();
  var odometerNumWidth = $('.odometer-box').outerWidth();
  var fontSize = (odometerNumWidth+40) >> 0;
  $(".odometer-nums li").css({"height":odometerNumHeight+"px","lineHeight":odometerNumHeight+"px","fontSize":fontSize+"px"})
  singleColHeight = odometerNumHeight*10;
  for(var i = 0; i < odometerMilesStr.length; i++){
    numOfNums = odometerMilesStr.length-i;
    placeNum = odometerMilesStr.substr(numOfNums-1,1);
    totalColHeight = $('#'+odometerPlaces[i]+' .odometer-nums').height();
    reminderColHeight = singleColHeight-(placeNum*odometerNumHeight);
    finalNumHeight = totalColHeight-reminderColHeight;
    window.odometerPositions[i] = finalNumHeight;
  }
}

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
  for(var i = 0; i < odometerMilesStr.length; i++){
    $('.odometer').prepend('<div id="'+odometerPlaces[i]+'" class="odometer-box"><ul class="odometer-nums"></ul></div>');
    var numOfNums = odometerMilesStr.length-i;
    for(var x = 0; x < numOfNums; x++){
      for(var y = 0; y < 10; y++){
        $('.odometer-nums').append('<li class="odometer-num-'+y+'">'+y+'</li>');
      }
    }
  }
  positionNums();
});
$(document).keyup(function(e){
  var curKey = e.which;
  if(curKey==13){
    animateNums();
  }
});

$(window).resize(function() {
  positionNums();
})
