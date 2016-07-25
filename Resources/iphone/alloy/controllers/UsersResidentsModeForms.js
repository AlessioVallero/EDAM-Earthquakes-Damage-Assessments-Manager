function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId183(e) {
        if (e && e.fromAdapter) return;
        __alloyId183.opts || {};
        var models = __alloyId182.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId177 = models[i];
            __alloyId177.__transform = {};
            var __alloyId178 = Ti.UI.createTableViewRow({
                rowId: "undefined" != typeof __alloyId177.__transform["ID"] ? __alloyId177.__transform["ID"] : __alloyId177.get("ID"),
                isSynchronized: "undefined" != typeof __alloyId177.__transform["SYNCHRONIZED"] ? __alloyId177.__transform["SYNCHRONIZED"] : __alloyId177.get("SYNCHRONIZED"),
                hasChild: "true",
                className: "form_row"
            });
            rows.push(__alloyId178);
            var __alloyId179 = Ti.UI.createImageView({
                left: 5,
                width: 34,
                height: 34,
                image: "/images/check.png"
            });
            __alloyId178.add(__alloyId179);
            var __alloyId180 = Ti.UI.createLabel({
                left: 45,
                height: 40,
                width: 200,
                color: "#000",
                text: "undefined" != typeof __alloyId177.__transform["FORM_NO"] ? __alloyId177.__transform["FORM_NO"] : __alloyId177.get("FORM_NO")
            });
            __alloyId178.add(__alloyId180);
            var __alloyId181 = Ti.UI.createButton({
                color: "black",
                backgroundColor: "red",
                title: L("generic_delete_title"),
                right: 8,
                width: 105,
                clickName: "deleteButton",
                height: 34
            });
            __alloyId178.add(__alloyId181);
        }
        $.__views.tableViewUsersResidentsModeForms.setData(rows);
    }
    function OnBtnBack_Click() {
        try {
            controls = null;
            $.navigationWindowUsersResidentsModeForms.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function RebuildTable() {
        if (Alloy.Globals.ExistSession()) Alloy.Collections.UsersResidentsForms.fetch({
            query: "SELECT * FROM UsersResidentsForms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "'"
        }); else {
            $.btnLogout.visible = false;
            Alloy.Collections.UsersResidentsForms.fetch({
                query: "SELECT * FROM UsersResidentsForms where USER is null or USER = ''"
            });
        }
        if ($.tableViewUsersResidentsModeForms.data && $.tableViewUsersResidentsModeForms.data.length > 0) {
            for (var i = 0; i < $.tableViewUsersResidentsModeForms.data[0].rows.length; i++) {
                var currentRow = $.tableViewUsersResidentsModeForms.data[0].rows[i];
                currentRow.children[0].setVisible("1" == currentRow.isSynchronized ? true : false);
            }
            $.tableViewUsersResidentsModeForms.setVisible(true);
        } else $.tableViewUsersResidentsModeForms.setVisible(false);
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
    function OnUsersResidentsModeFormsWindow_Close() {
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
                                var recoverVideoGallery = Alloy.createCollection("UsersResidentsFormsVideos");
                                recoverVideoGallery.fetch({
                                    query: "SELECT VIDEO_PATH FROM UsersResidentsFormsVideos where FORM_ID=" + e.row.rowId
                                });
                                if (recoverVideoGallery.length > 0) for (var i = 0; i < recoverVideoGallery.length; i++) {
                                    var video = recoverVideoGallery.at(i);
                                    var video_path = video.get("VIDEO_PATH");
                                    var file = Alloy.Globals.getFileForRead(video_path);
                                    file && file.deleteFile();
                                }
                                var recoverVideo = Alloy.createCollection("UsersResidentsFormsVideos");
                                recoverVideo.fetch({
                                    query: "SELECT * FROM UsersResidentsFormsVideos where FORM_ID = " + e.row.rowId
                                });
                                while (recoverVideo.length > 0) {
                                    var model = recoverVideo.at(0);
                                    recoverVideo.remove(model);
                                    model.destroy();
                                }
                                var recoverPictureGallery = Alloy.createCollection("UsersResidentsFormsImages");
                                recoverPictureGallery.fetch({
                                    query: "SELECT IMAGE_PATH FROM UsersResidentsFormsImages where FORM_ID=" + e.row.rowId
                                });
                                if (recoverPictureGallery.length > 0) for (var i = 0; i < recoverPictureGallery.length; i++) {
                                    var image = recoverPictureGallery.at(i);
                                    var image_path = image.get("IMAGE_PATH");
                                    var file = Alloy.Globals.getFileForRead(image_path);
                                    file && file.deleteFile();
                                }
                                var recoverPictures = Alloy.createCollection("UsersResidentsFormsImages");
                                recoverPictures.fetch({
                                    query: "SELECT * FROM UsersResidentsFormsImages where FORM_ID = " + e.row.rowId
                                });
                                while (recoverPictures.length > 0) {
                                    var model = recoverPictures.at(0);
                                    recoverPictures.remove(model);
                                    model.destroy();
                                }
                                var recoverInfrastructure = Alloy.createCollection("UsersResidentsFormsInfrastructure");
                                recoverInfrastructure.fetch({
                                    query: "SELECT * FROM UsersResidentsFormsInfrastructure where FORM_ID = " + e.row.rowId
                                });
                                if (recoverInfrastructure.length > 0) {
                                    var model = recoverInfrastructure.at(0);
                                    recoverInfrastructure.remove(model);
                                    model.destroy();
                                }
                                var recoverBuildingsCharacteristics = Alloy.createCollection("UsersResidentsFormsBuildingsCharacteristics");
                                recoverBuildingsCharacteristics.fetch({
                                    query: "SELECT * FROM UsersResidentsFormsBuildingsCharacteristics where FORM_ID = " + e.row.rowId
                                });
                                if (recoverBuildingsCharacteristics.length > 0) {
                                    var model = recoverBuildingsCharacteristics.at(0);
                                    recoverBuildingsCharacteristics.remove(model);
                                    model.destroy();
                                }
                                var recoverBuildingsPositions = Alloy.createCollection("UsersResidentsFormsBuildingsPositions");
                                recoverBuildingsPositions.fetch({
                                    query: "SELECT * FROM UsersResidentsFormsBuildingsPositions where FORM_ID = " + e.row.rowId
                                });
                                if (recoverBuildingsPositions.length > 0) {
                                    var model = recoverBuildingsPositions.at(0);
                                    recoverBuildingsPositions.remove(model);
                                    model.destroy();
                                }
                                var recoverForm = Alloy.createCollection("UsersResidentsForms");
                                recoverForm.fetch({
                                    query: "SELECT * FROM UsersResidentsForms where ID = " + e.row.rowId
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
                            Alloy.Globals.ProtectedAddEventListener(Ti.App, "users_residents_mode:save", RebuildTable);
                            Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeFormsGeneralSection", {
                                form_id: rowId,
                                is_synchronized: isSynchronized
                            });
                        });
                        dialog.show();
                    } else {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "users_residents_mode:save", RebuildTable);
                        Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeFormsGeneralSection", {
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
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "users_residents_mode:save", RebuildTable);
                Alloy.Globals.createAndOpenControllerExt("UsersResidentsModeFormsGeneralSection", {
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
                var UsersResidentsModeUtils = require("/UsersResidentsModeUtils");
                var uploadQueue = new Array();
                var all_media_found = true;
                var recoverDetails = UsersResidentsModeUtils.LoadDetailsQuery();
                if (recoverDetails.length > 0) for (var i = 0; i < recoverDetails.length; i++) {
                    var details = recoverDetails.at(i);
                    var form_id = details.get("ID");
                    var params = {
                        key: "EDAM",
                        ID: form_id,
                        FORM_NO: details.get("FORM_NO"),
                        DATE: details.get("DATE")
                    };
                    var recoverBuildingsPositions = UsersResidentsModeUtils.LoadBuildingPositionQuery(form_id);
                    var recoverBuildingCharacteristics = UsersResidentsModeUtils.LoadBuildingCharacteristicsQuery(form_id);
                    var recoverInfrastructure = UsersResidentsModeUtils.LoadInfrastructureQuery(form_id);
                    if (recoverBuildingsPositions.length > 0) {
                        var buildingsPositions = recoverBuildingsPositions.at(0);
                        params["LATITUDE"] = buildingsPositions.get("LATITUDE");
                        params["LONGITUDE"] = buildingsPositions.get("LONGITUDE");
                        params["ALTITUDE"] = buildingsPositions.get("ALTITUDE");
                        params["PROVINCE"] = buildingsPositions.get("PROVINCE");
                        params["MUNICIPALITY"] = buildingsPositions.get("MUNICIPALITY");
                        params["PLACE"] = buildingsPositions.get("PLACE");
                        params["ADDRESS"] = buildingsPositions.get("ADDRESS");
                        params["CIVIC_NO"] = buildingsPositions.get("CIVIC_NO");
                        params["COMPILER_POS"] = buildingsPositions.get("COMPILER_POS");
                    }
                    if (recoverBuildingCharacteristics.length > 0) {
                        var buildingCharacteristics = recoverBuildingCharacteristics.at(0);
                        params["SITE"] = buildingCharacteristics.get("SITE");
                        params["UNDERGROUND_PLANS_NO"] = buildingCharacteristics.get("UNDERGROUND_PLANS_NO");
                        params["NOT_UNDERGROUND_PLANS_NO"] = buildingCharacteristics.get("NOT_UNDERGROUND_PLANS_NO");
                        params["USAGE"] = buildingCharacteristics.get("USAGE");
                    }
                    if (recoverInfrastructure.length > 0) {
                        var infrastructure = recoverInfrastructure.at(0);
                        params["GROUND_BREAKS"] = infrastructure.get("GROUND_BREAKS");
                        params["WATER_LEAKS"] = infrastructure.get("WATER_LEAKS");
                        params["GAS_LEAKS"] = infrastructure.get("GAS_LEAKS");
                        params["ELECTRIC_CURRENT_OPERATION"] = infrastructure.get("ELECTRIC_CURRENT_OPERATION");
                    }
                    var media_array = UsersResidentsModeUtils.CreateMediaArray(form_id, false);
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
                        url: "https://www.edam.resiltronics.org/ReceiveUsersResidentsModeForm.php"
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
        contentsUploader.uploadMultiContents(current_upload_queue, "", $.usersResidentsModeFormsWindow, function(e) {
            try {
                var error_occurred = false;
                var json = e.response_text;
                var response = JSON.parse(json);
                if (200 == e.status) if (true == response.OK) {
                    var recoverDetails = Alloy.createCollection("UsersResidentsForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM UsersResidentsForms where ID = " + e.content_id
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
    function OnBtnEditUserData_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                Alloy.Globals.createAndOpenControllerExt("UsersResidentsPersonalData");
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
    this.__controllerPath = "UsersResidentsModeForms";
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
    $.__views.usersResidentsModeFormsWindow = Ti.UI.createWindow({
        title: L("users_residents_mode_forms_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsModeFormsWindow"
    });
    OnUsersResidentsModeFormsWindow_Close ? $.__views.usersResidentsModeFormsWindow.addEventListener("close", OnUsersResidentsModeFormsWindow_Close) : __defers["$.__views.usersResidentsModeFormsWindow!close!OnUsersResidentsModeFormsWindow_Close"] = true;
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.usersResidentsModeFormsWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.usersResidentsModeFormsWindow.add($.__views.activity_indicator);
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
    $.__views.usersResidentsModeFormsWindow.add($.__views.btnLogout);
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
    $.__views.usersResidentsModeFormsWindow.add($.__views.lblWelcome);
    $.__views.viewAppButtonEUD = Ti.UI.createView({
        top: 70,
        left: 20,
        width: 60,
        height: 102,
        id: "viewAppButtonEUD"
    });
    $.__views.usersResidentsModeFormsWindow.add($.__views.viewAppButtonEUD);
    $.__views.widgetAppButtonEUD = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonEUD",
        __parentSymbol: $.__views.viewAppButtonEUD
    });
    $.__views.widgetAppButtonEUD.setParent($.__views.viewAppButtonEUD);
    $.__views.viewAppButtonAdd = Ti.UI.createView({
        top: 70,
        width: 60,
        height: 102,
        id: "viewAppButtonAdd"
    });
    $.__views.usersResidentsModeFormsWindow.add($.__views.viewAppButtonAdd);
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
    $.__views.usersResidentsModeFormsWindow.add($.__views.viewAppButtonServerSynch);
    $.__views.widgetAppButtonServerSynch = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonServerSynch",
        __parentSymbol: $.__views.viewAppButtonServerSynch
    });
    $.__views.widgetAppButtonServerSynch.setParent($.__views.viewAppButtonServerSynch);
    $.__views.tableViewUsersResidentsModeForms = Ti.UI.createTableView({
        top: 185,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "tableViewUsersResidentsModeForms"
    });
    $.__views.usersResidentsModeFormsWindow.add($.__views.tableViewUsersResidentsModeForms);
    var __alloyId182 = Alloy.Collections["UsersResidentsForms"] || UsersResidentsForms;
    __alloyId182.on("fetch destroy change add remove reset", __alloyId183);
    OnTableViewForms_Click ? $.__views.tableViewUsersResidentsModeForms.addEventListener("click", OnTableViewForms_Click) : __defers["$.__views.tableViewUsersResidentsModeForms!click!OnTableViewForms_Click"] = true;
    $.__views.navigationWindowUsersResidentsModeForms = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.usersResidentsModeFormsWindow,
        id: "navigationWindowUsersResidentsModeForms"
    });
    $.__views.navigationWindowUsersResidentsModeForms && $.addTopLevelView($.__views.navigationWindowUsersResidentsModeForms);
    exports.destroy = function() {
        __alloyId182.off("fetch destroy change add remove reset", __alloyId183);
    };
    _.extend($, $.__views);
    var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle();
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.btnLogout);
    controls.push($.tableViewUsersResidentsModeForms);
    controls.push($.widgetAppButtonAdd.get_button());
    controls.push($.widgetAppButtonServerSynch.get_button());
    controls.push($.widgetAppButtonEUD.get_button());
    var bCanClickOnTableView = true;
    var current_upload_queue = null;
    try {
        $.lblWelcome.setText(current_logged_username);
        $.widgetAppButtonAdd.init("/images/add_form_normal.png", "/images/add_form_pressed.png", "/images/add_form_disabled.png", L("generic_add_title"), OnBtnAdd_Click);
        $.widgetAppButtonServerSynch.init("/images/server_synch_normal.png", "/images/server_synch_pressed.png", "/images/server_synch_disabled.png", L("generic_server_synch_title"), OnBtnServerSynch_Click);
        $.widgetAppButtonEUD.init("/images/edit_user_data_normal.png", "/images/edit_user_data_pressed.png", "/images/edit_user_data_disabled.png", L("users_residents_mode_edit_user_data"), OnBtnEditUserData_Click);
        $.widgetAppButtonEUD.set_label_height(42);
        RebuildTable();
        $.navigationWindowUsersResidentsModeForms.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.usersResidentsModeFormsWindow!close!OnUsersResidentsModeFormsWindow_Close"] && $.__views.usersResidentsModeFormsWindow.addEventListener("close", OnUsersResidentsModeFormsWindow_Close);
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btnLogout!click!OnBtnLogout_Click"] && $.__views.btnLogout.addEventListener("click", OnBtnLogout_Click);
    __defers["$.__views.tableViewUsersResidentsModeForms!click!OnTableViewForms_Click"] && $.__views.tableViewUsersResidentsModeForms.addEventListener("click", OnTableViewForms_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;