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
        Back();
    }
    function Back() {
        try {
            Save("generic_lose_changes_title", "lose_changes_confirm_msg", function() {
                Alloy.Globals.UsersResidentsModeDetails = new Array();
                Alloy.Globals.UsersResidentsModeBuildingPosition = new Array();
                Alloy.Globals.UsersResidentsModeBuildingCharacteristics = new Array();
                Alloy.Globals.UsersResidentsModeInfrastructure = new Array();
                Alloy.Globals.CurrentPicsPath = null;
                Alloy.Globals.CurrentVideosPath = null;
                controls = null;
                Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "users_residents_mode:save");
                Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
                $.navigationWindowUsersResidentsModeFormsGeneralSection.close();
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultDetailsArray() {
        var current_date = new Date();
        var current_time = current_date.getTime();
        var default_form_no = current_date.getFullYear().toFixed(0);
        Alloy.Globals.UsersResidentsModeDetails = {
            FORM_NO: default_form_no,
            DATE: current_time.toString()
        };
    }
    function LoadDetailsData() {
        if (Alloy.Globals.UsersResidentsModeDetails && _.size(Alloy.Globals.UsersResidentsModeDetails) > 0) ; else if (-1 != current_form_id) {
            var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
            var recoverDetails = UsersResidentsModeUtils.LoadDetailsQuery(current_form_id);
            if (recoverDetails.length > 0) {
                var detailsData = recoverDetails.at(0);
                Alloy.Globals.UsersResidentsModeDetails = {
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
            Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeFormsDetailsView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultBuildingPositionArray() {
        Alloy.Globals.UsersResidentsModeBuildingPosition = {
            LATITUDE: "",
            LONGITUDE: "",
            ALTITUDE: "",
            PROVINCE: "",
            MUNICIPALITY: "",
            PLACE: "",
            ADDRESS: "",
            CIVIC_NO: "",
            COMPILER_POS: "0"
        };
    }
    function LoadBuildingPositionData() {
        if (Alloy.Globals.UsersResidentsModeBuildingPosition && _.size(Alloy.Globals.UsersResidentsModeBuildingPosition) > 0) ; else if (-1 != current_form_id) {
            var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
            var recoverBuildingsPositions = UsersResidentsModeUtils.LoadBuildingPositionQuery(current_form_id);
            if (recoverBuildingsPositions.length > 0) {
                var buildingPositionData = recoverBuildingsPositions.at(0);
                Alloy.Globals.UsersResidentsModeBuildingPosition = {
                    LATITUDE: buildingPositionData.get("LATITUDE"),
                    LONGITUDE: buildingPositionData.get("LONGITUDE"),
                    ALTITUDE: buildingPositionData.get("ALTITUDE"),
                    PROVINCE: buildingPositionData.get("PROVINCE"),
                    MUNICIPALITY: buildingPositionData.get("MUNICIPALITY"),
                    PLACE: buildingPositionData.get("PLACE"),
                    ADDRESS: buildingPositionData.get("ADDRESS"),
                    CIVIC_NO: buildingPositionData.get("CIVIC_NO"),
                    COMPILER_POS: buildingPositionData.get("COMPILER_POS")
                };
            } else CreateDefaultBuildingPositionArray();
        } else CreateDefaultBuildingPositionArray();
    }
    function OpenBuildingPosition() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadBuildingPositionData();
            Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeFormsBuildingPositionView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultBuildingCharacteristicsArray() {
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics = {
            SITE: "0",
            UNDERGROUND_PLANS_NO: "0",
            NOT_UNDERGROUND_PLANS_NO: "1",
            USAGE: "0"
        };
    }
    function LoadBuildingCharacteristicsData() {
        if (Alloy.Globals.UsersResidentsModeBuildingCharacteristics && _.size(Alloy.Globals.UsersResidentsModeBuildingCharacteristics) > 0) ; else if (-1 != current_form_id) {
            var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
            var recoverBuildingCharacteristics = UsersResidentsModeUtils.LoadBuildingCharacteristicsQuery(current_form_id);
            if (recoverBuildingCharacteristics.length > 0) {
                var buildingCharacteristicsData = recoverBuildingCharacteristics.at(0);
                Alloy.Globals.UsersResidentsModeBuildingCharacteristics = {
                    SITE: buildingCharacteristicsData.get("SITE"),
                    UNDERGROUND_PLANS_NO: buildingCharacteristicsData.get("UNDERGROUND_PLANS_NO"),
                    NOT_UNDERGROUND_PLANS_NO: buildingCharacteristicsData.get("NOT_UNDERGROUND_PLANS_NO"),
                    USAGE: buildingCharacteristicsData.get("USAGE")
                };
            } else CreateDefaultBuildingCharacteristicsArray();
        } else CreateDefaultBuildingCharacteristicsArray();
    }
    function OpenBuildingCharacteristics() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadBuildingCharacteristicsData();
            Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeFormsBuildingCharacteristicsView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateDefaultInfrastructureArray() {
        Alloy.Globals.UsersResidentsModeInfrastructure = {
            GROUND_BREAKS: "1",
            WATER_LEAKS: "1",
            GAS_LEAKS: "1",
            ELECTRIC_CURRENT_OPERATION: "0"
        };
    }
    function LoadInfrastructureData() {
        if (Alloy.Globals.UsersResidentsModeInfrastructure && _.size(Alloy.Globals.UsersResidentsModeInfrastructure) > 0) ; else if (-1 != current_form_id) {
            var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
            var recoverInfrastructure = UsersResidentsModeUtils.LoadInfrastructureQuery(current_form_id);
            if (recoverInfrastructure.length > 0) {
                var infrastructureData = recoverInfrastructure.at(0);
                Alloy.Globals.UsersResidentsModeInfrastructure = {
                    GROUND_BREAKS: infrastructureData.get("GROUND_BREAKS"),
                    WATER_LEAKS: infrastructureData.get("WATER_LEAKS"),
                    GAS_LEAKS: infrastructureData.get("GAS_LEAKS"),
                    ELECTRIC_CURRENT_OPERATION: infrastructureData.get("ELECTRIC_CURRENT_OPERATION")
                };
            } else CreateDefaultInfrastructureArray();
        } else CreateDefaultInfrastructureArray();
    }
    function OpenInfrastructure() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "form:save_from_section", OnBtnSave_Click);
            LoadInfrastructureData();
            Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeFormsInfrastructureView", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadTeamPersonalData() {
        var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
        UsersResidentsModeUtils.LoadTeamPersonalData();
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
                    OpenBuildingPosition();
                    break;

                  case 2:
                    OpenBuildingCharacteristics();
                    break;

                  case 3:
                    OpenInfrastructure();
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
                if (-1 == current_form_id) if (Alloy.Globals.UsersResidentsModeDetails && _.size(Alloy.Globals.UsersResidentsModeDetails) > 0) {
                    if (Alloy.Globals.UsersResidentsModeDetails["FORM_NO"]) ; else {
                        var current_date = new Date();
                        Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] = current_date.getFullYear().toFixed(0);
                    }
                    var detailsModel = Alloy.createModel("UsersResidentsForms", {
                        FORM_NO: Alloy.Globals.UsersResidentsModeDetails["FORM_NO"],
                        DATE: Alloy.Globals.UsersResidentsModeDetails["DATE"],
                        USER: user,
                        SYNCHRONIZED: "0"
                    });
                    detailsModel.save();
                    detailsModel = null;
                } else {
                    var current_date = new Date();
                    var current_time = current_date.getTime();
                    var default_form_no = current_date.getFullYear().toFixed(0);
                    var detailsModel = Alloy.createModel("UsersResidentsForms", {
                        FORM_NO: default_form_no,
                        DATE: current_time.toString(),
                        USER: user,
                        SYNCHRONIZED: "0"
                    });
                    detailsModel.save();
                    detailsModel = null;
                } else if (Alloy.Globals.UsersResidentsModeDetails && _.size(Alloy.Globals.UsersResidentsModeDetails) > 0) {
                    if (Alloy.Globals.UsersResidentsModeDetails["FORM_NO"]) ; else {
                        var current_date = new Date();
                        Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] = current_date.getFullYear().toFixed(0);
                    }
                    var recoverDetails = Alloy.createCollection("UsersResidentsForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM UsersResidentsForms where ID = " + current_form_id
                    });
                    if (recoverDetails.length > 0) {
                        var currentDetails = recoverDetails.at(0);
                        currentDetails.set({
                            FORM_NO: Alloy.Globals.UsersResidentsModeDetails["FORM_NO"],
                            DATE: Alloy.Globals.UsersResidentsModeDetails["DATE"],
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        currentDetails.save();
                        currentDetails = null;
                    }
                } else if (user) {
                    var recoverDetails = Alloy.createCollection("UsersResidentsForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM UsersResidentsForms where ID = " + current_form_id
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
                    var recoverID = Alloy.createCollection("UsersResidentsForms");
                    recoverID.fetch({
                        query: "SELECT max(ID) AS MAX_ID FROM UsersResidentsForms;"
                    });
                    if (recoverID.length > 0) {
                        current_form_id = recoverID.at(0).get("MAX_ID");
                        recoverID = null;
                    }
                    Ti.API.info("\nNEW_ID: " + current_form_id);
                }
                if (Alloy.Globals.UsersResidentsModeBuildingPosition && _.size(Alloy.Globals.UsersResidentsModeBuildingPosition) > 0) {
                    Ti.API.info("\nBuildingPosition:\n");
                    var recoverBuildingPosition = Alloy.createCollection("UsersResidentsFormsBuildingsPositions");
                    recoverBuildingPosition.fetch({
                        query: "SELECT * FROM UsersResidentsFormsBuildingsPositions where FORM_ID = " + current_form_id
                    });
                    if (recoverBuildingPosition.length > 0) {
                        var currentBuildingPosition = recoverBuildingPosition.at(0);
                        currentBuildingPosition.set({
                            LATITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"],
                            LONGITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"],
                            ALTITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"],
                            PROVINCE: Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"],
                            MUNICIPALITY: Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"],
                            PLACE: Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"],
                            ADDRESS: Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"],
                            CIVIC_NO: Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"],
                            COMPILER_POS: Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"]
                        });
                        currentBuildingPosition.save();
                        currentBuildingPosition = null;
                    } else {
                        var buildingPositionModel = Alloy.createModel("UsersResidentsFormsBuildingsPositions", {
                            FORM_ID: current_form_id,
                            LATITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"],
                            LONGITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"],
                            ALTITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"],
                            PROVINCE: Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"],
                            MUNICIPALITY: Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"],
                            PLACE: Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"],
                            ADDRESS: Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"],
                            CIVIC_NO: Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"],
                            COMPILER_POS: Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"]
                        });
                        buildingPositionModel.save();
                        buildingPositionModel = null;
                    }
                }
                if (Alloy.Globals.UsersResidentsModeBuildingCharacteristics && _.size(Alloy.Globals.UsersResidentsModeBuildingCharacteristics) > 0) {
                    Ti.API.info("\nBuildingCharacteristics:\n");
                    var recoverBuildingCharacteristics = Alloy.createCollection("UsersResidentsFormsBuildingsCharacteristics");
                    recoverBuildingCharacteristics.fetch({
                        query: "SELECT * FROM UsersResidentsFormsBuildingsCharacteristics where FORM_ID = " + current_form_id
                    });
                    if (recoverBuildingCharacteristics.length > 0) {
                        var currentBuildingCharacteristics = recoverBuildingCharacteristics.at(0);
                        currentBuildingCharacteristics.set({
                            SITE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"],
                            UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"],
                            NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"],
                            USAGE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"]
                        });
                        currentBuildingCharacteristics.save();
                        currentBuildingCharacteristics = null;
                    } else {
                        var buildingCharacteristicsModel = Alloy.createModel("UsersResidentsFormsBuildingsCharacteristics", {
                            FORM_ID: current_form_id,
                            SITE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"],
                            UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"],
                            NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"],
                            USAGE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"]
                        });
                        buildingCharacteristicsModel.save();
                        buildingCharacteristicsModel = null;
                    }
                }
                if (Alloy.Globals.UsersResidentsModeInfrastructure && _.size(Alloy.Globals.UsersResidentsModeInfrastructure) > 0) {
                    Ti.API.info("\nInfrastructure:\n");
                    var recoverInfrastructure = Alloy.createCollection("UsersResidentsFormsInfrastructure");
                    recoverInfrastructure.fetch({
                        query: "SELECT * FROM UsersResidentsFormsInfrastructure where FORM_ID = " + current_form_id
                    });
                    if (recoverInfrastructure.length > 0) {
                        var currentInfrastructure = recoverInfrastructure.at(0);
                        currentInfrastructure.set({
                            GROUND_BREAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"],
                            WATER_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"],
                            GAS_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"],
                            ELECTRIC_CURRENT_OPERATION: Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"]
                        });
                        currentInfrastructure.save();
                        currentInfrastructure = null;
                    } else {
                        var infrastructureModel = Alloy.createModel("UsersResidentsFormsInfrastructure", {
                            FORM_ID: current_form_id,
                            GROUND_BREAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"],
                            WATER_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"],
                            GAS_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"],
                            ELECTRIC_CURRENT_OPERATION: Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"]
                        });
                        infrastructureModel.save();
                        infrastructureModel = null;
                    }
                }
                var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                if (Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0) {
                    Ti.API.info("\nImages:\n\n");
                    for (var i = 0; i < Alloy.Globals.CurrentPicsPath.length; i++) {
                        if (Alloy.Globals.CurrentPicsPath[i].id) {
                            Ti.API.info("\nPicture already present.\n");
                            var recoverImage = Alloy.createCollection("UsersResidentsFormsImages");
                            recoverImage.fetch({
                                query: "SELECT * FROM UsersResidentsFormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
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
                                    var imageModel = Alloy.createModel("UsersResidentsFormsImages", {
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
                            var recoverVideo = Alloy.createCollection("UsersResidentsFormsVideos");
                            recoverVideo.fetch({
                                query: "SELECT * FROM UsersResidentsFormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
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
                                    var videoModel = Alloy.createModel("UsersResidentsFormsVideos", {
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
                    Ti.App.fireEvent("users_residents_mode:save");
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
            var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
            var media_array = UsersResidentsModeUtils.CreateMediaArray(current_form_id, true, true);
            if (media_array && media_array.length > 0) {
                Alloy.Globals.createAndOpenControllerExt("DamageAssessmentsMakerView", {
                    type: "UsersResidents",
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
                LoadBuildingPositionData();
                LoadBuildingCharacteristicsData();
                LoadInfrastructureData();
                LoadTeamPersonalData();
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    if (this.responseText && "ERROR_" != this.responseText.substring(0, 6)) {
                        if ("it" == Titanium.Locale.currentLanguage) {
                            var filename = "scheda_utenti_residenti.pdf";
                            var zipname = "SchedaUtentiResidenti.zip";
                        } else if ("es" == Titanium.Locale.currentLanguage) {
                            var filename = "tarjeta_usuarios_residentes.pdf";
                            var zipname = "TarjetaUsuariosResidentes.zip";
                        } else {
                            var filename = "users_residents_form.pdf";
                            var zipname = "UsersResidentsForm.zip";
                        }
                        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), filename);
                        file.exists() && file.deleteFile();
                        file.write(this.responseData);
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.createAndOpenControllerExt("SendFormView", {
                            type: "UsersResidents",
                            form_id: current_form_id,
                            pdf_native_path: file.nativePath,
                            zip_filename: zipname,
                            email_subject_language_msg: "users_residents_mode_send_email_dlg_subject"
                        });
                    } else {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        switch (this.responseText) {
                          case "ERROR_CODE_1":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg"));
                            break;

                          case "ERROR_CODE_2":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_upload_sign_err_msg"));
                            break;

                          case "ERROR_CODE_3":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_no_language_err_msg"));
                        }
                    }
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                loader.timeout = Alloy.Globals.SendFormTimeoutMillisecs;
                var tpd_name = "";
                var tpd_cell_number = "";
                var tpd_age = "";
                var tpd_job = "";
                var tpd_sign_image = "";
                if (Alloy.Collections.UsersResidentsModePD && _.size(Alloy.Collections.UsersResidentsModePD) > 0) {
                    var personalData = Alloy.Collections.UsersResidentsModePD.at(0);
                    tpd_name = personalData.get("NAME");
                    tpd_cell_number = personalData.get("CELL_NUMBER");
                    tpd_age = personalData.get("AGE");
                    tpd_job = personalData.get("JOB");
                    var file = Alloy.Globals.getFileForRead(personalData.get("SIGN_PATH"));
                    file && (tpd_sign_image = file.read());
                }
                var params = {
                    key: "EDAM",
                    language: Titanium.Locale.currentLanguage,
                    TPD_NAME: tpd_name,
                    TPD_CELL_NUMBER: tpd_cell_number,
                    TPD_AGE: tpd_age,
                    TPD_JOB: tpd_job,
                    TPD_SIGN_IMAGE: tpd_sign_image,
                    FORM_NO: Alloy.Globals.UsersResidentsModeDetails["FORM_NO"],
                    DATE: Alloy.Globals.UsersResidentsModeDetails["DATE"],
                    PROVINCE: Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"],
                    MUNICIPALITY: Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"],
                    LATITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"],
                    LONGITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"],
                    ALTITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"],
                    PLACE: Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"],
                    ADDRESS: Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"],
                    CIVIC_NO: Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"],
                    COMPILER_POS: Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"],
                    SITE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"],
                    UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"],
                    NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"],
                    USAGE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"],
                    GROUND_BREAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"],
                    WATER_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"],
                    GAS_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"],
                    ELECTRIC_CURRENT_OPERATION: Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"]
                };
                loader.open("POST", "https://www.edam.resiltronics.org/ManipulatePDF/UsersResidentsMode_ManipulatePDF.php");
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
                var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
                var media_array = UsersResidentsModeUtils.CreateMediaArray(current_form_id, true);
                Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: media_array,
                    type: "UsersResidents",
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
    function OnBtnMakeMedia_Click() {
        var message = null;
        message = L("media_need_gps_confirm_msg");
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
    function RaiseEndAsyncBusyAction_CallBack() {
        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
    }
    function OnBtnMakeDraft_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                Alloy.Globals.createAndOpenControllerExt("DraftPaintView", {
                    type: "UsersResidents"
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
    this.__controllerPath = "UsersResidentsModeFormsGeneralSection";
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
    $.__views.usersResidentsModeFormsGeneralSectionWindow = Ti.UI.createWindow({
        title: L("users_residents_mode_forms_general_section_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsModeFormsGeneralSectionWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.usersResidentsModeFormsGeneralSectionWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        color: "#000",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 11,
            fontWeight: "bold"
        },
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        zIndex: 1,
        id: "activity_indicator"
    });
    $.__views.usersResidentsModeFormsGeneralSectionWindow.add($.__views.activity_indicator);
    $.__views.slideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "slideMenu",
        __parentSymbol: $.__views.usersResidentsModeFormsGeneralSectionWindow
    });
    $.__views.slideMenu.setParent($.__views.usersResidentsModeFormsGeneralSectionWindow);
    $.__views.appWrapper = Ti.UI.createView({
        id: "appWrapper"
    });
    $.__views.usersResidentsModeFormsGeneralSectionWindow.add($.__views.appWrapper);
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
        height: 178,
        id: "images_btn_view"
    });
    $.__views.scrollViewGeneralSection.add($.__views.images_btn_view);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        left: 0,
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
        left: 142,
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
    $.__views.viewAppButtonMakeMedia = Ti.UI.createView({
        top: 90,
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
        top: 90,
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
        top: 90,
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
    $.__views.imageViewUsersResidentsLogo = Ti.UI.createImageView({
        top: 245,
        width: "100%",
        image: "/images/UsersResidents_logo.png",
        id: "imageViewUsersResidentsLogo"
    });
    $.__views.scrollViewGeneralSection.add($.__views.imageViewUsersResidentsLogo);
    $.__views.navigationWindowUsersResidentsModeFormsGeneralSection = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.usersResidentsModeFormsGeneralSectionWindow,
        id: "navigationWindowUsersResidentsModeFormsGeneralSection"
    });
    $.__views.navigationWindowUsersResidentsModeFormsGeneralSection && $.addTopLevelView($.__views.navigationWindowUsersResidentsModeFormsGeneralSection);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_form_id = args.form_id;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btn_ios_back);
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
        Alloy.Globals.UsersResidentsModeDetails = new Array();
        Alloy.Globals.UsersResidentsModeBuildingPosition = new Array();
        Alloy.Globals.UsersResidentsModeBuildingCharacteristics = new Array();
        Alloy.Globals.UsersResidentsModeInfrastructure = new Array();
        Alloy.Globals.CurrentPicsPath = null;
        Alloy.Globals.CurrentVideosPath = null;
        var nodes = [ {
            menuHeader: L("users_residents_mode_sections_slide_menu_title"),
            id: 0,
            title: L("users_residents_mode_section_details_title"),
            image: "/images/slide_menu_details.png"
        }, {
            id: 1,
            title: L("users_residents_mode_section_buildings_positions_title"),
            image: "/images/slide_menu_position.png"
        }, {
            id: 2,
            title: L("users_residents_mode_section_buildings_characteristics_title"),
            image: "/images/slide_menu_characteristics.png"
        }, {
            id: 3,
            title: L("users_residents_mode_section_infrastructure_title"),
            image: "/images/slide_menu_infrastructure.png"
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
        $.widgetAppButtonMakeMedia.init("/images/make_media_normal.png", "/images/make_media_pressed.png", "/images/make_media_disabled.png", L("btn_make_media_text"), OnBtnMakeMedia_Click);
        $.viewAppButtonMakeMedia.visible = view_enabled;
        $.navigationWindowUsersResidentsModeFormsGeneralSection.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btn_slider_menu!click!OnBtnSliderMenu_Click"] && $.__views.btn_slider_menu.addEventListener("click", OnBtnSliderMenu_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;