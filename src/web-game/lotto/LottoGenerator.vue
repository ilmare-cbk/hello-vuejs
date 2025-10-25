<template>
  <div>
    <div>당첨 숫자</div>
    <div id="result">
      <LottoBall v-for="ball in winBalls" :number="ball" :key="ball"></LottoBall>
    </div>
    <div>보너스</div>
    <LottoBall v-if="bonus" :number="bonus"></LottoBall>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>

import LottoBall from "./LottoBall.vue";

function getWinNumbers() {
  console.log("getWinNumbers");
  let candidate = Array(45).fill().map((value, index) => index + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNumbers, bonusNumber];
}

const timeouts = [];
export default {
  components: {LottoBall},
  data() {
    return {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    }
  },
  computed: {},
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
    },
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[this.winNumbers.length - 1];
        this.redo = true;
      }, 7000);
    }
  },
  mounted() {
    this.showBalls();
  },
  beforeDestroy() {
    timeouts.forEach((t) => clearTimeout(t));
  },
  watch: {
    // winBalls(val, oldVal) {
    //   console.log(oldVal);
    //   console.log(val);
    //   if (val.length === 0) {
    //     this.showBalls();
    //   }
    // }
    // bonus(newVal, oldVal) {
    //   console.log(newVal, oldVal);
    //   if (!newVal) {
    //     this.showBalls();
    //   }
    // }
    redo(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (!newVal) {
        this.showBalls();
      }
    }
  },
}
</script>

<style scoped>

</style>