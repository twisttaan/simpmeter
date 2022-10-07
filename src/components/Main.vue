<script setup lang="ts">
import { ref } from 'vue';
import { parseWatchHistory, SimpMeterResult } from '../scripts/history';
import ResultsView from './app/ResultsView.vue';
import UploadView from './app/UploadView.vue';

let results = ref<SimpMeterResult[] | null>(null);

function onUpload(event: Event, app: any) {
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
		results.value = parseWatchHistory(json);
	};
	reader.readAsText(file);
}
</script>

<template>
	<section class="flex flex-col items-center justify-center min-h-screen">
		<div class="flex flex-col items-center justify-center w-1/2 h-1/2 rounded-lg">
			<div class="flex flex-col items-center justify-center w-full h-1/2">
				<h2 class="my-8 text-3xl font-bold text-white">Simp-O-Meter</h2>
			</div>
			<div class="flex flex-col items-center justify-center w-full h-1/2">
				<ResultsView v-if="results" :results="results" />
				<UploadView v-else :onUpload="onUpload" />
			</div>
		</div>
	</section>
</template>
