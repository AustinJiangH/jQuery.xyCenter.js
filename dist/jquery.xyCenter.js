/**
 * Author: Austin Jiang
 * All Rights Reserved
 * Version: 0.0
 * Last Modified: 2017/05/12
 **/

/**
 * Usage:
 * $('selector').xyCenter();
 * $('selector').xCenter();
 * $('selector').yCenter();
 **/



(($) => {

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
            widthNum () {
                return parseFloat(this['width'].slice(0,-2)) + parseFloat(this['padding-left'].slice(0,-2)) + parseFloat(this['padding-right'].slice(0,-2));
            }
            heightNum () {
                return parseFloat(this['height'].slice(0,-2)) + parseFloat(this['padding-top'].slice(0,-2)) + parseFloat(this['padding-bottom'].slice(0,-2));
            }
        }

        styles = new elemStyle( rawStyle );
        return styles;
    }



    // Center object
    const Center = {

        xCenter (elem, rate = 1 / 2) {

            const parentWidth = RealStyle(elem.parent().get(0)).widthNum();
            const selfWidth   = RealStyle(elem.get(0)).widthNum();
            const marginLeft  = ( parentWidth - selfWidth ) * rate;
            elem.css({
                'margin-left' : marginLeft,
            })
        },

        yCenter (elem, rate = 1/2) {
            const parentHeight = RealStyle(elem.parent().get(0)).heightNum();
            const selfHeight   = RealStyle(elem.get(0)).heightNum();
            const marginTop    = ( parentHeight - selfHeight ) * rate;
            elem.parent().css({
                'overflow' : 'hidden',
            });
            elem.css({
                'margin-top' : marginTop,
            });
        }
    };


    // add methods to jQuery
    $.fn.xyCenter = function ( rate ) {
        const $this   = $(this);
        const $window = $(window);
        Center.xCenter($this, rate);
        Center.yCenter($this, rate);
        $window.resize(() => {
            Center.xCenter($this, rate);
            Center.yCenter($this, rate);
        });
    };
    $.fn.xCenter = function ( rate ) {
        const $this   = $(this);
        const $window = $(window);
        Center.xCenter($this, rate);
        $window.resize(() => {
            Center.xCenter($this, rate);
        });
    };
    $.fn.yCenter = function ( rate ) {
        const $this   = $(this);
        const $window = $(window);
        Center.yCenter($this, rate);
        $window.resize(() => {
            Center.yCenter($this, rate);
        });
    };

})(jQuery);