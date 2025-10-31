import Vuex from 'vuex';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,  // 0 이상이면 다 opened
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((_, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

export default new Vuex.Store({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0
        },
        timer: 0,
        result: '',
        halted: true, // 중단된 상태
        openedCount: 0,
    },
    getters: {},
    mutations: {
        [START_GAME](state, {row, cell, mine}) {
            state.data = {
                row,
                cell,
                mine
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, {row, cell}) {
            const checked = [];

            function checkAround(row, cell) {
                if (row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length) {
                    return;
                }

                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(state.tableData[row][cell])) {
                    return;
                }

                if (checked.includes(row + '-' + cell)) {
                    return;
                } else {
                    checked.push(row + '-' + cell);
                }

                let around = [];
                if (state.tableData[row - 1]) {
                    around = around.concat(
                        state.tableData[row - 1][cell - 1],
                        state.tableData[row - 1][cell],
                        state.tableData[row - 1][cell + 1]
                    );
                }

                around = around.concat(state.tableData[row][cell - 1], state.tableData[row][cell + 1]);

                if (state.tableData[row + 1]) {
                    around = around.concat(
                        state.tableData[row + 1][cell - 1],
                        state.tableData[row + 1][cell],
                        state.tableData[row + 1][cell + 1]
                    );
                }

                const counted = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });

                if (counted.length === 0) {

                    if (state.tableData[row - 1]) {
                        checkAround(row - 1, cell - 1);
                        checkAround(row - 1, cell);
                        checkAround(row - 1, cell + 1);
                    }
                    checkAround(row, cell - 1);
                    checkAround(row, cell + 1);
                    if (state.tableData[row + 1]) {
                        checkAround(row + 1, cell - 1);
                        checkAround(row + 1, cell);
                        checkAround(row + 1, cell + 1);
                    }
                }

                if (state.tableData[row][cell] === CODE.NORMAL) {
                    state.openedCount += 1;
                }
                state.tableData[row][cell] = counted.length;
                console.log(state.openedCount);
            }

            checkAround(row, cell);

            if (state.data.row * state.data.cell - state.data.mine === state.openedCount) {
                state.halted = true;
                state.result = `${state.timer}초만에 승리하셨습니다.`;
            }
        },
        [CLICK_MINE](state, {row, cell}) {
            state.tableData[row][cell] = CODE.CLICKED_MINE;
            state.halted = true;
        },
        [FLAG_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.MINE) {
                state.tableData[row][cell] = CODE.FLAG_MINE;
            } else {
                state.tableData[row][cell] = CODE.FLAG;
            }
        },
        [QUESTION_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                state.tableData[row][cell] = CODE.QUESTION_MINE;
            } else {
                state.tableData[row][cell] = CODE.QUESTION;
            }
        },
        [NORMALIZE_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                state.tableData[row][cell] = CODE.MINE;
            } else {
                state.tableData[row][cell] = CODE.NORMAL;
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },
    actions: {}
});