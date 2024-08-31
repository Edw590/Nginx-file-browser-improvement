function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function strToHtml(str) {
	var ret = "";
	for (var i = 0; i < str.length; i++) {
		if (str[i] == "<") {
			ret += "&lt;";
		} else if (str[i] == ">") {
			ret += "&gt;";
		} else if (str[i] == " ") {
			ret += "&nbsp;";
		} else {
			ret += str[i];
		}
	}

	return ret;
}

function search(str) {
	var elements = document.querySelectorAll("a.element2,.element3,.element31,.element4");
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.title.split("|||")[0].toLowerCase().includes(str.toLowerCase())) {
			element.style.display = "inline-block";
		} else {
			element.style.display = "none";
		}
	}
}
