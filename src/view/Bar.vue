<template>
	<div>{{ msg }}</div>
</template>

<script>
import webApi from '../webApi/index.js';
// import {superagent} from 'superagent';
export default {
	created() {
		webApi.get('/api/mock?a=asd').then(res => {
			console.log(res);
			window.ress = res;
		})
	},
	data() {
		return {
			msg: 'asd'
		}
	}
}
</script>