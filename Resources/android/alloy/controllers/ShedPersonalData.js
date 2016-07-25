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
        bIsSavingInProgress || Back();
    }
    function Back() {
        try {
            $.shedPersonalDataWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnCreateSign1_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView", {
                    component_number: 1,
                    mode: "Shed"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnViewSign1_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var view_sign_param = null;
                if (Alloy.Globals.ShedCurrentSign1) view_sign_param = Alloy.Globals.ShedCurrentSign1; else if (Alloy.Globals.ShedCurrentSignPath1) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.ShedCurrentSignPath1);
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
    function OnBtnCreateSign2_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView", {
                    component_number: 2,
                    mode: "Shed"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnViewSign2_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var view_sign_param = null;
                if (Alloy.Globals.ShedCurrentSign2) view_sign_param = Alloy.Globals.ShedCurrentSign2; else if (Alloy.Globals.ShedCurrentSignPath2) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.ShedCurrentSignPath2);
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
    function OnBtnCreateSign3_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                Alloy.Globals.createAndOpenControllerExt("CreateSignPaintView", {
                    component_number: 3,
                    mode: "Shed"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnViewSign3_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                var view_sign_param = null;
                if (Alloy.Globals.ShedCurrentSign3) view_sign_param = Alloy.Globals.ShedCurrentSign3; else if (Alloy.Globals.ShedCurrentSignPath3) {
                    var file = Alloy.Globals.getFileForRead(Alloy.Globals.ShedCurrentSignPath3);
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
                    if (Alloy.Globals.ShedCurrentSign1) {
                        Ti.API.info("\nFirst team component:\n");
                        Alloy.Globals.ShedCurrentSignPath1 || (Alloy.Globals.ShedCurrentSignPath1 = new Date().getTime() + "_sign1.png");
                        var file = Alloy.Globals.getFileForWrite(Alloy.Globals.ShedCurrentSignPath1);
                        file.exists() && file.deleteFile();
                        if (file.write(Alloy.Globals.ShedCurrentSign1)) ; else {
                            Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                            bError = true;
                        }
                    }
                    if (!bError) {
                        var recoverShedPD = Alloy.createCollection("ShedPD");
                        recoverShedPD.fetch({
                            query: "SELECT * FROM ShedPD where ID = " + id1
                        });
                        if (recoverShedPD.length > 0) {
                            var currentShedPD = recoverShedPD.at(0);
                            currentShedPD.set({
                                SIGN_PATH: Alloy.Globals.ShedCurrentSignPath1,
                                NAME: $.widgetAppTextFieldName1.get_text_value()
                            });
                            currentShedPD.save();
                            currentShedPD = null;
                        } else {
                            var shedPDModel = Alloy.createModel("ShedPD", {
                                COMPONENT_NUMBER: 1,
                                SIGN_PATH: Alloy.Globals.ShedCurrentSignPath1,
                                NAME: $.widgetAppTextFieldName1.get_text_value()
                            });
                            shedPDModel.save();
                            shedPDModel = null;
                        }
                        recoverShedPD = null;
                        if (Alloy.Globals.ShedCurrentSign2) {
                            Ti.API.info("\nSecond team component:\n");
                            Alloy.Globals.ShedCurrentSignPath2 || (Alloy.Globals.ShedCurrentSignPath2 = new Date().getTime() + "_sign2.png");
                            var file = Alloy.Globals.getFileForWrite(Alloy.Globals.ShedCurrentSignPath2);
                            file.exists() && file.deleteFile();
                            if (file.write(Alloy.Globals.ShedCurrentSign2)) ; else {
                                Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                bError = true;
                            }
                        }
                        var recoverShedPD = Alloy.createCollection("ShedPD");
                        recoverShedPD.fetch({
                            query: "SELECT * FROM ShedPD where ID = " + id2
                        });
                        if (recoverShedPD.length > 0) {
                            var currentShedPD = recoverShedPD.at(0);
                            currentShedPD.set({
                                SIGN_PATH: Alloy.Globals.ShedCurrentSignPath2,
                                NAME: $.widgetAppTextFieldName2.get_text_value()
                            });
                            currentShedPD.save();
                            currentShedPD = null;
                        } else {
                            var shedPDModel = Alloy.createModel("ShedPD", {
                                COMPONENT_NUMBER: 2,
                                SIGN_PATH: Alloy.Globals.ShedCurrentSignPath2,
                                NAME: $.widgetAppTextFieldName2.get_text_value()
                            });
                            shedPDModel.save();
                            shedPDModel = null;
                        }
                        recoverShedPD = null;
                        if (!bError) {
                            if (Alloy.Globals.ShedCurrentSign3) {
                                Ti.API.info("\nThird team component:\n");
                                Alloy.Globals.ShedCurrentSignPath3 || (Alloy.Globals.ShedCurrentSignPath3 = new Date().getTime() + "_sign3.png");
                                var file = Alloy.Globals.getFileForWrite(Alloy.Globals.ShedCurrentSignPath3);
                                file.exists() && file.deleteFile();
                                if (file.write(Alloy.Globals.ShedCurrentSign3)) ; else {
                                    Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    bError = true;
                                }
                            }
                            if (bError) Ti.API.info("ERROR.\nEND"); else {
                                var recoverShedPD = Alloy.createCollection("ShedPD");
                                recoverShedPD.fetch({
                                    query: "SELECT * FROM ShedPD where ID = " + id3
                                });
                                if (recoverShedPD.length > 0) {
                                    var currentShedPD = recoverShedPD.at(0);
                                    currentShedPD.set({
                                        SIGN_PATH: Alloy.Globals.ShedCurrentSignPath3,
                                        NAME: $.widgetAppTextFieldName3.get_text_value()
                                    });
                                    currentShedPD.save();
                                    currentShedPD = null;
                                } else {
                                    var shedPDModel = Alloy.createModel("ShedPD", {
                                        COMPONENT_NUMBER: 3,
                                        SIGN_PATH: Alloy.Globals.ShedCurrentSignPath3,
                                        NAME: $.widgetAppTextFieldName3.get_text_value()
                                    });
                                    shedPDModel.save();
                                    shedPDModel = null;
                                }
                                recoverShedPD = null;
                                Alloy.Collections.ShedModePD.fetch({
                                    query: "SELECT * FROM ShedPD"
                                });
                                if (Alloy.Collections.ShedModePD.length > 0) for (var i = 0; i < Alloy.Collections.ShedModePD.length; i++) {
                                    var personalData = Alloy.Collections.ShedModePD.at(i);
                                    switch (personalData.get("COMPONENT_NUMBER")) {
                                      case 1:
                                        id1 = personalData.get("ID");
                                        break;

                                      case 2:
                                        id2 = personalData.get("ID");
                                        break;

                                      case 3:
                                        id3 = personalData.get("ID");
                                    }
                                }
                                bRet = true;
                            }
                        }
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
    this.__controllerPath = "ShedPersonalData";
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
    $.__views.shedPersonalDataWindow = Ti.UI.createWindow({
        title: L("edit_team_personal_data_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedPersonalDataWindow"
    });
    $.__views.shedPersonalDataWindow && $.addTopLevelView($.__views.shedPersonalDataWindow);
    OnAndroidBackButton_Click ? $.__views.shedPersonalDataWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.shedPersonalDataWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.shedPersonalDataWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.shedPersonalDataWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.shedPersonalDataWindow.add($.__views.activity_indicator);
    $.__views.scrollView_fields = Ti.UI.createScrollView({
        top: 20,
        scrollType: "vertical",
        id: "scrollView_fields"
    });
    $.__views.shedPersonalDataWindow.add($.__views.scrollView_fields);
    $.__views.sign_btns_view1 = Ti.UI.createView({
        top: 20,
        width: 140,
        height: 88,
        id: "sign_btns_view1"
    });
    $.__views.scrollView_fields.add($.__views.sign_btns_view1);
    $.__views.viewAppButtonViewSign1 = Ti.UI.createView({
        top: 0,
        left: 0,
        width: 60,
        height: 88,
        id: "viewAppButtonViewSign1"
    });
    $.__views.sign_btns_view1.add($.__views.viewAppButtonViewSign1);
    $.__views.widgetAppButtonViewSign1 = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonViewSign1",
        __parentSymbol: $.__views.viewAppButtonViewSign1
    });
    $.__views.widgetAppButtonViewSign1.setParent($.__views.viewAppButtonViewSign1);
    $.__views.viewAppButtonCreateSign1 = Ti.UI.createView({
        top: 0,
        left: 80,
        width: 60,
        height: 88,
        id: "viewAppButtonCreateSign1"
    });
    $.__views.sign_btns_view1.add($.__views.viewAppButtonCreateSign1);
    $.__views.widgetAppButtonCreateSign1 = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonCreateSign1",
        __parentSymbol: $.__views.viewAppButtonCreateSign1
    });
    $.__views.widgetAppButtonCreateSign1.setParent($.__views.viewAppButtonCreateSign1);
    $.__views.viewAppTextFieldName1 = Ti.UI.createView({
        top: 110,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldName1"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldName1);
    $.__views.widgetAppTextFieldName1 = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldName1",
        __parentSymbol: $.__views.viewAppTextFieldName1
    });
    $.__views.widgetAppTextFieldName1.setParent($.__views.viewAppTextFieldName1);
    $.__views.sign_btns_view2 = Ti.UI.createView({
        top: 170,
        width: 140,
        height: 88,
        id: "sign_btns_view2"
    });
    $.__views.scrollView_fields.add($.__views.sign_btns_view2);
    $.__views.viewAppButtonViewSign2 = Ti.UI.createView({
        top: 0,
        left: 0,
        width: 60,
        height: 88,
        id: "viewAppButtonViewSign2"
    });
    $.__views.sign_btns_view2.add($.__views.viewAppButtonViewSign2);
    $.__views.widgetAppButtonViewSign2 = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonViewSign2",
        __parentSymbol: $.__views.viewAppButtonViewSign2
    });
    $.__views.widgetAppButtonViewSign2.setParent($.__views.viewAppButtonViewSign2);
    $.__views.viewAppButtonCreateSign2 = Ti.UI.createView({
        top: 0,
        left: 80,
        width: 60,
        height: 88,
        id: "viewAppButtonCreateSign2"
    });
    $.__views.sign_btns_view2.add($.__views.viewAppButtonCreateSign2);
    $.__views.widgetAppButtonCreateSign2 = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonCreateSign2",
        __parentSymbol: $.__views.viewAppButtonCreateSign2
    });
    $.__views.widgetAppButtonCreateSign2.setParent($.__views.viewAppButtonCreateSign2);
    $.__views.viewAppTextFieldName2 = Ti.UI.createView({
        top: 270,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldName2"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldName2);
    $.__views.widgetAppTextFieldName2 = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldName2",
        __parentSymbol: $.__views.viewAppTextFieldName2
    });
    $.__views.widgetAppTextFieldName2.setParent($.__views.viewAppTextFieldName2);
    $.__views.sign_btns_view3 = Ti.UI.createView({
        top: 330,
        width: 140,
        height: 88,
        id: "sign_btns_view3"
    });
    $.__views.scrollView_fields.add($.__views.sign_btns_view3);
    $.__views.viewAppButtonViewSign3 = Ti.UI.createView({
        top: 0,
        left: 0,
        width: 60,
        height: 88,
        id: "viewAppButtonViewSign3"
    });
    $.__views.sign_btns_view3.add($.__views.viewAppButtonViewSign3);
    $.__views.widgetAppButtonViewSign3 = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonViewSign3",
        __parentSymbol: $.__views.viewAppButtonViewSign3
    });
    $.__views.widgetAppButtonViewSign3.setParent($.__views.viewAppButtonViewSign3);
    $.__views.viewAppButtonCreateSign3 = Ti.UI.createView({
        top: 0,
        left: 80,
        width: 60,
        height: 88,
        id: "viewAppButtonCreateSign3"
    });
    $.__views.sign_btns_view3.add($.__views.viewAppButtonCreateSign3);
    $.__views.widgetAppButtonCreateSign3 = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonCreateSign3",
        __parentSymbol: $.__views.viewAppButtonCreateSign3
    });
    $.__views.widgetAppButtonCreateSign3.setParent($.__views.viewAppButtonCreateSign3);
    $.__views.viewAppTextFieldName3 = Ti.UI.createView({
        top: 430,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldName3"
    });
    $.__views.scrollView_fields.add($.__views.viewAppTextFieldName3);
    $.__views.widgetAppTextFieldName3 = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldName3",
        __parentSymbol: $.__views.viewAppTextFieldName3
    });
    $.__views.widgetAppTextFieldName3.setParent($.__views.viewAppTextFieldName3);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 500,
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
    var controls = new Array();
    controls.push($.widgetAppButtonSave.get_button());
    controls.push($.widgetAppButtonCreateSign1.get_button());
    controls.push($.widgetAppButtonViewSign1.get_button());
    controls.push($.widgetAppButtonCreateSign2.get_button());
    controls.push($.widgetAppButtonViewSign2.get_button());
    controls.push($.widgetAppButtonCreateSign3.get_button());
    controls.push($.widgetAppButtonViewSign3.get_button());
    var id1 = null;
    var id2 = null;
    var id3 = null;
    var bIsSavingInProgress = false;
    try {
        Alloy.Globals.ShedCurrentSignPath1 = "";
        Alloy.Globals.ShedCurrentSignPath2 = "";
        Alloy.Globals.ShedCurrentSignPath3 = "";
        Alloy.Collections.ShedModePD.fetch({
            query: "SELECT * FROM ShedPD"
        });
        if (Alloy.Collections.ShedModePD.length > 0) for (var i = 0; i < Alloy.Collections.ShedModePD.length; i++) {
            var personalData = Alloy.Collections.ShedModePD.at(i);
            switch (personalData.get("COMPONENT_NUMBER")) {
              case 1:
                $.widgetAppTextFieldName1.set_text_value(personalData.get("NAME"));
                id1 = personalData.get("ID");
                Alloy.Globals.ShedCurrentSignPath1 = personalData.get("SIGN_PATH");
                break;

              case 2:
                $.widgetAppTextFieldName2.set_text_value(personalData.get("NAME"));
                id2 = personalData.get("ID");
                Alloy.Globals.ShedCurrentSignPath2 = personalData.get("SIGN_PATH");
                break;

              case 3:
                $.widgetAppTextFieldName3.set_text_value(personalData.get("NAME"));
                id3 = personalData.get("ID");
                Alloy.Globals.ShedCurrentSignPath3 = personalData.get("SIGN_PATH");
            }
        }
        Alloy.Globals.ShedCurrentSign1 = null;
        Alloy.Globals.ShedCurrentSign2 = null;
        Alloy.Globals.ShedCurrentSign3 = null;
        $.widgetAppTextFieldName1.init(L("generic_name_1_txt_hint"));
        $.widgetAppTextFieldName2.init(L("generic_name_2_txt_hint"));
        $.widgetAppTextFieldName3.init(L("generic_name_3_txt_hint"));
        $.widgetAppButtonCreateSign1.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_1_btn_title"), OnBtnCreateSign1_Click);
        $.widgetAppButtonViewSign1.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_1_btn_title"), OnBtnViewSign1_Click);
        $.widgetAppButtonCreateSign2.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_2_btn_title"), OnBtnCreateSign2_Click);
        $.widgetAppButtonViewSign2.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_2_btn_title"), OnBtnViewSign2_Click);
        $.widgetAppButtonCreateSign3.init("/images/create_sign_normal.png", "/images/create_sign_pressed.png", "/images/create_sign_disabled.png", L("generic_create_sign_3_btn_title"), OnBtnCreateSign3_Click);
        $.widgetAppButtonViewSign3.init("/images/view_sign_normal.png", "/images/view_sign_pressed.png", "/images/view_sign_disabled.png", L("generic_view_sign_3_btn_title"), OnBtnViewSign3_Click);
        RegisterHideKeyboard($.shedPersonalDataWindow, [ $.widgetAppTextFieldName1.get_text_field(), $.widgetAppTextFieldName2.get_text_field(), $.widgetAppTextFieldName3.get_text_field() ]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.shedPersonalDataWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.shedPersonalDataWindow!android:back!OnAndroidBackButton_Click"] && $.__views.shedPersonalDataWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.shedPersonalDataWindow!androidback!OnAndroidBackButton_Click"] && $.__views.shedPersonalDataWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;