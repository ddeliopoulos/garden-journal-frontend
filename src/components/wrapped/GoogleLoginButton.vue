
<script>
const router = require("@/router");

export default {
  name: "GoogleLoginButton",
  setup() {

    return {loginWithGoogle: this.$gapi.login};
  }
}
</script>

<template>
  <button id="google-login" @click="loginWithGoogle">
    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="img"/>
    <p class="btn-text"><b>Sign in with google</b></p>
  </button>
</template>

<style lang="scss" scoped>

@import url(https://fonts.googleapis.com/css?family=Roboto:500);


$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669F2;

.google-btn {
  width: 184px;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .25);
  cursor: pointer;

  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }

  .google-icon {
    position: relative;
    margin-top: 11px;
    width: 18px;
    height: 18px;
  }

  .btn-text {
    float: right;
    margin: 11px 11px 0 0;
    color: $white;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: "Roboto", serif;
  }

  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }

  &:active {
    background: $button-active-blue;
  }
}
</style>