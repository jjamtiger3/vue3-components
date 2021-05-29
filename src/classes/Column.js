class Column {
    id = '' // 초기 컬럼id를 부여할 방법을 생각해봐야할듯
    header = {}
    style = {}

    constructor(columnOptions) {
        this.header = columnOptions.header;
        this.id = columnOptions.id;
        this.style = columnOptions.style;
    }
    get header () {
        return this.header;
    }

    set header (header) {
        this.header = header;
    }

    get style () {
        return this.style;
    }

    set style (style) {
        this.style = style;
    }
}
export default Column;