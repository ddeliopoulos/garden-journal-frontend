<script lang="ts" >
import {ref} from "vue";

export default {
  name: "SearchBar.vue",
  setup(){
    const searchText = ref("");

    return {}
  }
}
</script>

<template>
  <form class="search" action="">
    <input type="search" placeholder="Search here..." required>
    <button type="submit">Search</button>
  </form>
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

// SEARCH BEGINS
   .search {
     width: 500px;
     height: 40px;
     margin: 150px auto;
     background: #444;
     background: rgba(0,0,0,.2);
     border-radius:  3px;
     border: 1px solid #fff;

input {
  width: 370px;
  padding: 10px 5px;
  float: left;
  color: #ccc;
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