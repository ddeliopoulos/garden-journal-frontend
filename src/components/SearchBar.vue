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
  <div class="search-holder">
    <div class="search-holder__banner">
      <div class="col-xs-12 text-center hero-header-container">
        <div class="search-bar">
          <div class="form-holder">
            <div class="navbarSearch">
              <input
                  class="form-control navbar-search-input js-navbar-search-input nav-input js-filter-topics"
                  type="text"
                  placeholder="Search your garden..."
              />
            </div>
            <button class="submit-search"><h3></h3>
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.submit-search{
  position: relative;
  bottom: 45px;
  left: 215px;
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 6px 12px;
  background-image: linear-gradient(to right, #bdc3c7, #2c3e50);
  border-radius: 8px;
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}

.navbar-search-input {
  height: 35px;
  width: 350px;
  font-size: 18px;
  padding: 6px 18px 7px 45px;
  background-color: #ffffff !important;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.11);
  border-color: #eeeeee;
  position: relative;
  bottom: 10px;
  right: 140px;
}

</style>