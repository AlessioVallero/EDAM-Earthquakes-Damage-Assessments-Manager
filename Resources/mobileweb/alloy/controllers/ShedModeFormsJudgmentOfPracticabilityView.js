function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnStructural_Change(e) {
        Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] = e.id;
    }
    function OnNotStructural_Change(e) {
        Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] = e.id;
    }
    function OnExternal_Change(e) {
        Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] = e.id;
    }
    function OnGeotechnical_Change(e) {
        Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] = e.id;
    }
    function OnOutcomePracticability_Change(e) {
        Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] = e.id;
    }
    function OnHousingUnitsUninhabitable_Change() {
        Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.get_text_value();
    }
    function OnFamiliesEvacuated_Change() {
        Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.get_text_value();
    }
    function OnEvacueesN_Change() {
        Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.get_text_value();
    }
    function OnAccuracyVisit_Change(e) {
        Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] = e.id;
    }
    function OnOther_Change() {
        Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.get_text_value();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsJudgmentOfPracticabilityView";
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
    $.__views.shedModeJudgmentOfPracticabilityWindow = Ti.UI.createWindow({
        title: L("shed_mode_judgment_of_practicability_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeJudgmentOfPracticabilityWindow"
    });
    $.__views.shedModeJudgmentOfPracticabilityWindow && $.addTopLevelView($.__views.shedModeJudgmentOfPracticabilityWindow);
    $.__views.scrollViewJudgmentOfPracticability = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewJudgmentOfPracticability"
    });
    $.__views.shedModeJudgmentOfPracticabilityWindow.add($.__views.scrollViewJudgmentOfPracticability);
    $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit);
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit
    });
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit.setParent($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit);
    $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability);
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability
    });
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability.setParent($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability);
    $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural);
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural
    });
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural.setParent($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural);
    $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural);
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural
    });
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural.setParent($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural);
    $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal);
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal
    });
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal.setParent($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal);
    $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical);
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical
    });
    $.__views.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical.setParent($.__views.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical);
    $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable);
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable
    });
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.setParent($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable);
    $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated);
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated
    });
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.setParent($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated);
    $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN);
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN
    });
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.setParent($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN);
    $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityOther = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsJudgmentOfPracticabilityOther"
    });
    $.__views.scrollViewJudgmentOfPracticability.add($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityOther);
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityOther
    });
    $.__views.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.setParent($.__views.viewAppTextFieldShedModeFormsJudgmentOfPracticabilityOther);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var accuracyVisitParentView = null;
        var outcomePracticabilityParentView = null;
        var structuralParentView = null;
        var notStructuralParentView = null;
        var externalParentView = null;
        var geotechnicalParentView = null;
        accuracyVisitParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit;
        outcomePracticabilityParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability;
        structuralParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural;
        notStructuralParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural;
        externalParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal;
        geotechnicalParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical;
        var accuracyVisitValues = {
            0: {
                title: L("generic_accuracy_visit_complete_2_3")
            },
            1: {
                title: L("generic_accuracy_visit_partial")
            },
            2: {
                title: L("generic_accuracy_visit_outside_only")
            },
            3: {
                title: L("generic_accuracy_visit_refused_inspection")
            },
            4: {
                title: L("generic_accuracy_visit_owner_not_found")
            },
            5: {
                title: L("generic_accuracy_visit_ruin")
            },
            6: {
                title: L("generic_accuracy_visit_demolished")
            },
            7: {
                title: L("generic_accuracy_visit_other")
            }
        };
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit.init(L("generic_accuracy_visit_text_msg"), accuracyVisitValues, OnAccuracyVisit_Change, null, accuracyVisitParentView);
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit.enabled(view_enabled);
        Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] && $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit.set_selected_index(Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"]);
        var outcomePracticabilityValues = {
            0: {
                title: L("generic_outcome_practicability_accessible")
            },
            1: {
                title: L("generic_outcome_practicability_temporarily_unusable")
            },
            2: {
                title: L("generic_outcome_practicability_partially_unusable")
            },
            3: {
                title: L("generic_outcome_practicability_temporarily_unusable_to_be_reviewed")
            },
            4: {
                title: L("generic_outcome_practicability_unusable")
            },
            5: {
                title: L("generic_outcome_practicability_unusable_for_external_risk")
            }
        };
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability.init(L("generic_outcome_practicability_text_msg"), outcomePracticabilityValues, OnOutcomePracticability_Change, null, outcomePracticabilityParentView);
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability.enabled(view_enabled);
        Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] && $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability.set_selected_index(Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"]);
        var structuralValues = {
            0: {
                title: L("generic_structural_low")
            },
            1: {
                title: L("generic_structural_low_with_measures")
            },
            2: {
                title: L("generic_structural_high")
            }
        };
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural.init(L("generic_structural_text_msg"), structuralValues, OnStructural_Change, null, structuralParentView);
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural.enabled(view_enabled);
        Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] && $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural.set_selected_index(Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"]);
        var notStructuralValues = {
            0: {
                title: L("generic_not_structural_low")
            },
            1: {
                title: L("generic_not_structural_low_with_measures")
            },
            2: {
                title: L("generic_not_structural_high")
            }
        };
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural.init(L("generic_not_structural_text_msg"), notStructuralValues, OnNotStructural_Change, null, notStructuralParentView);
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural.enabled(view_enabled);
        Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] && $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural.set_selected_index(Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"]);
        var externalValues = {
            0: {
                title: L("generic_external_low")
            },
            1: {
                title: L("generic_external_low_with_measures")
            },
            2: {
                title: L("generic_external_high")
            }
        };
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal.init(L("generic_external_text_msg"), externalValues, OnExternal_Change, null, externalParentView);
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal.enabled(view_enabled);
        Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] && $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal.set_selected_index(Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"]);
        var geotechnicalValues = {
            0: {
                title: L("generic_geotechnical_low")
            },
            1: {
                title: L("generic_geotechnical_low_with_measures")
            },
            2: {
                title: L("generic_geotechnical_high")
            }
        };
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical.init(L("generic_geotechnical_text_msg"), geotechnicalValues, OnGeotechnical_Change, null, geotechnicalParentView);
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical.enabled(view_enabled);
        Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] && $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical.set_selected_index(Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"]);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.init(L("generic_housing_units_uninhabitable_txt_hint"), OnHousingUnitsUninhabitable_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.set_text_value(Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"]);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.init(L("generic_families_evacuated_txt_hint"), OnFamiliesEvacuated_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.set_text_value(Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"]);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.init(L("generic_evacuees_n_txt_hint"), OnEvacueesN_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.set_text_value(Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"]);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.init(L("generic_other_txt_hint"), OnOther_Change);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.set_text_value(Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"]);
        $.shedModeJudgmentOfPracticabilityWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;