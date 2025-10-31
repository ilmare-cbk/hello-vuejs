<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData"
          :key="`${rowIndex}-${cellIndex}`"
          :style="cellDataStyle(cellData)"
          @click="onClickTd(rowIndex, cellIndex)"
          @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        {{ cellDataText(cellData) }}
      </td>
    </tr>
  </table>
</template>

<script>
import {mapState} from "vuex";
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL} from "./store";

export default {
  name: "TableComponent",
  computed: {
    ...mapState(['tableData', 'halted']),
    cellDataStyle() {
      return (cellData) => {
        switch (cellData) {
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background: '#444'
            };
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return {
              background: 'white'
            };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              background: 'red'
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              background: 'yellow'
            };
          default:
            return {};
        }
      }
    },
    cellDataText() {
      return (cellData) => {
        switch (cellData) {
          case CODE.MINE:
            return '';
          case CODE.NORMAL:
            return '';
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            return '!';
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return '?';
          case CODE.CLICKED_MINE:
            return '펑';
          default:
            return cellData || '';
        }
      }
    }
  },
  methods: {
    onClickTd(row, cell) {
      if (this.halted) {
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
          return this.$store.commit(OPEN_CELL, {row: row, cell: cell});
        case CODE.MINE:
          return this.$store.commit(CLICK_MINE, {row: row, cell: cell});
        default:
          return;
      }
    },
    onRightClickTd(row, cell) {
      if (this.halted) {
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
        case CODE.MINE:
          this.$store.commit(FLAG_CELL, {row: row, cell: cell});
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          this.$store.commit(QUESTION_CELL, {row: row, cell: cell});
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          this.$store.commit(NORMALIZE_CELL, {row: row, cell: cell});
          return;
      }
    }
  }
}
</script>

<style></style>