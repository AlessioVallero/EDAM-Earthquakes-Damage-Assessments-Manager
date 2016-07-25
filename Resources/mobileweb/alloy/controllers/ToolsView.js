function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnAndroidBackButton_Click() {
        bIsWorkInProgress || Back({
            changed_propagation_event_enabled: false
        });
    }
    function Back(data) {
        try {
            controls = null;
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "language:changed");
            data.changed_propagation_event_enabled ? Ti.App.fireEvent("language:changed_propagation") : Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "language:changed_propagation");
            $.toolsViewWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OpenUsersLocations() {
        var bContinue = false;
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_msg"));
        } else {
            var isGooglePlayServicesAvailable = Alloy.Globals.Map.isGooglePlayServicesAvailable();
            switch (isGooglePlayServicesAvailable) {
              case Alloy.Globals.Map.SUCCESS:
                bContinue = true;
                break;

              case Alloy.Globals.Map.SERVICE_MISSING:
                Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_missing_msg"));
                break;

              case Alloy.Globals.Map.SERVICE_VERSION_UPDATE_REQUIRED:
                Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_out_of_date_msg"));
                break;

              case Alloy.Globals.Map.SERVICE_DISABLED:
                Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_disabled_msg"));
                break;

              case Alloy.Globals.Map.SERVICE_INVALID:
                Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_cannot_be_authenticated_msg"));
                break;

              default:
                Alloy.Globals.AlertUserAndLogAsync(L("generic_unexpected_error_err_msg"));
            }
        }
        if (bContinue) {
            var loader = Titanium.Network.createHTTPClient();
            loader.validatesSecureCertificate = false;
            loader.onload = function() {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                var error_occurred = false;
                var json = this.responseText;
                var response = JSON.parse(json);
                if (200 == loader.status) if (true == response.OK) if (response.USERS_LOCATIONS && response.USERS_LOCATIONS.length > 0) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: response.USERS_LOCATIONS
                }); else {
                    var dialog = Ti.UI.createAlertDialog({
                        message: L("no_users_locations_available_msg"),
                        ok: L("generic_ok_msg"),
                        title: L("generic_info_title")
                    });
                    dialog.show();
                } else error_occurred = true; else error_occurred = true;
                if (error_occurred) switch (response.ErrorType) {
                  case "ConnectionError":
                    Alloy.Globals.LogMessage(L("generic_connection_error_err_msg"));
                    break;

                  case "UnexpectedError":
                    Alloy.Globals.LogMessage(L("generic_unexpected_error_err_msg"));
                }
                if (null !== backgroundTimeout) {
                    clearTimeout(backgroundTimeout);
                    backgroundTimeout = null;
                }
            };
            loader.onerror = function(event) {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + event.error);
                if (null !== backgroundTimeout) {
                    clearTimeout(backgroundTimeout);
                    backgroundTimeout = null;
                }
            };
            var params = {
                key: "EDAM"
            };
            loader.timeout = Alloy.Globals.ViewUsersLocationsTimeoutMillisecs;
            loader.open("POST", "https://areeweb.polito.it/IRUSAT/LoadUsersLocations.php");
            loader.send(params);
        } else EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
    }
    function OpenChangeLanguage() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "language:changed", Back);
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            Alloy.Globals.createAndOpenControllerExt("ChangeLanguageView");
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OpenSendErrors() {
        try {
            var recoverErrors = Alloy.createCollection("Errors");
            recoverErrors.fetch({
                query: "SELECT * FROM Errors"
            });
            if (recoverErrors.length > 0) {
                var errors = "";
                for (var i = 0; i < recoverErrors.length; i++) {
                    var error = recoverErrors.at(i);
                    errors = errors + error.get("DATE") + " " + error.get("ERR_MSG") + "\n";
                }
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                var emailDialog = Ti.UI.createEmailDialog();
                if (emailDialog.isSupported()) {
                    emailDialog.subject = L("send_errors_email_dlg_subject");
                    emailDialog.messageBody = errors;
                    emailDialog.toRecipients = [ "edam.helps@gmail.com" ];
                    emailDialog.addEventListener("complete", function(e) {
                        if (e.result == emailDialog.SENT) while (recoverErrors.length > 0) {
                            var model = recoverErrors.at(0);
                            recoverErrors.remove(model);
                            model.destroy();
                        }
                    });
                    emailDialog.open();
                } else alert(L("no_email_client_configured_msg"));
            } else {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                alert(L("no_errors_to_send_msg"));
            }
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewTools_Click(e) {
        try {
            bCanClickOnTableView && BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                bIsWorkInProgress = true;
                if (e.row) switch (e.index) {
                  case 0:
                    OpenUsersLocations();
                    break;

                  case 1:
                    OpenChangeLanguage();
                    break;

                  case 2:
                    OpenSendErrors();
                }
                bRet = true;
                return bRet;
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function EndAsyncBusyAction_CallBack() {
        bIsWorkInProgress = false;
        bCanClickOnTableView = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ToolsView";
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
    $.__views.toolsViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        title: L("tools_view_title"),
        id: "toolsViewWindow"
    });
    $.__views.toolsViewWindow && $.addTopLevelView($.__views.toolsViewWindow);
    OnAndroidBackButton_Click ? $.__views.toolsViewWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.toolsViewWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.toolsViewWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.toolsViewWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        id: "activity_indicator"
    });
    $.__views.toolsViewWindow.add($.__views.activity_indicator);
    $.__views.scrollViewToolsView = Ti.UI.createScrollView({
        top: 20,
        scrollType: "vertical",
        id: "scrollViewToolsView"
    });
    $.__views.toolsViewWindow.add($.__views.scrollViewToolsView);
    var __alloyId40 = [];
    $.__views.tableViewToolsRowUsersLocations = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowUsersLocations"
    });
    __alloyId40.push($.__views.tableViewToolsRowUsersLocations);
    $.__views.tableViewToolsRowUsersLocationsImg = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/google_maps.png",
        id: "tableViewToolsRowUsersLocationsImg"
    });
    $.__views.tableViewToolsRowUsersLocations.add($.__views.tableViewToolsRowUsersLocationsImg);
    $.__views.tableViewToolsRowUsersLocationsLbl = Ti.UI.createLabel({
        left: 50,
        color: "black",
        text: L("table_tools_users_locations_title"),
        id: "tableViewToolsRowUsersLocationsLbl"
    });
    $.__views.tableViewToolsRowUsersLocations.add($.__views.tableViewToolsRowUsersLocationsLbl);
    $.__views.tableViewToolsRowChangeLanguage = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowChangeLanguage"
    });
    __alloyId40.push($.__views.tableViewToolsRowChangeLanguage);
    $.__views.tableViewToolsRowChangeLanguageImg = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/change_language.png",
        id: "tableViewToolsRowChangeLanguageImg"
    });
    $.__views.tableViewToolsRowChangeLanguage.add($.__views.tableViewToolsRowChangeLanguageImg);
    $.__views.tableViewToolsRowChangeLanguageLbl = Ti.UI.createLabel({
        left: 50,
        color: "black",
        text: L("table_tools_change_language_title"),
        id: "tableViewToolsRowChangeLanguageLbl"
    });
    $.__views.tableViewToolsRowChangeLanguage.add($.__views.tableViewToolsRowChangeLanguageLbl);
    $.__views.tableViewToolsRowSendErrors = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowSendErrors"
    });
    __alloyId40.push($.__views.tableViewToolsRowSendErrors);
    $.__views.tableViewToolsRowSendErrorsImg = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/send_errors.png",
        id: "tableViewToolsRowSendErrorsImg"
    });
    $.__views.tableViewToolsRowSendErrors.add($.__views.tableViewToolsRowSendErrorsImg);
    $.__views.tableViewToolsRowSendErrorsLbl = Ti.UI.createLabel({
        left: 50,
        color: "black",
        text: L("table_tools_send_errors_title"),
        id: "tableViewToolsRowSendErrorsLbl"
    });
    $.__views.tableViewToolsRowSendErrors.add($.__views.tableViewToolsRowSendErrorsLbl);
    $.__views.tableViewTools = Ti.UI.createTableView({
        top: 0,
        height: 150,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        data: __alloyId40,
        id: "tableViewTools"
    });
    $.__views.scrollViewToolsView.add($.__views.tableViewTools);
    OnTableViewTools_Click ? $.__views.tableViewTools.addEventListener("click", OnTableViewTools_Click) : __defers["$.__views.tableViewTools!click!OnTableViewTools_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    controls.push($.tableViewTools);
    var bIsWorkInProgress = false;
    var bCanClickOnTableView = true;
    try {
        $.toolsViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.toolsViewWindow!android:back!OnAndroidBackButton_Click"] && $.__views.toolsViewWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.toolsViewWindow!androidback!OnAndroidBackButton_Click"] && $.__views.toolsViewWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewTools!click!OnTableViewTools_Click"] && $.__views.tableViewTools.addEventListener("click", OnTableViewTools_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;