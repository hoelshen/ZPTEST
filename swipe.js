$(function() {
    var WangeSlide = (function() {
        //配置
        var config = {
            //轮播图尺寸
            width : 960,
            height : 350,
            //是否自动切换
            autoSwitch : true,
            //自动切换间隔时间（毫秒）
            interval : 6000,
            //轮播图图片路径
            picPath : 'http://www.dowebok.com/demo/2014/93/img/',
            //轮播图图片信息：图片文件名 / 图片标题 / 图片指向链接
            picInfo : [
                ['fullimage1.jpg', '图片1提示','http://codepen.io/webstermobile/'],
                ['fullimage1.jpg', '图片2提示','http://codepen.io/webstermobile/'],
                ['fullimage1.jpg', '图片3提示','http://codepen.io/webstermobile/']
            ]
        };
        //获取图片信息
        /**
         * @param index 图片所在的索引值
        **/
        var getImgInfo = function(index) {
            console.log(config.picInfo)
           
            var imgSrc = config.picPath + config.picInfo[index][0],
                imgAlt = config.picInfo[index][3],
                imgUrl = config.picInfo[index][4],
                imgId = 'slide_' + (index+1).toString(),
                imgHtml = '<li id="' + imgId + '">' +
                            '    <a href="' + imgUrl +'" title="' + imgAlt + '" class="pic">' +
                            '        <img src="' + imgSrc + '" alt="' + imgAlt + '" class="slide_thumb" />' +
                            '    </a>' +
                        '</li>',
                slideTextHtml = '<a href="' + imgUrl + '"  title="' + imgAlt + '">' + imgAlt+ '</a>';
            return {
                imgAlt : imgAlt,
                imgUrl : imgUrl,
                imgHtml : imgHtml,
                slideTextHtml : slideTextHtml
            }
        };
        
        //图片完全加载后缓慢加载显示
        var fadeInImg = function(el, speed) {
            //console.log(el)
            el.find("img").load(function() {
                el.find("img").addClass("loaded")
                el.fadeIn(speed)
            });
        };
        
        //图片切换
        /**
         * @param index 图片所在的索引值
         * @param triggerCurEl 当前触发节点元素
        **/
        var imgSwitch = function(index, triggerCurEl) {
            var slideId = 'slide_' + (index+1).toString(),
                slideIdEl = document.getElementById(slideId);
            if (slideIdEl) {
                //如果已有对应的元素，则显示已有元素
                var panelLi = $('#panel ul li');
                panelLi.hide();
                $(slideIdEl).fadeIn('slow');
            } else {
                //如果还没有对应的元素，则注入元素
                $(getImgInfo(index).imgHtml).appendTo($('#panel ul'));
                var panelLi = $('#panel ul li');
                panelLi.hide();
                //载入显示图片
                fadeInImg($("#" +slideId), 'slow');
            }
            
            //获取图片的 alt 作为显示信息
           $('#slide_text').html(getImgInfo(index).slideTextHtml);
            
            //当前状态 cur
            $('#trigger ul li').removeClass('cur');
            triggerCurEl.addClass('cur');
        };
        
        //轮播图
        var slide = function() {
            //设置轮播图尺寸
            $('#panel').css({
                'width' : config.width + 'px',
                'height' : config.height + 'px'
            });
            var result = getImgInfo(0).imgHtml
            //初使化轮播图，只加载第一张图片信息
            $('#panel ul').html($(result));
            //载入显示图片
            fadeInImg($('#slide_1'), 500);
            
            //注入背景层 + 触发器容器 + 轮播图文字容器
            var slideBg = '<div id="slide_bg"></div>',
                trigger = '<div id="trigger"></div>',
                slideText = '<div id="slide_text"></div>';
            $('#panel').after(slideBg + trigger + slideText);
            
            //获取图片的 alt 作为显示信息
            $('#slide_text').html(getImgInfo(0).slideTextHtml);
            
            //注入触发节点
            var triggerUl = $('<ul></ul>');
            triggerUl.appendTo($('#trigger'));
            for (var i=0, j=config.picInfo; i<j.length; i++) {
                $('<li>' + (i+1).toString() +'</li>').appendTo(triggerUl);
            }
            
            //当前状态 cur
            $('#trigger ul li').eq(0).addClass('cur');
            //点击触发节点
            $("#trigger ul li").click(function(){
                var index = $("#trigger ul li").index($(this))
                //console.log(index)
                imgSwitch(index,$(this))
            })
            
            
            //鼠标悬停时，停止切换
            var goSwitch = true;
            $('#panel').hover(
                function() {goSwitch = false},
                function() {goSwitch = true}
            );
            
            //自动切换
            if (config.autoSwitch) {
                setInterval(function() {
                    if (goSwitch) {
                        //判断当前cur所在的索引值
                        var index = parseInt($('.cur','#trigger').text()) - 1;
                        if (index > (config.picInfo.length-2)) {
                            index = -1;
                        }
                        imgSwitch((index+1), $('#trigger ul li:eq(' + (index+1) + ')'));
                    }
                }, config.interval);
            }
        };
        
        return {
            //初使化
            init : function() {
                slide();
            }
        }
    })();
    
    WangeSlide.init();

})