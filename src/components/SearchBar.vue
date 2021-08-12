<script lang="ts" >
export default {
  name: "SearchBar.vue",
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
                  @change="onChange()"
                  @keyup="onChange()"
                  v-model="searchText"
                  class="form-control navbar-search-input js-navbar-search-input nav-input js-filter-topics"
                  type="text"
                  placeholder="Search your garden..."
              />
            </div>
            <button class="submit-search"><h3>Search</h3></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.submit-search, .navbarSearch{
  display: inline-block !important;
  padding: 5px;
  margin-left: 15px;
}

.search-holder {
  margin-top: 10px;
  margin-right: 300px;
}

.form-control {
  width: 100%;
  height: 30px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
}

.navbar-search-input {
  z-index: 1 !important;
  height: 45px;
  font-size: 18px;
  padding: 6px 18px 7px 45px;
  background-color: #ffffff !important;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.11);
  border-color: #eeeeee;
}

</style>