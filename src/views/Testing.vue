<template>
 TESTING PAGE
  <div class="bla">


  <SearchBar></SearchBar>
  </div>
</template>

<script lang="ts">

import SearchBar from '@/components/SearchBar.vue'



export default {
  name: "Testing",
  components: {SearchBar},
  setup() {
    const bla = 'color: red';
    return {bla};
  }
}
</script>

<style scoped>

.bla{
  position: relative;
  bottom: 220px;
}
</style>