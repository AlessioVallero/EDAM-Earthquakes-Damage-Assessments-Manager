function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnSite_Change(e) {
        Alloy.Globals.ShedModeShedCharacteristics["SITE"] = e.id;
    }
    function OnNotUndergroundPlansNo_Change(e) {
        Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] = e.id;
    }
    function OnUsage_Change(e) {
        Alloy.Globals.ShedModeShedCharacteristics["USAGE"] = e.id;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsShedCharacteristicsView";
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
    $.__views.shedModeShedCharacteristicsWindow = Ti.UI.createWindow({
        title: L("shed_mode_shed_characteristics_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeShedCharacteristicsWindow"
    });
    $.__views.shedModeShedCharacteristicsWindow && $.addTopLevelView($.__views.shedModeShedCharacteristicsWindow);
    $.__views.scrollViewShedCharacteristics = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewShedCharacteristics"
    });
    $.__views.shedModeShedCharacteristicsWindow.add($.__views.scrollViewShedCharacteristics);
    $.__views.viewSite = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewSite"
    });
    $.__views.scrollViewShedCharacteristics.add($.__views.viewSite);
    $.__views.widgetAppComboBoxShedModeShedCharacteristicsSite = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeShedCharacteristicsSite",
        __parentSymbol: $.__views.viewSite
    });
    $.__views.widgetAppComboBoxShedModeShedCharacteristicsSite.setParent($.__views.viewSite);
    $.__views.viewNotUndergroundPlansNo = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewNotUndergroundPlansNo"
    });
    $.__views.scrollViewShedCharacteristics.add($.__views.viewNotUndergroundPlansNo);
    $.__views.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo",
        __parentSymbol: $.__views.viewNotUndergroundPlansNo
    });
    $.__views.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo.setParent($.__views.viewNotUndergroundPlansNo);
    $.__views.viewUsage = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 200,
        id: "viewUsage"
    });
    $.__views.scrollViewShedCharacteristics.add($.__views.viewUsage);
    $.__views.widgetAppComboBoxShedModeShedCharacteristicsUsage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeShedCharacteristicsUsage",
        __parentSymbol: $.__views.viewUsage
    });
    $.__views.widgetAppComboBoxShedModeShedCharacteristicsUsage.setParent($.__views.viewUsage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var siteParentView = null;
        var notUndergroundPlansNoParentView = null;
        var usageParentView = null;
        siteParentView = $.viewSite;
        notUndergroundPlansNoParentView = $.viewNotUndergroundPlansNo;
        usageParentView = $.viewUsage;
        var siteValues = {
            0: {
                title: L("generic_site_lowland")
            },
            1: {
                title: L("generic_site_relief")
            },
            2: {
                title: L("generic_site_slope")
            },
            3: {
                title: L("generic_site_valley")
            }
        };
        $.widgetAppComboBoxShedModeShedCharacteristicsSite.init(L("generic_site_text_msg"), siteValues, OnSite_Change, null, siteParentView);
        $.widgetAppComboBoxShedModeShedCharacteristicsSite.enabled(view_enabled);
        Alloy.Globals.ShedModeShedCharacteristics["SITE"] && $.widgetAppComboBoxShedModeShedCharacteristicsSite.set_selected_index(Alloy.Globals.ShedModeShedCharacteristics["SITE"]);
        var notUndergroundPlansNoValues = {
            0: {
                title: "1"
            },
            1: {
                title: "2"
            },
            2: {
                title: ">=3"
            }
        };
        $.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo.init(L("generic_not_underground_plans_no_text_msg"), notUndergroundPlansNoValues, OnNotUndergroundPlansNo_Change, null, notUndergroundPlansNoParentView);
        $.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo.enabled(view_enabled);
        Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] && $.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo.set_selected_index(Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"]);
        var usageValues = {
            0: {
                title: L("generic_productive_text_msg")
            },
            1: {
                title: L("generic_commercial_text_msg")
            },
            2: {
                title: L("generic_deposit_text_msg")
            },
            3: {
                title: L("generic_other_text_msg")
            }
        };
        $.widgetAppComboBoxShedModeShedCharacteristicsUsage.init(L("generic_usage_text_msg"), usageValues, OnUsage_Change, null, usageParentView);
        $.widgetAppComboBoxShedModeShedCharacteristicsUsage.enabled(view_enabled);
        Alloy.Globals.ShedModeShedCharacteristics["USAGE"] && $.widgetAppComboBoxShedModeShedCharacteristicsUsage.set_selected_index(Alloy.Globals.ShedModeShedCharacteristics["USAGE"]);
        $.shedModeShedCharacteristicsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;