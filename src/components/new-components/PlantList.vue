<script lang="ts">

export default {

  setup(props:{a:string}){


    const bla = () => {
      props.a
    };

    return {bla};
  }
}
</script>

<template>
  dfgdfg
  <table class="single-plant-container" :key="plant.id" v-for="plant in plants">
    {{plant.name}}
  </table>
</template>

<style scoped>

</style>