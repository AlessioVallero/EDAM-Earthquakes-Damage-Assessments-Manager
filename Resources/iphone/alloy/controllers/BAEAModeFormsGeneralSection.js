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
                Alloy.Globals.BAEAModeDetails = new Array();
                Alloy.Globals.BAEAModeFaultRupture = new Array();
                Alloy.Globals.BAEAModeLiquefaction = new Array();
                Alloy.Globals.BAEAModeLandslide = new Array();
                Alloy.Globals.BAEAModeTsunami = new Array();
                Alloy.Globals.BAEAModeLifelines = new Array();
                Alloy.Globals.BAEAModeBuildings = new Array();
                Alloy.Globals.BAEAModeGeneral = new Array();
                controls = null;
                Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode:save");
                Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode:view_features_with_login");
                $.navigationWindowBAEAModeFormsGeneralSection.close();
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadFaultRuptureData() {
        if (Alloy.Globals.BAEAModeFaultRupture && _.size(Alloy.Globals.BAEAModeFaultRupture) > 0) ; else if (-1 != current_form_id) {
            Alloy.Globals.BAEAModeFaultRupture = new Array();
            var BAEAModeUtils = require("/BAEAModeUtils");
            var recoverFaultRupture = BAEAModeUtils.LoadFaultRuptureQuery(current_form_id);
            if (recoverFaultRupture.length > 0) for (var i = 0; i < recoverFaultRupture.length; i++) {
                var currentElem = recoverFaultRupture.at(i);
                var newFaultRupture = {
                    ID: currentElem.get("ID"),
                    SITE: currentElem.get("SITE"),
                    LATITUDE: currentElem.get("LATITUDE"),
                    LONGITUDE: currentElem.get("LONGITUDE"),
                    ADDRESS: currentElem.get("ADDRESS"),
                    SURFACE_RUPTURE: currentElem.get("SURFACE_RUPTURE"),
                    OFFSET_FEATURE_TYPE: currentElem.get("OFFSET_FEATURE_TYPE"),
                    SLIP_AZIMUT: currentElem.get("SLIP_AZIMUT"),
                    PLUNGE: currentElem.get("PLUNGE"),
                    SLIP_LENGTH: currentElem.get("SLIP_LENGTH"),
                    NOTES: currentElem.get("NOTES")
                };
                var BAEAModeUtils = require("/BAEAModeUtils");
                newFaultRupture.PHOTOS = BAEAModeUtils.CreateMediaArray(current_form_id, "FR", currentElem.get("ID"));
                Alloy.Globals.BAEAModeFaultRupture.push(newFaultRupture);
            }
        } else Alloy.Globals.BAEAModeFaultRupture = new Array();
    }
    function OpenFaultRupture() {
        try {
            LoadFaultRuptureData();
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsManageSectionView", {
                form_id: current_form_id,
                type: "FR",
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadLiquefactionData() {
        if (Alloy.Globals.BAEAModeLiquefaction && _.size(Alloy.Globals.BAEAModeLiquefaction) > 0) ; else if (-1 != current_form_id) {
            var BAEAModeUtils = require("/BAEAModeUtils");
            var recoverLiquefaction = BAEAModeUtils.LoadLiquefactionQuery(current_form_id);
            if (recoverLiquefaction.length > 0) for (var i = 0; i < recoverLiquefaction.length; i++) {
                var currentElem = recoverLiquefaction.at(i);
                var newLiquefaction = {
                    ID: currentElem.get("ID"),
                    SITE: currentElem.get("SITE"),
                    LATITUDE: currentElem.get("LATITUDE"),
                    LONGITUDE: currentElem.get("LONGITUDE"),
                    ADDRESS: currentElem.get("ADDRESS"),
                    SAND_BLOWS_OR_FISSURES: currentElem.get("SAND_BLOWS_OR_FISSURES"),
                    GROUND_SETTLEMENT: currentElem.get("GROUND_SETTLEMENT"),
                    LATERAL_SPREADING: currentElem.get("LATERAL_SPREADING"),
                    HORIZONTAL: currentElem.get("HORIZONTAL"),
                    VERTICAL: currentElem.get("VERTICAL"),
                    NOTES: currentElem.get("NOTES")
                };
                var BAEAModeUtils = require("/BAEAModeUtils");
                newLiquefaction.PHOTOS = BAEAModeUtils.CreateMediaArray(current_form_id, "LQ", currentElem.get("ID"));
                Alloy.Globals.BAEAModeLiquefaction.push(newLiquefaction);
            } else Alloy.Globals.BAEAModeLiquefaction = new Array();
        } else Alloy.Globals.BAEAModeLiquefaction = new Array();
    }
    function OpenLiquefaction() {
        try {
            LoadLiquefactionData();
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsManageSectionView", {
                form_id: current_form_id,
                type: "LQ",
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadLandslideData() {
        if (Alloy.Globals.BAEAModeLandslide && _.size(Alloy.Globals.BAEAModeLandslide) > 0) ; else if (-1 != current_form_id) {
            var BAEAModeUtils = require("/BAEAModeUtils");
            var recoverLandslide = BAEAModeUtils.LoadLandslideQuery(current_form_id);
            if (recoverLandslide.length > 0) for (var i = 0; i < recoverLandslide.length; i++) {
                var currentElem = recoverLandslide.at(i);
                var newLandslide = {
                    ID: currentElem.get("ID"),
                    SITE: currentElem.get("SITE"),
                    LATITUDE: currentElem.get("LATITUDE"),
                    LONGITUDE: currentElem.get("LONGITUDE"),
                    ADDRESS: currentElem.get("ADDRESS"),
                    LANDSLIDE_TYPE: currentElem.get("LANDSLIDE_TYPE"),
                    MATERIAL_TYPE: currentElem.get("MATERIAL_TYPE"),
                    AREA_AFFECTED: currentElem.get("AREA_AFFECTED"),
                    VULNERABLE_FACILITIES: currentElem.get("VULNERABLE_FACILITIES"),
                    NOTES: currentElem.get("NOTES")
                };
                var BAEAModeUtils = require("/BAEAModeUtils");
                newLandslide.PHOTOS = BAEAModeUtils.CreateMediaArray(current_form_id, "LA", currentElem.get("ID"));
                Alloy.Globals.BAEAModeLandslide.push(newLandslide);
            } else Alloy.Globals.BAEAModeLandslide = new Array();
        } else Alloy.Globals.BAEAModeLandslide = new Array();
    }
    function OpenLandslide() {
        try {
            LoadLandslideData();
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsManageSectionView", {
                form_id: current_form_id,
                type: "LA",
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadTsunamiData() {
        if (Alloy.Globals.BAEAModeTsunami && _.size(Alloy.Globals.BAEAModeTsunami) > 0) ; else if (-1 != current_form_id) {
            var BAEAModeUtils = require("/BAEAModeUtils");
            var recoverTsunami = BAEAModeUtils.LoadTsunamiQuery(current_form_id);
            if (recoverTsunami.length > 0) for (var i = 0; i < recoverTsunami.length; i++) {
                var currentElem = recoverTsunami.at(i);
                var newTsunami = {
                    ID: currentElem.get("ID"),
                    SITE: currentElem.get("SITE"),
                    LATITUDE: currentElem.get("LATITUDE"),
                    LONGITUDE: currentElem.get("LONGITUDE"),
                    ADDRESS: currentElem.get("ADDRESS"),
                    INUNDATION: currentElem.get("INUNDATION"),
                    WAVE_HEIGHT: currentElem.get("WAVE_HEIGHT"),
                    PEAK_TO_TROUGH: currentElem.get("PEAK_TO_TROUGH"),
                    WAVE_CYCLE: currentElem.get("WAVE_CYCLE"),
                    DAMAGE: currentElem.get("DAMAGE"),
                    NOTES: currentElem.get("NOTES")
                };
                var BAEAModeUtils = require("/BAEAModeUtils");
                newTsunami.PHOTOS = BAEAModeUtils.CreateMediaArray(current_form_id, "TS", currentElem.get("ID"));
                Alloy.Globals.BAEAModeTsunami.push(newTsunami);
            } else Alloy.Globals.BAEAModeTsunami = new Array();
        } else Alloy.Globals.BAEAModeTsunami = new Array();
    }
    function OpenTsunami() {
        try {
            LoadTsunamiData();
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsManageSectionView", {
                form_id: current_form_id,
                type: "TS",
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadLifelinesData() {
        if (Alloy.Globals.BAEAModeLifelines && _.size(Alloy.Globals.BAEAModeLifelines) > 0) ; else if (-1 != current_form_id) {
            var BAEAModeUtils = require("/BAEAModeUtils");
            var recoverLifelines = BAEAModeUtils.LoadLifelinesQuery(current_form_id);
            if (recoverLifelines.length > 0) for (var i = 0; i < recoverLifelines.length; i++) {
                var currentElem = recoverLifelines.at(i);
                var newLifelines = {
                    ID: currentElem.get("ID"),
                    SITE: currentElem.get("SITE"),
                    LATITUDE: currentElem.get("LATITUDE"),
                    LONGITUDE: currentElem.get("LONGITUDE"),
                    ADDRESS: currentElem.get("ADDRESS"),
                    COMMUNICATION: currentElem.get("COMMUNICATION"),
                    ELECTRIC_POWER_DELIVERY: currentElem.get("ELECTRIC_POWER_DELIVERY"),
                    OTHER: currentElem.get("OTHER"),
                    FUNCTIONALITY: currentElem.get("FUNCTIONALITY"),
                    REPAIR_TIME: currentElem.get("REPAIR_TIME"),
                    RECOMMEND_FURTHER_INVESTIGATION: currentElem.get("RECOMMEND_FURTHER_INVESTIGATION"),
                    NOTES: currentElem.get("NOTES")
                };
                var BAEAModeUtils = require("/BAEAModeUtils");
                newLifelines.PHOTOS = BAEAModeUtils.CreateMediaArray(current_form_id, "LI", currentElem.get("ID"));
                Alloy.Globals.BAEAModeLifelines.push(newLifelines);
            } else Alloy.Globals.BAEAModeLifelines = new Array();
        } else Alloy.Globals.BAEAModeLifelines = new Array();
    }
    function OpenLifelines() {
        try {
            LoadLifelinesData();
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsManageSectionView", {
                form_id: current_form_id,
                type: "LI",
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadBuildingsData() {
        if (Alloy.Globals.BAEAModeBuildings && _.size(Alloy.Globals.BAEAModeBuildings) > 0) ; else if (-1 != current_form_id) {
            var BAEAModeUtils = require("/BAEAModeUtils");
            var recoverBuildings = BAEAModeUtils.LoadBuildingsQuery(current_form_id);
            if (recoverBuildings.length > 0) for (var i = 0; i < recoverBuildings.length; i++) {
                var currentElem = recoverBuildings.at(i);
                var newBuildings = {
                    ID: currentElem.get("ID"),
                    SITE: currentElem.get("SITE"),
                    LATITUDE: currentElem.get("LATITUDE"),
                    LONGITUDE: currentElem.get("LONGITUDE"),
                    ADDRESS: currentElem.get("ADDRESS"),
                    BUILDING_TYPE: currentElem.get("BUILDING_TYPE"),
                    OCCUPANCY_USE: currentElem.get("OCCUPANCY_USE"),
                    STORIES: currentElem.get("STORIES"),
                    DAMAGE: currentElem.get("DAMAGE"),
                    RECOMMEND_FURTHER_INVESTIGATION: currentElem.get("RECOMMEND_FURTHER_INVESTIGATION"),
                    NOTES: currentElem.get("NOTES")
                };
                var BAEAModeUtils = require("/BAEAModeUtils");
                newBuildings.PHOTOS = BAEAModeUtils.CreateMediaArray(current_form_id, "BU", currentElem.get("ID"));
                Alloy.Globals.BAEAModeBuildings.push(newBuildings);
            } else Alloy.Globals.BAEAModeBuildings = new Array();
        } else Alloy.Globals.BAEAModeBuildings = new Array();
    }
    function OpenBuildings() {
        try {
            LoadBuildingsData();
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsManageSectionView", {
                form_id: current_form_id,
                type: "BU",
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function LoadGeneralData() {
        if (Alloy.Globals.BAEAModeGeneral && _.size(Alloy.Globals.BAEAModeGeneral) > 0) ; else if (-1 != current_form_id) {
            var BAEAModeUtils = require("/BAEAModeUtils");
            var recoverGeneral = BAEAModeUtils.LoadGeneralQuery(current_form_id);
            if (recoverGeneral.length > 0) for (var i = 0; i < recoverGeneral.length; i++) {
                var currentElem = recoverGeneral.at(i);
                var newGeneral = {
                    ID: currentElem.get("ID"),
                    SITE: currentElem.get("SITE"),
                    LATITUDE: currentElem.get("LATITUDE"),
                    LONGITUDE: currentElem.get("LONGITUDE"),
                    ADDRESS: currentElem.get("ADDRESS"),
                    NOTES: currentElem.get("NOTES")
                };
                var BAEAModeUtils = require("/BAEAModeUtils");
                newGeneral.PHOTOS = BAEAModeUtils.CreateMediaArray(current_form_id, "GE", currentElem.get("ID"));
                Alloy.Globals.BAEAModeGeneral.push(newGeneral);
            } else Alloy.Globals.BAEAModeGeneral = new Array();
        } else Alloy.Globals.BAEAModeGeneral = new Array();
    }
    function OpenGeneral() {
        try {
            LoadGeneralData();
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsManageSectionView", {
                form_id: current_form_id,
                type: "GE",
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function handleMenuClick(_event) {
        try {
            if (bCanClickOnTableView) {
                $.widgetAppTextFieldBAEAModeFormsOperator.blur();
                BusyAction($.activity_indicator, controls, function() {
                    var bRet = false;
                    switch (_event.row.id) {
                      case 0:
                        OpenFaultRupture();
                        break;

                      case 1:
                        OpenLiquefaction();
                        break;

                      case 2:
                        OpenLandslide();
                        break;

                      case 3:
                        OpenTsunami();
                        break;

                      case 4:
                        OpenLifelines();
                        break;

                      case 5:
                        OpenBuildings();
                        break;

                      case 6:
                        OpenGeneral();
                    }
                    bRet = true;
                    return bRet;
                });
            }
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
                    if (Alloy.Globals.BAEAModeDetails && _.size(Alloy.Globals.BAEAModeDetails) > 0) {
                        var detailsModel = Alloy.createModel("BAEAForms", {
                            OPERATOR: Alloy.Globals.BAEAModeDetails["OPERATOR"],
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        detailsModel.save();
                        detailsModel = null;
                    } else {
                        var detailsModel = Alloy.createModel("BAEAForms", {
                            OPERATOR: "",
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        detailsModel.save();
                        detailsModel = null;
                    }
                } else if (Alloy.Globals.BAEAModeDetails && _.size(Alloy.Globals.BAEAModeDetails) > 0) {
                    Ti.API.info("\n\nDetails:");
                    var recoverDetails = Alloy.createCollection("BAEAForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM BAEAForms where ID = " + current_form_id
                    });
                    if (recoverDetails.length > 0) {
                        var currentDetails = recoverDetails.at(0);
                        currentDetails.set({
                            OPERATOR: Alloy.Globals.BAEAModeDetails["OPERATOR"],
                            USER: user,
                            SYNCHRONIZED: "0"
                        });
                        currentDetails.save();
                        currentDetails = null;
                    }
                } else if (user) {
                    var recoverDetails = Alloy.createCollection("BAEAForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM BAEAForms where ID = " + current_form_id
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
                    var recoverID = Alloy.createCollection("BAEAForms");
                    recoverID.fetch({
                        query: "SELECT max(ID) AS MAX_ID FROM BAEAForms;"
                    });
                    if (recoverID.length > 0) {
                        current_form_id = recoverID.at(0).get("MAX_ID");
                        recoverID = null;
                    }
                    Ti.API.info("\nNEW_ID: " + current_form_id);
                }
                if (Alloy.Globals.BAEAModeFaultRupture && _.size(Alloy.Globals.BAEAModeFaultRupture) > 0) {
                    Ti.API.info("\nFaultRupture:\n");
                    for (var i = 0; i < _.size(Alloy.Globals.BAEAModeFaultRupture); i++) {
                        var bIsNew = false;
                        if ("undefined" != typeof Alloy.Globals.BAEAModeFaultRupture[i].ID && -1 != Alloy.Globals.BAEAModeFaultRupture[i].ID) {
                            var recoverFaultRupture = Alloy.createCollection("BAEAFormsFaultRupture");
                            recoverFaultRupture.fetch({
                                query: "SELECT * FROM BAEAFormsFaultRupture where ID = " + Alloy.Globals.BAEAModeFaultRupture[i].ID
                            });
                            if (recoverFaultRupture.length > 0) {
                                var currentFaultRupture = recoverFaultRupture.at(0);
                                currentFaultRupture.set({
                                    DATE: Alloy.Globals.BAEAModeFaultRupture[i]["DATE"],
                                    SITE: Alloy.Globals.BAEAModeFaultRupture[i]["SITE"],
                                    LATITUDE: Alloy.Globals.BAEAModeFaultRupture[i]["LATITUDE"],
                                    LONGITUDE: Alloy.Globals.BAEAModeFaultRupture[i]["LONGITUDE"],
                                    ADDRESS: Alloy.Globals.BAEAModeFaultRupture[i]["ADDRESS"],
                                    SURFACE_RUPTURE: Alloy.Globals.BAEAModeFaultRupture[i]["SURFACE_RUPTURE"],
                                    OFFSET_FEATURE_TYPE: Alloy.Globals.BAEAModeFaultRupture[i]["OFFSET_FEATURE_TYPE"],
                                    SLIP_AZIMUT: Alloy.Globals.BAEAModeFaultRupture[i]["SLIP_AZIMUT"],
                                    PLUNGE: Alloy.Globals.BAEAModeFaultRupture[i]["PLUNGE"],
                                    SLIP_LENGTH: Alloy.Globals.BAEAModeFaultRupture[i]["SLIP_LENGTH"],
                                    NOTES: Alloy.Globals.BAEAModeFaultRupture[i]["NOTES"]
                                });
                                currentFaultRupture.save();
                                currentFaultRupture = null;
                            } else bIsNew = true;
                        } else bIsNew = true;
                        if (bIsNew) {
                            var faultRuptureModel = Alloy.createModel("BAEAFormsFaultRupture", {
                                FORM_ID: current_form_id,
                                DATE: Alloy.Globals.BAEAModeFaultRupture[i]["DATE"],
                                SITE: Alloy.Globals.BAEAModeFaultRupture[i]["SITE"],
                                LATITUDE: Alloy.Globals.BAEAModeFaultRupture[i]["LATITUDE"],
                                LONGITUDE: Alloy.Globals.BAEAModeFaultRupture[i]["LONGITUDE"],
                                ADDRESS: Alloy.Globals.BAEAModeFaultRupture[i]["ADDRESS"],
                                SURFACE_RUPTURE: Alloy.Globals.BAEAModeFaultRupture[i]["SURFACE_RUPTURE"],
                                OFFSET_FEATURE_TYPE: Alloy.Globals.BAEAModeFaultRupture[i]["OFFSET_FEATURE_TYPE"],
                                SLIP_AZIMUT: Alloy.Globals.BAEAModeFaultRupture[i]["SLIP_AZIMUT"],
                                PLUNGE: Alloy.Globals.BAEAModeFaultRupture[i]["PLUNGE"],
                                SLIP_LENGTH: Alloy.Globals.BAEAModeFaultRupture[i]["SLIP_LENGTH"],
                                NOTES: Alloy.Globals.BAEAModeFaultRupture[i]["NOTES"]
                            });
                            faultRuptureModel.save();
                            faultRuptureModel = null;
                            var recoverFaultRuptureID = Alloy.createCollection("BAEAFormsFaultRupture");
                            recoverFaultRuptureID.fetch({
                                query: "SELECT max(ID) AS MAX_ID FROM BAEAFormsFaultRupture;"
                            });
                            if (recoverFaultRuptureID.length > 0) {
                                Alloy.Globals.BAEAModeFaultRupture[i].ID = recoverFaultRuptureID.at(0).get("MAX_ID");
                                recoverFaultRuptureID = null;
                            }
                            Ti.API.info("\nNEW_ID: " + current_form_id);
                        }
                        if (Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS && Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS.length > 0) {
                            var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                            Ti.API.info("\nImages:\n\n");
                            for (var j = 0; j < Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS.length; j++) if (Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS[j].isNew) {
                                var image_path = "";
                                image_path = Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS[j].path ? Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS[j].path : current_time;
                                image_path = image_path + "_FR_" + (i + 1) + "_" + (j + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS[j].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("BAEAFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            SECTION: "FR",
                                            SECTION_ID: Alloy.Globals.BAEAModeFaultRupture[i].ID.toString()
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                                if (bError) break;
                                Alloy.Globals.BAEAModeFaultRupture[i].PHOTOS[j].isNew = false;
                            }
                        }
                    }
                }
                if (!bError && Alloy.Globals.BAEAModeLiquefaction && _.size(Alloy.Globals.BAEAModeLiquefaction) > 0) {
                    Ti.API.info("\nLiquefaction:\n");
                    for (var i = 0; i < _.size(Alloy.Globals.BAEAModeLiquefaction); i++) {
                        var bIsNew = false;
                        if ("undefined" != typeof Alloy.Globals.BAEAModeLiquefaction[i].ID && -1 != Alloy.Globals.BAEAModeLiquefaction[i].ID) {
                            var recoverLiquefaction = Alloy.createCollection("BAEAFormsLiquefaction");
                            recoverLiquefaction.fetch({
                                query: "SELECT * FROM BAEAFormsLiquefaction where ID = " + Alloy.Globals.BAEAModeLiquefaction[i].ID
                            });
                            if (recoverLiquefaction.length > 0) {
                                var currentLiquefaction = recoverLiquefaction.at(0);
                                currentLiquefaction.set({
                                    DATE: Alloy.Globals.BAEAModeLiquefaction[i]["DATE"],
                                    SITE: Alloy.Globals.BAEAModeLiquefaction[i]["SITE"],
                                    LATITUDE: Alloy.Globals.BAEAModeLiquefaction[i]["LATITUDE"],
                                    LONGITUDE: Alloy.Globals.BAEAModeLiquefaction[i]["LONGITUDE"],
                                    ADDRESS: Alloy.Globals.BAEAModeLiquefaction[i]["ADDRESS"],
                                    SAND_BLOWS_OR_FISSURES: Alloy.Globals.BAEAModeLiquefaction[i]["SAND_BLOWS_OR_FISSURES"],
                                    GROUND_SETTLEMENT: Alloy.Globals.BAEAModeLiquefaction[i]["GROUND_SETTLEMENT"],
                                    LATERAL_SPREADING: Alloy.Globals.BAEAModeLiquefaction[i]["LATERAL_SPREADING"],
                                    HORIZONTAL: Alloy.Globals.BAEAModeLiquefaction[i]["HORIZONTAL"],
                                    VERTICAL: Alloy.Globals.BAEAModeLiquefaction[i]["VERTICAL"],
                                    NOTES: Alloy.Globals.BAEAModeLiquefaction[i]["NOTES"]
                                });
                                currentLiquefaction.save();
                                currentLiquefaction = null;
                            } else bIsNew = true;
                        } else bIsNew = true;
                        if (bIsNew) {
                            var liquefactionModel = Alloy.createModel("BAEAFormsLiquefaction", {
                                FORM_ID: current_form_id,
                                DATE: Alloy.Globals.BAEAModeLiquefaction[i]["DATE"],
                                SITE: Alloy.Globals.BAEAModeLiquefaction[i]["SITE"],
                                LATITUDE: Alloy.Globals.BAEAModeLiquefaction[i]["LATITUDE"],
                                LONGITUDE: Alloy.Globals.BAEAModeLiquefaction[i]["LONGITUDE"],
                                ADDRESS: Alloy.Globals.BAEAModeLiquefaction[i]["ADDRESS"],
                                SAND_BLOWS_OR_FISSURES: Alloy.Globals.BAEAModeLiquefaction[i]["SAND_BLOWS_OR_FISSURES"],
                                GROUND_SETTLEMENT: Alloy.Globals.BAEAModeLiquefaction[i]["GROUND_SETTLEMENT"],
                                LATERAL_SPREADING: Alloy.Globals.BAEAModeLiquefaction[i]["LATERAL_SPREADING"],
                                HORIZONTAL: Alloy.Globals.BAEAModeLiquefaction[i]["HORIZONTAL"],
                                VERTICAL: Alloy.Globals.BAEAModeLiquefaction[i]["VERTICAL"],
                                NOTES: Alloy.Globals.BAEAModeLiquefaction[i]["NOTES"]
                            });
                            liquefactionModel.save();
                            liquefactionModel = null;
                            var recoverLiquefactionID = Alloy.createCollection("BAEAFormsLiquefaction");
                            recoverLiquefactionID.fetch({
                                query: "SELECT max(ID) AS MAX_ID FROM BAEAFormsLiquefaction;"
                            });
                            if (recoverLiquefactionID.length > 0) {
                                Alloy.Globals.BAEAModeLiquefaction[i].ID = recoverLiquefactionID.at(0).get("MAX_ID");
                                recoverLiquefactionID = null;
                            }
                        }
                        if (Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS && Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS.length > 0) {
                            var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                            Ti.API.info("\nImages:\n\n");
                            for (var j = 0; j < Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS.length; j++) if (Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS[j].isNew) {
                                var image_path = "";
                                image_path = Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS[j].path ? Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS[j].path : current_time;
                                image_path = image_path + "_LQ_" + (i + 1) + "_" + (j + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS[j].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("BAEAFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            SECTION: "LQ",
                                            SECTION_ID: Alloy.Globals.BAEAModeLiquefaction[i].ID.toString()
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                                if (bError) break;
                                Alloy.Globals.BAEAModeLiquefaction[i].PHOTOS[j].isNew = false;
                            }
                        }
                    }
                }
                if (!bError && Alloy.Globals.BAEAModeLandslide && _.size(Alloy.Globals.BAEAModeLandslide) > 0) {
                    Ti.API.info("\nLandslide:\n");
                    for (var i = 0; i < _.size(Alloy.Globals.BAEAModeLandslide); i++) {
                        var bIsNew = false;
                        if ("undefined" != typeof Alloy.Globals.BAEAModeLandslide[i].ID && -1 != Alloy.Globals.BAEAModeLandslide[i].ID) {
                            var recoverLandslide = Alloy.createCollection("BAEAFormsLandslide");
                            recoverLandslide.fetch({
                                query: "SELECT * FROM BAEAFormsLandslide where ID = " + Alloy.Globals.BAEAModeLandslide[i].ID
                            });
                            if (recoverLandslide.length > 0) {
                                var currentLandslide = recoverLandslide.at(0);
                                currentLandslide.set({
                                    DATE: Alloy.Globals.BAEAModeLandslide[i]["DATE"],
                                    SITE: Alloy.Globals.BAEAModeLandslide[i]["SITE"],
                                    LATITUDE: Alloy.Globals.BAEAModeLandslide[i]["LATITUDE"],
                                    LONGITUDE: Alloy.Globals.BAEAModeLandslide[i]["LONGITUDE"],
                                    ADDRESS: Alloy.Globals.BAEAModeLandslide[i]["ADDRESS"],
                                    LANDSLIDE_TYPE: Alloy.Globals.BAEAModeLandslide[i]["LANDSLIDE_TYPE"],
                                    MATERIAL_TYPE: Alloy.Globals.BAEAModeLandslide[i]["MATERIAL_TYPE"],
                                    AREA_AFFECTED: Alloy.Globals.BAEAModeLandslide[i]["AREA_AFFECTED"],
                                    VULNERABLE_FACILITIES: Alloy.Globals.BAEAModeLandslide[i]["VULNERABLE_FACILITIES"],
                                    NOTES: Alloy.Globals.BAEAModeLandslide[i]["NOTES"]
                                });
                                currentLandslide.save();
                                currentLandslide = null;
                            } else bIsNew = true;
                        } else bIsNew = true;
                        if (bIsNew) {
                            var landslideModel = Alloy.createModel("BAEAFormsLandslide", {
                                FORM_ID: current_form_id,
                                DATE: Alloy.Globals.BAEAModeLandslide[i]["DATE"],
                                SITE: Alloy.Globals.BAEAModeLandslide[i]["SITE"],
                                LATITUDE: Alloy.Globals.BAEAModeLandslide[i]["LATITUDE"],
                                LONGITUDE: Alloy.Globals.BAEAModeLandslide[i]["LONGITUDE"],
                                ADDRESS: Alloy.Globals.BAEAModeLandslide[i]["ADDRESS"],
                                LANDSLIDE_TYPE: Alloy.Globals.BAEAModeLandslide[i]["LANDSLIDE_TYPE"],
                                MATERIAL_TYPE: Alloy.Globals.BAEAModeLandslide[i]["MATERIAL_TYPE"],
                                AREA_AFFECTED: Alloy.Globals.BAEAModeLandslide[i]["AREA_AFFECTED"],
                                VULNERABLE_FACILITIES: Alloy.Globals.BAEAModeLandslide[i]["VULNERABLE_FACILITIES"],
                                NOTES: Alloy.Globals.BAEAModeLandslide[i]["NOTES"]
                            });
                            landslideModel.save();
                            landslideModel = null;
                            var recoverLandslideID = Alloy.createCollection("BAEAFormsLandslide");
                            recoverLandslideID.fetch({
                                query: "SELECT max(ID) AS MAX_ID FROM BAEAFormsLandslide;"
                            });
                            if (recoverLandslideID.length > 0) {
                                Alloy.Globals.BAEAModeLandslide[i].ID = recoverLandslideID.at(0).get("MAX_ID");
                                recoverLandslideID = null;
                            }
                        }
                        if (Alloy.Globals.BAEAModeLandslide[i].PHOTOS && Alloy.Globals.BAEAModeLandslide[i].PHOTOS.length > 0) {
                            var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                            Ti.API.info("\nImages:\n\n");
                            for (var j = 0; j < Alloy.Globals.BAEAModeLandslide[i].PHOTOS.length; j++) if (Alloy.Globals.BAEAModeLandslide[i].PHOTOS[j].isNew) {
                                var image_path = "";
                                image_path = Alloy.Globals.BAEAModeLandslide[i].PHOTOS[j].path ? Alloy.Globals.BAEAModeLandslide[i].PHOTOS[j].path : current_time;
                                image_path = image_path + "_LA_" + (i + 1) + "_" + (j + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.BAEAModeLandslide[i].PHOTOS[j].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("BAEAFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            SECTION: "LA",
                                            SECTION_ID: Alloy.Globals.BAEAModeLandslide[i].ID.toString()
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                                if (bError) break;
                                Alloy.Globals.BAEAModeLandslide[i].PHOTOS[j].isNew = false;
                            }
                        }
                    }
                }
                if (!bError && Alloy.Globals.BAEAModeTsunami && _.size(Alloy.Globals.BAEAModeTsunami) > 0) {
                    Ti.API.info("\nTsunami:\n");
                    for (var i = 0; i < _.size(Alloy.Globals.BAEAModeTsunami); i++) {
                        var bIsNew = false;
                        if ("undefined" != typeof Alloy.Globals.BAEAModeTsunami[i].ID && -1 != Alloy.Globals.BAEAModeTsunami[i].ID) {
                            var recoverTsunami = Alloy.createCollection("BAEAFormsTsunami");
                            recoverTsunami.fetch({
                                query: "SELECT * FROM BAEAFormsTsunami where ID = " + Alloy.Globals.BAEAModeTsunami[i].ID
                            });
                            if (recoverTsunami.length > 0) {
                                var currentTsunami = recoverTsunami.at(0);
                                currentTsunami.set({
                                    DATE: Alloy.Globals.BAEAModeTsunami[i]["DATE"],
                                    SITE: Alloy.Globals.BAEAModeTsunami[i]["SITE"],
                                    LATITUDE: Alloy.Globals.BAEAModeTsunami[i]["LATITUDE"],
                                    LONGITUDE: Alloy.Globals.BAEAModeTsunami[i]["LONGITUDE"],
                                    ADDRESS: Alloy.Globals.BAEAModeTsunami[i]["ADDRESS"],
                                    INUNDATION: Alloy.Globals.BAEAModeTsunami[i]["INUNDATION"],
                                    WAVE_HEIGHT: Alloy.Globals.BAEAModeTsunami[i]["WAVE_HEIGHT"],
                                    PEAK_TO_TROUGH: Alloy.Globals.BAEAModeTsunami[i]["PEAK_TO_TROUGH"],
                                    WAVE_CYCLE: Alloy.Globals.BAEAModeTsunami[i]["WAVE_CYCLE"],
                                    DAMAGE: Alloy.Globals.BAEAModeTsunami[i]["DAMAGE"],
                                    NOTES: Alloy.Globals.BAEAModeTsunami[i]["NOTES"]
                                });
                                currentTsunami.save();
                                currentTsunami = null;
                            } else bIsNew = true;
                        } else bIsNew = true;
                        if (bIsNew) {
                            var tsunamiModel = Alloy.createModel("BAEAFormsTsunami", {
                                FORM_ID: current_form_id,
                                DATE: Alloy.Globals.BAEAModeTsunami[i]["DATE"],
                                SITE: Alloy.Globals.BAEAModeTsunami[i]["SITE"],
                                LATITUDE: Alloy.Globals.BAEAModeTsunami[i]["LATITUDE"],
                                LONGITUDE: Alloy.Globals.BAEAModeTsunami[i]["LONGITUDE"],
                                ADDRESS: Alloy.Globals.BAEAModeTsunami[i]["ADDRESS"],
                                INUNDATION: Alloy.Globals.BAEAModeTsunami[i]["INUNDATION"],
                                WAVE_HEIGHT: Alloy.Globals.BAEAModeTsunami[i]["WAVE_HEIGHT"],
                                PEAK_TO_TROUGH: Alloy.Globals.BAEAModeTsunami[i]["PEAK_TO_TROUGH"],
                                WAVE_CYCLE: Alloy.Globals.BAEAModeTsunami[i]["WAVE_CYCLE"],
                                DAMAGE: Alloy.Globals.BAEAModeTsunami[i]["DAMAGE"],
                                NOTES: Alloy.Globals.BAEAModeTsunami[i]["NOTES"]
                            });
                            tsunamiModel.save();
                            tsunamiModel = null;
                            var recoverTsunamiID = Alloy.createCollection("BAEAFormsTsunami");
                            recoverTsunamiID.fetch({
                                query: "SELECT max(ID) AS MAX_ID FROM BAEAFormsTsunami;"
                            });
                            if (recoverTsunamiID.length > 0) {
                                Alloy.Globals.BAEAModeTsunami[i].ID = recoverTsunamiID.at(0).get("MAX_ID");
                                recoverTsunamiID = null;
                            }
                        }
                        if (Alloy.Globals.BAEAModeTsunami[i].PHOTOS && Alloy.Globals.BAEAModeTsunami[i].PHOTOS.length > 0) {
                            var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                            Ti.API.info("\nImages:\n\n");
                            for (var j = 0; j < Alloy.Globals.BAEAModeTsunami[i].PHOTOS.length; j++) if (Alloy.Globals.BAEAModeTsunami[i].PHOTOS[j].isNew) {
                                var image_path = "";
                                image_path = Alloy.Globals.BAEAModeTsunami[i].PHOTOS[j].path ? Alloy.Globals.BAEAModeTsunami[i].PHOTOS[j].path : current_time;
                                image_path = image_path + "_TS_" + (i + 1) + "_" + (j + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.BAEAModeTsunami[i].PHOTOS[j].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("BAEAFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            SECTION: "TS",
                                            SECTION_ID: Alloy.Globals.BAEAModeTsunami[i].ID.toString()
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                                if (bError) break;
                                Alloy.Globals.BAEAModeTsunami[i].PHOTOS[j].isNew = false;
                            }
                        }
                    }
                }
                if (!bError && Alloy.Globals.BAEAModeLifelines && _.size(Alloy.Globals.BAEAModeLifelines) > 0) {
                    Ti.API.info("\nLifelines:\n");
                    for (var i = 0; i < _.size(Alloy.Globals.BAEAModeLifelines); i++) {
                        var bIsNew = false;
                        if ("undefined" != typeof Alloy.Globals.BAEAModeLifelines[i].ID && -1 != Alloy.Globals.BAEAModeLifelines[i].ID) {
                            var recoverLifelines = Alloy.createCollection("BAEAFormsLifelines");
                            recoverLifelines.fetch({
                                query: "SELECT * FROM BAEAFormsLifelines where ID = " + Alloy.Globals.BAEAModeLifelines[i].ID
                            });
                            if (recoverLifelines.length > 0) {
                                var currentLifelines = recoverLifelines.at(0);
                                currentLifelines.set({
                                    DATE: Alloy.Globals.BAEAModeLifelines[i]["DATE"],
                                    SITE: Alloy.Globals.BAEAModeLifelines[i]["SITE"],
                                    LATITUDE: Alloy.Globals.BAEAModeLifelines[i]["LATITUDE"],
                                    LONGITUDE: Alloy.Globals.BAEAModeLifelines[i]["LONGITUDE"],
                                    ADDRESS: Alloy.Globals.BAEAModeLifelines[i]["ADDRESS"],
                                    COMMUNICATION: Alloy.Globals.BAEAModeLifelines[i]["COMMUNICATION"],
                                    ELECTRIC_POWER_DELIVERY: Alloy.Globals.BAEAModeLifelines[i]["ELECTRIC_POWER_DELIVERY"],
                                    OTHER: Alloy.Globals.BAEAModeLifelines[i]["OTHER"],
                                    FUNCTIONALITY: Alloy.Globals.BAEAModeLifelines[i]["FUNCTIONALITY"],
                                    REPAIR_TIME: Alloy.Globals.BAEAModeLifelines[i]["REPAIR_TIME"],
                                    RECOMMEND_FURTHER_INVESTIGATION: Alloy.Globals.BAEAModeLifelines[i]["RECOMMEND_FURTHER_INVESTIGATION"],
                                    NOTES: Alloy.Globals.BAEAModeLifelines[i]["NOTES"]
                                });
                                currentLifelines.save();
                                currentLifelines = null;
                            } else bIsNew = true;
                        } else bIsNew = true;
                        if (bIsNew) {
                            var lifelinesModel = Alloy.createModel("BAEAFormsLifelines", {
                                FORM_ID: current_form_id,
                                DATE: Alloy.Globals.BAEAModeLifelines[i]["DATE"],
                                SITE: Alloy.Globals.BAEAModeLifelines[i]["SITE"],
                                LATITUDE: Alloy.Globals.BAEAModeLifelines[i]["LATITUDE"],
                                LONGITUDE: Alloy.Globals.BAEAModeLifelines[i]["LONGITUDE"],
                                ADDRESS: Alloy.Globals.BAEAModeLifelines[i]["ADDRESS"],
                                COMMUNICATION: Alloy.Globals.BAEAModeLifelines[i]["COMMUNICATION"],
                                ELECTRIC_POWER_DELIVERY: Alloy.Globals.BAEAModeLifelines[i]["ELECTRIC_POWER_DELIVERY"],
                                OTHER: Alloy.Globals.BAEAModeLifelines[i]["OTHER"],
                                FUNCTIONALITY: Alloy.Globals.BAEAModeLifelines[i]["FUNCTIONALITY"],
                                REPAIR_TIME: Alloy.Globals.BAEAModeLifelines[i]["REPAIR_TIME"],
                                RECOMMEND_FURTHER_INVESTIGATION: Alloy.Globals.BAEAModeLifelines[i]["RECOMMEND_FURTHER_INVESTIGATION"],
                                NOTES: Alloy.Globals.BAEAModeLifelines[i]["NOTES"]
                            });
                            lifelinesModel.save();
                            lifelinesModel = null;
                            var recoverLifelinesID = Alloy.createCollection("BAEAFormsLifelines");
                            recoverLifelinesID.fetch({
                                query: "SELECT max(ID) AS MAX_ID FROM BAEAFormsLifelines;"
                            });
                            if (recoverLifelinesID.length > 0) {
                                Alloy.Globals.BAEAModeLifelines[i].ID = recoverLifelinesID.at(0).get("MAX_ID");
                                recoverLifelinesID = null;
                            }
                        }
                        if (Alloy.Globals.BAEAModeLifelines[i].PHOTOS && Alloy.Globals.BAEAModeLifelines[i].PHOTOS.length > 0) {
                            var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                            Ti.API.info("\nImages:\n\n");
                            for (var j = 0; j < Alloy.Globals.BAEAModeLifelines[i].PHOTOS.length; j++) if (Alloy.Globals.BAEAModeLifelines[i].PHOTOS[j].isNew) {
                                var image_path = "";
                                image_path = Alloy.Globals.BAEAModeLifelines[i].PHOTOS[j].path ? Alloy.Globals.BAEAModeLifelines[i].PHOTOS[j].path : current_time;
                                image_path = image_path + "_LI_" + (i + 1) + "_" + (j + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.BAEAModeLifelines[i].PHOTOS[j].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("BAEAFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            SECTION: "LI",
                                            SECTION_ID: Alloy.Globals.BAEAModeLifelines[i].ID.toString()
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                                if (bError) break;
                                Alloy.Globals.BAEAModeLifelines[i].PHOTOS[j].isNew = false;
                            }
                        }
                    }
                }
                if (!bError && Alloy.Globals.BAEAModeBuildings && _.size(Alloy.Globals.BAEAModeBuildings) > 0) {
                    Ti.API.info("\nBuildings:\n");
                    for (var i = 0; i < _.size(Alloy.Globals.BAEAModeBuildings); i++) {
                        var bIsNew = false;
                        if ("undefined" != typeof Alloy.Globals.BAEAModeBuildings[i].ID && -1 != Alloy.Globals.BAEAModeBuildings[i].ID) {
                            var recoverBuildings = Alloy.createCollection("BAEAFormsBuildings");
                            recoverBuildings.fetch({
                                query: "SELECT * FROM BAEAFormsBuildings where ID = " + Alloy.Globals.BAEAModeBuildings[i].ID
                            });
                            if (recoverBuildings.length > 0) {
                                var currentBuildings = recoverBuildings.at(0);
                                currentBuildings.set({
                                    DATE: Alloy.Globals.BAEAModeBuildings[i]["DATE"],
                                    SITE: Alloy.Globals.BAEAModeBuildings[i]["SITE"],
                                    LATITUDE: Alloy.Globals.BAEAModeBuildings[i]["LATITUDE"],
                                    LONGITUDE: Alloy.Globals.BAEAModeBuildings[i]["LONGITUDE"],
                                    ADDRESS: Alloy.Globals.BAEAModeBuildings[i]["ADDRESS"],
                                    BUILDING_TYPE: Alloy.Globals.BAEAModeBuildings[i]["BUILDING_TYPE"],
                                    OCCUPANCY_USE: Alloy.Globals.BAEAModeBuildings[i]["OCCUPANCY_USE"],
                                    STORIES: Alloy.Globals.BAEAModeBuildings[i]["STORIES"],
                                    DAMAGE: Alloy.Globals.BAEAModeBuildings[i]["DAMAGE"],
                                    RECOMMEND_FURTHER_INVESTIGATION: Alloy.Globals.BAEAModeBuildings[i]["RECOMMEND_FURTHER_INVESTIGATION"],
                                    NOTES: Alloy.Globals.BAEAModeBuildings[i]["NOTES"]
                                });
                                currentBuildings.save();
                                currentBuildings = null;
                            } else bIsNew = true;
                        } else bIsNew = true;
                        if (bIsNew) {
                            var buildingsModel = Alloy.createModel("BAEAFormsBuildings", {
                                FORM_ID: current_form_id,
                                DATE: Alloy.Globals.BAEAModeBuildings[i]["DATE"],
                                SITE: Alloy.Globals.BAEAModeBuildings[i]["SITE"],
                                LATITUDE: Alloy.Globals.BAEAModeBuildings[i]["LATITUDE"],
                                LONGITUDE: Alloy.Globals.BAEAModeBuildings[i]["LONGITUDE"],
                                ADDRESS: Alloy.Globals.BAEAModeBuildings[i]["ADDRESS"],
                                BUILDING_TYPE: Alloy.Globals.BAEAModeBuildings[i]["BUILDING_TYPE"],
                                OCCUPANCY_USE: Alloy.Globals.BAEAModeBuildings[i]["OCCUPANCY_USE"],
                                STORIES: Alloy.Globals.BAEAModeBuildings[i]["STORIES"],
                                DAMAGE: Alloy.Globals.BAEAModeBuildings[i]["DAMAGE"],
                                RECOMMEND_FURTHER_INVESTIGATION: Alloy.Globals.BAEAModeBuildings[i]["RECOMMEND_FURTHER_INVESTIGATION"],
                                NOTES: Alloy.Globals.BAEAModeBuildings[i]["NOTES"]
                            });
                            buildingsModel.save();
                            buildingsModel = null;
                            var recoverBuildingsID = Alloy.createCollection("BAEAFormsBuildings");
                            recoverBuildingsID.fetch({
                                query: "SELECT max(ID) AS MAX_ID FROM BAEAFormsBuildings;"
                            });
                            if (recoverBuildingsID.length > 0) {
                                Alloy.Globals.BAEAModeBuildings[i].ID = recoverBuildingsID.at(0).get("MAX_ID");
                                recoverBuildingsID = null;
                            }
                        }
                        if (Alloy.Globals.BAEAModeBuildings[i].PHOTOS && Alloy.Globals.BAEAModeBuildings[i].PHOTOS.length > 0) {
                            var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                            Ti.API.info("\nImages:\n\n");
                            for (var j = 0; j < Alloy.Globals.BAEAModeBuildings[i].PHOTOS.length; j++) if (Alloy.Globals.BAEAModeBuildings[i].PHOTOS[j].isNew) {
                                var image_path = "";
                                image_path = Alloy.Globals.BAEAModeBuildings[i].PHOTOS[j].path ? Alloy.Globals.BAEAModeBuildings[i].PHOTOS[j].path : current_time;
                                image_path = image_path + "_BU_" + (i + 1) + "_" + (j + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.BAEAModeBuildings[i].PHOTOS[j].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("BAEAFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            SECTION: "BU",
                                            SECTION_ID: Alloy.Globals.BAEAModeBuildings[i].ID.toString()
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                                if (bError) break;
                                Alloy.Globals.BAEAModeBuildings[i].PHOTOS[j].isNew = false;
                            }
                        }
                    }
                }
                if (!bError && Alloy.Globals.BAEAModeGeneral && _.size(Alloy.Globals.BAEAModeGeneral) > 0) {
                    Ti.API.info("\nGeneral:\n");
                    for (var i = 0; i < _.size(Alloy.Globals.BAEAModeGeneral); i++) {
                        var bIsNew = false;
                        if ("undefined" != typeof Alloy.Globals.BAEAModeGeneral[i].ID && -1 != Alloy.Globals.BAEAModeGeneral[i].ID) {
                            var recoverGeneral = Alloy.createCollection("BAEAFormsGeneral");
                            recoverGeneral.fetch({
                                query: "SELECT * FROM BAEAFormsGeneral where ID = " + Alloy.Globals.BAEAModeGeneral[i].ID
                            });
                            if (recoverGeneral.length > 0) {
                                var currentGeneral = recoverGeneral.at(0);
                                currentGeneral.set({
                                    DATE: Alloy.Globals.BAEAModeGeneral[i]["DATE"],
                                    SITE: Alloy.Globals.BAEAModeGeneral[i]["SITE"],
                                    LATITUDE: Alloy.Globals.BAEAModeGeneral[i]["LATITUDE"],
                                    LONGITUDE: Alloy.Globals.BAEAModeGeneral[i]["LONGITUDE"],
                                    ADDRESS: Alloy.Globals.BAEAModeGeneral[i]["ADDRESS"],
                                    NOTES: Alloy.Globals.BAEAModeGeneral[i]["NOTES"]
                                });
                                currentGeneral.save();
                                currentGeneral = null;
                            } else bIsNew = true;
                        } else bIsNew = true;
                        if (bIsNew) {
                            var generalModel = Alloy.createModel("BAEAFormsGeneral", {
                                FORM_ID: current_form_id,
                                DATE: Alloy.Globals.BAEAModeGeneral[i]["DATE"],
                                SITE: Alloy.Globals.BAEAModeGeneral[i]["SITE"],
                                LATITUDE: Alloy.Globals.BAEAModeGeneral[i]["LATITUDE"],
                                LONGITUDE: Alloy.Globals.BAEAModeGeneral[i]["LONGITUDE"],
                                ADDRESS: Alloy.Globals.BAEAModeGeneral[i]["ADDRESS"],
                                NOTES: Alloy.Globals.BAEAModeGeneral[i]["NOTES"]
                            });
                            generalModel.save();
                            generalModel = null;
                            var recoverGeneralID = Alloy.createCollection("BAEAFormsGeneral");
                            recoverGeneralID.fetch({
                                query: "SELECT max(ID) AS MAX_ID FROM BAEAFormsGeneral;"
                            });
                            if (recoverGeneralID.length > 0) {
                                Alloy.Globals.BAEAModeGeneral[i].ID = recoverGeneralID.at(0).get("MAX_ID");
                                recoverGeneralID = null;
                            }
                        }
                        if (Alloy.Globals.BAEAModeGeneral[i].PHOTOS && Alloy.Globals.BAEAModeGeneral[i].PHOTOS.length > 0) {
                            var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
                            Ti.API.info("\nImages:\n\n");
                            for (var j = 0; j < Alloy.Globals.BAEAModeGeneral[i].PHOTOS.length; j++) if (Alloy.Globals.BAEAModeGeneral[i].PHOTOS[j].isNew) {
                                var image_path = "";
                                image_path = Alloy.Globals.BAEAModeGeneral[i].PHOTOS[j].path ? Alloy.Globals.BAEAModeGeneral[i].PHOTOS[j].path : current_time;
                                image_path = image_path + "_GE_" + (i + 1) + "_" + (j + 1) + "_image.png";
                                var file = Alloy.Globals.getFileForWrite(image_path);
                                if (file.exists()) ; else {
                                    var fromFile = Ti.Filesystem.getFile(Alloy.Globals.BAEAModeGeneral[i].PHOTOS[j].media);
                                    if (file.write(fromFile.read())) {
                                        var imageModel = Alloy.createModel("BAEAFormsImages", {
                                            FORM_ID: current_form_id,
                                            IMAGE_PATH: image_path,
                                            SECTION: "GE",
                                            SECTION_ID: Alloy.Globals.BAEAModeGeneral[i].ID.toString()
                                        });
                                        imageModel.save();
                                        imageModel = null;
                                    } else {
                                        bError = true;
                                        Alloy.Globals.AlertUserAndLogAsync(L("image_saving_error_msg"));
                                    }
                                }
                                file = null;
                                if (bError) break;
                                Alloy.Globals.BAEAModeGeneral[i].PHOTOS[j].isNew = false;
                            }
                        }
                    }
                }
                if (bError) Ti.API.info("ERROR.\nEND"); else {
                    Ti.API.info("COMMIT.\nEND");
                    Ti.App.fireEvent("baea_mode:save");
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
    function OnOperator_Change() {
        Alloy.Globals.BAEAModeDetails["OPERATOR"] = $.widgetAppTextFieldBAEAModeFormsOperator.get_text_value();
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
    this.__controllerPath = "BAEAModeFormsGeneralSection";
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
    $.__views.baeaModeFormsGeneralSectionWindow = Ti.UI.createWindow({
        title: L("baea_mode_forms_general_section_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsGeneralSectionWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeFormsGeneralSectionWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.baeaModeFormsGeneralSectionWindow.add($.__views.activity_indicator);
    $.__views.slideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "slideMenu",
        __parentSymbol: $.__views.baeaModeFormsGeneralSectionWindow
    });
    $.__views.slideMenu.setParent($.__views.baeaModeFormsGeneralSectionWindow);
    $.__views.appWrapper = Ti.UI.createView({
        id: "appWrapper"
    });
    $.__views.baeaModeFormsGeneralSectionWindow.add($.__views.appWrapper);
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
        height: 88,
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
    $.__views.viewAppTextFieldBAEAModeFormsOperator = Ti.UI.createView({
        top: 170,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsOperator"
    });
    $.__views.scrollViewGeneralSection.add($.__views.viewAppTextFieldBAEAModeFormsOperator);
    $.__views.widgetAppTextFieldBAEAModeFormsOperator = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsOperator",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsOperator
    });
    $.__views.widgetAppTextFieldBAEAModeFormsOperator.setParent($.__views.viewAppTextFieldBAEAModeFormsOperator);
    $.__views.imageViewBAEALogo = Ti.UI.createImageView({
        top: 240,
        width: "100%",
        image: "/images/BAEA_logo.png",
        id: "imageViewBAEALogo"
    });
    $.__views.scrollViewGeneralSection.add($.__views.imageViewBAEALogo);
    $.__views.navigationWindowBAEAModeFormsGeneralSection = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeFormsGeneralSectionWindow,
        id: "navigationWindowBAEAModeFormsGeneralSection"
    });
    $.__views.navigationWindowBAEAModeFormsGeneralSection && $.addTopLevelView($.__views.navigationWindowBAEAModeFormsGeneralSection);
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
    var bIsWorkInProgress = false;
    var bCanClickOnTableView = true;
    var slider_menu_opened = false;
    try {
        var BAEAModeUtils = require("/BAEAModeUtils");
        var recoverDetails = BAEAModeUtils.LoadDetailsQuery(current_form_id);
        Alloy.Globals.BAEAModeDetails = recoverDetails.length > 0 ? {
            OPERATOR: recoverDetails.at(0).get("OPERATOR")
        } : {
            OPERATOR: ""
        };
        $.widgetAppTextFieldBAEAModeFormsOperator.init(L("generic_operator_txt_hint"), OnOperator_Change);
        $.widgetAppTextFieldBAEAModeFormsOperator.set_text_value(Alloy.Globals.BAEAModeDetails["OPERATOR"]);
        $.widgetAppTextFieldBAEAModeFormsOperator.enabled(view_enabled);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        if (view_enabled) ; else {
            $.viewAppButtonSave.visible = false;
            $.viewAppTextFieldBAEAModeFormsOperator.setTop(65);
            $.imageViewBAEALogo.setTop(135);
        }
        Alloy.Globals.BAEAModeFaultRupture = new Array();
        Alloy.Globals.BAEAModeLiquefaction = new Array();
        Alloy.Globals.BAEAModeLandslide = new Array();
        Alloy.Globals.BAEAModeTsunami = new Array();
        Alloy.Globals.BAEAModeLifelines = new Array();
        Alloy.Globals.BAEAModeBuildings = new Array();
        Alloy.Globals.BAEAModeGeneral = new Array();
        var nodes = [ {
            menuHeader: L("baea_mode_sections_slide_menu_title"),
            id: 0,
            title: L("baea_mode_section_fault_rupture_title"),
            image: "/images/slide_menu_fault_rupture.png"
        }, {
            id: 1,
            title: L("baea_mode_section_liquefaction_title"),
            image: "/images/slide_menu_liquefaction.png"
        }, {
            id: 2,
            title: L("baea_mode_section_landslide_title"),
            image: "/images/slide_menu_landslide.png"
        }, {
            id: 3,
            title: L("baea_mode_section_tsunami_title"),
            image: "/images/slide_menu_tsunami.png"
        }, {
            id: 4,
            title: L("baea_mode_section_lifelines_title"),
            image: "/images/slide_menu_lifelines.png"
        }, {
            id: 5,
            title: L("baea_mode_section_buildings_title"),
            image: "/images/slide_menu_buildings.png"
        }, {
            id: 6,
            title: L("baea_mode_section_general_title"),
            image: "/images/slide_menu_general.png"
        } ];
        $.slideMenu.init({
            nodes: nodes,
            color: {
                headingBackground: "#000",
                headingText: "#FFF"
            }
        });
        $.slideMenu.Nodes.addEventListener("click", handleMenuClick);
        RegisterHideKeyboard($.baeaModeFormsGeneralSectionWindow, [ $.widgetAppTextFieldBAEAModeFormsOperator.get_text_field() ]);
        $.navigationWindowBAEAModeFormsGeneralSection.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btn_slider_menu!click!OnBtnSliderMenu_Click"] && $.__views.btn_slider_menu.addEventListener("click", OnBtnSliderMenu_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;