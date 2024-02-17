// UI v3.1

//crash_script;
if (getCookie("ui_version") && getCookie("ui_version") != "v3.1") {
	crash_script;
}

// This is built on top of the v1+ page. Don't disable it.

var h1 = document.createElement("h3");
h1.innerHTML = "<a class='dir_separator' href='/'>Start</a>";
var curr_dir_list = document.querySelector("#listing h1").innerHTML.split("/");
var prev_dirs = "/";
for (const dir of curr_dir_list) {
	if (dir != "" && dir != "Start") {
		prev_dirs += encodeURIComponent(dir) + "/";
		h1.innerHTML += " > <a class='dir_separator' href='" + prev_dirs + "'>" + dir + "</a>";
	}
}
document.getElementById("body_div").appendChild(h1);

var hr = document.createElement("hr");
document.getElementById("body_div").appendChild(hr);

lines_pre = document.querySelector("pre").innerHTML.split("\n");
lines_text_pre = document.querySelector("pre").innerText.split("\n");
var on_folders = true;
var to_add = document.createElement("h3");
to_add.innerHTML = "<u>Folders</u>"
document.getElementById("body_div").appendChild(to_add);
for (var i = 1; i < lines_pre.length; i++) {
	line = lines_pre[i];
	if (line.includes("href")) {
		if (on_folders) {
			to_add = createElement31({folder: on_folders, line: lines_text_pre[i], link: line.split("href=\"")[1].split("\"")[0]}, "element31 folder31");
		} else {
			to_add = createElement31({folder: on_folders, line: lines_text_pre[i], link: line.split("href=\"")[1].split("\"")[0]}, "element31");
		}
		document.getElementById("body_div").appendChild(to_add);
	} else if (line.includes("Files:")) {
		on_folders = false;

		var to_add = document.createElement("h3");
		to_add.innerHTML = "<u>Files</u>"
		document.getElementById("body_div").appendChild(to_add);
	}
}

function createElement31(element, cls) {
	var a = document.createElement('a');
	a.href = element.link;
	var div = document.createElement('div');
	a.appendChild(div);
	div.className = cls;

	// Add mousehouver text
	var date_index = element.line.search(/\b\d{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2}\b/);
	var tmp = element.line.substring(date_index + 19, element.line.length).split(" ");
	div.title = decodeURIComponent(element.link).replace("/", "") + " ||| " +
				element.line.substring(date_index, date_index + 17) + " ||| " +
				tmp[tmp.length-1];

	var description = "";

	var img_src = "/theme/icons/";
	if (element.folder) {
		img_src += "folder-1484.png";
		description = "Files folder";
	} else {
		a.target = "_blank"; // To open files always in a new tab
		var link = element.link;
		if (link.endsWith(".mp4") || link.endsWith(".avi") || link.endsWith(".mkv") ||
				link.endsWith(".mov") || link.endsWith(".wmv") || link.endsWith(".flv") ||
				link.endsWith(".webm")) {
			img_src += "129453.png";
			description = "Video file";
		} else if (link.endsWith(".zip")) {
			img_src += "zip-folder-11649.png";
			description = "Compressed file";
		} else if (link.endsWith(".png") || link.endsWith(".jpg") || link.endsWith(".jpeg") ||
				link.endsWith(".webp") || link.endsWith(".gif")) {
			img_src += "photos-10612.png";
			description = "Image file";
		} else if (link.endsWith(".mp3") || link.endsWith(".wav") ||
				link.endsWith(".aac") || link.endsWith(".ogg") || link.endsWith(".m4a")) {
			img_src += "music-note-10189.png";
			description = "Audio file";
		} else if (link.endsWith(".txt") || link.endsWith(".log")) {
			img_src += "file-1453.png";
			description = "Text document";
		} else if (link.endsWith(".pdf")) {
			img_src += "pdf-2616.png";
			description = "PDF file";
		} else if (link.endsWith(".doc") || link.endsWith(".docx") || link.endsWith(".rtf")) {
			img_src += "word-67-512.png";
			description = "Word document";
		} else if (link.endsWith(".ppt") || link.endsWith(".pptx") || link.endsWith(".pps") || link.endsWith(".ppsx")) {
			img_src += "ppt-46-512.png";
			description = "PowerPoint presentation";
		} else if (link.endsWith(".xls") || link.endsWith(".xlsx")) {
			img_src += "excel-512.png";
			description = "Excel file";
		} else if (link.endsWith(".exe")) {
			img_src += "EXE-icon.png";
			description = "Windows executable";
		} else {
			img_src += "empty-paper-black-outline-19837.png";
			description = "File";
		}
	}

	var img = document.createElement('img');
	img.className = "prevent_select";
	img.src = img_src;
	div.appendChild(img);

	var filename = div.title.split(" ||| ")[0];
	var max_len = 50;
	if (filename.length > max_len) {
		filename = filename.substring(0, max_len) + "...";
	}
	div.innerHTML += "<p>" + strToHtml(filename) + "</p>";

	if (cls == "element31") {
		var date_index = element.line.search(/\b\d{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2}\b/);
		div.innerHTML += "<p class='prevent_select' style='color: gray;'>" + strToHtml(element.line.substring(date_index, element.line.length)) + "</p>";

		div.innerHTML += "<p class='prevent_select' style='color: gray;'>" + description + "</p>";
	}

	return a;
}

hr = document.createElement("hr");
document.getElementById("body_div").appendChild(hr);

// Remove the v1 design so that only this one is shown
document.querySelector("#listing").innerHTML = "";
