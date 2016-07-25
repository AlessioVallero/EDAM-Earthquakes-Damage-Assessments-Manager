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
            $.navigationWindowSectionSix.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewAeDESModeFormsSectionSixExternalDanger_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionSixExternalDangerPotentialCause", {
                external_danger_id: e.index,
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
    this.__controllerPath = "AeDESModeFormsSectionSixView";
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
    $.__views.aedesModeSectionSixWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_six_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionSixWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.aedesModeSectionSixWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewSectionSix = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionSix"
    });
    $.__views.aedesModeSectionSixWindow.add($.__views.scrollViewSectionSix);
    $.__views.lblAeDESModeFormsSectionSixExternalDanger = Ti.UI.createLabel({
        text: L("generic_external_danger_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionSixExternalDanger"
    });
    $.__views.scrollViewSectionSix.add($.__views.lblAeDESModeFormsSectionSixExternalDanger);
    var __alloyId57 = [];
    $.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings"
    });
    __alloyId57.push($.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings);
    $.__views.lblAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings = Ti.UI.createLabel({
        text: L("generic_collapses_or_falls_from_other_buildings_text_msg"),
        height: 90,
        color: "#000",
        id: "lblAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings"
    });
    $.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings.add($.__views.lblAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings);
    $.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks"
    });
    __alloyId57.push($.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks);
    $.__views.lblAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks = Ti.UI.createLabel({
        text: L("generic_rupture_of_distribution_networks_text_msg"),
        height: 90,
        color: "#000",
        id: "lblAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks"
    });
    $.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks.add($.__views.lblAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks);
    $.__views.tableViewAeDESModeFormsSectionSixExternalDanger = Ti.UI.createTableView({
        top: 30,
        backgroundColor: "#ffffff",
        height: 180,
        width: Ti.UI.FILL,
        data: __alloyId57,
        id: "tableViewAeDESModeFormsSectionSixExternalDanger"
    });
    $.__views.scrollViewSectionSix.add($.__views.tableViewAeDESModeFormsSectionSixExternalDanger);
    OnTableViewAeDESModeFormsSectionSixExternalDanger_Click ? $.__views.tableViewAeDESModeFormsSectionSixExternalDanger.addEventListener("click", OnTableViewAeDESModeFormsSectionSixExternalDanger_Click) : __defers["$.__views.tableViewAeDESModeFormsSectionSixExternalDanger!click!OnTableViewAeDESModeFormsSectionSixExternalDanger_Click"] = true;
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 220,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionSix.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowSectionSix = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.aedesModeSectionSixWindow,
        id: "navigationWindowSectionSix"
    });
    $.__views.navigationWindowSectionSix && $.addTopLevelView($.__views.navigationWindowSectionSix);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.navigationWindowSectionSix.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewAeDESModeFormsSectionSixExternalDanger!click!OnTableViewAeDESModeFormsSectionSixExternalDanger_Click"] && $.__views.tableViewAeDESModeFormsSectionSixExternalDanger.addEventListener("click", OnTableViewAeDESModeFormsSectionSixExternalDanger_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;