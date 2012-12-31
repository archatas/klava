(function($, undefined) {
    var layouts = {};
    $.fn.klava = function(options) {
        var $this = this;
        var settings = $.extend( {
            layouts: [
                "layouts/kbd-us.js",
                "layouts/kbd-baltic.js",
                "layouts/kbd-rusphon.js",
                "layouts/kbd-de.js"
            ]
        }, options);
        
        var arrKbdFiles = settings.layouts;
        
        var strKeyboardLayout = '<div class="keyboard">'
        + '<div class="keyboardRow"><button data-keycode="192" class="alphaNumeric_192">~</button><button data-keycode="49" class="alphaNumeric_49">!</button><button data-keycode="50" class="alphaNumeric_50">@</button><button data-keycode="51" class="alphaNumeric_51">#</button><button data-keycode="52" class="alphaNumeric_52">$</button><button data-keycode="53" class="alphaNumeric_53">%</button><button data-keycode="54" class="alphaNumeric_54" class="alphaNumeric_54">^</button><button data-keycode="55" class="alphaNumeric_55">&amp;</button><button data-keycode="56" class="alphaNumeric_56">*</button><button data-keycode="57" class="alphaNumeric_57">(</button><button data-keycode="48" class="alphaNumeric_48">)</button><button data-keycode="189" class="alphaNumeric_189">_</button><button data-keycode="187" class="alphaNumeric_187">+</button><button class="backSpace">Back</button></div>'
        + '<div class="keyboardRow"><button data-keycode="9" class="tab">Tab</button><button data-keycode="81" class="alphaNumeric_81">Q</button><button data-keycode="87" class="alphaNumeric_87">W</button><button data-keycode="69" class="alphaNumeric_69">E</button><button data-keycode="82" class="alphaNumeric_82">R</button><button data-keycode="84" class="alphaNumeric_84">T</button><button data-keycode="89" class="alphaNumeric_89">Y</button><button data-keycode="85" class="alphaNumeric_85">U</button><button data-keycode="73" class="alphaNumeric_73">I</button><button data-keycode="79" class="alphaNumeric_79">O</button><button data-keycode="80" class="alphaNumeric_80">P</button><button data-keycode="219" class="alphaNumeric_219">[</button><button data-keycode="221" class="alphaNumeric_221">]</button><button data-keycode="220" class="pipeAndBackSlash" class="alphaNumeric_220">|</button></div>'
        + '<div class="keyboardRow"><button data-keycode="20" class="capsLockKey capsLock">Caps</button><button data-keycode="65" class="alphaNumeric_65">A</button><button data-keycode="83" class="alphaNumeric_83">S</button><button data-keycode="68" class="alphaNumeric_68">D</button><button data-keycode="70" class="alphaNumeric_70">F</button><button data-keycode="71" class="alphaNumeric_71">G</button><button data-keycode="72" class="alphaNumeric_72">H</button><button data-keycode="74" class="alphaNumeric_74">J</button><button data-keycode="75" class="alphaNumeric_75">K</button><button data-keycode="76" class="alphaNumeric_76">L</button><button data-keycode="186" class="alphaNumeric_186">;</button><button data-keycode="222" class="alphaNumeric_222">\'</button><button data-keycode="13" class="enter">Enter</button></div>'
        + '<div class="keyboardRow"><button class="shiftKey shift" data-keycode="16">Shift</button><button data-keycode="90" class="alphaNumeric_90">Z</button><button data-keycode="88" class="alphaNumeric_88">X</button><button data-keycode="67" class="alphaNumeric_67">C</button><button data-keycode="86" class="alphaNumeric_86">V</button><button data-keycode="66" class="alphaNumeric_66">B</button><button data-keycode="78" class="alphaNumeric_78">N</button><button data-keycode="77" class="alphaNumeric_77">M</button><button data-keycode="188" class="alphaNumeric_188">,</button><button data-keycode="190" class="alphaNumeric_190">.</button><button data-keycode="191" class="alphaNumeric_191">/</button><button data-keycode="16" class="shiftGrKey shiftGr">Shift</button></div>'
        + '<div class="keyboardRow"><button data-keycode="17" class="ctrlKey ctrl" disabled="disabled">Ctrl</button><button data-keycode="18" class="altKey alt">Alt</button><button data-keycode="32" class="space">Space</button><button data-keycode="18" class="altGrKey altGr">Alt</button><button data-keycode="17" class="ctrlGrKey ctrlGr" disabled="disabled">Ctrl</button></div>'
        + '</div>';
        var strHandle = '<div class="keyboardHandle"><a href="#">▼</a></div>';
        
        var arrAlphaNumericKeys = [
            192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 81,
            87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220,
            65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 
            90, 88, 67, 86, 66, 78, 77, 188, 190, 191
        ];
        
        var arrTitleCombos = ["", "Shift + ", "Alt + ", "Alt + Shift + "];
        
        var objEventSimulator = {};
        objEventSimulator.capsLockKey = false;
        objEventSimulator.ctrlKey = false;
        objEventSimulator.altKey = false;
        objEventSimulator.altGrKey = false;
        objEventSimulator.shiftKey = false;
        objEventSimulator.keyCode = 0;
        
        var arrVipKeys = [];
        arrVipKeys[8] = "Backspace";
        arrVipKeys[27] = "Esc";
        arrVipKeys[33] = "Page Up";
        arrVipKeys[34] = "Page Down";
        arrVipKeys[35] = "End";
        arrVipKeys[36] = "Home";
        arrVipKeys[37] = "Left";
        arrVipKeys[38] = "Top";
        arrVipKeys[39] = "Right";
        arrVipKeys[40] = "Bottom";
        arrVipKeys[45] = "Insert";
        arrVipKeys[46] = "Delete";
        for (i=1; i<=12; i++) { // F1 - F12
            arrVipKeys[111 + i] = "F" + i;
        }
        arrVipKeys[18] = "Alt";
        for (i=0; i<=10; i++) { // Alt + 0 - Alt + 9
            arrVipKeys[96 + i] = "" + i;
        }
        arrVipKeys[144] = "Num Lock";
        arrVipKeys[145] = "Scroll Lock";
        
        function loadJSFiles(callback) {
            var unloaded = arrKbdFiles.length;
            $(arrKbdFiles).each(function() {
                var layout_path = this;
                if (!layouts[layout_path]) {
                    $.getScript(layout_path, function(data, textStatus, jqxhr) {
                        if (textStatus == "success") {
                            layouts[layout_path] = {};
                            layouts[layout_path].caption = strLayoutCaption;
                            layouts[layout_path].translate = arrTranslation;
                            unloaded--;
                            if (!unloaded) {
                                callback();
                            }
                        }
                    });
                } else {
                    unloaded--;
                    if (!unloaded) {
                        callback();
                    }
                }
            });
        }

        function layout_selection() {
            var html = '<div class="keyboardLayoutContainer"><label>Keyboard layout: <select class="keyboardLayout">';
            $(arrKbdFiles).each(function() {
                html += '<option value="' + this + '">' + layouts[this].caption + '</option>';
            });
            html += '</select></label></div>';
            return html;
        }
        
        function insert(objField, strSymbol) {
            var objText = objField;
            objText.focus();
            // IE
            if(typeof document.selection != 'undefined') {
                var objRange = document.selection.createRange();
                objRange.text = strSymbol;
                objRange.collapse(false);
                objRange.select();
            //gecko
            } else if(typeof objText.selectionStart != 'undefined') {
                var intStart = objText.selectionStart;
                var intEnd = objText.selectionEnd;
                var insText = objText.value.substring(intStart, intEnd);
                objText.value = objText.value.substr(0, intStart) + strSymbol + objText.value.substr(intEnd);
                var intPos = intStart + strSymbol.length;
                objText.selectionStart = intPos;
                objText.selectionEnd = intPos;
            }
            return false;
        }
        
        function backSpace(objField) {
            var objText = objField;
            objText.focus();
            // IE
            if(typeof document.selection != 'undefined') {
                var objRange = document.selection.createRange();
                if (!objRange.text) {
                    objRange.moveStart("character", -1);
                }
                objRange.text = "";
            //gecko
            } else if(typeof objText.selectionStart != 'undefined') {
                var intStart = objText.selectionStart;
                var intEnd = objText.selectionEnd;
                var insText = objText.value.substring(intStart, intEnd);
                if (!insText.length) {
                    intStart--;
                }
                objText.value = objText.value.substr(0, intStart) + objText.value.substr(intEnd);
                var intPos = intStart;
                objText.selectionStart = intPos;
                objText.selectionEnd = intPos;
            }
            return false;
        }
        
        function faceControl(objEvent) {
            var canGo = false;
            if (objEvent.charCode>8000 || objEvent.keyCode>8000 || (arrVipKeys[objEvent.keyCode] && !document.all) || objEvent.ctrlKey) {
                canGo = true;
            }
            return canGo;
        }
        
        function getCombo(objEvent) {
            var strCombo = "";
            if (objEvent.ctrlKey) {
                strCombo += "Ctrl + ";
            }
            if (objEventSimulator.altKey) {
                strCombo += "Alt + ";
            }
            if ((objEventSimulator.shiftKey && !objEventSimulator.capsLockKey) || (!objEventSimulator.shiftKey && objEventSimulator.capsLockKey)) {
                strCombo += "Shift + ";
            }
            if (objEvent.metaKey) {
                strCombo += "Meta + ";
            }
            strCombo += objEvent.keyCode;
            return strCombo;
        }
        
        function changeKey(objEvent) {
            var objField = objEvent.target;
            var $parent = $(objField).parent();
            var layout_path = $('.keyboardLayout', $parent).val();
            switch(objEvent.keyCode) {
                case 16:
                    objEventSimulator.shiftKey = true;
                    $('.shiftKey', $parent).css('fontWeight', (objEventSimulator.shiftKey)? "bold": "normal");
                    $('.shiftGrKey', $parent).css('fontWeight', (objEventSimulator.shiftKey)? "bold": "normal");
                    break;
                case 17:
                    objEventSimulator.ctrlKey = true;
                    $('.ctrlKey', $parent).css('fontWeight', (objEventSimulator.ctrlKey)? "bold": "normal");
                    $('.ctrlGrKey', $parent).css('fontWeight', (objEventSimulator.ctrlKey)? "bold": "normal");
                    break;
                case 18:
                    objEventSimulator.altKey = true;
                    $('.altKey', $parent).css('fontWeight', (objEventSimulator.altKey)? "bold": "normal");
                    $('.altGrKey', $parent).css('fontWeight', (objEventSimulator.altKey)? "bold": "normal");
                    break;
                case 20:
                    objEventSimulator.capsLockKey = !objEventSimulator.capsLockKey;
                    $('.capsLockKey', $parent).css('fontWeight',  (objEventSimulator.capsLockKey)? "bold": "normal");
                    break;
                default:
                    strCombo = getCombo(objEvent);
                    if (layouts[layout_path].translate[strCombo]) {
                        insert(objField, layouts[layout_path].translate[strCombo]);
                    }               
            }
            changeLayout(objField);
            if (document.all && 9==objEvent.keyCode && !objEvent.ctrlKey/* && !arrVipKeys[objEvent.keyCode]*/) {
                event.returnValue = true;
                event.cancelBubble = true;
            }
            return true;
        }
        
        function changeLayout(objField) {
        //	if (objEventSimulator.capsLockKey) {
        //		objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
        //	}
            var $parent = $(objField).parent();
            var layout_path = $('.keyboardLayout', $parent).val();
            if (layouts[layout_path]) {
                var intLength = arrAlphaNumericKeys.length;
                for(i=0; i<intLength; i++) {
                    var $objKey = $('.alphaNumeric_' + arrAlphaNumericKeys[i], $parent);
                    if ($objKey.length) {
                        objEventSimulator.keyCode = arrAlphaNumericKeys[i];
                        var strCombo = getCombo(objEventSimulator);
                        var strSymbol = layouts[layout_path].translate[strCombo];
                        if (strSymbol) {
                            strSymbol = strSymbol.replace(/&/,"&amp;");
                            strSymbol = strSymbol.replace(/</,"&lt;");
                            $objKey.html(strSymbol);
                        } else {
                            $objKey.html("&nbsp;");
                        }
                        var strTitle = " ";
                        var intTitleCombosLength = arrTitleCombos.length;
                        for (j=0; j<intTitleCombosLength; j++) {
                            strCombo = arrTitleCombos[j] + objEventSimulator.keyCode;
                            if (layouts[layout_path].translate[strCombo]) {
                                strTitle += "[" + layouts[layout_path].translate[strCombo] + "] ";
                            }
                        }
                        $objKey.attr('title', strTitle);
                    }
                }
            }
        //	if (objEventSimulator.capsLockKey) {
        //		objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
        //	}
        }
        
        function typing(objField, objButton, intKeyCode) {
            console.log(intKeyCode);
            var $parent = $(objField).parent();
            switch(intKeyCode) {
                case 16:
                    objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
                    $('.shiftKey', $parent).css('fontWeight', (objEventSimulator.shiftKey)? "bold": "normal");
                    $('.shiftGrKey', $parent).css('fontWeight', (objEventSimulator.shiftKey)? "bold": "normal");
                    break;
                case 17:
                    objEventSimulator.ctrlKey = !objEventSimulator.ctrlKey;
                    $('.ctrlKey', $parent).css('fontWeight', (objEventSimulator.ctrlKey)? "bold": "normal");
                    $('.ctrlGrKey', $parent).css('fontWeight', (objEventSimulator.ctrlKey)? "bold": "normal");
                    break;
                case 20:
                    objEventSimulator.capsLockKey = !objEventSimulator.capsLockKey;
                    $('.capsLockKey', $parent).css('fontWeight', (objEventSimulator.capsLockKey)? "bold": "normal");
                    break;
                case 18:
                    if ($(objButton).hasClass("altGrKey")) {
                        objEventSimulator.altKey = objEventSimulator.altGrKey = !objEventSimulator.altGrKey;
                        $('.altGrKey', $parent).css('fontWeight', (objEventSimulator.altGrKey)? "bold": "normal");
                    }
                    if ($(objButton).hasClass("altKey")) {
                        objEventSimulator.altKey = !objEventSimulator.altKey;
                        $('.altKey', $parent).css('fontWeight', (objEventSimulator.altKey)? "bold": "normal");
                    }
                    break;
                default:
        //			if (objEventSimulator.capsLockKey) {
        //				objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
        //			}
                    objEventSimulator.keyCode = intKeyCode;
                    objEventSimulator.target = objField;
                    changeKey(objEventSimulator);
                    objEventSimulator.shiftKey = false;
                    $('.shiftKey', $parent).css('fontWeight', (objEventSimulator.shiftKey)? "bold": "normal");
                    $('.shiftGrKey', $parent).css('fontWeight', (objEventSimulator.shiftKey)? "bold": "normal");
            }
            changeLayout(objField);
        }
        
        function resetControlKeys(objEvent) {
            var objField = objEvent.target;
            var $parent = $(objField).parent();
            switch(objEvent.keyCode) {
                case 16:
                    objEventSimulator.shiftKey = false;
                    $('.shiftKey', $parent).css('fontWeight',  (objEventSimulator.shiftKey)? "bold": "normal");
                    $('.shiftGrKey', $parent).css('fontWeight', (objEventSimulator.shiftKey)? "bold": "normal");
                    break;
                case 17:
                    objEventSimulator.ctrlKey = false;
                    $('.ctrlKey', $parent).css('fontWeight', (objEventSimulator.ctrlKey)? "bold": "normal");
                    $('.ctrlGrKey', $parent).css('fontWeight',  (objEventSimulator.ctrlKey)? "bold": "normal");
                    break;
                case 18:
                    objEventSimulator.altKey = false;
                    $('.altKey', $parent).css('fontWeight', (objEventSimulator.altKey)? "bold": "normal");
                    $('.altGrKey', $parent).css('fontWeight',  (objEventSimulator.altKey)? "bold": "normal");
                    break;
                case 20:
                    break;
            }
            changeLayout(objField);
            objEvent.cancelBubble = true;
            return false;
        }
        
        loadJSFiles(function() {
            $this.each(function() {
                var field = this;
                var $parent = $(this).parent();
                $parent.append(layout_selection()).append(strKeyboardLayout).append(strHandle);
                $('.keyboardLayout', $parent).change(function() {
                    return changeLayout(field);
                }).change();
                $('button:not(.backSpace)', $parent).click(function() {
                    return typing(field, this, $(this).data('keycode'));
                });
                $('button.backSpace', $parent).click(function() {
                    return backSpace(field);
                });
                $('.keyboardHandle a', $parent).click(function() {
                    var $keyboard = $('.keyboard', $parent);
                    if ($keyboard.is(":visible")) {
                        $keyboard.slideUp();
                        $(this).html('▼');
                    } else {
                        $keyboard.slideDown();
                        $(this).html('▲');
                    }
                    return false;
                });
                $(this).keypress(faceControl)
                    .keydown(changeKey).keyup(resetControlKeys);
                console.log(this);
                console.log(layouts);
            });
        });
        
        return $this;
    };
})(jQuery);