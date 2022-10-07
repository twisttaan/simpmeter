import { isAfter, parseISO, sub } from 'date-fns';

export interface SimpChannel {
	name: string;
	viewCount: number;
}

export interface SimpMeterResult {
	scope: string;
	channels: SimpChannel[];
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

// TODO: Rewrite this mess
export function parseWatchHistory(videos: any): SimpMeterResult[] {
	const lastMonth = [];
	const lastYear = [];
	const allTime = [];

	for (const video of videos) {
		if ('subtitles' in video) {
			const time = parseISO(video.time);
			const channel = video.subtitles[0].name;
			if (isAfter(time, sub(parseISO(videos[0].time), { months: 1 }))) {
				lastMonth.push(channel);
			}
			if (isAfter(time, sub(parseISO(videos[0].time), { years: 1 }))) {
				lastYear.push(channel);
			}
			allTime.push(channel);
		}
	}

	const lastMonthData = lastMonth.reduce((a, b) => ((a[b] = (a[b] || 0) + 1), a), {});
	const lastYearData = lastYear.reduce((a, b) => ((a[b] = (a[b] || 0) + 1), a), {});
	const allTimeData = allTime.reduce((a, b) => ((a[b] = (a[b] || 0) + 1), a), {});

	console.table(lastMonthData);
	console.table(lastYearData);
	console.table(allTimeData);

	return [
		{
			scope: 'Top 15 most watched channels in the past month:',
			channels: Object.entries(lastMonthData)
				.map(([name, viewCount]) => ({ name, viewCount }))
				// @ts-ignore
				.sort((a, b) => b.viewCount - a.viewCount)
				.slice(0, 15) as SimpChannel[],
		},
		{
			scope: 'Top 15 most watched channels in the past year:',
			channels: Object.entries(lastYearData)
				.map(([name, viewCount]) => ({ name, viewCount }))
				// @ts-ignore
				.sort((a, b) => b.viewCount - a.viewCount)
				.slice(0, 15) as SimpChannel[],
		},
		{
			scope: 'Top 15 most watched channels of all time:',
			channels: Object.entries(allTimeData)
				.map(([name, viewCount]) => ({ name, viewCount }))
				// @ts-ignore
				.sort((a, b) => b.viewCount - a.viewCount)
				.slice(0, 15) as SimpChannel[],
		},
	];
}
