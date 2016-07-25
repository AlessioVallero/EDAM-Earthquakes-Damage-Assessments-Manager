function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId8(e) {
        if (e && e.fromAdapter) return;
        __alloyId8.opts || {};
        var models = __alloyId7.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId0 = models[i];
            __alloyId0.__transform = {};
            var __alloyId2 = Ti.UI.createTableViewRow({
                hasChild: "true",
                rowId: "undefined" != typeof __alloyId0.__transform["ID"] ? __alloyId0.__transform["ID"] : __alloyId0.get("ID"),
                formType: "undefined" != typeof __alloyId0.__transform["TYPE"] ? __alloyId0.__transform["TYPE"] : __alloyId0.get("TYPE"),
                isSynchronized: "undefined" != typeof __alloyId0.__transform["SYNCHRONIZED"] ? __alloyId0.__transform["SYNCHRONIZED"] : __alloyId0.get("SYNCHRONIZED"),
                className: "form_row"
            });
            rows.push(__alloyId2);
            var __alloyId3 = Ti.UI.createImageView({
                left: 5,
                width: 34,
                height: 34,
                image: "/images/check.png"
            });
            __alloyId2.add(__alloyId3);
            var __alloyId4 = Ti.UI.createLabel({
                left: 45,
                height: 40,
                width: 80,
                color: "#000",
                text: "undefined" != typeof __alloyId0.__transform["ID"] ? __alloyId0.__transform["ID"] : __alloyId0.get("ID")
            });
            __alloyId2.add(__alloyId4);
            var __alloyId5 = Ti.UI.createImageView({
                left: 130,
                width: 34,
                height: 34
            });
            __alloyId2.add(__alloyId5);
            var __alloyId6 = Ti.UI.createButton({
                color: "black",
                backgroundColor: "red",
                title: L("generic_delete_title"),
                right: 8,
                width: 105,
                clickName: "deleteButton",
                height: 34
            });
            __alloyId2.add(__alloyId6);
        }
        $.__views.tableViewATC20ModeForms.setData(rows);
    }
    function RebuildTable() {
        if (Alloy.Globals.ExistSession()) Alloy.Collections.ATC20Forms.fetch({
            query: "SELECT * FROM ATC20Forms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "' and MODE='" + current_mode + "'"
        }); else {
            $.btnLogout.visible = false;
            Alloy.Collections.ATC20Forms.fetch({
                query: "SELECT * FROM ATC20Forms where USER is null or USER = '' and MODE='" + current_mode + "'"
            });
        }
        if ($.tableViewATC20ModeForms.data && $.tableViewATC20ModeForms.data.length > 0) {
            var detailedImg = "";
            var rapidImg = "";
            if ("CA" == current_mode || "NEPAL" == current_mode) {
                detailedImg = "/images/detailed.png";
                rapidImg = "/images/rapid.png";
            } else if ("NZ" == current_mode) {
                detailedImg = "/images/level2.png";
                rapidImg = "/images/level1.png";
            }
            for (var i = 0; i < $.tableViewATC20ModeForms.data[0].rows.length; i++) {
                var currentRow = $.tableViewATC20ModeForms.data[0].rows[i];
                currentRow.children[0].setVisible("1" == currentRow.isSynchronized ? true : false);
                currentRow.children[2].setImage("0" == currentRow.formType ? detailedImg : rapidImg);
            }
            $.tableViewATC20ModeForms.setVisible(true);
        } else $.tableViewATC20ModeForms.setVisible(false);
    }
    function UpdateAuthenticationInfo(auth_done) {
        if (auth_done) {
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
    function ManageExportCSV() {
        Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "auth:done", ManageExportCSV);
        UpdateAuthenticationInfo(true);
        try {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: L("generic_export_csv_type_title"),
                message: L("export_csv_type_msg"),
                buttonNames: [ L("generic_complete_export_csv_msg"), L("generic_current_user_export_csv_msg") ],
                cancel: 1
            });
            alertDialog.addEventListener("click", function(e) {
                var loader = Titanium.Network.createHTTPClient();
                loader.validatesSecureCertificate = false;
                loader.onload = function() {
                    if (this.responseText && "ERROR_" != this.responseText.substring(0, 6)) {
                        var fileExportCSV = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), "fieldnotes.csv");
                        fileExportCSV.exists() && fileExportCSV.deleteFile();
                        fileExportCSV.write(this.responseData);
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        var emailDialog = Ti.UI.createEmailDialog();
                        if (emailDialog.isSupported()) {
                            emailDialog.subject = L("send_export_csv_dlg_subject");
                            emailDialog.addAttachment(fileExportCSV);
                            emailDialog.messageBody = L("generic_export_csv_your_export_text_msg");
                            emailDialog.open();
                        } else alert(L("no_email_client_configured_msg"));
                    } else {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        switch (this.responseText) {
                          case "ERROR_CODE_1":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg"));
                            break;

                          case "ERROR_CODE_2":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_expired_err_msg"));
                            break;

                          case "ERROR_CODE_3":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_connection_error_err_msg"));
                            break;

                          case "ERROR_CODE_4":
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_invalid_user_err_msg"));
                        }
                    }
                };
                loader.onerror = function(e) {
                    EndAsyncBusyAction($.activity_indicator, controls);
                    Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                };
                var params = {
                    key: "EDAM",
                    SID: Alloy.Globals.SessionId,
                    ALL_USERS: 0 == e.index ? "true" : "false"
                };
                loader.timeout = Alloy.Globals.ATC20ExportCSVTimeoutMillisecs;
                loader.open("POST", "https://www.edam.resiltronics.org/ATC20NepalExportCSV.php");
                loader.send(params);
            });
            alertDialog.show();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        }
    }
    function ExportCSV(need_authentication) {
        try {
            need_authentication && UpdateAuthenticationInfo(false);
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                if (need_authentication) {
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", ManageExportCSV);
                    Alloy.Globals.createAndOpenControllerExt("UserAuthenticationView");
                } else ManageExportCSV();
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnExportCSV_Click() {
        try {
            bCanClickOnTableView && (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                bIsWorkInProgress = true;
                if (Alloy.Globals.ExistSession()) {
                    var loader = Titanium.Network.createHTTPClient();
                    loader.validatesSecureCertificate = false;
                    loader.onload = function() {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        ExportCSV("Expired" == this.responseText);
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
                    ExportCSV(true);
                }
                return bRet;
            }, EndAsyncBusyAction_CallBack));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            bCanClickOnTableView = true;
            bIsWorkInProgress = false;
        }
    }
    function OnATC20ModeFormsWindow_Close() {
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
                                var recoverVideoGallery = Alloy.createCollection("ATC20FormsVideos");
                                recoverVideoGallery.fetch({
                                    query: "SELECT VIDEO_PATH FROM ATC20FormsVideos where FORM_ID=" + e.row.rowId
                                });
                                if (recoverVideoGallery.length > 0) for (var i = 0; i < recoverVideoGallery.length; i++) {
                                    var video = recoverVideoGallery.at(i);
                                    var video_path = video.get("VIDEO_PATH");
                                    var file = Alloy.Globals.getFileForRead(video_path);
                                    file && file.deleteFile();
                                }
                                var recoverVideo = Alloy.createCollection("ATC20FormsVideos");
                                recoverVideo.fetch({
                                    query: "SELECT * FROM ATC20FormsVideos where FORM_ID = " + e.row.rowId
                                });
                                while (recoverVideo.length > 0) {
                                    var model = recoverVideo.at(0);
                                    recoverVideo.remove(model);
                                    model.destroy();
                                }
                                var recoverPictureGallery = Alloy.createCollection("ATC20FormsImages");
                                recoverPictureGallery.fetch({
                                    query: "SELECT IMAGE_PATH FROM ATC20FormsImages where FORM_ID=" + e.row.rowId
                                });
                                if (recoverPictureGallery.length > 0) for (var i = 0; i < recoverPictureGallery.length; i++) {
                                    var image = recoverPictureGallery.at(i);
                                    var image_path = image.get("IMAGE_PATH");
                                    var file = Alloy.Globals.getFileForRead(image_path);
                                    file && file.deleteFile();
                                }
                                var recoverPictures = Alloy.createCollection("ATC20FormsImages");
                                recoverPictures.fetch({
                                    query: "SELECT * FROM ATC20FormsImages where FORM_ID = " + e.row.rowId
                                });
                                while (recoverPictures.length > 0) {
                                    var model = recoverPictures.at(0);
                                    recoverPictures.remove(model);
                                    model.destroy();
                                }
                                var recoverBuildingDescription = Alloy.createCollection("ATC20FormsBuildingDescription");
                                recoverBuildingDescription.fetch({
                                    query: "SELECT * FROM ATC20FormsBuildingDescription where FORM_ID = " + e.row.rowId
                                });
                                if (recoverBuildingDescription.length > 0) {
                                    var model = recoverBuildingDescription.at(0);
                                    recoverBuildingDescription.remove(model);
                                    model.destroy();
                                }
                                if (e.row.formType && "0" == e.row.formType) {
                                    var recoverDetailedEvaluation = Alloy.createCollection("ATC20FormsDetailedEvaluation");
                                    recoverDetailedEvaluation.fetch({
                                        query: "SELECT * FROM ATC20FormsDetailedEvaluation where FORM_ID = " + e.row.rowId
                                    });
                                    if (recoverDetailedEvaluation.length > 0) {
                                        var model = recoverDetailedEvaluation.at(0);
                                        if (model["SKETCH_PATH"]) {
                                            var file = Alloy.Globals.getFileForRead(model["SKETCH_PATH"]);
                                            file && file.deleteFile();
                                        }
                                        recoverDetailedEvaluation.remove(model);
                                        model.destroy();
                                    }
                                    var recoverDetailedPosting = Alloy.createCollection("ATC20FormsDetailedPosting");
                                    recoverDetailedPosting.fetch({
                                        query: "SELECT * FROM ATC20FormsDetailedPosting where FORM_ID = " + e.row.rowId
                                    });
                                    if (recoverDetailedPosting.length > 0) {
                                        var model = recoverDetailedPosting.at(0);
                                        recoverDetailedPosting.remove(model);
                                        model.destroy();
                                    }
                                } else {
                                    var recoverRapidEvaluation = Alloy.createCollection("ATC20FormsRapidEvaluation");
                                    recoverRapidEvaluation.fetch({
                                        query: "SELECT * FROM ATC20FormsRapidEvaluation where FORM_ID = " + e.row.rowId
                                    });
                                    if (recoverRapidEvaluation.length > 0) {
                                        var model = recoverRapidEvaluation.at(0);
                                        recoverRapidEvaluation.remove(model);
                                        model.destroy();
                                    }
                                    var recoverRapidPosting = Alloy.createCollection("ATC20FormsRapidPosting");
                                    recoverRapidPosting.fetch({
                                        query: "SELECT * FROM ATC20FormsRapidPosting where FORM_ID = " + e.row.rowId
                                    });
                                    if (recoverRapidPosting.length > 0) {
                                        var model = recoverRapidPosting.at(0);
                                        recoverRapidPosting.remove(model);
                                        model.destroy();
                                    }
                                }
                                var recoverFurtherActions = Alloy.createCollection("ATC20FormsFurtherActions");
                                recoverFurtherActions.fetch({
                                    query: "SELECT * FROM ATC20FormsFurtherActions where FORM_ID = " + e.row.rowId
                                });
                                if (recoverFurtherActions.length > 0) {
                                    var model = recoverFurtherActions.at(0);
                                    recoverFurtherActions.remove(model);
                                    model.destroy();
                                }
                                var recoverForm = Alloy.createCollection("ATC20Forms");
                                recoverForm.fetch({
                                    query: "SELECT * FROM ATC20Forms where ID = " + e.row.rowId
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
                            Alloy.Globals.ProtectedAddEventListener(Ti.App, "atc20_mode:save", RebuildTable);
                            Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsGeneralSection", {
                                mode: current_mode,
                                form_id: rowId,
                                is_synchronized: isSynchronized,
                                atc20_type: e.row.formType
                            });
                        });
                        dialog.show();
                    } else {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "atc20_mode:save", RebuildTable);
                        Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsGeneralSection", {
                            mode: current_mode,
                            form_id: rowId,
                            is_synchronized: isSynchronized,
                            atc20_type: e.row.formType
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
                var optionDlgTitle = "";
                var detailedOption = "";
                var rapidOption = "";
                if ("CA" == current_mode) {
                    optionDlgTitle = L("atc20_type_selection_title");
                    detailedOption = L("atc20_detailed_msg");
                    rapidOption = L("atc20_rapid_msg");
                } else if ("NZ" == current_mode) {
                    optionDlgTitle = L("atc20_nz_type_selection_title");
                    detailedOption = L("atc20_nz_detailed_msg");
                    rapidOption = L("atc20_nz_rapid_msg");
                } else if ("NEPAL" == current_mode) {
                    optionDlgTitle = L("atc20_nepal_type_selection_title");
                    detailedOption = L("atc20_nepal_detailed_msg");
                    rapidOption = L("atc20_nepal_rapid_msg");
                }
                var optionDialog = Ti.UI.createOptionDialog({
                    title: optionDlgTitle,
                    cancel: 2,
                    options: [ detailedOption, rapidOption, L("generic_cancel_btn_title") ],
                    selectedIndex: 0
                });
                optionDialog.addEventListener("click", function(e) {
                    if (2 == e.index) ; else {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "atc20_mode:save", RebuildTable);
                        Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsGeneralSection", {
                            mode: current_mode,
                            form_id: -1,
                            is_synchronized: "0",
                            atc20_type: e.index
                        });
                    }
                });
                optionDialog.show();
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
                var ATC20ModeUtils = require("/ATC20ModeUtils");
                var uploadQueue = new Array();
                var all_media_found = true;
                var recoverInspection = ATC20ModeUtils.LoadInspectionQuery(null, current_mode);
                if (recoverInspection.length > 0) for (var i = 0; i < recoverInspection.length; i++) {
                    var inspection = recoverInspection.at(i);
                    var form_id = inspection.get("ID");
                    var form_type = inspection.get("TYPE");
                    var params = {
                        key: "EDAM",
                        ID: form_id,
                        INSPECTOR_ID: inspection.get("INSPECTOR_ID"),
                        DATE: inspection.get("DATE"),
                        FINAL_POSTING: inspection.get("FINAL_POSTING"),
                        AFFILIATION: inspection.get("AFFILIATION"),
                        MODE: inspection.get("MODE")
                    };
                    var recoverBuildingDescription = ATC20ModeUtils.LoadBuildingDescriptionQuery(form_id);
                    if (recoverBuildingDescription.length > 0) {
                        var buildingDescription = recoverBuildingDescription.at(0);
                        params["BUILDING_NAME"] = buildingDescription.get("BUILDING_NAME");
                        params["ALSO_KNOWN_AS"] = buildingDescription.get("ALSO_KNOWN_AS");
                        params["LOT"] = buildingDescription.get("LOT");
                        params["DP"] = buildingDescription.get("DP");
                        params["OTHER_ID"] = buildingDescription.get("OTHER_ID");
                        params["CONTACT_NAME"] = buildingDescription.get("CONTACT_NAME");
                        params["ADDRESS"] = buildingDescription.get("ADDRESS");
                        params["BUILDING_CONTACT"] = buildingDescription.get("BUILDING_CONTACT");
                        params["UNDERGROUND_PLANS_NO"] = buildingDescription.get("UNDERGROUND_PLANS_NO");
                        params["NOT_UNDERGROUND_PLANS_NO"] = buildingDescription.get("NOT_UNDERGROUND_PLANS_NO");
                        params["APPROX_FT_AREA"] = buildingDescription.get("APPROX_FT_AREA");
                        params["RESIDENTIAL_UNITS"] = buildingDescription.get("RESIDENTIAL_UNITS");
                        params["RESIDENTIAL_UNITS_UNINHABITABLE"] = buildingDescription.get("RESIDENTIAL_UNITS_UNINHABITABLE");
                        params["TYPE_OF_CONSTRUCTION"] = buildingDescription.get("TYPE_OF_CONSTRUCTION");
                        params["OTHER_TYPE_OF_CONSTRUCTION"] = buildingDescription.get("OTHER_TYPE_OF_CONSTRUCTION");
                        params["PRIMARY_OCCUPANCY"] = buildingDescription.get("PRIMARY_OCCUPANCY");
                        params["OTHER_PRIMARY_OCCUPANCY"] = buildingDescription.get("OTHER_PRIMARY_OCCUPANCY");
                    }
                    var uploadQueueURL = "https://www.edam.resiltronics.org/ReceiveATC20DetailedModeForm.php";
                    if ("0" == form_type) {
                        var recoverDetailedEvaluation = ATC20ModeUtils.LoadDetailedEvaluationQuery(form_id);
                        if (recoverDetailedEvaluation.length > 0) {
                            var detailedEvaluation = recoverDetailedEvaluation.at(0);
                            params["EVALUATION"] = detailedEvaluation.get("EVALUATION");
                            params["OVERALL_HAZARDS_COMMENTS"] = detailedEvaluation.get("OVERALL_HAZARDS_COMMENTS");
                            params["OVERALL_HAZARDS_OTHER"] = detailedEvaluation.get("OVERALL_HAZARDS_OTHER");
                            params["STRUCTURAL_HAZARDS_COMMENTS"] = detailedEvaluation.get("STRUCTURAL_HAZARDS_COMMENTS");
                            params["STRUCTURAL_HAZARDS_OTHER"] = detailedEvaluation.get("STRUCTURAL_HAZARDS_OTHER");
                            params["NONSTRUCTURAL_HAZARDS_COMMENTS"] = detailedEvaluation.get("NONSTRUCTURAL_HAZARDS_COMMENTS");
                            params["NONSTRUCTURAL_HAZARDS_OTHER"] = detailedEvaluation.get("NONSTRUCTURAL_HAZARDS_OTHER");
                            params["GEOTECHNICAL_HAZARDS_COMMENTS"] = detailedEvaluation.get("GEOTECHNICAL_HAZARDS_COMMENTS");
                            params["GEOTECHNICAL_HAZARDS_OTHER"] = detailedEvaluation.get("GEOTECHNICAL_HAZARDS_OTHER");
                            params["GENERAL_COMMENTS"] = detailedEvaluation.get("GENERAL_COMMENTS");
                            params["ESTIMATED_BUILDING_DAMAGE"] = detailedEvaluation.get("ESTIMATED_BUILDING_DAMAGE");
                            var sketch_image_content = "";
                            var sketch_path = detailedEvaluation.get("SKETCH_PATH");
                            if (sketch_path) {
                                var sketchFile = Alloy.Globals.getFileForRead(sketch_path);
                                sketchFile && (sketch_image_content = sketchFile.read());
                            }
                            params["SKETCH_IMAGE"] = sketch_image_content;
                        }
                        var recoverDetailedPosting = ATC20ModeUtils.LoadDetailedPostingQuery(form_id);
                        if (recoverDetailedPosting.length > 0) {
                            var detailedPosting = recoverDetailedPosting.at(0);
                            params["PREVIOUS_POSTING"] = detailedPosting.get("PREVIOUS_POSTING");
                            params["PREVIOUS_POSTING_INSPECTOR_ID"] = detailedPosting.get("PREVIOUS_POSTING_INSPECTOR_ID");
                            params["PREVIOUS_POSTING_DATE"] = detailedPosting.get("PREVIOUS_POSTING_DATE");
                            params["POSTING"] = detailedPosting.get("POSTING");
                            params["CLASSIFICATION"] = detailedPosting.get("CLASSIFICATION");
                            params["USE_AND_ENTRY_RESTRICTIONS"] = detailedPosting.get("USE_AND_ENTRY_RESTRICTIONS");
                        }
                    } else {
                        uploadQueueURL = "https://www.edam.resiltronics.org/ReceiveATC20RapidModeForm.php";
                        params["AREAS_INSPECTED"] = inspection.get("AREAS_INSPECTED");
                        var recoverRapidEvaluation = ATC20ModeUtils.LoadRapidEvaluationQuery(form_id);
                        if (recoverRapidEvaluation.length > 0) {
                            var rapidEvaluation = recoverRapidEvaluation.at(0);
                            params["EVALUATION"] = rapidEvaluation.get("EVALUATION");
                            params["OTHER_OBSERVED_CONDITIONS"] = rapidEvaluation.get("OTHER_OBSERVED_CONDITIONS");
                            params["GENERAL_COMMENTS"] = rapidEvaluation.get("GENERAL_COMMENTS");
                            params["ESTIMATED_BUILDING_DAMAGE"] = rapidEvaluation.get("ESTIMATED_BUILDING_DAMAGE");
                        }
                        var recoverRapidPosting = ATC20ModeUtils.LoadRapidPostingQuery(form_id);
                        if (recoverRapidPosting.length > 0) {
                            var rapidPosting = recoverRapidPosting.at(0);
                            params["POSTING"] = rapidPosting.get("POSTING");
                            params["CLASSIFICATION"] = rapidPosting.get("CLASSIFICATION");
                            params["USE_AND_ENTRY_RESTRICTIONS"] = rapidPosting.get("USE_AND_ENTRY_RESTRICTIONS");
                        }
                    }
                    var recoverFurtherActions = ATC20ModeUtils.LoadFurtherActionsQuery(form_id);
                    if (recoverFurtherActions.length > 0) {
                        var furtherActions = recoverFurtherActions.at(0);
                        params["BARRICADES_IN_THE_FOLLOWING_AREAS"] = furtherActions.get("BARRICADES_IN_THE_FOLLOWING_AREAS");
                        params["EVALUATION_RECOMMENDED"] = furtherActions.get("EVALUATION_RECOMMENDED");
                        params["OTHER_EVALUATION_RECOMMENDED"] = furtherActions.get("OTHER_EVALUATION_RECOMMENDED");
                        params["OTHER_RECOMMENDATIONS"] = furtherActions.get("OTHER_RECOMMENDATIONS");
                        params["COMMENTS"] = furtherActions.get("COMMENTS");
                    }
                    var media_array = ATC20ModeUtils.CreateMediaArray(form_id, false);
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
                        url: uploadQueueURL
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
        contentsUploader.uploadMultiContents(current_upload_queue, "", $.atc20ModeFormsWindow, function(e) {
            try {
                var error_occurred = false;
                var json = e.response_text;
                var response = JSON.parse(json);
                if (200 == e.status) if (true == response.OK) {
                    var recoverInspection = Alloy.createCollection("ATC20Forms");
                    recoverInspection.fetch({
                        query: "SELECT * FROM ATC20Forms where ID = " + e.content_id
                    });
                    var currentForm = recoverInspection.at(0);
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

                  case "InsertEvaluationSketchFailed":
                    failedToUploadContents.push({
                        content_id: e.content_id,
                        error_msg: L("generic_insert_evaluation_sketch_failed_err_msg")
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
    function OnBtnEditInspectorData_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                "CA" == current_mode || "NEPAL" == current_mode ? Alloy.Globals.createAndOpenControllerExt("ATC20PersonalData", {
                    mode: current_mode
                }) : "NZ" == current_mode && Alloy.Globals.createAndOpenControllerExt("ATC20NZPersonalData");
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
    this.__controllerPath = "ATC20ModeForms";
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
    $.__views.atc20ModeFormsWindow = Ti.UI.createWindow({
        title: L("atc20_mode_forms_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeFormsWindow"
    });
    $.__views.atc20ModeFormsWindow && $.addTopLevelView($.__views.atc20ModeFormsWindow);
    OnATC20ModeFormsWindow_Close ? $.__views.atc20ModeFormsWindow.addEventListener("close", OnATC20ModeFormsWindow_Close) : __defers["$.__views.atc20ModeFormsWindow!close!OnATC20ModeFormsWindow_Close"] = true;
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
    $.__views.atc20ModeFormsWindow.add($.__views.activity_indicator);
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
    $.__views.atc20ModeFormsWindow.add($.__views.btnLogout);
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
    $.__views.atc20ModeFormsWindow.add($.__views.lblWelcome);
    $.__views.btnExportCSV = Ti.UI.createButton({
        top: 5,
        left: 110,
        title: L("generic_export_csv_title"),
        backgroundImage: "/images/export_csv_normal.png",
        backgroundSelectedImage: "/images/export_csv_pressed.png",
        backgroundDisabledImage: "/images/export_csv_disabled.png",
        width: 100,
        height: 30,
        id: "btnExportCSV"
    });
    $.__views.atc20ModeFormsWindow.add($.__views.btnExportCSV);
    OnBtnExportCSV_Click ? $.__views.btnExportCSV.addEventListener("click", OnBtnExportCSV_Click) : __defers["$.__views.btnExportCSV!click!OnBtnExportCSV_Click"] = true;
    $.__views.viewAppButtonEID = Ti.UI.createView({
        top: 70,
        left: "2%",
        width: "30%",
        id: "viewAppButtonEID"
    });
    $.__views.atc20ModeFormsWindow.add($.__views.viewAppButtonEID);
    $.__views.widgetAppButtonEID = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonEID",
        __parentSymbol: $.__views.viewAppButtonEID
    });
    $.__views.widgetAppButtonEID.setParent($.__views.viewAppButtonEID);
    $.__views.viewAppButtonAdd = Ti.UI.createView({
        top: 70,
        width: "30%",
        id: "viewAppButtonAdd"
    });
    $.__views.atc20ModeFormsWindow.add($.__views.viewAppButtonAdd);
    $.__views.widgetAppButtonAdd = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonAdd",
        __parentSymbol: $.__views.viewAppButtonAdd
    });
    $.__views.widgetAppButtonAdd.setParent($.__views.viewAppButtonAdd);
    $.__views.viewAppButtonServerSynch = Ti.UI.createView({
        top: 70,
        right: "2%",
        width: "30%",
        id: "viewAppButtonServerSynch"
    });
    $.__views.atc20ModeFormsWindow.add($.__views.viewAppButtonServerSynch);
    $.__views.widgetAppButtonServerSynch = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonServerSynch",
        __parentSymbol: $.__views.viewAppButtonServerSynch
    });
    $.__views.widgetAppButtonServerSynch.setParent($.__views.viewAppButtonServerSynch);
    $.__views.tableViewATC20ModeForms = Ti.UI.createTableView({
        top: 185,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "tableViewATC20ModeForms"
    });
    $.__views.atc20ModeFormsWindow.add($.__views.tableViewATC20ModeForms);
    var __alloyId7 = Alloy.Collections["ATC20Forms"] || ATC20Forms;
    __alloyId7.on("fetch destroy change add remove reset", __alloyId8);
    OnTableViewForms_Click ? $.__views.tableViewATC20ModeForms.addEventListener("click", OnTableViewForms_Click) : __defers["$.__views.tableViewATC20ModeForms!click!OnTableViewForms_Click"] = true;
    exports.destroy = function() {
        __alloyId7.off("fetch destroy change add remove reset", __alloyId8);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle();
    var controls = new Array();
    controls.push($.btnLogout);
    controls.push($.btnExportCSV);
    controls.push($.tableViewATC20ModeForms);
    controls.push($.widgetAppButtonAdd.get_button());
    controls.push($.widgetAppButtonServerSynch.get_button());
    controls.push($.widgetAppButtonEID.get_button());
    var bIsWorkInProgress = false;
    var bCanClickOnTableView = true;
    var current_upload_queue = null;
    try {
        "NEPAL" != current_mode && $.atc20ModeFormsWindow.remove($.btnExportCSV);
        $.lblWelcome.setText(current_logged_username);
        $.widgetAppButtonAdd.init("/images/add_form_normal.png", "/images/add_form_pressed.png", "/images/add_form_disabled.png", L("generic_add_title"), OnBtnAdd_Click);
        $.widgetAppButtonServerSynch.init("/images/server_synch_normal.png", "/images/server_synch_pressed.png", "/images/server_synch_disabled.png", L("generic_server_synch_title"), OnBtnServerSynch_Click);
        $.widgetAppButtonEID.init("/images/edit_team_normal.png", "/images/edit_team_pressed.png", "/images/edit_team_disabled.png", L("atc20_mode_edit_inspector_data"), OnBtnEditInspectorData_Click);
        $.widgetAppButtonEID.set_label_height(42);
        RebuildTable();
        $.atc20ModeFormsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.atc20ModeFormsWindow!close!OnATC20ModeFormsWindow_Close"] && $.__views.atc20ModeFormsWindow.addEventListener("close", OnATC20ModeFormsWindow_Close);
    __defers["$.__views.btnLogout!click!OnBtnLogout_Click"] && $.__views.btnLogout.addEventListener("click", OnBtnLogout_Click);
    __defers["$.__views.btnExportCSV!click!OnBtnExportCSV_Click"] && $.__views.btnExportCSV.addEventListener("click", OnBtnExportCSV_Click);
    __defers["$.__views.tableViewATC20ModeForms!click!OnTableViewForms_Click"] && $.__views.tableViewATC20ModeForms.addEventListener("click", OnTableViewForms_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;