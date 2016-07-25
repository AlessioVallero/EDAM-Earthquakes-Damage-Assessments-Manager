function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ViewSignView";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.viewSignViewWindow = Ti.UI.createWindow({
        title: L("view_sign_view_title"),
        backgroundColor: "#ffffcc",
        id: "viewSignViewWindow"
    });
    $.__views.viewSignViewWindow && $.addTopLevelView($.__views.viewSignViewWindow);
    $.__views.image_view_sign = Ti.UI.createImageView({
        defaultImage: "/images/img_not_found.png",
        id: "image_view_sign"
    });
    $.__views.viewSignViewWindow.add($.__views.image_view_sign);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_image = args.image;
    try {
        current_image && $.image_view_sign.setImage(current_image);
        $.viewSignViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;