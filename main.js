var arrKbdFiles = ["kbd-us.js", "kbd-baltic.js", "kbd-rusphon.js", "kbd-de.js"];

var strLayoutCaption, arrTranslation;
var arrLayouts = [], intCurrentLayout, j = 0, jl = arrKbdFiles.length, objScript;

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

var booLoadNext = true;
var blnOpera = document.all && document.defaultView && document.captureEvents; // define rules for recognizing Opera

function loadJSFiles() {
	if (objScript) {
		if (!objScript.readyState || "loaded" == objScript.readyState) {
			arrLayouts[j] = {};
			arrLayouts[j]["caption"] = strLayoutCaption;
			arrLayouts[j]["translate"] = arrTranslation;
			document.getElementById("keyboardLayout").options[j] = new Option(strLayoutCaption, j);
			j++;
			booLoadNext = true;
		}
	}
	if (j < jl && booLoadNext) {
		booLoadNext = false;
		objScript = document.createElement("script");
		objScript.setAttribute("type", "text/javascript");
		objScript.setAttribute("onload", "loadJSFiles()");
		objScript.onload = loadJSFiles;
//		objScript.setAttribute("defer", "true");
		objScript.setAttribute("src", "layouts/" + arrKbdFiles[j]);
		objScript.onreadystatechange = loadJSFiles;
		document.getElementsByTagName("head")[0].appendChild(objScript);
	}
	if (j >= jl) { // finally
		document.getElementById("keyboardLayout").value = 0;
		changeLayout();
	} else if (blnOpera){ // Opera doesn't support onload for script tag therefore let's solve that in another way
		setTimeout("loadJSFiles()", 100);
	}
}

function insert(strSymbol) {
	var objText = document.getElementById("text");
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

function backSpace() {
	var objText = document.getElementById("text");
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
	switch(objEvent.keyCode) {
		case 16:
			objEventSimulator.shiftKey = true;
			document.getElementById("shiftKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
			document.getElementById("shiftGrKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
			break;
		case 17:
			objEventSimulator.ctrlKey = true;
			document.getElementById("ctrlKey").style.fontWeight = (objEventSimulator.ctrlKey)? "bold": "normal";
			document.getElementById("ctrlGrKey").style.fontWeight = (objEventSimulator.ctrlKey)? "bold": "normal";
			break;
		case 18:
			objEventSimulator.altKey = true;
			document.getElementById("altKey").style.fontWeight = (objEventSimulator.altKey)? "bold": "normal";
			document.getElementById("altGrKey").style.fontWeight = (objEventSimulator.altKey)? "bold": "normal";
			break;
		case 20:
			objEventSimulator.capsLockKey = !objEventSimulator.capsLockKey;
			document.getElementById("capsLockKey").style.fontWeight = (objEventSimulator.capsLockKey)? "bold": "normal";
			break;
		default:
			strCombo = getCombo(objEvent);
			if (arrLayouts[intCurrentLayout]["translate"][strCombo]) {
				insert(arrLayouts[intCurrentLayout]["translate"][strCombo]);
			}
	}
	changeLayout();
	if (document.all && 9==objEvent.keyCode && !objEvent.ctrlKey/* && !arrVipKeys[objEvent.keyCode]*/) {
		event.returnValue = true;
		event.cancelBubble = true;
	}
	return true;
}

function changeLayout() {
//	if (objEventSimulator.capsLockKey) {
//		objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
//	}
	intCurrentLayout = document.getElementById("keyboardLayout").value;
	if (arrLayouts[intCurrentLayout]) {
		var intLength = arrAlphaNumericKeys.length;
		for(i=0; i<intLength; i++) {
			var objKey = document.getElementById("alphaNumeric_" + arrAlphaNumericKeys[i]);
			if (objKey) {
				objEventSimulator.keyCode = arrAlphaNumericKeys[i];
				var strCombo = getCombo(objEventSimulator);
				var strSymbol = arrLayouts[intCurrentLayout]["translate"][strCombo];
				if (strSymbol) {
					strSymbol = strSymbol.replace(/&/,"&amp;");
					strSymbol = strSymbol.replace(/</,"&lt;");
					objKey.innerHTML = strSymbol;
				} else {
					objKey.innerHTML = "&nbsp;";
				}
				var strTitle = " ";
				var intTitleCombosLength = arrTitleCombos.length;
				for (j=0; j<intTitleCombosLength; j++) {
					strCombo = arrTitleCombos[j] + objEventSimulator.keyCode;
					if (arrLayouts[intCurrentLayout]["translate"][strCombo]) {
						strTitle += "[" + arrLayouts[intCurrentLayout]["translate"][strCombo] + "] ";
					}
				}
				objKey.title = strTitle;
			} else {
				alert(arrAlphaNumericKeys[i]);
			}
		}
	}
//	if (objEventSimulator.capsLockKey) {
//		objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
//	}
}

function typing(objButton, intKeyCode) {
    console.log(intKeyCode);
	switch(intKeyCode) {
		case 16:
			objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
			document.getElementById("shiftKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
			document.getElementById("shiftGrKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
			break;
		case 17:
			if ("altGrKey" == objButton.id) {
				objEventSimulator.altKey = objEventSimulator.altGrKey = !objEventSimulator.altGrKey;
				document.getElementById("altGrKey").style.fontWeight = (objEventSimulator.altGrKey)? "bold": "normal";
			} else {
				objEventSimulator.ctrlKey = !objEventSimulator.ctrlKey;
				document.getElementById("ctrlKey").style.fontWeight = (objEventSimulator.ctrlKey)? "bold": "normal";
				document.getElementById("ctrlGrKey").style.fontWeight = (objEventSimulator.ctrlKey)? "bold": "normal";
			}
			break;
		case 20:
			objEventSimulator.capsLockKey = !objEventSimulator.capsLockKey;
			document.getElementById("capsLockKey").style.fontWeight = (objEventSimulator.capsLockKey)? "bold": "normal";
			break;
		case 18:
			if ("altKey" == objButton.id) {
				objEventSimulator.altKey = !objEventSimulator.altKey;
				document.getElementById("altKey").style.fontWeight = (objEventSimulator.altKey)? "bold": "normal";
			}
			break;
		default:
//			if (objEventSimulator.capsLockKey) {
//				objEventSimulator.shiftKey = !objEventSimulator.shiftKey;
//			}
			objEventSimulator.keyCode = intKeyCode;
			changeKey(objEventSimulator);
			objEventSimulator.shiftKey = false;
			document.getElementById("shiftKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
			document.getElementById("shiftGrKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
	}
	changeLayout();
}

function resetControlKeys(objEvent) {
	switch(objEvent.keyCode) {
		case 16:
			objEventSimulator.shiftKey = false;
			document.getElementById("shiftKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
			document.getElementById("shiftGrKey").style.fontWeight = (objEventSimulator.shiftKey)? "bold": "normal";
			break;
		case 17:
			objEventSimulator.ctrlKey = false;
			document.getElementById("ctrlKey").style.fontWeight = (objEventSimulator.ctrlKey)? "bold": "normal";
			document.getElementById("ctrlGrKey").style.fontWeight = (objEventSimulator.ctrlKey)? "bold": "normal";
			break;
		case 18:
			objEventSimulator.altKey = false;
			document.getElementById("altKey").style.fontWeight = (objEventSimulator.altKey)? "bold": "normal";
			document.getElementById("altGrKey").style.fontWeight = (objEventSimulator.altKey)? "bold": "normal";
			break;
		case 20:
			break;
	}
	changeLayout();
	objEvent.cancelBubble = true;
	return false;
}

window.onload = loadJSFiles;