<script lang="ts" >
import {ref} from "vue";

export default {
  name: "SearchBar.vue",
  emits: {emitSearchTextRef},
  setup(){
    const searchText = ref("");

    

    return {searchText}
  }
}
</script>

<template>
  <div class="search-bar">
  <form class="search" action="">
    <input id="searchText" type="search" placeholder="Search here..." required>
    <button type="submit" id="search">Search</button>
  </form>
  </div>
  <!--  <div class="navbarSearch">-->
<!--    <input class="form-control navbar-search-input js-navbar-search-input nav-input js-filter-topics"-->
<!--           type="text"-->
<!--           placeholder="Search your garden..."/>-->
<!--  </div>-->
<!--    <button class="submit-search"><h3></h3>-->
<!--      <i class="fa fa-search"></i>-->
<!--    </button>-->
</template>

<style lang="scss" scoped>

body {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/41294/hero.jpg) no-repeat center center fixed;
  background-size: cover;
}

.search-bar{
  display: inline-block;
  margin: 10px;
  height: 60px;
  width: 520px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  position: relative;
  bottom: 50px;

}
#search{
  color: black;
}
// SEARCH BEGINS
   .search {
     width: 500px;
     height: 40px;
     background: #E2E8F0;
     background: rgba(0,0,0,.07);
     border-radius:  3px;
     border: 1px solid #fff;

input {
  width: 370px;
  padding: 10px 5px;
  float: left;
  color: black;
  border: 0;
  background: transparent;
  border-radius: 3px 0 0 3px;
&:focus {
   outline: 0;
   background:transparent;
 }
}

button {
  position: relative;
  float: right;
  border: 0;
  padding: 0;
  cursor: pointer;
  height: 40px;
  width: 120px;
  color: #fff;
  background: transparent;
  border-left: 1px solid #fff;
  border-radius: 0 3px 3px 0;
&:hover {
   background: #fff;
   color:#444;
 }
&:active {
   box-shadow: 0px 0px 12px 0px rgba(225, 225, 225, 1);
 }
&:focus {
   outline: 0;
 }
}
}

</style>