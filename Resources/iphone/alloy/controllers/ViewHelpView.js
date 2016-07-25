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
            $.navigationWindowViewHelpView.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
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
    var __defers = {};
    $.__views.viewHelpViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "viewHelpViewWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.viewHelpViewWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.navigationWindowViewHelpView = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.viewHelpViewWindow,
        id: "navigationWindowViewHelpView"
    });
    $.__views.navigationWindowViewHelpView && $.addTopLevelView($.__views.navigationWindowViewHelpView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_image = args.image;
    var current_title = args.title;
    try {
        current_title && $.viewHelpViewWindow.setTitle(current_title);
        current_image && $.image_view_help.setImage(current_image);
        $.navigationWindowViewHelpView.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;