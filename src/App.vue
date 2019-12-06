<template>
	<div id="app">
		<header>
			<sidebar/>
		</header>
		<div class="container">
			<router-view/>
		</div>
	</div>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  name: 'App',

  components: {
    Sidebar
  }
};
</script>
