
// left menu
var index = $.getQueryString("index") == null || $.getQueryString("index") == "undefined" ? -1 : ($.getQueryString("index") - 1);
ddaccordion.init({
    headerclass: "expandable", //Shared CSS class name of headers group that are expandable
    contentclass: "categoryitems", //Shared CSS class name of contents group
    revealtype: "click", //Reveal content when user clicks or onmouseover the header? Valid value: "click", "clickgo", or "mouseover"
    mouseoverdelay: 200, //if revealtype="mouseover", set delay in milliseconds before header expands onMouseover
    collapseprev: true, //Collapse previous content (so only one open at any time)? true/false 
    defaultexpanded: [index], //index of content(s) open by default [index1, index2, etc]. [] denotes no content
    onemustopen: false, //Specify whether at least one header should be open always (so never all headers closed)
    animatedefault: false, //Should contents open by default be animated into view?
    persiststate: false, //persist state of opened contents within browser session?
    toggleclass: ["openheader", "openheader"], //Two CSS classes to be applied to the header when it's collapsed and expanded, respectively ["class1", "class2"]
    togglehtml: ["prefix", "", ""], //Additional HTML added to the header when it's collapsed and expanded, respectively  ["position", "html1", "html2"] (see docs)
    animatespeed: "fast", //speed of animation: integer in milliseconds (ie: 200), or keywords "fast", "normal", or "slow"
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
    $(".initialism").pressCharacter();

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


    //include CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    //script.src = document.location.protocol + '/WebUI/Resource/js/jquery.asconumatic.progress.js';
    link.href = '/WebUI/Resource/css/autocomplete.css';
    document.getElementsByTagName('head')[0].appendChild(link);

    //left menu
    var menuid = $.getQueryString("id") == null ? 0 : $.getQueryString("id");
    var objmenuid = "m" + menuid;
    $('a[id=' + objmenuid + ']').addClass("actived")
    $('a[id=' + objmenuid + ']').parent().parent().prev().prev().addClass("actived");

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
    if (typeof TinyMCE == "undefined") {
        $.getScript('/WebUI/Resource/js/jquery.nicescroll.js', function () {
            $("#js-boxscroll").niceScroll({ touchbehavior: false, cursorcolor: "#94a1b0", cursoropacitymax: 0.7, cursorwidth: 6, background: "#c6d4d6", autohidemode: true, horizrailenabled: false });
        });
    }
    

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
    $("[class*='btn'],a,input,select").not(".btn-report").bind("click", function (e) {
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
    $(".input-group input,.input-group textarea,.uneditable-input").focus(function () {
        $(this).prev().addClass("input-group-hover");
        $(this).parent("div").parent("div").prev("div[class*='input-group-addon']").addClass("input-group-hover");
        $(this).next().css("border-color", "rgb(196, 204, 206)").css("background-color", "rgb(255, 255, 255)");
    }).blur(function () {
        $(this).prev().removeClass("input-group-hover");
        $(this).parent("div").parent("div").prev("div").removeClass("input-group-hover");
        $(this).next().removeAttr("style");
    });


    //select 的新样式将箭头转变为平面效果，disable_search_threshold表示select选项中超过规定的个数出现搜索方式
    //$('[data-rel="chosen"],[rel="chosen"]').chosen({ disable_search_threshold: 0 });
    //适应IE8表格偶行和奇行的背景色不一样
    $(".js-datatable tr:nth-child(2n+1)").addClass("odd");
    $(".js-datatable tr:nth-child(2n)").addClass("even");
    $(".table-displayed tr:nth-child(2n+1)").addClass("odd");

    $(".tablecheckboxall input[type='checkbox']").addClass("js-checkboxallintable");
    $(".tablecheckbox input[type='checkbox']").addClass("js-checkboxintable");

    //表格中有checkbox,需要选中后改变整行的样式
    $(".js-checkboxintable").click(function () {
        var checkbox = $(this);
        //此checkbox所在的行
        tabletr = checkbox.closest("tr");
        //此tr所在的table
        table = tabletr.closest("table");
        //移除所有的js-checkboxchecked-table这个类
        table.removeClass("js-checkboxchecked-table");
        //js-checkboxallintable全选选中的话为所有的tr添加js-checkboxchecked-table这个类
        //并且移除checked属性
        if (table.find(".js-checkboxallintable").is(":checked")) {
            table.find("tr").addClass("js-checkboxchecked-table");
            table.find(".js-checkboxallintable").removeAttr("checked");
        }
        //checkbox选中的话，此行改变样式，反之移除选中的样式
        checkbox.is(":checked") ?
        tabletr.addClass("js-checkboxchecked-table") :
        tabletr.removeClass("js-checkboxchecked-table");
        //选中行后，该行的input, select,checkbox可用
        checkbox.is(":checked") ?
        tabletr.find("input[type='text']").attr('disabled', false) :
        tabletr.find("input[type='text']").attr('disabled', true);
        checkbox.is(":checked") ?
        tabletr.find("select").attr('disabled', false) :
        tabletr.find("select").attr('disabled', true);
        checkbox.is(":checked") ?
        //tabletr.find("td:not(eq(0))").not().eq(0).find("checkbox").attr('disabled', false) :
        tabletr.find("input[type='checkbox']:gt(0)").attr('disabled', false) :
        tabletr.find("input[type='checkbox']:gt(0)").attr('disabled', true);


    });

    //表格中表头上的CheckAll
    $(".js-checkboxallintable").click(function () {
        var checkboxall = $(this);
        //checkboxall所在的表格table
        tableAll = checkboxall.closest("table");
        //看是否有选中的Checkbox
        if (checkboxall.is(":checked")) {
            tableAll.find(".js-checkboxintable").each(function (i) {
                var checkbox = $(this);
                if ($(this).attr("disabled") == "disabled") {
                    //当选择的时候
                    checkbox.removeAttr("checked");
                } else {
                    checkbox.attr("checked", "checked");
                }
                //此checkbox所在的行
                tabletr = checkbox.closest("tr");
                //此tr所在的table
                table = tabletr.closest("table");
                //移除所有的js-checkboxchecked-table这个类
                table.removeClass("js-checkboxchecked-table");
                //checkbox选中的话，此行改变样式，反之移除选中的样式
                checkbox.is(":checked") ?
                    tabletr.addClass("js-checkboxchecked-table") :
                    tabletr.removeClass("js-checkboxchecked-table");
                //选中行后，该行的input, select,checkbox可用
                checkbox.is(":checked") ?
                    tabletr.find("input[type='text']").attr('disabled', false) :
                    tabletr.find("input[type='text']").attr('disabled', true);
                checkbox.is(":checked") ?
                    tabletr.find("select").attr('disabled', false) :
                    tabletr.find("select").attr('disabled', true);
                checkbox.is(":checked") ?
                    tabletr.find("input[type='checkbox']:gt(0)").attr('disabled', false) :
                    tabletr.find("input[type='checkbox']:gt(0)").attr('disabled', true);
            });
        } else {
            //此table的所有行
            tabletr = tableAll.find("tr");
            tabletr.find("input[type='checkbox']:gt(0)").attr('disabled', true);
            //移除行上的js-checkboxchecked-table这个类
            tabletr.removeClass("js-checkboxchecked-table");
            //选中的话所有的行的checkbox都为选中状态
            tableAll.find(".js-checkboxintable").removeAttr("checked");
            //选中的话table加入js-checkboxchecked-table这个类
            tableAll.removeClass("js-checkboxchecked-table");
            //选中后，所有行的input, select,checkbox可用
            tableAll.find("input[type='text']").attr('disabled', true);
            tableAll.find("select").attr('disabled', true);
        }
    });

    var subjects = ['PHP', 'MySQL', 'SQL', 'PostgreSQL', 'HTML', 'CSS', 'HTML5', 'CSS3', 'JSON'];
    $('.typeahead').typeahead({ source: subjects })

    //tabs
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //tabs 让body监听a标签的click事件，并且阻止其冒泡，调用了jQuery的原型方法tab
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault()
        $(this).tab('show')//向jQuery原型方法tab传入参数show，应该执行show方法。this为拥有data-toggle属性的a标签对象
    })

    $('.btn-close').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    //tab中的缩小化的事件
    $('.btn-minimize').click(function (e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible')) $('i', $(this)).removeClass('fa fa-chevron-up').addClass('fa fa-chevron-down');
        else $('i', $(this)).removeClass('fa fa-chevron-down').addClass('fa fa-chevron-up');
        $target.slideToggle();
        $target.attr("style", "z-index:999");
    });
    $('.btn-setting').click(function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });

    //    $('.sortable').sortable({
    //        revert: true,
    //        cancel: '.btn,.box-content,.nav-header',
    //        update: function (event, ui) {
    //            //line below gives the ids of elements, you can make ajax call here to save it to the database
    //            //console.log($(this).sortable('toArray'));
    //        }
    //    });
    $('.js-datepicker').datepicker({
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    //upload file
    $(".uploadfile > input[type='file']").bind("change", function () {
        $(".fileinput > input[type='text']").val($(this).val());
    });

});
//取得显示器的高度，使其整个Web页面的高度为其显示器的高度
function autoHeight() {
    var h = $(window).height() + "px";
    var h_old = 680 + "px";
    if (h > h_old) {
        $(".nav-span1").height(h);
    } else {
        $(".nav-span1").height(h_old);
    }
};

//open new windows
function Openwindow(url, windowName, id) {
    id.click(function (event) {
        //open new window define window size
        var windowSizeArray = ["width=700,height=770",
                               "width=300,height=400,scrollbars=yes"];
        var windowSize = windowSizeArray[$(this).attr("data-rel")];
        window.open(url, windowName, windowSize);
        event.preventDefault();
    });
};

function OpenwindowFunction(url, windowName, dataRel) {
    var windowSizeArray = ["width=900,height=800",
                               "width=300,height=400,scrollbars=yes", "width=950,height=850,scrollbars=yes", "width=950,height=600"];
    var windowSize = windowSizeArray[dataRel];
    window.open(url, windowName, windowSize);
};

//弹出框返回值赋值通用方法
function selected(ReturnValue, id) {
    $("#" + id, window.opener.document).val(ReturnValue);
    window.close();
};

//Gridview中加入confirm时的方法
function confirmToGridview(attrId, htmlId, message) {
    re = new RegExp("_", "g");
    var index = attrId.indexOf(htmlId);
    var subattrId = attrId.substring(0, index);
    var id = subattrId.replace(re, "$") + htmlId;
    jConfirm(message, function (r) {
        if (r == true) {
            __doPostBack(id, '');
            return true;
        } else {
            return false;
        }
    });
};

//日期的选择范围控制
function SelectDateRange(from, to) {
    from.datepicker("destroy");
    to.datepicker("destroy");
    from.datepicker({
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        onSelect: function () {
            selectedDate = $.datepicker.formatDate("yy-mm-dd", $(this).datepicker('getDate'));
        },
        onClose: function (selectedDate) {
            to.datepicker("option", "minDate", selectedDate);
        }
    });
    to.datepicker({
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        onSelect: function () {
            selectedDate = $.datepicker.formatDate("yy-mm-dd", $(this).datepicker('getDate'));
        },
        onClose: function (selectedDate) {
            from.datepicker("option", "maxDate", selectedDate);
        }
    });
};

function SubmitKeyClick(controlId, button) {

    controlId.keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            button.click();
            return false;
        }
    });

};


function checkFSUser() {
    if ($("[id$='tb_FSUserID']").val() == "") {
        jAlert("Please input your FSUserID.", function () {
            $("[id$='tb_FSUserID']").focus();
        });
        return false;
    }
    else if ($("[id$='tb_FSPassword']").val() == "") {
        jAlert("Please input your FSPassword.", function () {
            $("[id$='tb_FSPassword']").focus();
        });
        return false;
    }
    else {
        return true;
    }
}

function openCenterWin(url, winName, width, height) {
    xposition = 0; yposition = 0;
    if ((parseInt(navigator.appVersion) >= 4)) {
        xposition = (screen.width - width) / 2;
        yposition = (screen.height - height) / 2;
    }
    theproperty = "width=" + width + ","
	+ "height=" + height + ","
	+ "location=0,"
	+ "menubar=0,"
	+ "resizable=1,"
	+ "scrollbars=1,"
	+ "status=0,"
	+ "titlebar=0,"
	+ "toolbar=0,"
	+ "hotkeys=0,"
	+ "screenx=" + xposition + "," //仅适用于Netscape
	+ "screeny=" + yposition + "," //仅适用于Netscape
	+ "left=" + xposition + "," //IE

	+ "top=" + yposition; //IE
    window.open(url, null, theproperty);
}

function rightMenu() {
    $(function () {
        var respondResult = new Array();
        var MenuNameID = $.getQueryString('id') == null ? '12' : $.getQueryString('id');
        $.ajax({
            async: false,
            type: "POST",
            url: "../WebService/RightMenu/RightMenuWebService.asmx/GetRightMenu",
            data: "{MenuNameID:" + MenuNameID + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $.map($.evalJSON(data.d), function (item) {
                    respondResult.push(new Array(item.RightMenuValue, item.RightMenuID, item.RightMenuOpenMethod, item.RightMenuPath, item.Row, item.value));
                });
            },
            error: function () {
                alert('Connection Error');
            }
        });
        var option = "{ width: 200, items:[";
        var stralias;
        for (i = 0; i < respondResult.length; i++) {
            stralias = respondResult[i][1] + "|" + respondResult[i][2] + "|" + respondResult[i][3] + "|" + respondResult[i][4];
            option += "{text: \"" + respondResult[i][0] + "\", icon: \"\", alias: \"" + stralias + "\", action:contextMenuItem_click},";

        }
        option = option.substring(0, option.length - 1);
        option += "]}";
        var menu = eval("(" + option + ")");
        //var menu = eval("(" + option + ")");
        function contextMenuItem_click(target) {
            //var itemKey = $(target).find("td").eq(0).text();
            var Querystring = $(target).attr("data-rel");
            var cmd = this.data.alias;
            var result = cmd.split("|");

            var href1 = "";
            var href2 = "";
            var index;
            $(".sidebar-menu a").each(function () {
                href1 = $(this).attr("href");
                if (href1.indexOf("?id=" + result[0] + "&")>-1) {
                    href2 = href1;
                    var indextemp = href2.indexOf("&index=");
                    index = href2.substr(indextemp + 7, 2);
                }
            });

            if (result[1] == 'R') {
                if (result[3] == '1') {
                    window.location = result[2] + "?id=" + result[0] + "&index=" + index + Querystring;
                } else {
                    window.location = result[2] + "?id=" + result[0] + "&index=" + index + Querystring;
                }
            } else {
                openCenterWin(result[2] + "?id=" + result[0] + Querystring, '', 820, 680);
            }
        }
        $(".js-datatable tr").contextmenu(menu);

    });
}

//function SubmitKeyClick(button) {
//    event = window.event || e;
//    if (event.keyCode == 13) {
//        event.keyCode = 9;
//        event.returnValue = false;
//        $("[id$='" + button + "']").click();
//        //document.all[button].click();
//    }
//}


function CheckConfirm(ClientDeleteId,DeleteId, Message) {
    confirmToGridview(ClientDeleteId, DeleteId, Message);
    return false;
}
