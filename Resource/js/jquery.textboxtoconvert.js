(function ($) {
    /** jQuery.decimalsOnly()
    在输入框(textbox)只能输入小数
    **/
    $.fn.extend({
        decimalsOnly: function () {
            $(this).css("ime-mode", "disabled");
            this.bind("keypress", function () {
                if (event.keyCode == 46) {
                    if (this.value.indexOf(".") != -1) {
                        return false;
                    }
                } else {
                    return event.keyCode >= 46 && event.keyCode <= 57;
                }
            });
            this.bind("blur", function () {
                if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                    this.value = this.value.substr(0, this.value.length - 1);
                } else if (isNaN(this.value)) {
                    this.value = "";
                }
            });
            this.bind("paste", function () {
                var s = clipboardData.getData('text');
                if (!/\D/.test(s));
                this.value = s.replace(/[^0-9.]/g, '');
                return false;
            });
            this.bind("dragenter", function () {
                return false;
            });
        }
    });

    /** jQuery.Digital()
    在输入框(textbox)输入浮点数
    **/
    $.fn.extend({
        Digital: function () {
            $(this).css("ime-mode", "disabled");
            this.bind("keydown", function () {
                var key = event.charCode || event.keyCode || 0;
                if (key == 46) {
                    if (this.value.indexOf(".") != -1) {
                        return false;
                    }
                } else {
                    // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                    return ((key == 46) ||
                    (key == 8) ||
                    (key == 189) ||
                    (key == 109) ||
                    (key == 190) ||
                    (key == 110) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105) ||
                    (key >= 37 && key <= 40));
                }
            });
            this.bind("blur", function () {
                //保证只有出现一个.而没有多个.
                this.value = this.value.replace(/\.{2,}/g, ".");
                //保证.只出现一次，而不能出现两次以上
                this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                //保证只有出现一个-而没有多个.
                this.value = this.value.replace(/\-{2,}/g, "-");
                //保证-只出现一次，而不能出现两次以上
                this.value = this.value.replace("-", "$#$").replace(/\-/g, "").replace("$#$", "-");
                if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                    this.value = this.value.substr(0, this.value.length - 1);
                }
                if (isNaN(this.value)) {
                    this.value = "";
                }

            });
            this.bind("paste", function () {
                var s = clipboardData.getData('text');
                if (!/\D/.test(s));
                this.value = s.replace(/[^-?\(0-9.)]/g, '');
                return false;
            });
            this.bind("dragenter", function () {
                return false;
            });
        }
    });

    /** jQuery.numbersOnly()
    在输入框(textbox)只能输入整数
    **/
    $.fn.extend({
        numbersOnly: function () {
            $(this).css("ime-mode", "disabled");
            this.bind("keypress", function () {
                if (event.keyCode == 46) {
                    if (this.value.indexOf(".") == -1) {
                        return false;
                    }
                } else {
                    return event.keyCode >= 46 && event.keyCode <= 57;
                }
            });
            this.bind("blur", function () {
                if (isNaN(this.value)) {
                    this.value = "";
                } else {
                    this.value = this.value.replace(/\D/g, '');
                }
            });
            this.bind("paste", function () {
                var s = clipboardData.getData('text');
                if (!/\D/.test(s));
                this.value = s.replace(/\D/g, '');
                return false;
            });
            this.bind("dragenter", function () {
                return false;
            });
        }
    });


    /** jQuery.Digital()
    在输入框(textbox)输入整数(负,正,0)
    **/
    $.fn.extend({
        IntegerOnly: function () {
            $(this).css("ime-mode", "disabled");
            this.bind("keydown", function () {
                var key = event.charCode || event.keyCode || 0;
                if (key == 46) {
                    if (this.value.indexOf(".") != -1) {
                        return false;
                    }
                } else {
                    // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                    return ((key == 46) ||
                    (key == 8) ||
                    (key == 189) ||
                    (key == 109) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105) ||
                    (key >= 37 && key <= 40));
                }
            });
            this.bind("blur", function () {
                //保证只有出现一个-而没有多个.
                this.value = this.value.replace(/\-{2,}/g, "-");
                //保证-只出现一次，而不能出现两次以上
                this.value = this.value.replace("-", "$#$").replace(/\-/g, "").replace("$#$", "-");
                if (this.value.lastIndexOf("-") == (this.value.length - 1)) {
                    this.value = this.value.substr(0, this.value.length - 1);
                }
                if (isNaN(this.value)) {
                    this.value = "";
                }

            });
            this.bind("paste", function () {
                var s = clipboardData.getData('text');
                if (!/\D/.test(s));
                this.value = s.replace(/[^-?\[1-9][0-9]*|0]/g, '');
                return false;
            });
            this.bind("dragenter", function () {
                return false;
            });
        }
    });

    /** jQuery.numbersOnly()
    小字字母转换为大写字母
    **/
    $.fn.extend({
        pressCharacter: function () {
            this.bind("keypress", function () {
                if (event.keyCode >= 97 && event.keyCode <= 122) {
                    event.keyCode = event.keyCode - 32;
                }
                return String.fromCharCode(event.keyCode)
            });
            this.bind("blur", function () {
                this.value = this.value.toUpperCase();
            });
//            this.bind("paste", function () {
//                var s = clipboardData.getData('text');
//                this.value = s.toUpperCase();
//                return false;
//            });
            this.bind("dragenter", function () {
                return false;
            });
        }
    });

    /** jQuery.asciiOnly()
    在输入框(textbox)只能输入ASCII
    **/
    $.fn.extend({
        asciiOnly: function () {
            $(this).css("ime-mode", "disabled");
            this.bind("keypress", function () {
                if (event.keyCode < 256) {
                    if (event.keyCode >= 97 && event.keyCode <= 122) {
                        event.keyCode = event.keyCode - 32;
                    }
                    return String.fromCharCode(event.keyCode);
                }
                else {
                    return false;
                }
            });
            this.bind("blur", function () {
                this.value = this.value.toUpperCase();
            });
            this.bind("paste", function () {
                var s = clipboardData.getData('text');
                this.value = s.toUpperCase();
                return false;
            });
            this.bind("dragenter", function () {
                return false;
            });
        }
    });
})(jQuery);