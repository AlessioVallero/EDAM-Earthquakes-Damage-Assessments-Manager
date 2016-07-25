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
            $.navigationWindowSectionFiveNonStructuralDamage.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPresenceOfDamage_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(6 * current_non_structural_element, Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"], $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage.get_value());
            Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRemoval_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(6 * current_non_structural_element + 1, Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"], $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval.get_value());
            Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnProps_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(6 * current_non_structural_element + 2, Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"], $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps.get_value());
            Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRepair_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(6 * current_non_structural_element + 3, Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"], $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair.get_value());
            Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnDenialOfAccess_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(6 * current_non_structural_element + 4, Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"], $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess.get_value());
            Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnStepsProtection_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(6 * current_non_structural_element + 5, Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"], $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection.get_value());
            Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionFiveNonStructuralDamageDamages";
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
    $.__views.aedesModeSectionFiveNonStructuralDamageWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_five_damages_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionFiveNonStructuralDamageWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.aedesModeSectionFiveNonStructuralDamageWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewSectionFiveNonStructuralDamage = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionFiveNonStructuralDamage"
    });
    $.__views.aedesModeSectionFiveNonStructuralDamageWindow.add($.__views.scrollViewSectionFiveNonStructuralDamage);
    $.__views.lblAeDESModeFormsSectionFiveDamageType = Ti.UI.createLabel({
        text: L("generic_damage_type_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveDamageType"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.lblAeDESModeFormsSectionFiveDamageType);
    $.__views.lblAeDESModeFormsSectionFiveDamageTypeFatherTitle = Ti.UI.createLabel({
        top: 30,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveDamageTypeFatherTitle"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.lblAeDESModeFormsSectionFiveDamageTypeFatherTitle);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage = Ti.UI.createView({
        top: 60,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval = Ti.UI.createView({
        top: 130,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps = Ti.UI.createView({
        top: 200,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair = Ti.UI.createView({
        top: 270,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess = Ti.UI.createView({
        top: 340,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection = Ti.UI.createView({
        top: 410,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection"
    });
    $.__views.scrollViewSectionFiveNonStructuralDamage.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection);
    $.__views.navigationWindowSectionFiveNonStructuralDamage = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.aedesModeSectionFiveNonStructuralDamageWindow,
        id: "navigationWindowSectionFiveNonStructuralDamage"
    });
    $.__views.navigationWindowSectionFiveNonStructuralDamage && $.addTopLevelView($.__views.navigationWindowSectionFiveNonStructuralDamage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_non_structural_element = args.non_structural_element_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.lblAeDESModeFormsSectionFiveDamageTypeFatherTitle.setText(current_father_title);
        var damageTypeValue = Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"];
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage.init(L("generic_presence_of_damage_text_msg"), damageTypeValue.charAt(6 * current_non_structural_element), OnPresenceOfDamage_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval.init(L("generic_removal_text_msg"), damageTypeValue.charAt(6 * current_non_structural_element + 1), OnRemoval_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps.init(L("generic_props_text_msg"), damageTypeValue.charAt(6 * current_non_structural_element + 2), OnProps_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair.init(L("generic_repair_text_msg"), damageTypeValue.charAt(6 * current_non_structural_element + 3), OnRepair_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess.init(L("generic_denial_of_access_text_msg"), damageTypeValue.charAt(6 * current_non_structural_element + 4), OnDenialOfAccess_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection.init(L("generic_steps_protection_text_msg"), damageTypeValue.charAt(6 * current_non_structural_element + 5), OnStepsProtection_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection.enabled(view_enabled);
        $.navigationWindowSectionFiveNonStructuralDamage.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;