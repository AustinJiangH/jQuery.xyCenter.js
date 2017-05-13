/**
 * Author: Austin Jiang
 * All Rights Reserved
 * Version: 1.0
 * Last Modified: 2017/05/13
 **/

/**
 * Usage:
 * $('selector').xyCenter();
 * $('selector').xyCenter({
 *      type      : 'margin',   // 'margin', 'relative', 'absolute', 'transform'
        direction : 'xy',       // 'x'(horizontal), 'y'(vertical), 'xy'(both direction)
        rate      : 1/2,
 * });
 *
 * NOTE: if you use type 'transform', directon 'x' will NOT work!
 *
 **/



(($) => {

    // from RealStyle.js V0.0
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

        styles = new elemStyle(rawStyle);
        return styles;
    }

    // Center object
    const Center = {

        xCenter (elem, options) {

            const parentWidth = RealStyle(elem.parent().get(0)).widthNum();
            const selfWidth   = RealStyle(elem.get(0)).widthNum();
            const marginLeft  = ( parentWidth - selfWidth ) * options.rate;

            switch (options.type) {
                case 'relative':
                    elem.css({
                        'position': 'relative',
                        'left': marginLeft,
                    });
                    break;
                case 'absolute':
                    elem.parent().css({
                        'position' : 'relative',
                    });
                    elem.css({
                        'position':'absolute',
                        'left' : marginLeft,
                    });
                    break;
                case 'transform':
                    elem.css({
                        'transform':'translateX(' + marginLeft + 'px)',
                    });
                    break;
                default:
                    elem.css({
                        'margin-left': marginLeft,
                    });
            }
        },

        yCenter (elem, options) {

            const parentHeight = RealStyle(elem.parent().get(0)).heightNum();
            const selfHeight   = RealStyle(elem.get(0)).heightNum();
            const marginTop    = ( parentHeight - selfHeight ) * options.rate;

            switch (options.type) {
                case 'relative':
                    elem.css({
                        'position': 'relative',
                        'top': marginTop,
                    });
                    break;
                case 'absolute':
                    elem.parent().css({
                        'position' : 'relative',
                    });
                    elem.css({
                        'position':'absolute',
                        'top' : marginTop,
                    });
                    break;
                case 'transform':
                    elem.css({
                        'transform':'translateY(' + marginTop + 'px)',
                    });
                    break;
                default:
                    elem.parent().css({
                        'overflow' : 'hidden',
                    });
                    elem.css({
                        'margin-top' : marginTop,
                    });
            }
        }
    };

    // add methods to jQuery
    $.fn.xyCenter = function (options= {
        type      : 'margin',  // 'margin', 'relative', 'absolute', 'transform'
        direction : 'xy',      // 'x'(horizontal), 'y'(vertical), 'xy'(both direction)
        rate      : 1/2,
    }) {

        const $this   = $(this);
        const $window = $(window);

        switch (options.direction) {
            case 'x':
                Center.xCenter($this, options);
                $window.resize(() => {
                    Center.xCenter($this, options);
                });
                break;
            case 'y':
                Center.yCenter($this, options);
                $window.resize(() => {
                    Center.yCenter($this, options);
                });
                break;
            default:
                Center.xCenter($this, options);
                Center.yCenter($this, options);
                $window.resize(() => {
                    Center.xCenter($this, options);
                    Center.yCenter($this, options);
                });
        }
    };

})(jQuery);