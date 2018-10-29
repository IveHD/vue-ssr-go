<template>
	<div id="app">
		<Navi v-show="isShow"/>
		<transition name="fade" mode="out-in">
			<router-view class="view"></router-view>
		</transition>
	</div>
</template>

<script>
	import Navi from '@component/nav';
	export default {
		components: {
			Navi
		},
		computed: {
			isShow() {
				return false;
			}
		}
	}
</script>