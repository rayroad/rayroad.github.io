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
var odometerSpeed = 4000;
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

function Marquee(i) {
  var col  = $('#'+odometerPlaces[i]+' .odometer-nums').get(0);
  var cola = $('#'+odometerPlaces[i]+' .odometer-nums-list').eq(0).get(0);
  var colb = $('#'+odometerPlaces[i]+' .odometer-nums-list').eq(1).get(0);
  if(colb.offsetHeight-col.scrollTop<=0)
    col.scrollTop-=cola.offsetHeight;
  else{
    col.scrollTop--;
  }
}

function makeHtml() {
  $('.odometer').empty();
  for(var i = 0; i < odometerMilesStr.length; i++){
    $('.odometer').prepend('<div id="'+odometerPlaces[i]+'" class="odometer-box"><div class="odometer-nums"><ul class="odometer-nums-list"></ul><ul class="odometer-nums-list"></ul></div></div>');
    // var numOfNums = odometerMilesStr.length;
    // for(var x = 0; x < numOfNums; x++){
    //   for(var y = 0; y < 10; y++){
    //     $('.odometer-nums-list').append('<li class="odometer-num-'+y+'">'+y+'</li>');
    //   }
    // }
  }
  for(var y = 0; y < 10; y++){
    $('.odometer-nums-list').append('<li class="odometer-num-'+y+'">'+y+'</li>');
  }
}

jQuery(window).load(function() {
  makeHtml();
  positionNums();
});

$(document).keyup(function(e){
  var curKey = e.which;
  if(curKey==118){
    if(!animated){
      $(".odometer-nums-list").addClass("domoveup");
      animated = true;
    }
  }
  if(curKey==119){
    if(!animateNumsed){
      $(".odometer-nums-list").removeClass("domoveup");
      animateNums();
      animated = false;
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
