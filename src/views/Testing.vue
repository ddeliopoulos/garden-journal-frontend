<template>
  vxsvv
  <b/>TESTING PAGE
  <div class="main-container">
  <GoogleLoginButton></GoogleLoginButton>
    <div id="test" :style="bla">genius</div>

  </div>
</template>

<script lang="ts">

import GoogleLoginButton from '@/components/wrapped/GoogleLoginButton.vue';



export default {
  name: "Testing",
  components: {GoogleLoginButton},
  setup() {
    const bla = 'color: red';
    return {bla};
  }
}
</script>

<style scoped>

.box-container{
  position: relative;
  top: 10em;
}

.footer{
  position: relative;
  top: 11em;
}

</style>