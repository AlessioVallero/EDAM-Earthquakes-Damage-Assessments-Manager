function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnNotIdentified_Change() {
        try {
            var newMasonryStructureValue = Alloy.Globals.replaceCharAt(5 * current_masonry_structure, Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"], $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified.get_value());
            Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTypeOneWithoutChains_Change() {
        try {
            var newMasonryStructureValue = Alloy.Globals.replaceCharAt(5 * current_masonry_structure + 1, Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"], $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains.get_value());
            Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTypeOneWithChains_Change() {
        try {
            var newMasonryStructureValue = Alloy.Globals.replaceCharAt(5 * current_masonry_structure + 2, Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"], $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains.get_value());
            Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTypeTwoWithoutChains_Change() {
        try {
            var newMasonryStructureValue = Alloy.Globals.replaceCharAt(5 * current_masonry_structure + 3, Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"], $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains.get_value());
            Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTypeTwoWithChains_Change() {
        try {
            var newMasonryStructureValue = Alloy.Globals.replaceCharAt(5 * current_masonry_structure + 4, Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"], $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains.get_value());
            Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionThreeMasonryStructures";
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
    $.__views.aedesModeSectionThreeMasonryStructuresWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_three_masonry_structures_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionThreeMasonryStructuresWindow"
    });
    $.__views.aedesModeSectionThreeMasonryStructuresWindow && $.addTopLevelView($.__views.aedesModeSectionThreeMasonryStructuresWindow);
    $.__views.scrollViewSectionThreeMasonryStructures = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionThreeMasonryStructures"
    });
    $.__views.aedesModeSectionThreeMasonryStructuresWindow.add($.__views.scrollViewSectionThreeMasonryStructures);
    $.__views.lblAeDESModeFormsSectionThreeHorizontalMasonryStructures = Ti.UI.createLabel({
        text: L("generic_horizontal_masonry_structures_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeHorizontalMasonryStructures"
    });
    $.__views.scrollViewSectionThreeMasonryStructures.add($.__views.lblAeDESModeFormsSectionThreeHorizontalMasonryStructures);
    $.__views.lblAeDESModeFormsSectionThreeHorizontalMasonryStructuresFatherTitle = Ti.UI.createLabel({
        top: 30,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeHorizontalMasonryStructuresFatherTitle"
    });
    $.__views.scrollViewSectionThreeMasonryStructures.add($.__views.lblAeDESModeFormsSectionThreeHorizontalMasonryStructuresFatherTitle);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified = Ti.UI.createView({
        top: 60,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified"
    });
    $.__views.scrollViewSectionThreeMasonryStructures.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains = Ti.UI.createView({
        top: 130,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains"
    });
    $.__views.scrollViewSectionThreeMasonryStructures.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains = Ti.UI.createView({
        top: 200,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains"
    });
    $.__views.scrollViewSectionThreeMasonryStructures.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains = Ti.UI.createView({
        top: 270,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains"
    });
    $.__views.scrollViewSectionThreeMasonryStructures.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains = Ti.UI.createView({
        top: 340,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains"
    });
    $.__views.scrollViewSectionThreeMasonryStructures.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_masonry_structure = args.masonry_structure_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.lblAeDESModeFormsSectionThreeHorizontalMasonryStructuresFatherTitle.setText(current_father_title);
        var masonryStructureValue = Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"];
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified.init(L("generic_not_identified_text_msg"), masonryStructureValue.charAt(5 * current_masonry_structure), OnNotIdentified_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains.init(L("generic_type_one_without_chains_text_msg"), masonryStructureValue.charAt(5 * current_masonry_structure + 1), OnTypeOneWithoutChains_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains.init(L("generic_type_one_with_chains_text_msg"), masonryStructureValue.charAt(5 * current_masonry_structure + 2), OnTypeOneWithChains_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains.init(L("generic_type_two_without_chains_text_msg"), masonryStructureValue.charAt(5 * current_masonry_structure + 3), OnTypeTwoWithoutChains_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains.init(L("generic_type_two_with_chains_text_msg"), masonryStructureValue.charAt(5 * current_masonry_structure + 4), OnTypeTwoWithChains_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains.enabled(view_enabled);
        $.aedesModeSectionThreeMasonryStructuresWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;