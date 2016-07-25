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
            $.navigationWindowSectionEight.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnStructural_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] = e.id;
    }
    function OnNotStructural_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] = e.id;
    }
    function OnExternal_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] = e.id;
    }
    function OnGeotechnical_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] = e.id;
    }
    function OnOutcomePracticability_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] = e.id;
    }
    function OnHousingUnitsUninhabitable_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"] = e.id;
    }
    function OnFamiliesEvacuated_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"] = e.id;
    }
    function OnEvacueesN_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"] = e.id;
    }
    function OnAccuracyVisit_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] = e.id;
    }
    function OnOther_Change(e) {
        Alloy.Globals.AeDESModeSectionEight["OTHER"] = e.id;
    }
    function OnTableViewAeDESModeFormsSectionEightMeasuresOfEmergency_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionEightMeasuresOfEmergency", {
                measures_of_emergency_id: e.index,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionEightView";
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
    $.__views.aedesModeSectionEightWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_eight_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionEightWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.aedesModeSectionEightWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewSectionEight = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewSectionEight"
    });
    $.__views.aedesModeSectionEightWindow.add($.__views.scrollViewSectionEight);
    $.__views.viewAppComboBoxAeDESModeFormsSectionEightStructural = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionEightStructural"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppComboBoxAeDESModeFormsSectionEightStructural);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightStructural = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionEightStructural",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionEightStructural
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightStructural.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionEightStructural);
    $.__views.viewAppComboBoxAeDESModeFormsSectionEightNotStructural = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionEightNotStructural"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppComboBoxAeDESModeFormsSectionEightNotStructural);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionEightNotStructural",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionEightNotStructural
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionEightNotStructural);
    $.__views.viewAppComboBoxAeDESModeFormsSectionEightExternal = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionEightExternal"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppComboBoxAeDESModeFormsSectionEightExternal);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightExternal = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionEightExternal",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionEightExternal
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightExternal.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionEightExternal);
    $.__views.viewAppComboBoxAeDESModeFormsSectionEightGeotechnical = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionEightGeotechnical"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppComboBoxAeDESModeFormsSectionEightGeotechnical);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionEightGeotechnical
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionEightGeotechnical);
    $.__views.viewAppComboBoxAeDESModeFormsSectionEightOutcomePracticability = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionEightOutcomePracticability"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppComboBoxAeDESModeFormsSectionEightOutcomePracticability);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionEightOutcomePracticability
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionEightOutcomePracticability);
    $.__views.viewAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable);
    $.__views.viewAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated);
    $.__views.viewAppTextFieldAeDESModeFormsSectionEightEvacueesN = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionEightEvacueesN"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppTextFieldAeDESModeFormsSectionEightEvacueesN);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionEightEvacueesN
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionEightEvacueesN);
    $.__views.viewAppComboBoxAeDESModeFormsSectionEightAccuracyVisit = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionEightAccuracyVisit"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppComboBoxAeDESModeFormsSectionEightAccuracyVisit);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionEightAccuracyVisit
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionEightAccuracyVisit);
    $.__views.viewAppTextFieldAeDESModeFormsSectionEightOther = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionEightOther"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppTextFieldAeDESModeFormsSectionEightOther);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightOther = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionEightOther",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionEightOther
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionEightOther.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionEightOther);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergency = Ti.UI.createLabel({
        text: L("generic_measures_of_emergency_text_msg"),
        top: 700,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergency"
    });
    $.__views.scrollViewSectionEight.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergency);
    var __alloyId43 = [];
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowHoopsStuds = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowHoopsStuds"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowHoopsStuds);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowHoopsStuds = Ti.UI.createLabel({
        text: L("generic_hoops_studs_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowHoopsStuds"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowHoopsStuds.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowHoopsStuds);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsLightDamageToTheCladdingAndPartitions = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsLightDamageToTheCladdingAndPartitions"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsLightDamageToTheCladdingAndPartitions);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsLightDamageToTheCladdingAndPartitions = Ti.UI.createLabel({
        text: L("generic_repairs_light_damage_to_the_cladding_and_partitions_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsLightDamageToTheCladdingAndPartitions"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsLightDamageToTheCladdingAndPartitions.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsLightDamageToTheCladdingAndPartitions);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairCoverage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairCoverage"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairCoverage);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairCoverage = Ti.UI.createLabel({
        text: L("generic_repair_coverage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairCoverage"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairCoverage.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairCoverage);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowShoringStairs = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowShoringStairs"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowShoringStairs);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowShoringStairs = Ti.UI.createLabel({
        text: L("generic_shoring_stairs_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowShoringStairs"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowShoringStairs.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowShoringStairs);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingPlasterPanelingFalseCeilings = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingPlasterPanelingFalseCeilings"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingPlasterPanelingFalseCeilings);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingPlasterPanelingFalseCeilings = Ti.UI.createLabel({
        text: L("generic_removing_plaster_paneling_false_ceilings_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingPlasterPanelingFalseCeilings"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingPlasterPanelingFalseCeilings.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingPlasterPanelingFalseCeilings);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingTilesChimneysParapets = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingTilesChimneysParapets"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingTilesChimneysParapets);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingTilesChimneysParapets = Ti.UI.createLabel({
        text: L("generic_removing_tiles_chimneys_parapets_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingTilesChimneysParapets"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingTilesChimneysParapets.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovingTilesChimneysParapets);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfCornicesParapetsOverhangs = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfCornicesParapetsOverhangs"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfCornicesParapetsOverhangs);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfCornicesParapetsOverhangs = Ti.UI.createLabel({
        text: L("generic_removal_of_cornices_parapets_overhangs_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfCornicesParapetsOverhangs"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfCornicesParapetsOverhangs.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfCornicesParapetsOverhangs);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfOtherInternalOrExternalObjects = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfOtherInternalOrExternalObjects"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfOtherInternalOrExternalObjects);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfOtherInternalOrExternalObjects = Ti.UI.createLabel({
        text: L("generic_removal_of_other_internal_or_external_objects_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfOtherInternalOrExternalObjects"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfOtherInternalOrExternalObjects.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRemovalOfOtherInternalOrExternalObjects);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowBarriersAndProtectionSteps = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowBarriersAndProtectionSteps"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowBarriersAndProtectionSteps);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowBarriersAndProtectionSteps = Ti.UI.createLabel({
        text: L("generic_barriers_and_protection_steps_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowBarriersAndProtectionSteps"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowBarriersAndProtectionSteps.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowBarriersAndProtectionSteps);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsOfPlantNetworks = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsOfPlantNetworks"
    });
    __alloyId43.push($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsOfPlantNetworks);
    $.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsOfPlantNetworks = Ti.UI.createLabel({
        text: L("generic_repairs_of_plant_networks_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsOfPlantNetworks"
    });
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsOfPlantNetworks.add($.__views.lblAeDESModeFormsSectionEightMeasuresOfEmergencyRowRepairsOfPlantNetworks);
    $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergency = Ti.UI.createTableView({
        top: 730,
        backgroundColor: "#ffffff",
        height: 300,
        width: Ti.UI.FILL,
        data: __alloyId43,
        id: "tableViewAeDESModeFormsSectionEightMeasuresOfEmergency"
    });
    $.__views.scrollViewSectionEight.add($.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergency);
    OnTableViewAeDESModeFormsSectionEightMeasuresOfEmergency_Click ? $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergency.addEventListener("click", OnTableViewAeDESModeFormsSectionEightMeasuresOfEmergency_Click) : __defers["$.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergency!click!OnTableViewAeDESModeFormsSectionEightMeasuresOfEmergency_Click"] = true;
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 1040,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionEight.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowSectionEight = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.aedesModeSectionEightWindow,
        id: "navigationWindowSectionEight"
    });
    $.__views.navigationWindowSectionEight && $.addTopLevelView($.__views.navigationWindowSectionEight);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var structuralParentView = null;
        var notStructuralParentView = null;
        var externalParentView = null;
        var geotechnicalParentView = null;
        var outcomePracticabilityParentView = null;
        var accuracyVisitParentView = null;
        var mainView = $.getView();
        structuralParentView = mainView;
        notStructuralParentView = mainView;
        externalParentView = mainView;
        geotechnicalParentView = mainView;
        outcomePracticabilityParentView = mainView;
        accuracyVisitParentView = mainView;
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
        $.widgetAppComboBoxAeDESModeFormsSectionEightStructural.init(L("generic_structural_text_msg"), structuralValues, OnStructural_Change, null, structuralParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionEightStructural.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] && $.widgetAppComboBoxAeDESModeFormsSectionEightStructural.set_selected_index(Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"]);
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
        $.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural.init(L("generic_not_structural_text_msg"), notStructuralValues, OnNotStructural_Change, null, notStructuralParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] && $.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural.set_selected_index(Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"]);
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
        $.widgetAppComboBoxAeDESModeFormsSectionEightExternal.init(L("generic_external_text_msg"), externalValues, OnExternal_Change, null, externalParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionEightExternal.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] && $.widgetAppComboBoxAeDESModeFormsSectionEightExternal.set_selected_index(Alloy.Globals.AeDESModeSectionEight["EXTERNAL"]);
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
        $.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical.init(L("generic_geotechnical_text_msg"), geotechnicalValues, OnGeotechnical_Change, null, geotechnicalParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] && $.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical.set_selected_index(Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"]);
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
        $.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability.init(L("generic_outcome_practicability_text_msg"), outcomePracticabilityValues, OnOutcomePracticability_Change, null, outcomePracticabilityParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] && $.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability.set_selected_index(Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"]);
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
        $.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit.init(L("generic_accuracy_visit_text_msg"), accuracyVisitValues, OnAccuracyVisit_Change, null, accuracyVisitParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] && $.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit.set_selected_index(Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"]);
        $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.init(L("generic_housing_units_uninhabitable_txt_hint"), OnHousingUnitsUninhabitable_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.set_text_value(Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.init(L("generic_families_evacuated_txt_hint"), OnFamiliesEvacuated_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.set_text_value(Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"]);
        $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.init(L("generic_evacuees_n_txt_hint"), OnEvacueesN_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.set_text_value(Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"]);
        $.widgetAppTextFieldAeDESModeFormsSectionEightOther.init(L("generic_other_txt_hint"), OnOther_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionEightOther.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionEightOther.set_text_value(Alloy.Globals.AeDESModeSectionEight["OTHER"]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.aedesModeSectionEightWindow, [ $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionEightOther.get_text_field() ]);
        $.navigationWindowSectionEight.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergency!click!OnTableViewAeDESModeFormsSectionEightMeasuresOfEmergency_Click"] && $.__views.tableViewAeDESModeFormsSectionEightMeasuresOfEmergency.addEventListener("click", OnTableViewAeDESModeFormsSectionEightMeasuresOfEmergency_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;