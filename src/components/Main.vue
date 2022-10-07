<script setup lang="ts">
import { getGlobalThis } from '@vue/shared';
import { handleFileUpload, toggleButton } from '../scripts/history';
let app = getGlobalThis();
</script>

<template>
	<div class="card">
		<div class="card-body">
			<div class="card-title">
				<h2>Simp-O-Meter</h2>
			</div>
			<div class="card-text">
				<p>Upload your watch-history.json file to see your watch history.</p>
				<input id="file" type="file" accept=".json" @change="toggleButton($event, app)" />
				<button id="analyze" @click="handleFileUpload($event, app)">Analyze!</button>
			</div>
		</div>
	</div>
</template>
