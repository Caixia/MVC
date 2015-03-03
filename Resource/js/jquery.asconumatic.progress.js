// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jProgress()
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function ($) {

    $.progressing = {

        // These properties can be read/written by accessing $.progressing.propertyName from your scripts at any time

        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .5,                // transparency level of overlay
        overlayColor: '#000',               // base color of overlay
        draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: 'OK',         // text for the OK button
        confirmButton: 'Confirm',         // text for the Confirm button
        cancelButton: 'Cancel', // text for the Cancel button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods

        progress: function (callback) {
            $.progressing._show(function (result) {
                if (callback) callback(result);
            });
        },


        // Private methods

        _show: function (callback) {

            $.progressing._hide();
            $.progressing._overlay('show');

            $("BODY").append(
			  '<div id="progress_container">' +
			  	'<img src="/WebUI/Resource/img/processbar.GIF" />' +
			  '</div>');

            if ($.progressing.dialogClass) $("#progress_container").addClass($.progressing.dialogClass);

            // IE6 Fix
            var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';

            $("#progress_container").css({
                position: pos,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });

            $("#progress_container").css({
                minWidth: $("#progress_container").outerWidth(),
                maxWidth: $("#progress_container").outerWidth()
            });

            $.progressing._reposition();
            $.progressing._maintainPosition(true);

            //$.progressing._hide();
            //callback(true);

            // Make draggable
            
        },

        _hide: function () {
            $("#progress_container").remove();
            $.progressing._overlay('hide');
            $.progressing._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $.progressing._overlay('hide');
                    $("BODY").append('<div id="progress_overlay"></div>');
                    $("#progress_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(document).height(),
                        background: $.progressing.overlayColor,
                        opacity: $.progressing.overlayOpacity
                    });
                    break;
                case 'hide':
                    $("#progress_overlay").remove();
                    break;
            }
        },

        _reposition: function () {
//            var top = (($(window).height() / 2)) + $.progressing.verticalOffset;
//            var left = (($(window).width() / 2)) + $.progressing.horizontalOffset;

            var top = ($(document).height() / 2) + $(document).scrollTop()-110;
            var left = ($(document).width() * 0.9 / 2) + $(document).scrollLeft() - 60;

            
            
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#progress_container").css({
                top: top + 'px',
                left: left + 'px'
            });
            $("#progress_overlay").height($(document).height());
        },

        _maintainPosition: function (status) {
            if ($.progressing.repositionOnResize) {
                switch (status) {
                    case true:
                        $(window).bind('resize', $.progressing._reposition);
                        break;
                    case false:
                        $(window).unbind('resize', $.progressing._reposition);
                        break;
                }
            }
        }

    }

    // Shortuct functions
    jProgress = function (callback) {
        $.progressing.progress(callback);
    }


})(jQuery);