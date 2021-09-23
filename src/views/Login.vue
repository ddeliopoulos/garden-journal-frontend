<script lang="ts">
import GoogleLoginButton from "@/components/wrapped/GoogleLoginButton.vue";
import GardenJournalLogo from "@/components/GardenJournalLogo.vue";

export default {
  name: "Login",
  components: {GardenJournalLogo, GoogleLoginButton},
  setup() {

  }
}
</script>

<template>
  <div class="background">
    <div class="overlay">
      <form>
        <div class="con">
          <header class="head-form">
            <GardenJournalLogo class="gj-logo"/>
            <br/>
            <p class="welcome">Welcome to your Garden Journal</p>
          </header>
          <br>
          <div class="field-set">
            <span class="input-item">
           <i class="fa fa-user-circle"></i>
         </span>
            <input class="form-input" id="txt-input" type="text" placeholder="Email Address" required>

            <br>
            <span class="input-item">
        <i class="fa fa-key"></i>
       </span>
            <input class="form-input" type="password" placeholder="Password" id="pwd" name="password" required>
            <span>
        <i class="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>

     </span>
            <br>
            <button class="log-in"> Log In</button>
          </div>
          <div class="other">
            <button class="btn submits frgt-pass">Forgot Password</button>
            <button class="btn submits sign-up">Sign Up
              <i class="fa fa-user-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <GoogleLoginButton/>
      </form>
    </div>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Abel|Abril+Fatface|Alegreya|Arima+Madurai|Dancing+Script|Dosis|Merriweather|Oleo+Script|Overlock|PT+Serif|Pacifico|Playball|Playfair+Display|Share|Unica+One|Vibur');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* End Global rules */

.background {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  background: linear-gradient(to top, #a8edea 0%, #fed6e3 100%) no-repeat fixed;
}

body {
  position: fixed;
  background: linear-gradient(to top, #a8edea 0%, #fed6e3 100%) no-repeat fixed;
  /*   the main font */
  font-family: 'Abel', sans-serif;
  opacity: .95;

}

.gj-logo {
  position: relative;
  left: 0;
  color: black;
}

.welcome {
  position: relative;
  top: 1.5em;
}

.overlay {
  position: fixed;
  top: 10em;
  left: 47em;
  z-index: 1000;
}

form {
  width: 450px;
  min-height: 500px;
  height: auto;
  border-radius: 5px;
  margin: 2% auto;
  box-shadow: 0 9px 50px hsla(20, 67%, 75%, 0.31);
  padding: 2%;
  background-image: linear-gradient(-225deg, #E3FDF5 50%, #FFE6FA 50%);
}

form .con {
  display: -webkit-flex;
  display: flex;

  -webkit-justify-content: space-around;
  justify-content: space-around;

  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;

  margin: 0 auto;
}

header {
  margin: 2% auto 10% auto;
  text-align: center;
}

header h2 {
  font-size: 250%;
  font-family: 'Playfair Display', serif;
  color: #3e403f;
}

header p {
  letter-spacing: 0.05em;
}

.input-item {
  background: #fff;
  color: #333;
  padding: 14.5px 0px 15px 9px;
  border-radius: 5px 0px 0px 5px;
}

#eye {
  background: #fff;
  color: #333;

  margin: 5.9px 0 0 0;
  margin-left: -20px;
  padding: 15px 9px 19px 0px;
  border-radius: 0px 5px 5px 0px;

  float: right;
  position: relative;
  right: 1%;
  top: -.2%;
  z-index: 5;

  cursor: pointer;
}

input[class="form-input"] {
  width: 240px;
  height: 50px;

  margin-top: 2%;
  padding: 15px;

  font-size: 16px;
  font-family: 'Abel', sans-serif;
  color: #5E6472;

  outline: none;
  border: none;

  border-radius: 0px 5px 5px 0px;
  transition: 0.2s linear;

}

input[id="txt-input"] {
  width: 250px;
}

input:focus {
  transform: translateX(-2px);
  border-radius: 5px;
}

button {
  display: inline-block;
  color: #252537;

  width: 280px;
  height: 50px;

  padding: 0 20px;
  background: #fff;
  border-radius: 5px;

  outline: none;
  border: none;

  cursor: pointer;
  text-align: center;
  transition: all 0.2s linear;

  margin: 7% auto;
  letter-spacing: 0.05em;
}

.submits {
  width: 48%;
  display: inline-block;
  float: left;
  margin-left: 2%;
}

.frgt-pass {
  background: transparent;
}

.sign-up {
  background: #B8F2E6;
}

button:hover {
  transform: translatey(3px);
  box-shadow: none;
}

button:hover {
  animation: ani9 0.4s ease-in-out infinite alternate;
}

@keyframes ani9 {
  0% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(5px);
  }
}

</style>