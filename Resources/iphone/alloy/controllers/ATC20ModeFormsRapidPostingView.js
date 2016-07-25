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
            $.navigationWindowRapidPosting.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPosting_Change(e) {
        Alloy.Globals.ATC20ModeRapidPosting["POSTING"] = e.id;
    }
    function OnClassification_Change(e) {
        Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] = e.id;
    }
    function OnUseAndEntryRestrictions_Change() {
        Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"] = $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.get_text_value();
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsRapidPostingView";
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
    $.__views.atc20ModeRapidPostingWindow = Ti.UI.createWindow({
        title: L("atc20_mode_rapid_posting_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeRapidPostingWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.atc20ModeRapidPostingWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewRapidPosting = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewRapidPosting"
    });
    $.__views.atc20ModeRapidPostingWindow.add($.__views.scrollViewRapidPosting);
    $.__views.viewAppComboBoxATC20ModeFormsRapidPostingPosting = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidPostingPosting"
    });
    $.__views.scrollViewRapidPosting.add($.__views.viewAppComboBoxATC20ModeFormsRapidPostingPosting);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidPostingPosting = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidPostingPosting",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidPostingPosting
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidPostingPosting.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidPostingPosting);
    $.__views.viewAppComboBoxATC20ModeFormsRapidPostingClassification = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidPostingClassification"
    });
    $.__views.scrollViewRapidPosting.add($.__views.viewAppComboBoxATC20ModeFormsRapidPostingClassification);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidPostingClassification = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidPostingClassification",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidPostingClassification
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidPostingClassification.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidPostingClassification);
    $.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions"
    });
    $.__views.scrollViewRapidPosting.add($.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions);
    $.__views.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions
    });
    $.__views.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.setParent($.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 210,
        width: 60,
        height: 80,
        bottom: 10,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewRapidPosting.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowRapidPosting = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.atc20ModeRapidPostingWindow,
        id: "navigationWindowRapidPosting"
    });
    $.__views.navigationWindowRapidPosting && $.addTopLevelView($.__views.navigationWindowRapidPosting);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var postingParentView = null;
        var classificationParentView = null;
        var thisView = $.getView();
        postingParentView = thisView;
        classificationParentView = thisView;
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
        $.widgetAppComboBoxATC20ModeFormsRapidPostingPosting.init(L("generic_posting_text_msg"), postingValues, OnPosting_Change, null, postingParentView);
        $.widgetAppComboBoxATC20ModeFormsRapidPostingPosting.enabled(view_enabled);
        Alloy.Globals.ATC20ModeRapidPosting["POSTING"] && $.widgetAppComboBoxATC20ModeFormsRapidPostingPosting.set_selected_index(Alloy.Globals.ATC20ModeRapidPosting["POSTING"]);
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
            $.widgetAppComboBoxATC20ModeFormsRapidPostingClassification.init(L("generic_classification_text_msg"), classificationValues, OnClassification_Change, null, classificationParentView);
            $.widgetAppComboBoxATC20ModeFormsRapidPostingClassification.enabled(view_enabled);
            Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] && $.widgetAppComboBoxATC20ModeFormsRapidPostingClassification.set_selected_index(Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"]);
        } else {
            $.scrollViewRapidPosting.remove($.viewAppComboBoxATC20ModeFormsRapidPostingClassification);
            $.viewAppComboBoxATC20ModeFormsRapidPostingClassification = null;
            $.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.setTop(70);
            $.viewAppButtonSave.setTop(140);
        }
        $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.init(L("generic_use_and_entry_restrictions_txt_hint"), OnUseAndEntryRestrictions_Change);
        $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.set_text_value(Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"]);
        $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.enabled(view_enabled);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.atc20ModeRapidPostingWindow, [ $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.get_text_field() ]);
        $.navigationWindowRapidPosting.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;