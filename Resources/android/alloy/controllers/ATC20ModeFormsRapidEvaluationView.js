function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnEstimatedBuildingDamage_Change(e) {
        Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"] = e.id;
    }
    function OnGeneralComments_Change() {
        Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.get_text_value();
    }
    function OnCollapsePartialCollapseOrBuildingOffFoundation_Change(e) {
        try {
            var newRapidEvaluationValue = Alloy.Globals.replaceCharAt(0, Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBuildingOrStoryLeaning_Change(e) {
        try {
            var newRapidEvaluationValue = Alloy.Globals.replaceCharAt(1, Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRackingDamageToWallsOtherStructuralDamage_Change(e) {
        try {
            var newRapidEvaluationValue = Alloy.Globals.replaceCharAt(2, Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnChimneyParapetOrOtherFallingHazard_Change(e) {
        try {
            var newRapidEvaluationValue = Alloy.Globals.replaceCharAt(3, Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnGroundSlopeMovementOrCracking_Change(e) {
        try {
            var newRapidEvaluationValue = Alloy.Globals.replaceCharAt(4, Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change(e) {
        try {
            var newRapidEvaluationValue = Alloy.Globals.replaceCharAt(5, Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOtherName_Change() {
        Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"] = $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.get_text_value();
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsRapidEvaluationView";
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
    $.__views.atc20ModeRapidEvaluationWindow = Ti.UI.createWindow({
        title: L("atc20_mode_rapid_evaluation_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeRapidEvaluationWindow"
    });
    $.__views.atc20ModeRapidEvaluationWindow && $.addTopLevelView($.__views.atc20ModeRapidEvaluationWindow);
    $.__views.scrollViewRapidEvaluation = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewRapidEvaluation"
    });
    $.__views.atc20ModeRapidEvaluationWindow.add($.__views.scrollViewRapidEvaluation);
    $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage);
    $.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments);
    $.__views.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments
    });
    $.__views.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.setParent($.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments);
    $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation = Ti.UI.createView({
        top: 140,
        height: 80,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation);
    $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning = Ti.UI.createView({
        top: 240,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning);
    $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage = Ti.UI.createView({
        top: 310,
        height: 80,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage);
    $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard = Ti.UI.createView({
        top: 410,
        height: 80,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard);
    $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking = Ti.UI.createView({
        top: 510,
        height: 80,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking);
    $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther = Ti.UI.createView({
        top: 610,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther);
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther
    });
    $.__views.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.setParent($.__views.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther);
    $.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName = Ti.UI.createView({
        top: 680,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName);
    $.__views.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.setParent($.__views.viewAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 750,
        width: 60,
        height: 80,
        bottom: 10,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewRapidEvaluation.add($.__views.viewAppButtonSave);
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
        var rapidEvaluationValue = Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"];
        var estimatedBuildingDamageParentView = null;
        var collapsePartialCollapseOrBuildingOffFoundationParentView = null;
        var buildingOrStoryLeaningParentView = null;
        var rackingDamageToWallsOtherStructuralDamageParentView = null;
        var chimneyParapetOrOtherFallingHazardParentView = null;
        var groundSlopeMovementOrCrackingParentView = null;
        var otherParentView = null;
        estimatedBuildingDamageParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage;
        collapsePartialCollapseOrBuildingOffFoundationParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation;
        buildingOrStoryLeaningParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning;
        rackingDamageToWallsOtherStructuralDamageParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage;
        chimneyParapetOrOtherFallingHazardParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard;
        groundSlopeMovementOrCrackingParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking;
        otherParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther;
        if ("NEPAL" == current_mode) {
            $.scrollViewRapidEvaluation.remove($.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage);
            $.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage = null;
            $.viewAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.setTop(0);
            $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.setTop(70);
            $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.setTop(170);
            $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.setTop(240);
            $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.setTop(340);
            $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.setTop(440);
            $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.setTop(540);
            $.viewAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.setTop(610);
            $.viewAppButtonSave.setTop(680);
        } else {
            var estimatedBuildingDamageValues = {
                0: {
                    title: L("generic_estimated_building_damage_none")
                },
                1: {
                    title: "0-1%"
                },
                2: {
                    title: "1-10%"
                },
                3: {
                    title: "10-30%"
                },
                4: {
                    title: "30-60%"
                },
                5: {
                    title: "60-100%"
                },
                6: {
                    title: "100%"
                }
            };
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage.init(L("generic_estimated_building_damage_text_msg"), estimatedBuildingDamageValues, OnEstimatedBuildingDamage_Change, null, estimatedBuildingDamageParentView);
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage.enabled(view_enabled);
            Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"] && $.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage.set_selected_index(Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"]);
        }
        var collapsePartialCollapseOrBuildingOffFoundationValues = {
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
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.init(L("generic_collapse_partial_collapse_or_building_off_foundation_text_msg"), collapsePartialCollapseOrBuildingOffFoundationValues, OnCollapsePartialCollapseOrBuildingOffFoundation_Change, null, collapsePartialCollapseOrBuildingOffFoundationParentView);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.enabled(view_enabled);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.set_label_height(80);
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
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.init(L("generic_building_or_story_leaning_text_msg"), buildingOrStoryLeaningValues, OnBuildingOrStoryLeaning_Change, null, buildingOrStoryLeaningParentView);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.enabled(view_enabled);
        var rackingDamageToWallsOtherStructuralDamageValues = {
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
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.init(L("generic_racking_damage_to_walls_other_structural_damage_text_msg"), rackingDamageToWallsOtherStructuralDamageValues, OnRackingDamageToWallsOtherStructuralDamage_Change, null, rackingDamageToWallsOtherStructuralDamageParentView);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.enabled(view_enabled);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.set_label_height(80);
        var chimneyParapetOrOtherFallingHazardValues = {
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
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.init(L("generic_chimney_parapet_or_other_falling_hazard_text_msg"), chimneyParapetOrOtherFallingHazardValues, OnChimneyParapetOrOtherFallingHazard_Change, null, chimneyParapetOrOtherFallingHazardParentView);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.enabled(view_enabled);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.set_label_height(80);
        var groundSlopeMovementOrCrackingValues = {
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
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.init(L("generic_ground_slope_movement_or_cracking_text_msg"), groundSlopeMovementOrCrackingValues, OnGroundSlopeMovementOrCracking_Change, null, groundSlopeMovementOrCrackingParentView);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.enabled(view_enabled);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.set_label_height(80);
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
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.init(L("generic_other_text_msg"), otherValues, OnOther_Change, null, otherParentView);
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.enabled(view_enabled);
        if (rapidEvaluationValue) {
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.set_selected_index(rapidEvaluationValue.charAt(0));
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.set_selected_index(rapidEvaluationValue.charAt(1));
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.set_selected_index(rapidEvaluationValue.charAt(2));
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.set_selected_index(rapidEvaluationValue.charAt(3));
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.set_selected_index(rapidEvaluationValue.charAt(4));
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.set_selected_index(rapidEvaluationValue.charAt(5));
        }
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.init(L("generic_general_comments_txt_hint"), OnGeneralComments_Change);
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.set_text_value(Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"]);
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.init(L("generic_other_text_msg"), OnOtherName_Change);
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.set_text_value(Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.atc20ModeRapidEvaluationWindow, [ $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.get_text_field(), $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.get_text_field() ]);
        $.atc20ModeRapidEvaluationWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;