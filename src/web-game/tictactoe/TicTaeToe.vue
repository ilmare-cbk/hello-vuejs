<template>
  <div>
    <div> {{ turn }}님의 차례입니다.</div>
    <TableComponent :tableData="tableData"></TableComponent>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
import TableComponent from "./TableComponent.vue";

export default {
  components: {TableComponent},
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      turn: 'O',
      winner: ''
    }
  },
  computed: {},
  methods: {},
  mounted() {
  },
  beforeDestroy() {
  },
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