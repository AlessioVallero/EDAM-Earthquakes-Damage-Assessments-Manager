function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnSlopeFailureDebris_Change(e) {
        try {
            var newGeotechnicalHazardsValue = Alloy.Globals.replaceCharAt(19, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newGeotechnicalHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnGroundMovementFissures_Change(e) {
        try {
            var newGeotechnicalHazardsValue = Alloy.Globals.replaceCharAt(20, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newGeotechnicalHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change(e) {
        try {
            var newGeotechnicalHazardsValue = Alloy.Globals.replaceCharAt(21, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newGeotechnicalHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOtherName_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.get_text_value();
    }
    function OnComments_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.get_text_value();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsDetailedEvaluationGeotechnicalHazards";
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
    $.__views.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow = Ti.UI.createWindow({
        title: L("atc20_detailed_evaluation_geotechnical_hazards_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeDetailedEvaluationGeotechnicalHazardsWindow"
    });
    $.__views.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow && $.addTopLevelView($.__views.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow);
    $.__views.scrollViewDetailedEvaluationGeotechnicalHazards = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewDetailedEvaluationGeotechnicalHazards"
    });
    $.__views.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow.add($.__views.scrollViewDetailedEvaluationGeotechnicalHazards);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris"
    });
    $.__views.scrollViewDetailedEvaluationGeotechnicalHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures"
    });
    $.__views.scrollViewDetailedEvaluationGeotechnicalHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther"
    });
    $.__views.scrollViewDetailedEvaluationGeotechnicalHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName"
    });
    $.__views.scrollViewDetailedEvaluationGeotechnicalHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments"
    });
    $.__views.scrollViewDetailedEvaluationGeotechnicalHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var geotechnicalHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"];
        var slopeFailureDebrisParentView = null;
        var groundMovementFissuresParentView = null;
        var otherParentView = null;
        slopeFailureDebrisParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris;
        groundMovementFissuresParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures;
        otherParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther;
        var slopeFailureDebrisValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris.init(L("generic_slope_failure_debris_text_msg"), slopeFailureDebrisValues, OnSlopeFailureDebris_Change, null, slopeFailureDebrisParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris.enabled(view_enabled);
        var groundMovementFissuresValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures.init(L("generic_ground_movement_fissures_text_msg"), groundMovementFissuresValues, OnGroundMovementFissures_Change, null, groundMovementFissuresParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures.enabled(view_enabled);
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther.init(L("generic_other_text_msg"), otherValues, OnOther_Change, null, otherParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther.enabled(view_enabled);
        if (geotechnicalHazardsValue) {
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris.set_selected_index(geotechnicalHazardsValue.charAt(19));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures.set_selected_index(geotechnicalHazardsValue.charAt(20));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther.set_selected_index(geotechnicalHazardsValue.charAt(21));
        }
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.init(L("generic_other_text_msg"), OnOtherName_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"]);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.init(L("generic_comments_text_msg"), OnComments_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"]);
        RegisterHideKeyboard($.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow, [ $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.get_text_field() ]);
        $.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;