function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBtnBack_Click() {
        try {
            $.navigationWindowBAEASinglePictureView.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
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
    var __defers = {};
    $.__views.baeaSinglePictureViewWindow = Ti.UI.createWindow({
        title: L("baea_single_picture_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaSinglePictureViewWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaSinglePictureViewWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.baea_single_picture_view = Ti.UI.createImageView({
        defaultImage: "/images/img_not_found.png",
        id: "baea_single_picture_view"
    });
    $.__views.baeaSinglePictureViewWindow.add($.__views.baea_single_picture_view);
    $.__views.navigationWindowBAEASinglePictureView = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaSinglePictureViewWindow,
        id: "navigationWindowBAEASinglePictureView"
    });
    $.__views.navigationWindowBAEASinglePictureView && $.addTopLevelView($.__views.navigationWindowBAEASinglePictureView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_image_path = args.image_path;
    try {
        current_image_path && $.baea_single_picture_view.setImage(current_image_path);
        $.navigationWindowBAEASinglePictureView.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;