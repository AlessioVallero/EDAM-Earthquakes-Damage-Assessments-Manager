function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnPreviousPosting_Change(e) {
        Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] = e.id;
    }
    function OnPreviousInspectorID_Change() {
        Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"] = $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.get_text_value();
    }
    function OnDate_Change() {
        Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"] = Date.parse($.datePickerDate.getValue());
    }
    function OnPosting_Change(e) {
        Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] = e.id;
    }
    function OnClassification_Change(e) {
        Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] = e.id;
    }
    function OnUseAndEntryRestrictions_Change() {
        Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"] = $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.get_text_value();
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsDetailedPostingView";
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
    $.__views.atc20ModeDetailedPostingWindow = Ti.UI.createWindow({
        title: L("atc20_mode_detailed_posting_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeDetailedPostingWindow"
    });
    $.__views.atc20ModeDetailedPostingWindow && $.addTopLevelView($.__views.atc20ModeDetailedPostingWindow);
    $.__views.scrollViewDetailedPosting = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewDetailedPosting"
    });
    $.__views.atc20ModeDetailedPostingWindow.add($.__views.scrollViewDetailedPosting);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting"
    });
    $.__views.scrollViewDetailedPosting.add($.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID"
    });
    $.__views.scrollViewDetailedPosting.add($.__views.viewAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID);
    $.__views.viewDate = Ti.UI.createView({
        top: 140,
        left: 0,
        right: 10,
        height: 100,
        id: "viewDate"
    });
    $.__views.scrollViewDetailedPosting.add($.__views.viewDate);
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
    $.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPosting = Ti.UI.createView({
        top: 260,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedPostingPosting"
    });
    $.__views.scrollViewDetailedPosting.add($.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPosting);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedPostingPosting",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPosting
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedPostingPosting);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedPostingClassification = Ti.UI.createView({
        top: 330,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedPostingClassification"
    });
    $.__views.scrollViewDetailedPosting.add($.__views.viewAppComboBoxATC20ModeFormsDetailedPostingClassification);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedPostingClassification",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedPostingClassification
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedPostingClassification);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions = Ti.UI.createView({
        top: 400,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions"
    });
    $.__views.scrollViewDetailedPosting.add($.__views.viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 470,
        width: 60,
        height: 80,
        bottom: 10,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewDetailedPosting.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var previousPostingParentView = null;
        var postingParentView = null;
        var classificationParentView = null;
        previousPostingParentView = $.viewAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting;
        postingParentView = $.viewAppComboBoxATC20ModeFormsDetailedPostingPosting;
        classificationParentView = $.viewAppComboBoxATC20ModeFormsDetailedPostingClassification;
        var previousPostingValues = {
            0: {
                title: L("generic_previous_posting_none")
            },
            1: {
                title: L("generic_previous_posting_inspected")
            },
            2: {
                title: L("generic_previous_posting_restricted_use")
            },
            3: {
                title: L("generic_previous_posting_unsafe")
            }
        };
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting.init(L("generic_previous_posting_text_msg"), previousPostingValues, OnPreviousPosting_Change, null, previousPostingParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting.enabled(view_enabled);
        Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] && $.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting.set_selected_index(Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"]);
        var postingValues = {
            0: {
                title: L("generic_posting_inspected")
            },
            1: {
                title: L("generic_posting_restricted_use")
            },
            2: {
                title: L("generic_posting_unsafe")
            }
        };
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting.init(L("generic_posting_text_msg"), postingValues, OnPosting_Change, null, postingParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting.enabled(view_enabled);
        Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] && $.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting.set_selected_index(Alloy.Globals.ATC20ModeDetailedPosting["POSTING"]);
        if ("NEPAL" == current_mode) {
            var classificationValues = {
                0: {
                    title: L("generic_classification_g1")
                },
                1: {
                    title: L("generic_classification_g2")
                },
                2: {
                    title: L("generic_classification_y1")
                },
                3: {
                    title: L("generic_classification_y2")
                },
                4: {
                    title: L("generic_classification_r1")
                },
                5: {
                    title: L("generic_classification_r2")
                },
                6: {
                    title: L("generic_classification_r3")
                }
            };
            $.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification.init(L("generic_classification_text_msg"), classificationValues, OnClassification_Change, null, classificationParentView);
            $.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification.enabled(view_enabled);
            Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] && $.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification.set_selected_index(Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"]);
        } else {
            $.scrollViewDetailedPosting.remove($.viewAppComboBoxATC20ModeFormsDetailedPostingClassification);
            $.viewAppComboBoxATC20ModeFormsDetailedPostingClassification = null;
            $.viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.setTop(330);
            $.viewAppButtonSave.setTop(400);
        }
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.init(L("generic_previous_inspector_id_txt_hint"), OnPreviousInspectorID_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.set_text_value(Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"]);
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.init(L("generic_use_and_entry_restrictions_txt_hint"), OnUseAndEntryRestrictions_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.set_text_value(Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"]);
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.enabled(view_enabled);
        $.viewDisabler.setHeight($.datePickerDate.getHeight());
        $.viewDisabler.visible = !view_enabled;
        if (Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"]) {
            var saved_date = new Date();
            saved_date.setTime(Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"]);
            $.datePickerDate.setValue(saved_date);
        }
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.atc20ModeDetailedPostingWindow, [ $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.get_text_field(), $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.get_text_field() ]);
        $.atc20ModeDetailedPostingWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.datePickerDate!change!OnDate_Change"] && $.__views.datePickerDate.addEventListener("change", OnDate_Change);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;