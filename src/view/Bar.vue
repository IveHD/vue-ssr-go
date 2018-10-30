<template>
	<div>{{ msg }}</div>
</template>

<script>
import webApi from '../webApi/index.js';

export default {
	created() {
		webApi.get('/api/mock?a=asd').then(res => {
			console.log(res);
			this.msg = res.data;
		})
	},
	data() {
		return {
			msg: 'asd'
		}
	}
}
</script>