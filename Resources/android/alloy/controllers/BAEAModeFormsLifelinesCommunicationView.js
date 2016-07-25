function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTelephoneTelegraphMobilePhone_Change() {
        try {
            current_communication = Alloy.Globals.replaceCharAt(0, current_communication, $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:communication_changed", {
                value: current_communication
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRadioAndTelevision_Change() {
        try {
            current_communication = Alloy.Globals.replaceCharAt(1, current_communication, $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:communication_changed", {
                value: current_communication
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnNewspaperAndMagazines_Change() {
        try {
            current_communication = Alloy.Globals.replaceCharAt(2, current_communication, $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:communication_changed", {
                value: current_communication
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLifelinesCommunicationView";
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
    $.__views.baeaModeLifelinesCommunicationWindow = Ti.UI.createWindow({
        title: L("baea_mode_lifelines_communication_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeLifelinesCommunicationWindow"
    });
    $.__views.baeaModeLifelinesCommunicationWindow && $.addTopLevelView($.__views.baeaModeLifelinesCommunicationWindow);
    $.__views.scrollViewLifelinesCommunication = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLifelinesCommunication"
    });
    $.__views.baeaModeLifelinesCommunicationWindow.add($.__views.scrollViewLifelinesCommunication);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone"
    });
    $.__views.scrollViewLifelinesCommunication.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision"
    });
    $.__views.scrollViewLifelinesCommunication.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines"
    });
    $.__views.scrollViewLifelinesCommunication.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_communication = args.communication;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone.init(L("generic_telephone_telegraph_mobilephone_text_msg"), current_communication.charAt(0), OnTelephoneTelegraphMobilePhone_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision.init(L("generic_radio_and_television_text_msg"), current_communication.charAt(1), OnRadioAndTelevision_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines.init(L("generic_newspaper_and_magazines_text_msg"), current_communication.charAt(2), OnNewspaperAndMagazines_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines.enabled(view_enabled);
        $.baeaModeLifelinesCommunicationWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;