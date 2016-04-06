function wxShare(wx,config){
  var appid = document.body.getAttribute('data-app-id');
  var openUrl = "http://tools.smarket.net.cn/V2/api/i/get_jsconfig?url=" + location.href;
  if (appid) {
    openUrl = "http://tools.smarket.net.cn/V2/api/i/get_jsconfig?appid=" + appid + "&url=" + location.href;
  }

  var shareInfo = {};
  shareInfo.title = (config.title || document.title) + "敬请访问";
  shareInfo.desc = config.desc;
  shareInfo.link  = config.link;
  shareInfo.imgUrl = config.imgUrl;

  $.ajax({
    url:openUrl,
    dataType:'json',
    type:'GET',
    success:function(data){
      data.debug = false; //调试时设为true
      data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'scanQRCode'];
      wx.config(data);

      //初始化
      wx.ready(function () {
        recordLog("Config","Ready");
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: shareInfo.title, // 分享标题
          link: shareInfo.link, // 分享链接
          imgUrl: shareInfo.imgUrl, // 分享图标
          success: function () {
            recordLog("TimeLine","ShareSuccess");
          },
          cancel: function () {
            recordLog("TimeLine","ShareCancel");
          }
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareInfo.title, // 分享标题
          desc: shareInfo.desc, // 分享描述
          link: shareInfo.link, // 分享链接
          imgUrl: shareInfo.imgUrl, // 分享图标
          success: function () {
            recordLog("Message","ShareSuccess");
          },
          cancel: function () {
            recordLog("Message","ShareCancel");
          }
        });

        //分享到QQ
        wx.onMenuShareQQ({
          title: shareInfo.title, // 分享标题
          desc: shareInfo.desc, // 分享描述
          link: shareInfo.link, // 分享链接
          imgUrl: shareInfo.imgUrl, // 分享图标
          success: function () {
            saveaction("QQ", "ShareSuccess");
          },
          cancel: function () {
            recordLog("QQ","ShareCancel");
          }
        });

        wx.onMenuShareWeibo({
          title: shareInfo.title, // 分享标题
          desc: shareInfo.desc, // 分享描述
          link: shareInfo.link, // 分享链接
          imgUrl: shareInfo.imgUrl, // 分享图标
          success: function () {
            saveaction("WeiBo", "ShareSuccess");
          },
          cancel: function () {
            recordLog("WeiBo","ShareCancel");
          }
        });


      });
      wx.error(function (res) {
        recordLog(res.errMsg,"error")
      });
    }
  })


  function recordLog(target,action){
    var appid = document.body.getAttribute('data-app-id');
    var logUrl = "http://tools.smarket.net.cn/V2/api/i/action?appid=" + appid +  + "&target=" + target + "&action=" + action;
    $.get(logUrl);
  }

}


