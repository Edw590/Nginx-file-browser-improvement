var elements = document.querySelectorAll("a.element2,.element3,.element31");
var elements_arr = [];
for (var i = 0; i < elements.length; i++) {
	elements_arr.push(elements[i]);
}

// Download all files in a folder

function downloadAll() {
	var any_downloaded = false;
	for (var i = 0; i < elements_arr.length; i++) {
		if (!elements_arr[i].href.endsWith("/")) {
			elements_arr[i].click();
			any_downloaded = true
		}
	}
	if (!any_downloaded) {
		alert("No files to download");
	}
}

// Order By things

function sortBy(what) {
	switch (what) {
		case "name":
			window.location.href = "";
			break;
		case "date+":
			sortByDate("+");
			break;
		case "date-":
			sortByDate("-");
			break;
		case "size+":
			sortBySize("+");
			break;
		case "size-":
			sortBySize("-");
			break;

		default:
			break;
	}
}

function sortByDate(direction) {
	document.getElementById("new_listing").innerHTML = ""; // Remove "Folders" and "Files" from the listing
	var elements_arr_copy = elements_arr.slice();
	elements_arr_copy.sort(function(a, b) {

		// dataMine is a custom attribute on UI v4
		var date_a;
		if (a.title.includes("|||")) {
			date_a = new Date(a.title.split("|||")[1]);
		} else {
			date_a = new Date(a.dataMine.split("|||")[1]);
		}
		var date_b;
		if (b.title.includes("|||")) {
			date_b = new Date(b.title.split("|||")[1]);
		} else {
			date_b = new Date(b.dataMine.split("|||")[1]);
		}
		if (direction == "+") {
			return date_a - date_b;
		} else {
			return date_b - date_a;
		}
	});

	for (var i = 0; i < elements_arr_copy.length; i++) {
		document.getElementById("new_listing").appendChild(elements_arr_copy[i]);
	}
}

function sortBySize(direction) {
	document.getElementById("new_listing").innerHTML = ""; // Remove "Folders" and "Files" from the listing
	var elements_arr_copy = elements_arr.slice();
	elements_arr_copy.sort(function(a, b) {

		// dataMine is a custom attribute on UI v4
		var size_a = "";
		if (a.title.includes("|||")) {
			size_a = a.title.split("|||")[2].split(" ");
		} else {
			size_a = a.dataMine.split("|||")[2].split(" ");
		}
		var size_b = "";
		if (b.title.includes("|||")) {
			size_b = b.title.split("|||")[2].split(" ");
		} else {
			size_b = b.dataMine.split("|||")[2].split(" ");
		}
		var size_a_len = size_a.length;
		var size_b_len = size_b.length;
		var size_a_num = parseFloat(size_a[size_a_len-2]);
		var size_b_num = parseFloat(size_b[size_a_len-2]);

		if (size_a[size_a_len-1] == "KB") {
			size_a_num *= 1000;
		} else if (size_a[size_a_len-1] == "MB") {
			size_a_num *= 1000000;
		} else if (size_a[size_a_len-1] == "GB") {
			size_a_num *= 1000000000;
		}

		if (size_b[size_b_len-1] == "KB") {
			size_b_num *= 1000;
		} else if (size_b[size_b_len-1] == "MB") {
			size_b_num *= 1000000;
		} else if (size_b[size_b_len-1] == "GB") {
			size_b_num *= 1000000000;
		}

		if (direction == "+") {
			return size_a_num - size_b_num;
		} else {
			return size_b_num - size_a_num;
		}
	});

	for (var i = 0; i < elements_arr_copy.length; i++) {
		document.getElementById("new_listing").appendChild(elements_arr_copy[i]);
	}
}
