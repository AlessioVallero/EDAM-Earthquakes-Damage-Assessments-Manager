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
            $.editProfileWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnDone_Click() {
        try {
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    EndAsyncBusyAction($.activity_indicator, controls);
                    var json = this.responseText;
                    var response = JSON.parse(json);
                    if (true == response.OK) {
                        var sPassword = $.widgetAppTextFieldEditProfilePassword.get_text_value();
                        Alloy.Globals.RememberMePassword = sPassword;
                        Alloy.Globals.SetRememberMePassword(sPassword);
                        var sGroup = response.Group;
                        Alloy.Globals.SessionGroup = sGroup;
                        Ti.App.Properties.setString("session_group", sGroup);
                        Back();
                    } else switch (response.ErrorType) {
                      case "EditProfileIncomplete":
                        alert(L("edit_profile_edit_profile_incomplete_text_msg"));
                        break;

                      case "InvalidUsername":
                        alert(L("edit_profile_invalid_username_text_msg"));
                        break;

                      case "InvalidOldPassword":
                        alert(L("edit_profile_invalid_old_password_text_msg"));
                        break;

                      case "PasswordDontMatch":
                        alert(L("edit_profile_password_dont_match_text_msg"));
                        break;

                      case "EmailAlreadyExist":
                        alert(L("edit_profile_email_already_exist_text_msg"));
                        break;

                      case "EmailNotValid":
                        alert(L("edit_profile_email_not_valid_text_msg"));
                        break;

                      case "ConnectionError":
                        alert(L("edit_profile_connection_error_text_msg"));
                        break;

                      case "UnexpectedError":
                        Alloy.Globals.AlertUserAndLogAsync(L("edit_profile_unexpected_error_text_msg"));
                    }
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator, controls);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                var params = {
                    key: "EDAM",
                    username: Alloy.Globals.SessionUsername,
                    old_pass: $.widgetAppTextFieldEditProfileOldPassword.get_text_value(),
                    pass: $.widgetAppTextFieldEditProfilePassword.get_text_value(),
                    pass2: $.widgetAppTextFieldEditProfilePasswordConfirm.get_text_value(),
                    name: $.widgetAppTextFieldEditProfileName.get_text_value(),
                    group: $.widgetAppTextFieldEditProfileGroup.get_text_value(),
                    email: $.widgetAppTextFieldEditProfileEmail.get_text_value()
                };
                loader.timeout = Alloy.Globals.LoginRegistrationTimeoutMillisecs;
                loader.open("POST", "https://www.edam.resiltronics.org/Login_Registration/Login_Registration.php?type=edit_profile");
                loader.send(params);
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "EditProfileView";
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
    $.__views.editProfileWindow = Ti.UI.createWindow({
        title: L("edit_profile_view_title"),
        backgroundColor: "#ffffcc",
        id: "editProfileWindow"
    });
    $.__views.editProfileWindow && $.addTopLevelView($.__views.editProfileWindow);
    OnAndroidBackButton_Click ? $.__views.editProfileWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.editProfileWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.editProfileWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.editProfileWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.editProfileWindow.add($.__views.activity_indicator);
    $.__views.scrollViewEditProfile = Ti.UI.createScrollView({
        top: 0,
        scrollType: "vertical",
        id: "scrollViewEditProfile"
    });
    $.__views.editProfileWindow.add($.__views.scrollViewEditProfile);
    $.__views.lblEditProfileUsername = Ti.UI.createLabel({
        color: "#000",
        top: 5,
        font: {
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblEditProfileUsername"
    });
    $.__views.scrollViewEditProfile.add($.__views.lblEditProfileUsername);
    $.__views.viewAppTextFieldEditProfileOldPassword = Ti.UI.createView({
        top: 35,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldEditProfileOldPassword"
    });
    $.__views.scrollViewEditProfile.add($.__views.viewAppTextFieldEditProfileOldPassword);
    $.__views.widgetAppTextFieldEditProfileOldPassword = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldEditProfileOldPassword",
        __parentSymbol: $.__views.viewAppTextFieldEditProfileOldPassword
    });
    $.__views.widgetAppTextFieldEditProfileOldPassword.setParent($.__views.viewAppTextFieldEditProfileOldPassword);
    $.__views.viewAppTextFieldEditProfilePassword = Ti.UI.createView({
        top: 105,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldEditProfilePassword"
    });
    $.__views.scrollViewEditProfile.add($.__views.viewAppTextFieldEditProfilePassword);
    $.__views.widgetAppTextFieldEditProfilePassword = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldEditProfilePassword",
        __parentSymbol: $.__views.viewAppTextFieldEditProfilePassword
    });
    $.__views.widgetAppTextFieldEditProfilePassword.setParent($.__views.viewAppTextFieldEditProfilePassword);
    $.__views.viewAppTextFieldEditProfilePasswordConfirm = Ti.UI.createView({
        top: 175,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldEditProfilePasswordConfirm"
    });
    $.__views.scrollViewEditProfile.add($.__views.viewAppTextFieldEditProfilePasswordConfirm);
    $.__views.widgetAppTextFieldEditProfilePasswordConfirm = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldEditProfilePasswordConfirm",
        __parentSymbol: $.__views.viewAppTextFieldEditProfilePasswordConfirm
    });
    $.__views.widgetAppTextFieldEditProfilePasswordConfirm.setParent($.__views.viewAppTextFieldEditProfilePasswordConfirm);
    $.__views.viewAppTextFieldEditProfileName = Ti.UI.createView({
        top: 245,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldEditProfileName"
    });
    $.__views.scrollViewEditProfile.add($.__views.viewAppTextFieldEditProfileName);
    $.__views.widgetAppTextFieldEditProfileName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldEditProfileName",
        __parentSymbol: $.__views.viewAppTextFieldEditProfileName
    });
    $.__views.widgetAppTextFieldEditProfileName.setParent($.__views.viewAppTextFieldEditProfileName);
    $.__views.viewAppTextFieldEditProfileGroup = Ti.UI.createView({
        top: 315,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldEditProfileGroup"
    });
    $.__views.scrollViewEditProfile.add($.__views.viewAppTextFieldEditProfileGroup);
    $.__views.widgetAppTextFieldEditProfileGroup = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldEditProfileGroup",
        __parentSymbol: $.__views.viewAppTextFieldEditProfileGroup
    });
    $.__views.widgetAppTextFieldEditProfileGroup.setParent($.__views.viewAppTextFieldEditProfileGroup);
    $.__views.viewAppTextFieldEditProfileEmail = Ti.UI.createView({
        top: 385,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldEditProfileEmail"
    });
    $.__views.scrollViewEditProfile.add($.__views.viewAppTextFieldEditProfileEmail);
    $.__views.widgetAppTextFieldEditProfileEmail = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldEditProfileEmail",
        __parentSymbol: $.__views.viewAppTextFieldEditProfileEmail
    });
    $.__views.widgetAppTextFieldEditProfileEmail.setParent($.__views.viewAppTextFieldEditProfileEmail);
    $.__views.viewAppButtonDone = Ti.UI.createView({
        top: 455,
        width: 60,
        id: "viewAppButtonDone"
    });
    $.__views.scrollViewEditProfile.add($.__views.viewAppButtonDone);
    $.__views.widgetAppButtonDone = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonDone",
        __parentSymbol: $.__views.viewAppButtonDone
    });
    $.__views.widgetAppButtonDone.setParent($.__views.viewAppButtonDone);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var controls = new Array();
    controls.push($.widgetAppButtonDone.get_button());
    try {
        var sEditProfileUsernameText = Alloy.Globals.SessionUsername;
        Alloy.Globals.SessionGroup && (sEditProfileUsernameText = sEditProfileUsernameText + " - " + Alloy.Globals.SessionGroup);
        $.lblEditProfileUsername.setText(sEditProfileUsernameText);
        $.widgetAppTextFieldEditProfileOldPassword.initPassword(L("generic_old_password_txt_hint"));
        $.widgetAppTextFieldEditProfilePassword.initPassword(L("generic_new_password_txt_hint"));
        $.widgetAppTextFieldEditProfilePasswordConfirm.initPassword(L("generic_new_password_confirm_txt_hint"));
        $.widgetAppTextFieldEditProfileName.init(L("generic_name_txt_hint"));
        $.widgetAppTextFieldEditProfileGroup.init(L("generic_group_txt_hint"));
        $.widgetAppTextFieldEditProfileEmail.init(L("generic_email_txt_hint"));
        $.widgetAppButtonDone.init("/images/done_normal.png", "/images/done_pressed.png", "/images/done_disabled.png", L("generic_done_btn_title"), OnBtnDone_Click);
        RegisterHideKeyboard($.editProfileWindow, [ $.widgetAppTextFieldEditProfileOldPassword.get_text_field(), $.widgetAppTextFieldEditProfilePassword.get_text_field(), $.widgetAppTextFieldEditProfilePasswordConfirm.get_text_field(), $.widgetAppTextFieldEditProfileName.get_text_field(), $.widgetAppTextFieldEditProfileGroup.get_text_field(), $.widgetAppTextFieldEditProfileEmail.get_text_field() ]);
        $.editProfileWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.editProfileWindow!android:back!OnAndroidBackButton_Click"] && $.__views.editProfileWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.editProfileWindow!androidback!OnAndroidBackButton_Click"] && $.__views.editProfileWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;