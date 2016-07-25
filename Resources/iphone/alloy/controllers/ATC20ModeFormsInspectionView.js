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
        try {
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "form:save_from_section");
            $.navigationWindowFormsInspection.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnDateTime_Change() {
        Alloy.Globals.ATC20ModeInspection["DATE"] = Date.parse($.datePickerDate.getValue());
    }
    function OnAreasInspected_Change(e) {
        Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] = e.id;
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsInspectionView";
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
    $.__views.atc20ModeFormsInspectionWindow = Ti.UI.createWindow({
        title: L("atc20_mode_form_inspection_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeFormsInspectionWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.atc20ModeFormsInspectionWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewFormsInspection = Ti.UI.createScrollView({
        top: 0,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewFormsInspection"
    });
    $.__views.atc20ModeFormsInspectionWindow.add($.__views.scrollViewFormsInspection);
    $.__views.viewDateTime = Ti.UI.createView({
        top: 10,
        left: 0,
        right: 10,
        height: 200,
        id: "viewDateTime"
    });
    $.__views.scrollViewFormsInspection.add($.__views.viewDateTime);
    $.__views.lblDateTime = Ti.UI.createLabel({
        text: L("generic_datetime_text_msg"),
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
        id: "lblDateTime"
    });
    $.__views.viewDateTime.add($.__views.lblDateTime);
    $.__views.viewDisablerDateTime = Ti.UI.createView({
        left: 60,
        right: 10,
        borderColor: "transparent",
        backgroundColor: "transparent",
        zIndex: 1,
        id: "viewDisablerDateTime"
    });
    $.__views.viewDateTime.add($.__views.viewDisablerDateTime);
    $.__views.datePickerDate = Ti.UI.createPicker({
        left: 60,
        right: 10,
        type: Titanium.UI.PICKER_TYPE_DATE_AND_TIME,
        selectionIndicator: true,
        useSpinner: true,
        format24: false,
        id: "datePickerDate"
    });
    $.__views.viewDateTime.add($.__views.datePickerDate);
    OnDateTime_Change ? $.__views.datePickerDate.addEventListener("change", OnDateTime_Change) : __defers["$.__views.datePickerDate!change!OnDateTime_Change"] = true;
    $.__views.viewAreasInspectedWrapper = Ti.UI.createView({
        top: 230,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAreasInspectedWrapper"
    });
    $.__views.scrollViewFormsInspection.add($.__views.viewAreasInspectedWrapper);
    $.__views.viewAreasInspected = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAreasInspected"
    });
    $.__views.viewAreasInspectedWrapper.add($.__views.viewAreasInspected);
    $.__views.widgetAppComboBoxATC20ModeInspectionAreasInspected = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeInspectionAreasInspected",
        __parentSymbol: $.__views.viewAreasInspected
    });
    $.__views.widgetAppComboBoxATC20ModeInspectionAreasInspected.setParent($.__views.viewAreasInspected);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 300,
        width: 60,
        height: 80,
        bottom: 10,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewFormsInspection.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowFormsInspection = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.atc20ModeFormsInspectionWindow,
        id: "navigationWindowFormsInspection"
    });
    $.__views.navigationWindowFormsInspection && $.addTopLevelView($.__views.navigationWindowFormsInspection);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_is_synchronized = args.is_synchronized;
    var current_atc20_type = args.atc20_type;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        if ("0" == current_atc20_type && "NEPAL" != current_mode) {
            $.viewAreasInspectedWrapper.remove($.viewAreasInspected);
            $.viewAreasInspected = null;
            $.viewAppButtonSave.setTop(230);
        } else {
            var areasInspectedParentView = null;
            var thisView = $.getView();
            areasInspectedParentView = thisView;
            var areasInspectedValues = {
                0: {
                    title: L("generic_exterior_only_text_msg")
                },
                1: {
                    title: L("generic_exterior_and_interior_text_msg")
                }
            };
            $.widgetAppComboBoxATC20ModeInspectionAreasInspected.init(L("generic_areas_inspected_text_msg"), areasInspectedValues, OnAreasInspected_Change, null, areasInspectedParentView);
            $.widgetAppComboBoxATC20ModeInspectionAreasInspected.enabled(view_enabled);
            Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] && $.widgetAppComboBoxATC20ModeInspectionAreasInspected.set_selected_index(Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"]);
        }
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        var saved_date;
        $.viewDisablerDateTime.setHeight($.datePickerDate.getHeight());
        $.viewDisablerDateTime.visible = !view_enabled;
        if (Alloy.Globals.ATC20ModeInspection["DATE"]) {
            var saved_date = new Date();
            saved_date.setTime(Alloy.Globals.ATC20ModeInspection["DATE"]);
            $.datePickerDate.setValue(saved_date);
        }
        $.navigationWindowFormsInspection.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.datePickerDate!change!OnDateTime_Change"] && $.__views.datePickerDate.addEventListener("change", OnDateTime_Change);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;