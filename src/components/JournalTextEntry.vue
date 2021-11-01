<script lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import {getBackendUrl} from "@/components/shared/backendUrl";

interface textEntry {
  createdAt: string
  data: string
  type: string
  mediaId: string;
}
interface JournalEntries {
  id: string
}
interface PlantType {
  plantId: string
}

export default {
  name: "JournalTextEntry",
  emits: ["closeTextComponent", "showTextComponent"],

  setup(props: any, context: any) {
    const route = useRoute()
    const id = parseInt(route.params.id as string);

    const textEntry = ref<textEntry>({
      createdAt: "",
      data: "",
      type: "text/plain",
      mediaId: ""
    })

    const journalId = ref<JournalEntries>({
      id: "",
    })

    const plantId = ref<PlantType>({
      plantId: "",
    })

    const emitClose = async () => {
      context.emit("closeTextComponent")
    }

    const emitShowTextIcon = async () => {
      context.emit("showTextComponent")
    }

    const postTextJournal = async () => {
      console.log("Attempting to postTJ")

      const dataUploadResponse = await fetch(`${getBackendUrl()}/media?contentType=${textEntry.value.type}`, {
        method: 'POST',
        body: textEntry.value.data,
      });
      console.log(textEntry.value.data)
      textEntry.value.mediaId = await (dataUploadResponse.text());
      console.log(textEntry.value.mediaId)

      await fetch(`${getBackendUrl()}/plants/${id}/journal-entries`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: journalId.value.id,
          plantId: id,
          createdAt: Date.now(),
          type: textEntry.value.type,
          mediaId: textEntry.value.mediaId
        }),
      })

      console.log("Text Successfully Posted!")

    }


    return {
      plantId,
      textEntry,
      emitShowTextIcon,
      postTextJournal,
      emitClose,
    }
  }
}
</script>

    <template>
      <div class="text-component-container">
        <div class="close-image" @click=emitClose>
          <button @click="emitShowTextIcon" class="icon-close-btn">
            <i class="far fa-window-close"></i>
          </button>
        </div>
        <h3>Write Entry</h3>
        <div class="form-group shadow-textarea">
          <p id="three">
            <textarea v-model='textEntry.data' name="styled-textarea" id="styled" rows="3" placeholder="Write something here..."></textarea>
          </p>
        </div>
      </div>
    </template>


<style scoped >
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');

h3{
  text-align: center;
  position: relative;
  top: -1rem;
  margin: 13px;
}

.text-component-container {
  width: 100%;
  margin-top: 5%;
  text-align: center;
  background: hsla(213, 24%, 93%,1);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  display: inline-block;
  padding: 1em;
  line-height: 1.5em;
  border: dotted 5px hsla(0, 95%, 35%, 1);
}

.fa-window-close {
  color: #CC2E5D;
  font-size: 22px;
  float: right;
  cursor: pointer;
}

button.icon-close-btn {
  border: none;
  background-size: auto;
  background-color: white;
  box-shadow: none;
  float: right;
  position: relative;
  bottom: 13px;
  left: 6px;
}

textarea#styled {
  font-size: 19px;
  font-family: 'Gochi Hand', cursive;
  width: 500px;
  height: 215px;
  border: 3px solid #cccccc;
  padding: 15px;
  background-position: bottom right;
  background-repeat: no-repeat;
  resize: vertical;
  max-height: 350px;
  min-height: 215px;
}

</style>