function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId139(e) {
        if (e && e.fromAdapter) return;
        __alloyId139.opts || {};
        var models = __alloyId138.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId133 = models[i];
            __alloyId133.__transform = {};
            var __alloyId134 = Ti.UI.createTableViewRow({
                rowId: "undefined" != typeof __alloyId133.__transform["ID"] ? __alloyId133.__transform["ID"] : __alloyId133.get("ID"),
                hasChild: "true",
                isSynchronized: "undefined" != typeof __alloyId133.__transform["SYNCHRONIZED"] ? __alloyId133.__transform["SYNCHRONIZED"] : __alloyId133.get("SYNCHRONIZED"),
                className: "form_row"
            });
            rows.push(__alloyId134);
            var __alloyId135 = Ti.UI.createImageView({
                left: 5,
                width: 34,
                height: 34,
                image: "/images/check.png"
            });
            __alloyId134.add(__alloyId135);
            var __alloyId136 = Ti.UI.createLabel({
                left: 45,
                height: 40,
                width: 200,
                color: "#000",
                text: "undefined" != typeof __alloyId133.__transform["FORM_NO"] ? __alloyId133.__transform["FORM_NO"] : __alloyId133.get("FORM_NO")
            });
            __alloyId134.add(__alloyId136);
            var __alloyId137 = Ti.UI.createButton({
                color: "black",
                backgroundColor: "red",
                title: L("generic_delete_title"),
                right: 8,
                width: 105,
                clickName: "deleteButton",
                height: 34
            });
            __alloyId134.add(__alloyId137);
        }
        $.__views.tableViewShedModeForms.setData(rows);
    }
    function OnBtnBack_Click() {
        try {
            controls = null;
            $.navigationWindowShedModeForms.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function RebuildTable() {
        if (Alloy.Globals.ExistSession()) Alloy.Collections.ShedForms.fetch({
            query: "SELECT * FROM ShedForms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "'"
        }); else {
            $.btnLogout.visible = false;
            Alloy.Collections.ShedForms.fetch({
                query: "SELECT * FROM ShedForms where USER is null or USER = ''"
            });
        }
        if ($.tableViewShedModeForms.data && $.tableViewShedModeForms.data.length > 0) {
            for (var i = 0; i < $.tableViewShedModeForms.data[0].rows.length; i++) {
                var currentRow = $.tableViewShedModeForms.data[0].rows[i];
                currentRow.children[0].setVisible("1" == currentRow.isSynchronized ? true : false);
            }
            $.tableViewShedModeForms.setVisible(true);
        } else $.tableViewShedModeForms.setVisible(false);
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
    function OnShedModeFormsWindow_Close() {
        $.destroy();
    }
    function OnTableViewForms_Click(e) {
        try {
            bCanClickOnTableView && BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                if ("deleteButton" == e.source.clickName) {
                    if (e.row && e.row.rowId >= 0) {
                        var alertDialogDeleteForm = Titanium.UI.createAlertDialog({
                            title: L("generic_delete_form_title"),
                            message: L("delete_form_msg"),
                            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                            cancel: 1
                        });
                        alertDialogDeleteForm.addEventListener("click", function(event) {
                            if (0 == event.index) {
                                var recoverVideoGallery = Alloy.createCollection("ShedFormsVideos");
                                recoverVideoGallery.fetch({
                                    query: "SELECT VIDEO_PATH FROM ShedFormsVideos where FORM_ID=" + e.row.rowId
                                });
                                if (recoverVideoGallery.length > 0) for (var i = 0; i < recoverVideoGallery.length; i++) {
                                    var video = recoverVideoGallery.at(i);
                                    var video_path = video.get("VIDEO_PATH");
                                    var file = Alloy.Globals.getFileForRead(video_path);
                                    file && file.deleteFile();
                                }
                                var recoverVideo = Alloy.createCollection("ShedFormsVideos");
                                recoverVideo.fetch({
                                    query: "SELECT * FROM ShedFormsVideos where FORM_ID = " + e.row.rowId
                                });
                                while (recoverVideo.length > 0) {
                                    var model = recoverVideo.at(0);
                                    recoverVideo.remove(model);
                                    model.destroy();
                                }
                                var recoverPictureGallery = Alloy.createCollection("ShedFormsImages");
                                recoverPictureGallery.fetch({
                                    query: "SELECT IMAGE_PATH FROM ShedFormsImages where FORM_ID=" + e.row.rowId
                                });
                                if (recoverPictureGallery.length > 0) for (var i = 0; i < recoverPictureGallery.length; i++) {
                                    var image = recoverPictureGallery.at(i);
                                    var image_path = image.get("IMAGE_PATH");
                                    var file = Alloy.Globals.getFileForRead(image_path);
                                    file && file.deleteFile();
                                }
                                var recoverPictures = Alloy.createCollection("ShedFormsImages");
                                recoverPictures.fetch({
                                    query: "SELECT * FROM ShedFormsImages where FORM_ID = " + e.row.rowId
                                });
                                while (recoverPictures.length > 0) {
                                    var model = recoverPictures.at(0);
                                    recoverPictures.remove(model);
                                    model.destroy();
                                }
                                var recoverOtherComments = Alloy.createCollection("ShedFormsOtherComments");
                                recoverOtherComments.fetch({
                                    query: "SELECT * FROM ShedFormsOtherComments where FORM_ID = " + e.row.rowId
                                });
                                if (recoverOtherComments.length > 0) {
                                    var model = recoverOtherComments.at(0);
                                    recoverOtherComments.remove(model);
                                    model.destroy();
                                }
                                var recoverJudgmentOfPracticability = Alloy.createCollection("ShedFormsJudgmentOfPracticability");
                                recoverJudgmentOfPracticability.fetch({
                                    query: "SELECT * FROM ShedFormsJudgmentOfPracticability where FORM_ID = " + e.row.rowId
                                });
                                if (recoverJudgmentOfPracticability.length > 0) {
                                    var model = recoverJudgmentOfPracticability.at(0);
                                    recoverJudgmentOfPracticability.remove(model);
                                    model.destroy();
                                }
                                var recoverDamages = Alloy.createCollection("ShedFormsDamages");
                                recoverDamages.fetch({
                                    query: "SELECT * FROM ShedFormsDamages where FORM_ID = " + e.row.rowId
                                });
                                if (recoverDamages.length > 0) {
                                    var model = recoverDamages.at(0);
                                    recoverDamages.remove(model);
                                    model.destroy();
                                }
                                var recoverInfrastructure = Alloy.createCollection("ShedFormsInfrastructure");
                                recoverInfrastructure.fetch({
                                    query: "SELECT * FROM ShedFormsInfrastructure where FORM_ID = " + e.row.rowId
                                });
                                if (recoverInfrastructure.length > 0) {
                                    var model = recoverInfrastructure.at(0);
                                    recoverInfrastructure.remove(model);
                                    model.destroy();
                                }
                                var recoverShedsCharacteristics = Alloy.createCollection("ShedFormsShedsCharacteristics");
                                recoverShedsCharacteristics.fetch({
                                    query: "SELECT * FROM ShedFormsShedsCharacteristics where FORM_ID = " + e.row.rowId
                                });
                                if (recoverShedsCharacteristics.length > 0) {
                                    var model = recoverShedsCharacteristics.at(0);
                                    recoverShedsCharacteristics.remove(model);
                                    model.destroy();
                                }
                                var recoverShedsPositions = Alloy.createCollection("ShedFormsShedsPositions");
                                recoverShedsPositions.fetch({
                                    query: "SELECT * FROM ShedFormsShedsPositions where FORM_ID = " + e.row.rowId
                                });
                                if (recoverShedsPositions.length > 0) {
                                    var model = recoverShedsPositions.at(0);
                                    recoverShedsPositions.remove(model);
                                    model.destroy();
                                }
                                var recoverForm = Alloy.createCollection("ShedForms");
                                recoverForm.fetch({
                                    query: "SELECT * FROM ShedForms where ID = " + e.row.rowId
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
                            Alloy.Globals.ProtectedAddEventListener(Ti.App, "shed_mode:save", RebuildTable);
                            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsGeneralSection", {
                                form_id: rowId,
                                is_synchronized: isSynchronized
                            });
                        });
                        dialog.show();
                    } else {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "shed_mode:save", RebuildTable);
                        Alloy.Globals.createAndOpenControllerExt("ShedModeFormsGeneralSection", {
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
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "shed_mode:save", RebuildTable);
                Alloy.Globals.createAndOpenControllerExt("ShedModeFormsGeneralSection", {
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
                var ShedModeUtils = require("/ShedModeUtils");
                var uploadQueue = new Array();
                var all_media_found = true;
                var recoverDetails = ShedModeUtils.LoadDetailsQuery();
                if (recoverDetails.length > 0) for (var i = 0; i < recoverDetails.length; i++) {
                    var details = recoverDetails.at(i);
                    var form_id = details.get("ID");
                    var params = {
                        key: "EDAM",
                        ID: form_id,
                        FORM_NO: details.get("FORM_NO"),
                        DATE: details.get("DATE")
                    };
                    var recoverShedsPositions = ShedModeUtils.LoadShedPositionQuery(form_id);
                    var recoverShedCharacteristics = ShedModeUtils.LoadShedCharacteristicsQuery(form_id);
                    var recoverInfrastructure = ShedModeUtils.LoadInfrastructureQuery(form_id);
                    var recoverDamages = ShedModeUtils.LoadDamagesQuery(form_id);
                    var recoverJudgmentOfPracticability = ShedModeUtils.LoadJudgmentOfPracticabilityQuery(form_id);
                    var recoverOtherComments = ShedModeUtils.LoadOtherCommentsQuery(form_id);
                    if (recoverShedsPositions.length > 0) {
                        var shedsPositions = recoverShedsPositions.at(0);
                        params["LATITUDE"] = shedsPositions.get("LATITUDE");
                        params["LONGITUDE"] = shedsPositions.get("LONGITUDE");
                        params["ALTITUDE"] = shedsPositions.get("ALTITUDE");
                        params["PROVINCE"] = shedsPositions.get("PROVINCE");
                        params["MUNICIPALITY"] = shedsPositions.get("MUNICIPALITY");
                        params["PLACE"] = shedsPositions.get("PLACE");
                        params["ADDRESS"] = shedsPositions.get("ADDRESS");
                        params["CIVIC_NO"] = shedsPositions.get("CIVIC_NO");
                    }
                    if (recoverShedCharacteristics.length > 0) {
                        var shedCharacteristics = recoverShedCharacteristics.at(0);
                        params["SITE"] = shedCharacteristics.get("SITE");
                        params["NOT_UNDERGROUND_PLANS_NO"] = shedCharacteristics.get("NOT_UNDERGROUND_PLANS_NO");
                        params["USAGE"] = shedCharacteristics.get("USAGE");
                    }
                    if (recoverInfrastructure.length > 0) {
                        var infrastructure = recoverInfrastructure.at(0);
                        params["PRIMARY_GIRDERS"] = infrastructure.get("PRIMARY_GIRDERS");
                        params["THICKNESS_OF_THE_TILES"] = infrastructure.get("THICKNESS_OF_THE_TILES");
                        params["TYPICAL_LIGHTS"] = infrastructure.get("TYPICAL_LIGHTS");
                        params["COVERAGE"] = infrastructure.get("COVERAGE");
                        params["INCLINATION_OF_THE_ROOF"] = infrastructure.get("INCLINATION_OF_THE_ROOF");
                        params["INFILL_ELEMENTS"] = infrastructure.get("INFILL_ELEMENTS");
                        params["VERTICAL_WALLS"] = infrastructure.get("VERTICAL_WALLS");
                        params["SHELVING"] = infrastructure.get("SHELVING");
                    }
                    if (recoverDamages.length > 0) {
                        var damages = recoverDamages.at(0);
                        params["DAMAGES"] = damages.get("DAMAGES");
                        params["MEASURES_OF_EMERGENCY"] = damages.get("MEASURES_OF_EMERGENCY");
                    }
                    if (recoverJudgmentOfPracticability.length > 0) {
                        var judgmentOfPracticability = recoverJudgmentOfPracticability.at(0);
                        params["STRUCTURAL"] = judgmentOfPracticability.get("STRUCTURAL");
                        params["NOT_STRUCTURAL"] = judgmentOfPracticability.get("NOT_STRUCTURAL");
                        params["EXTERNAL"] = judgmentOfPracticability.get("EXTERNAL");
                        params["GEOTECHNICAL"] = judgmentOfPracticability.get("GEOTECHNICAL");
                        params["OUTCOME_PRACTICABILITY"] = judgmentOfPracticability.get("OUTCOME_PRACTICABILITY");
                        params["HOUSING_UNITS_UNINHABITABLE"] = judgmentOfPracticability.get("HOUSING_UNITS_UNINHABITABLE");
                        params["FAMILIES_EVACUATED"] = judgmentOfPracticability.get("FAMILIES_EVACUATED");
                        params["EVACUEES_N"] = judgmentOfPracticability.get("EVACUEES_N");
                        params["ACCURACY_VISIT"] = judgmentOfPracticability.get("ACCURACY_VISIT");
                        params["OTHER"] = judgmentOfPracticability.get("OTHER");
                    }
                    if (recoverOtherComments.length > 0) {
                        var otherComments = recoverOtherComments.at(0);
                        params["TOPIC"] = otherComments.get("TOPIC");
                        params["OTHER_COMMENTS"] = otherComments.get("OTHER_COMMENTS");
                    }
                    var media_array = ShedModeUtils.CreateMediaArray(form_id, false);
                    if (media_array && media_array.length > 0) {
                        var zipContent = new Array();
                        for (var j = 1; j <= media_array.length; j++) {
                            var media = media_array[j - 1];
                            all_media_found &= media.media_found;
                            if (media.media_found) {
                                zipContent.push(media.media);
                                var fileName = null;
                                fileName = "PIC" == media.type ? media.path.replace(".png", "") : "VID" == media.type ? media.path.replace(".3gp", "") : "";
                                var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), fileName + "_data.dat");
                                newFile.write("Type: " + media.type + "\nLatitude: " + media.latitude + "\nLongitude: " + media.longitude + "\nAddress: " + media.address + "\nHeading: " + media.heading + "\nDamages level: " + media.damages_level + "\nDamages area: " + media.damages_area + "\nComment: " + media.comment);
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
                        url: "https://www.edam.resiltronics.org/ReceiveShedModeForm.php"
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
        contentsUploader.uploadMultiContents(current_upload_queue, "", $.shedModeFormsWindow, function(e) {
            try {
                var error_occurred = false;
                var json = e.response_text;
                var response = JSON.parse(json);
                if (200 == e.status) if (true == response.OK) {
                    var recoverDetails = Alloy.createCollection("ShedForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM ShedForms where ID = " + e.content_id
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
    function OnBtnEditTeamData_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                Alloy.Globals.createAndOpenControllerExt("ShedPersonalData");
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            bCanClickOnTableView = true;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeForms";
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
    $.__views.shedModeFormsWindow = Ti.UI.createWindow({
        title: L("aedes_mode_forms_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeFormsWindow"
    });
    OnShedModeFormsWindow_Close ? $.__views.shedModeFormsWindow.addEventListener("close", OnShedModeFormsWindow_Close) : __defers["$.__views.shedModeFormsWindow!close!OnShedModeFormsWindow_Close"] = true;
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.shedModeFormsWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.shedModeFormsWindow.add($.__views.activity_indicator);
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
    $.__views.shedModeFormsWindow.add($.__views.btnLogout);
    OnBtnLogout_Click ? $.__views.btnLogout.addEventListener("click", OnBtnLogout_Click) : __defers["$.__views.btnLogout!click!OnBtnLogout_Click"] = true;
    $.__views.lblWelcome = Ti.UI.createLabel({
        width: 290,
        height: 22,
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
    $.__views.shedModeFormsWindow.add($.__views.lblWelcome);
    $.__views.viewAppButtonETD = Ti.UI.createView({
        top: 70,
        left: 20,
        width: 60,
        height: 102,
        id: "viewAppButtonETD"
    });
    $.__views.shedModeFormsWindow.add($.__views.viewAppButtonETD);
    $.__views.widgetAppButtonETD = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonETD",
        __parentSymbol: $.__views.viewAppButtonETD
    });
    $.__views.widgetAppButtonETD.setParent($.__views.viewAppButtonETD);
    $.__views.viewAppButtonAdd = Ti.UI.createView({
        top: 70,
        width: 60,
        height: 102,
        id: "viewAppButtonAdd"
    });
    $.__views.shedModeFormsWindow.add($.__views.viewAppButtonAdd);
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
    $.__views.shedModeFormsWindow.add($.__views.viewAppButtonServerSynch);
    $.__views.widgetAppButtonServerSynch = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonServerSynch",
        __parentSymbol: $.__views.viewAppButtonServerSynch
    });
    $.__views.widgetAppButtonServerSynch.setParent($.__views.viewAppButtonServerSynch);
    $.__views.tableViewShedModeForms = Ti.UI.createTableView({
        top: 185,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "tableViewShedModeForms"
    });
    $.__views.shedModeFormsWindow.add($.__views.tableViewShedModeForms);
    var __alloyId138 = Alloy.Collections["ShedForms"] || ShedForms;
    __alloyId138.on("fetch destroy change add remove reset", __alloyId139);
    OnTableViewForms_Click ? $.__views.tableViewShedModeForms.addEventListener("click", OnTableViewForms_Click) : __defers["$.__views.tableViewShedModeForms!click!OnTableViewForms_Click"] = true;
    $.__views.navigationWindowShedModeForms = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.shedModeFormsWindow,
        id: "navigationWindowShedModeForms"
    });
    $.__views.navigationWindowShedModeForms && $.addTopLevelView($.__views.navigationWindowShedModeForms);
    exports.destroy = function() {
        __alloyId138.off("fetch destroy change add remove reset", __alloyId139);
    };
    _.extend($, $.__views);
    var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle();
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.btnLogout);
    controls.push($.tableViewShedModeForms);
    controls.push($.widgetAppButtonAdd.get_button());
    controls.push($.widgetAppButtonServerSynch.get_button());
    controls.push($.widgetAppButtonETD.get_button());
    var bCanClickOnTableView = true;
    var current_upload_queue = null;
    try {
        $.lblWelcome.setText(current_logged_username);
        $.widgetAppButtonAdd.init("/images/add_form_normal.png", "/images/add_form_pressed.png", "/images/add_form_disabled.png", L("generic_add_title"), OnBtnAdd_Click);
        $.widgetAppButtonServerSynch.init("/images/server_synch_normal.png", "/images/server_synch_pressed.png", "/images/server_synch_disabled.png", L("generic_server_synch_title"), OnBtnServerSynch_Click);
        $.widgetAppButtonETD.init("/images/edit_team_normal.png", "/images/edit_team_pressed.png", "/images/edit_team_disabled.png", L("aedes_mode_edit_user_data"), OnBtnEditTeamData_Click);
        $.widgetAppButtonETD.set_label_height(42);
        RebuildTable();
        $.navigationWindowShedModeForms.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.shedModeFormsWindow!close!OnShedModeFormsWindow_Close"] && $.__views.shedModeFormsWindow.addEventListener("close", OnShedModeFormsWindow_Close);
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btnLogout!click!OnBtnLogout_Click"] && $.__views.btnLogout.addEventListener("click", OnBtnLogout_Click);
    __defers["$.__views.tableViewShedModeForms!click!OnTableViewForms_Click"] && $.__views.tableViewShedModeForms.addEventListener("click", OnTableViewForms_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;