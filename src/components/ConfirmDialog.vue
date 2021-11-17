<template>
  <div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <div class="card">
      <h5>Basic</h5>
      <Button @click="confirm1()" icon="pi pi-check" label="Confirm" class="p-mr-2"></Button>
      <Button @click="confirm2()" icon="pi pi-times" label="Delete"></Button>
      </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const confirm = useConfirm();
    const toast = useToast();

    const confirm1 = () => {
      confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
        },
        reject: () => {
          toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
      });
    }

    const confirm2 = () => {
      confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
          toast.add({severity:'info', summary:'Confirmed', detail:'Record deleted', life: 3000});
        },
        reject: () => {
          toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
      });
    }

    const confirmPosition = (position) => {
      confirm.require({
        group: 'positionDialog',
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        position: position,
        accept: () => {
          toast.add({severity:'info', summary:'Confirmed', detail:'Record deleted', life: 3000});
        },
        reject: () => {
          toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
      });
    }

    return { confirm1, confirm2, confirmPosition };
  }
});
</script>