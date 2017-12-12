! (function (Handle) {

    function asArray() {
        return Array.prototype.slice.apply(this, arguments);
    }

    function defProp (target, name, value, enumerable) {
        return Object.defineProperty(target, name, newProp(value, enumerable));
    }

    function cliFlat (target) {
        var result = [];
        var length = target.length;
        for (var i = 0; i < length; i++) {
            var ns = target[i];

            if (isArray(ns)) {
                if (ns.length) {
                    result.push.apply(result, cliFlat(ns));
                }
            } else {
                if (isValid(ns)) {
                    result.push(ns)
                }
            }
        }

        return result;
    }

    function isValid(target) {
        return target !== void 0 && target !== null;
    }

    function newProp (target, enumerable) {
        return {
            configurable : true,
            enumerable : !!enumerable,
            writable : true,
            value : target
        };
    }

    Handle.createElement = function (type, props) {
        var natures = props || [];
        var insider = cliFlat(asArray.call(arguments, 2));

        var element = {
            props    : {},
            type     : type,
            cmd      : natures.cmd || [],
            key      : natures.key,
            ref      : natures.ref
        };

        for (var name in natures) {
            if (name !== "cmd" &&
                name !== "key" &&
                name !== "ref" &&
                isValid(natures[name])) {
                element.props[name] = natures[name];
            }
        }

        defProp(element.props, "children", insider);
        Object.freeze(element.props);
        return element;
    };

    Handle.AnalysisString = function (template) {
        var data = {
            name : 'noble',
            type : 1
        };

        var varStatement = '';
        for (var name in data) {
            varStatement += 'var ' + name + '=data.' + name + ';';
        };

        var html = template.innerHTML;
        html = html.replace(/s/g, );

        var reList = [];
        var rightContent = '';

        html = html.replace(/(.*?)(<%.%>)(.*)/g, function (str, left, center, right){
            console.log(str+ '+' + left + '+' + center + '+' + right)
            rightContent = right;
            reList.push(left);
            return center;
        });

        var __TMP_LIST__ = '__TMP_LSIT__',
            __TMP_DATA__ = '__TMP_DATA__';

        var fnStr = '';
        html.replace(/(.*?)<%(.*?)%>/g, function (str, html, exp) {
            fnStr += __TMP_LIST__ + '.psuh('+ quotr(html) +');';
            if(exp.indexOf('=') === 0) {
                fnStr += __TMP_LIST__ +'.push(+ exp.slice(1) +);';
            } else {
                fnStr += exp;
            }
        });

        var fn = new Function (__TMP_DATA__, __TMP_LIST__, fnStr);
        if(reList.length > 0){
            fn(data, reList);
            reList.push(rightContent);
        } else {
            console.log(html);
        }

        return reList;
    };

    Handle.AnalysisString_02 = function (str) {

        let parent;
        const root = [];

        function parse(str) {
            debugger;
            const matches = str.match(/{{|{%/);
            const isBlock = matches[0] === '{%';
            const endIndex = matches.index;

            const chars = str.slice(0, matches ? endIndex : str.length);

            if (chars.length) {
                //
            }

            str = str.slice(endIndex + 2);
            const leftStart = matches[0];
            const rightEnd = isBlock ? '%}' : '}}';
            const rightEndIndex = str.indexOf(rightEnd);
            const expression = str.slice(0, rightEndIndex);

            if (isBlock) {
                //
                parent = el;
            } else {
                //
            }

            (parent ?  parent.children : root).push(el);
            parse(str.slice(rightEndIndex + 2));
        }
    }
}(this.Handle = {}));