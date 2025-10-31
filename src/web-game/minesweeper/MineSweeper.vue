<template>
  <div>
    <MineForm/>
    <div>{{ timer }}</div>
    <TableComponent/>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import TableComponent from "./TableComponent.vue";
import MineForm from "./MineForm.vue";
import {mapState} from 'vuex';
import {INCREMENT_TIMER} from "./store";

let interval = null;
export default {
  components: {TableComponent, MineForm},
  computed: {
    ...mapState(['timer', 'result', 'halted']),
  },
  methods: {},
  watch: {
    halted(value, oldValue) {
      if (value === false) { // false일 때 게임 시작
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        }, 1000);
      } else { // 게임 중단
        clearInterval(interval);
      }
    }
  },
  beforeDestroy() {
    clearInterval(interval);
  }
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