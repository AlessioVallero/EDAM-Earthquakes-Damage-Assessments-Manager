function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionSixView";
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
    $.__views.aedesModeSectionSixWindow && $.addTopLevelView($.__views.aedesModeSectionSixWindow);
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
    var __alloyId22 = [];
    $.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings"
    });
    __alloyId22.push($.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowCollapsesOrFallsFromOtherBuildings);
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
    __alloyId22.push($.__views.tableViewAeDESModeFormsSectionSixExternalDangerRowRuptureOfDistributionNetworks);
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
        data: __alloyId22,
        id: "tableViewAeDESModeFormsSectionSixExternalDanger"
    });
    $.__views.scrollViewSectionSix.add($.__views.tableViewAeDESModeFormsSectionSixExternalDanger);
    OnTableViewAeDESModeFormsSectionSixExternalDanger_Click ? $.__views.tableViewAeDESModeFormsSectionSixExternalDanger.addEventListener("click", OnTableViewAeDESModeFormsSectionSixExternalDanger_Click) : __defers["$.__views.tableViewAeDESModeFormsSectionSixExternalDanger!click!OnTableViewAeDESModeFormsSectionSixExternalDanger_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.aedesModeSectionSixWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewAeDESModeFormsSectionSixExternalDanger!click!OnTableViewAeDESModeFormsSectionSixExternalDanger_Click"] && $.__views.tableViewAeDESModeFormsSectionSixExternalDanger.addEventListener("click", OnTableViewAeDESModeFormsSectionSixExternalDanger_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;