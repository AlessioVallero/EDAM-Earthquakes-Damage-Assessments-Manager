function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTableViewUsersResidentsModeView_Click(e) {
        try {
            bCanClickOnTableView && BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                switch (e.index) {
                  case 1:
                    Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeForms");
                    break;

                  default:
                    Alloy.Globals.createAndOpenControllerExt("ComingSoonView");
                }
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "UsersResidentsModeView";
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
    $.__views.usersResidentsModeViewWindow = Ti.UI.createWindow({
        title: L("users_residents_mode_view_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsModeViewWindow"
    });
    $.__views.usersResidentsModeViewWindow && $.addTopLevelView($.__views.usersResidentsModeViewWindow);
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        color: "#000",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 11,
            fontWeight: "bold"
        },
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        zIndex: 1,
        id: "activity_indicator"
    });
    $.__views.usersResidentsModeViewWindow.add($.__views.activity_indicator);
    var __alloyId49 = [];
    $.__views.tableViewUsersResidentsModeRowBayAreaEarthquakeAllianceForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewUsersResidentsModeRowBayAreaEarthquakeAllianceForms"
    });
    __alloyId49.push($.__views.tableViewUsersResidentsModeRowBayAreaEarthquakeAllianceForms);
    $.__views.imgUsersResidentsModeRowBayAreaEarthquakeAllianceForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/bay_area_earthquake_alliance_forms.png",
        id: "imgUsersResidentsModeRowBayAreaEarthquakeAllianceForms"
    });
    $.__views.tableViewUsersResidentsModeRowBayAreaEarthquakeAllianceForms.add($.__views.imgUsersResidentsModeRowBayAreaEarthquakeAllianceForms);
    $.__views.lblUsersResidentsModeRowBayAreaEarthquakeAllianceForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("bay_area_earthquake_alliance_forms_row_title"),
        color: "#000",
        id: "lblUsersResidentsModeRowBayAreaEarthquakeAllianceForms"
    });
    $.__views.tableViewUsersResidentsModeRowBayAreaEarthquakeAllianceForms.add($.__views.lblUsersResidentsModeRowBayAreaEarthquakeAllianceForms);
    $.__views.tableViewUsersResidentsModeRowStandardForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewUsersResidentsModeRowStandardForms"
    });
    __alloyId49.push($.__views.tableViewUsersResidentsModeRowStandardForms);
    $.__views.imgUsersResidentsModeRowStandardForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/standard_forms.png",
        id: "imgUsersResidentsModeRowStandardForms"
    });
    $.__views.tableViewUsersResidentsModeRowStandardForms.add($.__views.imgUsersResidentsModeRowStandardForms);
    $.__views.lblUsersResidentsModeRowStandardForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("standard_forms_row_title"),
        color: "#000",
        id: "lblUsersResidentsModeRowStandardForms"
    });
    $.__views.tableViewUsersResidentsModeRowStandardForms.add($.__views.lblUsersResidentsModeRowStandardForms);
    $.__views.tableViewUsersResidentsModeView = Ti.UI.createTableView({
        top: 10,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        data: __alloyId49,
        id: "tableViewUsersResidentsModeView"
    });
    $.__views.usersResidentsModeViewWindow.add($.__views.tableViewUsersResidentsModeView);
    OnTableViewUsersResidentsModeView_Click ? $.__views.tableViewUsersResidentsModeView.addEventListener("click", OnTableViewUsersResidentsModeView_Click) : __defers["$.__views.tableViewUsersResidentsModeView!click!OnTableViewUsersResidentsModeView_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    controls.push($.tableViewUsersResidentsModeView);
    var bCanClickOnTableView = true;
    try {
        $.usersResidentsModeViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewUsersResidentsModeView!click!OnTableViewUsersResidentsModeView_Click"] && $.__views.tableViewUsersResidentsModeView.addEventListener("click", OnTableViewUsersResidentsModeView_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;