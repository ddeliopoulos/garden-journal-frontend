<script>
const clientId = "826903811377-7vc3unief3g7bbn341cr06kbfvbb49no.apps.googleusercontent.com";
const scopes = 'profile';


export default {
  name: "GapiPls",
  setup() {
    (async () => {
      await new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: "",
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            clientId: clientId,
            scope: scopes
          }).then(resolve)
              .catch(reject);
        });
      });

      const amISignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      console.log(amISignedIn ? 'i am signed in': "pls log me in");
    })();

    const plsLogin = () => {
      gapi.auth2.getAuthInstance().signIn();
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
      }
    };
    return {plsLogin};
  }
}
</script>

<template>
  <button id="bla" @click="plsLogin">log me in pls</button>
</template>

<style scoped>
#bla {
  position: relative;
  top: 10em;
}
</style>