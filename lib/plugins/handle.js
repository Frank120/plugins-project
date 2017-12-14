! (function (Handle) {
    
    Handle.AnalysisString = function (str) {

        let parent;
        const root = [];

        function parse(str) {
            const matches = str.match(/{{|{%/);
            const isBlock = matches && matches[0] === '{%';
            const endIndex = matches && matches.index;

            const chars = str.slice(0, matches ? endIndex : str.length);

            if (chars.length) {
                root.push(chars);
            }
            
            if(!matches) return;

            str = str.slice(endIndex + 2);
            const leftStart = matches[0];
            const rightEnd = isBlock ? '%}' : '}}';
            const rightEndIndex = str.indexOf(rightEnd);
            const expression = str.slice(0, rightEndIndex);

            if (isBlock) {
                //
                // parent = el;
            } else {
                //
            }

            // (parent ?  parent.children : root).push(el);
            parse(str.slice(rightEndIndex + 2));
        }
        
        parse(str);




















        function computeExpression (obj, expression) {
            const methoBody = `return (${expression})`;
            const funcString = obj ? `with(_$o) {${methoBody}}` : methoBody;
            const func = new Function('_$0', '_$f', funcString);
            try {
                let result = func(obj, processFilter);
                return (result === undefined || result === null) ? '' : result;
            } catch (e) {
                if (e.message.indexOf('is not defined') >= 0) {
                    return '';
                } else {
                    throw e;
                }
            }
        }

        function processFilter(filterName, str) {
            const filter = filters[filterName] || globalFilters[filterName];

            if (!filter) {
                throw new Error(`unknow filter ${filterName}`);
            } 

            return filter(str);
        }
    };

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
}(this.Handle = {}));