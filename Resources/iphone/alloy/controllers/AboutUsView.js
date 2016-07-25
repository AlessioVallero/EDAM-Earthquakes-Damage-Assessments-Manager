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
            $.navigationWindowAboutUsView.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnLblAboutUs_Click() {
        try {
            Titanium.Platform.openURL("http://areeweb.polito.it/ricerca/ICRED/Software/EDAM.php");
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AboutUsView";
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
    $.__views.aboutUsViewWindow = Ti.UI.createWindow({
        title: L("about_us_view_title"),
        backgroundColor: "#ffffcc",
        id: "aboutUsViewWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.aboutUsViewWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewAboutUs = Ti.UI.createScrollView({
        top: 0,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewAboutUs"
    });
    $.__views.aboutUsViewWindow.add($.__views.scrollViewAboutUs);
    $.__views.lblAboutUsVersion = Ti.UI.createLabel({
        text: L("about_us_version_msg"),
        width: "90%",
        top: 10,
        color: "#000",
        font: {
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "center",
        layout: "vertical",
        id: "lblAboutUsVersion"
    });
    $.__views.scrollViewAboutUs.add($.__views.lblAboutUsVersion);
    $.__views.lblAboutUs = Ti.UI.createLabel({
        text: L("about_us_msg"),
        width: "90%",
        top: 45,
        left: "5%",
        color: "#000",
        font: {
            fontSize: 16,
            fontFamily: "Arial"
        },
        textAlign: "center",
        layout: "vertical",
        id: "lblAboutUs"
    });
    $.__views.scrollViewAboutUs.add($.__views.lblAboutUs);
    OnLblAboutUs_Click ? $.__views.lblAboutUs.addEventListener("click", OnLblAboutUs_Click) : __defers["$.__views.lblAboutUs!click!OnLblAboutUs_Click"] = true;
    $.__views.navigationWindowAboutUsView = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.aboutUsViewWindow,
        id: "navigationWindowAboutUsView"
    });
    $.__views.navigationWindowAboutUsView && $.addTopLevelView($.__views.navigationWindowAboutUsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    try {
        $.navigationWindowAboutUsView.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.lblAboutUs!click!OnLblAboutUs_Click"] && $.__views.lblAboutUs.addEventListener("click", OnLblAboutUs_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;