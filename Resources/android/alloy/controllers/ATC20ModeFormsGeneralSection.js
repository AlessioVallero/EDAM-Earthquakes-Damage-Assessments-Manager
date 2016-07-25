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
            Save("generic_lose_changes_title", "lose_changes_confirm_msg", function() {
                Alloy.Globals.ATC20ModeInspection = new Array();
                Alloy.Globals.ATC20ModeBuildingDescription = new Array();
                Alloy.Globals.ATC20ModeDetailedEvaluation = new Array();
                Alloy.Globals.ATC20ModeDetailedPosting = new Array();
                Alloy.Globals.ATC20ModeRapidEvaluation = new Array();
                Alloy.Globals.ATC20ModeRapidPosting = new Array();
                Alloy.Globals.ATC20ModeFurtherActions = new Array();
                Alloy.Globals.CurrentPicsPath = null;
                Alloy.Globals.CurrentVideosPath = null;
                controls = null;
                Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "atc20_mode:save");
                Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
                $.atc20ModeFormsGeneralSectionWindow.close();
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultInspectionArray() {
        var current_date = new Date();
        var current_time = current_date.getTime();
        Alloy.Globals.ATC20ModeInspection = {
            INSPECTOR_ID: "",
            AFFILIATION: "",
            DATE: current_time.toString(),
            FINAL_POSTING: "0",
            MODE: current_mode.toString(),
            TYPE: current_atc20_type.toString(),
            AREAS_INSPECTED: "0"
        };
    }
    function LoadInspectionData() {
        if (Alloy.Globals.ATC20ModeInspection && _.size(Alloy.Globals.ATC20ModeInspection) > 0) ; else if (-1 != current_form_id) {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var recoverInspection = ATC20ModeUtils.LoadInspectionQuery(current_form_id, current_mode);
            if (recoverInspection.length > 0) {
                var inspectionData = recoverInspection.at(0);
                Alloy.Globals.ATC20ModeInspection = {
                    INSPECTOR_ID: inspectionData.get("INSPECTOR_ID"),
                    AFFILIATION: inspectionData.get("AFFILIATION"),
                    DATE: inspectionData.get("DATE"),
                    FINAL_POSTING: inspectionData.get("FINAL_POSTING"),
                    TYPE: inspectionData.get("TYPE"),
                    AREAS_INSPECTED: inspectionData.get("AREAS_INSPECTED")
                };
            } else CreateDefaultInspectionArray();
        } else CreateDefaultInspectionArray();
    }
    function OpenInspection() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadInspectionData();
            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsInspectionView", {
                mode: current_mode,
                is_synchronized: current_is_synchronized,
                atc20_type: current_atc20_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultBuildingDescriptionArray() {
        Alloy.Globals.ATC20ModeBuildingDescription = {
            BUILDING_NAME: "",
            ALSO_KNOWN_AS: "",
            LOT: "0",
            DP: "0",
            OTHER_ID: "",
            CONTACT_NAME: "",
            ADDRESS: "",
            BUILDING_CONTACT: "",
            UNDERGROUND_PLANS_NO: "0",
            NOT_UNDERGROUND_PLANS_NO: "1",
            APPROX_FT_AREA: "",
            RESIDENTIAL_UNITS: "",
            RESIDENTIAL_UNITS_UNINHABITABLE: "",
            TYPE_OF_CONSTRUCTION: "0",
            OTHER_TYPE_OF_CONSTRUCTION: "",
            PRIMARY_OCCUPANCY: "0",
            OTHER_PRIMARY_OCCUPANCY: ""
        };
    }
    function LoadBuildingDescriptionData() {
        if (Alloy.Globals.ATC20ModeBuildingDescription && _.size(Alloy.Globals.ATC20ModeBuildingDescription) > 0) ; else if (-1 != current_form_id) {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var recoverBuildingDescription = ATC20ModeUtils.LoadBuildingDescriptionQuery(current_form_id);
            if (recoverBuildingDescription.length > 0) {
                var buildingDescriptionData = recoverBuildingDescription.at(0);
                Alloy.Globals.ATC20ModeBuildingDescription = {
                    BUILDING_NAME: buildingDescriptionData.get("BUILDING_NAME"),
                    ALSO_KNOWN_AS: buildingDescriptionData.get("ALSO_KNOWN_AS"),
                    LOT: buildingDescriptionData.get("LOT"),
                    DP: buildingDescriptionData.get("DP"),
                    OTHER_ID: buildingDescriptionData.get("OTHER_ID"),
                    CONTACT_NAME: buildingDescriptionData.get("CONTACT_NAME"),
                    ADDRESS: buildingDescriptionData.get("ADDRESS"),
                    BUILDING_CONTACT: buildingDescriptionData.get("BUILDING_CONTACT"),
                    UNDERGROUND_PLANS_NO: buildingDescriptionData.get("UNDERGROUND_PLANS_NO"),
                    NOT_UNDERGROUND_PLANS_NO: buildingDescriptionData.get("NOT_UNDERGROUND_PLANS_NO"),
                    APPROX_FT_AREA: buildingDescriptionData.get("APPROX_FT_AREA"),
                    RESIDENTIAL_UNITS: buildingDescriptionData.get("RESIDENTIAL_UNITS"),
                    RESIDENTIAL_UNITS_UNINHABITABLE: buildingDescriptionData.get("RESIDENTIAL_UNITS_UNINHABITABLE"),
                    TYPE_OF_CONSTRUCTION: buildingDescriptionData.get("TYPE_OF_CONSTRUCTION"),
                    OTHER_TYPE_OF_CONSTRUCTION: buildingDescriptionData.get("OTHER_TYPE_OF_CONSTRUCTION"),
                    PRIMARY_OCCUPANCY: buildingDescriptionData.get("PRIMARY_OCCUPANCY"),
                    OTHER_PRIMARY_OCCUPANCY: buildingDescriptionData.get("OTHER_PRIMARY_OCCUPANCY")
                };
            } else CreateDefaultBuildingDescriptionArray();
        } else CreateDefaultBuildingDescriptionArray();
    }
    function OpenBuildingDescription() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadBuildingDescriptionData();
            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsBuildingDescriptionView", {
                mode: current_mode,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultDetailedEvaluationArray() {
        Alloy.Globals.ATC20ModeDetailedEvaluation = {
            EVALUATION: "0000000000000000000000",
            OVERALL_HAZARDS_COMMENTS: "",
            OVERALL_HAZARDS_OTHER: "",
            STRUCTURAL_HAZARDS_COMMENTS: "",
            STRUCTURAL_HAZARDS_OTHER: "",
            NONSTRUCTURAL_HAZARDS_COMMENTS: "",
            NONSTRUCTURAL_HAZARDS_OTHER: "",
            GEOTECHNICAL_HAZARDS_COMMENTS: "",
            GEOTECHNICAL_HAZARDS_OTHER: "",
            GENERAL_COMMENTS: "",
            SKETCH_PATH: "",
            ESTIMATED_BUILDING_DAMAGE: "0",
            SKETCH_MODIFIED: "N"
        };
    }
    function LoadDetailedEvaluationData() {
        if (Alloy.Globals.ATC20ModeDetailedEvaluation && _.size(Alloy.Globals.ATC20ModeDetailedEvaluation) > 0) ; else if (-1 != current_form_id) {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var recoverDetailedEvaluation = ATC20ModeUtils.LoadDetailedEvaluationQuery(current_form_id);
            if (recoverDetailedEvaluation.length > 0) {
                var detailedEvaluationData = recoverDetailedEvaluation.at(0);
                Alloy.Globals.ATC20ModeDetailedEvaluation = {
                    EVALUATION: detailedEvaluationData.get("EVALUATION"),
                    OVERALL_HAZARDS_COMMENTS: detailedEvaluationData.get("OVERALL_HAZARDS_COMMENTS"),
                    OVERALL_HAZARDS_OTHER: detailedEvaluationData.get("OVERALL_HAZARDS_OTHER"),
                    STRUCTURAL_HAZARDS_COMMENTS: detailedEvaluationData.get("STRUCTURAL_HAZARDS_COMMENTS"),
                    STRUCTURAL_HAZARDS_OTHER: detailedEvaluationData.get("STRUCTURAL_HAZARDS_OTHER"),
                    NONSTRUCTURAL_HAZARDS_COMMENTS: detailedEvaluationData.get("NONSTRUCTURAL_HAZARDS_COMMENTS"),
                    NONSTRUCTURAL_HAZARDS_OTHER: detailedEvaluationData.get("NONSTRUCTURAL_HAZARDS_OTHER"),
                    GEOTECHNICAL_HAZARDS_COMMENTS: detailedEvaluationData.get("GEOTECHNICAL_HAZARDS_COMMENTS"),
                    GEOTECHNICAL_HAZARDS_OTHER: detailedEvaluationData.get("GEOTECHNICAL_HAZARDS_OTHER"),
                    GENERAL_COMMENTS: detailedEvaluationData.get("GENERAL_COMMENTS"),
                    ESTIMATED_BUILDING_DAMAGE: detailedEvaluationData.get("ESTIMATED_BUILDING_DAMAGE"),
                    SKETCH_MODIFIED: "N"
                };
                var sketchPath = detailedEvaluationData.get("SKETCH_PATH");
                if (sketchPath) {
                    var sketchFile = Alloy.Globals.getFileForRead(sketchPath);
                    sketchFile ? Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = sketchFile.getNativePath() : Alloy.Globals.AlertUserAndLogAsync(L("sketch_get_error_msg"));
                } else Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = "";
            } else CreateDefaultDetailedEvaluationArray();
        } else CreateDefaultDetailedEvaluationArray();
    }
    function OpenDetailedEvaluation() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadDetailedEvaluationData();
            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsDetailedEvaluationView", {
                mode: current_mode,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultRapidEvaluationArray() {
        Alloy.Globals.ATC20ModeRapidEvaluation = {
            EVALUATION: "000000",
            OTHER_OBSERVED_CONDITIONS: "",
            GENERAL_COMMENTS: "",
            ESTIMATED_BUILDING_DAMAGE: "0"
        };
    }
    function LoadRapidEvaluationData() {
        if (Alloy.Globals.ATC20ModeRapidEvaluation && _.size(Alloy.Globals.ATC20ModeRapidEvaluation) > 0) ; else if (-1 != current_form_id) {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var recoverRapidEvaluation = ATC20ModeUtils.LoadRapidEvaluationQuery(current_form_id);
            if (recoverRapidEvaluation.length > 0) {
                var rapidEvaluationData = recoverRapidEvaluation.at(0);
                Alloy.Globals.ATC20ModeRapidEvaluation = {
                    EVALUATION: rapidEvaluationData.get("EVALUATION"),
                    OTHER_OBSERVED_CONDITIONS: rapidEvaluationData.get("OTHER_OBSERVED_CONDITIONS"),
                    GENERAL_COMMENTS: rapidEvaluationData.get("GENERAL_COMMENTS"),
                    ESTIMATED_BUILDING_DAMAGE: rapidEvaluationData.get("ESTIMATED_BUILDING_DAMAGE")
                };
            } else CreateDefaultRapidEvaluationArray();
        } else CreateDefaultRapidEvaluationArray();
    }
    function OpenRapidEvaluation() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadRapidEvaluationData();
            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsRapidEvaluationView", {
                mode: current_mode,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultDetailedPostingArray() {
        var current_date = new Date();
        current_date.setDate(current_date.getDate() - 1);
        var current_time = current_date.getTime();
        Alloy.Globals.ATC20ModeDetailedPosting = {
            PREVIOUS_POSTING: "0",
            PREVIOUS_POSTING_INSPECTOR_ID: "",
            PREVIOUS_POSTING_DATE: current_time.toString(),
            POSTING: "0",
            CLASSIFICATION: "0",
            USE_AND_ENTRY_RESTRICTIONS: ""
        };
    }
    function LoadDetailedPostingData() {
        if (Alloy.Globals.ATC20ModeDetailedPosting && _.size(Alloy.Globals.ATC20ModeDetailedPosting) > 0) ; else if (-1 != current_form_id) {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var recoverDetailedPosting = ATC20ModeUtils.LoadDetailedPostingQuery(current_form_id);
            if (recoverDetailedPosting.length > 0) {
                var detailedPostingData = recoverDetailedPosting.at(0);
                Alloy.Globals.ATC20ModeDetailedPosting = {
                    PREVIOUS_POSTING: detailedPostingData.get("PREVIOUS_POSTING"),
                    PREVIOUS_POSTING_INSPECTOR_ID: detailedPostingData.get("PREVIOUS_POSTING_INSPECTOR_ID"),
                    PREVIOUS_POSTING_DATE: detailedPostingData.get("PREVIOUS_POSTING_DATE"),
                    POSTING: detailedPostingData.get("POSTING"),
                    CLASSIFICATION: detailedPostingData.get("CLASSIFICATION"),
                    USE_AND_ENTRY_RESTRICTIONS: detailedPostingData.get("USE_AND_ENTRY_RESTRICTIONS")
                };
            } else CreateDefaultDetailedPostingArray();
        } else CreateDefaultDetailedPostingArray();
    }
    function OpenDetailedPosting() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadDetailedPostingData();
            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsDetailedPostingView", {
                mode: current_mode,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultRapidPostingArray() {
        Alloy.Globals.ATC20ModeRapidPosting = {
            POSTING: "0",
            CLASSIFICATION: "0",
            USE_AND_ENTRY_RESTRICTIONS: ""
        };
    }
    function LoadRapidPostingData() {
        if (Alloy.Globals.ATC20ModeRapidPosting && _.size(Alloy.Globals.ATC20ModeRapidPosting) > 0) ; else if (-1 != current_form_id) {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var recoverRapidPosting = ATC20ModeUtils.LoadRapidPostingQuery(current_form_id);
            if (recoverRapidPosting.length > 0) {
                var rapidPostingData = recoverRapidPosting.at(0);
                Alloy.Globals.ATC20ModeRapidPosting = {
                    POSTING: rapidPostingData.get("POSTING"),
                    CLASSIFICATION: rapidPostingData.get("CLASSIFICATION"),
                    USE_AND_ENTRY_RESTRICTIONS: rapidPostingData.get("USE_AND_ENTRY_RESTRICTIONS")
                };
            } else CreateDefaultRapidPostingArray();
        } else CreateDefaultRapidPostingArray();
    }
    function OpenRapidPosting() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadRapidPostingData();
            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsRapidPostingView", {
                mode: current_mode,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultFurtherActionsArray() {
        Alloy.Globals.ATC20ModeFurtherActions = {
            BARRICADES_IN_THE_FOLLOWING_AREAS: "",
            EVALUATION_RECOMMENDED: "0",
            OTHER_EVALUATION_RECOMMENDED: "",
            OTHER_RECOMMENDATIONS: "",
            COMMENTS: ""
        };
    }
    function LoadFurtherActionsData() {
        if (Alloy.Globals.ATC20ModeFurtherActions && _.size(Alloy.Globals.ATC20ModeFurtherActions) > 0) ; else if (-1 != current_form_id) {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var recoverFurtherActions = ATC20ModeUtils.LoadFurtherActionsQuery(current_form_id);
            if (recoverFurtherActions.length > 0) {
                var furtherActionsData = recoverFurtherActions.at(0);
                Alloy.Globals.ATC20ModeFurtherActions = {
                    BARRICADES_IN_THE_FOLLOWING_AREAS: furtherActionsData.get("BARRICADES_IN_THE_FOLLOWING_AREAS"),
                    EVALUATION_RECOMMENDED: furtherActionsData.get("EVALUATION_RECOMMENDED"),
                    OTHER_EVALUATION_RECOMMENDED: furtherActionsData.get("OTHER_EVALUATION_RECOMMENDED"),
                    OTHER_RECOMMENDATIONS: furtherActionsData.get("OTHER_RECOMMENDATIONS"),
                    COMMENTS: furtherActionsData.get("COMMENTS")
                };
            } else CreateDefaultFurtherActionsArray();
        } else CreateDefaultFurtherActionsArray();
    }
    function OpenFurtherActions() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadFurtherActionsData();
            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsFurtherActionsView", {
                mode: current_mode,
                is_synchronized: current_is_synchronized,
                atc20_type: current_atc20_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadInspectorPersonalData() {
        var ATC20ModeUtils = require("/ATC20ModeUtils");
        ATC20ModeUtils.LoadInspectorPersonalData(current_mode);
    }
    function GetImagesCount() {
        var ATC20ModeUtils = require("/ATC20ModeUtils");
        return ATC20ModeUtils.GetImagesCount(current_form_id);
    }
    function handleMenuClick(_event) {
        try {
            bCanClickOnTableView && BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                switch (_event.row.id) {
                  case 0:
                    OpenInspection();
                    break;

                  case 1:
                    OpenBuildingDescription();
                    break;

                  case 2:
                    "0" == current_atc20_type ? OpenDetailedEvaluation() : OpenRapidEvaluation();
                    break;

                  case 3:
                    "0" == current_atc20_type ? OpenDetailedPosting() : OpenRapidPosting();
                    break;

                  case 4:
                    OpenFurtherActions();
                }
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        Save("generic_save_title", "save_confirm_msg");
    }
    function Save(title, message, callbackFnt) {
        if (view_enabled) {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: L(title),
                message: L(message),
                buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                cancel: 1
            });
            alertDialog.addEventListener("click", function(e) {
                0 == e.index ? SaveInternal() : 1 == e.index;
                callbackFnt && callbackFnt();
            });
            alertDialog.show();
        } else callbackFnt && callbackFnt();
    }
    function SaveInternal() {
        BusyAction($.activity_indicator, controls, function() {
            var bRet = false;
            try {
                bCanClickOnTableView = false;
                bIsWorkInProgress = true;
                var bError = false;
                var user = "";
                Alloy.Globals.ExistSession() && (user = Alloy.Globals.SessionUsername);
                var inspectorID = "";
                var affiliation = "";
                LoadInspectorPersonalData(current_mode);
                if (Alloy.Collections.ATC20ModePD && _.size(Alloy.Collections.ATC20ModePD) > 0) {
                    var personalData = Alloy.Collections.ATC20ModePD.at(0);
                    inspectorID = personalData.get("INSPECTOR_ID");
                    affiliation = personalData.get("AFFILIATION");
                }
                var finalPosting = "";
                if ("0" == current_atc20_type) {
                    LoadDetailedPostingData();
                    Alloy.Globals.ATC20ModeDetailedPosting && _.size(Alloy.Globals.ATC20ModeDetailedPosting) > 0 && (finalPosting = Alloy.Globals.ATC20ModeDetailedPosting["POSTING"]);
                }
                if (-1 == current_form_id) if (Alloy.Globals.ATC20ModeInspection && _.size(Alloy.Globals.ATC20ModeInspection) > 0) {
                    Alloy.Globals.ATC20ModeInspection["INSPECTOR_ID"] = inspectorID;
                    Alloy.Globals.ATC20ModeInspection["AFFILIATION"] = affiliation;
                    Alloy.Globals.ATC20ModeInspection["FINAL_POSTING"] = finalPosting;
                    var inspectionModel = Alloy.createModel("ATC20Forms", {
                        INSPECTOR_ID: inspectorID,
                        AFFILIATION: affiliation,
                        DATE: Alloy.Globals.ATC20ModeInspection["DATE"],
                        FINAL_POSTING: finalPosting,
                        MODE: current_mode.toString(),
                        TYPE: current_atc20_type.toString(),
                        AREAS_INSPECTED: Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"],
                        USER: user,
                        SYNCHRONIZED: "0"
                    });
                    inspectionModel.save();
                    inspectionModel = null;
                } else {
                    var current_date = new Date();
                    var current_time = current_date.getTime();
                    var inspectionModel = Alloy.createModel("ATC20Forms", {
                        INSPECTOR_ID: inspectorID,
                        AFFILIATION: affiliation,
                        DATE: current_time.toString(),
                        FINAL_POSTING: finalPosting,
                        MODE: current_mode.toString(),
                        TYPE: current_atc20_type.toString(),
                        AREAS_INSPECTED: "0",
                        USER: user,
                        SYNCHRONIZED: "0"
                    });
                    inspectionModel.save();
                    inspectionModel = null;
                } else if (Alloy.Globals.ATC20ModeInspection && _.size(Alloy.Globals.ATC20ModeInspection) > 0) {
                    Alloy.Globals.ATC20ModeInspection["INSPECTOR_ID"] = inspectorID;
                    Alloy.Globals.ATC20ModeInspection["AFFILIATION"] = affiliation;
                    Alloy.Globals.ATC20ModeInspection["FINAL_POSTING"] = finalPosting;
                    var recoverInspection = Alloy.createCollection("ATC20Forms");
                    recoverInspection.fetch({
                        query: "SELECT * FROM ATC20Forms where ID = " + current_form_id
                    });
                    if (recoverInspection.length > 0) {
                        var currentInspection = recoverInspection.at(0);
                        currentInspection.set({
                            INSPECTOR_ID: inspectorID,
                            AFFILIATION: affiliation,
                            DATE: Alloy.Globals.ATC20ModeInspection["DATE"],
                            FINAL_POSTING: finalPosting,
                            MODE: current_mode.toString(),
                            TYPE: current_atc20_type.toString(),
                            AREAS_INSPECTED: Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"],
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        currentInspection.save();
                        currentInspection = null;
                    }
                } else if (user) {
                    var recoverInspection = Alloy.createCollection("ATC20Forms");
                    recoverInspection.fetch({
                        query: "SELECT * FROM ATC20Forms where ID = " + current_form_id
                    });
                    if (recoverInspection.length > 0) {
                        var currentInspection = recoverInspection.at(0);
                        currentInspection.set({
                            USER: user
                        });
                        currentInspection.save();
                        currentInspection = null;
                    }
                }
                if (-1 == current_form_id) {
                    var recoverID = Alloy.createCollection("ATC20Forms");
                    recoverID.fetch({
                        query: "SELECT max(ID) AS MAX_ID FROM ATC20Forms;"
                    });
                    if (recoverID.length > 0) {
                        current_form_id = recoverID.at(0).get("MAX_ID");
                        recoverID = null;
                    }
                    Ti.API.info("\nNEW_ID: " + current_form_id);
                }
                if (Alloy.Globals.ATC20ModeBuildingDescription && _.size(Alloy.Globals.ATC20ModeBuildingDescription) > 0) {
                    Ti.API.info("\nBuildingDescription:\n");
                    var recoverBuildingDescription = Alloy.createCollection("ATC20FormsBuildingDescription");
                    recoverBuildingDescription.fetch({
                        query: "SELECT * FROM ATC20FormsBuildingDescription where FORM_ID = " + current_form_id
                    });
                    if (recoverBuildingDescription.length > 0) {
                        var currentBuildingDescription = recoverBuildingDescription.at(0);
                        currentBuildingDescription.set({
                            BUILDING_NAME: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"],
                            ALSO_KNOWN_AS: Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"],
                            LOT: Alloy.Globals.ATC20ModeBuildingDescription["LOT"],
                            DP: Alloy.Globals.ATC20ModeBuildingDescription["DP"],
                            OTHER_ID: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"],
                            CONTACT_NAME: Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"],
                            ADDRESS: Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"],
                            BUILDING_CONTACT: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"],
                            UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"],
                            NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"],
                            APPROX_FT_AREA: Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"],
                            RESIDENTIAL_UNITS: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"],
                            RESIDENTIAL_UNITS_UNINHABITABLE: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"],
                            TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"],
                            OTHER_TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"],
                            PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"],
                            OTHER_PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"]
                        });
                        currentBuildingDescription.save();
                        currentBuildingDescription = null;
                    } else {
                        var buildingDescriptionModel = Alloy.createModel("ATC20FormsBuildingDescription", {
                            FORM_ID: current_form_id,
                            BUILDING_NAME: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"],
                            ALSO_KNOWN_AS: Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"],
                            LOT: Alloy.Globals.ATC20ModeBuildingDescription["LOT"],
                            DP: Alloy.Globals.ATC20ModeBuildingDescription["DP"],
                            OTHER_ID: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"],
                            CONTACT_NAME: Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"],
                            ADDRESS: Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"],
                            BUILDING_CONTACT: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"],
                            UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"],
                            NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"],
                            APPROX_FT_AREA: Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"],
                            RESIDENTIAL_UNITS: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"],
                            RESIDENTIAL_UNITS_UNINHABITABLE: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"],
                            TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"],
                            OTHER_TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"],
                            PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"],
                            OTHER_PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"]
                        });
                        buildingDescriptionModel.save();
                        buildingDescriptionModel = null;
                    }
                }
                var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                if (Alloy.Globals.ATC20ModeDetailedEvaluation && _.size(Alloy.Globals.ATC20ModeDetailedEvaluation) > 0) {
                    Ti.API.info("\nDetailedEvaluation:\n");
                    var recoverDetailedEvaluation = Alloy.createCollection("ATC20FormsDetailedEvaluation");
                    recoverDetailedEvaluation.fetch({
                        query: "SELECT * FROM ATC20FormsDetailedEvaluation where FORM_ID = " + current_form_id
                    });
                    if (recoverDetailedEvaluation.length > 0) {
                        var currentDetailedEvaluation = recoverDetailedEvaluation.at(0);
                        var sketch_path = currentDetailedEvaluation.get("SKETCH_PATH");
                        if (Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] && "Y" == Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"]) {
                            if (sketch_path) {
                                var file = Alloy.Globals.getFileForWrite(sketch_path);
                                file.exists() && file.deleteFile();
                                if (Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]) ; else {
                                    sketch_path = "";
                                    file = null;
                                }
                            } else if (Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]) {
                                sketch_path = current_time + "__sketch.png";
                                var file = Alloy.Globals.getFileForWrite(sketch_path);
                            } else var file = null;
                            if (file) {
                                var fromFile = Ti.Filesystem.getFile(Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]);
                                if (file.write(fromFile.read())) Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] = "N"; else {
                                    bError = true;
                                    Alloy.Globals.AlertUserAndLogAsync(L("sketch_saving_error_msg"));
                                }
                                file = null;
                            }
                        }
                        if (!bError) {
                            currentDetailedEvaluation.set({
                                EVALUATION: Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"],
                                OVERALL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"],
                                OVERALL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"],
                                STRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"],
                                STRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"],
                                NONSTRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"],
                                NONSTRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"],
                                GEOTECHNICAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"],
                                GEOTECHNICAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"],
                                GENERAL_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"],
                                SKETCH_PATH: sketch_path,
                                ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                            });
                            currentDetailedEvaluation.save();
                            currentDetailedEvaluation = null;
                        }
                    } else {
                        var sketch_path = "";
                        if (Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]) {
                            sketch_path = current_time + "__sketch.png";
                            var file = Alloy.Globals.getFileForWrite(sketch_path);
                            file.exists() && file.deleteFile();
                            var fromFile = Ti.Filesystem.getFile(Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]);
                            if (!file.write(fromFile.read())) {
                                bError = true;
                                Alloy.Globals.AlertUserAndLogAsync(L("sketch_saving_error_msg"));
                            }
                            file = null;
                        }
                        if (!bError) {
                            var detailedEvaluationModel = Alloy.createModel("ATC20FormsDetailedEvaluation", {
                                FORM_ID: current_form_id,
                                EVALUATION: Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"],
                                OVERALL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"],
                                OVERALL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"],
                                STRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"],
                                STRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"],
                                NONSTRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"],
                                NONSTRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"],
                                GEOTECHNICAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"],
                                GEOTECHNICAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"],
                                GENERAL_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"],
                                SKETCH_PATH: sketch_path,
                                ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                            });
                            detailedEvaluationModel.save();
                            detailedEvaluationModel = null;
                        }
                    }
                }
                if (Alloy.Globals.ATC20ModeRapidEvaluation && _.size(Alloy.Globals.ATC20ModeRapidEvaluation) > 0) {
                    Ti.API.info("\nRapidEvaluation:\n");
                    var recoverRapidEvaluation = Alloy.createCollection("ATC20FormsRapidEvaluation");
                    recoverRapidEvaluation.fetch({
                        query: "SELECT * FROM ATC20FormsRapidEvaluation where FORM_ID = " + current_form_id
                    });
                    if (recoverRapidEvaluation.length > 0) {
                        var currentRapidEvaluation = recoverRapidEvaluation.at(0);
                        currentRapidEvaluation.set({
                            EVALUATION: Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"],
                            OTHER_OBSERVED_CONDITIONS: Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"],
                            GENERAL_COMMENTS: Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"],
                            ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                        });
                        currentRapidEvaluation.save();
                        currentRapidEvaluation = null;
                    } else {
                        var rapidEvaluationModel = Alloy.createModel("ATC20FormsRapidEvaluation", {
                            FORM_ID: current_form_id,
                            EVALUATION: Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"],
                            OTHER_OBSERVED_CONDITIONS: Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"],
                            GENERAL_COMMENTS: Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"],
                            ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                        });
                        rapidEvaluationModel.save();
                        rapidEvaluationModel = null;
                    }
                }
                if (Alloy.Globals.ATC20ModeDetailedPosting && _.size(Alloy.Globals.ATC20ModeDetailedPosting) > 0) {
                    Ti.API.info("\nDetailedPosting:\n");
                    var recoverDetailedPosting = Alloy.createCollection("ATC20FormsDetailedPosting");
                    recoverDetailedPosting.fetch({
                        query: "SELECT * FROM ATC20FormsDetailedPosting where FORM_ID = " + current_form_id
                    });
                    if (recoverDetailedPosting.length > 0) {
                        var currentDetailedPosting = recoverDetailedPosting.at(0);
                        currentDetailedPosting.set({
                            PREVIOUS_POSTING: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"],
                            PREVIOUS_POSTING_INSPECTOR_ID: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"],
                            PREVIOUS_POSTING_DATE: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"],
                            POSTING: Alloy.Globals.ATC20ModeDetailedPosting["POSTING"],
                            CLASSIFICATION: Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"],
                            USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"]
                        });
                        currentDetailedPosting.save();
                        currentDetailedPosting = null;
                    } else {
                        var detailedPostingModel = Alloy.createModel("ATC20FormsDetailedPosting", {
                            FORM_ID: current_form_id,
                            PREVIOUS_POSTING: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"],
                            PREVIOUS_POSTING_INSPECTOR_ID: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"],
                            PREVIOUS_POSTING_DATE: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"],
                            POSTING: Alloy.Globals.ATC20ModeDetailedPosting["POSTING"],
                            CLASSIFICATION: Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"],
                            USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"]
                        });
                        detailedPostingModel.save();
                        detailedPostingModel = null;
                    }
                }
                if (Alloy.Globals.ATC20ModeRapidPosting && _.size(Alloy.Globals.ATC20ModeRapidPosting) > 0) {
                    Ti.API.info("\nRapidPosting:\n");
                    var recoverRapidPosting = Alloy.createCollection("ATC20FormsRapidPosting");
                    recoverRapidPosting.fetch({
                        query: "SELECT * FROM ATC20FormsRapidPosting where FORM_ID = " + current_form_id
                    });
                    if (recoverRapidPosting.length > 0) {
                        var currentRapidPosting = recoverRapidPosting.at(0);
                        currentRapidPosting.set({
                            POSTING: Alloy.Globals.ATC20ModeRapidPosting["POSTING"],
                            CLASSIFICATION: Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"],
                            USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"]
                        });
                        currentRapidPosting.save();
                        currentRapidPosting = null;
                    } else {
                        var rapidPostingModel = Alloy.createModel("ATC20FormsRapidPosting", {
                            FORM_ID: current_form_id,
                            POSTING: Alloy.Globals.ATC20ModeRapidPosting["POSTING"],
                            CLASSIFICATION: Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"],
                            USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"]
                        });
                        rapidPostingModel.save();
                        rapidPostingModel = null;
                    }
                }
                if (Alloy.Globals.ATC20ModeFurtherActions && _.size(Alloy.Globals.ATC20ModeFurtherActions) > 0) {
                    Ti.API.info("\nFurtherActions:\n");
                    var recoverFurtherActions = Alloy.createCollection("ATC20FormsFurtherActions");
                    recoverFurtherActions.fetch({
                        query: "SELECT * FROM ATC20FormsFurtherActions where FORM_ID = " + current_form_id
                    });
                    if (recoverFurtherActions.length > 0) {
                        var currentFurtherActions = recoverFurtherActions.at(0);
                        currentFurtherActions.set({
                            BARRICADES_IN_THE_FOLLOWING_AREAS: Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"],
                            EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"],
                            OTHER_EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"],
                            OTHER_RECOMMENDATIONS: Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"],
                            COMMENTS: Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"]
                        });
                        currentFurtherActions.save();
                        currentFurtherActions = null;
                    } else {
                        var furtherActionsModel = Alloy.createModel("ATC20FormsFurtherActions", {
                            FORM_ID: current_form_id,
                            BARRICADES_IN_THE_FOLLOWING_AREAS: Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"],
                            EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"],
                            OTHER_EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"],
                            OTHER_RECOMMENDATIONS: Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"],
                            COMMENTS: Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"]
                        });
                        furtherActionsModel.save();
                        furtherActionsModel = null;
                    }
                }
                if (Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0) {
                    Ti.API.info("\nImages:\n\n");
                    for (var i = 0; i < Alloy.Globals.CurrentPicsPath.length; i++) {
                        if (Alloy.Globals.CurrentPicsPath[i].id) {
                            Ti.API.info("\nPicture already present.\n");
                            var recoverImage = Alloy.createCollection("ATC20FormsImages");
                            recoverImage.fetch({
                                query: "SELECT * FROM ATC20FormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
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
                                    var imageModel = Alloy.createModel("ATC20FormsImages", {
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
                            var recoverVideo = Alloy.createCollection("ATC20FormsVideos");
                            recoverVideo.fetch({
                                query: "SELECT * FROM ATC20FormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
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
                                    var videoModel = Alloy.createModel("ATC20FormsVideos", {
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
                    Ti.API.info("\nEND");
                    Ti.App.fireEvent("atc20_mode:save");
                    bRet = true;
                }
            } catch (exception) {
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            } finally {
                bCanClickOnTableView = true;
                bIsWorkInProgress = false;
            }
            return bRet;
        });
    }
    function OnBtnBuildingDamageAssessments_Click() {
        try {
            var ATC20ModeUtils = require("/ATC20ModeUtils");
            var media_array = ATC20ModeUtils.CreateMediaArray(current_form_id, true, true);
            if (media_array && media_array.length > 0) {
                Alloy.Globals.createAndOpenControllerExt("DamageAssessmentsMakerView", {
                    type: "ATC20",
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
                LoadInspectionData();
                LoadBuildingDescriptionData();
                if ("0" == current_atc20_type) {
                    LoadDetailedEvaluationData();
                    LoadDetailedPostingData();
                } else {
                    LoadRapidEvaluationData();
                    LoadRapidPostingData();
                }
                LoadFurtherActionsData();
                LoadInspectorPersonalData();
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    if (this.responseText && "ERROR_" != this.responseText.substring(0, 6)) {
                        if ("0" == current_atc20_type) {
                            var emailSubject = "atc20_detailed_mode_send_email_dlg_subject";
                            if ("CA" == current_mode) if ("it" == Titanium.Locale.currentLanguage) {
                                var filename = "scheda_atc20_dettagliata.pdf";
                                var zipname = "SchedaATC20Dettagliata.zip";
                            } else if ("es" == Titanium.Locale.currentLanguage) {
                                var filename = "tarjeta_atc20_detallada.pdf";
                                var zipname = "TarjetaATC20Detallada.zip";
                            } else {
                                var filename = "detailed_atc20_form.pdf";
                                var zipname = "DetailedATC20Form.zip";
                            } else if ("NZ" == current_mode) {
                                emailSubject = "atc20_nz_detailed_mode_send_email_dlg_subject";
                                if ("it" == Titanium.Locale.currentLanguage) {
                                    var filename = "scheda_livello_2.pdf";
                                    var zipname = "SchedaLivello2.zip";
                                } else if ("es" == Titanium.Locale.currentLanguage) {
                                    var filename = "tarjeta_de_evaluacion_rapida_nivel_2.pdf";
                                    var zipname = "TarjetaDeEvaluacionRapidaNivel2.zip";
                                } else {
                                    var filename = "level_2_form.pdf";
                                    var zipname = "Level2Form.zip";
                                }
                            }
                        } else {
                            var emailSubject = "atc20_rapid_mode_send_email_dlg_subject";
                            if ("CA" == current_mode) if ("it" == Titanium.Locale.currentLanguage) {
                                var filename = "scheda_atc20_rapida.pdf";
                                var zipname = "SchedaATC20Rapida.zip";
                            } else if ("es" == Titanium.Locale.currentLanguage) {
                                var filename = "tarjeta_atc20_rapida.pdf";
                                var zipname = "TarjetaATC20Rapida.zip";
                            } else {
                                var filename = "rapid_atc20_form.pdf";
                                var zipname = "RapidATC20Form.zip";
                            } else if ("NZ" == current_mode) {
                                emailSubject = "atc20_nz_rapid_mode_send_email_dlg_subject";
                                if ("it" == Titanium.Locale.currentLanguage) {
                                    var filename = "scheda_livello_1.pdf";
                                    var zipname = "SchedaLivello1.zip";
                                } else if ("es" == Titanium.Locale.currentLanguage) {
                                    var filename = "tarjeta_de_evaluacion_rapida_nivel_1.pdf";
                                    var zipname = "TarjetaDeEvaluacionRapidaNivel1.zip";
                                } else {
                                    var filename = "level_1_form.pdf";
                                    var zipname = "Level1Form.zip";
                                }
                            }
                        }
                        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), filename);
                        file.exists() && file.deleteFile();
                        file.write(this.responseData);
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.createAndOpenControllerExt("SendFormView", {
                            type: "ATC20",
                            form_id: current_form_id,
                            pdf_native_path: file.nativePath,
                            zip_filename: zipname,
                            email_subject_language_msg: emailSubject
                        });
                    } else {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        if ("0" == current_atc20_type) switch (this.responseText) {
                          case "ERROR_CODE_1":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg"));
                            break;

                          case "ERROR_CODE_2":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_upload_sketch_err_msg"));
                            break;

                          case "ERROR_CODE_3":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_upload_sign_err_msg"));
                        } else switch (this.responseText) {
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
                var params = {
                    key: "EDAM",
                    language: Titanium.Locale.currentLanguage,
                    INSPECTOR_ID: Alloy.Globals.ATC20ModeInspection["INSPECTOR_ID"],
                    AFFILIATION: Alloy.Globals.ATC20ModeInspection["AFFILIATION"],
                    DATE: Alloy.Globals.ATC20ModeInspection["DATE"],
                    FINAL_POSTING: Alloy.Globals.ATC20ModeInspection["FINAL_POSTING"],
                    AREAS_INSPECTED: Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"],
                    BUILDING_NAME: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"],
                    ALSO_KNOWN_AS: Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"],
                    LOT: Alloy.Globals.ATC20ModeBuildingDescription["LOT"],
                    DP: Alloy.Globals.ATC20ModeBuildingDescription["DP"],
                    OTHER_ID: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"],
                    CONTACT_NAME: Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"],
                    ADDRESS: Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"],
                    BUILDING_CONTACT: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"],
                    UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"],
                    NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"],
                    APPROX_FT_AREA: Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"],
                    RESIDENTIAL_UNITS: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"],
                    RESIDENTIAL_UNITS_UNINHABITABLE: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"],
                    TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"],
                    OTHER_TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"],
                    PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"],
                    OTHER_PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"],
                    BARRICADES_IN_THE_FOLLOWING_AREAS: Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"],
                    EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"],
                    OTHER_EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"],
                    OTHER_RECOMMENDATIONS: Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"],
                    COMMENTS: Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"]
                };
                if ("NZ" == current_mode) {
                    var tpd_sign_image = "";
                    if (Alloy.Collections.ATC20ModePD && _.size(Alloy.Collections.ATC20ModePD) > 0) {
                        var personalData = Alloy.Collections.ATC20ModePD.at(0);
                        var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                        file && (tpd_sign_image = file.read());
                    }
                    params["TPD_SIGN_IMAGE"] = tpd_sign_image;
                    params["IMAGES_COUNT"] = GetImagesCount();
                }
                if ("0" == current_atc20_type) {
                    params["EVALUATION"] = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"];
                    params["OVERALL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"];
                    params["OVERALL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"];
                    params["STRUCTURAL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"];
                    params["STRUCTURAL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"];
                    params["NONSTRUCTURAL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"];
                    params["NONSTRUCTURAL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"];
                    params["GEOTECHNICAL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"];
                    params["GEOTECHNICAL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"];
                    params["GENERAL_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"];
                    var sketch_image_content = "";
                    if (Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]) {
                        var sketchFile = Titanium.Filesystem.getFile(Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]);
                        sketchFile && (sketch_image_content = sketchFile.read());
                    }
                    params["SKETCH_IMAGE"] = sketch_image_content;
                    params["ESTIMATED_BUILDING_DAMAGE"] = Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"];
                    params["PREVIOUS_POSTING"] = Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"];
                    params["PREVIOUS_POSTING_INSPECTOR_ID"] = Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"];
                    params["PREVIOUS_POSTING_DATE"] = Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"];
                    params["POSTING"] = Alloy.Globals.ATC20ModeDetailedPosting["POSTING"];
                    params["CLASSIFICATION"] = Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"];
                    params["USE_AND_ENTRY_RESTRICTIONS"] = Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"];
                    "CA" == current_mode ? loader.open("POST", "https://www.edam.resiltronics.org/ManipulatePDF/ATC20DetailedMode_ManipulatePDF.php") : "NZ" == current_mode && loader.open("POST", "https://www.edam.resiltronics.org/ManipulatePDF/ATC20NZLevel2Mode_ManipulatePDF.php");
                } else {
                    params["EVALUATION"] = Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"];
                    params["OTHER_OBSERVED_CONDITIONS"] = Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"];
                    params["GENERAL_COMMENTS"] = Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"];
                    params["ESTIMATED_BUILDING_DAMAGE"] = Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"];
                    params["POSTING"] = Alloy.Globals.ATC20ModeRapidPosting["POSTING"];
                    params["CLASSIFICATION"] = Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"];
                    params["USE_AND_ENTRY_RESTRICTIONS"] = Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"];
                    "CA" == current_mode ? loader.open("POST", "https://www.edam.resiltronics.org/ManipulatePDF/ATC20RapidMode_ManipulatePDF.php") : "NZ" == current_mode && loader.open("POST", "https://www.edam.resiltronics.org/ManipulatePDF/ATC20NZLevel1Mode_ManipulatePDF.php");
                }
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
                var ATC20ModeUtils = require("/ATC20ModeUtils");
                var media_array = ATC20ModeUtils.CreateMediaArray(current_form_id, true);
                Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: media_array,
                    type: "ATC20",
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
                    if (0 == e.index) if (Alloy.Globals.isLocationAuthorized()) {
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
                        Alloy.Globals.MakeVideo($.atc20ModeFormsGeneralSectionWindow.getActivity(), "", 0, 0, "");
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
                    if (0 == e.index) if (Alloy.Globals.isLocationAuthorized()) {
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
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
                alert(L("generic_no_network_for_georeverse_address_msg"));
                RaiseEndAsyncBusyAction_CallBack();
                Alloy.Globals.UseCamera(sCurrentHeading, e.coords.latitude, e.coords.longitude, "");
            } else Alloy.Globals.reverseGeocodeAndUseCamera(sCurrentHeading, e.coords.latitude, e.coords.longitude, null, RaiseEndAsyncBusyAction_CallBack);
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
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
                alert(L("generic_no_network_for_georeverse_address_msg"));
                RaiseEndAsyncBusyAction_CallBack();
                Alloy.Globals.MakeVideo($.atc20ModeFormsGeneralSectionWindow.getActivity(), sCurrentHeading, e.coords.latitude, e.coords.longitude, "");
            } else Alloy.Globals.reverseGeocodeAndUseCamera(sCurrentHeading, e.coords.latitude, e.coords.longitude, $.atc20ModeFormsGeneralSectionWindow.getActivity(), RaiseEndAsyncBusyAction_CallBack);
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
                    type: "ATC20"
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
        $.lbl_slider_menu.setText(L("slider_menu_hide_text_msg"));
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
        $.lbl_slider_menu.setText(L("slider_menu_show_text_msg"));
        slider_menu_opened = false;
    }
    function OnBtnSliderMenu_Click() {
        slider_menu_opened ? closeMenu() : openMenu();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsGeneralSection";
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
    $.__views.atc20ModeFormsGeneralSectionWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "atc20ModeFormsGeneralSectionWindow"
    });
    $.__views.atc20ModeFormsGeneralSectionWindow && $.addTopLevelView($.__views.atc20ModeFormsGeneralSectionWindow);
    OnAndroidBackButton_Click ? $.__views.atc20ModeFormsGeneralSectionWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.atc20ModeFormsGeneralSectionWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.atc20ModeFormsGeneralSectionWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.atc20ModeFormsGeneralSectionWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.atc20ModeFormsGeneralSectionWindow.add($.__views.activity_indicator);
    $.__views.slideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "slideMenu",
        __parentSymbol: $.__views.atc20ModeFormsGeneralSectionWindow
    });
    $.__views.slideMenu.setParent($.__views.atc20ModeFormsGeneralSectionWindow);
    $.__views.appWrapper = Ti.UI.createView({
        id: "appWrapper"
    });
    $.__views.atc20ModeFormsGeneralSectionWindow.add($.__views.appWrapper);
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
    $.__views.lbl_slider_menu = Ti.UI.createLabel({
        top: 0,
        left: 63,
        height: 60,
        text: L("slider_menu_show_text_msg"),
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "11"
        },
        color: "#000",
        textAlign: "center",
        id: "lbl_slider_menu"
    });
    $.__views.scrollViewGeneralSection.add($.__views.lbl_slider_menu);
    $.__views.images_btn_view = Ti.UI.createView({
        top: 65,
        width: 202,
        height: 268,
        id: "images_btn_view"
    });
    $.__views.scrollViewGeneralSection.add($.__views.images_btn_view);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 0,
        left: 71,
        width: 60,
        id: "viewAppButtonSave"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.viewAppButtonBuildingDamageAssessments = Ti.UI.createView({
        top: 90,
        left: 0,
        width: 60,
        id: "viewAppButtonBuildingDamageAssessments"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonBuildingDamageAssessments);
    $.__views.widgetAppButtonBuildingDamageAssessments = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonBuildingDamageAssessments",
        __parentSymbol: $.__views.viewAppButtonBuildingDamageAssessments
    });
    $.__views.widgetAppButtonBuildingDamageAssessments.setParent($.__views.viewAppButtonBuildingDamageAssessments);
    $.__views.viewAppButtonSend = Ti.UI.createView({
        top: 90,
        left: 71,
        width: 60,
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
        top: 180,
        left: 0,
        width: 60,
        id: "viewAppButtonMakeMedia"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonMakeMedia);
    $.__views.widgetAppButtonMakeMedia = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonMakeMedia",
        __parentSymbol: $.__views.viewAppButtonMakeMedia
    });
    $.__views.widgetAppButtonMakeMedia.setParent($.__views.viewAppButtonMakeMedia);
    $.__views.viewAppButtonViewMedia = Ti.UI.createView({
        top: 180,
        left: 71,
        width: 60,
        id: "viewAppButtonViewMedia"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonViewMedia);
    $.__views.widgetAppButtonViewMedia = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonViewMedia",
        __parentSymbol: $.__views.viewAppButtonViewMedia
    });
    $.__views.widgetAppButtonViewMedia.setParent($.__views.viewAppButtonViewMedia);
    $.__views.viewAppButtonMakeDraft = Ti.UI.createView({
        top: 180,
        left: 142,
        width: 60,
        id: "viewAppButtonMakeDraft"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonMakeDraft);
    $.__views.widgetAppButtonMakeDraft = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonMakeDraft",
        __parentSymbol: $.__views.viewAppButtonMakeDraft
    });
    $.__views.widgetAppButtonMakeDraft.setParent($.__views.viewAppButtonMakeDraft);
    $.__views.imageViewATC20Logo = Ti.UI.createImageView({
        top: 335,
        width: "100%",
        id: "imageViewATC20Logo"
    });
    $.__views.scrollViewGeneralSection.add($.__views.imageViewATC20Logo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_form_id = args.form_id;
    var current_is_synchronized = args.is_synchronized;
    var current_atc20_type = args.atc20_type;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.widgetAppButtonMakeVideo.get_button());
    controls.push($.widgetAppButtonSave.get_button());
    controls.push($.widgetAppButtonSend.get_button());
    controls.push($.widgetAppButtonBuildingDamageAssessments.get_button());
    controls.push($.widgetAppButtonMakeDraft.get_button());
    controls.push($.widgetAppButtonViewMedia.get_button());
    controls.push($.widgetAppButtonMakeMedia.get_button());
    var bIsWorkInProgress = false;
    var sCurrentHeading = "";
    var timeout = null;
    var bCanClickOnTableView = true;
    var slider_menu_opened = false;
    try {
        "0" == current_atc20_type ? "CA" == current_mode ? $.atc20ModeFormsGeneralSectionWindow.setTitle(L("atc20_detailed_mode_forms_general_section_view_title")) : "NZ" == current_mode ? $.atc20ModeFormsGeneralSectionWindow.setTitle(L("atc20_nz_detailed_mode_forms_general_section_view_title")) : "NEPAL" == current_mode && $.atc20ModeFormsGeneralSectionWindow.setTitle(L("atc20_nepal_detailed_mode_forms_general_section_view_title")) : "CA" == current_mode ? $.atc20ModeFormsGeneralSectionWindow.setTitle(L("atc20_rapid_mode_forms_general_section_view_title")) : "NZ" == current_mode ? $.atc20ModeFormsGeneralSectionWindow.setTitle(L("atc20_nz_rapid_mode_forms_general_section_view_title")) : "NEPAL" == current_mode && $.atc20ModeFormsGeneralSectionWindow.setTitle(L("atc20_nepal_rapid_mode_forms_general_section_view_title"));
        if ("CA" == current_mode) $.imageViewATC20Logo.setImage("/images/ATC20_logo.png"); else if ("NZ" == current_mode) $.imageViewATC20Logo.setImage("/images/ATC20_NZ_logo.png"); else if ("NEPAL" == current_mode) {
            $.imageViewATC20Logo.setImage("/images/ATC20_NEPAL_logo.png");
            $.viewAppButtonSend.visible = false;
        }
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.widgetAppButtonBuildingDamageAssessments.init("/images/building_damage_assessments_normal.png", "/images/building_damage_assessments_pressed.png", "/images/building_damage_assessments_disabled.png", L("btn_building_damage_assessments_text"), OnBtnBuildingDamageAssessments_Click);
        $.viewAppButtonBuildingDamageAssessments.visible = view_enabled;
        $.widgetAppButtonSend.init("/images/send_normal.png", "/images/send_pressed.png", "/images/send_disabled.png", L("generic_send_btn_title"), OnBtnSend_Click);
        $.widgetAppButtonMakeDraft.init("/images/draft_normal.png", "/images/draft_pressed.png", "/images/draft_disabled.png", L("btn_make_draft_text"), OnBtnMakeDraft_Click);
        $.viewAppButtonMakeDraft.visible = view_enabled;
        $.widgetAppButtonViewMedia.init("/images/gallery_normal.png", "/images/gallery_pressed.png", "/images/gallery_disabled.png", L("btn_view_media_text"), OnBtnViewMedia_Click);
        Alloy.Globals.ATC20ModeInspection = new Array();
        Alloy.Globals.ATC20ModeBuildingDescription = new Array();
        Alloy.Globals.ATC20ModeDetailedEvaluation = new Array();
        Alloy.Globals.ATC20ModeDetailedPosting = new Array();
        Alloy.Globals.ATC20ModeRapidEvaluation = new Array();
        Alloy.Globals.ATC20ModeRapidPosting = new Array();
        Alloy.Globals.ATC20ModeFurtherActions = new Array();
        Alloy.Globals.CurrentPicsPath = null;
        Alloy.Globals.CurrentVideosPath = null;
        var nodes = [ {
            menuHeader: L("atc20_mode_sections_slide_menu_title"),
            id: 0,
            title: L("atc20_mode_section_inspection_title"),
            image: "/images/slide_menu_details.png"
        }, {
            id: 1,
            title: L("atc20_mode_section_building_description_title"),
            image: "/images/slide_menu_building_description.png"
        }, {
            id: 2,
            title: L("atc20_mode_section_evaluation_title"),
            image: "/images/slide_menu_evaluation.png"
        }, {
            id: 3,
            title: L("atc20_mode_section_posting_title"),
            image: "/images/slide_menu_posting.png"
        }, {
            id: 4,
            title: L("atc20_mode_section_further_actions_title"),
            image: "/images/slide_menu_further_actions.png"
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
        $.atc20ModeFormsGeneralSectionWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.atc20ModeFormsGeneralSectionWindow!android:back!OnAndroidBackButton_Click"] && $.__views.atc20ModeFormsGeneralSectionWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.atc20ModeFormsGeneralSectionWindow!androidback!OnAndroidBackButton_Click"] && $.__views.atc20ModeFormsGeneralSectionWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btn_slider_menu!click!OnBtnSliderMenu_Click"] && $.__views.btn_slider_menu.addEventListener("click", OnBtnSliderMenu_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;