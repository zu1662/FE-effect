// 拖拽验证码
class VerifyImg {
  constructor(config){
    this.el = eval(config.el)
    this.width = config.width
    this.height = config.height
    this.bgImgs = config.imgs
    this.successCallback = config.success
    this.errorCallback = config.error

    // 验证块的大小和据上下边的距离
    this.PL_Size = 40;
    this.padding = 20;

    this.setVerify()
  }

  // 获取随机数
  RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    if (Math.round(Rand * Range) == 0) {
      return Min + 1;
    } else if (Math.round(Rand * Max) == Max) {
      return Max - 1;
    } else {
      var num = Min + Math.round(Rand * Range) - 1;
      return num;
    }
  }

  setVerify(){
    let self = this
    var MinN_X = this.PL_Size;
    var MaxN_X = this.width - this.PL_Size - this.PL_Size / 6;
    var MaxN_Y = this.padding;
    var MinN_Y = this.height - this.padding - this.PL_Size - this.PL_Size / 6;
    
    var imgRandom = this.RandomNum(0, this.bgImgs.length);
    var imgSrc = this.bgImgs[imgRandom];
    var X = this.RandomNum(MinN_X, MaxN_X);
    var Y = this.RandomNum(MinN_Y, MaxN_Y);
    var left_Num = -X;

    var html = `
      <div class="verify-card">
        <div class="card-header">
          <span>请完成安全验证</span>
        </div>
        <div class="card-body">
          <div class="captcha-box">
            <div class="puzzle-box" style="width:${this.width}px;height:${this.height}px;">
              <img id="scream" src="${imgSrc}" style="width:${this.width}px; height:${this.height}px;">
              <canvas id="puzzleBox" width="${this.width}" height="${this.height}"></canvas>
            </div>
            <div class="puzzle-lost-box" style="width:${this.width}px;height:${this.height}px; left: ${left_Num}px">
              <canvas id="puzzleShadow" width="${this.width}" height="${this.height}"></canvas>
              <canvas id="puzzleLost" width="${this.width}" height="${this.height}"></canvas>
            </div>
            <p class="ver-tips">
              <span style="color:red;">验证失败:</span>
              <span style="margin-left:4px;">拖动滑块将悬浮图像正确拼合</span>
            </p>
          </div>
          <div class="re-btn"><a></a></div>
          <div class="slider-box" style="width:${this.width}px;">
            <div class="slider-main">
              <p>按住左边滑块，拖动完成上方拼图</p>
            </div>
            <div class="slider-btn"></div>
          </div>
        </div>
      </div>
    `
    this.el.html(html)

    // 设置canvas内容
    var d = this.PL_Size / 3;
    var c = document.getElementById("puzzleBox");
    var ctx = c.getContext("2d");
    ctx.globalCompositeOperation = "xor";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#fff";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.moveTo(X, Y);
    ctx.lineTo(X + d, Y);
    ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
    ctx.lineTo(X + 3 * d, Y);
    ctx.lineTo(X + 3 * d, Y + d);
    ctx.bezierCurveTo(
      X + 2 * d,
      Y + d,
      X + 2 * d,
      Y + 2 * d,
      X + 3 * d,
      Y + 2 * d
    );
    ctx.lineTo(X + 3 * d, Y + 3 * d);
    ctx.lineTo(X, Y + 3 * d);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    var c_l = document.getElementById("puzzleLost");
    var c_s = document.getElementById("puzzleShadow");
    var ctx_l = c_l.getContext("2d");
    var ctx_s = c_s.getContext("2d");
    var img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      ctx_l.drawImage(img, 0, 0, self.width, self.height);
    };
    ctx_l.beginPath();
    ctx_l.strokeStyle = "rgba(0,0,0,0)";
    ctx_l.moveTo(X, Y);
    ctx_l.lineTo(X + d, Y);
    ctx_l.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
    ctx_l.lineTo(X + 3 * d, Y);
    ctx_l.lineTo(X + 3 * d, Y + d);
    ctx_l.bezierCurveTo(
      X + 2 * d,
      Y + d,
      X + 2 * d,
      Y + 2 * d,
      X + 3 * d,
      Y + 2 * d
    );
    ctx_l.lineTo(X + 3 * d, Y + 3 * d);
    ctx_l.lineTo(X, Y + 3 * d);
    ctx_l.closePath();
    ctx_l.stroke();
    ctx_s.fill();
    ctx_l.clip();
    ctx_s.beginPath();
    ctx_s.lineWidth = "1";
    ctx_s.strokeStyle = "rgba(0,0,0,0)";
    ctx_s.moveTo(X, Y);
    ctx_s.lineTo(X + d, Y);
    ctx_s.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y);
    ctx_s.lineTo(X + 3 * d, Y);
    ctx_s.lineTo(X + 3 * d, Y + d);
    ctx_s.bezierCurveTo(
      X + 2 * d,
      Y + d,
      X + 2 * d,
      Y + 2 * d,
      X + 3 * d,
      Y + 2 * d
    );
    ctx_s.lineTo(X + 3 * d, Y + 3 * d);
    ctx_s.lineTo(X, Y + 3 * d);
    ctx_s.closePath();
    ctx_s.stroke();
    ctx_s.shadowBlur = 20;
    ctx_s.shadowColor = "black";
    ctx_s.fill();
    
    // 阻止事件冒泡
    $('.verify-card').on('click', function(e){
      e.stopPropagation()
    })
    // 设置元素事件
    var moveStart = "";
    $(".slider-btn").on("mousedown touchstart", function (e) {
      e = e || window.event;
      moveStart = e.pageX || e.originalEvent.targetTouches[0].pageX;
    });
    
    $(window).on("mousemove touchmove", function (e) {
      e = e || window.event;
      var moveX = e.pageX || e.originalEvent.targetTouches[0].pageX;
      var d = moveX - moveStart;
      if (moveStart == "") {
      } else {
        if (d > 0 && d < self.width - self.PL_Size) {
          $(".slider-btn").css({ left: d + "px", transition: "inherit" });
          $("#puzzleLost").css({ left: d + "px", transition: "inherit" });
          $("#puzzleShadow").css({ left: d + "px", transition: "inherit" });
        }
      }
    });

    $(window).on("mouseup touchend", function (e) {
      e = e || window.event;
      var e_pageX = e.originalEvent.changedTouches == undefined ? moveStart : e.originalEvent.changedTouches[0];
      var moveEnd_X = e.pageX - moveStart || e_pageX.pageX - moveStart;
      var ver_Num = X;
      var deviation = 4;
      var Min_left = ver_Num - deviation;
      var Max_left = ver_Num + deviation;
      if (moveStart == "") {
      } else {
        if (Max_left > moveEnd_X && moveEnd_X > Min_left) {
          $(".ver-tips").html(
            '<span style="color:#42ca6b;">验证通过</span><span></span>'
          );
          $(".ver-tips").addClass("slider-tips");
          $(".puzzle-lost-box").addClass("hidden");
          $("#puzzleBox").addClass("hidden");
          setTimeout(function () {
            $(".ver-tips").removeClass("slider-tips");
            self.setVerify()
          }, 2000);
          self.successCallback && self.successCallback();
        } else {
          $(".ver-tips").html(
            '<i style="background-position:-4px -1229px;"></i><span style="color:red;">验证失败:</span><span style="margin-left:4px;">拖动滑块将悬浮图像正确拼合</span>'
          );
          $(".ver-tips").addClass("slider-tips");
          $(".slider-btn").css({ transition: "all 0.5s" });
          setTimeout(function () {
            $(".ver-tips").removeClass("slider-tips");
          }, 2000);
          self.errorCallback && self.errorCallback();
        }
      }
      setTimeout(function () {
        $(".slider-btn").css({ left: "0", transition: "all 0.5s" });
        $("#puzzleLost").css({ left: "0", transition: "left 0.5s" });
        $("#puzzleShadow").css({ left: "0", transition: "left 0.5s" });
      }, 1000);
      moveStart = "";
    });

    $(".re-btn a").on("click", function (e) {
      e.stopPropagation()
      self.setVerify()
    });
  }
}