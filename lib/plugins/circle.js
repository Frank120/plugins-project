(function ($, window){
    var DefaultObj = function (el, obj){
        this.setting = {};
        this.el = el;
        this.setting = $.extend(this.setting, obj);
    };

    DefaultObj.prototype = {
        init : function(){
            var self = this;
            var _canvas = $('<canvas>');

            var ctx = _canvas[0].getContext('2d');

            _canvas.attr({
                class : 'bg-canvas',
                height : self.el.height(),
                wodth : self.el.width()
            });

            self._drawCircle(ctx);
            // _canvas.css({ position : 'absolute', top : 0, 'z-index' : -1});

            self.el.append(_canvas);
        },
        /**
         * @param x 
         * is count down num
         * @param diameter 
         * is circle diameter
         */
        _drawCircle : function (ctx, x, diameter){
            var ctx = ctx;
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var imd = null;

            ctx.clearRect(0, 0, this.el.width, this.el.height);

            ctx.beginPath();
            ctx.strokeStyle = "#000";
            ctx.lineCap = "square";
            ctx.closePath();
            ctx.fill();
            ctx.lingWidth = 2.0;

            // imd = ctx.getImageData(0,0, diameter, diameter);
            //the code has error , next time will fixed it
        }
    };

    $.fn.drawCircle = function(obj){
        var newDefaultObj = new DefaultObj(this, obj);
        newDefaultObj.init();
        return newDefaultObj;
    }
})($, window)