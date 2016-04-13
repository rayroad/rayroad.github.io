var odometerMiles = 21000573;
window.odometerPositions = new Array();
var odometerMilesStr = odometerMiles.toString();
var $window = $(window);
var startTime = 0;
var endTime = 0;
var easing = 'linear';
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
var odometerSpeed = 60000;
var animated = false;
var animateNumsed = false;

function positionNums() {
  var odometerNumHeight = $('.odometer-box').outerHeight();
  var odometerNumWidth = $('.odometer-box').outerWidth();
  var fontSize = (odometerNumWidth+40) >> 0;
  $(".odometer-nums li").css({"height":odometerNumHeight+"px","lineHeight":odometerNumHeight+"px","fontSize":fontSize+"px"})
  var singleColHeight = odometerNumHeight*10;
  for(var i = 0; i < odometerMilesStr.length; i++){
    var numOfNums = odometerMilesStr.length-i;
    var  placeNum = odometerMilesStr.substr(numOfNums-1,1);
    var totalColHeight = $('#'+odometerPlaces[i]+' .odometer-nums').height();
    var reminderColHeight = singleColHeight-(placeNum*odometerNumHeight);
    var finalNumHeight = totalColHeight-reminderColHeight;
    window.odometerPositions[i] = finalNumHeight;
  }
}

function animateNums() {
  if(animated){
    easing = 'easeOutCirc'
  }
  for(var i = 0; i < odometerMilesStr.length; i++){
    $('#'+odometerPlaces[i]+' .odometer-nums').stop().animate({
      top: -window.odometerPositions[i]+'px'
    }, odometerSpeed, easing,function () {
      animateNumsed = true;
    });
  }
  //odometerSpeed = 800;
}


function makeHtml() {
  $('.odometer').empty();
  for(var i = 0; i < odometerMilesStr.length; i++){
    $('.odometer').prepend('<div id="'+odometerPlaces[i]+'" class="odometer-box"><ul class="odometer-nums"></ul></div>');
  }
  var numOfNums = Math.pow(odometerMilesStr.length,2);
  for(var x = 0; x < numOfNums; x++){
    for(var y = 0; y < 10; y++){
      $('.odometer-nums').append('<li class="odometer-num-'+y+'">'+y+'</li>');
    }
  }
}

jQuery(window).load(function() {
  makeHtml();
  positionNums();
});

$(document).keyup(function(e){
  var curKey = e.which;
  if(curKey==13){
    if(!animated){
      animateNums();
      animated = true;

    }else{
      if(!animateNumsed){
        odometerSpeed = 4000;
        animateNums();
        animated = false;
      }
    }
  }
});

$(window).resize(function() {
  positionNums();
  if(animated){
    if(animateNumsed){
      odometerSpeed = 800;
    }
    animateNums();
  }

})
