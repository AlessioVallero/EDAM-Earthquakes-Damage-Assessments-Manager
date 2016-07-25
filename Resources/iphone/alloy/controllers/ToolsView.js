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
        Back({
            changed_propagation_event_enabled: false
        });
    }
    function Back(data) {
        try {
            controls = null;
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "language:changed");
            data && data.changed_propagation_event_enabled ? Ti.App.fireEvent("language:changed_propagation") : Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "language:changed_propagation");
            $.navigationWindowToolsView.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OpenLoginRegisterLogout() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if (current_is_logged) BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    EndAsyncBusyAction($.activity_indicator, controls);
                    Alloy.Globals.ResetSession();
                    Back();
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator, controls);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                var params = {
                    key: "EDAM",
                    SID: Alloy.Globals.SessionId
                };
                loader.timeout = Alloy.Globals.LogoutTimeoutMillisecs;
                loader.open("POST", "https://www.edam.resiltronics.org/Security/Sessione_Logout.php");
                loader.send(params);
            }); else {
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", Back);
                Alloy.Globals.createAndOpenControllerExt("UserAuthenticationView");
            }
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
            bContinue = true;
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
            loader.open("POST", "https://www.edam.resiltronics.org/LoadUsersLocations.php");
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
    function OpenEditProfile() {
        try {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            Alloy.Globals.createAndOpenControllerExt("EditProfileView");
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
                    emailDialog.toRecipients = [ "edam@resiltronics.org" ];
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
    function OpenAboutUs() {
        try {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            Alloy.Globals.createAndOpenControllerExt("AboutUsView");
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
                    OpenLoginRegisterLogout();
                    break;

                  case 1:
                    OpenUsersLocations();
                    break;

                  case 2:
                    OpenChangeLanguage();
                    break;

                  case 3:
                    current_is_logged ? OpenEditProfile() : OpenSendErrors();
                    break;

                  case 4:
                    current_is_logged ? OpenSendErrors() : OpenAboutUs();
                    break;

                  case 5:
                    OpenAboutUs();
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
    $.__views.toolsViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        title: L("tools_view_title"),
        id: "toolsViewWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.toolsViewWindow.leftNavButton = $.__views.btn_ios_back;
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
    var __alloyId172 = [];
    $.__views.tableViewToolsRowLoginRegisterLogout = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowLoginRegisterLogout"
    });
    __alloyId172.push($.__views.tableViewToolsRowLoginRegisterLogout);
    $.__views.tableViewToolsRowLoginRegisterLogoutImg = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        id: "tableViewToolsRowLoginRegisterLogoutImg"
    });
    $.__views.tableViewToolsRowLoginRegisterLogout.add($.__views.tableViewToolsRowLoginRegisterLogoutImg);
    $.__views.tableViewToolsRowLoginRegisterLogoutLbl = Ti.UI.createLabel({
        left: 50,
        color: "black",
        id: "tableViewToolsRowLoginRegisterLogoutLbl"
    });
    $.__views.tableViewToolsRowLoginRegisterLogout.add($.__views.tableViewToolsRowLoginRegisterLogoutLbl);
    $.__views.tableViewToolsRowUsersLocations = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowUsersLocations"
    });
    __alloyId172.push($.__views.tableViewToolsRowUsersLocations);
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
    __alloyId172.push($.__views.tableViewToolsRowChangeLanguage);
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
    $.__views.tableViewToolsRowEditProfile = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowEditProfile"
    });
    __alloyId172.push($.__views.tableViewToolsRowEditProfile);
    $.__views.tableViewToolsRowEditProfileImg = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/edit_profile.png",
        id: "tableViewToolsRowEditProfileImg"
    });
    $.__views.tableViewToolsRowEditProfile.add($.__views.tableViewToolsRowEditProfileImg);
    $.__views.tableViewToolsRowEditProfileLbl = Ti.UI.createLabel({
        left: 50,
        color: "black",
        text: L("table_tools_edit_profile_title"),
        id: "tableViewToolsRowEditProfileLbl"
    });
    $.__views.tableViewToolsRowEditProfile.add($.__views.tableViewToolsRowEditProfileLbl);
    $.__views.tableViewToolsRowSendErrors = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowSendErrors"
    });
    __alloyId172.push($.__views.tableViewToolsRowSendErrors);
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
    $.__views.tableViewToolsRowAboutUs = Ti.UI.createTableViewRow({
        height: 50,
        hasChild: true,
        className: "tools",
        id: "tableViewToolsRowAboutUs"
    });
    __alloyId172.push($.__views.tableViewToolsRowAboutUs);
    $.__views.tableViewToolsRowAboutUsImg = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/about_us.png",
        id: "tableViewToolsRowAboutUsImg"
    });
    $.__views.tableViewToolsRowAboutUs.add($.__views.tableViewToolsRowAboutUsImg);
    $.__views.tableViewToolsRowAboutUsLbl = Ti.UI.createLabel({
        left: 50,
        color: "black",
        text: L("table_tools_about_us_title"),
        id: "tableViewToolsRowAboutUsLbl"
    });
    $.__views.tableViewToolsRowAboutUs.add($.__views.tableViewToolsRowAboutUsLbl);
    $.__views.tableViewTools = Ti.UI.createTableView({
        top: 0,
        height: 300,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        data: __alloyId172,
        id: "tableViewTools"
    });
    $.__views.scrollViewToolsView.add($.__views.tableViewTools);
    OnTableViewTools_Click ? $.__views.tableViewTools.addEventListener("click", OnTableViewTools_Click) : __defers["$.__views.tableViewTools!click!OnTableViewTools_Click"] = true;
    $.__views.navigationWindowToolsView = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.toolsViewWindow,
        id: "navigationWindowToolsView"
    });
    $.__views.navigationWindowToolsView && $.addTopLevelView($.__views.navigationWindowToolsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_logged = args.is_logged;
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.tableViewTools);
    var bIsWorkInProgress = false;
    var bCanClickOnTableView = true;
    try {
        if (current_is_logged) {
            $.tableViewToolsRowLoginRegisterLogoutImg.setImage("/images/logout.png");
            $.tableViewToolsRowLoginRegisterLogoutLbl.setText(L("table_tools_logout_title"));
        } else {
            $.tableViewToolsRowLoginRegisterLogoutImg.setImage("/images/login.png");
            $.tableViewToolsRowLoginRegisterLogoutLbl.setText(L("table_tools_login_register_title"));
            $.tableViewTools.deleteRow(3);
            $.tableViewTools.setHeight(250);
        }
        $.navigationWindowToolsView.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewTools!click!OnTableViewTools_Click"] && $.__views.tableViewTools.addEventListener("click", OnTableViewTools_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;