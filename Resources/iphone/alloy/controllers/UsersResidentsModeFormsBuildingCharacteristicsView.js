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
            $.navigationWindowBuildingCharacteristics.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnSite_Change(e) {
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] = e.id;
    }
    function OnUndergroundPlansNo_Change(e) {
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] = e.id;
    }
    function OnNotUndergroundPlansNo_Change(e) {
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] = e.id;
    }
    function OnUsage_Change(e) {
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"] = e.id;
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "UsersResidentsModeFormsBuildingCharacteristicsView";
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
    $.__views.usersResidentsModeBuildingCharacteristicsWindow = Ti.UI.createWindow({
        title: L("users_residents_mode_building_characteristics_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsModeBuildingCharacteristicsWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.usersResidentsModeBuildingCharacteristicsWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewBuildingCharacteristics = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewBuildingCharacteristics"
    });
    $.__views.usersResidentsModeBuildingCharacteristicsWindow.add($.__views.scrollViewBuildingCharacteristics);
    $.__views.viewSite = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewSite"
    });
    $.__views.scrollViewBuildingCharacteristics.add($.__views.viewSite);
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite",
        __parentSymbol: $.__views.viewSite
    });
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite.setParent($.__views.viewSite);
    $.__views.viewUndergroundPlansNo = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewUndergroundPlansNo"
    });
    $.__views.scrollViewBuildingCharacteristics.add($.__views.viewUndergroundPlansNo);
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo",
        __parentSymbol: $.__views.viewUndergroundPlansNo
    });
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo.setParent($.__views.viewUndergroundPlansNo);
    $.__views.viewNotUndergroundPlansNo = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewNotUndergroundPlansNo"
    });
    $.__views.scrollViewBuildingCharacteristics.add($.__views.viewNotUndergroundPlansNo);
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo",
        __parentSymbol: $.__views.viewNotUndergroundPlansNo
    });
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo.setParent($.__views.viewNotUndergroundPlansNo);
    $.__views.viewUsage = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewUsage"
    });
    $.__views.scrollViewBuildingCharacteristics.add($.__views.viewUsage);
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage",
        __parentSymbol: $.__views.viewUsage
    });
    $.__views.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage.setParent($.__views.viewUsage);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 280,
        width: 60,
        height: 80,
        bottom: 280,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewBuildingCharacteristics.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowBuildingCharacteristics = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.usersResidentsModeBuildingCharacteristicsWindow,
        id: "navigationWindowBuildingCharacteristics"
    });
    $.__views.navigationWindowBuildingCharacteristics && $.addTopLevelView($.__views.navigationWindowBuildingCharacteristics);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var siteParentView = null;
        var undergroundPlansNoParentView = null;
        var notUndergroundPlansNoParentView = null;
        var usageParentView = null;
        var thisView = $.getView();
        siteParentView = thisView;
        undergroundPlansNoParentView = thisView;
        notUndergroundPlansNoParentView = thisView;
        usageParentView = thisView;
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
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
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite.init(L("generic_site_text_msg"), siteValues, OnSite_Change, null, siteParentView);
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] && $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite.set_selected_index(Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"]);
        var undergroundPlansNoValues = {
            0: {
                title: "0"
            },
            1: {
                title: "1"
            },
            2: {
                title: "2"
            },
            3: {
                title: ">2"
            }
        };
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo.init(L("generic_underground_plans_no_text_msg"), undergroundPlansNoValues, OnUndergroundPlansNo_Change, null, undergroundPlansNoParentView);
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] && $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo.set_selected_index(Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"]);
        var notUndergroundPlansNoValues = {
            0: {
                title: "0"
            },
            1: {
                title: "1"
            },
            2: {
                title: "2"
            },
            3: {
                title: "3"
            },
            4: {
                title: "4"
            },
            5: {
                title: "5"
            },
            6: {
                title: "6"
            },
            7: {
                title: "7"
            },
            8: {
                title: "8"
            },
            9: {
                title: "9"
            },
            10: {
                title: "10"
            },
            11: {
                title: "11"
            },
            12: {
                title: "12"
            },
            12: {
                title: ">12"
            }
        };
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo.init(L("generic_not_underground_plans_no_text_msg"), notUndergroundPlansNoValues, OnNotUndergroundPlansNo_Change, null, notUndergroundPlansNoParentView);
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] && $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo.set_selected_index(Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"]);
        var usageValues = {
            0: {
                title: L("generic_housing_text_msg")
            },
            1: {
                title: L("generic_productive_text_msg")
            },
            2: {
                title: L("generic_commercial_text_msg")
            },
            3: {
                title: L("generic_offices_text_msg")
            },
            4: {
                title: L("generic_public_services_text_msg")
            },
            5: {
                title: L("generic_deposit_text_msg")
            },
            6: {
                title: L("generic_other_text_msg")
            }
        };
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage.init(L("generic_usage_text_msg"), usageValues, OnUsage_Change, null, usageParentView);
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"] && $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage.set_selected_index(Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"]);
        $.navigationWindowBuildingCharacteristics.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;