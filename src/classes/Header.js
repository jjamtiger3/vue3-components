class Header {
    text = ''
    style = {}

    constructor(headerOptions) {
        this.style = headerOptions.style;
        this.text = headerOptions.text;
    }
    get text () {
        return this.text;
    }
    set text (text) {
        this.text = text;
    }
    get style () {
        return this.style;
    }
    set style (style) {
        this.style = style;
    }
}
export default Header;