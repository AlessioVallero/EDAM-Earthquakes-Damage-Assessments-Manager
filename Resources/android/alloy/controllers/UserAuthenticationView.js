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
        Back();
    }
    function Back() {
        try {
            controls = null;
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "auth:done");
            $.tabUserAuthentication.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnLogin_Click() {
        try {
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator_login, controls, function() {
                var bRet = false;
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    EndAsyncBusyAction($.activity_indicator_login, controls);
                    var json = this.responseText;
                    var response = JSON.parse(json);
                    if (true == response.OK && response.SessionID) {
                        var sid = response.SessionID;
                        Alloy.Globals.SessionId = sid;
                        Alloy.Globals.SetSessionId(sid);
                        var sUsername = response.Username;
                        Alloy.Globals.SessionUsername = sUsername;
                        Ti.App.Properties.setString("session_username", sUsername);
                        var sGroup = response.Group;
                        Alloy.Globals.SessionGroup = sGroup;
                        Ti.App.Properties.setString("session_group", sGroup);
                        Alloy.Globals.RememberMeUsername = sUsername;
                        Ti.App.Properties.setString("remember_me_username", sUsername);
                        var sPassword = $.widgetAppTextFieldLoginPassword.get_text_value();
                        Alloy.Globals.RememberMePassword = sPassword;
                        Alloy.Globals.SetRememberMePassword(sPassword);
                        Ti.App.fireEvent("auth:done");
                        $.tabUserAuthentication.close();
                    } else switch (response.ErrorType) {
                      case "LoginIncomplete":
                        alert(L("login_login_incomplete_text_msg"));
                        break;

                      case "ConnectionError":
                        alert(L("login_connection_error_text_msg"));
                        break;

                      case "InvalidLogin":
                        alert(L("login_invalid_login_text_msg"));
                        break;

                      case "UnexpectedError":
                        Alloy.Globals.AlertUserAndLogAsync(L("login_unexpected_error_text_msg"));
                    }
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator_login, controls);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                var params = {
                    key: "EDAM",
                    username: $.widgetAppTextFieldLoginUsername.get_text_value(),
                    password: $.widgetAppTextFieldLoginPassword.get_text_value()
                };
                loader.timeout = Alloy.Globals.LoginRegistrationTimeoutMillisecs;
                loader.open("POST", "https://www.edam.resiltronics.org/Login_Registration/Login_Registration.php?type=login");
                loader.send(params);
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnRegister_Click() {
        try {
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator_register, controls, function() {
                var bRet = false;
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    EndAsyncBusyAction($.activity_indicator_register, controls);
                    var json = this.responseText;
                    var response = JSON.parse(json);
                    if (true == response.OK && response.SessionID) {
                        var sid = response.SessionID;
                        Alloy.Globals.SessionId = sid;
                        Ti.App.Properties.setString("session_id", sid);
                        var sUsername = response.Username;
                        Alloy.Globals.SessionUsername = sUsername;
                        Ti.App.Properties.setString("session_username", sUsername);
                        var sGroup = response.Group;
                        Alloy.Globals.SessionGroup = sGroup;
                        Ti.App.Properties.setString("session_group", sGroup);
                        Ti.App.fireEvent("auth:done");
                        $.tabUserAuthentication.close();
                    } else switch (response.ErrorType) {
                      case "Incomplete":
                        alert(L("register_incomplete_text_msg"));
                        break;

                      case "PasswordDontMatch":
                        alert(L("register_password_dont_match_text_msg"));
                        break;

                      case "ConnectionError":
                        alert(L("register_connection_error_text_msg"));
                        break;

                      case "UsernameAlreadyExist":
                        alert(L("register_username_already_exist_text_msg"));
                        break;

                      case "EmailAlreadyExist":
                        alert(L("register_email_already_exist_text_msg"));
                        break;

                      case "UnexpectedError":
                        Alloy.Globals.AlertUserAndLogAsync(L("register_unexpected_error_text_msg"));
                        break;

                      case "EmailNotValid":
                        alert(L("register_email_not_valid_text_msg"));
                    }
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator_register, controls);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                var currentLocale = "";
                currentLocale = "es" == Ti.Locale.currentLanguage ? "es" : "it" == Ti.Locale.currentLanguage ? "it" : "en";
                var params = {
                    key: "EDAM",
                    name: $.widgetAppTextFieldRegisterName.get_text_value(),
                    group: $.widgetAppTextFieldRegisterGroup.get_text_value(),
                    username: $.widgetAppTextFieldRegisterUsername.get_text_value(),
                    email: $.widgetAppTextFieldRegisterEmail.get_text_value(),
                    pass: $.widgetAppTextFieldRegisterPassword.get_text_value(),
                    lang: currentLocale,
                    pass2: $.widgetAppTextFieldRegisterPasswordConfirm.get_text_value()
                };
                loader.timeout = Alloy.Globals.LoginRegistrationTimeoutMillisecs;
                loader.open("POST", "https://www.edam.resiltronics.org/Login_Registration/Login_Registration.php?type=reg");
                loader.send(params);
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "UserAuthenticationView";
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
    var __alloyId77 = [];
    $.__views.loginWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "loginWindow"
    });
    OnAndroidBackButton_Click ? $.__views.loginWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.loginWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.loginWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.loginWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator_login = Ti.UI.createActivityIndicator({
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
        id: "activity_indicator_login"
    });
    $.__views.loginWindow.add($.__views.activity_indicator_login);
    $.__views.scrollViewLogin = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLogin"
    });
    $.__views.loginWindow.add($.__views.scrollViewLogin);
    $.__views.viewAppTextFieldLoginUsername = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldLoginUsername"
    });
    $.__views.scrollViewLogin.add($.__views.viewAppTextFieldLoginUsername);
    $.__views.widgetAppTextFieldLoginUsername = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldLoginUsername",
        __parentSymbol: $.__views.viewAppTextFieldLoginUsername
    });
    $.__views.widgetAppTextFieldLoginUsername.setParent($.__views.viewAppTextFieldLoginUsername);
    $.__views.viewAppTextFieldLoginPassword = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldLoginPassword"
    });
    $.__views.scrollViewLogin.add($.__views.viewAppTextFieldLoginPassword);
    $.__views.widgetAppTextFieldLoginPassword = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldLoginPassword",
        __parentSymbol: $.__views.viewAppTextFieldLoginPassword
    });
    $.__views.widgetAppTextFieldLoginPassword.setParent($.__views.viewAppTextFieldLoginPassword);
    $.__views.viewAppButtonLogin = Ti.UI.createView({
        top: 140,
        width: 60,
        id: "viewAppButtonLogin"
    });
    $.__views.scrollViewLogin.add($.__views.viewAppButtonLogin);
    $.__views.widgetAppButtonLogin = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonLogin",
        __parentSymbol: $.__views.viewAppButtonLogin
    });
    $.__views.widgetAppButtonLogin.setParent($.__views.viewAppButtonLogin);
    $.__views.tabLogin = Ti.UI.createTab({
        title: L("user_authentication_login_view_title"),
        backgroundColor: "#ffffcc",
        icon: "/images/login.png",
        window: $.__views.loginWindow,
        id: "tabLogin"
    });
    __alloyId77.push($.__views.tabLogin);
    $.__views.registerWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "registerWindow"
    });
    OnAndroidBackButton_Click ? $.__views.registerWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.registerWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.registerWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.registerWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator_register = Ti.UI.createActivityIndicator({
        id: "activity_indicator_register"
    });
    $.__views.registerWindow.add($.__views.activity_indicator_register);
    $.__views.scrollViewRegister = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewRegister"
    });
    $.__views.registerWindow.add($.__views.scrollViewRegister);
    $.__views.viewAppTextFieldRegisterUsername = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldRegisterUsername"
    });
    $.__views.scrollViewRegister.add($.__views.viewAppTextFieldRegisterUsername);
    $.__views.widgetAppTextFieldRegisterUsername = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldRegisterUsername",
        __parentSymbol: $.__views.viewAppTextFieldRegisterUsername
    });
    $.__views.widgetAppTextFieldRegisterUsername.setParent($.__views.viewAppTextFieldRegisterUsername);
    $.__views.viewAppTextFieldRegisterPassword = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldRegisterPassword"
    });
    $.__views.scrollViewRegister.add($.__views.viewAppTextFieldRegisterPassword);
    $.__views.widgetAppTextFieldRegisterPassword = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldRegisterPassword",
        __parentSymbol: $.__views.viewAppTextFieldRegisterPassword
    });
    $.__views.widgetAppTextFieldRegisterPassword.setParent($.__views.viewAppTextFieldRegisterPassword);
    $.__views.viewAppTextFieldRegisterPasswordConfirm = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldRegisterPasswordConfirm"
    });
    $.__views.scrollViewRegister.add($.__views.viewAppTextFieldRegisterPasswordConfirm);
    $.__views.widgetAppTextFieldRegisterPasswordConfirm = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldRegisterPasswordConfirm",
        __parentSymbol: $.__views.viewAppTextFieldRegisterPasswordConfirm
    });
    $.__views.widgetAppTextFieldRegisterPasswordConfirm.setParent($.__views.viewAppTextFieldRegisterPasswordConfirm);
    $.__views.viewAppTextFieldRegisterName = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldRegisterName"
    });
    $.__views.scrollViewRegister.add($.__views.viewAppTextFieldRegisterName);
    $.__views.widgetAppTextFieldRegisterName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldRegisterName",
        __parentSymbol: $.__views.viewAppTextFieldRegisterName
    });
    $.__views.widgetAppTextFieldRegisterName.setParent($.__views.viewAppTextFieldRegisterName);
    $.__views.viewAppTextFieldRegisterGroup = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldRegisterGroup"
    });
    $.__views.scrollViewRegister.add($.__views.viewAppTextFieldRegisterGroup);
    $.__views.widgetAppTextFieldRegisterGroup = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldRegisterGroup",
        __parentSymbol: $.__views.viewAppTextFieldRegisterGroup
    });
    $.__views.widgetAppTextFieldRegisterGroup.setParent($.__views.viewAppTextFieldRegisterGroup);
    $.__views.viewAppTextFieldRegisterEmail = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldRegisterEmail"
    });
    $.__views.scrollViewRegister.add($.__views.viewAppTextFieldRegisterEmail);
    $.__views.widgetAppTextFieldRegisterEmail = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldRegisterEmail",
        __parentSymbol: $.__views.viewAppTextFieldRegisterEmail
    });
    $.__views.widgetAppTextFieldRegisterEmail.setParent($.__views.viewAppTextFieldRegisterEmail);
    $.__views.viewAppButtonRegister = Ti.UI.createView({
        top: 420,
        width: 60,
        id: "viewAppButtonRegister"
    });
    $.__views.scrollViewRegister.add($.__views.viewAppButtonRegister);
    $.__views.widgetAppButtonRegister = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonRegister",
        __parentSymbol: $.__views.viewAppButtonRegister
    });
    $.__views.widgetAppButtonRegister.setParent($.__views.viewAppButtonRegister);
    $.__views.tabRegister = Ti.UI.createTab({
        title: L("user_authentication_register_view_title"),
        backgroundColor: "#ffffcc",
        icon: "/images/register.png",
        window: $.__views.registerWindow,
        id: "tabRegister"
    });
    __alloyId77.push($.__views.tabRegister);
    $.__views.tabUserAuthentication = Ti.UI.createTabGroup({
        title: L("user_authentication_view_title"),
        tabs: __alloyId77,
        id: "tabUserAuthentication"
    });
    $.__views.tabUserAuthentication && $.addTopLevelView($.__views.tabUserAuthentication);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var controls = new Array();
    controls.push($.widgetAppButtonLogin.get_button());
    controls.push($.widgetAppButtonRegister.get_button());
    try {
        $.widgetAppTextFieldLoginUsername.init(L("generic_username_txt_hint"), null, null, null, true);
        $.widgetAppTextFieldLoginPassword.initPassword(L("generic_password_txt_hint"));
        $.widgetAppTextFieldRegisterUsername.init(L("generic_username_txt_hint"), null, null, null, true);
        $.widgetAppTextFieldRegisterPassword.initPassword(L("generic_password_txt_hint"));
        $.widgetAppTextFieldRegisterPasswordConfirm.initPassword(L("generic_password_confirm_txt_hint"));
        $.widgetAppTextFieldRegisterName.init(L("generic_name_txt_hint"));
        $.widgetAppTextFieldRegisterGroup.init(L("generic_group_txt_hint"));
        $.widgetAppTextFieldRegisterEmail.init(L("generic_email_txt_hint"));
        $.widgetAppButtonLogin.init("/images/login_normal.png", "/images/login_pressed.png", "/images/login_disabled.png", L("generic_login_title"), OnBtnLogin_Click);
        $.widgetAppButtonRegister.init("/images/register_normal.png", "/images/register_pressed.png", "/images/register_disabled.png", L("generic_register_title"), OnBtnRegister_Click);
        $.widgetAppTextFieldLoginUsername.set_text_value(Alloy.Globals.RememberMeUsername);
        $.widgetAppTextFieldLoginPassword.set_text_value(Alloy.Globals.RememberMePassword);
        RegisterHideKeyboard($.loginWindow, [ $.widgetAppTextFieldLoginUsername.get_text_field(), $.widgetAppTextFieldLoginPassword.get_text_field() ]);
        RegisterHideKeyboard($.registerWindow, [ $.widgetAppTextFieldRegisterUsername.get_text_field(), $.widgetAppTextFieldRegisterPassword.get_text_field(), $.widgetAppTextFieldRegisterPasswordConfirm.get_text_field(), $.widgetAppTextFieldRegisterName.get_text_field(), $.widgetAppTextFieldRegisterGroup.get_text_field(), $.widgetAppTextFieldRegisterEmail.get_text_field() ]);
        $.tabUserAuthentication.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.loginWindow!android:back!OnAndroidBackButton_Click"] && $.__views.loginWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.loginWindow!androidback!OnAndroidBackButton_Click"] && $.__views.loginWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.registerWindow!android:back!OnAndroidBackButton_Click"] && $.__views.registerWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.registerWindow!androidback!OnAndroidBackButton_Click"] && $.__views.registerWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;