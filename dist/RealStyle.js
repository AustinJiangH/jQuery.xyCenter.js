(() => {

    function RealStyle(elem, pseudo = null){
        let rawStyle;
        if ( document.defaultView.getComputedStyle ) {
            // firefox, safari, chrome, opera, ie9+
            rawStyle = document.defaultView.getComputedStyle(elem, pseudo);
        } else {
            throw 'unsupported browser!'
        }

        class elemStyle {
            constructor (rawStyle) {
                for( let i = 0 ; i < rawStyle.length; i++ ) {
                    this[rawStyle[i]] = rawStyle[rawStyle[i]];
                }
            }
            widthNum() {
                return parseFloat(this['width'].slice(0,-2)) + parseFloat(this['padding-left'].slice(0,-2)) + parseFloat(this['padding-right'].slice(0,-2));
            }
            heightNum(){
                return parseFloat(this['height'].slice(0,-2)) + parseFloat(this['padding-top'].slice(0,-2)) + parseFloat(this['padding-bottom'].slice(0,-2));
            }
        }

        styles = new elemStyle(rawStyle);

        return styles;
    }


})(window);


