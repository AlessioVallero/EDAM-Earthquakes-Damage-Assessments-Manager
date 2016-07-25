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
            $.navigationWindowFaultRuptureOffsetFeatureType.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnSoil_Change() {
        try {
            current_offset_feature_type = Alloy.Globals.replaceCharAt(0, current_offset_feature_type, $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil.get_value());
            Ti.App.fireEvent("baea_mode_fault_rupture:offset_feature_type_changed", {
                value: current_offset_feature_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBedrock_Change() {
        try {
            current_offset_feature_type = Alloy.Globals.replaceCharAt(1, current_offset_feature_type, $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock.get_value());
            Ti.App.fireEvent("baea_mode_fault_rupture:offset_feature_type_changed", {
                value: current_offset_feature_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRoadOrSidewalk_Change() {
        try {
            current_offset_feature_type = Alloy.Globals.replaceCharAt(2, current_offset_feature_type, $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk.get_value());
            Ti.App.fireEvent("baea_mode_fault_rupture:offset_feature_type_changed", {
                value: current_offset_feature_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnConcreteFoundation_Change() {
        try {
            current_offset_feature_type = Alloy.Globals.replaceCharAt(3, current_offset_feature_type, $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation.get_value());
            Ti.App.fireEvent("baea_mode_fault_rupture:offset_feature_type_changed", {
                value: current_offset_feature_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPipeline_Change() {
        try {
            current_offset_feature_type = Alloy.Globals.replaceCharAt(4, current_offset_feature_type, $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline.get_value());
            Ti.App.fireEvent("baea_mode_fault_rupture:offset_feature_type_changed", {
                value: current_offset_feature_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change() {
        try {
            current_offset_feature_type = Alloy.Globals.replaceCharAt(5, current_offset_feature_type, $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther.get_value());
            Ti.App.fireEvent("baea_mode_fault_rupture:offset_feature_type_changed", {
                value: current_offset_feature_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsFaultRuptureOffsetFeatureTypeView";
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
    $.__views.baeaModeFaultRuptureOffsetFeatureTypeWindow = Ti.UI.createWindow({
        title: L("baea_mode_fault_rupture_offset_feature_type_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFaultRuptureOffsetFeatureTypeWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeFaultRuptureOffsetFeatureTypeWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewFaultRuptureOffsetFeatureType = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewFaultRuptureOffsetFeatureType"
    });
    $.__views.baeaModeFaultRuptureOffsetFeatureTypeWindow.add($.__views.scrollViewFaultRuptureOffsetFeatureType);
    $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil"
    });
    $.__views.scrollViewFaultRuptureOffsetFeatureType.add($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil);
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil.setParent($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil);
    $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock"
    });
    $.__views.scrollViewFaultRuptureOffsetFeatureType.add($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock);
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock.setParent($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock);
    $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk"
    });
    $.__views.scrollViewFaultRuptureOffsetFeatureType.add($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk);
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk.setParent($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk);
    $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation = Ti.UI.createView({
        top: 210,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation"
    });
    $.__views.scrollViewFaultRuptureOffsetFeatureType.add($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation);
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation.setParent($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation);
    $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline = Ti.UI.createView({
        top: 280,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline"
    });
    $.__views.scrollViewFaultRuptureOffsetFeatureType.add($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline);
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline.setParent($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline);
    $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther = Ti.UI.createView({
        top: 350,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther"
    });
    $.__views.scrollViewFaultRuptureOffsetFeatureType.add($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther);
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther.setParent($.__views.viewAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther);
    $.__views.navigationWindowFaultRuptureOffsetFeatureType = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeFaultRuptureOffsetFeatureTypeWindow,
        id: "navigationWindowFaultRuptureOffsetFeatureType"
    });
    $.__views.navigationWindowFaultRuptureOffsetFeatureType && $.addTopLevelView($.__views.navigationWindowFaultRuptureOffsetFeatureType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_offset_feature_type = args.offset_feature_type;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil.init(L("generic_soil_text_msg"), current_offset_feature_type.charAt(0), OnSoil_Change);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock.init(L("generic_bedrock_text_msg"), current_offset_feature_type.charAt(1), OnBedrock_Change);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk.init(L("generic_road_or_sidewalk_text_msg"), current_offset_feature_type.charAt(2), OnRoadOrSidewalk_Change);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation.init(L("generic_concrete_foundation_text_msg"), current_offset_feature_type.charAt(3), OnConcreteFoundation_Change);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline.init(L("generic_pipeline_text_msg"), current_offset_feature_type.charAt(4), OnPipeline_Change);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther.init(L("generic_other_text_msg"), current_offset_feature_type.charAt(5), OnOther_Change);
        $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther.enabled(view_enabled);
        $.navigationWindowFaultRuptureOffsetFeatureType.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;