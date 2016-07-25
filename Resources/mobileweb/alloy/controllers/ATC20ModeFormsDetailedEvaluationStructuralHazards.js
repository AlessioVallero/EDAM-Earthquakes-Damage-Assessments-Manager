function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnFoundations_Change(e) {
        try {
            var newStructuralHazardsValue = Alloy.Globals.replaceCharAt(3, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRoofsFloors_Change(e) {
        try {
            var newStructuralHazardsValue = Alloy.Globals.replaceCharAt(4, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnColumnsPilastersCorbels_Change(e) {
        try {
            var newStructuralHazardsValue = Alloy.Globals.replaceCharAt(5, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnDiaphragmsHorizontalBracing_Change(e) {
        try {
            var newStructuralHazardsValue = Alloy.Globals.replaceCharAt(6, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnWallsVerticalBracing_Change(e) {
        try {
            var newStructuralHazardsValue = Alloy.Globals.replaceCharAt(7, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPrecastConnections_Change(e) {
        try {
            var newStructuralHazardsValue = Alloy.Globals.replaceCharAt(8, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change(e) {
        try {
            var newStructuralHazardsValue = Alloy.Globals.replaceCharAt(9, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOtherName_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.get_text_value();
    }
    function OnComments_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.get_text_value();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsDetailedEvaluationStructuralHazards";
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
    $.__views.atc20ModeDetailedEvaluationStructuralHazardsWindow = Ti.UI.createWindow({
        title: L("atc20_detailed_evaluation_structural_hazards_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeDetailedEvaluationStructuralHazardsWindow"
    });
    $.__views.atc20ModeDetailedEvaluationStructuralHazardsWindow && $.addTopLevelView($.__views.atc20ModeDetailedEvaluationStructuralHazardsWindow);
    $.__views.scrollViewDetailedEvaluationStructuralHazards = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewDetailedEvaluationStructuralHazards"
    });
    $.__views.atc20ModeDetailedEvaluationStructuralHazardsWindow.add($.__views.scrollViewDetailedEvaluationStructuralHazards);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors = Ti.UI.createView({
        top: 70,
        height: 80,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels = Ti.UI.createView({
        top: 170,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing = Ti.UI.createView({
        top: 240,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing = Ti.UI.createView({
        top: 310,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections = Ti.UI.createView({
        top: 380,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther = Ti.UI.createView({
        top: 450,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName = Ti.UI.createView({
        top: 520,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments = Ti.UI.createView({
        top: 590,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 10,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments"
    });
    $.__views.scrollViewDetailedEvaluationStructuralHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var structuralHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"];
        var foundationsParentView = null;
        var roofsFloorsParentView = null;
        var columnsPilastersCorbelsParentView = null;
        var diaphragmsHorizontalBracingParentView = null;
        var wallsVerticalBracingParentView = null;
        var precastConnectionsParentView = null;
        var otherParentView = null;
        foundationsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations;
        roofsFloorsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors;
        columnsPilastersCorbelsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels;
        diaphragmsHorizontalBracingParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing;
        wallsVerticalBracingParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing;
        precastConnectionsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections;
        otherParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther;
        var foundationsValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations.init(L("generic_foundations_text_msg"), foundationsValues, OnFoundations_Change, null, foundationsParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations.enabled(view_enabled);
        var roofsFloorsValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.init(L("generic_roofs_floors_text_msg"), roofsFloorsValues, OnRoofsFloors_Change, null, roofsFloorsParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.enabled(view_enabled);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.set_label_height(80);
        var columnsPilastersCorbelsValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels.init(L("generic_columns_pilasters_corbels_text_msg"), columnsPilastersCorbelsValues, OnColumnsPilastersCorbels_Change, null, columnsPilastersCorbelsParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels.enabled(view_enabled);
        var diaphragmsHorizontalBracingValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.init(L("generic_diaphragms_horizontal_bracing_text_msg"), diaphragmsHorizontalBracingValues, OnDiaphragmsHorizontalBracing_Change, null, diaphragmsHorizontalBracingParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.enabled(view_enabled);
        if ("CA" == current_mode) {
            var wallsVerticalBracingValues = {
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
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.init(L("generic_walls_vertical_bracing_text_msg"), wallsVerticalBracingValues, OnWallsVerticalBracing_Change, null, wallsVerticalBracingParentView);
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.enabled(view_enabled);
        } else if ("NZ" == current_mode) {
            $.scrollViewDetailedEvaluationStructuralHazards.remove($.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing = null;
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.setTop(310);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.setTop(380);
            $.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.setTop(450);
            $.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.setTop(520);
        }
        var precastConnectionsValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.init(L("generic_precast_connections_text_msg"), precastConnectionsValues, OnPrecastConnections_Change, null, precastConnectionsParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.enabled(view_enabled);
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.init(L("generic_other_text_msg"), otherValues, OnOther_Change, null, otherParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.enabled(view_enabled);
        if (structuralHazardsValue) {
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations.set_selected_index(structuralHazardsValue.charAt(3));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.set_selected_index(structuralHazardsValue.charAt(4));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels.set_selected_index(structuralHazardsValue.charAt(5));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.set_selected_index(structuralHazardsValue.charAt(6));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.set_selected_index(structuralHazardsValue.charAt(7));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.set_selected_index(structuralHazardsValue.charAt(8));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.set_selected_index(structuralHazardsValue.charAt(9));
        }
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.init(L("generic_other_text_msg"), OnOtherName_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"]);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.init(L("generic_comments_text_msg"), OnComments_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"]);
        $.atc20ModeDetailedEvaluationStructuralHazardsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;