<script setup lang="ts">
import { SimpMeterResult } from '../../scripts/history';

const { results } = defineProps<{
	results: SimpMeterResult[];
}>();
</script>

<template>
	<div class="my-8" v-for="result in results" :key="result.scope">
		<h2 class="text-2xl font-bold text-white pb-5">{{ result.scope }}</h2>
		<table class="table w-full">
			<thead>
				<tr>
					<th class="text-left">Channel</th>
					<th class="text-left">View Count</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="channel in result.channels" :key="channel.name">
					<td>{{ channel.name }}</td>
					<td>{{ channel.viewCount }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
