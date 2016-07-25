function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBeamColumnConnectionThroughAxleSteel_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBeamColumnConnectionByPinsAndSteelPlates_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 1, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBeamColumnConnectionInSteelByCables_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 2, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 3, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPrefabSystemRollOfBeam_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 4, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 5, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 6, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnPillarPillarConnectionThroughStrandSteel_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 7, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 8, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 9, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 10, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTileBeamConnection_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 11, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnConstructionOfBracingGroundWithSteelRopes_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(13 * current_structural_elements_id + 12, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsDetails";
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
    $.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow && $.addTopLevelView($.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow);
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow.add($.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement = Ti.UI.createView({
        top: 210,
        height: 80,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam = Ti.UI.createView({
        top: 310,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier = Ti.UI.createView({
        top: 380,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier = Ti.UI.createView({
        top: 450,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel = Ti.UI.createView({
        top: 520,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs = Ti.UI.createView({
        top: 590,
        height: 80,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs = Ti.UI.createView({
        top: 690,
        height: 80,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile = Ti.UI.createView({
        top: 790,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection = Ti.UI.createView({
        top: 860,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes = Ti.UI.createView({
        top: 930,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_structural_elements_id = args.structural_elements_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow.setTitle(current_father_title);
        var measuresOfEmergency = Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"];
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel.init(L("generic_beam_column_connection_through_axle_steel_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id), OnBeamColumnConnectionThroughAxleSteel_Change, "/images/Help/beam_column_connection_through_axle_steel.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates.init(L("generic_beam_column_connection_by_pins_and_steel_plates_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 1), OnBeamColumnConnectionByPinsAndSteelPlates_Change, "/images/Help/beam_column_connection_by_pins_and_steel_plates.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables.init(L("generic_beam_column_connection_in_steel_by_cables_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 2), OnBeamColumnConnectionInSteelByCables_Change, "/images/Help/beam_column_connection_in_steel_by_cables.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.init(L("generic_inclusion_of_connectors_for_steel_beam_bolted_a_pillar_with_confinement_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 3), OnInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement_Change, "/images/Help/inclusion_of_connectors_for_steel_beam_bolted_a_pillar_with_confinement.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.set_label_height(80);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam.init(L("generic_prefab_system_roll_of_beam_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 4), OnPrefabSystemRollOfBeam_Change, "/images/Help/prefab_system_roll_of_beam.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier.init(L("generic_pillar_pillar_connection_through_metal_profiles_on_axis_at_the_pier_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 5), OnPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier_Change, "/images/Help/pillar_pillar_connection_through_metal_profiles_on_axis_at_the_pier.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier.init(L("generic_pillar_pillar_connection_through_metal_dishes_at_the_end_of_the_pier_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 6), OnPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier_Change, "/images/Help/pillar_pillar_connection_through_metal_dishes_at_the_end_of_pier.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel.init(L("generic_pillar_pillar_connection_through_strand_steel_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 7), OnPillarPillarConnectionThroughStrandSteel_Change, "/images/Help/pillar_pillar_connection_through_strand_steel.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.init(L("generic_beam_tile_connection_through_anchored_steel_cables_on_the_sides_of_the_legs_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 8), OnBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs_Change, "/images/Help/beam_tile_connection_through_anchored_steel_cables_on_the_sides_of_the_legs.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.set_label_height(80);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.init(L("generic_beam_tile_connection_through_anchored_steel_cables_under_the_legs_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 9), OnBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs_Change, "/images/Help/beam_tile_connection_through_anchored_steel_cables_under_the_legs.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.set_label_height(80);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile.init(L("generic_inclusion_of_connectors_made_of_elements_in_a_bolted_steel_beam_and_tile_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 10), OnInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile_Change, "/images/Help/inclusion_of_connectors_made_of_elements_in_a_bolted_steel_beam_and_tile.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection.init(L("generic_tile_beam_connection_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 11), OnTileBeamConnection_Change, "/images/Help/tile_beam_connection.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes.init(L("generic_construction_of_bracing_ground_with_steel_ropes_text_msg"), measuresOfEmergency.charAt(13 * current_structural_elements_id + 12), OnConstructionOfBracingGroundWithSteelRopes_Change, "/images/Help/construction_of_bracing_ground_with_steel_ropes.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes.enabled(view_enabled);
        $.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;