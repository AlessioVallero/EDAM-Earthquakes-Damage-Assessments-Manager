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
        Back();
    }
    function Back() {
        try {
            $.navigationWindowATC20PD.close();
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
    var __defers = {};
    $.__views.atc20PersonalDataWindow = Ti.UI.createWindow({
        title: L("edit_atc20_personal_data_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20PersonalDataWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.atc20PersonalDataWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.btn_ios_Save = Ti.UI.createButton({
        title: L("generic_save_btn_title"),
        id: "btn_ios_Save"
    });
    OnBtnSave_Click ? $.__views.btn_ios_Save.addEventListener("click", OnBtnSave_Click) : __defers["$.__views.btn_ios_Save!click!OnBtnSave_Click"] = true;
    $.__views.atc20PersonalDataWindow.rightNavButton = $.__views.btn_ios_Save;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        color: "#000",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 11,
            fontWeight: "bold"
        },
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
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
    $.__views.navigationWindowATC20PD = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.atc20PersonalDataWindow,
        id: "navigationWindowATC20PD"
    });
    $.__views.navigationWindowATC20PD && $.addTopLevelView($.__views.navigationWindowATC20PD);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    "undefined" != typeof current_mode || (current_mode = "CA");
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.btn_ios_Save);
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
        $.navigationWindowATC20PD.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btn_ios_Save!click!OnBtnSave_Click"] && $.__views.btn_ios_Save.addEventListener("click", OnBtnSave_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;