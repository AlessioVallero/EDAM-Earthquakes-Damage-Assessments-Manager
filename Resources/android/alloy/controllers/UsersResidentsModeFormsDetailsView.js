function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnFormNo_Change() {
        Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] = $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.get_text_value();
    }
    function OnDate_Change() {
        Alloy.Globals.UsersResidentsModeDetails["DATE"] = Date.parse($.datePickerDate.getValue());
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "UsersResidentsModeFormsDetailsView";
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
    $.__views.usersResidentsModeFormsDetailsWindow = Ti.UI.createWindow({
        title: L("users_residents_mode_form_details_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsModeFormsDetailsWindow"
    });
    $.__views.usersResidentsModeFormsDetailsWindow && $.addTopLevelView($.__views.usersResidentsModeFormsDetailsWindow);
    $.__views.scrollViewFormsDetails = Ti.UI.createScrollView({
        top: 0,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewFormsDetails"
    });
    $.__views.usersResidentsModeFormsDetailsWindow.add($.__views.scrollViewFormsDetails);
    $.__views.viewAppTextFieldUsersResidentsModeFormsDetailsFormNo = Ti.UI.createView({
        top: 10,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsDetailsFormNo"
    });
    $.__views.scrollViewFormsDetails.add($.__views.viewAppTextFieldUsersResidentsModeFormsDetailsFormNo);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsDetailsFormNo
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsDetailsFormNo);
    $.__views.viewDate = Ti.UI.createView({
        top: 80,
        left: 0,
        right: 10,
        height: 100,
        id: "viewDate"
    });
    $.__views.scrollViewFormsDetails.add($.__views.viewDate);
    $.__views.lblDate = Ti.UI.createLabel({
        text: L("generic_date_text_msg"),
        left: 0,
        width: 50,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right",
        id: "lblDate"
    });
    $.__views.viewDate.add($.__views.lblDate);
    $.__views.viewDisabler = Ti.UI.createView({
        left: 60,
        right: 10,
        borderColor: "transparent",
        backgroundColor: "transparent",
        zIndex: 1,
        id: "viewDisabler"
    });
    $.__views.viewDate.add($.__views.viewDisabler);
    $.__views.datePickerDate = Ti.UI.createPicker({
        left: 60,
        right: 10,
        type: Titanium.UI.PICKER_TYPE_DATE,
        selectionIndicator: true,
        useSpinner: true,
        id: "datePickerDate"
    });
    $.__views.viewDate.add($.__views.datePickerDate);
    OnDate_Change ? $.__views.datePickerDate.addEventListener("change", OnDate_Change) : __defers["$.__views.datePickerDate!change!OnDate_Change"] = true;
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 190,
        height: 80,
        width: 60,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewFormsDetails.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.init(L("generic_formno_txt_hint"), OnFormNo_Change, null, 4);
        $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.set_text_value(Alloy.Globals.UsersResidentsModeDetails["FORM_NO"]);
        $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.enabled(view_enabled);
        $.viewDisabler.setHeight($.datePickerDate.getHeight());
        $.viewDisabler.visible = !view_enabled;
        if (Alloy.Globals.UsersResidentsModeDetails["DATE"]) {
            var saved_date = new Date();
            saved_date.setTime(Alloy.Globals.UsersResidentsModeDetails["DATE"]);
            $.datePickerDate.setValue(saved_date);
        }
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.usersResidentsModeFormsDetailsWindow, [ $.widgetAppTextFieldUsersResidentsModeFormsDetailsFormNo.get_text_field() ]);
        $.usersResidentsModeFormsDetailsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.datePickerDate!change!OnDate_Change"] && $.__views.datePickerDate.addEventListener("change", OnDate_Change);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;