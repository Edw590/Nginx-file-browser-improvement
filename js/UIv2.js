//crash_script;
if (getCookie("ui_version") != "v2") {
	crash_script;
}

// This is built on top of the v1+ page. Don't disable it.

var download_vid = false;

var h1 = document.createElement("h3");
h1.innerHTML = "<a class='dir_separator' href='/'>Start</a>";
var curr_dir_list = document.querySelector("#listing h1").innerHTML.split("/");
var prev_dirs = "";
for (const dir of curr_dir_list) {
	if (dir != "" && dir != "Start") {
		prev_dirs += "/" + encodeURIComponent(dir) + "/";
		h1.innerHTML += " > <a class='dir_separator' href='" + prev_dirs + "'>" + dir + "</a>";
	}
}
document.getElementById("body_div").appendChild(h1);

var hr = document.createElement("hr");
document.getElementById("body_div").appendChild(hr);

var subtitle = document.createElement("div");
subtitle.className = "element2";
subtitle.innerHTML = "<code><strong>" + strToHtml("                           Name                             Modification date      Size    ") + "</strong></code><br><br>";
document.getElementById("body_div").appendChild(subtitle);

lines_pre = document.querySelector("pre").innerHTML.split("\n");
lines_text_pre = document.querySelector("pre").innerText.split("\n");
var on_folders = true;
for (var i = 1; i < lines_pre.length; i++) {
	line = lines_pre[i];
	if (line.includes("href")) {
		var div = createElement2({name: line.split(">")[1].split("<")[0], folder: on_folders, line: lines_text_pre[i], link: line.split("href=\"")[1].split("\"")[0]});
		document.getElementById("body_div").appendChild(div);
	} else if (line.includes("Files:")) {
		on_folders = false;
	}
}

function createElement2(element) {
	var a = document.createElement('a');
	a.href = element.link;
	var div = document.createElement('div');
	a.appendChild(div);
	div.className = 'element2';

	// Add mousehouver text
	div.title = decodeURIComponent(element.link).replace("/", "");

	var img_src = "/theme/icons/";
	if (element.folder) {
		img_src += "folder-1484.png";
	} else {
		a.target = "_blank";
		//a.href = ""; // Let div.onclick handle this in case of a file (open a new tab)
		var link = element.link;
		if (link.endsWith("..&gt;")) {
			img_src += "question-11800.png";
		} else {
			if (link.endsWith(".mp4") || link.endsWith(".avi") || link.endsWith(".mkv") ||
					link.endsWith(".mov") || link.endsWith(".wmv") || link.endsWith(".flv") ||
					link.endsWith(".webm")) {
				img_src += "129453.png";
			} else if (link.endsWith(".zip")) {
				img_src += "zip-folder-11649.png";
			} else if (link.endsWith(".png") || link.endsWith(".jpg") || link.endsWith(".jpeg") ||
					link.endsWith(".webp") || link.endsWith(".gif")) {
				img_src += "photos-10612.png";
			} else if (link.endsWith(".mp3") || link.endsWith(".wav") ||
					link.endsWith(".aac") || link.endsWith(".ogg") || link.endsWith(".m4a")) {
				img_src += "music-note-10189.png";
			} else if (link.endsWith(".txt") || link.endsWith(".log")) {
				img_src += "file-1453.png";
			} else if (link.endsWith(".pdf")) {
				img_src += "pdf-2616.png";
			} else if (link.endsWith(".doc") || link.endsWith(".docx") || link.endsWith(".rtf")) {
				img_src += "word-67-512.png";
			} else if (link.endsWith(".ppt") || link.endsWith(".pptx") || link.endsWith(".pps") || link.endsWith(".ppsx")) {
				img_src += "ppt-46-512.png";
			} else if (link.endsWith(".xls") || link.endsWith(".xlsx")) {
				img_src += "excel-512.png";
			} else if (link.endsWith(".exe")) {
				img_src += "EXE-icon.png";
			} else {
				img_src += "empty-paper-black-outline-19837.png";
			}
		}
	}

	var img = document.createElement('img');
	img.className = "prevent_select";
	img.src = img_src;
	div.appendChild(img);

	div.innerHTML += strToHtml(element.line);

	return a;
}

hr = document.createElement("hr");
document.getElementById("body_div").appendChild(hr);

// Remove the UI v1 design so that only the new one is shown
document.querySelector("#listing").innerHTML = "";
