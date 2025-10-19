<template>
  <div>
    <form @submit.prevent="onSubmitForm">
      <input v-model="value" minlength="4" maxlength="4" ref="answer"/>
      <button type="submit">입력</button>
    </form>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <li v-for="item in tries">
        <div>{{ item.try }}</div>
        <div>{{ item.result }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
function getNumbers() {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let code = [];

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    code.push(digits[randomIndex]);
    digits.splice(randomIndex, 1);
  }
  console.log(code);
  return code;
}

export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: '',
    }
  },
  methods: {
    onSubmitForm() {
      if (this.value === this.answer.join('')) {
        this.tries.push({
          try: this.value,
          result: '홈런'
        });
        alert('홈런!! 게임을 다시 시작합니다.');
        this.tries = [];
        this.answer = getNumbers();
      } else {
        if (this.tries.length > 9) {
          alert(`10번 넘게 틀려서 실패! 답은 ${this.answer.join('')}이었습니다.! \n게임을 다시 시작합니다.`);
          this.tries = [];
          this.answer = getNumbers();
        } else {
          let strike = 0;
          let ball = 0;
          const answerArray = this.value.split('').map(i => parseInt(i));
          for (let i = 0; i < answerArray.length; i++) {
            if (answerArray[i] === this.answer[i]) {
              strike++;
            } else if (this.answer.includes(answerArray[i])) {
              ball++;
            }
          }
          this.tries.push({
            try: this.value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`
          });
        }
      }
      this.$refs.answer.focus();
      this.value = '';
    }
  }
}
</script>
<style></style>