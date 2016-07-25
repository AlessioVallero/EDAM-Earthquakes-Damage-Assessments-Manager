function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnSlide_Change() {
        try {
            current_landslide_type = Alloy.Globals.replaceCharAt(0, current_landslide_type, $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide.get_value());
            Ti.App.fireEvent("baea_mode_landslide:landslide_type_changed", {
                value: current_landslide_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnFall_Change() {
        try {
            current_landslide_type = Alloy.Globals.replaceCharAt(1, current_landslide_type, $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall.get_value());
            Ti.App.fireEvent("baea_mode_landslide:landslide_type_changed", {
                value: current_landslide_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnFlow_Change() {
        try {
            current_landslide_type = Alloy.Globals.replaceCharAt(2, current_landslide_type, $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow.get_value());
            Ti.App.fireEvent("baea_mode_landslide:landslide_type_changed", {
                value: current_landslide_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnSpread_Change() {
        try {
            current_landslide_type = Alloy.Globals.replaceCharAt(3, current_landslide_type, $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread.get_value());
            Ti.App.fireEvent("baea_mode_landslide:landslide_type_changed", {
                value: current_landslide_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTopple_Change() {
        try {
            current_landslide_type = Alloy.Globals.replaceCharAt(4, current_landslide_type, $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple.get_value());
            Ti.App.fireEvent("baea_mode_landslide:landslide_type_changed", {
                value: current_landslide_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnComplex_Change() {
        try {
            current_landslide_type = Alloy.Globals.replaceCharAt(5, current_landslide_type, $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex.get_value());
            Ti.App.fireEvent("baea_mode_landslide:landslide_type_changed", {
                value: current_landslide_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change() {
        try {
            current_landslide_type = Alloy.Globals.replaceCharAt(6, current_landslide_type, $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther.get_value());
            Ti.App.fireEvent("baea_mode_landslide:landslide_type_changed", {
                value: current_landslide_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLandslideLandslideTypeView";
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
    $.__views.baeaModeLandslideLandslideTypeWindow = Ti.UI.createWindow({
        title: L("baea_mode_landslide_landslide_type_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeLandslideLandslideTypeWindow"
    });
    $.__views.baeaModeLandslideLandslideTypeWindow && $.addTopLevelView($.__views.baeaModeLandslideLandslideTypeWindow);
    $.__views.scrollViewLandslideLandslideType = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLandslideLandslideType"
    });
    $.__views.baeaModeLandslideLandslideTypeWindow.add($.__views.scrollViewLandslideLandslideType);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide"
    });
    $.__views.scrollViewLandslideLandslideType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall"
    });
    $.__views.scrollViewLandslideLandslideType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow"
    });
    $.__views.scrollViewLandslideLandslideType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread = Ti.UI.createView({
        top: 210,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread"
    });
    $.__views.scrollViewLandslideLandslideType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple = Ti.UI.createView({
        top: 280,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple"
    });
    $.__views.scrollViewLandslideLandslideType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex = Ti.UI.createView({
        top: 350,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex"
    });
    $.__views.scrollViewLandslideLandslideType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther = Ti.UI.createView({
        top: 420,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther"
    });
    $.__views.scrollViewLandslideLandslideType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_landslide_type = args.landslide_type;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide.init(L("generic_slide_text_msg"), current_landslide_type.charAt(0), OnSlide_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall.init(L("generic_fall_text_msg"), current_landslide_type.charAt(1), OnFall_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow.init(L("generic_flow_text_msg"), current_landslide_type.charAt(2), OnFlow_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread.init(L("generic_spread_text_msg"), current_landslide_type.charAt(3), OnSpread_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple.init(L("generic_topple_text_msg"), current_landslide_type.charAt(4), OnTopple_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex.init(L("generic_complex_text_msg"), current_landslide_type.charAt(5), OnComplex_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther.init(L("generic_other_text_msg"), current_landslide_type.charAt(6), OnOther_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther.enabled(view_enabled);
        $.baeaModeLandslideLandslideTypeWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;