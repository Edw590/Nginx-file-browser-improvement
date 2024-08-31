// UI v4

//crash_script;
if (getCookie("ui_version") && getCookie("ui_version") != "v4") {
	crash_script;
}

// This is built on top of the v1+ page. Don't disable it.

var path_h3 = document.createElement("h3");
path_h3.id = "path_h3_4";
path_h3.innerHTML = "<a class='dir_separator4' href='/'>Start</a>";
var curr_dir_list = document.querySelector("#listing h1").innerText.split(" |>| ");
var prev_dirs = "/";
for (const dir of curr_dir_list) {
	if (dir != "" && dir != "Start") {
		prev_dirs += encodeURIComponent(dir) + "/";
		path_h3.innerHTML += " &gt; <a class='dir_separator4' href='" + prev_dirs + "'>" + dir + "</a>";
	}
}
document.getElementById("body_div").appendChild(path_h3);

var more_info = document.createElement("div");
more_info.id = "more_info4";
more_info.style.display = "none";
document.getElementById("body_div").appendChild(more_info);

var hr = document.createElement("hr");
document.getElementById("body_div").appendChild(hr);

var new_listing_div = document.createElement("div");
new_listing_div.id = "new_listing";
document.getElementById("body_div").appendChild(new_listing_div);

hr = document.createElement("hr");
document.getElementById("body_div").appendChild(hr);

lines_pre = document.querySelector("pre").innerHTML.split("\n");
lines_text_pre = document.querySelector("pre").innerText.split("\n");
var on_folders = true;
var to_add = document.createElement("h3");
to_add.innerHTML = "<u class='normal_text4'>Folders</u>"
document.getElementById("new_listing").appendChild(to_add);
for (var i = 1; i < lines_pre.length; i++) {
	line = lines_pre[i];
	if (line.includes("href")) {
		if (on_folders) {
			to_add = createElement4({
				folder: on_folders, line: lines_text_pre[i],
				link: line.split("href=\"")[1].split("\"")[0]
			}, "element4 folder4");
			document.getElementById("new_listing").appendChild(to_add);
		} else {
			to_add = createElement4({
				folder: on_folders,
				line: lines_text_pre[i],
				link: line.split("href=\"")[1].split("\"")[0]
			}, "element4");
			document.getElementById("new_listing").appendChild(to_add);
		}
	} else if (line.includes("Files:")) {
		on_folders = false;

		var to_add = document.createElement("h3");
		to_add.innerHTML = "<u class='normal_text4'>Files</u>"
		document.getElementById("new_listing").appendChild(to_add);
	}
}

function createElement4(element, cls) {
	var a = document.createElement('a');
	a.href = element.link;
	var div = document.createElement('div');
	a.appendChild(div);
	a.className = cls;

	var filename = decodeURIComponent(element.link).replace("/", "");

	// Add mousehouver text with the full filename
	a.title = filename;

	var description = "";

	var img_src = "/theme/icons/";
	if (element.folder) {
		img_src += "folder-1484.png";
		description = "Files folder";
	} else {
		a.target = "_blank"; // To open files always in a new tab
		var link = element.link.toLowerCase();
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
			description = "Adobe Acrobat document";
		} else if (link.endsWith(".doc") || link.endsWith(".docx") || link.endsWith(".rtf")) {
			img_src += "word-67-512.png";
			description = "Word document";
		} else if (link.endsWith(".ppt") || link.endsWith(".pptx") || link.endsWith(".pps") || link.endsWith(".ppsx")) {
			img_src += "ppt-46-512.png";
			description = "PowerPoint presentation";
		} else if (link.endsWith(".xls") || link.endsWith(".xlsx")) {
			img_src += "excel-512.png";
			description = "Excel spreadsheet";
		} else if (link.endsWith(".exe")) {
			img_src += "EXE-icon.png";
			description = "Windows executable";
		} else {
			img_src += "empty-paper-black-outline-19837.png";
			// Ext after the last dot after the last space on the file name
			link_spaces = filename.split(" ");
			link_last_space = link_spaces[link_spaces.length - 1]
			link_last_space_dots = link_last_space.split(".");
			if (link_last_space_dots.length > 1) {
				description = link_last_space_dots[link_last_space_dots.length - 1] + " file";
			} else {
				description = "File";
			}
		}
	}

	var img = document.createElement('img');
	img.className = "prevent_select";
	img.src = img_src;
	div.appendChild(img);

	var filename_final = filename;
	var max_len = 50;
	if (filename_final.length > max_len) {
		filename_final = filename_final.substring(0, max_len) + "...";
	}
	div.innerHTML += "<p>" + strToHtml(filename_final) + "</p>";

	var date_index = element.line.search(/\b\d{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2}\b/);
	var tmp = element.line.substring(date_index + 19, element.line.length).split(" ");
	var mod_date = element.line.substring(date_index, date_index + 17);
	var size = tmp[tmp.length-2] + " " + tmp[tmp.length-1];


	a.dataMine = decodeURIComponent(element.link).replace("/", "") + " ||| " +
				element.line.substring(date_index, date_index + 17) + " ||| " +
				tmp[tmp.length-2] + " " + tmp[tmp.length-1];

	if (cls == "element4") {
		div.innerHTML += "<p class='prevent_select' style='color: gray;'>" +
				mod_date + " &nbsp;&nbsp;&nbsp; " + size + "</p>";
		div.innerHTML += "<p class='prevent_select' style='color: gray;'>" + description + "</p>";
	}

	div.addEventListener("mouseover", function(mouseEvent) {
		if (element.folder || !element.link.toLowerCase().endsWith(".mp4")) {
			more_info.style.display = 'none';

			return
		}

		more_info.style.display = 'inline-block';
		more_info.style.top = mouseEvent.pageY + 15 + 'px';
		more_info.style.left = mouseEvent.pageX + 15 + 'px';

		more_info.innerHTML = "<a target=\"_blank\" href=\"" + element.link + "?preview=1\">Preview video</a>";
	});

	return a;
}

// Remove the UI v1 design so that only this one is shown
document.querySelector("#listing").innerHTML = "";

// Enable the search bar
document.getElementById("search").style.display = "inline-block";

// Enable the order by dropdown
document.getElementById("order_by").style.display = "inline-block";

// Enable the downloadAll button
document.getElementById("downloadAll").style.display = "inline-block";
