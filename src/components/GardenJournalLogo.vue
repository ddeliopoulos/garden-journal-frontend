<script lang="ts">
export default {
  name: "GardenJournalLogo"
}
</script>

<template>
  <div class="logo-container">
    <h1>GARDEN<span>JOURNAL</span></h1>
    <div class="image-cropper">
      <img src="/img-logo.png" alt="logo-img" height="70" width="50"/>
    </div>
  </div>
</template>

<style scoped>

.logo-container {
  float: left;
  position: relative;
  top: 10px;
  right: 50px;
}

.image-cropper {
  width: 25px;
  height: 25px;
  position: relative;
  margin: auto;
  left: 155px;
  bottom: 48px;

}

.logo-container h3 {
  color: black;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 200;
}

.logo-container h3 span {
  font-weight: 800;
}

</style>