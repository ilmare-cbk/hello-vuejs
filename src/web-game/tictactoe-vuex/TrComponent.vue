<template>
  <tr>
    <TdComponent v-for="(_, index) in rowData" :key="index" :rowIndex="rowIndex" :cellIndex="index"></TdComponent>
  </tr>
</template>
<script>
import TdComponent from "./TdComponent.vue";

export default {
  name: "TrComponent",
  components: {TdComponent},
  props: {
    rowIndex: Number,
  },
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    }
  }
}
</script>
<style></style>