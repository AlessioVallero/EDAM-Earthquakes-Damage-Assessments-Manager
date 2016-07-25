function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
                    if (!bError) {
                        if (id) var atc20PDModel = Alloy.createModel("ATC20PD", {
                            ID: id,
                            SIGN_PATH: "",
                            INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value(),
                            AFFILIATION: $.widgetAppTextFieldAffiliation.get_text_value(),
                            MODE: current_mode
                        }); else var atc20PDModel = Alloy.createModel("ATC20PD", {
                            SIGN_PATH: "",
                            INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value(),
                            AFFILIATION: $.widgetAppTextFieldAffiliation.get_text_value(),
                            MODE: current_mode
                        });
                        atc20PDModel.save();
                        Alloy.Collections.ATC20ModePD.fetch({
                            query: "SELECT * FROM ATC20PD WHERE MODE='" + current_mode + "'"
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
    this.__controllerPath = "ATC20PersonalData";
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
    $.__views.atc20PersonalDataWindow = Ti.UI.createWindow({
        title: L("edit_atc20_personal_data_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20PersonalDataWindow"
    });
    $.__views.atc20PersonalDataWindow && $.addTopLevelView($.__views.atc20PersonalDataWindow);
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
    $.__views.atc20PersonalDataWindow.add($.__views.activity_indicator);
    $.__views.scrollView_fields = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollView_fields"
    });
    $.__views.atc20PersonalDataWindow.add($.__views.scrollView_fields);
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
    $.__views.viewAppTextFieldAffiliation = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAffiliation"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldAffiliation);
    $.__views.widgetAppTextFieldAffiliation = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAffiliation",
        __parentSymbol: $.__views.viewAppTextFieldAffiliation
    });
    $.__views.widgetAppTextFieldAffiliation.setParent($.__views.viewAppTextFieldAffiliation);
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
    var args = arguments[0] || {};
    var current_mode = args.mode;
    "undefined" != typeof current_mode || (current_mode = "CA");
    var controls = new Array();
    controls.push($.widgetAppButtonSave.get_button());
    var id = null;
    var bIsSavingInProgress = false;
    try {
        Alloy.Collections.ATC20ModePD.fetch({
            query: "SELECT * FROM ATC20PD WHERE MODE='" + current_mode + "'"
        });
        if (Alloy.Collections.ATC20ModePD.length > 0) {
            var personalData = Alloy.Collections.ATC20ModePD.at(0);
            $.widgetAppTextFieldInspectorID.set_text_value(personalData.get("INSPECTOR_ID"));
            $.widgetAppTextFieldAffiliation.set_text_value(personalData.get("AFFILIATION"));
            id = personalData.get("ID");
        }
        $.widgetAppTextFieldInspectorID.init(L("generic_inspector_id_txt_hint"));
        $.widgetAppTextFieldAffiliation.init(L("generic_affiliation_txt_hint"));
        RegisterHideKeyboard($.atc20PersonalDataWindow, [ $.widgetAppTextFieldInspectorID.get_text_field(), $.widgetAppTextFieldAffiliation.get_text_field() ]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.atc20PersonalDataWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;