var Tips = (function(){

	var $tipBox = $(".tips-box");

	var bind = function(){

	}

	bind();
	return {
		show: function(){
			$tipBox.removeClass("hide");
		},
		hide: function(){
			$tipBox.addClass("hide");
		},
		init: function(){
			
		}
	}
})();

var Main = (function(){

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			//var num = parseInt(Math.random()*5+1);
			var num = tags.eq(i).html().length % 5 +1;
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	var slide = function(idx){
		var $wrap = $(".switch-wrap");
		$wrap.css({
			"transform": "translate(-"+idx*100+"%, 0 )"
		});
		$(".icon-wrap").addClass("hide");
		$(".icon-wrap").eq(idx).removeClass("hide");
	}

	var bind = function(){
		var switchBtn = $("#myonoffswitch");
		var tagcloud = $(".second-part");
		var navDiv = $(".first-part");
		switchBtn.click(function(){
			if(switchBtn.hasClass("clicked")){
				switchBtn.removeClass("clicked");
				tagcloud.removeClass("turn-left");
				navDiv.removeClass("turn-left");
			}else{
				switchBtn.addClass("clicked");
				tagcloud.addClass("turn-left");
				navDiv.addClass("turn-left");
				resetTags();
			}
		});

		var timeout;
		var isEnterBtn = false;
		var isEnterTips = false;

		$(".icon").bind("mouseenter", function(){
			isEnterBtn = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterBtn = false;
			setTimeout(function(){
				if(!isEnterTips){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-box").bind("mouseenter", function(){
			isEnterTips = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterTips = false;
			setTimeout(function(){
				if(!isEnterBtn){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-inner li").bind("click", function(){
			var idx = $(this).index();
			slide(idx);
			Tips.hide();
		});
	}

	var fancyInit = function(){
		var isFancy = $(".isFancy");
		if(isFancy.length != 0){
			var imgArr = $(".article-inner img");
			for(var i=0,len=imgArr.length;i<len;i++){
				var src = imgArr.eq(i).attr("src");
				var title = imgArr.eq(i).attr("alt");
				imgArr.eq(i).replaceWith("<a href='"+src+"' title='"+title+"' rel='fancy-group' class='fancy-ctn fancybox'><img src='"+src+"' title='"+title+"'></a>");
			}
			$(".article-inner .fancy-ctn").fancybox();
		}
	}

	var enterAnm = function(){
		//avatar
		$(".js-avatar").attr("src", $(".js-avatar").attr("lazy-src"));
		$(".js-avatar")[0].onload = function(){
			$(".js-avatar").addClass("show");
		}

		//article
		function showArticle(){
			$(".article").each(function(){
				if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && !$(this).hasClass('show') ) {
					$(this).addClass("show");
				}
			});
		}
		$(window).on('scroll', function(){
			showArticle();
		});
		showArticle();
	}

	return {
		init: function(){
			resetTags();
			bind();
			enterAnm();
			fancyInit();
			Tips.init();
			new Mobile({
				ctn: document.getElementsByClassName("slider-trigger")[0]
			});
		}
	}
})();

$(Main.init());





var evt={
	//  想获取 clientX/Y  通过 e或者 window.event 获取
	//  window 和 e 的封装,  因为火狐不支持window.event   ie8 不支持事件参数e
	getEvent:function(e){
		return window.event||e;
	},

	//  获取可视区域的横纵坐标的兼容代码
	//  根据浏览器支持的 是 事件参数e 还是 window.event ,动态的选择
	getClientX:function(e){
		return this.getEvent(e).clientX;
	},

	//可视区域的纵坐标的兼容代码
	getClientY:function (evt) {
		return this.getEvent(evt).clientY;
	},

	// 获取当前页面向左滚动出去的距离
	getScrollLeft:function(){
		// 不同的浏览器 获取 scroll属性的值是不同的   , 没有的话就是没滚动, 0
		return window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0;
	},

	//页面向上卷曲出去的纵坐标
	getScrollTop:function () {
		return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0;
	},

	// 获取到浏览器的滚动条滚动后, 鼠标相对于滚动后的浏览器的顶部,左部的值
	//  pageX  ==  clientX +　scrollLeft
	getPageX:function(e){
		// 问 pageX 能用不? 能用直接返回 , 不能用  返回  clientX + scrollLeft
		// pageX IE不支持
		return this.getEvent(e).pageX ?  this.getEvent(e).pageX : this.getClientX(e) + this.getScrollLeft(e);
	},

	//相对于页面的纵坐标(pageY或者是clientY+scrollTop)
	getPageY:function (evt) {
		return this.getEvent(evt).pageY?this.getEvent(evt).pageY:this.getClientY(evt)+this.getScrollTop();
	}
};


// 终极图片飞
// 为浏览器注册鼠标移动事件
document.onmousemove=function(e){
	// 获取img ,改变他的  top  left
	// 使用的公式是  left = clientX + scrollLeft
  //  console.log(1);
document.getElementsByClassName("show").style.left=evt.getPageX(e)+"px";
document.getElementsByClassName("show").style.top=evt.getPageY(e)+"px";
 
};




