<template>
  <div class="audio-recording">
    <button :disabled="disableBtn" class="btn-start" @click="startRecording">Start</button>
    <button class="btn-stop" @click="stopRecording">Stop</button>
    <div v-if="audioTitle.length !== 0" class="title">
      Audio: {{audioTitle}}
    </div>
    <div id="myModal" ref="myModal" class="modal">

      <!-- Modal content -->
      <div v-if="modal" class="modal-content" >
        <span v-if="!closeTitleBox" @click="closeTitleBox" class="close">&times;</span>
        <p>Name audio: </p>
        <input type="text"
               v-model="audioTitle">
        <br/>
        <button  @click="onSubmitTitle" > submit </button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";

declare var MediaRecorder: any;

export default {
  name: "AudioRecording",
  emits:['updateTitle','updateCustomAudio'],

  setup(props: any, context : any) {
    let mediaRecorder: any;
    let recordingData: any;
    const modal = ref(false)
    const closeTitleBox = ref(false)
    const audioTitle = ref<any>("")
    const disableBtn = ref(false)



    function onSubmitTitle (){
      disableBtn.value = true;
      context.emit('updateTitle', audioTitle.value)
      modal.value = false;
    }

    const startRecording = async () => {
      console.log("started recording.")
      let stream: any;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })

      } else throw new Error("audio not supported")

      mediaRecorder = new MediaRecorder(stream);
      recordingData = null;

      mediaRecorder.ondataavailable = async (e: any) => {
        recordingData = await e.data.text();
        context.emit('updateCustomAudio', recordingData)
        modal.value = true;
        console.log("data is available for you bitch", recordingData.length)

      }

      mediaRecorder.onstop = () => {
        console.log("stopped.")
        stream.getTracks() // get all tracks from the MediaStream
            .forEach((track: any) => track.stop());
      }
      mediaRecorder.start()
    }


    const stopRecording = async () => {
      console.log("stopping recording...")
      mediaRecorder.stop();
    }

    console.log('starting component dooty');

    return {closeTitleBox, modal, audioTitle,disableBtn,onSubmitTitle,startRecording, stopRecording}
  }
}
</script>

<style scoped>

.modal {
  display: inline-block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 45%;
  top: 15%;
/* Full height */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  display: inline-block;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 100%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn-start {
  z-index: 9999999;
  position: relative;
  margin: 10px;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 7px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  bottom: 20px;
  cursor: pointer;
}

.btn-stop {
  z-index: 9999999;
  position: relative;
  margin: 10px;
  background-color: #f44336; /* Green */
  border: none;
  color: white;
  padding: 7px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  bottom: 20px;
  cursor: pointer;
}


</style>