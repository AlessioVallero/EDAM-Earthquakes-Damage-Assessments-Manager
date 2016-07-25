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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "form:save_from_section");
            $.navigationWindowSectionFive.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewAeDESModeFormsSectionFiveNonStructuralDamage_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionFiveNonStructuralDamageDamages", {
                non_structural_element_id: e.index,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionFiveView";
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
    $.__views.aedesModeSectionFiveWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_five_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionFiveWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.aedesModeSectionFiveWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewSectionFive = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionFive"
    });
    $.__views.aedesModeSectionFiveWindow.add($.__views.scrollViewSectionFive);
    $.__views.lblAeDESModeFormsSectionFiveNonStructuralDamage = Ti.UI.createLabel({
        text: L("generic_non_structural_damage_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveNonStructuralDamage"
    });
    $.__views.scrollViewSectionFive.add($.__views.lblAeDESModeFormsSectionFiveNonStructuralDamage);
    var __alloyId46 = [];
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowPdCC = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowPdCC"
    });
    __alloyId46.push($.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowPdCC);
    $.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowPdCC = Ti.UI.createLabel({
        text: L("generic_pdcc_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveNonStructuralDamageRowPdCC"
    });
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowPdCC.add($.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowPdCC);
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingTilesChimneys = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingTilesChimneys"
    });
    __alloyId46.push($.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingTilesChimneys);
    $.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingTilesChimneys = Ti.UI.createLabel({
        text: L("generic_falling_tiles_chimneys_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingTilesChimneys"
    });
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingTilesChimneys.add($.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingTilesChimneys);
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingCornicesParapets = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingCornicesParapets"
    });
    __alloyId46.push($.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingCornicesParapets);
    $.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingCornicesParapets = Ti.UI.createLabel({
        text: L("generic_falling_cornices_parapets_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingCornicesParapets"
    });
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingCornicesParapets.add($.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingCornicesParapets);
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingInternalExternalObjects = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingInternalExternalObjects"
    });
    __alloyId46.push($.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingInternalExternalObjects);
    $.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingInternalExternalObjects = Ti.UI.createLabel({
        text: L("generic_falling_internal_external_objects_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingInternalExternalObjects"
    });
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowFallingInternalExternalObjects.add($.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowFallingInternalExternalObjects);
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowWaterSupplySewerageOrThermohydraulicDamage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowWaterSupplySewerageOrThermohydraulicDamage"
    });
    __alloyId46.push($.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowWaterSupplySewerageOrThermohydraulicDamage);
    $.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowWaterSupplySewerageOrThermohydraulicDamage = Ti.UI.createLabel({
        text: L("generic_water_supply_sewerage_or_thermohydraulic_damage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveNonStructuralDamageRowWaterSupplySewerageOrThermohydraulicDamage"
    });
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowWaterSupplySewerageOrThermohydraulicDamage.add($.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowWaterSupplySewerageOrThermohydraulicDamage);
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowMainsElectricityOrGasDamage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowMainsElectricityOrGasDamage"
    });
    __alloyId46.push($.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowMainsElectricityOrGasDamage);
    $.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowMainsElectricityOrGasDamage = Ti.UI.createLabel({
        text: L("generic_mains_electricity_or_gas_damage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFiveNonStructuralDamageRowMainsElectricityOrGasDamage"
    });
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamageRowMainsElectricityOrGasDamage.add($.__views.lblAeDESModeFormsSectionFiveNonStructuralDamageRowMainsElectricityOrGasDamage);
    $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamage = Ti.UI.createTableView({
        top: 30,
        backgroundColor: "#ffffff",
        height: 300,
        width: Ti.UI.FILL,
        data: __alloyId46,
        id: "tableViewAeDESModeFormsSectionFiveNonStructuralDamage"
    });
    $.__views.scrollViewSectionFive.add($.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamage);
    OnTableViewAeDESModeFormsSectionFiveNonStructuralDamage_Click ? $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamage.addEventListener("click", OnTableViewAeDESModeFormsSectionFiveNonStructuralDamage_Click) : __defers["$.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamage!click!OnTableViewAeDESModeFormsSectionFiveNonStructuralDamage_Click"] = true;
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 340,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionFive.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowSectionFive = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.aedesModeSectionFiveWindow,
        id: "navigationWindowSectionFive"
    });
    $.__views.navigationWindowSectionFive && $.addTopLevelView($.__views.navigationWindowSectionFive);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.navigationWindowSectionFive.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamage!click!OnTableViewAeDESModeFormsSectionFiveNonStructuralDamage_Click"] && $.__views.tableViewAeDESModeFormsSectionFiveNonStructuralDamage.addEventListener("click", OnTableViewAeDESModeFormsSectionFiveNonStructuralDamage_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;