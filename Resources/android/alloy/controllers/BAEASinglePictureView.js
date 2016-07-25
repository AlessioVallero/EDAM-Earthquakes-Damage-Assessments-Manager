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
    this.__controllerPath = "BAEASinglePictureView";
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
    $.__views.baeaSinglePictureViewWindow = Ti.UI.createWindow({
        title: L("baea_single_picture_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaSinglePictureViewWindow"
    });
    $.__views.baeaSinglePictureViewWindow && $.addTopLevelView($.__views.baeaSinglePictureViewWindow);
    $.__views.baea_single_picture_view = Ti.UI.createImageView({
        defaultImage: "/images/img_not_found.png",
        id: "baea_single_picture_view"
    });
    $.__views.baeaSinglePictureViewWindow.add($.__views.baea_single_picture_view);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_image_path = args.image_path;
    try {
        current_image_path && $.baea_single_picture_view.setImage(current_image_path);
        $.baeaSinglePictureViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;