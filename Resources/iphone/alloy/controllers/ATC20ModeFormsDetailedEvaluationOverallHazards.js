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
            $.navigationWindowDetailedEvaluationOverallHazards.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnCollapseOrPartialCollapse_Change(e) {
        try {
            var newOverallHazardsValue = Alloy.Globals.replaceCharAt(0, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newOverallHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBuildingOrStoryLeaning_Change(e) {
        try {
            var newOverallHazardsValue = Alloy.Globals.replaceCharAt(1, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newOverallHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change(e) {
        try {
            var newOverallHazardsValue = Alloy.Globals.replaceCharAt(2, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newOverallHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOtherName_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.get_text_value();
    }
    function OnComments_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.get_text_value();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsDetailedEvaluationOverallHazards";
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
    $.__views.atc20ModeDetailedEvaluationOverallHazardsWindow = Ti.UI.createWindow({
        title: L("atc20_detailed_evaluation_overall_hazards_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeDetailedEvaluationOverallHazardsWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.atc20ModeDetailedEvaluationOverallHazardsWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewDetailedEvaluationOverallHazards = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewDetailedEvaluationOverallHazards"
    });
    $.__views.atc20ModeDetailedEvaluationOverallHazardsWindow.add($.__views.scrollViewDetailedEvaluationOverallHazards);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse"
    });
    $.__views.scrollViewDetailedEvaluationOverallHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning"
    });
    $.__views.scrollViewDetailedEvaluationOverallHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther"
    });
    $.__views.scrollViewDetailedEvaluationOverallHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName"
    });
    $.__views.scrollViewDetailedEvaluationOverallHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments"
    });
    $.__views.scrollViewDetailedEvaluationOverallHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments);
    $.__views.navigationWindowDetailedEvaluationOverallHazards = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.atc20ModeDetailedEvaluationOverallHazardsWindow,
        id: "navigationWindowDetailedEvaluationOverallHazards"
    });
    $.__views.navigationWindowDetailedEvaluationOverallHazards && $.addTopLevelView($.__views.navigationWindowDetailedEvaluationOverallHazards);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var overallHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"];
        var collapseOrPartialCollapseParentView = null;
        var buildingOrStoryLeaningParentView = null;
        var otherParentView = null;
        var mainView = $.getView();
        collapseOrPartialCollapseParentView = mainView;
        buildingOrStoryLeaningParentView = mainView;
        otherParentView = mainView;
        var collapseOrPartialCollapseValues = {
            0: {
                title: L("generic_minor_none_text_msg")
            },
            1: {
                title: L("generic_moderate_text_msg")
            },
            2: {
                title: L("generic_severe_text_msg")
            }
        };
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse.init(L("generic_collapse_or_partial_collapse_text_msg"), collapseOrPartialCollapseValues, OnCollapseOrPartialCollapse_Change, null, collapseOrPartialCollapseParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse.enabled(view_enabled);
        var buildingOrStoryLeaningValues = {
            0: {
                title: L("generic_minor_none_text_msg")
            },
            1: {
                title: L("generic_moderate_text_msg")
            },
            2: {
                title: L("generic_severe_text_msg")
            }
        };
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning.init(L("generic_building_or_story_leaning_text_msg"), buildingOrStoryLeaningValues, OnBuildingOrStoryLeaning_Change, null, buildingOrStoryLeaningParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning.enabled(view_enabled);
        var otherValues = {
            0: {
                title: L("generic_minor_none_text_msg")
            },
            1: {
                title: L("generic_moderate_text_msg")
            },
            2: {
                title: L("generic_severe_text_msg")
            }
        };
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther.init(L("generic_other_text_msg"), otherValues, OnOther_Change, null, otherParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther.enabled(view_enabled);
        if (overallHazardsValue) {
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse.set_selected_index(overallHazardsValue.charAt(0));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning.set_selected_index(overallHazardsValue.charAt(1));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther.set_selected_index(overallHazardsValue.charAt(2));
        }
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.init(L("generic_other_text_msg"), OnOtherName_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"]);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.init(L("generic_comments_text_msg"), OnComments_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"]);
        RegisterHideKeyboard($.atc20ModeDetailedEvaluationOverallHazardsWindow, [ $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.get_text_field() ]);
        $.navigationWindowDetailedEvaluationOverallHazards.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;