(function(win) {
    "use strict";
    if(!String.prototype.format) {
        String.prototype.format = function() {
            var res = this, i, vals = arguments;
            for (i = 0; i < vals.length; i += 1) {
                res = res.replace(new RegExp("\\{" + i + "\\}","g"), vals[i]);
            }
            return res;
        };
    }
}(this));