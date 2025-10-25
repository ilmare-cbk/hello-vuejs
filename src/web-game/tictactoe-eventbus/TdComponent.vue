<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>
<script>
import EventBus from './EventBus.js'

export default {
  name: "TdComponent",
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number,
  },
  methods: {
    onClickTd() {
      if (this.cellData) return;
      EventBus.emit('clickTd', {
        cellIndex: this.cellIndex,
        rowIndex: this.rowIndex
      });
    }
  }
}
</script>
<style scoped></style>