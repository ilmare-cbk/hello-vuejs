<template>
  <div>
    <div> {{ turn }}님의 차례입니다.</div>
    <TableComponent :tableData="tableData"></TableComponent>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import TableComponent from "./TableComponent.vue";
import {mapState} from "vuex";

export default {
  components: {TableComponent},
  computed: {
    // turn() {
    //   return this.$store.state.turn;
    // },
    // winner() {
    //   return this.$store.state.winner;
    // },
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    ...mapState(['winner', 'turn', 'tableData'])
  },
  methods: {},
}
</script>

<style>
table {
  border-collapse: collapse;
}

td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>