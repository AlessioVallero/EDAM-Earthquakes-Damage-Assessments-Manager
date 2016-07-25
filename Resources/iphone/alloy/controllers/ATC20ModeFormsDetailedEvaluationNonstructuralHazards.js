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
            $.navigationWindowDetailedEvaluationNonstructuralHazards.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnParapetsOrnamentation_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(10, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnCladdingGlazing_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(11, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnCeilingsLightFixtures_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(12, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnInteriorWallsPartitions_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(13, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnElevators_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(14, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnStairsExits_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(15, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnElectricGas_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(16, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnSignificantFireSafetyConcerns_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(17, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change(e) {
        try {
            var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt(18, Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"], e.id);
            Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOtherName_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.get_text_value();
    }
    function OnComments_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.get_text_value();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsDetailedEvaluationNonstructuralHazards";
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
    $.__views.atc20ModeDetailedEvaluationNonstructuralHazardsWindow = Ti.UI.createWindow({
        title: L("atc20_detailed_evaluation_nonstructural_hazards_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeDetailedEvaluationNonstructuralHazardsWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.atc20ModeDetailedEvaluationNonstructuralHazardsWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewDetailedEvaluationNonstructuralHazards"
    });
    $.__views.atc20ModeDetailedEvaluationNonstructuralHazardsWindow.add($.__views.scrollViewDetailedEvaluationNonstructuralHazards);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments"
    });
    $.__views.scrollViewDetailedEvaluationNonstructuralHazards.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments);
    $.__views.navigationWindowDetailedEvaluationNonstructuralHazards = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.atc20ModeDetailedEvaluationNonstructuralHazardsWindow,
        id: "navigationWindowDetailedEvaluationNonstructuralHazards"
    });
    $.__views.navigationWindowDetailedEvaluationNonstructuralHazards && $.addTopLevelView($.__views.navigationWindowDetailedEvaluationNonstructuralHazards);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var nonstructuralHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"];
        var parapetsOrnamentationParentView = null;
        var claddingGlazingParentView = null;
        var ceilingsLightFixturesParentView = null;
        var interiorWallsPartitionsParentView = null;
        var elevatorsParentView = null;
        var stairsExitsParentView = null;
        var electricGasParentView = null;
        var significantFireSafetyConcernsParentView = null;
        var otherParentView = null;
        var mainView = $.getView();
        parapetsOrnamentationParentView = mainView;
        claddingGlazingParentView = mainView;
        ceilingsLightFixturesParentView = mainView;
        interiorWallsPartitionsParentView = mainView;
        elevatorsParentView = mainView;
        stairsExitsParentView = mainView;
        electricGasParentView = mainView;
        significantFireSafetyConcernsParentView = mainView;
        otherParentView = mainView;
        var parapetsOrnamentationValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation.init(L("generic_parapets_ornamentation_text_msg"), parapetsOrnamentationValues, OnParapetsOrnamentation_Change, null, parapetsOrnamentationParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation.enabled(view_enabled);
        var claddingGlazingValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing.init(L("generic_cladding_glazing_text_msg"), claddingGlazingValues, OnCladdingGlazing_Change, null, claddingGlazingParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing.enabled(view_enabled);
        var ceilingsLightFixturesValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures.init(L("generic_ceilings_light_fixtures_text_msg"), ceilingsLightFixturesValues, OnCeilingsLightFixtures_Change, null, ceilingsLightFixturesParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures.enabled(view_enabled);
        var interiorWallsPartitionsValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.enabled(view_enabled);
        var elevatorsValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators.init(L("generic_elevators_text_msg"), elevatorsValues, OnElevators_Change, null, elevatorsParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators.enabled(view_enabled);
        var stairsExitsValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.init(L("generic_stairs_exits_text_msg"), stairsExitsValues, OnStairsExits_Change, null, stairsExitsParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.enabled(view_enabled);
        var electricGasValues = {
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.init(L("generic_electric_gas_text_msg"), electricGasValues, OnElectricGas_Change, null, electricGasParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.enabled(view_enabled);
        if ("CA" == current_mode) {
            $.scrollViewDetailedEvaluationNonstructuralHazards.remove($.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns = null;
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.setTop(490);
            $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.setTop(560);
            $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.setTop(630);
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.init(L("generic_interior_walls_partitions_text_msg"), interiorWallsPartitionsValues, OnInteriorWallsPartitions_Change, null, interiorWallsPartitionsParentView);
        } else if ("NZ" == current_mode) {
            var significantFireSafetyConcernsValues = {
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
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns.init(L("generic_significant_fire_safety_concerns_text_msg"), significantFireSafetyConcernsValues, OnSignificantFireSafetyConcerns_Change, null, significantFireSafetyConcernsParentView);
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns.enabled(view_enabled);
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.init(L("generic_interior_walls_partitions_text_msg"), interiorWallsPartitionsValues, OnInteriorWallsPartitions_Change, null, interiorWallsPartitionsParentView);
        } else if ("NEPAL" == current_mode) {
            $.scrollViewDetailedEvaluationNonstructuralHazards.remove($.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns = null;
            $.scrollViewDetailedEvaluationNonstructuralHazards.remove($.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators = null;
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.setTop(280);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.setTop(350);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.setTop(420);
            $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.setTop(490);
            $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.setTop(560);
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.init(L("generic_brick_infill_partitions_text_msg"), interiorWallsPartitionsValues, OnInteriorWallsPartitions_Change, null, interiorWallsPartitionsParentView);
        }
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.init(L("generic_other_text_msg"), otherValues, OnOther_Change, null, otherParentView);
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.enabled(view_enabled);
        if (nonstructuralHazardsValue) {
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation.set_selected_index(nonstructuralHazardsValue.charAt(10));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing.set_selected_index(nonstructuralHazardsValue.charAt(11));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures.set_selected_index(nonstructuralHazardsValue.charAt(12));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.set_selected_index(nonstructuralHazardsValue.charAt(13));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators.set_selected_index(nonstructuralHazardsValue.charAt(14));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.set_selected_index(nonstructuralHazardsValue.charAt(15));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.set_selected_index(nonstructuralHazardsValue.charAt(16));
            "NZ" == current_mode && $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns.set_selected_index(nonstructuralHazardsValue.charAt(17));
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.set_selected_index(nonstructuralHazardsValue.charAt(18));
        }
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.init(L("generic_other_text_msg"), OnOtherName_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"]);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.init(L("generic_comments_text_msg"), OnComments_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"]);
        RegisterHideKeyboard($.atc20ModeDetailedEvaluationNonstructuralHazardsWindow, [ $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.get_text_field() ]);
        $.navigationWindowDetailedEvaluationNonstructuralHazards.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;