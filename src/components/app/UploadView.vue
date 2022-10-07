<script setup lang="ts">
import { getGlobalThis } from '@vue/shared';
import { toggleButton } from '../../scripts/history';
let app = getGlobalThis();

const { onUpload } = defineProps<{
	onUpload: (event: Event, app: any) => void;
}>();
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<p class="text-xl text-white">Upload your watch-history.json file to see your watch history.</p>
		<input id="file" type="file" accept=".json" @change="toggleButton($event, app)" />
		<button id="analyze" class="btn my-8" @click="onUpload($event, app)">Analyze!</button>
	</div>
</template>
