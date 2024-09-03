// Page enhancements for UI v1 (UI v1+)

//crash_script;
if (getCookie("ui_version") == "v1") { // This code needs to load always, except if UI v1 is to be used
	crash_script;
}

var pathElement = document.querySelector('#listing h1');
pathElement.className = 'listing';

var pathName = pathElement.innerHTML;
pathName = pathName.replace('Index of ', 'Start');
if (pathName.endsWith('/')) {
	pathName = pathName.slice(0, -1);
}
pathName = pathName.replaceAll("/", " |>| ");
pathElement.innerHTML = pathName;

var fileCount = 0,
	dirCount = 0,
	dirStatElem = document.getElementById('dir-stats'),
	fileStatElem = document.getElementById('file-stats');

var num_files = 0;
var page = document.documentElement.innerHTML.split("\n");
for (const line of page) {
	if (line.startsWith("<a") && !line.endsWith("-")) {
		num_files++;
	}
}

var allLinks = document.getElementsByTagName('a');
var len_allLinks = allLinks.length;
dirs_ended = false;
for (let item of allLinks) {
	// Add mousehover text
	var href = decodeURIComponent(item.href);
	if (href.endsWith('/')) {
		href = href.slice(0, -1);
	}
	var href_split = href.split('/');
	item.title = href_split[href_split.length-1];

	if (item.innerHTML != "../") {
		if (len_allLinks <= num_files) {
			dirs_ended = true;
		}
		if (!dirs_ended){
			dirCount += 1;
			item.className = "link-folder";
		} else {
			link = item.href.toLowerCase();
			fileCount += 1;
			if (link.endsWith('.mp4') || link.endsWith('.avi') || link.endsWith('.mkv') ||
					link.endsWith('.mov') || link.endsWith('.wmv') || link.endsWith('.flv') ||
					link.endsWith('.webm')) {
				item.className = "link-video";
			} else if (link.endsWith('.zip')) {
				item.className = "link-zip";
			} else if (link.endsWith('.png') || link.endsWith('.jpg') || link.endsWith('.jpeg') ||
					link.endsWith('.webp') || link.endsWith(".gif")) {
				item.className = "link-image";
			} else if (link.endsWith('.mp3') || link.endsWith('.wav') ||
					link.endsWith('.aac') || link.endsWith('.ogg') || link.endsWith('.m4a')) {
				item.className = "link-audio";
			} else if (link.endsWith('.txt') || link.endsWith('.log')) {
				item.className = "link-text";
			} else if (link.endsWith('.pdf')) {
				item.className = "link-pdf";
			} else if (link.endsWith('.doc') || link.endsWith('.docx') || link.endsWith('.rtf')) {
				item.className = "link-doc";
			} else if (link.endsWith(".ppt") || link.endsWith(".pptx") || link.endsWith(".pps") || link.endsWith(".ppsx")) {
				item.className = "link-ppt";
			} else if (link.endsWith(".xls") || link.endsWith(".xlsx")) {
				item.className = "link-xls";
			} else if (link.endsWith(".exe")) {
				item.className = "link-exe";
			} else {
				item.className = "link-file";
			}
		}
	}
	len_allLinks--;
}

var parentFolderElement = document.querySelector("a[href='../']");
parentFolderElement.className = "folderup";
parentFolderElement.innerHTML = "&#8682; Back";

if (dirCount == 1) {
	dirStatElem.innerHTML = dirCount + " folder";
} else {
	dirStatElem.innerHTML = dirCount + " folders";
}

if (fileCount == 1) {
	fileStatElem.innerHTML = fileCount + " file";
} else {
	fileStatElem.innerHTML = fileCount + " files";
}



lines_pre = document.querySelector("pre").innerHTML.split("\n");
lines_pre[0] += " | <a class='folderup' href='/'>&#8857; Start</a>";
lines_pre.splice(1, 0, "<strong>                        Name                        Date of modification  Size</strong>");
lines_pre.splice(2, 0, "<u>Folders:</u>"); // Place "Folders:" just above the first folder on the list
j = 0;
var on_files = true;
for (let i = lines_pre.length; i >= 1; i--) { // Exclude the Up link line
		if (j - 2 == num_files) { // Why -2? Because it worked xD
			on_files = false;
		}

		// Place "Files:" just above the first file on the list
		if (j == num_files) {
			lines_pre.splice(i - 1, 0, "");
			lines_pre.splice(i, 0, "<u>Files:</u>");
			i += 2;
		}

		// Add "iB" to the size and a space before the size letter in case there's one (example, 1.2M -> 1.2 MiB)
		if (on_files && lines_pre[i]) { // The 2nd check is to check if the line is not undefined
			var line_2 = lines_pre[i];
			var last_char = line_2[line_2.length-1];
			if (!(last_char >= '0' && last_char <= '9')) {
				lines_pre[i] = lines_pre[i].substr(0, line_2.length-1) + " " + last_char + "iB";
			} else {
				lines_pre[i] = lines_pre[i] + " B";
			}
		}

		// Add target="_blank" to the file links to open them in a new tab
		if (on_files && lines_pre[i]) {
			lines_pre[i] = lines_pre[i].replace("<a ", "<a target=\"_blank\" ");
		}

		// Remove the forward bars from the folders names
		if (lines_pre[i] && lines_pre[i].includes("/</a>")) {
			lines_pre[i] = lines_pre[i].replace("/</a>", " </a>");
		}

		// Underline the whole line
		if (lines_pre[i] && lines_pre[i].includes("</a>")) {
			lines_pre[i] = lines_pre[i].replace("</a>", "");
			lines_pre[i] += "</a>";
		}

		// Fixes spacing of lines with non-ASCII characters
		if (lines_pre[i]) {
			var a_text = lines_pre[i].split(">")[1].split("<")[0];
			num_chars = a_text.length;
			num_bytes = (new TextEncoder().encode(a_text)).length;
			num_spaces_add = num_bytes - num_chars;

			date_index = lines_pre[i].search(/\b\d{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2}\b/);
			new_line = lines_pre[i].substring(0, date_index);
			for (let k = 0; k < num_spaces_add; k++) {
				new_line += " ";
			}
			new_line += lines_pre[i].substring(date_index);
			lines_pre[i] = new_line;
		}

		j++;
}
document.querySelector("pre").innerHTML = lines_pre.join("\n");
