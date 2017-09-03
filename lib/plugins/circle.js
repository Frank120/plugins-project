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

            imd = ctx.getImageData(0,0, diameter, diameter);
            //The initial decision is the reason for no picture address
            function draw(current, x){
                ctx.putImageData(imd, 0, 0);
                ctx.beginPath();
                ctx.arc(diameter/2, diameter/2, 30, -(quart), ((circ) * current) - quart, false);
                ctx.stork();
            }

            var t = 0;
            var timer = null;
            function loadCanvas(now, num){
                timer = setInterval(function (){
                    if (t > now) {
                        t = 0;
                        draw(now, num); // last draw
                        clearInterval(timer);
                    } else {
                        draw(t, num);
                        t += 0.01;
                    }
                },50)
            }
            loadCanvas(1, x);
        }
    };

    $.fn.drawCircle = function(obj){
        var newDefaultObj = new DefaultObj(this, obj);
        newDefaultObj.init();
        return newDefaultObj;
    }
})($, window)