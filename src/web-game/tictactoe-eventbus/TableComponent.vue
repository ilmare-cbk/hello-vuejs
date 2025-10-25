<template>
  <table>
    <TrComponent v-for="(rowData, index) in tableData" :rowData="rowData" :rowIndex="index" :key="index"></TrComponent>
  </table>
</template>

<script>
import TrComponent from "./TrComponent.vue";

export default {
  name: "TableComponent",
  components: {TrComponent},
  props: {
    tableData: Array,
  }
}
</script>

<style></style>