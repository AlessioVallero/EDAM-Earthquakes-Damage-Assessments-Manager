function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function ManageOpening(controller_name, index) {
        EndAsyncBusyAction($.activity_indicator, controls);
        if (0 == index) {
            switch (controller_name) {
              case "UsersResidentsModeView":
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", OpenUsersResidentsMode);
                break;

              case "ProfessionalModeView":
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", OpenProfessionalMode);
            }
            Alloy.Globals.createAndOpenControllerExt("UserAuthenticationView");
        } else Alloy.Globals.createAndOpenControllerExt(controller_name);
    }
    function OpenMode(controller_name) {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
                Alloy.Globals.ResetSession();
                Alloy.Globals.createAndOpenControllerExt(controller_name);
            } else BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                if (Alloy.Globals.ExistSession()) {
                    var loader = Titanium.Network.createHTTPClient();
                    loader.validatesSecureCertificate = false;
                    loader.onload = function() {
                        if ("Expired" == this.responseText) {
                            Alloy.Globals.ResetSession();
                            var alertDialog = Titanium.UI.createAlertDialog({
                                title: L("generic_need_authentication_title"),
                                message: L("authentication_confirm_msg"),
                                buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                                cancel: 1
                            });
                            alertDialog.addEventListener("click", function(e) {
                                ManageOpening(controller_name, e.index);
                            });
                            alertDialog.show();
                        } else {
                            EndAsyncBusyAction($.activity_indicator, controls);
                            Alloy.Globals.createAndOpenControllerExt(controller_name);
                        }
                    };
                    loader.onerror = function() {
                        EndAsyncBusyAction($.activity_indicator, controls);
                        var alertDialog = Titanium.UI.createAlertDialog({
                            title: L("generic_connection_problem_occurred_title"),
                            message: L("connection_problem_occurred_text_msg"),
                            buttonNames: [ L("generic_not_authenticated_msg"), L("generic_retry_msg") ],
                            cancel: 1
                        });
                        alertDialog.addEventListener("click", function(event) {
                            if (0 == event.index) {
                                Alloy.Globals.ResetSession();
                                Alloy.Globals.createAndOpenControllerExt(controller_name);
                            } else OpenMode(controller_name);
                        });
                        alertDialog.show();
                    };
                    var params = {
                        key: "EDAM",
                        SID: Alloy.Globals.SessionId,
                        ECHO_ENABLED: true
                    };
                    loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs;
                    loader.open("POST", "https://areeweb.polito.it/IRUSAT/Security/Sessione_Controllo.php");
                    loader.send(params);
                } else {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_need_authentication_title"),
                        message: L("authentication_confirm_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        ManageOpening(controller_name, e.index);
                    });
                    alertDialog.show();
                }
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OpenUsersResidentsMode() {
        Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "auth:done", OpenUsersResidentsMode);
        Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeView");
    }
    function OpenProfessionalMode() {
        Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "auth:done", OpenProfessionalMode);
        Alloy.Globals.createAndOpenControllerExt("ProfessionalModeView");
    }
    function OnBtnUsersResidentsMode_Click() {
        OpenMode("UsersResidentsModeView");
    }
    function OnBtnProfessionalMode_Click() {
        OpenMode("ProfessionalModeView");
    }
    function RetranslateUI() {
        Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "language:changed_propagation", RetranslateUI);
        $.lblChooseMode.setText(L("main_choose_mode"));
        $.lblDevelopedBy.setText(L("main_developed_by"));
        $.btn_users_residents_mode.setTitle(L("main_users_residents_mode"));
        $.btn_professional_mode.setTitle(L("main_professional_mode"));
        $.widgetAppButtonAboutUs.set_label_text(L("generic_about_us_title"));
        $.widgetAppButtonTools.set_label_text(L("generic_tools_title"));
    }
    function OnBtnAboutUs_Click() {
        try {
            Alloy.Globals.createAndOpenControllerExt("AboutUsView");
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnTools_Click() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "language:changed_propagation", RetranslateUI);
            Alloy.Globals.createAndOpenControllerExt("ToolsView");
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.mainWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "mainWindow"
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
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
    $.__views.mainWindow.add($.__views.activity_indicator);
    $.__views.mainView = Ti.UI.createView({
        backgroundColor: "#ffffcc",
        id: "mainView"
    });
    $.__views.mainWindow.add($.__views.mainView);
    $.__views.lblChooseMode = Ti.UI.createLabel({
        text: L("main_choose_mode"),
        width: "auto",
        height: "auto",
        color: "#000",
        top: "5%",
        font: {
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblChooseMode"
    });
    $.__views.mainView.add($.__views.lblChooseMode);
    $.__views.imageViewAppLogo = Ti.UI.createImageView({
        top: "25%",
        height: "30%",
        image: "/images/app_logo.png",
        id: "imageViewAppLogo"
    });
    $.__views.mainView.add($.__views.imageViewAppLogo);
    $.__views.lblDevelopedBy = Ti.UI.createLabel({
        text: L("main_developed_by"),
        top: "55%",
        height: "8%",
        color: "#000",
        font: {
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblDevelopedBy"
    });
    $.__views.mainView.add($.__views.lblDevelopedBy);
    $.__views.btn_users_residents_mode = Ti.UI.createButton({
        title: L("main_users_residents_mode"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "64%",
        width: 110,
        height: "14%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "14"
        },
        id: "btn_users_residents_mode"
    });
    $.__views.mainView.add($.__views.btn_users_residents_mode);
    OnBtnUsersResidentsMode_Click ? $.__views.btn_users_residents_mode.addEventListener("click", OnBtnUsersResidentsMode_Click) : __defers["$.__views.btn_users_residents_mode!click!OnBtnUsersResidentsMode_Click"] = true;
    $.__views.btn_professional_mode = Ti.UI.createButton({
        title: L("main_professional_mode"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "82%",
        width: 110,
        height: "14%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "14"
        },
        id: "btn_professional_mode"
    });
    $.__views.mainView.add($.__views.btn_professional_mode);
    OnBtnProfessionalMode_Click ? $.__views.btn_professional_mode.addEventListener("click", OnBtnProfessionalMode_Click) : __defers["$.__views.btn_professional_mode!click!OnBtnProfessionalMode_Click"] = true;
    $.__views.viewAppButtonAboutUs = Ti.UI.createView({
        top: "64%",
        left: 3,
        height: 100,
        width: 60,
        id: "viewAppButtonAboutUs"
    });
    $.__views.mainView.add($.__views.viewAppButtonAboutUs);
    $.__views.widgetAppButtonAboutUs = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonAboutUs",
        __parentSymbol: $.__views.viewAppButtonAboutUs
    });
    $.__views.widgetAppButtonAboutUs.setParent($.__views.viewAppButtonAboutUs);
    $.__views.viewAppButtonTools = Ti.UI.createView({
        top: "64%",
        right: 3,
        height: 100,
        width: 60,
        id: "viewAppButtonTools"
    });
    $.__views.mainView.add($.__views.viewAppButtonTools);
    $.__views.widgetAppButtonTools = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonTools",
        __parentSymbol: $.__views.viewAppButtonTools
    });
    $.__views.widgetAppButtonTools.setParent($.__views.viewAppButtonTools);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var controls = new Array();
    controls.push($.btn_users_residents_mode);
    controls.push($.btn_professional_mode);
    controls.push($.widgetAppButtonAboutUs.get_button());
    controls.push($.widgetAppButtonTools.get_button());
    try {
        $.widgetAppButtonAboutUs.init("/images/about_us_normal.png", "/images/about_us_pressed.png", "/images/about_us_disabled.png", L("generic_about_us_title"), OnBtnAboutUs_Click);
        $.widgetAppButtonTools.init("/images/tools_normal.png", "/images/tools_pressed.png", "/images/tools_disabled.png", L("generic_tools_title"), OnBtnTools_Click);
        $.mainWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_users_residents_mode!click!OnBtnUsersResidentsMode_Click"] && $.__views.btn_users_residents_mode.addEventListener("click", OnBtnUsersResidentsMode_Click);
    __defers["$.__views.btn_professional_mode!click!OnBtnProfessionalMode_Click"] && $.__views.btn_professional_mode.addEventListener("click", OnBtnProfessionalMode_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;