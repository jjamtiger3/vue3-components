class Column {
    id = '' // 초기 컬럼id를 부여할 방법을 생각해봐야할듯
    header = {}

    constructor(columnOptions) {
        this.header = columnOptions.header;
        this.id = columnOptions.id;
    }
}
export default Column;