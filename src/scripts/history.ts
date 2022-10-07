import { parseISO, isAfter, sub } from 'date-fns';

export function handleFileUpload(event: Event, app: any) {
	console.log('handleFileUpload');
	const file: File = app.file;
	if (!file) return;

	// validate that file is a .json file
	if (file.type !== 'application/json') {
		alert('Please upload a .json file.');
		return;
	}

	// print json file to console
	const reader = new FileReader();
	reader.onload = (event: any) => {
		const json = JSON.parse(event.target.result);
		parseWatchHistory(json);
	};
	reader.readAsText(file);
}

export function toggleButton(event: Event, app: any) {
	const fileSelected = (event.target as HTMLInputElement).files?.length;
	const button = document.getElementById('analyze') as HTMLButtonElement;
	if (fileSelected) {
		// save file to state
		app.file = (event.target as HTMLInputElement).files?.[0];
		button.disabled = false;
	} else {
		button.disabled = true;
	}
}

function parseWatchHistory(videos: any) {
	// parse json
	let last_month = [];
	for (let video of videos) {
		if ('subtitles' in video && isAfter(parseISO(video.time), sub(parseISO(videos[0].time), { months: 1 }))) {
			last_month.push(video.subtitles[0].name);
		}
	}

	let data = last_month.reduce((a, b) => ((a[b] = (a[b] || 0) + 1), a), {});
	data = Object.entries(data)
		.sort((a, b) => (b[1] as any) - (a[1] as any))
		.slice(0, 15);
	alert(
		`Top 15 most watched channels in the past month:\n${data.map((d: any) => d.join(' - ')).join(' Videos\n')} Videos`,
	);
}
