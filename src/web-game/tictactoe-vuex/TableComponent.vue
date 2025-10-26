<template>
  <table>
    <TrComponent v-for="(_, index) in tableData" :rowIndex="index" :key="index"></TrComponent>
  </table>
</template>

<script>
import TrComponent from "./TrComponent.vue";

export default {
  name: "TableComponent",
  components: {TrComponent},
  computed: {
    tableData() {
      return this.$store.state.tableData;
    }
  }
}
</script>

<style></style>