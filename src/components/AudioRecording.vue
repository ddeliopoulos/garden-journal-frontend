<template>
  <button class="btn" @click="startRecording">start</button>
  <button class="btn" @click="stopRecording">stop</button>
</template>

<script lang="ts">
declare var MediaRecorder: any;

export default {
  name: "AudioRecording",

  setup() {
    let isPaused = false;
    let mediaRecorder: any;
    let recordingData: any;

    const startRecording = async () => {
      console.log("started recording")
      let stream: any;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
      } else throw new Error("audio not supported")

      mediaRecorder = new MediaRecorder(stream);
      recordingData = null;

      mediaRecorder.ondataavailable =async (e: any) => {
        recordingData = await e.data.text();
        console.log("recording stopped", recordingData.length)
      }

      mediaRecorder.onstop = () => {
        console.log("recording stopped")
        stream.getTracks() // get all tracks from the MediaStream
            .forEach( (track:any) => track.stop() );
      }


      mediaRecorder.start();

    }
    const stopRecording = async () => {
      console.log("stopped recording")
      mediaRecorder.stop();
    }
    console.log('booooor');
    return {startRecording, stopRecording}


  }
}
</script>

<style scoped>

.btn {
  z-index: 9999999;
  position: relative;
  margin: 15px;
  top: 100px;
  left: 50;
}

</style>