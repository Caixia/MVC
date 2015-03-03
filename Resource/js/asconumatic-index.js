
// left menu
//var index = $.getQueryString("index") == null || $.getQueryString("index") == "undefined" ? -1 : ($.getQueryString("index") - 1);
ddaccordion.init({
    headerclass: "expandable", //Shared CSS class name of headers group that are expandable
    contentclass: "categoryitems", //Shared CSS class name of contents group
    revealtype: "click", //Reveal content when user clicks or onmouseover the header? Valid value: "click", "clickgo", or "mouseover"
    mouseoverdelay: 200, //if revealtype="mouseover", set delay in milliseconds before header expands onMouseover
    collapseprev: true, //Collapse previous content (so only one open at any time)? true/false 
    defaultexpanded: [-1], //index of content(s) open by default [index1, index2, etc]. [] denotes no content
    onemustopen: false, //Specify whether at least one header should be open always (so never all headers closed)
    animatedefault: false, //Should contents open by default be animated into view?
    persiststate: false, //persist state of opened contents within browser session?
    toggleclass: ["", "openheader"], //Two CSS classes to be applied to the header when it's collapsed and expanded, respectively ["class1", "class2"]
    togglehtml: ["prefix", "", ""], //Additional HTML added to the header when it's collapsed and expanded, respectively  ["position", "html1", "html2"] (see docs)
    animatespeed: "", //speed of animation: integer in milliseconds (ie: 200), or keywords "fast", "normal", or "slow"
    oninit: function (headers, expandedindices) { //custom code to run when headers have initalized
        //do nothing
    },
    onopenclose: function (header, index, state, isuseractivated) { //custom code to run whenever a header is opened or closed
        //do nothing
    }
});
//left menu
//var id = $.getQueryString("id") == null ? 0 : $.getQueryString("id");

//$(id).closest(".menu-first").addClass("active");


$(function () {
    //页面高度设置
    //var script = '/WebUI/include/jquery.blockUI.js'; 
    autoHeight();
    $(window).resize(autoHeight);
    var _leftheight = $(".nav-span1").height();
    var _rightheight = $(".nav-span11").height();
    if (_leftheight > _rightheight) {
        $(".nav-span11").height(_leftheight);
        $(".nav-span1").height(_leftheight);
    } else {
        $(".nav-span11").height(_rightheight);
        $(".nav-span1").height(_rightheight);
    }

    //include JS
    var script = document.createElement('script');
    script.type = 'text/javascript';
    //script.src = document.location.protocol + '/WebUI/Resource/js/jquery.asconumatic.progress.js';
    script.src = '/WebUI/Resource/js/jquery.asconumatic.progress.js';
    document.getElementsByTagName('head')[0].appendChild(script);


    //left menu
//    var menuid = $.getQueryString("id") == null ? 0 : $.getQueryString("id");
//    var objmenuid = "m" + menuid;
//    $('a[id=' + objmenuid + ']').addClass("actived")
//    $('a[id=' + objmenuid + ']').parent().parent().prev().prev().addClass("actived");

    //side menu push
    if ($('.menu-link') != null) {
        if (typeof TinyMCE == "undefined") {
            $.getScript('/WebUI/Resource/js/jquery.nicescroll.js', function () {
                $('.menu-link').bigSlide();
            });
        }
    }
    //Left menu add scroll
    $("#js-boxscroll").height($(window).height() - 110 + "px");
    $("#js-boxscroll").niceScroll({ touchbehavior: false, cursorcolor: "#94a1b0", cursoropacitymax: 0.7, cursorwidth: 6, background: "#c6d4d6", autohidemode: true });

    $('a[href^="javascript:"]').mousedown(function () {
        $(window).off('beforeunload');
    }).mouseleave(function () {
        $(window).bind("beforeunload", function () {
            $("[class*='btn']").attr("disabled", "true");
        });
    });

    $("[class*='btn-export']").mousedown(function () {
        $(window).off('beforeunload');
    }).mouseleave(function () {
        $(window).bind("beforeunload", function () {
            $("[class*='btn']").attr("disabled", "true");
        });
    });
    //提交时所有按钮禁用
    $(window).bind("beforeunload", function () {
        $("[class*='btn']").attr("disabled", "true");
        $("[id*='oReportDiv']").removeAttr("style");
        jProgress();
    });
    $("[class*='btn'],a,input,select").bind("click", function (e) {
        //e.stopPropagation();
    });

    $(".box-header-lg > ul > li > a").bind("click", function (e) {
        e.stopPropagation();
    });

    // Report Service css
    $(".js-reportview").find("a").css("color", "#24ab5c");
    $(".js-reportview").find("a").hover(
      function () {
          $(this).css("color", "#24ab5c");
      },
      function () {
          $(this).css("color", "#24ab5c");
      }
    );
    $(".js-reportview").find("div").css("width", "98%");

    //适应IE8 在input前加span说明文字，focus后和Input样式一样
    $(".input-group input,.input-group textarea").focus(function () {
        $(this).prev().addClass("input-group-hover");
        $(this).next().css("border-color", "rgb(196, 204, 206)").css("background-color", "rgb(255, 255, 255)");
    }).blur(function () {
        $(this).prev().removeClass("input-group-hover");
        $(this).next().removeAttr("style");
    });







});
//取得显示器的高度，使其整个Web页面的高度为其显示器的高度
function autoHeight() {
    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
    var h = $(window).height() + "px";
    var h_old = 680 + "px";
    if (h > h_old) {
        $(".nav-span1").height(h);
    } else {
        $(".nav-span1").height(h_old);
    }
};









