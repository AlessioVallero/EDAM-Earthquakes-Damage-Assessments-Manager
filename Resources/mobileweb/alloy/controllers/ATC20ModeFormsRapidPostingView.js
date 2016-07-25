function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnPosting_Change(e) {
        Alloy.Globals.ATC20ModeRapidPosting["POSTING"] = e.id;
    }
    function OnUseAndEntryRestrictions_Change() {
        Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"] = $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.get_text_value();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsRapidPostingView";
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
    $.__views.atc20ModeRapidPostingWindow = Ti.UI.createWindow({
        title: L("atc20_mode_rapid_posting_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeRapidPostingWindow"
    });
    $.__views.atc20ModeRapidPostingWindow && $.addTopLevelView($.__views.atc20ModeRapidPostingWindow);
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
    $.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 10,
        id: "viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions"
    });
    $.__views.scrollViewRapidPosting.add($.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions);
    $.__views.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions
    });
    $.__views.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.setParent($.__views.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var postingParentView = null;
        postingParentView = $.viewAppComboBoxATC20ModeFormsRapidPostingPosting;
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
        $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.init(L("generic_use_and_entry_restrictions_txt_hint"), OnUseAndEntryRestrictions_Change);
        $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.set_text_value(Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"]);
        $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.enabled(view_enabled);
        $.atc20ModeRapidPostingWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;