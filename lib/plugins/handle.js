! (function (Handle) {

    var tagElementOpen = "<";
    var tagElementFold = ">";

    var xhtmlFoliage = {
        area : 0,
        base : 0,
        br : 0,
        col : 0,
        embed : 0,
        hr : 0,
        img : 0,
        input : 0,
        keygen : 0,
        link : 0,
        menuitem : 0,
        meta : 0,
        param : 0,
        source : 0,
        track : 0,
        wbr : 0
    };
    
    Handle.AnalysisString = function (temp) {
        var roots = [];
        var number = 0;
        var queue = [];
        var level = 0;
        var length = temp.length;
        while (number < length) {
            if (ownElementStart(number)) {
                ownElementParse(number, number = ownElementClose(number + 1) + 1);
                continue;
            } 
            ownContentParse(number, number = ownContentClose(number));
        }

        if (roots.length > 1) {
            console.log("Cannot use multiple root node");
        }
        return roots[0] || "";

        function ownElementStart(current) {
            return isStarts(temp, tagElementOpen, current);
        }

        function ownElementParse(start, end) {
            var qname = tplNameParser(temp.slice(start + 1), end);
            var value = tplPropParser(temp.slice(start + 1 + qname.length, end));
            var close = hasProp(xhtmlFoliage, qname) || temp.charAt(end - 2) === "/";
            ownStoreValue({
                each    : value.each,
                when    : value.when,
                props   : value.props,
                qname   : qname,
                level   : level,
                children: []
            }, !close);
        }

        function ownContentParse(start, end) {
            ownStoreValue(temp.slice(start, end).trim());
        }

        function ownStoreValue(value, depth) {
            if (value) {
                queue[level] = value;
                if (level > 0) {
                    queue[level - 1].children.push(value);
                } else {
                    roots.push(value)
                }
                if (depth) {
                    level++;
                }
            }
        }

        function ownContentClose (current) {
            current = temp.indexOf(tagElementOpen, current);
            return current >= 0 ? (
                ownElementStart(current) ? current : ownContentClose(current + 1)
            ) : length;
        }
    }

    function hasProp(target, name) {
        return Object.prototype.hasOwnProperty.call(target, name);
    }

    function isStarts (target, value, current) {
        var number = current || 0;
        var length = value.length;
        for (var i = 0; i < length; i++) {
            if (value.charAt(i) !== target.charAt(number + 1)) {
                return false;
            }
        }

        return true;
    }

    
    /**
     * 
     * @param {*} url 
     * @param {*} opt 
     */
    Handle.AnalysisUrl = function (url, opt) {
        var result;
        var current = url.split(opt);
        result = current[current.length - 1];
        return result;
    }

    /**
     * 
     * @param {*} temp  
     * @param {*} data 
     */
    Handle.attachTemplateToData = function (temp, data) {
        var i = 0,
            len = temp.length,
            fragment = '';

        function replace(obj) {
            var t, key, reg;

            for (key in obj) {
                reg = new RegExp('{{' + key + '}}', 'ig');
                t = (t || temp).replace(reg, obj[key]);
            }

            return t;
        }

        for (; i < len; i++) {
            fragment += replace(data[i]);
        }

        return fragment;
    }
}(this.Handle = {}));