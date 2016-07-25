function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId31(e) {
        if (e && e.fromAdapter) return;
        __alloyId31.opts || {};
        var models = __alloyId30.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId24 = models[i];
            __alloyId24.__transform = {};
            var __alloyId26 = Ti.UI.createTableViewRow({
                hasChild: "true",
                rowId: "undefined" != typeof __alloyId24.__transform["ID"] ? __alloyId24.__transform["ID"] : __alloyId24.get("ID"),
                isSynchronized: "undefined" != typeof __alloyId24.__transform["SYNCHRONIZED"] ? __alloyId24.__transform["SYNCHRONIZED"] : __alloyId24.get("SYNCHRONIZED"),
                className: "form_row"
            });
            rows.push(__alloyId26);
            var __alloyId27 = Ti.UI.createImageView({
                left: 5,
                width: 34,
                height: 34,
                image: "/images/check.png"
            });
            __alloyId26.add(__alloyId27);
            var __alloyId28 = Ti.UI.createLabel({
                left: 45,
                height: 40,
                width: 200,
                color: "#000",
                text: "undefined" != typeof __alloyId24.__transform["ID"] ? __alloyId24.__transform["ID"] : __alloyId24.get("ID")
            });
            __alloyId26.add(__alloyId28);
            var __alloyId29 = Ti.UI.createButton({
                color: "black",
                backgroundColor: "red",
                title: L("generic_delete_title"),
                right: 8,
                width: 105,
                clickName: "deleteButton",
                height: 34
            });
            __alloyId26.add(__alloyId29);
        }
        $.__views.tableViewBAEAModeForms.setData(rows);
    }
    function RebuildTable() {
        if (Alloy.Globals.ExistSession()) Alloy.Collections.BAEAForms.fetch({
            query: "SELECT * FROM BAEAForms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "'"
        }); else {
            $.btnLogout.visible = false;
            Alloy.Collections.BAEAForms.fetch({
                query: "SELECT * FROM BAEAForms where USER is null or USER = ''"
            });
        }
        if ($.tableViewBAEAModeForms.data && $.tableViewBAEAModeForms.data.length > 0) {
            for (var i = 0; i < $.tableViewBAEAModeForms.data[0].rows.length; i++) {
                var currentRow = $.tableViewBAEAModeForms.data[0].rows[i];
                currentRow.children[0].setVisible("1" == currentRow.isSynchronized ? true : false);
            }
            $.tableViewBAEAModeForms.setVisible(true);
        } else $.tableViewBAEAModeForms.setVisible(false);
    }
    function OnBtnLogout_Click() {
        try {
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    EndAsyncBusyAction($.activity_indicator, controls);
                    Alloy.Globals.ResetSession();
                    $.btnLogout.visible = false;
                    current_logged_username = L("generic_welcome_offline_text_msg");
                    $.lblWelcome.setText(current_logged_username);
                    RebuildTable();
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator, controls);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                var params = {
                    key: "EDAM",
                    SID: Alloy.Globals.SessionId
                };
                loader.timeout = Alloy.Globals.LogoutTimeoutMillisecs;
                loader.open("POST", "https://www.edam.resiltronics.org/Security/Sessione_Logout.php");
                loader.send(params);
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBAEAModeFormsWindow_Close() {
        $.destroy();
    }
    function OnTableViewForms_Click(e) {
        try {
            bCanClickOnTableView && BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                if ("deleteButton" == e.source.clickName) {
                    if (e.row && e.row.rowId) {
                        var alertDialogDeleteForm = Titanium.UI.createAlertDialog({
                            title: L("generic_delete_form_title"),
                            message: L("delete_form_msg"),
                            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                            cancel: 1
                        });
                        alertDialogDeleteForm.addEventListener("click", function(event) {
                            if (0 == event.index) {
                                var recoverPictureGallery = Alloy.createCollection("BAEAFormsImages");
                                recoverPictureGallery.fetch({
                                    query: "SELECT IMAGE_PATH FROM BAEAFormsImages where FORM_ID=" + e.row.rowId
                                });
                                if (recoverPictureGallery.length > 0) for (var i = 0; i < recoverPictureGallery.length; i++) {
                                    var image = recoverPictureGallery.at(i);
                                    var image_path = image.get("IMAGE_PATH");
                                    var file = Alloy.Globals.getFileForRead(image_path);
                                    file && file.deleteFile();
                                }
                                var recoverPictures = Alloy.createCollection("BAEAFormsImages");
                                recoverPictures.fetch({
                                    query: "SELECT * FROM BAEAFormsImages where FORM_ID = " + e.row.rowId
                                });
                                while (recoverPictures.length > 0) {
                                    var model = recoverPictures.at(0);
                                    recoverPictures.remove(model);
                                    model.destroy();
                                }
                                var recoverFaultRupture = Alloy.createCollection("BAEAFormsFaultRupture");
                                recoverFaultRupture.fetch({
                                    query: "SELECT * FROM BAEAFormsFaultRupture where FORM_ID = " + e.row.rowId
                                });
                                while (recoverFaultRupture.length > 0) {
                                    var model = recoverFaultRupture.at(0);
                                    recoverFaultRupture.remove(model);
                                    model.destroy();
                                }
                                var recoverLiquefaction = Alloy.createCollection("BAEAFormsLiquefaction");
                                recoverLiquefaction.fetch({
                                    query: "SELECT * FROM BAEAFormsLiquefaction where FORM_ID = " + e.row.rowId
                                });
                                while (recoverLiquefaction.length > 0) {
                                    var model = recoverLiquefaction.at(0);
                                    recoverLiquefaction.remove(model);
                                    model.destroy();
                                }
                                var recoverLandslide = Alloy.createCollection("BAEAFormsLandslide");
                                recoverLandslide.fetch({
                                    query: "SELECT * FROM BAEAFormsLandslide where FORM_ID = " + e.row.rowId
                                });
                                while (recoverLandslide.length > 0) {
                                    var model = recoverLandslide.at(0);
                                    recoverLandslide.remove(model);
                                    model.destroy();
                                }
                                var recoverTsunami = Alloy.createCollection("BAEAFormsTsunami");
                                recoverTsunami.fetch({
                                    query: "SELECT * FROM BAEAFormsTsunami where FORM_ID = " + e.row.rowId
                                });
                                while (recoverTsunami.length > 0) {
                                    var model = recoverTsunami.at(0);
                                    recoverTsunami.remove(model);
                                    model.destroy();
                                }
                                var recoverLifelines = Alloy.createCollection("BAEAFormsLifelines");
                                recoverLifelines.fetch({
                                    query: "SELECT * FROM BAEAFormsLifelines where FORM_ID = " + e.row.rowId
                                });
                                while (recoverLifelines.length > 0) {
                                    var model = recoverLifelines.at(0);
                                    recoverLifelines.remove(model);
                                    model.destroy();
                                }
                                var recoverBuildings = Alloy.createCollection("BAEAFormsBuildings");
                                recoverBuildings.fetch({
                                    query: "SELECT * FROM BAEAFormsBuildings where FORM_ID = " + e.row.rowId
                                });
                                while (recoverBuildings.length > 0) {
                                    var model = recoverBuildings.at(0);
                                    recoverBuildings.remove(model);
                                    model.destroy();
                                }
                                var recoverGeneral = Alloy.createCollection("BAEAFormsGeneral");
                                recoverGeneral.fetch({
                                    query: "SELECT * FROM BAEAFormsGeneral where FORM_ID = " + e.row.rowId
                                });
                                while (recoverGeneral.length > 0) {
                                    var model = recoverGeneral.at(0);
                                    recoverGeneral.remove(model);
                                    model.destroy();
                                }
                                var recoverForm = Alloy.createCollection("BAEAForms");
                                recoverForm.fetch({
                                    query: "SELECT * FROM BAEAForms where ID = " + e.row.rowId
                                });
                                if (recoverForm.length > 0) {
                                    var model = recoverForm.at(0);
                                    recoverForm.remove(model);
                                    model.destroy();
                                }
                                RebuildTable();
                            }
                        });
                        alertDialogDeleteForm.show();
                    }
                } else {
                    var rowId = e.row.rowId;
                    var isSynchronized = e.row.isSynchronized;
                    if ("1" == isSynchronized) {
                        var dialog = Ti.UI.createAlertDialog({
                            message: L("generic_form_synchronized_info_msg"),
                            ok: L("generic_ok_msg"),
                            title: L("generic_info_title")
                        });
                        dialog.addEventListener("click", function() {
                            Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode:save", RebuildTable);
                            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsGeneralSection", {
                                form_id: rowId,
                                is_synchronized: isSynchronized
                            });
                        });
                        dialog.show();
                    } else {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode:save", RebuildTable);
                        Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsGeneralSection", {
                            form_id: rowId,
                            is_synchronized: isSynchronized
                        });
                    }
                }
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnAdd_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode:save", RebuildTable);
                Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsGeneralSection", {
                    form_id: -1,
                    is_synchronized: "0"
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
    function OnBtnServerSynch_Click() {
        OnBtnServerSynch();
    }
    function OnBtnServerSynch() {
        try {
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                if (Alloy.Globals.ExistSession()) {
                    var loader = Titanium.Network.createHTTPClient();
                    loader.validatesSecureCertificate = false;
                    loader.onload = function() {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        ServerSynch("Expired" == this.responseText);
                    };
                    loader.onerror = function(e) {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                    };
                    var params = {
                        key: "EDAM",
                        SID: Alloy.Globals.SessionId,
                        ECHO_ENABLED: true
                    };
                    loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs;
                    loader.open("POST", "https://www.edam.resiltronics.org/Security/Sessione_Controllo.php");
                    loader.send(params);
                } else {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    ServerSynch(true);
                }
                return bRet;
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function ServerSynch(need_authentication) {
        try {
            if (need_authentication) {
                Alloy.Globals.ResetSession();
                $.btnLogout.visible = false;
                current_logged_username = L("generic_welcome_offline_text_msg");
                $.lblWelcome.setText(current_logged_username);
            }
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var BAEAModeUtils = require("/BAEAModeUtils");
                var uploadQueue = new Array();
                var all_media_found = true;
                var recoverDetails = BAEAModeUtils.LoadDetailsQuery();
                if (recoverDetails.length > 0) for (var i = 0; i < recoverDetails.length; i++) {
                    var details = recoverDetails.at(i);
                    var form_id = details.get("ID");
                    var params = {
                        key: "EDAM",
                        ID: form_id,
                        OPERATOR: details.get("OPERATOR")
                    };
                    var recoverFaultRupture = BAEAModeUtils.LoadFaultRuptureQuery(form_id);
                    var recoverLiquefaction = BAEAModeUtils.LoadLiquefactionQuery(form_id);
                    var recoverLandslide = BAEAModeUtils.LoadLandslideQuery(form_id);
                    var recoverTsunami = BAEAModeUtils.LoadTsunamiQuery(form_id);
                    var recoverLifelines = BAEAModeUtils.LoadLifelinesQuery(form_id);
                    var recoverBuildings = BAEAModeUtils.LoadBuildingsQuery(form_id);
                    var recoverGeneral = BAEAModeUtils.LoadGeneralQuery(form_id);
                    if (recoverFaultRupture.length > 0) {
                        var ar_fault_rupture = [];
                        for (var j = 0; j < recoverFaultRupture.length; j++) {
                            var faultRupture = recoverFaultRupture.at(j);
                            var fault_rupture_params = {};
                            fault_rupture_params["FAULT_RUPTURE_ID"] = faultRupture.get("ID");
                            fault_rupture_params["FAULT_RUPTURE_DATE"] = faultRupture.get("DATE");
                            fault_rupture_params["FAULT_RUPTURE_SITE"] = faultRupture.get("SITE");
                            fault_rupture_params["FAULT_RUPTURE_LATITUDE"] = faultRupture.get("LATITUDE");
                            fault_rupture_params["FAULT_RUPTURE_LONGITUDE"] = faultRupture.get("LONGITUDE");
                            fault_rupture_params["FAULT_RUPTURE_ADDRESS"] = faultRupture.get("ADDRESS");
                            fault_rupture_params["SURFACE_RUPTURE"] = faultRupture.get("SURFACE_RUPTURE");
                            fault_rupture_params["OFFSET_FEATURE_TYPE"] = faultRupture.get("OFFSET_FEATURE_TYPE");
                            fault_rupture_params["SLIP_AZIMUT"] = faultRupture.get("SLIP_AZIMUT");
                            fault_rupture_params["PLUNGE"] = faultRupture.get("PLUNGE");
                            fault_rupture_params["SLIP_LENGTH"] = faultRupture.get("SLIP_LENGTH");
                            fault_rupture_params["FAULT_RUPTURE_NOTES"] = faultRupture.get("NOTES");
                            ar_fault_rupture.push(fault_rupture_params);
                        }
                        params["FAULT_RUPTURE"] = JSON.stringify(ar_fault_rupture);
                    }
                    if (recoverLiquefaction.length > 0) {
                        var ar_liquefaction = [];
                        for (var j = 0; j < recoverLiquefaction.length; j++) {
                            var liquefaction = recoverLiquefaction.at(j);
                            var liquefaction_params = {};
                            liquefaction_params["LIQUEFACTION_ID"] = liquefaction.get("ID");
                            liquefaction_params["LIQUEFACTION_DATE"] = liquefaction.get("DATE");
                            liquefaction_params["LIQUEFACTION_SITE"] = liquefaction.get("SITE");
                            liquefaction_params["LIQUEFACTION_LATITUDE"] = liquefaction.get("LATITUDE");
                            liquefaction_params["LIQUEFACTION_LONGITUDE"] = liquefaction.get("LONGITUDE");
                            liquefaction_params["LIQUEFACTION_ADDRESS"] = liquefaction.get("ADDRESS");
                            liquefaction_params["SAND_BLOWS_OR_FISSURES"] = liquefaction.get("SAND_BLOWS_OR_FISSURES");
                            liquefaction_params["GROUND_SETTLEMENT"] = liquefaction.get("GROUND_SETTLEMENT");
                            liquefaction_params["LATERAL_SPREADING"] = liquefaction.get("LATERAL_SPREADING");
                            liquefaction_params["HORIZONTAL"] = liquefaction.get("HORIZONTAL");
                            liquefaction_params["VERTICAL"] = liquefaction.get("VERTICAL");
                            liquefaction_params["LIQUEFACTION_NOTES"] = liquefaction.get("NOTES");
                            ar_liquefaction.push(liquefaction_params);
                        }
                        params["LIQUEFACTION"] = JSON.stringify(ar_liquefaction);
                    }
                    if (recoverLandslide.length > 0) {
                        var ar_landslide = [];
                        for (var j = 0; j < recoverLandslide.length; j++) {
                            var landslide = recoverLandslide.at(j);
                            var landslide_params = {};
                            landslide_params["LANDSLIDE_ID"] = landslide.get("ID");
                            landslide_params["LANDSLIDE_DATE"] = landslide.get("DATE");
                            landslide_params["LANDSLIDE_SITE"] = landslide.get("SITE");
                            landslide_params["LANDSLIDE_LATITUDE"] = landslide.get("LATITUDE");
                            landslide_params["LANDSLIDE_LONGITUDE"] = landslide.get("LONGITUDE");
                            landslide_params["LANDSLIDE_ADDRESS"] = landslide.get("ADDRESS");
                            landslide_params["LANDSLIDE_TYPE"] = landslide.get("LANDSLIDE_TYPE");
                            landslide_params["MATERIAL_TYPE"] = landslide.get("MATERIAL_TYPE");
                            landslide_params["AREA_AFFECTED"] = landslide.get("AREA_AFFECTED");
                            landslide_params["VULNERABLE_FACILITIES"] = landslide.get("VULNERABLE_FACILITIES");
                            landslide_params["LANDSLIDE_NOTES"] = landslide.get("NOTES");
                            ar_landslide.push(landslide_params);
                        }
                        params["LANDSLIDE"] = JSON.stringify(ar_landslide);
                    }
                    if (recoverTsunami.length > 0) {
                        var ar_tsunami = [];
                        for (var j = 0; j < recoverTsunami.length; j++) {
                            var tsunami = recoverTsunami.at(j);
                            var tsunami_params = {};
                            tsunami_params["TSUNAMI_ID"] = tsunami.get("ID");
                            tsunami_params["TSUNAMI_DATE"] = tsunami.get("DATE");
                            tsunami_params["TSUNAMI_SITE"] = tsunami.get("SITE");
                            tsunami_params["TSUNAMI_LATITUDE"] = tsunami.get("LATITUDE");
                            tsunami_params["TSUNAMI_LONGITUDE"] = tsunami.get("LONGITUDE");
                            tsunami_params["TSUNAMI_ADDRESS"] = tsunami.get("ADDRESS");
                            tsunami_params["INUNDATION"] = tsunami.get("INUNDATION");
                            tsunami_params["WAVE_HEIGHT"] = tsunami.get("WAVE_HEIGHT");
                            tsunami_params["PEAK_TO_TROUGH"] = tsunami.get("PEAK_TO_TROUGH");
                            tsunami_params["WAVE_CYCLE"] = tsunami.get("WAVE_CYCLE");
                            tsunami_params["TSUNAMI_DAMAGE"] = tsunami.get("DAMAGE");
                            tsunami_params["TSUNAMI_NOTES"] = tsunami.get("NOTES");
                            ar_tsunami.push(tsunami_params);
                        }
                        params["TSUNAMI"] = JSON.stringify(ar_tsunami);
                    }
                    if (recoverLifelines.length > 0) {
                        var ar_lifelines = [];
                        for (var j = 0; j < recoverLifelines.length; j++) {
                            var lifelines = recoverLifelines.at(j);
                            var lifelines_params = {};
                            lifelines_params["LIFELINES_ID"] = lifelines.get("ID");
                            lifelines_params["LIFELINES_DATE"] = lifelines.get("DATE");
                            lifelines_params["LIFELINES_SITE"] = lifelines.get("SITE");
                            lifelines_params["LIFELINES_LATITUDE"] = lifelines.get("LATITUDE");
                            lifelines_params["LIFELINES_LONGITUDE"] = lifelines.get("LONGITUDE");
                            lifelines_params["LIFELINES_ADDRESS"] = lifelines.get("ADDRESS");
                            lifelines_params["COMMUNICATION"] = lifelines.get("COMMUNICATION");
                            lifelines_params["ELECTRIC_POWER_DELIVERY"] = lifelines.get("ELECTRIC_POWER_DELIVERY");
                            lifelines_params["OTHER"] = lifelines.get("OTHER");
                            lifelines_params["FUNCTIONALITY"] = lifelines.get("FUNCTIONALITY");
                            lifelines_params["REPAIR_TIME"] = lifelines.get("REPAIR_TIME");
                            lifelines_params["LIFELINES_RECOMMEND_FURTHER_INVESTIGATION"] = lifelines.get("RECOMMEND_FURTHER_INVESTIGATION");
                            lifelines_params["LIFELINES_NOTES"] = lifelines.get("NOTES");
                            ar_lifelines.push(lifelines_params);
                        }
                        params["LIFELINES"] = JSON.stringify(ar_lifelines);
                    }
                    if (recoverBuildings.length > 0) {
                        var ar_buildings = [];
                        for (var j = 0; j < recoverBuildings.length; j++) {
                            var buildings = recoverBuildings.at(j);
                            var buildings_params = {};
                            buildings_params["BUILDINGS_ID"] = buildings.get("ID");
                            buildings_params["BUILDINGS_DATE"] = buildings.get("DATE");
                            buildings_params["BUILDINGS_SITE"] = buildings.get("SITE");
                            buildings_params["BUILDINGS_LATITUDE"] = buildings.get("LATITUDE");
                            buildings_params["BUILDINGS_LONGITUDE"] = buildings.get("LONGITUDE");
                            buildings_params["BUILDINGS_ADDRESS"] = buildings.get("ADDRESS");
                            buildings_params["BUILDING_TYPE"] = buildings.get("BUILDING_TYPE");
                            buildings_params["OCCUPANCY_USE"] = buildings.get("OCCUPANCY_USE");
                            buildings_params["STORIES"] = buildings.get("STORIES");
                            buildings_params["BUILDINGS_DAMAGE"] = buildings.get("DAMAGE");
                            buildings_params["BUILDINGS_RECOMMEND_FURTHER_INVESTIGATION"] = buildings.get("RECOMMEND_FURTHER_INVESTIGATION");
                            buildings_params["BUILDINGS_NOTES"] = buildings.get("NOTES");
                            ar_buildings.push(buildings_params);
                        }
                        params["BUILDINGS"] = JSON.stringify(ar_buildings);
                    }
                    if (recoverGeneral.length > 0) {
                        var ar_general = [];
                        for (var j = 0; j < recoverGeneral.length; j++) {
                            var general = recoverGeneral.at(j);
                            var general_params = {};
                            general_params["GENERAL_ID"] = general.get("ID");
                            general_params["GENERAL_DATE"] = general.get("DATE");
                            general_params["GENERAL_SITE"] = general.get("SITE");
                            general_params["GENERAL_LATITUDE"] = general.get("LATITUDE");
                            general_params["GENERAL_LONGITUDE"] = general.get("LONGITUDE");
                            general_params["GENERAL_ADDRESS"] = general.get("ADDRESS");
                            general_params["GENERAL_NOTES"] = general.get("NOTES");
                            ar_general.push(general_params);
                        }
                        params["GENERAL"] = JSON.stringify(ar_general);
                    }
                    var media_array = BAEAModeUtils.CreateMediaArray(form_id);
                    if (media_array && media_array.length > 0) {
                        var zipContent = new Array();
                        for (var j = 1; j <= media_array.length; j++) {
                            var media = media_array[j - 1];
                            all_media_found &= media.media_found;
                            if (media.media_found) {
                                zipContent.push(media.media);
                                var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), media.path.replace(".png", "") + "_data.dat");
                                newFile.write("Section: " + media.section + "\nSectionID: " + media.section_id);
                                zipContent.push(newFile.getNativePath());
                            }
                        }
                        if (zipContent && zipContent.length > 0) {
                            var formZipArchive = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), "Form_" + form_id + ".zip");
                            formZipArchive.exists() && formZipArchive.deleteFile();
                            var compressedZipArchive = require("ti.compression");
                            {
                                compressedZipArchive.zip(formZipArchive.getNativePath(), zipContent);
                            }
                            params["MEDIA_ZIP_ARCHIVE"] = formZipArchive.read();
                        }
                    }
                    uploadQueue.push({
                        content: params,
                        url: "https://www.edam.resiltronics.org/ReceiveBAEAModeForm.php"
                    });
                }
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                if (uploadQueue && uploadQueue.length > 0) if (all_media_found) {
                    current_upload_queue = uploadQueue;
                    if (need_authentication) {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", ManageUploadQueueServerSync);
                        Alloy.Globals.createAndOpenControllerExt("UserAuthenticationView");
                    } else ManageUploadQueueServerSync();
                } else {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_missing_media_contents_title"),
                        message: L("missing_media_contents_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        if (0 == e.index) {
                            current_upload_queue = uploadQueue;
                            if (need_authentication) {
                                Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", ManageUploadQueueServerSync);
                                Alloy.Globals.createAndOpenControllerExt("UserAuthenticationView");
                            } else ManageUploadQueueServerSync();
                        } else EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    });
                    alertDialog.show();
                } else alert(L("no_contents_to_upload_msg"));
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function UpdateAuthenticationInfo(e) {
        if (e.auth_done) {
            if (!$.btnLogout.visible) {
                $.btnLogout.visible = true;
                current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle();
                $.lblWelcome.setText(current_logged_username);
                RebuildTable();
            }
        } else {
            Alloy.Globals.ResetSession();
            $.btnLogout.visible = false;
            current_logged_username = L("generic_welcome_offline_text_msg");
            $.lblWelcome.setText(current_logged_username);
        }
    }
    function ManageUploadQueueServerSync() {
        Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "auth:done", ManageUploadQueueServerSync);
        if (!$.btnLogout.visible) {
            $.btnLogout.visible = true;
            current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle();
            $.lblWelcome.setText(current_logged_username);
            RebuildTable();
        }
        var ContentsUploader = require("/ContentsUploader");
        var contentsUploader = new ContentsUploader();
        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        bCanClickOnTableView = false;
        for (var i = 0; i < current_upload_queue.length; i++) current_upload_queue[i].content["SID"] = Alloy.Globals.SessionId;
        var failedToUploadContents = new Array();
        contentsUploader.uploadMultiContents(current_upload_queue, "", $.baeaModeFormsWindow, function(e) {
            try {
                var error_occurred = false;
                var json = e.response_text;
                var response = JSON.parse(json);
                if (200 == e.status) if (true == response.OK) {
                    var recoverDetails = Alloy.createCollection("BAEAForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM BAEAForms where ID = " + e.content_id
                    });
                    var currentForm = recoverDetails.at(0);
                    var user = "";
                    Alloy.Globals.ExistSession() && (user = Alloy.Globals.SessionUsername);
                    currentForm.set({
                        SYNCHRONIZED: "1",
                        USER: user
                    });
                    currentForm.save();
                } else error_occurred = true; else error_occurred = true;
                if (error_occurred) switch (response.ErrorType) {
                  case "Expired":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_expired_err_msg")
                    });
                    break;

                  case "ConnectionError":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_connection_error_err_msg")
                    });
                    break;

                  case "InvalidUser":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_invalid_user_err_msg")
                    });
                    break;

                  case "NoForm":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_no_form_err_msg")
                    });
                    break;

                  case "InsertFormFailed":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_insert_form_failed_err_msg")
                    });
                    break;

                  case "InsertMediaFailed":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_insert_media_failed_err_msg")
                    });
                    break;

                  case "UnexpectedError":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_unexpected_error_err_msg")
                    });
                }
            } catch (exception) {
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            }
        }, function() {
            try {
                current_upload_queue = null;
                RebuildTable();
                if (failedToUploadContents && failedToUploadContents.length > 0) {
                    var message = L("content_upload_error_msg");
                    for (var i = 0; i < failedToUploadContents.length; i++) message = message + "\n" + failedToUploadContents[i].error_msg;
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_content_upload_error_title"),
                        message: message,
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        0 == e.index && OnBtnServerSynch();
                    });
                    alertDialog.show();
                } else alert(L("generic_server_synch_success_msg"));
            } catch (exception) {
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            }
        }, controls, EndAsyncBusyAction_CallBack);
    }
    function EndAsyncBusyAction_CallBack() {
        bCanClickOnTableView = true;
    }
    function OnBtnViewFeatures_Click() {
        try {
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode:view_features_with_login", UpdateAuthenticationInfo);
            Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsViewFeaturesView");
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeForms";
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
    $.__views.baeaModeFormsWindow = Ti.UI.createWindow({
        title: L("baea_mode_forms_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsWindow"
    });
    $.__views.baeaModeFormsWindow && $.addTopLevelView($.__views.baeaModeFormsWindow);
    OnBAEAModeFormsWindow_Close ? $.__views.baeaModeFormsWindow.addEventListener("close", OnBAEAModeFormsWindow_Close) : __defers["$.__views.baeaModeFormsWindow!close!OnBAEAModeFormsWindow_Close"] = true;
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
    $.__views.baeaModeFormsWindow.add($.__views.activity_indicator);
    $.__views.btnLogout = Ti.UI.createButton({
        top: 5,
        left: 5,
        title: L("generic_logout_title"),
        backgroundImage: "/images/logout_normal.png",
        backgroundSelectedImage: "/images/logout_pressed.png",
        backgroundDisabledImage: "/images/logout_disabled.png",
        width: 100,
        height: 30,
        id: "btnLogout"
    });
    $.__views.baeaModeFormsWindow.add($.__views.btnLogout);
    OnBtnLogout_Click ? $.__views.btnLogout.addEventListener("click", OnBtnLogout_Click) : __defers["$.__views.btnLogout!click!OnBtnLogout_Click"] = true;
    $.__views.lblWelcome = Ti.UI.createLabel({
        color: "#000",
        top: 45,
        left: 5,
        font: {
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "left",
        id: "lblWelcome"
    });
    $.__views.baeaModeFormsWindow.add($.__views.lblWelcome);
    $.__views.viewAppButtonViewFeatures = Ti.UI.createView({
        top: 70,
        left: 20,
        width: 60,
        height: 102,
        id: "viewAppButtonViewFeatures"
    });
    $.__views.baeaModeFormsWindow.add($.__views.viewAppButtonViewFeatures);
    $.__views.widgetAppButtonViewFeatures = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonViewFeatures",
        __parentSymbol: $.__views.viewAppButtonViewFeatures
    });
    $.__views.widgetAppButtonViewFeatures.setParent($.__views.viewAppButtonViewFeatures);
    $.__views.viewAppButtonAdd = Ti.UI.createView({
        top: 70,
        width: 60,
        height: 102,
        id: "viewAppButtonAdd"
    });
    $.__views.baeaModeFormsWindow.add($.__views.viewAppButtonAdd);
    $.__views.widgetAppButtonAdd = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonAdd",
        __parentSymbol: $.__views.viewAppButtonAdd
    });
    $.__views.widgetAppButtonAdd.setParent($.__views.viewAppButtonAdd);
    $.__views.viewAppButtonServerSynch = Ti.UI.createView({
        top: 70,
        right: 20,
        width: 60,
        height: 102,
        id: "viewAppButtonServerSynch"
    });
    $.__views.baeaModeFormsWindow.add($.__views.viewAppButtonServerSynch);
    $.__views.widgetAppButtonServerSynch = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonServerSynch",
        __parentSymbol: $.__views.viewAppButtonServerSynch
    });
    $.__views.widgetAppButtonServerSynch.setParent($.__views.viewAppButtonServerSynch);
    $.__views.tableViewBAEAModeForms = Ti.UI.createTableView({
        top: 185,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "tableViewBAEAModeForms"
    });
    $.__views.baeaModeFormsWindow.add($.__views.tableViewBAEAModeForms);
    var __alloyId30 = Alloy.Collections["BAEAForms"] || BAEAForms;
    __alloyId30.on("fetch destroy change add remove reset", __alloyId31);
    OnTableViewForms_Click ? $.__views.tableViewBAEAModeForms.addEventListener("click", OnTableViewForms_Click) : __defers["$.__views.tableViewBAEAModeForms!click!OnTableViewForms_Click"] = true;
    exports.destroy = function() {
        __alloyId30.off("fetch destroy change add remove reset", __alloyId31);
    };
    _.extend($, $.__views);
    var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle();
    var controls = new Array();
    controls.push($.btnLogout);
    controls.push($.tableViewBAEAModeForms);
    controls.push($.widgetAppButtonAdd.get_button());
    controls.push($.widgetAppButtonServerSynch.get_button());
    controls.push($.widgetAppButtonViewFeatures.get_button());
    var bCanClickOnTableView = true;
    var current_upload_queue = null;
    try {
        $.lblWelcome.setText(current_logged_username);
        $.widgetAppButtonAdd.init("/images/add_form_normal.png", "/images/add_form_pressed.png", "/images/add_form_disabled.png", L("generic_add_title"), OnBtnAdd_Click);
        $.widgetAppButtonServerSynch.init("/images/server_synch_normal.png", "/images/server_synch_pressed.png", "/images/server_synch_disabled.png", L("generic_server_synch_title"), OnBtnServerSynch_Click);
        $.widgetAppButtonViewFeatures.init("/images/view_features_normal.png", "/images/view_features_pressed.png", "/images/view_features_disabled.png", L("baea_mode_view_features_view_title"), OnBtnViewFeatures_Click);
        RebuildTable();
        $.baeaModeFormsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.baeaModeFormsWindow!close!OnBAEAModeFormsWindow_Close"] && $.__views.baeaModeFormsWindow.addEventListener("close", OnBAEAModeFormsWindow_Close);
    __defers["$.__views.btnLogout!click!OnBtnLogout_Click"] && $.__views.btnLogout.addEventListener("click", OnBtnLogout_Click);
    __defers["$.__views.tableViewBAEAModeForms!click!OnTableViewForms_Click"] && $.__views.tableViewBAEAModeForms.addEventListener("click", OnTableViewForms_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;