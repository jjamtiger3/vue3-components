class Header {
    headerOptions = {}
    constructor(headerOptions) {
        this.headerOptions = headerOptions;
    }
    get text() {
        return this.headerOptions.text;
    }
    set text(text) {
        this.headerOptions.text = text;
    }
}
export default Header;