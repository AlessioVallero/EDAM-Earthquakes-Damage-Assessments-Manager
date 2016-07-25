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
                Alloy.Globals.AeDESModeDetails = new Array();
                Alloy.Globals.AeDESModeSectionOne = new Array();
                Alloy.Globals.AeDESModeSectionTwo = new Array();
                Alloy.Globals.AeDESModeSectionThree = new Array();
                Alloy.Globals.AeDESModeSectionFour = new Array();
                Alloy.Globals.AeDESModeSectionFive = new Array();
                Alloy.Globals.AeDESModeSectionSix = new Array();
                Alloy.Globals.AeDESModeSectionSeven = new Array();
                Alloy.Globals.AeDESModeSectionEight = new Array();
                Alloy.Globals.AeDESModeSectionNine = new Array();
                Alloy.Globals.CurrentPicsPath = null;
                Alloy.Globals.CurrentVideosPath = null;
                controls = null;
                Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "aedes_mode:save");
                Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
                $.aedesModeFormsGeneralSectionWindow.close();
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultDetailsArray() {
        var current_date = new Date();
        var current_time = current_date.getTime();
        var default_form_no = current_date.getFullYear().toFixed(0);
        Alloy.Globals.AeDESModeDetails = {
            FORM_NO: default_form_no,
            DATE: current_time.toString()
        };
    }
    function LoadDetailsData() {
        if (Alloy.Globals.AeDESModeDetails && _.size(Alloy.Globals.AeDESModeDetails) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverDetails = AeDESModeUtils.LoadDetailsQuery(current_form_id);
            if (recoverDetails.length > 0) {
                var detailsData = recoverDetails.at(0);
                Alloy.Globals.AeDESModeDetails = {
                    FORM_NO: detailsData.get("FORM_NO"),
                    DATE: detailsData.get("DATE")
                };
            } else CreateDefaultDetailsArray();
        } else CreateDefaultDetailsArray();
    }
    function OpenDetails() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadDetailsData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsDetailsView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionOneArray() {
        Alloy.Globals.AeDESModeSectionOne = {
            LATITUDE: "",
            LONGITUDE: "",
            ALTITUDE: "",
            PROVINCE: "",
            MUNICIPALITY: "",
            PLACE: "",
            ADDRESS: "",
            CIVIC_NO: "",
            BUILDING_POSITION: "0",
            B_NAME_OR_OWNER: "",
            CODE_OF_USE: "0"
        };
    }
    function LoadSectionOneData() {
        if (Alloy.Globals.AeDESModeSectionOne && _.size(Alloy.Globals.AeDESModeSectionOne) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionOne = AeDESModeUtils.LoadSectionOneQuery(current_form_id);
            if (recoverSectionOne.length > 0) {
                var sectionOneData = recoverSectionOne.at(0);
                Alloy.Globals.AeDESModeSectionOne = {
                    LATITUDE: sectionOneData.get("LATITUDE"),
                    LONGITUDE: sectionOneData.get("LONGITUDE"),
                    ALTITUDE: sectionOneData.get("ALTITUDE"),
                    PROVINCE: sectionOneData.get("PROVINCE"),
                    MUNICIPALITY: sectionOneData.get("MUNICIPALITY"),
                    PLACE: sectionOneData.get("PLACE"),
                    ADDRESS: sectionOneData.get("ADDRESS"),
                    CIVIC_NO: sectionOneData.get("CIVIC_NO"),
                    BUILDING_POSITION: sectionOneData.get("BUILDING_POSITION"),
                    B_NAME_OR_OWNER: sectionOneData.get("B_NAME_OR_OWNER"),
                    CODE_OF_USE: sectionOneData.get("CODE_OF_USE")
                };
            } else CreateDefaultSectionOneArray();
        } else CreateDefaultSectionOneArray();
    }
    function OpenSectionOne() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionOneData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionOneView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionTwoArray() {
        Alloy.Globals.AeDESModeSectionTwo = {
            PLANS_NO: "0",
            AVERAGE_HEIGHT_OF_FLOOR: "1",
            UNDERGROUND_PLANS_NO: "0",
            AVERAGE_SURFACE: "1",
            CONSTRUCTION_AGE: "0",
            RENOVATION_AGE: "0",
            UNIT_OF_USE_HOUSING: "",
            UNIT_OF_USE_PRODUCTIVE: "",
            UNIT_OF_USE_COMMERCE: "",
            UNIT_OF_USE_OFFICES: "",
            UNIT_OF_USE_PUBLIC_SERVICES: "",
            UNIT_OF_USE_DEPOSIT: "",
            UNIT_OF_USE_STRATEGIC: "",
            UNIT_OF_USE_TOURISM: "",
            UTILIZATION: "0",
            OCCUPANTS: "",
            PROPERTY: "0"
        };
    }
    function LoadSectionTwoData() {
        if (Alloy.Globals.AeDESModeSectionTwo && _.size(Alloy.Globals.AeDESModeSectionTwo) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionTwo = AeDESModeUtils.LoadSectionTwoQuery(current_form_id);
            if (recoverSectionTwo.length > 0) {
                var sectionTwoData = recoverSectionTwo.at(0);
                Alloy.Globals.AeDESModeSectionTwo = {
                    PLANS_NO: sectionTwoData.get("PLANS_NO"),
                    AVERAGE_HEIGHT_OF_FLOOR: sectionTwoData.get("AVERAGE_HEIGHT_OF_FLOOR"),
                    UNDERGROUND_PLANS_NO: sectionTwoData.get("UNDERGROUND_PLANS_NO"),
                    AVERAGE_SURFACE: sectionTwoData.get("AVERAGE_SURFACE"),
                    CONSTRUCTION_AGE: sectionTwoData.get("CONSTRUCTION_AGE"),
                    RENOVATION_AGE: sectionTwoData.get("RENOVATION_AGE"),
                    UNIT_OF_USE_HOUSING: sectionTwoData.get("UNIT_OF_USE_HOUSING"),
                    UNIT_OF_USE_PRODUCTIVE: sectionTwoData.get("UNIT_OF_USE_PRODUCTIVE"),
                    UNIT_OF_USE_COMMERCE: sectionTwoData.get("UNIT_OF_USE_COMMERCE"),
                    UNIT_OF_USE_OFFICES: sectionTwoData.get("UNIT_OF_USE_OFFICES"),
                    UNIT_OF_USE_PUBLIC_SERVICES: sectionTwoData.get("UNIT_OF_USE_PUBLIC_SERVICES"),
                    UNIT_OF_USE_DEPOSIT: sectionTwoData.get("UNIT_OF_USE_DEPOSIT"),
                    UNIT_OF_USE_STRATEGIC: sectionTwoData.get("UNIT_OF_USE_STRATEGIC"),
                    UNIT_OF_USE_TOURISM: sectionTwoData.get("UNIT_OF_USE_TOURISM"),
                    UTILIZATION: sectionTwoData.get("UTILIZATION"),
                    OCCUPANTS: sectionTwoData.get("OCCUPANTS"),
                    PROPERTY: sectionTwoData.get("PROPERTY")
                };
            } else CreateDefaultSectionTwoArray();
        } else CreateDefaultSectionTwoArray();
    }
    function OpenSectionTwo() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionTwoData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionTwoView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionThreeArray() {
        Alloy.Globals.AeDESModeSectionThree = {
            COVERAGE: "0",
            PLAN_AND_ELEVATION: "1",
            INFILL_DISPOSAL: "1",
            ISOLATED_COLUMNS: "1",
            MIXED: "0",
            REINFORCED: "0",
            REINFORCED_CONCRETE_FRAMES: "0",
            REINFORCED_CONCRETE_WALLS: "0",
            STEEL_FRAMES: "0",
            MASONRY_STRUCTURES: "000000000000000000000000000000"
        };
    }
    function LoadSectionThreeData() {
        if (Alloy.Globals.AeDESModeSectionThree && _.size(Alloy.Globals.AeDESModeSectionThree) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionThree = AeDESModeUtils.LoadSectionThreeQuery(current_form_id);
            if (recoverSectionThree.length > 0) {
                var sectionThreeData = recoverSectionThree.at(0);
                Alloy.Globals.AeDESModeSectionThree = {
                    COVERAGE: sectionThreeData.get("COVERAGE"),
                    PLAN_AND_ELEVATION: sectionThreeData.get("PLAN_AND_ELEVATION"),
                    INFILL_DISPOSAL: sectionThreeData.get("INFILL_DISPOSAL"),
                    ISOLATED_COLUMNS: sectionThreeData.get("ISOLATED_COLUMNS"),
                    MIXED: sectionThreeData.get("MIXED"),
                    REINFORCED: sectionThreeData.get("REINFORCED"),
                    REINFORCED_CONCRETE_FRAMES: sectionThreeData.get("REINFORCED_CONCRETE_FRAMES"),
                    REINFORCED_CONCRETE_WALLS: sectionThreeData.get("REINFORCED_CONCRETE_WALLS"),
                    STEEL_FRAMES: sectionThreeData.get("STEEL_FRAMES"),
                    MASONRY_STRUCTURES: sectionThreeData.get("MASONRY_STRUCTURES")
                };
            } else CreateDefaultSectionThreeArray();
        } else CreateDefaultSectionThreeArray();
    }
    function OpenSectionThree() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionThreeData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionThreeView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionFourArray() {
        Alloy.Globals.AeDESModeSectionFour = {
            DAMAGES: "000000000000000000",
            MEASURES_OF_EMERGENCY: "0000000000000000000000000"
        };
    }
    function LoadSectionFourData() {
        if (Alloy.Globals.AeDESModeSectionFour && _.size(Alloy.Globals.AeDESModeSectionFour) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionFour = AeDESModeUtils.LoadSectionFourQuery(current_form_id);
            if (recoverSectionFour.length > 0) {
                var sectionFourData = recoverSectionFour.at(0);
                Alloy.Globals.AeDESModeSectionFour = {
                    DAMAGES: sectionFourData.get("DAMAGES"),
                    MEASURES_OF_EMERGENCY: sectionFourData.get("MEASURES_OF_EMERGENCY")
                };
            } else CreateDefaultSectionFourArray();
        } else CreateDefaultSectionFourArray();
    }
    function OpenSectionFour() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionFourData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionFourView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionFiveArray() {
        Alloy.Globals.AeDESModeSectionFive = {
            DAMAGE_TYPES: "000000000000000000000000000000000000"
        };
    }
    function LoadSectionFiveData() {
        if (Alloy.Globals.AeDESModeSectionFive && _.size(Alloy.Globals.AeDESModeSectionFive) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionFive = AeDESModeUtils.LoadSectionFiveQuery(current_form_id);
            if (recoverSectionFive.length > 0) {
                var sectionFiveData = recoverSectionFive.at(0);
                Alloy.Globals.AeDESModeSectionFive = {
                    DAMAGE_TYPES: sectionFiveData.get("DAMAGE_TYPES")
                };
            } else CreateDefaultSectionFiveArray();
        } else CreateDefaultSectionFiveArray();
    }
    function OpenSectionFive() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionFiveData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionFiveView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionSixArray() {
        Alloy.Globals.AeDESModeSectionSix = {
            POTENTIAL_CAUSES: "0000000000"
        };
    }
    function LoadSectionSixData() {
        if (Alloy.Globals.AeDESModeSectionSix && _.size(Alloy.Globals.AeDESModeSectionSix) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionSix = AeDESModeUtils.LoadSectionSixQuery(current_form_id);
            if (recoverSectionSix.length > 0) {
                var sectionSixData = recoverSectionSix.at(0);
                Alloy.Globals.AeDESModeSectionSix = {
                    POTENTIAL_CAUSES: sectionSixData.get("POTENTIAL_CAUSES")
                };
            } else CreateDefaultSectionSixArray();
        } else CreateDefaultSectionSixArray();
    }
    function OpenSectionSix() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionSixData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionSixView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionSevenArray() {
        Alloy.Globals.AeDESModeSectionSeven = {
            MORPHOLOGY_SITE: "0",
            SLOPES_LOOMING: "0",
            SUBSOIL: "0"
        };
    }
    function LoadSectionSevenData() {
        if (Alloy.Globals.AeDESModeSectionSeven && _.size(Alloy.Globals.AeDESModeSectionSeven) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionSeven = AeDESModeUtils.LoadSectionSevenQuery(current_form_id);
            if (recoverSectionSeven.length > 0) {
                var sectionSevenData = recoverSectionSeven.at(0);
                Alloy.Globals.AeDESModeSectionSeven = {
                    MORPHOLOGY_SITE: sectionSevenData.get("MORPHOLOGY_SITE"),
                    SLOPES_LOOMING: sectionSevenData.get("SLOPES_LOOMING"),
                    SUBSOIL: sectionSevenData.get("SUBSOIL")
                };
            } else CreateDefaultSectionSevenArray();
        } else CreateDefaultSectionSevenArray();
    }
    function OpenSectionSeven() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionSevenData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionSevenView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionEightArray() {
        Alloy.Globals.AeDESModeSectionEight = {
            STRUCTURAL: "0",
            NOT_STRUCTURAL: "0",
            EXTERNAL: "0",
            GEOTECHNICAL: "0",
            OUTCOME_PRACTICABILITY: "0",
            HOUSING_UNITS_UNINHABITABLE: "",
            FAMILIES_EVACUATED: "",
            EVACUEES_N: "",
            ACCURACY_VISIT: "0",
            OTHER: "",
            MEASURES_OF_EMERGENCY: "00000000000000000000"
        };
    }
    function LoadSectionEightData() {
        if (Alloy.Globals.AeDESModeSectionEight && _.size(Alloy.Globals.AeDESModeSectionEight) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionEight = AeDESModeUtils.LoadSectionEightQuery(current_form_id);
            if (recoverSectionEight.length > 0) {
                var sectionEightData = recoverSectionEight.at(0);
                Alloy.Globals.AeDESModeSectionEight = {
                    STRUCTURAL: sectionEightData.get("STRUCTURAL"),
                    NOT_STRUCTURAL: sectionEightData.get("NOT_STRUCTURAL"),
                    EXTERNAL: sectionEightData.get("EXTERNAL"),
                    GEOTECHNICAL: sectionEightData.get("GEOTECHNICAL"),
                    OUTCOME_PRACTICABILITY: sectionEightData.get("OUTCOME_PRACTICABILITY"),
                    HOUSING_UNITS_UNINHABITABLE: sectionEightData.get("HOUSING_UNITS_UNINHABITABLE"),
                    FAMILIES_EVACUATED: sectionEightData.get("FAMILIES_EVACUATED"),
                    EVACUEES_N: sectionEightData.get("EVACUEES_N"),
                    ACCURACY_VISIT: sectionEightData.get("ACCURACY_VISIT"),
                    OTHER: sectionEightData.get("OTHER"),
                    MEASURES_OF_EMERGENCY: sectionEightData.get("MEASURES_OF_EMERGENCY")
                };
            } else CreateDefaultSectionEightArray();
        } else CreateDefaultSectionEightArray();
    }
    function OpenSectionEight() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionEightData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionEightView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultSectionNineArray() {
        Alloy.Globals.AeDESModeSectionNine = {
            TOPIC: "",
            OTHER_COMMENTS: ""
        };
    }
    function LoadSectionNineData() {
        if (Alloy.Globals.AeDESModeSectionNine && _.size(Alloy.Globals.AeDESModeSectionNine) > 0) ; else if (-1 != current_form_id) {
            var AeDESModeUtils = require("/AeDESModeUtils");
            var recoverSectionNine = AeDESModeUtils.LoadSectionNineQuery(current_form_id);
            if (recoverSectionNine.length > 0) {
                var sectionNineData = recoverSectionNine.at(0);
                Alloy.Globals.AeDESModeSectionNine = {
                    TOPIC: sectionNineData.get("TOPIC"),
                    OTHER_COMMENTS: sectionNineData.get("OTHER_COMMENTS")
                };
            } else CreateDefaultSectionNineArray();
        } else CreateDefaultSectionNineArray();
    }
    function OpenSectionNine() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadSectionNineData();
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionNineView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadTeamPersonalData() {
        var AeDESModeUtils = require("/AeDESModeUtils");
        AeDESModeUtils.LoadTeamPersonalData();
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
                    OpenSectionOne();
                    break;

                  case 2:
                    OpenSectionTwo();
                    break;

                  case 3:
                    OpenSectionThree();
                    break;

                  case 4:
                    OpenSectionFour();
                    break;

                  case 5:
                    OpenSectionFive();
                    break;

                  case 6:
                    OpenSectionSix();
                    break;

                  case 7:
                    OpenSectionSeven();
                    break;

                  case 8:
                    OpenSectionEight();
                    break;

                  case 9:
                    OpenSectionNine();
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
                if (-1 == current_form_id) {
                    Ti.API.info("\n\nDetails:");
                    if (Alloy.Globals.AeDESModeDetails && _.size(Alloy.Globals.AeDESModeDetails) > 0) {
                        if (Alloy.Globals.AeDESModeDetails["FORM_NO"]) ; else {
                            var current_date = new Date();
                            Alloy.Globals.AeDESModeDetails["FORM_NO"] = current_date.getFullYear().toFixed(0);
                        }
                        var detailsModel = Alloy.createModel("AeDESForms", {
                            FORM_NO: Alloy.Globals.AeDESModeDetails["FORM_NO"],
                            DATE: Alloy.Globals.AeDESModeDetails["DATE"],
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        detailsModel.save();
                        detailsModel = null;
                    } else {
                        var current_date = new Date();
                        var current_time = current_date.getTime();
                        var default_form_no = current_date.getFullYear().toFixed(0);
                        var detailsModel = Alloy.createModel("AeDESForms", {
                            FORM_NO: default_form_no,
                            DATE: current_time.toString(),
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        detailsModel.save();
                        detailsModel = null;
                    }
                } else if (Alloy.Globals.AeDESModeDetails && _.size(Alloy.Globals.AeDESModeDetails) > 0) {
                    if (Alloy.Globals.AeDESModeDetails["FORM_NO"]) ; else {
                        var current_date = new Date();
                        Alloy.Globals.AeDESModeDetails["FORM_NO"] = current_date.getFullYear().toFixed(0);
                    }
                    Ti.API.info("\n\nDetails:");
                    var recoverDetails = Alloy.createCollection("AeDESForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM AeDESForms where ID = " + current_form_id
                    });
                    if (recoverDetails.length > 0) {
                        var currentDetails = recoverDetails.at(0);
                        currentDetails.set({
                            FORM_NO: Alloy.Globals.AeDESModeDetails["FORM_NO"],
                            DATE: Alloy.Globals.AeDESModeDetails["DATE"],
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        currentDetails.save();
                        currentDetails = null;
                    }
                } else if (user) {
                    var recoverDetails = Alloy.createCollection("AeDESForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM AeDESForms where ID = " + current_form_id
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
                    var recoverID = Alloy.createCollection("AeDESForms");
                    recoverID.fetch({
                        query: "SELECT max(ID) AS MAX_ID FROM AeDESForms;"
                    });
                    if (recoverID.length > 0) {
                        current_form_id = recoverID.at(0).get("MAX_ID");
                        recoverID = null;
                    }
                    Ti.API.info("\nNEW_ID: " + current_form_id);
                }
                if (Alloy.Globals.AeDESModeSectionOne && _.size(Alloy.Globals.AeDESModeSectionOne) > 0) {
                    Ti.API.info("\nSectionOne:\n");
                    var recoverSectionOne = Alloy.createCollection("AeDESFormsSectionOne");
                    recoverSectionOne.fetch({
                        query: "SELECT * FROM AeDESFormsSectionOne where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionOne.length > 0) {
                        var currentSectionOne = recoverSectionOne.at(0);
                        currentSectionOne.set({
                            LATITUDE: Alloy.Globals.AeDESModeSectionOne["LATITUDE"],
                            LONGITUDE: Alloy.Globals.AeDESModeSectionOne["LONGITUDE"],
                            ALTITUDE: Alloy.Globals.AeDESModeSectionOne["ALTITUDE"],
                            PROVINCE: Alloy.Globals.AeDESModeSectionOne["PROVINCE"],
                            MUNICIPALITY: Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"],
                            PLACE: Alloy.Globals.AeDESModeSectionOne["PLACE"],
                            ADDRESS: Alloy.Globals.AeDESModeSectionOne["ADDRESS"],
                            CIVIC_NO: Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"],
                            BUILDING_POSITION: Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"],
                            B_NAME_OR_OWNER: Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"],
                            CODE_OF_USE: Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"]
                        });
                        currentSectionOne.save();
                        currentSectionOne = null;
                    } else {
                        var sectionOneModel = Alloy.createModel("AeDESFormsSectionOne", {
                            FORM_ID: current_form_id,
                            LATITUDE: Alloy.Globals.AeDESModeSectionOne["LATITUDE"],
                            LONGITUDE: Alloy.Globals.AeDESModeSectionOne["LONGITUDE"],
                            ALTITUDE: Alloy.Globals.AeDESModeSectionOne["ALTITUDE"],
                            PROVINCE: Alloy.Globals.AeDESModeSectionOne["PROVINCE"],
                            MUNICIPALITY: Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"],
                            PLACE: Alloy.Globals.AeDESModeSectionOne["PLACE"],
                            ADDRESS: Alloy.Globals.AeDESModeSectionOne["ADDRESS"],
                            CIVIC_NO: Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"],
                            BUILDING_POSITION: Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"],
                            B_NAME_OR_OWNER: Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"],
                            CODE_OF_USE: Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"]
                        });
                        sectionOneModel.save();
                        sectionOneModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionTwo && _.size(Alloy.Globals.AeDESModeSectionTwo) > 0) {
                    Ti.API.info("\nSectionTwo:\n");
                    var recoverSectionTwo = Alloy.createCollection("AeDESFormsSectionTwo");
                    recoverSectionTwo.fetch({
                        query: "SELECT * FROM AeDESFormsSectionTwo where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionTwo.length > 0) {
                        var currentSectionTwo = recoverSectionTwo.at(0);
                        currentSectionTwo.set({
                            PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"],
                            AVERAGE_HEIGHT_OF_FLOOR: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"],
                            UNDERGROUND_PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"],
                            AVERAGE_SURFACE: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"],
                            CONSTRUCTION_AGE: Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"],
                            RENOVATION_AGE: Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"],
                            UNIT_OF_USE_HOUSING: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"],
                            UNIT_OF_USE_PRODUCTIVE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"],
                            UNIT_OF_USE_COMMERCE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"],
                            UNIT_OF_USE_OFFICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"],
                            UNIT_OF_USE_PUBLIC_SERVICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"],
                            UNIT_OF_USE_DEPOSIT: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"],
                            UNIT_OF_USE_STRATEGIC: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"],
                            UNIT_OF_USE_TOURISM: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"],
                            UTILIZATION: Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"],
                            OCCUPANTS: Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"],
                            PROPERTY: Alloy.Globals.AeDESModeSectionTwo["PROPERTY"]
                        });
                        currentSectionTwo.save();
                        currentSectionTwo = null;
                    } else {
                        var sectionTwoModel = Alloy.createModel("AeDESFormsSectionTwo", {
                            FORM_ID: current_form_id,
                            PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"],
                            AVERAGE_HEIGHT_OF_FLOOR: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"],
                            UNDERGROUND_PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"],
                            AVERAGE_SURFACE: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"],
                            CONSTRUCTION_AGE: Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"],
                            RENOVATION_AGE: Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"],
                            UNIT_OF_USE_HOUSING: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"],
                            UNIT_OF_USE_PRODUCTIVE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"],
                            UNIT_OF_USE_COMMERCE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"],
                            UNIT_OF_USE_OFFICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"],
                            UNIT_OF_USE_PUBLIC_SERVICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"],
                            UNIT_OF_USE_DEPOSIT: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"],
                            UNIT_OF_USE_STRATEGIC: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"],
                            UNIT_OF_USE_TOURISM: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"],
                            UTILIZATION: Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"],
                            OCCUPANTS: Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"],
                            PROPERTY: Alloy.Globals.AeDESModeSectionTwo["PROPERTY"]
                        });
                        sectionTwoModel.save();
                        sectionTwoModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionThree && _.size(Alloy.Globals.AeDESModeSectionThree) > 0) {
                    Ti.API.info("\nSectionThree:\n");
                    var recoverSectionThree = Alloy.createCollection("AeDESFormsSectionThree");
                    recoverSectionThree.fetch({
                        query: "SELECT * FROM AeDESFormsSectionThree where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionThree.length > 0) {
                        var currentSectionThree = recoverSectionThree.at(0);
                        currentSectionThree.set({
                            COVERAGE: Alloy.Globals.AeDESModeSectionThree["COVERAGE"],
                            PLAN_AND_ELEVATION: Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"],
                            INFILL_DISPOSAL: Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"],
                            ISOLATED_COLUMNS: Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"],
                            MIXED: Alloy.Globals.AeDESModeSectionThree["MIXED"],
                            REINFORCED: Alloy.Globals.AeDESModeSectionThree["REINFORCED"],
                            REINFORCED_CONCRETE_FRAMES: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"],
                            REINFORCED_CONCRETE_WALLS: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"],
                            STEEL_FRAMES: Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"],
                            MASONRY_STRUCTURES: Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"]
                        });
                        currentSectionThree.save();
                        currentSectionThree = null;
                    } else {
                        var sectionThreeModel = Alloy.createModel("AeDESFormsSectionThree", {
                            FORM_ID: current_form_id,
                            COVERAGE: Alloy.Globals.AeDESModeSectionThree["COVERAGE"],
                            PLAN_AND_ELEVATION: Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"],
                            INFILL_DISPOSAL: Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"],
                            ISOLATED_COLUMNS: Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"],
                            MIXED: Alloy.Globals.AeDESModeSectionThree["MIXED"],
                            REINFORCED: Alloy.Globals.AeDESModeSectionThree["REINFORCED"],
                            REINFORCED_CONCRETE_FRAMES: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"],
                            REINFORCED_CONCRETE_WALLS: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"],
                            STEEL_FRAMES: Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"],
                            MASONRY_STRUCTURES: Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"]
                        });
                        sectionThreeModel.save();
                        sectionThreeModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionFour && _.size(Alloy.Globals.AeDESModeSectionFour) > 0) {
                    Ti.API.info("\nSectionFour:\n");
                    var recoverSectionFour = Alloy.createCollection("AeDESFormsSectionFour");
                    recoverSectionFour.fetch({
                        query: "SELECT * FROM AeDESFormsSectionFour where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionFour.length > 0) {
                        var currentSectionFour = recoverSectionFour.at(0);
                        currentSectionFour.set({
                            DAMAGES: Alloy.Globals.AeDESModeSectionFour["DAMAGES"],
                            MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"]
                        });
                        currentSectionFour.save();
                        currentSectionFour = null;
                    } else {
                        var sectionFourModel = Alloy.createModel("AeDESFormsSectionFour", {
                            FORM_ID: current_form_id,
                            DAMAGES: Alloy.Globals.AeDESModeSectionFour["DAMAGES"],
                            MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"]
                        });
                        sectionFourModel.save();
                        sectionFourModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionFive && _.size(Alloy.Globals.AeDESModeSectionFive) > 0) {
                    Ti.API.info("\nSectionFive:\n");
                    var recoverSectionFive = Alloy.createCollection("AeDESFormsSectionFive");
                    recoverSectionFive.fetch({
                        query: "SELECT * FROM AeDESFormsSectionFive where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionFive.length > 0) {
                        var currentSectionFive = recoverSectionFive.at(0);
                        currentSectionFive.set({
                            DAMAGE_TYPES: Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"]
                        });
                        currentSectionFive.save();
                        currentSectionFive = null;
                    } else {
                        var sectionFiveModel = Alloy.createModel("AeDESFormsSectionFive", {
                            FORM_ID: current_form_id,
                            DAMAGE_TYPES: Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"]
                        });
                        sectionFiveModel.save();
                        sectionFiveModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionSix && _.size(Alloy.Globals.AeDESModeSectionSix) > 0) {
                    Ti.API.info("\nSectionSix:\n");
                    var recoverSectionSix = Alloy.createCollection("AeDESFormsSectionSix");
                    recoverSectionSix.fetch({
                        query: "SELECT * FROM AeDESFormsSectionSix where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionSix.length > 0) {
                        var currentSectionSix = recoverSectionSix.at(0);
                        currentSectionSix.set({
                            POTENTIAL_CAUSES: Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"]
                        });
                        currentSectionSix.save();
                        currentSectionSix = null;
                    } else {
                        var sectionSixModel = Alloy.createModel("AeDESFormsSectionSix", {
                            FORM_ID: current_form_id,
                            POTENTIAL_CAUSES: Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"]
                        });
                        sectionSixModel.save();
                        sectionSixModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionSeven && _.size(Alloy.Globals.AeDESModeSectionSeven) > 0) {
                    Ti.API.info("\nSectionSeven:\n");
                    var recoverSectionSeven = Alloy.createCollection("AeDESFormsSectionSeven");
                    recoverSectionSeven.fetch({
                        query: "SELECT * FROM AeDESFormsSectionSeven where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionSeven.length > 0) {
                        var currentSectionSeven = recoverSectionSeven.at(0);
                        currentSectionSeven.set({
                            MORPHOLOGY_SITE: Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"],
                            SLOPES_LOOMING: Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"],
                            SUBSOIL: Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"]
                        });
                        currentSectionSeven.save();
                        currentSectionSeven = null;
                    } else {
                        var sectionSevenModel = Alloy.createModel("AeDESFormsSectionSeven", {
                            FORM_ID: current_form_id,
                            MORPHOLOGY_SITE: Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"],
                            SLOPES_LOOMING: Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"],
                            SUBSOIL: Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"]
                        });
                        sectionSevenModel.save();
                        sectionSevenModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionEight && _.size(Alloy.Globals.AeDESModeSectionEight) > 0) {
                    Ti.API.info("\nSectionEight:\n");
                    var recoverSectionEight = Alloy.createCollection("AeDESFormsSectionEight");
                    recoverSectionEight.fetch({
                        query: "SELECT * FROM AeDESFormsSectionEight where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionEight.length > 0) {
                        var currentSectionEight = recoverSectionEight.at(0);
                        currentSectionEight.set({
                            STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"],
                            NOT_STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"],
                            EXTERNAL: Alloy.Globals.AeDESModeSectionEight["EXTERNAL"],
                            GEOTECHNICAL: Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"],
                            OUTCOME_PRACTICABILITY: Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"],
                            HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"],
                            FAMILIES_EVACUATED: Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"],
                            EVACUEES_N: Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"],
                            ACCURACY_VISIT: Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"],
                            OTHER: Alloy.Globals.AeDESModeSectionEight["OTHER"],
                            MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"]
                        });
                        currentSectionEight.save();
                        currentSectionEight = null;
                    } else {
                        var sectionEightModel = Alloy.createModel("AeDESFormsSectionEight", {
                            FORM_ID: current_form_id,
                            STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"],
                            NOT_STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"],
                            EXTERNAL: Alloy.Globals.AeDESModeSectionEight["EXTERNAL"],
                            GEOTECHNICAL: Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"],
                            OUTCOME_PRACTICABILITY: Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"],
                            HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"],
                            FAMILIES_EVACUATED: Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"],
                            EVACUEES_N: Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"],
                            ACCURACY_VISIT: Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"],
                            OTHER: Alloy.Globals.AeDESModeSectionEight["OTHER"],
                            MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"]
                        });
                        sectionEightModel.save();
                        sectionEightModel = null;
                    }
                }
                if (Alloy.Globals.AeDESModeSectionNine && _.size(Alloy.Globals.AeDESModeSectionNine) > 0) {
                    Ti.API.info("\nSectionNine:\n");
                    var recoverSectionNine = Alloy.createCollection("AeDESFormsSectionNine");
                    recoverSectionNine.fetch({
                        query: "SELECT * FROM AeDESFormsSectionNine where FORM_ID = " + current_form_id
                    });
                    if (recoverSectionNine.length > 0) {
                        var currentSectionNine = recoverSectionNine.at(0);
                        currentSectionNine.set({
                            TOPIC: Alloy.Globals.AeDESModeSectionNine["TOPIC"],
                            OTHER_COMMENTS: Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"]
                        });
                        currentSectionNine.save();
                        currentSectionNine = null;
                    } else {
                        var sectionNineModel = Alloy.createModel("AeDESFormsSectionNine", {
                            FORM_ID: current_form_id,
                            TOPIC: Alloy.Globals.AeDESModeSectionNine["TOPIC"],
                            OTHER_COMMENTS: Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"]
                        });
                        sectionNineModel.save();
                        sectionNineModel = null;
                    }
                }
                var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                if (Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0) {
                    Ti.API.info("\nImages:\n\n");
                    for (var i = 0; i < Alloy.Globals.CurrentPicsPath.length; i++) {
                        if (Alloy.Globals.CurrentPicsPath[i].id) {
                            Ti.API.info("\nPicture already present.\n");
                            var recoverImage = Alloy.createCollection("AeDESFormsImages");
                            recoverImage.fetch({
                                query: "SELECT * FROM AeDESFormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
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
                                    var imageModel = Alloy.createModel("AeDESFormsImages", {
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
                            var recoverVideo = Alloy.createCollection("AeDESFormsVideos");
                            recoverVideo.fetch({
                                query: "SELECT * FROM AeDESFormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
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
                                    var videoModel = Alloy.createModel("AeDESFormsVideos", {
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
                    Ti.App.fireEvent("aedes_mode:save");
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
            var AeDESModeUtils = require("/AeDESModeUtils");
            var media_array = AeDESModeUtils.CreateMediaArray(current_form_id, true, true);
            if (media_array && media_array.length > 0) {
                Alloy.Globals.createAndOpenControllerExt("DamageAssessmentsMakerView", {
                    type: "AeDES",
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
                LoadSectionOneData();
                LoadSectionTwoData();
                LoadSectionThreeData();
                LoadSectionFourData();
                LoadSectionFiveData();
                LoadSectionSixData();
                LoadSectionSevenData();
                LoadSectionEightData();
                LoadSectionNineData();
                LoadTeamPersonalData();
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    if (this.responseText && "ERROR_" != this.responseText.substring(0, 6)) {
                        if ("it" == Titanium.Locale.currentLanguage) {
                            var filename = "scheda_aedes.pdf";
                            var zipname = "SchedaAeDES.zip";
                        } else if ("es" == Titanium.Locale.currentLanguage) {
                            var filename = "tarjeta_aedes.pdf";
                            var zipname = "TarjetaAeDES.zip";
                        } else {
                            var filename = "aedes_form.pdf";
                            var zipname = "AeDESForm.zip";
                        }
                        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), filename);
                        file.exists() && file.deleteFile();
                        file.write(this.responseData);
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.createAndOpenControllerExt("SendFormView", {
                            type: "AeDES",
                            form_id: current_form_id,
                            pdf_native_path: file.nativePath,
                            zip_filename: zipname,
                            email_subject_language_msg: "aedes_mode_send_email_dlg_subject"
                        });
                    } else {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        switch (this.responseText) {
                          case "ERROR_CODE_1":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg"));
                            break;

                          case "ERROR_CODE_2":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_upload_sign_1_err_msg"));
                            break;

                          case "ERROR_CODE_3":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_upload_sign_2_err_msg"));
                            break;

                          case "ERROR_CODE_4":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_upload_sign_3_err_msg"));
                        }
                    }
                }, loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                loader.timeout = Alloy.Globals.SendFormTimeoutMillisecs;
                var tpd_name_1 = "";
                var tpd_sign_1_image = "";
                var tpd_name_2 = "";
                var tpd_sign_2_image = "";
                var tpd_name_3 = "";
                var tpd_sign_3_image = "";
                if (Alloy.Collections.AeDESModePD && _.size(Alloy.Collections.AeDESModePD) > 0) for (var i = 0; i < Alloy.Collections.AeDESModePD.length; i++) {
                    var personalData = Alloy.Collections.AeDESModePD.at(i);
                    switch (personalData.get("COMPONENT_NUMBER")) {
                      case 1:
                        tpd_name_1 = personalData.get("NAME");
                        var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                        file && (tpd_sign_1_image = file.read());
                        break;

                      case 2:
                        tpd_name_2 = personalData.get("NAME");
                        var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                        file && (tpd_sign_2_image = file.read());
                        break;

                      case 3:
                        tpd_name_3 = personalData.get("NAME");
                        var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                        file && (tpd_sign_3_image = file.read());
                    }
                }
                var params = {
                    key: "EDAM",
                    TPD_NAME_1: tpd_name_1,
                    TPD_SIGN_1_IMAGE: tpd_sign_1_image,
                    TPD_NAME_2: tpd_name_2,
                    TPD_SIGN_2_IMAGE: tpd_sign_2_image,
                    TPD_NAME_3: tpd_name_3,
                    TPD_SIGN_3_IMAGE: tpd_sign_3_image,
                    FORM_NO: Alloy.Globals.AeDESModeDetails["FORM_NO"],
                    DATE: Alloy.Globals.AeDESModeDetails["DATE"],
                    LATITUDE: Alloy.Globals.AeDESModeSectionOne["LATITUDE"],
                    LONGITUDE: Alloy.Globals.AeDESModeSectionOne["LONGITUDE"],
                    ALTITUDE: Alloy.Globals.AeDESModeSectionOne["ALTITUDE"],
                    PROVINCE: Alloy.Globals.AeDESModeSectionOne["PROVINCE"],
                    MUNICIPALITY: Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"],
                    PLACE: Alloy.Globals.AeDESModeSectionOne["PLACE"],
                    ADDRESS: Alloy.Globals.AeDESModeSectionOne["ADDRESS"],
                    CIVIC_NO: Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"],
                    BUILDING_POSITION: Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"],
                    B_NAME_OR_OWNER: Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"],
                    CODE_OF_USE: Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"],
                    PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"],
                    AVERAGE_HEIGHT_OF_FLOOR: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"],
                    UNDERGROUND_PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"],
                    AVERAGE_SURFACE: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"],
                    CONSTRUCTION_AGE: Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"],
                    RENOVATION_AGE: Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"],
                    UNIT_OF_USE_HOUSING: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"],
                    UNIT_OF_USE_PRODUCTIVE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"],
                    UNIT_OF_USE_COMMERCE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"],
                    UNIT_OF_USE_OFFICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"],
                    UNIT_OF_USE_PUBLIC_SERVICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"],
                    UNIT_OF_USE_DEPOSIT: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"],
                    UNIT_OF_USE_STRATEGIC: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"],
                    UNIT_OF_USE_TOURISM: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"],
                    UTILIZATION: Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"],
                    OCCUPANTS: Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"],
                    PROPERTY: Alloy.Globals.AeDESModeSectionTwo["PROPERTY"],
                    COVERAGE: Alloy.Globals.AeDESModeSectionThree["COVERAGE"],
                    PLAN_AND_ELEVATION: Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"],
                    INFILL_DISPOSAL: Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"],
                    ISOLATED_COLUMNS: Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"],
                    MIXED: Alloy.Globals.AeDESModeSectionThree["MIXED"],
                    REINFORCED: Alloy.Globals.AeDESModeSectionThree["REINFORCED"],
                    REINFORCED_CONCRETE_FRAMES: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"],
                    REINFORCED_CONCRETE_WALLS: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"],
                    STEEL_FRAMES: Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"],
                    MASONRY_STRUCTURES: Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"],
                    DAMAGES: Alloy.Globals.AeDESModeSectionFour["DAMAGES"],
                    FOUR_MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"],
                    DAMAGE_TYPES: Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"],
                    POTENTIAL_CAUSES: Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"],
                    MORPHOLOGY_SITE: Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"],
                    SLOPES_LOOMING: Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"],
                    SUBSOIL: Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"],
                    STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"],
                    NOT_STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"],
                    EXTERNAL: Alloy.Globals.AeDESModeSectionEight["EXTERNAL"],
                    GEOTECHNICAL: Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"],
                    OUTCOME_PRACTICABILITY: Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"],
                    HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"],
                    FAMILIES_EVACUATED: Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"],
                    EVACUEES_N: Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"],
                    ACCURACY_VISIT: Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"],
                    OTHER: Alloy.Globals.AeDESModeSectionEight["OTHER"],
                    EIGHT_MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"],
                    TOPIC: Alloy.Globals.AeDESModeSectionNine["TOPIC"],
                    OTHER_COMMENTS: Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"]
                };
                loader.open("POST", "https://www.edam.resiltronics.org/ManipulatePDF/AeDESMode_ManipulatePDF.php");
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
                var AeDESModeUtils = require("/AeDESModeUtils");
                var media_array = AeDESModeUtils.CreateMediaArray(current_form_id, true);
                Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: media_array,
                    type: "AeDES",
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
                        Alloy.Globals.MakeVideo($.aedesModeFormsGeneralSectionWindow.getActivity(), "", 0, 0, "");
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
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
                RaiseEndAsyncBusyAction_CallBack();
                alert(L("generic_no_network_for_georeverse_address_msg"));
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
                RaiseEndAsyncBusyAction_CallBack();
                alert(L("generic_no_network_for_georeverse_address_msg"));
                Alloy.Globals.MakeVideo($.aedesModeFormsGeneralSectionWindow.getActivity(), sCurrentHeading, e.coords.latitude, e.coords.longitude, "");
            } else Alloy.Globals.reverseGeocodeAndUseCamera(sCurrentHeading, e.coords.latitude, e.coords.longitude, $.aedesModeFormsGeneralSectionWindow.getActivity(), RaiseEndAsyncBusyAction_CallBack);
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
                    type: "AeDES"
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
    this.__controllerPath = "AeDESModeFormsGeneralSection";
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
    $.__views.aedesModeFormsGeneralSectionWindow = Ti.UI.createWindow({
        title: L("aedes_mode_forms_general_section_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeFormsGeneralSectionWindow"
    });
    $.__views.aedesModeFormsGeneralSectionWindow && $.addTopLevelView($.__views.aedesModeFormsGeneralSectionWindow);
    OnAndroidBackButton_Click ? $.__views.aedesModeFormsGeneralSectionWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.aedesModeFormsGeneralSectionWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.aedesModeFormsGeneralSectionWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.aedesModeFormsGeneralSectionWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.aedesModeFormsGeneralSectionWindow.add($.__views.activity_indicator);
    $.__views.slideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "slideMenu",
        __parentSymbol: $.__views.aedesModeFormsGeneralSectionWindow
    });
    $.__views.slideMenu.setParent($.__views.aedesModeFormsGeneralSectionWindow);
    $.__views.appWrapper = Ti.UI.createView({
        id: "appWrapper"
    });
    $.__views.aedesModeFormsGeneralSectionWindow.add($.__views.appWrapper);
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
    $.__views.imageViewAeDESLogo = Ti.UI.createImageView({
        top: 335,
        width: "100%",
        image: "/images/AeDES_logo.png",
        id: "imageViewAeDESLogo"
    });
    $.__views.scrollViewGeneralSection.add($.__views.imageViewAeDESLogo);
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
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.widgetAppButtonBuildingDamageAssessments.init("/images/building_damage_assessments_normal.png", "/images/building_damage_assessments_pressed.png", "/images/building_damage_assessments_disabled.png", L("btn_building_damage_assessments_text"), OnBtnBuildingDamageAssessments_Click);
        $.viewAppButtonBuildingDamageAssessments.visible = view_enabled;
        $.widgetAppButtonSend.init("/images/send_normal.png", "/images/send_pressed.png", "/images/send_disabled.png", L("generic_send_btn_title"), OnBtnSend_Click);
        $.widgetAppButtonMakeDraft.init("/images/draft_normal.png", "/images/draft_pressed.png", "/images/draft_disabled.png", L("btn_make_draft_text"), OnBtnMakeDraft_Click);
        $.viewAppButtonMakeDraft.visible = view_enabled;
        $.widgetAppButtonViewMedia.init("/images/gallery_normal.png", "/images/gallery_pressed.png", "/images/gallery_disabled.png", L("btn_view_media_text"), OnBtnViewMedia_Click);
        Alloy.Globals.AeDESModeDetails = new Array();
        Alloy.Globals.AeDESModeSectionOne = new Array();
        Alloy.Globals.AeDESModeSectionTwo = new Array();
        Alloy.Globals.AeDESModeSectionThree = new Array();
        Alloy.Globals.AeDESModeSectionFour = new Array();
        Alloy.Globals.AeDESModeSectionFive = new Array();
        Alloy.Globals.AeDESModeSectionSix = new Array();
        Alloy.Globals.AeDESModeSectionSeven = new Array();
        Alloy.Globals.AeDESModeSectionEight = new Array();
        Alloy.Globals.AeDESModeSectionNine = new Array();
        Alloy.Globals.CurrentPicsPath = null;
        Alloy.Globals.CurrentVideosPath = null;
        var nodes = [ {
            menuHeader: L("aedes_mode_sections_slide_menu_title"),
            id: 0,
            title: L("aedes_mode_section_details_title"),
            image: "/images/slide_menu_details.png"
        }, {
            id: 1,
            title: L("aedes_mode_section_section_one_title"),
            image: "/images/slide_menu_position.png"
        }, {
            id: 2,
            title: L("aedes_mode_section_section_two_title"),
            image: "/images/slide_menu_characteristics.png"
        }, {
            id: 3,
            title: L("aedes_mode_section_section_three_title"),
            image: "/images/slide_menu_type.png"
        }, {
            id: 4,
            title: L("aedes_mode_section_section_four_title"),
            image: "/images/slide_menu_infrastructure.png"
        }, {
            id: 5,
            title: L("aedes_mode_section_section_five_title"),
            image: "/images/slide_menu_not_structural.png"
        }, {
            id: 6,
            title: L("aedes_mode_section_section_six_title"),
            image: "/images/slide_menu_external_danger.png"
        }, {
            id: 7,
            title: L("aedes_mode_section_section_seven_title"),
            image: "/images/slide_menu_soil_and_foundations.png"
        }, {
            id: 8,
            title: L("aedes_mode_section_section_eight_title"),
            image: "/images/slide_menu_practicability.png"
        }, {
            id: 9,
            title: L("aedes_mode_section_section_nine_title"),
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
        $.aedesModeFormsGeneralSectionWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.aedesModeFormsGeneralSectionWindow!android:back!OnAndroidBackButton_Click"] && $.__views.aedesModeFormsGeneralSectionWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.aedesModeFormsGeneralSectionWindow!androidback!OnAndroidBackButton_Click"] && $.__views.aedesModeFormsGeneralSectionWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btn_slider_menu!click!OnBtnSliderMenu_Click"] && $.__views.btn_slider_menu.addEventListener("click", OnBtnSliderMenu_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;