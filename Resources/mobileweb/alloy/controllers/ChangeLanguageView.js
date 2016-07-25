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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "language:changed");
            $.changeLanguageViewWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnChangeLanguage_Change(e) {
        try {
            currentLanguage = e.id;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnDone_Click() {
        try {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: L("change_language_title"),
                message: L("change_language_is_done_confirm_msg"),
                buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                cancel: 1
            });
            alertDialog.addEventListener("click", function(e) {
                if (0 == e.index) {
                    Alloy.Globals.CurrentLanguageSelectedIndex = currentLanguage;
                    Ti.App.Properties.setString("current_language", currentLanguage);
                    var locale;
                    var locale = require("com.shareourideas.locale");
                    switch (currentLanguage) {
                      case "0":
                        locale.setLocale("en");
                        break;

                      case "1":
                        locale.setLocale("it");
                        break;

                      case "2":
                        locale.setLocale("es");
                        break;

                      default:
                        locale.setLocale("en");
                    }
                    Ti.App.fireEvent("language:changed", {
                        changed_propagation_event_enabled: true
                    });
                    Back();
                }
            });
            alertDialog.show();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ChangeLanguageView";
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
    $.__views.changeLanguageViewWindow = Ti.UI.createWindow({
        title: L("change_language_view_title"),
        backgroundColor: "#ffffcc",
        id: "changeLanguageViewWindow"
    });
    $.__views.changeLanguageViewWindow && $.addTopLevelView($.__views.changeLanguageViewWindow);
    OnAndroidBackButton_Click ? $.__views.changeLanguageViewWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.changeLanguageViewWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.changeLanguageViewWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.changeLanguageViewWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.scrollViewChangeLanguage = Ti.UI.createScrollView({
        top: 20,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewChangeLanguage"
    });
    $.__views.changeLanguageViewWindow.add($.__views.scrollViewChangeLanguage);
    $.__views.viewAppComboBoxChangeLanguage = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxChangeLanguage"
    });
    $.__views.scrollViewChangeLanguage.add($.__views.viewAppComboBoxChangeLanguage);
    $.__views.widgetAppComboBoxChangeLanguage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxChangeLanguage",
        __parentSymbol: $.__views.viewAppComboBoxChangeLanguage
    });
    $.__views.widgetAppComboBoxChangeLanguage.setParent($.__views.viewAppComboBoxChangeLanguage);
    $.__views.viewAppButtonDone = Ti.UI.createView({
        top: 80,
        width: 60,
        height: 84,
        id: "viewAppButtonDone"
    });
    $.__views.scrollViewChangeLanguage.add($.__views.viewAppButtonDone);
    $.__views.widgetAppButtonDone = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonDone",
        __parentSymbol: $.__views.viewAppButtonDone
    });
    $.__views.widgetAppButtonDone.setParent($.__views.viewAppButtonDone);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var currentLanguage = "";
    try {
        var changeLanguageParentView = null;
        changeLanguageParentView = $.viewAppComboBoxChangeLanguage;
        switch (Alloy.Globals.CurrentLanguageSelectedIndex) {
          case "0":
            var changeLanguageValues = {
                1: {
                    title: L("generic_italian_text_msg")
                },
                2: {
                    title: L("generic_spanish_text_msg")
                }
            };
            currentLanguage = "1";
            break;

          case "1":
            var changeLanguageValues = {
                0: {
                    title: L("generic_english_text_msg")
                },
                2: {
                    title: L("generic_spanish_text_msg")
                }
            };
            currentLanguage = "0";
            break;

          case "2":
            var changeLanguageValues = {
                0: {
                    title: L("generic_english_text_msg")
                },
                1: {
                    title: L("generic_italian_text_msg")
                }
            };
            currentLanguage = "0";
            break;

          default:
            var changeLanguageValues = {
                1: {
                    title: L("generic_italian_text_msg")
                },
                2: {
                    title: L("generic_spanish_text_msg")
                }
            };
            currentLanguage = "1";
        }
        $.widgetAppComboBoxChangeLanguage.init(L("generic_change_language_text_msg"), changeLanguageValues, OnChangeLanguage_Change, null, changeLanguageParentView);
        $.widgetAppComboBoxChangeLanguage.enabled(true);
        $.widgetAppComboBoxChangeLanguage.set_selected_index(currentLanguage);
        $.widgetAppButtonDone.init("/images/done_normal.png", "/images/done_pressed.png", "/images/done_disabled.png", L("generic_done_btn_title"), OnBtnDone_Click);
        $.changeLanguageViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.changeLanguageViewWindow!android:back!OnAndroidBackButton_Click"] && $.__views.changeLanguageViewWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.changeLanguageViewWindow!androidback!OnAndroidBackButton_Click"] && $.__views.changeLanguageViewWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;