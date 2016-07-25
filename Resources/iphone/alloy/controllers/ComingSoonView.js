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
            $.navigationWindowComingSoonView.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
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
    var __defers = {};
    $.__views.comingSoonViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "comingSoonViewWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.comingSoonViewWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.navigationWindowComingSoonView = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.comingSoonViewWindow,
        id: "navigationWindowComingSoonView"
    });
    $.__views.navigationWindowComingSoonView && $.addTopLevelView($.__views.navigationWindowComingSoonView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    try {
        $.navigationWindowComingSoonView.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;