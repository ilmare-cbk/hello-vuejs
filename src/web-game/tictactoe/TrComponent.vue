<template>
  <tr>
    <TdComponent v-for="(cellData, index) in rowData" :cellData="cellData" :cellIndex="index"
                 :rowIndex="rowIndex" :key="index"></TdComponent>
  </tr>
</template>
<script>
import TdComponent from "./TdComponent.vue";

export default {
  name: "TrComponent",
  components: {TdComponent},
  props: {
    rowData: Array,
    rowIndex: Number,
  }
}
</script>
<style></style>