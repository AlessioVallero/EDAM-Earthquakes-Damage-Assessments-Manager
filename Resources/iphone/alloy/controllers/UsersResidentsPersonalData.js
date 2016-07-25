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
            $.navigationWindowURPD.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnCreateSign_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView");
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
                if (Alloy.Globals.UsersResidentsCurrentSign) view_sign_param = Alloy.Globals.UsersResidentsCurrentSign; else if (Alloy.Globals.UsersResidentsCurrentSignPath) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.UsersResidentsCurrentSignPath);
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
                    if (Alloy.Globals.UsersResidentsCurrentSign) {
                        Alloy.Globals.UsersResidentsCurrentSignPath || (Alloy.Globals.UsersResidentsCurrentSignPath = new Date().getTime() + "_sign.png");
                        var file = Alloy.Globals.getFileForWrite(Alloy.Globals.UsersResidentsCurrentSignPath);
                        file.exists() && file.deleteFile();
                        if (file.write(Alloy.Globals.UsersResidentsCurrentSign)) ; else {
                            Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                            bError = true;
                        }
                    }
                    if (!bError) {
                        if (id) var usersResidentsPDModel = Alloy.createModel("UsersResidentsPD", {
                            ID: id,
                            SIGN_PATH: Alloy.Globals.UsersResidentsCurrentSignPath,
                            NAME: $.widgetAppTextFieldName.get_text_value(),
                            CELL_NUMBER: $.widgetAppTextFieldCell.get_text_value(),
                            AGE: $.widgetAppTextFieldAge.get_text_value(),
                            JOB: $.widgetAppTextFieldJob.get_text_value()
                        }); else var usersResidentsPDModel = Alloy.createModel("UsersResidentsPD", {
                            SIGN_PATH: Alloy.Globals.UsersResidentsCurrentSignPath,
                            NAME: $.widgetAppTextFieldName.get_text_value(),
                            CELL_NUMBER: $.widgetAppTextFieldCell.get_text_value(),
                            AGE: $.widgetAppTextFieldAge.get_text_value(),
                            JOB: $.widgetAppTextFieldJob.get_text_value()
                        });
                        usersResidentsPDModel.save();
                        Alloy.Collections.UsersResidentsModePD.fetch({
                            query: "SELECT * FROM UsersResidentsPD"
                        });
                        if (Alloy.Collections.UsersResidentsModePD.length > 0) {
                            var personalData = Alloy.Collections.UsersResidentsModePD.at(0);
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
    this.__controllerPath = "UsersResidentsPersonalData";
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
    $.__views.usersResidentsPersonalDataWindow = Ti.UI.createWindow({
        title: L("edit_users_residents_personal_data_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsPersonalDataWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.usersResidentsPersonalDataWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.btn_ios_Save = Ti.UI.createButton({
        title: L("generic_save_btn_title"),
        id: "btn_ios_Save"
    });
    OnBtnSave_Click ? $.__views.btn_ios_Save.addEventListener("click", OnBtnSave_Click) : __defers["$.__views.btn_ios_Save!click!OnBtnSave_Click"] = true;
    $.__views.usersResidentsPersonalDataWindow.rightNavButton = $.__views.btn_ios_Save;
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
    $.__views.usersResidentsPersonalDataWindow.add($.__views.activity_indicator);
    $.__views.sign_btns_view = Ti.UI.createView({
        top: 20,
        width: 140,
        height: 88,
        id: "sign_btns_view"
    });
    $.__views.usersResidentsPersonalDataWindow.add($.__views.sign_btns_view);
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
    $.__views.usersResidentsPersonalDataWindow.add($.__views.scrollView_fields);
    $.__views.viewAppTextFieldName = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldName"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldName);
    $.__views.widgetAppTextFieldName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldName",
        __parentSymbol: $.__views.viewAppTextFieldName
    });
    $.__views.widgetAppTextFieldName.setParent($.__views.viewAppTextFieldName);
    $.__views.viewAppTextFieldCell = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldCell"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldCell);
    $.__views.widgetAppTextFieldCell = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldCell",
        __parentSymbol: $.__views.viewAppTextFieldCell
    });
    $.__views.widgetAppTextFieldCell.setParent($.__views.viewAppTextFieldCell);
    $.__views.viewAppTextFieldAge = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAge"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldAge);
    $.__views.widgetAppTextFieldAge = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAge",
        __parentSymbol: $.__views.viewAppTextFieldAge
    });
    $.__views.widgetAppTextFieldAge.setParent($.__views.viewAppTextFieldAge);
    $.__views.viewAppTextFieldJob = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldJob"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldJob);
    $.__views.widgetAppTextFieldJob = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldJob",
        __parentSymbol: $.__views.viewAppTextFieldJob
    });
    $.__views.widgetAppTextFieldJob.setParent($.__views.viewAppTextFieldJob);
    $.__views.navigationWindowURPD = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.usersResidentsPersonalDataWindow,
        id: "navigationWindowURPD"
    });
    $.__views.navigationWindowURPD && $.addTopLevelView($.__views.navigationWindowURPD);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.btn_ios_Save);
    controls.push($.widgetAppButtonCreateSign.get_button());
    controls.push($.widgetAppButtonViewSign.get_button());
    var id = null;
    var bIsSavingInProgress = false;
    try {
        Alloy.Collections.UsersResidentsModePD.fetch({
            query: "SELECT * FROM UsersResidentsPD"
        });
        if (Alloy.Collections.UsersResidentsModePD.length > 0) {
            var personalData = Alloy.Collections.UsersResidentsModePD.at(0);
            $.widgetAppTextFieldName.set_text_value(personalData.get("NAME"));
            $.widgetAppTextFieldCell.set_text_value(personalData.get("CELL_NUMBER"));
            $.widgetAppTextFieldAge.set_text_value(personalData.get("AGE"));
            $.widgetAppTextFieldJob.set_text_value(personalData.get("JOB"));
            id = personalData.get("ID");
            Alloy.Globals.UsersResidentsCurrentSignPath = personalData.get("SIGN_PATH");
        } else Alloy.Globals.UsersResidentsCurrentSignPath = "";
        Alloy.Globals.UsersResidentsCurrentSign = null;
        $.widgetAppTextFieldName.init(L("generic_name_txt_hint"));
        $.widgetAppTextFieldCell.init(L("generic_cell_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldAge.init(L("generic_age_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldJob.init(L("generic_job_txt_hint"));
        $.widgetAppButtonCreateSign.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_btn_title"), OnBtnCreateSign_Click);
        $.widgetAppButtonViewSign.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_btn_title"), OnBtnViewSign_Click);
        RegisterHideKeyboard($.usersResidentsPersonalDataWindow, [ $.widgetAppTextFieldName.get_text_field(), $.widgetAppTextFieldCell.get_text_field(), $.widgetAppTextFieldAge.get_text_field(), $.widgetAppTextFieldJob.get_text_field() ]);
        $.navigationWindowURPD.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btn_ios_Save!click!OnBtnSave_Click"] && $.__views.btn_ios_Save.addEventListener("click", OnBtnSave_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;