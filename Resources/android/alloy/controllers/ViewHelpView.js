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
    this.__controllerPath = "ViewHelpView";
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
    $.__views.viewHelpViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "viewHelpViewWindow"
    });
    $.__views.viewHelpViewWindow && $.addTopLevelView($.__views.viewHelpViewWindow);
    $.__views.scrollViewViewHelpView = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewViewHelpView"
    });
    $.__views.viewHelpViewWindow.add($.__views.scrollViewViewHelpView);
    $.__views.image_view_help = Ti.UI.createImageView({
        left: 0,
        right: 0,
        id: "image_view_help"
    });
    $.__views.scrollViewViewHelpView.add($.__views.image_view_help);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_image = args.image;
    var current_title = args.title;
    try {
        current_title && $.viewHelpViewWindow.setTitle(current_title);
        current_image && $.image_view_help.setImage(current_image);
        $.viewHelpViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;