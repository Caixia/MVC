/*! bigSlide - v0.4.3 - 2014-01-25
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2014 Adam D. Scott; Licensed MIT */
$.getScript('/WebUI/Resource/js/jquery.nicescroll.js');
(function ($) {
    'use strict';
    $.fn.bigSlide = function (options) {
        var settings = $.extend({
            'menu': ('#menu'),
            'push': ('.push'),
            'side': 'left',
            'menuWidth': '21.4%',
            'speed': '600'
        }, options);

        var menuLink = this,
        menu = $(settings.menu),
        push = $(settings.push),
        width = settings.menuWidth;

        var positionOffScreen = {
            'position': 'fixed',
            'top': '0',
            'bottom': '0',
            'width': settings.menuWidth,
            'height': '100%'
        };

        var boxscroll = {
            'overflow': 'auto',
            'border': '0',
            'width': '100%',
            'position': 'relative',
            'top': '0'
        };


        var animateSlide = {
            '-webkit-transition': settings.side + ' ' + settings.speed + 'ms ease',
            '-moz-transition': settings.side + ' ' + settings.speed + 'ms ease',
            '-ms-transition': settings.side + ' ' + settings.speed + 'ms ease',
            '-o-transition': settings.side + ' ' + settings.speed + 'ms ease',
            'transition': settings.side + ' ' + settings.speed + 'ms ease'
        };
        //menu.css("display", "none");
        $('.menu-link').css("display", "none");
        $('.menu-link').css("left", "0px");
        $('.menu-link').css("display", "block");

        menu.css(positionOffScreen);
        menu.css(settings.side, '-' + settings.menuWidth);
        push.css(settings.side, '0');
        menu.css(animateSlide);
        push.css(animateSlide);
        $('.menu-link').css(animateSlide);
        //$('#maincontent1').removeClass("nav-span11").addClass("nav-sider");

        menuLink.addClass("menuclosed");
        $('#menuicon').removeClass("fa-caret-left").addClass("fa-caret-right");

        //    menu.css(positionOffScreen);
        //    //menu.css(settings.side, '-' + settings.menuWidth);
        //    menu.css(settings.side, '0');
        //    push.css(settings.side, settings.menuWidth);
        //    menu.css(animateSlide);
        //    push.css(animateSlide);


        menu._state = 'closed';

        $('#js-boxscroll').css(boxscroll);
        $("#js-boxscroll").niceScroll({ touchbehavior: false, cursorcolor: "#94a1b0", cursoropacitymax: 0.7, cursorwidth: 6, background: "#c6d4d6", autohidemode: true, horizrailenabled: false });

        menu.open = function () {
            menu._state = 'open';

            menu.css("display", "block");
            //$('.menu-link').css("display", "block");
            $('.menu-link').css("left", "21.4%");
            $('.menu-link').css("display", "block");

            $('#maincontent1').removeClass("nav-sider").addClass("nav-span11");
            menuLink.removeClass("menuclosed");
            $('#menuicon').removeClass("fa-caret-right").addClass("fa-caret-left");
            menu.css(settings.side, '0');
            push.css(settings.side, width);
        };

        menu.close = function () {
            menu._state = 'closed';

            $('#maincontent1').removeClass("nav-span11").addClass("nav-sider");
            menuLink.addClass("menuclosed");
            $('#menuicon').removeClass("fa-caret-left").addClass("fa-caret-right");
            menu.css(settings.side, '-' + width);
            push.css(settings.side, '0');

            $('.menu-link').css("left", "0px");
            //$('.menu-link').css("display", "none");
            $('.menu-link').css("display", "block");

            $("#js-boxscroll").getNiceScroll().hide();
        };

        menuLink.on('mouseover.bigSlide', function (e) {
            e.preventDefault();
            if (menu._state === 'closed') {
                menu.open();
                $(".js-reportview").find("div").css("width", "98%");
            } else {
                menu.close();
                $(".js-reportview").find("div").css("width", "98%");
            }

        });

        menuLink.on('touchend', function (e) {
            menuLink.trigger('mouseover.bigSlide');
            e.preventDefault();
        });
        $(document).bind('click keyup', function (e) {
            // If this is a keyup event, let's see if it's an ESC key
            //            e.preventDefault();
            //            e.stopPropagation();
            if (e.type == "keyup" && e.keyCode != 27) return;

            // Make sure it's visible, and we're not modal   

            if (menu._state === 'open') {
                menu.close();
            }

        });

        //        $(".btn").click(function (e) {
        //            e.stopPropagation();
        //        });

        //    menuLink.on("click hover", function (e) {
        //        e.stopPropagation();
        //        if (menu._state === 'closed') {
        //            menu.open();
        //        } else {
        //            menu.close();
        //        }
        //    });
        return menu;

    };

} (jQuery));