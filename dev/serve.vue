<script>
import Vue from 'vue';
import RemVisitStatusTest from '@/rem-visit-status-test.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    RemVisitStatusTest
  }
});
</script>

<template>
  <div id="app">
    <rem-visit-status-test />
  </div>
</template>
