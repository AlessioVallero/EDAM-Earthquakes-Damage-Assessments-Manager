function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnAndroidBackButton_Click() {
        bIsWorkInProgress || Back();
    }
    function Back() {
        try {
            Alloy.Globals.ShedModeDetails = new Array();
            Alloy.Globals.ShedModeShedPosition = new Array();
            Alloy.Globals.ShedModeShedCharacteristics = new Array();
            Alloy.Globals.ShedModeInfrastructure = new Array();
            Alloy.Globals.ShedModeDamages = new Array();
            Alloy.Globals.ShedModeJudgmentOfPracticability = new Array();
            Alloy.Globals.ShedModeOtherComments = new Array();
            Alloy.Globals.CurrentPicsPath = null;
            Alloy.Globals.CurrentVideosPath = null;
            controls = null;
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "shed_mode:save");
            $.shedModeFormsGeneralSectionWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultDetailsArray() {
        var current_date = new Date();
        var current_time = current_date.getTime();
        var default_form_no = current_date.getFullYear().toFixed(0);
        Alloy.Globals.ShedModeDetails = {
            FORM_NO: default_form_no,
            DATE: current_time.toString()
        };
    }
    function LoadDetailsData() {
        if (Alloy.Globals.ShedModeDetails && _.size(Alloy.Globals.ShedModeDetails) > 0) ; else if (-1 != current_form_id) {
            var ShedModeUtils = require("/ShedModeUtils");
            var recoverDetails = ShedModeUtils.LoadDetailsQuery(current_form_id);
            if (recoverDetails.length > 0) {
                var detailsData = recoverDetails.at(0);
                Alloy.Globals.ShedModeDetails = {
                    FORM_NO: detailsData.get("FORM_NO"),
                    DATE: detailsData.get("DATE")
                };
            } else CreateDefaultDetailsArray();
        } else CreateDefaultDetailsArray();
    }
    function OpenDetails() {
        try {
            LoadDetailsData();
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDetailsView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultShedPositionArray() {
        Alloy.Globals.ShedModeShedPosition = {
            LATITUDE: "",
            LONGITUDE: "",
            ALTITUDE: "",
            PROVINCE: "",
            MUNICIPALITY: "",
            PLACE: "",
            ADDRESS: "",
            CIVIC_NO: ""
        };
    }
    function LoadShedPositionData() {
        if (Alloy.Globals.ShedModeShedPosition && _.size(Alloy.Globals.ShedModeShedPosition) > 0) ; else if (-1 != current_form_id) {
            var ShedModeUtils = require("/ShedModeUtils");
            var recoverBuildingsPositions = ShedModeUtils.LoadShedPositionQuery(current_form_id);
            if (recoverBuildingsPositions.length > 0) {
                var shedPositionData = recoverBuildingsPositions.at(0);
                Alloy.Globals.ShedModeShedPosition = {
                    LATITUDE: shedPositionData.get("LATITUDE"),
                    LONGITUDE: shedPositionData.get("LONGITUDE"),
                    ALTITUDE: shedPositionData.get("ALTITUDE"),
                    PROVINCE: shedPositionData.get("PROVINCE"),
                    MUNICIPALITY: shedPositionData.get("MUNICIPALITY"),
                    PLACE: shedPositionData.get("PLACE"),
                    ADDRESS: shedPositionData.get("ADDRESS"),
                    CIVIC_NO: shedPositionData.get("CIVIC_NO")
                };
            } else CreateDefaultShedPositionArray();
        } else CreateDefaultShedPositionArray();
    }
    function OpenShedPosition() {
        try {
            LoadShedPositionData();
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsShedPositionView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultShedCharacteristicsArray() {
        Alloy.Globals.ShedModeShedCharacteristics = {
            SITE: "0",
            NOT_UNDERGROUND_PLANS_NO: "0",
            USAGE: "0"
        };
    }
    function LoadShedCharacteristicsData() {
        if (Alloy.Globals.ShedModeShedCharacteristics && _.size(Alloy.Globals.ShedModeShedCharacteristics) > 0) ; else if (-1 != current_form_id) {
            var ShedModeUtils = require("/ShedModeUtils");
            var recoverShedCharacteristics = ShedModeUtils.LoadShedCharacteristicsQuery(current_form_id);
            if (recoverShedCharacteristics.length > 0) {
                var shedCharacteristicsData = recoverShedCharacteristics.at(0);
                Alloy.Globals.ShedModeShedCharacteristics = {
                    SITE: shedCharacteristicsData.get("SITE"),
                    NOT_UNDERGROUND_PLANS_NO: shedCharacteristicsData.get("NOT_UNDERGROUND_PLANS_NO"),
                    USAGE: shedCharacteristicsData.get("USAGE")
                };
            } else CreateDefaultShedCharacteristicsArray();
        } else CreateDefaultShedCharacteristicsArray();
    }
    function OpenShedCharacteristics() {
        try {
            LoadShedCharacteristicsData();
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsShedCharacteristicsView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultInfrastructureArray() {
        Alloy.Globals.ShedModeInfrastructure = {
            PRIMARY_GIRDERS: "0",
            THICKNESS_OF_THE_TILES: "1",
            TYPICAL_LIGHTS: "0",
            COVERAGE: "0",
            INCLINATION_OF_THE_ROOF: "0",
            INFILL_ELEMENTS: "0",
            VERTICAL_WALLS: "0",
            SHELVING: "0"
        };
    }
    function LoadInfrastructureData() {
        if (Alloy.Globals.ShedModeInfrastructure && _.size(Alloy.Globals.ShedModeInfrastructure) > 0) ; else if (-1 != current_form_id) {
            var ShedModeUtils = require("/ShedModeUtils");
            var recoverInfrastructure = ShedModeUtils.LoadInfrastructureQuery(current_form_id);
            if (recoverInfrastructure.length > 0) {
                var infrastructureData = recoverInfrastructure.at(0);
                Alloy.Globals.ShedModeInfrastructure = {
                    PRIMARY_GIRDERS: infrastructureData.get("PRIMARY_GIRDERS"),
                    THICKNESS_OF_THE_TILES: infrastructureData.get("THICKNESS_OF_THE_TILES"),
                    TYPICAL_LIGHTS: infrastructureData.get("TYPICAL_LIGHTS"),
                    COVERAGE: infrastructureData.get("COVERAGE"),
                    INCLINATION_OF_THE_ROOF: infrastructureData.get("INCLINATION_OF_THE_ROOF"),
                    INFILL_ELEMENTS: infrastructureData.get("INFILL_ELEMENTS"),
                    VERTICAL_WALLS: infrastructureData.get("VERTICAL_WALLS"),
                    SHELVING: infrastructureData.get("SHELVING")
                };
            } else CreateDefaultInfrastructureArray();
        } else CreateDefaultInfrastructureArray();
    }
    function OpenInfrastructure() {
        try {
            LoadInfrastructureData();
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsInfrastructureView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultDamagesArray() {
        Alloy.Globals.ShedModeDamages = {
            DAMAGES: "000000000000000000000000000000000000000000000000000000000",
            MEASURES_OF_EMERGENCY: "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        };
    }
    function LoadDamagesData() {
        if (Alloy.Globals.ShedModeDamages && _.size(Alloy.Globals.ShedModeDamages) > 0) ; else if (-1 != current_form_id) {
            var ShedModeUtils = require("/ShedModeUtils");
            var recoverDamages = ShedModeUtils.LoadDamagesQuery(current_form_id);
            if (recoverDamages.length > 0) {
                var damagesData = recoverDamages.at(0);
                Alloy.Globals.ShedModeDamages = {
                    DAMAGES: damagesData.get("DAMAGES"),
                    MEASURES_OF_EMERGENCY: damagesData.get("MEASURES_OF_EMERGENCY")
                };
            } else CreateDefaultDamagesArray();
        } else CreateDefaultDamagesArray();
    }
    function OpenDamages() {
        try {
            LoadDamagesData();
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultJudgmentOfPracticabilityArray() {
        Alloy.Globals.ShedModeJudgmentOfPracticability = {
            STRUCTURAL: "0",
            NOT_STRUCTURAL: "0",
            EXTERNAL: "0",
            GEOTECHNICAL: "0",
            OUTCOME_PRACTICABILITY: "0",
            HOUSING_UNITS_UNINHABITABLE: "",
            FAMILIES_EVACUATED: "",
            EVACUEES_N: "",
            ACCURACY_VISIT: "0",
            OTHER: ""
        };
    }
    function LoadJudgmentOfPracticabilityData() {
        if (Alloy.Globals.ShedModeJudgmentOfPracticability && _.size(Alloy.Globals.ShedModeJudgmentOfPracticability) > 0) ; else if (-1 != current_form_id) {
            var ShedModeUtils = require("/ShedModeUtils");
            var recoverJudgmentOfPracticability = ShedModeUtils.LoadJudgmentOfPracticabilityQuery(current_form_id);
            if (recoverJudgmentOfPracticability.length > 0) {
                var judgmentOfPracticabilityData = recoverJudgmentOfPracticability.at(0);
                Alloy.Globals.ShedModeJudgmentOfPracticability = {
                    STRUCTURAL: judgmentOfPracticabilityData.get("STRUCTURAL"),
                    NOT_STRUCTURAL: judgmentOfPracticabilityData.get("NOT_STRUCTURAL"),
                    EXTERNAL: judgmentOfPracticabilityData.get("EXTERNAL"),
                    GEOTECHNICAL: judgmentOfPracticabilityData.get("GEOTECHNICAL"),
                    OUTCOME_PRACTICABILITY: judgmentOfPracticabilityData.get("OUTCOME_PRACTICABILITY"),
                    HOUSING_UNITS_UNINHABITABLE: judgmentOfPracticabilityData.get("HOUSING_UNITS_UNINHABITABLE"),
                    FAMILIES_EVACUATED: judgmentOfPracticabilityData.get("FAMILIES_EVACUATED"),
                    EVACUEES_N: judgmentOfPracticabilityData.get("EVACUEES_N"),
                    ACCURACY_VISIT: judgmentOfPracticabilityData.get("ACCURACY_VISIT"),
                    OTHER: judgmentOfPracticabilityData.get("OTHER")
                };
            } else CreateDefaultJudgmentOfPracticabilityArray();
        } else CreateDefaultJudgmentOfPracticabilityArray();
    }
    function OpenJudgmentOfPracticability() {
        try {
            LoadJudgmentOfPracticabilityData();
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsJudgmentOfPracticabilityView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultOtherCommentsArray() {
        Alloy.Globals.ShedModeOtherComments = {
            TOPIC: "",
            OTHER_COMMENTS: ""
        };
    }
    function LoadOtherCommentsData() {
        if (Alloy.Globals.ShedModeOtherComments && _.size(Alloy.Globals.ShedModeOtherComments) > 0) ; else if (-1 != current_form_id) {
            var ShedModeUtils = require("/ShedModeUtils");
            var recoverOtherComments = ShedModeUtils.LoadOtherCommentsQuery(current_form_id);
            if (recoverOtherComments.length > 0) {
                var otherCommentsData = recoverOtherComments.at(0);
                Alloy.Globals.ShedModeOtherComments = {
                    TOPIC: otherCommentsData.get("TOPIC"),
                    OTHER_COMMENTS: otherCommentsData.get("OTHER_COMMENTS")
                };
            } else CreateDefaultOtherCommentsArray();
        } else CreateDefaultOtherCommentsArray();
    }
    function OpenOtherComments() {
        try {
            LoadOtherCommentsData();
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsOtherCommentsView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadTeamPersonalData() {
        var ShedModeUtils = require("/ShedModeUtils");
        ShedModeUtils.LoadTeamPersonalData();
    }
    function handleMenuClick(_event) {
        try {
            bCanClickOnTableView && BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                switch (_event.row.id) {
                  case 0:
                    OpenDetails();
                    break;

                  case 1:
                    OpenShedPosition();
                    break;

                  case 2:
                    OpenShedCharacteristics();
                    break;

                  case 3:
                    OpenInfrastructure();
                    break;

                  case 4:
                    OpenDamages();
                    break;

                  case 5:
                    OpenJudgmentOfPracticability();
                    break;

                  case 6:
                    OpenOtherComments();
                }
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: L("generic_save_title"),
            message: L("save_confirm_msg"),
            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
            cancel: 1
        });
        alertDialog.addEventListener("click", function(e) {
            0 == e.index ? BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                try {
                    bCanClickOnTableView = false;
                    bIsWorkInProgress = true;
                    var bError = false;
                    var user = "";
                    Alloy.Globals.ExistSession() && (user = Alloy.Globals.SessionUsername);
                    var queryDetails = null;
                    if (-1 == current_form_id) {
                        Ti.API.info("\n\nDetails:");
                        queryDetails = "INSERT INTO ShedForms( FORM_NO, DATE, USER, SYNCHRONIZED ) VALUES( ";
                        if (Alloy.Globals.ShedModeDetails && _.size(Alloy.Globals.ShedModeDetails) > 0) {
                            if (Alloy.Globals.ShedModeDetails["FORM_NO"]) ; else {
                                var current_date = new Date();
                                Alloy.Globals.ShedModeDetails["FORM_NO"] = current_date.getFullYear().toFixed(0);
                            }
                            var detailsModel = Alloy.createModel("ShedForms", {
                                FORM_NO: Alloy.Globals.ShedModeDetails["FORM_NO"],
                                DATE: Alloy.Globals.ShedModeDetails["DATE"],
                                USER: user,
                                SYNCHRONIZED: "0"
                            });
                            detailsModel.save();
                            detailsModel = null;
                        } else {
                            var current_date = new Date();
                            var current_time = current_date.getTime();
                            var default_form_no = current_date.getFullYear().toFixed(0);
                            var detailsModel = Alloy.createModel("ShedForms", {
                                FORM_NO: default_form_no,
                                DATE: current_time.toString(),
                                USER: user,
                                SYNCHRONIZED: "0"
                            });
                            detailsModel.save();
                            detailsModel = null;
                        }
                    } else if (Alloy.Globals.ShedModeDetails && _.size(Alloy.Globals.ShedModeDetails) > 0) {
                        if (Alloy.Globals.ShedModeDetails["FORM_NO"]) ; else {
                            var current_date = new Date();
                            Alloy.Globals.ShedModeDetails["FORM_NO"] = current_date.getFullYear().toFixed(0);
                        }
                        var recoverDetails = Alloy.createCollection("ShedForms");
                        recoverDetails.fetch({
                            query: "SELECT * FROM ShedForms where ID = " + current_form_id
                        });
                        if (recoverDetails.length > 0) {
                            var currentDetails = recoverDetails.at(0);
                            currentDetails.set({
                                FORM_NO: Alloy.Globals.ShedModeDetails["FORM_NO"],
                                DATE: Alloy.Globals.ShedModeDetails["DATE"],
                                USER: user,
                                SYNCHRONIZED: "0"
                            });
                            currentDetails.save();
                            currentDetails = null;
                        }
                    } else if (user) {
                        var recoverDetails = Alloy.createCollection("ShedForms");
                        recoverDetails.fetch({
                            query: "SELECT * FROM ShedForms where ID = " + current_form_id
                        });
                        if (recoverDetails.length > 0) {
                            var currentDetails = recoverDetails.at(0);
                            currentDetails.set({
                                USER: user
                            });
                            currentDetails.save();
                            currentDetails = null;
                        }
                    }
                    if (-1 == current_form_id) {
                        var recoverID = Alloy.createCollection("ShedForms");
                        recoverID.fetch({
                            query: "SELECT max(ID) AS MAX_ID FROM ShedForms;"
                        });
                        if (recoverID.length > 0) {
                            current_form_id = recoverID.at(0).get("MAX_ID");
                            recoverID = null;
                        }
                        Ti.API.info("\nNEW_ID: " + current_form_id);
                    }
                    if (Alloy.Globals.ShedModeShedPosition && _.size(Alloy.Globals.ShedModeShedPosition) > 0) {
                        Ti.API.info("\nShedPosition:\n");
                        var recoverShedPosition = Alloy.createCollection("ShedFormsShedsPositions");
                        recoverShedPosition.fetch({
                            query: "SELECT * FROM ShedFormsShedsPositions where FORM_ID = " + current_form_id
                        });
                        if (recoverShedPosition.length > 0) {
                            var currentShedPosition = recoverShedPosition.at(0);
                            currentShedPosition.set({
                                LATITUDE: Alloy.Globals.ShedModeShedPosition["LATITUDE"],
                                LONGITUDE: Alloy.Globals.ShedModeShedPosition["LONGITUDE"],
                                ALTITUDE: Alloy.Globals.ShedModeShedPosition["ALTITUDE"],
                                PROVINCE: Alloy.Globals.ShedModeShedPosition["PROVINCE"],
                                MUNICIPALITY: Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"],
                                PLACE: Alloy.Globals.ShedModeShedPosition["PLACE"],
                                ADDRESS: Alloy.Globals.ShedModeShedPosition["ADDRESS"],
                                CIVIC_NO: Alloy.Globals.ShedModeShedPosition["CIVIC_NO"]
                            });
                            currentShedPosition.save();
                            currentShedPosition = null;
                        } else {
                            var shedPositionModel = Alloy.createModel("ShedFormsShedsPositions", {
                                FORM_ID: current_form_id,
                                LATITUDE: Alloy.Globals.ShedModeShedPosition["LATITUDE"],
                                LONGITUDE: Alloy.Globals.ShedModeShedPosition["LONGITUDE"],
                                ALTITUDE: Alloy.Globals.ShedModeShedPosition["ALTITUDE"],
                                PROVINCE: Alloy.Globals.ShedModeShedPosition["PROVINCE"],
                                MUNICIPALITY: Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"],
                                PLACE: Alloy.Globals.ShedModeShedPosition["PLACE"],
                                ADDRESS: Alloy.Globals.ShedModeShedPosition["ADDRESS"],
                                CIVIC_NO: Alloy.Globals.ShedModeShedPosition["CIVIC_NO"]
                            });
                            shedPositionModel.save();
                            shedPositionModel = null;
                        }
                    }
                    if (Alloy.Globals.ShedModeShedCharacteristics && _.size(Alloy.Globals.ShedModeShedCharacteristics) > 0) {
                        Ti.API.info("\nShedCharacteristics:\n");
                        var recoverShedCharacteristics = Alloy.createCollection("ShedFormsShedsCharacteristics");
                        recoverShedCharacteristics.fetch({
                            query: "SELECT * FROM ShedFormsShedsCharacteristics where FORM_ID = " + current_form_id
                        });
                        if (recoverShedCharacteristics.length > 0) {
                            var currentShedCharacteristics = recoverShedCharacteristics.at(0);
                            currentShedCharacteristics.set({
                                SITE: Alloy.Globals.ShedModeShedCharacteristics["SITE"],
                                NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"],
                                USAGE: Alloy.Globals.ShedModeShedCharacteristics["USAGE"]
                            });
                            currentShedCharacteristics.save();
                            currentShedCharacteristics = null;
                        } else {
                            var shedCharacteristicsModel = Alloy.createModel("ShedFormsShedsCharacteristics", {
                                FORM_ID: current_form_id,
                                SITE: Alloy.Globals.ShedModeShedCharacteristics["SITE"],
                                NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"],
                                USAGE: Alloy.Globals.ShedModeShedCharacteristics["USAGE"]
                            });
                            shedCharacteristicsModel.save();
                            shedCharacteristicsModel = null;
                        }
                    }
                    if (Alloy.Globals.ShedModeInfrastructure && _.size(Alloy.Globals.ShedModeInfrastructure) > 0) {
                        Ti.API.info("\nInfrastructure:\n");
                        var recoverInfrastructure = Alloy.createCollection("ShedFormsInfrastructure");
                        recoverInfrastructure.fetch({
                            query: "SELECT * FROM ShedFormsInfrastructure where FORM_ID = " + current_form_id
                        });
                        if (recoverInfrastructure.length > 0) {
                            var currentInfrastructure = recoverInfrastructure.at(0);
                            currentInfrastructure.set({
                                PRIMARY_GIRDERS: Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"],
                                THICKNESS_OF_THE_TILES: Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"],
                                TYPICAL_LIGHTS: Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"],
                                COVERAGE: Alloy.Globals.ShedModeInfrastructure["COVERAGE"],
                                INCLINATION_OF_THE_ROOF: Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"],
                                INFILL_ELEMENTS: Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"],
                                VERTICAL_WALLS: Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"],
                                SHELVING: Alloy.Globals.ShedModeInfrastructure["SHELVING"]
                            });
                            currentInfrastructure.save();
                            currentInfrastructure = null;
                        } else {
                            var infrastructureModel = Alloy.createModel("ShedFormsInfrastructure", {
                                FORM_ID: current_form_id,
                                PRIMARY_GIRDERS: Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"],
                                THICKNESS_OF_THE_TILES: Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"],
                                TYPICAL_LIGHTS: Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"],
                                COVERAGE: Alloy.Globals.ShedModeInfrastructure["COVERAGE"],
                                INCLINATION_OF_THE_ROOF: Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"],
                                INFILL_ELEMENTS: Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"],
                                VERTICAL_WALLS: Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"],
                                SHELVING: Alloy.Globals.ShedModeInfrastructure["SHELVING"]
                            });
                            infrastructureModel.save();
                            infrastructureModel = null;
                        }
                    }
                    if (Alloy.Globals.ShedModeDamages && _.size(Alloy.Globals.ShedModeDamages) > 0) {
                        Ti.API.info("\nDamages:\n");
                        var recoverDamages = Alloy.createCollection("ShedFormsDamages");
                        recoverDamages.fetch({
                            query: "SELECT * FROM ShedFormsDamages where FORM_ID = " + current_form_id
                        });
                        if (recoverDamages.length > 0) {
                            var currentDamages = recoverDamages.at(0);
                            currentDamages.set({
                                DAMAGES: Alloy.Globals.ShedModeDamages["DAMAGES"],
                                MEASURES_OF_EMERGENCY: Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"]
                            });
                            currentDamages.save();
                            currentDamages = null;
                        } else {
                            var damagesModel = Alloy.createModel("ShedFormsDamages", {
                                FORM_ID: current_form_id,
                                DAMAGES: Alloy.Globals.ShedModeDamages["DAMAGES"],
                                MEASURES_OF_EMERGENCY: Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"]
                            });
                            damagesModel.save();
                            damagesModel = null;
                        }
                    }
                    if (Alloy.Globals.ShedModeJudgmentOfPracticability && _.size(Alloy.Globals.ShedModeJudgmentOfPracticability) > 0) {
                        Ti.API.info("\nJudgmentOfPracticability:\n");
                        var recoverJudgmentOfPracticability = Alloy.createCollection("ShedFormsJudgmentOfPracticability");
                        recoverJudgmentOfPracticability.fetch({
                            query: "SELECT * FROM ShedFormsJudgmentOfPracticability where FORM_ID = " + current_form_id
                        });
                        if (recoverJudgmentOfPracticability.length > 0) {
                            var currentJudgmentOfPracticability = recoverJudgmentOfPracticability.at(0);
                            currentJudgmentOfPracticability.set({
                                STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"],
                                NOT_STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"],
                                EXTERNAL: Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"],
                                GEOTECHNICAL: Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"],
                                OUTCOME_PRACTICABILITY: Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"],
                                HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"],
                                FAMILIES_EVACUATED: Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"],
                                EVACUEES_N: Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"],
                                ACCURACY_VISIT: Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"],
                                OTHER: Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"]
                            });
                            currentJudgmentOfPracticability.save();
                            currentJudgmentOfPracticability = null;
                        } else {
                            var judgmentOfPracticabilityModel = Alloy.createModel("ShedFormsJudgmentOfPracticability", {
                                FORM_ID: current_form_id,
                                STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"],
                                NOT_STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"],
                                EXTERNAL: Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"],
                                GEOTECHNICAL: Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"],
                                OUTCOME_PRACTICABILITY: Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"],
                                HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"],
                                FAMILIES_EVACUATED: Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"],
                                EVACUEES_N: Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"],
                                ACCURACY_VISIT: Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"],
                                OTHER: Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"]
                            });
                            judgmentOfPracticabilityModel.save();
                            judgmentOfPracticabilityModel = null;
                        }
                    }
                    if (Alloy.Globals.ShedModeOtherComments && _.size(Alloy.Globals.ShedModeOtherComments) > 0) {
                        Ti.API.info("\nOtherComments:\n");
                        var recoverOtherComments = Alloy.createCollection("ShedFormsOtherComments");
                        recoverOtherComments.fetch({
                            query: "SELECT * FROM ShedFormsOtherComments where FORM_ID = " + current_form_id
                        });
                        if (recoverOtherComments.length > 0) {
                            var currentOtherComments = recoverOtherComments.at(0);
                            currentOtherComments.set({
                                TOPIC: Alloy.Globals.ShedModeOtherComments["TOPIC"],
                                OTHER_COMMENTS: Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"]
                            });
                            currentOtherComments.save();
                            currentOtherComments = null;
                        } else {
                            var otherCommentsModel = Alloy.createModel("ShedFormsOtherComments", {
                                FORM_ID: current_form_id,
                                TOPIC: Alloy.Globals.ShedModeOtherComments["TOPIC"],
                                OTHER_COMMENTS: Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"]
                            });
                            otherCommentsModel.save();
                            otherCommentsModel = null;
                        }
                    }
                    var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                    if (Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0) {
                        Ti.API.info("\nImages:\n\n");
                        for (var i = 0; i < Alloy.Globals.CurrentPicsPath.length; i++) {
                            if (Alloy.Globals.CurrentPicsPath[i].id) {
                                Ti.API.info("\nPicture already present.\n");
                                var recoverImage = Alloy.createCollection("ShedFormsImages");
                                recoverImage.fetch({
                                    query: "SELECT * FROM ShedFormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
                                });
                                var currentImage = recoverImage.at(0);
                                currentImage.set({
                                    LATITUDE: Alloy.Globals.CurrentPicsPath[i].latitude,
                                    LONGITUDE: Alloy.Globals.CurrentPicsPath[i].longitude,
                                    ADDRESS: Alloy.Globals.CurrentPicsPath[i].address,
                                    HEADING: Alloy.Globals.CurrentPicsPath[i].heading,
                                    DAMAGES_LEVEL: Alloy.Globals.CurrentPicsPath[i].damages_level,
                                    DAMAGES_AREA: Alloy.Globals.CurrentPicsPath[i].damages_area,
                                    COMMENT: Alloy.Globals.CurrentPicsPath[i].comment
                                });
                                currentImage.save();
                                currentImage = null;
                            } else {
                                var image_path = "";
                                image_path = Alloy.Globals.CurrentPicsPath[i].path ? Alloy.Globals.CurrentPicsPath[i].path : current_time;
                                image_path = image_path + "_" + (i + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.CurrentPicsPath[i].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("ShedFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            LATITUDE: Alloy.Globals.CurrentPicsPath[i].latitude,
                                            LONGITUDE: Alloy.Globals.CurrentPicsPath[i].longitude,
                                            ADDRESS: Alloy.Globals.CurrentPicsPath[i].address,
                                            HEADING: Alloy.Globals.CurrentPicsPath[i].heading,
                                            DAMAGES_LEVEL: Alloy.Globals.CurrentPicsPath[i].damages_level,
                                            DAMAGES_AREA: Alloy.Globals.CurrentPicsPath[i].damages_area,
                                            COMMENT: Alloy.Globals.CurrentPicsPath[i].comment
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                            }
                            if (bError) break;
                        }
                        bError || (Alloy.Globals.CurrentPicsPath = null);
                    }
                    if (Alloy.Globals.CurrentVideosPath && Alloy.Globals.CurrentVideosPath.length > 0) {
                        Ti.API.info("\nVideos:\n\n");
                        for (var i = 0; i < Alloy.Globals.CurrentVideosPath.length; i++) {
                            if (Alloy.Globals.CurrentVideosPath[i].id) {
                                Ti.API.info("\nVideo already present.\n");
                                var recoverVideo = Alloy.createCollection("ShedFormsVideos");
                                recoverVideo.fetch({
                                    query: "SELECT * FROM ShedFormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
                                });
                                var currentVideo = recoverVideo.at(0);
                                currentVideo.set({
                                    LATITUDE: Alloy.Globals.CurrentVideosPath[i].latitude,
                                    LONGITUDE: Alloy.Globals.CurrentVideosPath[i].longitude,
                                    ADDRESS: Alloy.Globals.CurrentVideosPath[i].address,
                                    HEADING: Alloy.Globals.CurrentVideosPath[i].heading,
                                    DAMAGES_LEVEL: Alloy.Globals.CurrentVideosPath[i].damages_level,
                                    DAMAGES_AREA: Alloy.Globals.CurrentVideosPath[i].damages_area,
                                    COMMENT: Alloy.Globals.CurrentVideosPath[i].comment
                                });
                                currentVideo.save();
                                currentVideo = null;
                            } else {
                                var video_path = "";
                                video_path = Alloy.Globals.CurrentVideosPath[i].path ? Alloy.Globals.CurrentVideosPath[i].path : current_time;
                                video_path = video_path + "_" + (i + 1) + "_video.3gp";
                                var file = Alloy.Globals.getFileForWrite(video_path);
                                if (file.exists()) ; else {
                                    var video_file = Ti.Filesystem.getFile(Alloy.Globals.CurrentVideosPath[i].media);
                                    if (file.write(video_file.read())) {
                                        var videoModel = Alloy.createModel("ShedFormsVideos", {
                                            FORM_ID: current_form_id,
                                            VIDEO_PATH: video_path,
                                            LATITUDE: Alloy.Globals.CurrentVideosPath[i].latitude,
                                            LONGITUDE: Alloy.Globals.CurrentVideosPath[i].longitude,
                                            ADDRESS: Alloy.Globals.CurrentVideosPath[i].address,
                                            HEADING: Alloy.Globals.CurrentVideosPath[i].heading,
                                            DAMAGES_LEVEL: Alloy.Globals.CurrentVideosPath[i].damages_level,
                                            DAMAGES_AREA: Alloy.Globals.CurrentVideosPath[i].damages_area,
                                            COMMENT: Alloy.Globals.CurrentVideosPath[i].comment
                                        });
                                        videoModel.save();
                                        videoModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("video_saving_error_msg"));
                                    }
                                }
                                file = null;
                            }
                            if (bError) break;
                        }
                        bError || (Alloy.Globals.CurrentVideosPath = null);
                    }
                    if (bError) Ti.API.info("ERROR.\nEND"); else {
                        Ti.API.info("COMMIT.\nEND");
                        Ti.App.fireEvent("shed_mode:save");
                        bRet = true;
                    }
                } catch (exception) {
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
                } finally {
                    bCanClickOnTableView = true;
                    bIsWorkInProgress = false;
                }
                return bRet;
            }) : 1 == e.index;
        });
        alertDialog.show();
    }
    function OnShedDamageAssessments_Click() {
        try {
            var ShedModeUtils = require("/ShedModeUtils");
            var media_array = ShedModeUtils.CreateMediaArray(current_form_id, true, true);
            if (media_array && media_array.length > 0) {
                Alloy.Globals.createAndOpenControllerExt("DamageAssessmentsMakerView", {
                    type: "Shed",
                    media_contents: media_array
                });
                bRet = true;
            } else alert(L("no_media_for_the_gallery_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSend_Click() {
        try {
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                bIsWorkInProgress = true;
                LoadDetailsData();
                LoadShedPositionData();
                LoadShedCharacteristicsData();
                LoadInfrastructureData();
                LoadDamagesData();
                LoadJudgmentOfPracticabilityData();
                LoadOtherCommentsData();
                LoadTeamPersonalData();
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    if (this.responseText && "ERROR_" != this.responseText.substring(0, 6)) {
                        if ("it" == Titanium.Locale.currentLanguage) {
                            var filename = "scheda_capannone.pdf";
                            var zipname = "SchedaCapannone.zip";
                        } else if ("es" == Titanium.Locale.currentLanguage) {
                            var filename = "tarjeta_cobertizo.pdf";
                            var zipname = "TarjetaCobertizo.zip";
                        } else {
                            var filename = "shed_form.pdf";
                            var zipname = "ShedForm.zip";
                        }
                        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), filename);
                        file.exists() && file.deleteFile();
                        file.write(this.responseData);
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.createAndOpenControllerExt("SendFormView", {
                            type: "Shed",
                            form_id: current_form_id,
                            pdf_native_path: file.nativePath,
                            zip_filename: zipname,
                            email_subject_language_msg: "shed_mode_send_email_dlg_subject"
                        });
                    } else {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        switch (this.responseText) {
                          case "ERROR_CODE_1":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg"));
                            break;

                          case "ERROR_CODE_2":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_upload_sign_err_msg"));
                        }
                    }
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                loader.timeout = Alloy.Globals.SendFormTimeoutMillisecs;
                var spd_name_1 = "";
                var spd_sign_1_image = "";
                var spd_name_2 = "";
                var spd_sign_2_image = "";
                var spd_name_3 = "";
                var spd_sign_3_image = "";
                if (Alloy.Collections.ShedModePD && _.size(Alloy.Collections.ShedModePD) > 0) for (var i = 0; i < Alloy.Collections.ShedModePD.length; i++) {
                    var personalData = Alloy.Collections.ShedModePD.at(i);
                    switch (personalData.get("COMPONENT_NUMBER")) {
                      case 1:
                        spd_name_1 = personalData.get("NAME");
                        var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                        file && (spd_sign_1_image = file.read());
                        break;

                      case 2:
                        spd_name_2 = personalData.get("NAME");
                        var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                        file && (spd_sign_2_image = file.read());
                        break;

                      case 3:
                        spd_name_3 = personalData.get("NAME");
                        var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                        file && (spd_sign_3_image = file.read());
                    }
                }
                var params = {
                    key: "EDAM",
                    TPD_NAME_1: spd_name_1,
                    TPD_SIGN_1_IMAGE: spd_sign_1_image,
                    TPD_NAME_2: spd_name_2,
                    TPD_SIGN_2_IMAGE: spd_sign_2_image,
                    TPD_NAME_3: spd_name_3,
                    TPD_SIGN_3_IMAGE: spd_sign_3_image,
                    FORM_NO: Alloy.Globals.ShedModeDetails["FORM_NO"],
                    DATE: Alloy.Globals.ShedModeDetails["DATE"],
                    PROVINCE: Alloy.Globals.ShedModeShedPosition["PROVINCE"],
                    MUNICIPALITY: Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"],
                    LATITUDE: Alloy.Globals.ShedModeShedPosition["LATITUDE"],
                    LONGITUDE: Alloy.Globals.ShedModeShedPosition["LONGITUDE"],
                    ALTITUDE: Alloy.Globals.ShedModeShedPosition["ALTITUDE"],
                    PLACE: Alloy.Globals.ShedModeShedPosition["PLACE"],
                    ADDRESS: Alloy.Globals.ShedModeShedPosition["ADDRESS"],
                    CIVIC_NO: Alloy.Globals.ShedModeShedPosition["CIVIC_NO"],
                    SITE: Alloy.Globals.ShedModeShedCharacteristics["SITE"],
                    NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"],
                    USAGE: Alloy.Globals.ShedModeShedCharacteristics["USAGE"],
                    PRIMARY_GIRDERS: Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"],
                    THICKNESS_OF_THE_TILES: Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"],
                    TYPICAL_LIGHTS: Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"],
                    COVERAGE: Alloy.Globals.ShedModeInfrastructure["COVERAGE"],
                    INCLINATION_OF_THE_ROOF: Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"],
                    INFILL_ELEMENTS: Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"],
                    VERTICAL_WALLS: Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"],
                    SHELVING: Alloy.Globals.ShedModeInfrastructure["SHELVING"],
                    DAMAGES: Alloy.Globals.ShedModeDamages["DAMAGES"],
                    MEASURES_OF_EMERGENCY: Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"],
                    STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"],
                    NOT_STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"],
                    EXTERNAL: Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"],
                    GEOTECHNICAL: Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"],
                    OUTCOME_PRACTICABILITY: Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"],
                    HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"],
                    FAMILIES_EVACUATED: Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"],
                    EVACUEES_N: Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"],
                    ACCURACY_VISIT: Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"],
                    OTHER: Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"],
                    TOPIC: Alloy.Globals.ShedModeOtherComments["TOPIC"],
                    OTHER_COMMENTS: Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"]
                };
                loader.open("POST", "https://areeweb.polito.it/IRUSAT/ManipulatePDF/ShedMode_ManipulatePDF.php");
                loader.send(params);
                bRet = true;
                return bRet;
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function EndAsyncBusyAction_CallBack() {
        bCanClickOnTableView = true;
        bIsWorkInProgress = false;
        if (null !== timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }
    function OnBtnViewMedia_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                var ShedModeUtils = require("/ShedModeUtils");
                var media_array = ShedModeUtils.CreateMediaArray(current_form_id, true);
                Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: media_array,
                    type: "Shed",
                    is_synchronized: current_is_synchronized
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            bCanClickOnTableView = true;
        }
    }
    function OnBtnMakeVideo_Click() {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: L("generic_need_gps_title"),
            message: L("vid_need_gps_confirm_msg"),
            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
            cancel: 1
        });
        alertDialog.addEventListener("click", function(e) {
            try {
                BeginAsyncBusyAction($.activity_indicator, controls, function() {
                    var bRet = false;
                    bCanClickOnTableView = false;
                    bIsWorkInProgress = true;
                    if (0 == e.index) if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if (Alloy.Globals.isLocationAuthorized()) {
                        timeout = setTimeout(function() {
                            timeout = null;
                            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                            alert(L("geolocation_timeout_occurred_err_msg"));
                        }, Alloy.Globals.GeolocationRequestTimeoutMillisecs);
                        if (Titanium.Geolocation.hasCompass) Alloy.Globals.getHeading({
                            success: UpdateVideoHeading
                        }); else {
                            var dialog = Ti.UI.createAlertDialog({
                                message: L("generic_compass_not_available_info_msg"),
                                ok: L("generic_ok_msg"),
                                title: L("generic_info_title")
                            });
                            dialog.addEventListener("click", function() {
                                Alloy.Globals.getLocation({
                                    success: UpdateVideoPosition
                                });
                            });
                            dialog.show();
                        }
                        bRet = true;
                    } else alert(L("generic_user_not_authorized_to_ask_localization")); else if (1 == e.index) {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.MakeVideo($.shedModeFormsGeneralSectionWindow.getActivity(), 0, 0, "");
                        bRet = true;
                    }
                    return bRet;
                }, EndAsyncBusyAction_CallBack);
            } catch (exception) {
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            } finally {
                bCanClickOnTableView = true;
            }
        });
        alertDialog.show();
    }
    function OnBtnMakeMedia_Click() {
        var message = null;
        message = L("pic_need_gps_confirm_msg");
        var alertDialog = Titanium.UI.createAlertDialog({
            title: L("generic_need_gps_title"),
            message: message,
            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
            cancel: 1
        });
        alertDialog.addEventListener("click", function(e) {
            try {
                BeginAsyncBusyAction($.activity_indicator, controls, function() {
                    var bRet = false;
                    bCanClickOnTableView = false;
                    bIsWorkInProgress = true;
                    if (0 == e.index) if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if (Alloy.Globals.isLocationAuthorized()) {
                        timeout = setTimeout(function() {
                            timeout = null;
                            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                            alert(L("geolocation_timeout_occurred_err_msg"));
                        }, Alloy.Globals.GeolocationRequestTimeoutMillisecs);
                        if (Titanium.Geolocation.hasCompass) Alloy.Globals.getHeading({
                            success: UpdatePictureHeading
                        }); else {
                            var dialog = Ti.UI.createAlertDialog({
                                message: L("generic_compass_not_available_info_msg"),
                                ok: L("generic_ok_msg"),
                                title: L("generic_info_title")
                            });
                            dialog.addEventListener("click", function() {
                                Alloy.Globals.getLocation({
                                    success: UpdatePicturePosition
                                });
                            });
                            dialog.show();
                        }
                        bRet = true;
                    } else alert(L("generic_user_not_authorized_to_ask_localization")); else if (1 == e.index) {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.UseCamera("", 0, 0, "");
                        bRet = true;
                    }
                    return bRet;
                }, EndAsyncBusyAction_CallBack);
            } catch (exception) {
                alert(L("generic_exception_msg") + exception.message);
            } finally {
                bCanClickOnTableView = true;
            }
        });
        alertDialog.show();
    }
    function UpdatePictureHeading(e) {
        try {
            Ti.Geolocation.removeEventListener("heading", UpdatePictureHeading);
            if (void 0 === e.success || e.success) {
                sCurrentHeading = Alloy.Globals.CalculateMagneticHeading(e.heading.magneticHeading);
                Alloy.Globals.getLocation({
                    success: UpdatePicturePosition
                });
            } else {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                alert(L("unable_to_get_heading_err_msg") + " " + e.error);
            }
        } catch (exception) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function UpdatePicturePosition(e) {
        try {
            Ti.Geolocation.removeEventListener("location", UpdatePicturePosition);
            if (!e.success || e.error) {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                alert(L("unable_to_get_location_err_msg") + " " + e.error);
                return;
            }
            Alloy.Globals.reverseGeocodeAndUseCamera(sCurrentHeading, e.coords.latitude, e.coords.longitude, null, RaiseEndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function UpdateVideoHeading(e) {
        try {
            Ti.Geolocation.removeEventListener("heading", UpdateVideoHeading);
            if (void 0 === e.success || e.success) {
                sCurrentHeading = Alloy.Globals.CalculateMagneticHeading(e.heading.magneticHeading);
                Alloy.Globals.getLocation({
                    success: UpdateVideoPosition
                });
            } else {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                alert(L("unable_to_get_heading_err_msg") + " " + e.error);
            }
        } catch (exception) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function UpdateVideoPosition(e) {
        try {
            Ti.Geolocation.removeEventListener("location", UpdateVideoPosition);
            if (!e.success || e.error) {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                alert(L("unable_to_get_location_err_msg") + " " + e.error);
                return;
            }
            Alloy.Globals.reverseGeocodeAndUseCamera(sCurrentHeading, e.coords.latitude, e.coords.longitude, $.shedModeFormsGeneralSectionWindow.getActivity(), RaiseEndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function RaiseEndAsyncBusyAction_CallBack() {
        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
    }
    function OnBtnMakeDraft_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                Alloy.Globals.createAndOpenControllerExt("DraftPaintView", {
                    type: "Shed"
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            bCanClickOnTableView = true;
        }
    }
    function openMenu() {
        $.appWrapper.animate({
            left: "200dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.slideMenu.Wrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        slider_menu_opened = true;
    }
    function closeMenu() {
        $.appWrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.slideMenu.Wrapper.animate({
            left: "-200dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        slider_menu_opened = false;
    }
    function OnBtnSliderMenu_Click() {
        slider_menu_opened ? closeMenu() : openMenu();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsGeneralSection";
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
    $.__views.shedModeFormsGeneralSectionWindow = Ti.UI.createWindow({
        title: L("shed_mode_forms_general_section_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeFormsGeneralSectionWindow"
    });
    $.__views.shedModeFormsGeneralSectionWindow && $.addTopLevelView($.__views.shedModeFormsGeneralSectionWindow);
    OnAndroidBackButton_Click ? $.__views.shedModeFormsGeneralSectionWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.shedModeFormsGeneralSectionWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.shedModeFormsGeneralSectionWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.shedModeFormsGeneralSectionWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        color: "#000",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 11,
            fontWeight: "bold"
        },
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        zIndex: 1,
        id: "activity_indicator"
    });
    $.__views.shedModeFormsGeneralSectionWindow.add($.__views.activity_indicator);
    $.__views.slideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "slideMenu",
        __parentSymbol: $.__views.shedModeFormsGeneralSectionWindow
    });
    $.__views.slideMenu.setParent($.__views.shedModeFormsGeneralSectionWindow);
    $.__views.appWrapper = Ti.UI.createView({
        id: "appWrapper"
    });
    $.__views.shedModeFormsGeneralSectionWindow.add($.__views.appWrapper);
    $.__views.scrollViewGeneralSection = Ti.UI.createScrollView({
        top: 0,
        scrollType: "vertical",
        id: "scrollViewGeneralSection"
    });
    $.__views.appWrapper.add($.__views.scrollViewGeneralSection);
    $.__views.btn_slider_menu = Ti.UI.createButton({
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        borderRadius: 4,
        backgroundImage: "/images/slider_menu_start.png",
        id: "btn_slider_menu"
    });
    $.__views.scrollViewGeneralSection.add($.__views.btn_slider_menu);
    OnBtnSliderMenu_Click ? $.__views.btn_slider_menu.addEventListener("click", OnBtnSliderMenu_Click) : __defers["$.__views.btn_slider_menu!click!OnBtnSliderMenu_Click"] = true;
    $.__views.images_btn_view = Ti.UI.createView({
        id: "images_btn_view"
    });
    $.__views.scrollViewGeneralSection.add($.__views.images_btn_view);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        id: "viewAppButtonSave"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.viewAppButtonShedDamageAssessments = Ti.UI.createView({
        id: "viewAppButtonShedDamageAssessments"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonShedDamageAssessments);
    $.__views.widgetAppButtonShedDamageAssessments = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonShedDamageAssessments",
        __parentSymbol: $.__views.viewAppButtonShedDamageAssessments
    });
    $.__views.widgetAppButtonShedDamageAssessments.setParent($.__views.viewAppButtonShedDamageAssessments);
    $.__views.viewAppButtonSend = Ti.UI.createView({
        id: "viewAppButtonSend"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonSend);
    $.__views.widgetAppButtonSend = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSend",
        __parentSymbol: $.__views.viewAppButtonSend
    });
    $.__views.widgetAppButtonSend.setParent($.__views.viewAppButtonSend);
    $.__views.viewAppButtonMakeVideo = Ti.UI.createView({
        top: 90,
        left: 141,
        width: 60,
        id: "viewAppButtonMakeVideo"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonMakeVideo);
    $.__views.widgetAppButtonMakeVideo = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonMakeVideo",
        __parentSymbol: $.__views.viewAppButtonMakeVideo
    });
    $.__views.widgetAppButtonMakeVideo.setParent($.__views.viewAppButtonMakeVideo);
    $.__views.viewAppButtonMakeMedia = Ti.UI.createView({
        id: "viewAppButtonMakeMedia"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonMakeMedia);
    $.__views.widgetAppButtonMakeMedia = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonMakeMedia",
        __parentSymbol: $.__views.viewAppButtonMakeMedia
    });
    $.__views.widgetAppButtonMakeMedia.setParent($.__views.viewAppButtonMakeMedia);
    $.__views.viewAppButtonViewMedia = Ti.UI.createView({
        id: "viewAppButtonViewMedia"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonViewMedia);
    $.__views.widgetAppButtonViewMedia = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonViewMedia",
        __parentSymbol: $.__views.viewAppButtonViewMedia
    });
    $.__views.widgetAppButtonViewMedia.setParent($.__views.viewAppButtonViewMedia);
    $.__views.imageViewShedLogo = Ti.UI.createImageView({
        id: "imageViewShedLogo"
    });
    $.__views.scrollViewGeneralSection.add($.__views.imageViewShedLogo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_form_id = args.form_id;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.widgetAppButtonMakeVideo.get_button());
    controls.push($.widgetAppButtonSave.get_button());
    controls.push($.widgetAppButtonSend.get_button());
    controls.push($.widgetAppButtonShedDamageAssessments.get_button());
    controls.push($.widgetAppButtonMakeDraft.get_button());
    controls.push($.widgetAppButtonViewMedia.get_button());
    controls.push($.widgetAppButtonMakeMedia.get_button());
    var bIsWorkInProgress = false;
    var sCurrentHeading = "";
    var timeout = null;
    var bCanClickOnTableView = true;
    var slider_menu_opened = false;
    try {
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.widgetAppButtonShedDamageAssessments.init("/images/shed_damage_assessments_normal.png", "/images/shed_damage_assessments_pressed.png", "/images/shed_damage_assessments_disabled.png", L("btn_shed_damage_assessments_text"), OnShedDamageAssessments_Click);
        $.viewAppButtonShedDamageAssessments.visible = view_enabled;
        $.widgetAppButtonSend.init("/images/send_normal.png", "/images/send_pressed.png", "/images/send_disabled.png", L("generic_send_btn_title"), OnBtnSend_Click);
        $.widgetAppButtonMakeDraft.init("/images/draft_normal.png", "/images/draft_pressed.png", "/images/draft_disabled.png", L("btn_make_draft_text"), OnBtnMakeDraft_Click);
        $.viewAppButtonMakeDraft.visible = view_enabled;
        $.widgetAppButtonViewMedia.init("/images/gallery_normal.png", "/images/gallery_pressed.png", "/images/gallery_disabled.png", L("btn_view_media_text"), OnBtnViewMedia_Click);
        Alloy.Globals.ShedModeDetails = new Array();
        Alloy.Globals.ShedModeShedPosition = new Array();
        Alloy.Globals.ShedModeShedCharacteristics = new Array();
        Alloy.Globals.ShedModeInfrastructure = new Array();
        Alloy.Globals.ShedModeDamages = new Array();
        Alloy.Globals.ShedModeJudgmentOfPracticability = new Array();
        Alloy.Globals.ShedModeOtherComments = new Array();
        Alloy.Globals.CurrentPicsPath = null;
        Alloy.Globals.CurrentVideosPath = null;
        var nodes = [ {
            menuHeader: L("shed_mode_sections_slide_menu_title"),
            id: 0,
            title: L("shed_mode_section_details_title"),
            image: "/images/slide_menu_details.png"
        }, {
            id: 1,
            title: L("shed_mode_section_sheds_positions_title"),
            image: "/images/slide_menu_position.png"
        }, {
            id: 2,
            title: L("shed_mode_section_sheds_characteristics_title"),
            image: "/images/slide_menu_characteristics.png"
        }, {
            id: 3,
            title: L("shed_mode_section_infrastructure_title"),
            image: "/images/slide_menu_infrastructure.png"
        }, {
            id: 4,
            title: L("shed_mode_section_damages_title"),
            image: "/images/slide_menu_damages.png"
        }, {
            id: 5,
            title: L("shed_mode_section_judgment_of_practicability_title"),
            image: "/images/slide_menu_practicability.png"
        }, {
            id: 6,
            title: L("shed_mode_section_other_comments_title"),
            image: "/images/slide_menu_comments.png"
        } ];
        $.slideMenu.init({
            nodes: nodes,
            color: {
                headingBackground: "#000",
                headingText: "#FFF"
            }
        });
        $.slideMenu.Nodes.addEventListener("click", handleMenuClick);
        $.appWrapper.addEventListener("swipe", function(_event) {
            "right" == _event.direction ? openMenu() : "left" == _event.direction && closeMenu();
        });
        $.widgetAppButtonMakeMedia.init("/images/make_media_normal.png", "/images/make_media_pressed.png", "/images/make_media_disabled.png", L("btn_make_media_2_text"), OnBtnMakeMedia_Click);
        $.viewAppButtonMakeMedia.visible = view_enabled;
        $.widgetAppButtonMakeVideo.init("/images/make_video_normal.png", "/images/make_video_pressed.png", "/images/make_video_disabled.png", L("btn_make_video_text"), OnBtnMakeVideo_Click);
        $.viewAppButtonMakeVideo.visible = view_enabled;
        $.shedModeFormsGeneralSectionWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.shedModeFormsGeneralSectionWindow!android:back!OnAndroidBackButton_Click"] && $.__views.shedModeFormsGeneralSectionWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.shedModeFormsGeneralSectionWindow!androidback!OnAndroidBackButton_Click"] && $.__views.shedModeFormsGeneralSectionWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btn_slider_menu!click!OnBtnSliderMenu_Click"] && $.__views.btn_slider_menu.addEventListener("click", OnBtnSliderMenu_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;