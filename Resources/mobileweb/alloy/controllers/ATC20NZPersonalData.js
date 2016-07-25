function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBtnCreateSign_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView", {
                    mode: "ATC20NZ"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnViewSign_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var view_sign_param = null;
                if (Alloy.Globals.ATC20NZCurrentSign) view_sign_param = Alloy.Globals.ATC20NZCurrentSign; else if (Alloy.Globals.ATC20NZCurrentSignPath) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.ATC20NZCurrentSignPath);
                    file && (view_sign_param = file.getNativePath());
                }
                view_sign_param ? Alloy.Globals.createAndOpenControllerExt("ViewSignView", {
                    image: view_sign_param
                }) : alert(L("no_sign_image_available_msg"));
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: L("generic_save_title"),
            message: L("save_confirm_msg"),
            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
            cancel: 1
        });
        alertDialog.addEventListener("click", function(e) {
            0 == e.index ? BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                try {
                    bIsSavingInProgress = true;
                    var bError = false;
                    if (Alloy.Globals.ATC20NZCurrentSign) {
                        Alloy.Globals.ATC20NZCurrentSignPath || (Alloy.Globals.ATC20NZCurrentSignPath = new Date().getTime() + "_sign.png");
                        var file = Alloy.Globals.getFileForWrite(Alloy.Globals.ATC20NZCurrentSignPath);
                        file.exists() && file.deleteFile();
                        if (file.write(Alloy.Globals.ATC20NZCurrentSign)) ; else {
                            Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                            bError = true;
                        }
                    }
                    if (!bError) {
                        if (id) var atc20PDModel = Alloy.createModel("ATC20PD", {
                            ID: id,
                            SIGN_PATH: Alloy.Globals.ATC20NZCurrentSignPath,
                            INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value(),
                            AFFILIATION: $.widgetAppTextFieldAuthority.get_text_value(),
                            MODE: "NZ"
                        }); else var atc20PDModel = Alloy.createModel("ATC20PD", {
                            SIGN_PATH: Alloy.Globals.ATC20NZCurrentSignPath,
                            INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value(),
                            AFFILIATION: $.widgetAppTextFieldAuthority.get_text_value(),
                            MODE: "NZ"
                        });
                        atc20PDModel.save();
                        Alloy.Collections.ATC20ModePD.fetch({
                            query: "SELECT * FROM ATC20PD WHERE MODE='NZ'"
                        });
                        if (Alloy.Collections.ATC20ModePD.length > 0) {
                            var personalData = Alloy.Collections.ATC20ModePD.at(0);
                            id = personalData.get("ID");
                        }
                        bRet = true;
                    }
                } catch (exception) {
                    alert(L("generic_exception_msg") + exception.message);
                } finally {
                    bIsSavingInProgress = false;
                }
                return bRet;
            }) : 1 == e.index;
        });
        alertDialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20NZPersonalData";
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
    $.__views.atc20NZPersonalDataWindow = Ti.UI.createWindow({
        title: L("atc20_nz_mode_edit_inspector_data"),
        backgroundColor: "#ffffcc",
        id: "atc20NZPersonalDataWindow"
    });
    $.__views.atc20NZPersonalDataWindow && $.addTopLevelView($.__views.atc20NZPersonalDataWindow);
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
    $.__views.atc20NZPersonalDataWindow.add($.__views.activity_indicator);
    $.__views.sign_btns_view = Ti.UI.createView({
        top: 20,
        width: 140,
        height: 88,
        id: "sign_btns_view"
    });
    $.__views.atc20NZPersonalDataWindow.add($.__views.sign_btns_view);
    $.__views.viewAppButtonViewSign = Ti.UI.createView({
        top: 0,
        left: 0,
        width: 60,
        height: 88,
        id: "viewAppButtonViewSign"
    });
    $.__views.sign_btns_view.add($.__views.viewAppButtonViewSign);
    $.__views.widgetAppButtonViewSign = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonViewSign",
        __parentSymbol: $.__views.viewAppButtonViewSign
    });
    $.__views.widgetAppButtonViewSign.setParent($.__views.viewAppButtonViewSign);
    $.__views.viewAppButtonCreateSign = Ti.UI.createView({
        top: 0,
        left: 80,
        width: 60,
        height: 88,
        id: "viewAppButtonCreateSign"
    });
    $.__views.sign_btns_view.add($.__views.viewAppButtonCreateSign);
    $.__views.widgetAppButtonCreateSign = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonCreateSign",
        __parentSymbol: $.__views.viewAppButtonCreateSign
    });
    $.__views.widgetAppButtonCreateSign.setParent($.__views.viewAppButtonCreateSign);
    $.__views.scrollView_fields = Ti.UI.createScrollView({
        top: 124,
        scrollType: "vertical",
        id: "scrollView_fields"
    });
    $.__views.atc20NZPersonalDataWindow.add($.__views.scrollView_fields);
    $.__views.viewAppTextFieldInspectorID = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldInspectorID"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldInspectorID);
    $.__views.widgetAppTextFieldInspectorID = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldInspectorID",
        __parentSymbol: $.__views.viewAppTextFieldInspectorID
    });
    $.__views.widgetAppTextFieldInspectorID.setParent($.__views.viewAppTextFieldInspectorID);
    $.__views.viewAppTextFieldAuthority = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAuthority"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldAuthority);
    $.__views.widgetAppTextFieldAuthority = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAuthority",
        __parentSymbol: $.__views.viewAppTextFieldAuthority
    });
    $.__views.widgetAppTextFieldAuthority.setParent($.__views.viewAppTextFieldAuthority);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 140,
        width: 72,
        id: "viewAppButtonSave"
    });
    $.__views.scrollView_fields.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    controls.push($.widgetAppButtonSave.get_button());
    controls.push($.widgetAppButtonCreateSign.get_button());
    controls.push($.widgetAppButtonViewSign.get_button());
    var id = null;
    var bIsSavingInProgress = false;
    try {
        Alloy.Collections.ATC20ModePD.fetch({
            query: "SELECT * FROM ATC20PD WHERE MODE='NZ'"
        });
        if (Alloy.Collections.ATC20ModePD.length > 0) {
            var personalData = Alloy.Collections.ATC20ModePD.at(0);
            $.widgetAppTextFieldInspectorID.set_text_value(personalData.get("INSPECTOR_ID"));
            $.widgetAppTextFieldAuthority.set_text_value(personalData.get("AFFILIATION"));
            id = personalData.get("ID");
            Alloy.Globals.ATC20NZCurrentSignPath = personalData.get("SIGN_PATH");
        } else Alloy.Globals.ATC20NZCurrentSignPath = "";
        Alloy.Globals.ATC20NZCurrentSign = null;
        $.widgetAppTextFieldInspectorID.init(L("generic_inspector_id_txt_hint"));
        $.widgetAppTextFieldAuthority.init(L("generic_authority_txt_hint"));
        $.widgetAppButtonCreateSign.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_btn_title"), OnBtnCreateSign_Click);
        $.widgetAppButtonViewSign.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_btn_title"), OnBtnViewSign_Click);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.atc20NZPersonalDataWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;