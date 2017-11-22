(function(win) {
    "use strict";
    var alert = win.alert,
        db = win.sessionStorage,
        $ = win.$,
        src = "./css/app-icons.svg",
        ctx = "#app-icons"
    ;

    if(!String.prototype.format) {
        win.console.log("APP-ICON: String.format in play.");
        String.prototype.format = function() {
            var res = this, i, vals = arguments;
            for (i = 0; i < vals.length; i += 1) {
                res = res.replace(new RegExp("\\{" + i + "\\}","g"), vals[i]);
            }
            return res;
        };
    }
    function log(message) {
        if (win.console) {
            win.console.log("[{0}] APP-ICONS: {1}".format(new Date(), message));
        }
        else {
            alert( message );
        }
    }
    function renderIcons(outletSelector, data) {
        var outlet = $(outletSelector);
        $(data).each(function() {
            outlet.append(this);
        });
        log("renderIcon called. (total: {0})".format(data.length));

        win.setTimeout(function() {
            log("init trigger");
            outlet.trigger("icons-loaded");
        }, 10);
    }

    $(function() {
        log("document ready");

        if(!$("body").find(ctx)[0]) {
            log("appending render canvas");
            $("body").append("<svg id=\"{0}\" class=\"render-canvas\"></svg>".format(ctx.replace("#","")));
        }
        if (!db.getItem(ctx)) {
            log("ajax load");
            $.ajax({
                url: src, method: "GET", dataType: "html",
                error: function(xhr,text,error) {
                    alert("text: {0}\nerror: {1}".format(text, error));
                },
                success: function(data) {
                    //db.setItem(ctx, data);
                    renderIcons(ctx, $(data).find("symbol,defs"));
                }
            });
        }
        else {
            log("session load");
            renderIcons(ctx, $(db.getItem(ctx)).find("symbol,defs"));
        }
    });
}(this));