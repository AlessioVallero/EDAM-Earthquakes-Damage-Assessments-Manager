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
            $.navigationWindowSectionEightMeasuresOfEmergency.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnLimited_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(2 * current_measures_of_emergency, Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited.get_value());
            Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnExtended_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(2 * current_measures_of_emergency + 1, Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended.get_value());
            Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionEightMeasuresOfEmergency";
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
    $.__views.aedesModeSectionEightMeasuresOfEmergencyWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_eight_measures_of_emergency_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionEightMeasuresOfEmergencyWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.aedesModeSectionEightMeasuresOfEmergencyWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewSectionEightMeasuresOfEmergency = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionEightMeasuresOfEmergency"
    });
    $.__views.aedesModeSectionEightMeasuresOfEmergencyWindow.add($.__views.scrollViewSectionEightMeasuresOfEmergency);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergency = Ti.UI.createLabel({
        text: L("generic_measures_of_emergency_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergency"
    });
    $.__views.scrollViewSectionEightMeasuresOfEmergency.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergency);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyFatherTitle = Ti.UI.createLabel({
        top: 30,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyFatherTitle"
    });
    $.__views.scrollViewSectionEightMeasuresOfEmergency.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyFatherTitle);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited = Ti.UI.createView({
        top: 60,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited"
    });
    $.__views.scrollViewSectionEightMeasuresOfEmergency.add($.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended = Ti.UI.createView({
        top: 130,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended"
    });
    $.__views.scrollViewSectionEightMeasuresOfEmergency.add($.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended);
    $.__views.navigationWindowSectionEightMeasuresOfEmergency = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.aedesModeSectionEightMeasuresOfEmergencyWindow,
        id: "navigationWindowSectionEightMeasuresOfEmergency"
    });
    $.__views.navigationWindowSectionEightMeasuresOfEmergency && $.addTopLevelView($.__views.navigationWindowSectionEightMeasuresOfEmergency);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_measures_of_emergency = args.measures_of_emergency_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.lblAeDESModeFormsSectionEightMeasuresOfEmergencyFatherTitle.setText(current_father_title);
        var measuresOfEmergencyValue = Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"];
        $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited.init(L("generic_limited_text_msg"), measuresOfEmergencyValue.charAt(2 * current_measures_of_emergency), OnLimited_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended.init(L("generic_extended_text_msg"), measuresOfEmergencyValue.charAt(2 * current_measures_of_emergency + 1), OnExtended_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended.enabled(view_enabled);
        $.navigationWindowSectionEightMeasuresOfEmergency.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;