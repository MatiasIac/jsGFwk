class Fonts {
    
    _name = "Fonts";

    constructor() { }

    static _getStyleSection() {
        const styleSection = document.getElementsByTagName('style');

        if (styleSection.length == 0) {
            const styles = document.createElement('style');
            styles.type = "text/css";
            return styles;
        }

        return styleSection[0];
    }

    static buildFont(name, source) {
        const styleSection = this._getStyleSection();
		const headSection = document.getElementsByTagName('head');
		
		if (headSection.length == 0) {
            console.error("No head tag was found in the DOM.");
			return;
		}
		
		const font = `@font-face { font-family: '${name}'; src: url('${source}');}\n`;
		
		styleSection.innerHTML = `${styleSection.innerHTML} \n ${font}`;
		
		headSection[0].appendChild(styleSection);
    }
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Fonts;
}