function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnGroundBreaks_Change(e) {
        Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] = e.id;
    }
    function OnWaterLeaks_Change(e) {
        Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] = e.id;
    }
    function OnGasLeaks_Change(e) {
        Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] = e.id;
    }
    function OnElectricCurrentOperation_Change(e) {
        Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"] = e.id;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "UsersResidentsModeFormsInfrastructureView";
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
    $.__views.usersResidentsModeInfrastructureWindow = Ti.UI.createWindow({
        title: L("users_residents_mode_infrastructure_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsModeInfrastructureWindow"
    });
    $.__views.usersResidentsModeInfrastructureWindow && $.addTopLevelView($.__views.usersResidentsModeInfrastructureWindow);
    $.__views.scrollViewInfrastructure = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewInfrastructure"
    });
    $.__views.usersResidentsModeInfrastructureWindow.add($.__views.scrollViewInfrastructure);
    $.__views.viewGroundBreaks = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewGroundBreaks"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewGroundBreaks);
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks",
        __parentSymbol: $.__views.viewGroundBreaks
    });
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks.setParent($.__views.viewGroundBreaks);
    $.__views.viewWaterLeaks = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewWaterLeaks"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewWaterLeaks);
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks",
        __parentSymbol: $.__views.viewWaterLeaks
    });
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks.setParent($.__views.viewWaterLeaks);
    $.__views.viewGasLeaks = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewGasLeaks"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewGasLeaks);
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks",
        __parentSymbol: $.__views.viewGasLeaks
    });
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks.setParent($.__views.viewGasLeaks);
    $.__views.viewElectricCurrentOperation = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 150,
        id: "viewElectricCurrentOperation"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewElectricCurrentOperation);
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation",
        __parentSymbol: $.__views.viewElectricCurrentOperation
    });
    $.__views.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation.setParent($.__views.viewElectricCurrentOperation);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var groundBreaksParentView = null;
        var waterLeaksParentView = null;
        var gasLeaksParentView = null;
        var electricCurrentOperationParentView = null;
        groundBreaksParentView = $.viewGroundBreaks;
        waterLeaksParentView = $.viewWaterLeaks;
        gasLeaksParentView = $.viewGasLeaks;
        electricCurrentOperationParentView = $.viewElectricCurrentOperation;
        var groundBreaksValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            },
            2: {
                title: L("generic_i_dont_know_text_msg")
            }
        };
        $.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks.init(L("generic_ground_breaks_text_msg"), groundBreaksValues, OnGroundBreaks_Change, null, groundBreaksParentView);
        $.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] && $.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks.set_selected_index(Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"]);
        var waterLeaksValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            },
            2: {
                title: L("generic_i_dont_know_text_msg")
            }
        };
        $.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks.init(L("generic_water_leaks_text_msg"), waterLeaksValues, OnWaterLeaks_Change, null, waterLeaksParentView);
        $.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] && $.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks.set_selected_index(Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"]);
        var gasLeaksValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            },
            2: {
                title: L("generic_i_dont_know_text_msg")
            }
        };
        $.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks.init(L("generic_gas_leaks_text_msg"), gasLeaksValues, OnGasLeaks_Change, null, gasLeaksParentView);
        $.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] && $.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks.set_selected_index(Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"]);
        var electricCurrentOperationValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            },
            2: {
                title: L("generic_i_dont_know_text_msg")
            }
        };
        $.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation.init(L("generic_electric_current_operation_text_msg"), electricCurrentOperationValues, OnElectricCurrentOperation_Change, null, electricCurrentOperationParentView);
        $.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"] && $.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation.set_selected_index(Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"]);
        $.usersResidentsModeInfrastructureWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;