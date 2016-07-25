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
    this.__controllerPath = "ComingSoonView";
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
    $.__views.comingSoonViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "comingSoonViewWindow"
    });
    $.__views.comingSoonViewWindow && $.addTopLevelView($.__views.comingSoonViewWindow);
    $.__views.lblComingSoon = Ti.UI.createLabel({
        text: L("coming_soon_msg"),
        width: "90%",
        top: 10,
        left: "5%",
        color: "#000",
        font: {
            fontSize: 22,
            fontFamily: "Georgia-Italic",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblComingSoon"
    });
    $.__views.comingSoonViewWindow.add($.__views.lblComingSoon);
    $.__views.coming_soon_image_view = Ti.UI.createImageView({
        top: 50,
        image: "/images/coming_soon.png",
        id: "coming_soon_image_view"
    });
    $.__views.comingSoonViewWindow.add($.__views.coming_soon_image_view);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    try {
        $.comingSoonViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;