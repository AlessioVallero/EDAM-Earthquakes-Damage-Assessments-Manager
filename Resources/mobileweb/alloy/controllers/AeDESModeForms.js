function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId17(e) {
        if (e && e.fromAdapter) return;
        __alloyId17.opts || {};
        var models = __alloyId16.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId10 = models[i];
            __alloyId10.__transform = {};
            var __alloyId12 = Ti.UI.createTableViewRow({
                hasChild: "true",
                rowId: "undefined" != typeof __alloyId10.__transform["ID"] ? __alloyId10.__transform["ID"] : __alloyId10.get("ID"),
                isSynchronized: "undefined" != typeof __alloyId10.__transform["SYNCHRONIZED"] ? __alloyId10.__transform["SYNCHRONIZED"] : __alloyId10.get("SYNCHRONIZED"),
                className: "form_row"
            });
            rows.push(__alloyId12);
            var __alloyId13 = Ti.UI.createImageView({
                left: 5,
                width: 34,
                height: 34,
                image: "/images/check.png"
            });
            __alloyId12.add(__alloyId13);
            var __alloyId14 = Ti.UI.createLabel({
                left: 45,
                height: 40,
                width: 200,
                color: "#000",
                text: "undefined" != typeof __alloyId10.__transform["FORM_NO"] ? __alloyId10.__transform["FORM_NO"] : __alloyId10.get("FORM_NO")
            });
            __alloyId12.add(__alloyId14);
            var __alloyId15 = Ti.UI.createButton({
                color: "black",
                backgroundColor: "red",
                title: L("generic_delete_title"),
                right: 8,
                width: 105,
                clickName: "deleteButton",
                height: 34
            });
            __alloyId12.add(__alloyId15);
        }
        $.__views.tableViewAeDESModeForms.setData(rows);
    }
    function RebuildTable() {
        if (Alloy.Globals.ExistSession()) Alloy.Collections.AeDESForms.fetch({
            query: "SELECT * FROM AeDESForms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "'"
        }); else {
            $.btnLogout.visible = false;
            Alloy.Collections.AeDESForms.fetch({
                query: "SELECT * FROM AeDESForms where USER is null or USER = ''"
            });
        }
        if ($.tableViewAeDESModeForms.data && $.tableViewAeDESModeForms.data.length > 0) {
            for (var i = 0; i < $.tableViewAeDESModeForms.data[0].rows.length; i++) {
                var currentRow = $.tableViewAeDESModeForms.data[0].rows[i];
                currentRow.children[0].setVisible("1" == currentRow.isSynchronized ? true : false);
            }
            $.tableViewAeDESModeForms.setVisible(true);
        } else $.tableViewAeDESModeForms.setVisible(false);
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
                loader.open("POST", "https://areeweb.polito.it/IRUSAT/Security/Sessione_Logout.php");
                loader.send(params);
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnAeDESModeFormsWindow_Close() {
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
                                var recoverVideoGallery = Alloy.createCollection("AeDESFormsVideos");
                                recoverVideoGallery.fetch({
                                    query: "SELECT VIDEO_PATH FROM AeDESFormsVideos where FORM_ID=" + e.row.rowId
                                });
                                if (recoverVideoGallery.length > 0) for (var i = 0; i < recoverVideoGallery.length; i++) {
                                    var video = recoverVideoGallery.at(i);
                                    var video_path = video.get("VIDEO_PATH");
                                    var file = Alloy.Globals.getFileForRead(video_path);
                                    file && file.deleteFile();
                                }
                                var recoverVideo = Alloy.createCollection("AeDESFormsVideos");
                                recoverVideo.fetch({
                                    query: "SELECT * FROM AeDESFormsVideos where FORM_ID = " + e.row.rowId
                                });
                                while (recoverVideo.length > 0) {
                                    var model = recoverVideo.at(0);
                                    recoverVideo.remove(model);
                                    model.destroy();
                                }
                                var recoverPictureGallery = Alloy.createCollection("AeDESFormsImages");
                                recoverPictureGallery.fetch({
                                    query: "SELECT IMAGE_PATH FROM AeDESFormsImages where FORM_ID=" + e.row.rowId
                                });
                                if (recoverPictureGallery.length > 0) for (var i = 0; i < recoverPictureGallery.length; i++) {
                                    var image = recoverPictureGallery.at(i);
                                    var image_path = image.get("IMAGE_PATH");
                                    var file = Alloy.Globals.getFileForRead(image_path);
                                    file && file.deleteFile();
                                }
                                var recoverPictures = Alloy.createCollection("AeDESFormsImages");
                                recoverPictures.fetch({
                                    query: "SELECT * FROM AeDESFormsImages where FORM_ID = " + e.row.rowId
                                });
                                while (recoverPictures.length > 0) {
                                    var model = recoverPictures.at(0);
                                    recoverPictures.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionOne = Alloy.createCollection("AeDESFormsSectionOne");
                                recoverSectionOne.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionOne where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionOne.length > 0) {
                                    var model = recoverSectionOne.at(0);
                                    recoverSectionOne.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionTwo = Alloy.createCollection("AeDESFormsSectionTwo");
                                recoverSectionTwo.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionTwo where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionTwo.length > 0) {
                                    var model = recoverSectionTwo.at(0);
                                    recoverSectionTwo.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionThree = Alloy.createCollection("AeDESFormsSectionThree");
                                recoverSectionThree.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionThree where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionThree.length > 0) {
                                    var model = recoverSectionThree.at(0);
                                    recoverSectionThree.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionFour = Alloy.createCollection("AeDESFormsSectionFour");
                                recoverSectionFour.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionFour where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionFour.length > 0) {
                                    var model = recoverSectionFour.at(0);
                                    recoverSectionFour.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionFive = Alloy.createCollection("AeDESFormsSectionFive");
                                recoverSectionFive.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionFive where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionFive.length > 0) {
                                    var model = recoverSectionFive.at(0);
                                    recoverSectionFive.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionSix = Alloy.createCollection("AeDESFormsSectionSix");
                                recoverSectionSix.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionSix where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionSix.length > 0) {
                                    var model = recoverSectionSix.at(0);
                                    recoverSectionSix.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionSeven = Alloy.createCollection("AeDESFormsSectionSeven");
                                recoverSectionSeven.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionSeven where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionSeven.length > 0) {
                                    var model = recoverSectionSeven.at(0);
                                    recoverSectionSeven.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionEight = Alloy.createCollection("AeDESFormsSectionEight");
                                recoverSectionEight.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionEight where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionEight.length > 0) {
                                    var model = recoverSectionEight.at(0);
                                    recoverSectionEight.remove(model);
                                    model.destroy();
                                }
                                var recoverSectionNine = Alloy.createCollection("AeDESFormsSectionNine");
                                recoverSectionNine.fetch({
                                    query: "SELECT * FROM AeDESFormsSectionNine where FORM_ID = " + e.row.rowId
                                });
                                if (recoverSectionNine.length > 0) {
                                    var model = recoverSectionNine.at(0);
                                    recoverSectionNine.remove(model);
                                    model.destroy();
                                }
                                var recoverForm = Alloy.createCollection("AeDESForms");
                                recoverForm.fetch({
                                    query: "SELECT * FROM AeDESForms where ID = " + e.row.rowId
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
                            Alloy.Globals.ProtectedAddEventListener(Ti.App, "aedes_mode:save", RebuildTable);
                            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsGeneralSection", {
                                form_id: rowId,
                                is_synchronized: isSynchronized
                            });
                        });
                        dialog.show();
                    } else {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "aedes_mode:save", RebuildTable);
                        Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsGeneralSection", {
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
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "aedes_mode:save", RebuildTable);
                Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsGeneralSection", {
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
                    loader.open("POST", "https://areeweb.polito.it/IRUSAT/Security/Sessione_Controllo.php");
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
                var AeDESModeUtils = require("/AeDESModeUtils");
                var uploadQueue = new Array();
                var all_media_found = true;
                var recoverDetails = AeDESModeUtils.LoadDetailsQuery();
                if (recoverDetails.length > 0) for (var i = 0; i < recoverDetails.length; i++) {
                    var details = recoverDetails.at(i);
                    var form_id = details.get("ID");
                    var params = {
                        key: "EDAM",
                        ID: form_id,
                        FORM_NO: details.get("FORM_NO"),
                        DATE: details.get("DATE")
                    };
                    var recoverSectionOne = AeDESModeUtils.LoadSectionOneQuery(form_id);
                    var recoverSectionTwo = AeDESModeUtils.LoadSectionTwoQuery(form_id);
                    var recoverSectionThree = AeDESModeUtils.LoadSectionThreeQuery(form_id);
                    var recoverSectionFour = AeDESModeUtils.LoadSectionFourQuery(form_id);
                    var recoverSectionFive = AeDESModeUtils.LoadSectionFiveQuery(form_id);
                    var recoverSectionSix = AeDESModeUtils.LoadSectionSixQuery(form_id);
                    var recoverSectionSeven = AeDESModeUtils.LoadSectionSevenQuery(form_id);
                    var recoverSectionEight = AeDESModeUtils.LoadSectionEightQuery(form_id);
                    var recoverSectionNine = AeDESModeUtils.LoadSectionNineQuery(form_id);
                    if (recoverSectionOne.length > 0) {
                        var sectionOne = recoverSectionOne.at(0);
                        params["LATITUDE"] = sectionOne.get("LATITUDE");
                        params["LONGITUDE"] = sectionOne.get("LONGITUDE");
                        params["ALTITUDE"] = sectionOne.get("ALTITUDE");
                        params["PROVINCE"] = sectionOne.get("PROVINCE");
                        params["MUNICIPALITY"] = sectionOne.get("MUNICIPALITY");
                        params["PLACE"] = sectionOne.get("PLACE");
                        params["ADDRESS"] = sectionOne.get("ADDRESS");
                        params["CIVIC_NO"] = sectionOne.get("CIVIC_NO");
                        params["BUILDING_POSITION"] = sectionOne.get("BUILDING_POSITION");
                        params["B_NAME_OR_OWNER"] = sectionOne.get("B_NAME_OR_OWNER");
                        params["CODE_OF_USE"] = sectionOne.get("CODE_OF_USE");
                    }
                    if (recoverSectionTwo.length > 0) {
                        var sectionTwo = recoverSectionTwo.at(0);
                        params["PLANS_NO"] = sectionTwo.get("PLANS_NO");
                        params["AVERAGE_HEIGHT_OF_FLOOR"] = sectionTwo.get("AVERAGE_HEIGHT_OF_FLOOR");
                        params["UNDERGROUND_PLANS_NO"] = sectionTwo.get("UNDERGROUND_PLANS_NO");
                        params["AVERAGE_SURFACE"] = sectionTwo.get("AVERAGE_SURFACE");
                        params["CONSTRUCTION_AGE"] = sectionTwo.get("CONSTRUCTION_AGE");
                        params["RENOVATION_AGE"] = sectionTwo.get("RENOVATION_AGE");
                        params["UNIT_OF_USE_HOUSING"] = sectionTwo.get("UNIT_OF_USE_HOUSING");
                        params["UNIT_OF_USE_PRODUCTIVE"] = sectionTwo.get("UNIT_OF_USE_PRODUCTIVE");
                        params["UNIT_OF_USE_COMMERCE"] = sectionTwo.get("UNIT_OF_USE_COMMERCE");
                        params["UNIT_OF_USE_OFFICES"] = sectionTwo.get("UNIT_OF_USE_OFFICES");
                        params["UNIT_OF_USE_PUBLIC_SERVICES"] = sectionTwo.get("UNIT_OF_USE_PUBLIC_SERVICES");
                        params["UNIT_OF_USE_DEPOSIT"] = sectionTwo.get("UNIT_OF_USE_DEPOSIT");
                        params["UNIT_OF_USE_STRATEGIC"] = sectionTwo.get("UNIT_OF_USE_STRATEGIC");
                        params["UNIT_OF_USE_TOURISM"] = sectionTwo.get("UNIT_OF_USE_TOURISM");
                        params["UTILIZATION"] = sectionTwo.get("UTILIZATION");
                        params["OCCUPANTS"] = sectionTwo.get("OCCUPANTS");
                        params["PROPERTY"] = sectionTwo.get("PROPERTY");
                    }
                    if (recoverSectionThree.length > 0) {
                        var sectionThree = recoverSectionThree.at(0);
                        params["COVERAGE"] = sectionThree.get("COVERAGE");
                        params["PLAN_AND_ELEVATION"] = sectionThree.get("PLAN_AND_ELEVATION");
                        params["INFILL_DISPOSAL"] = sectionThree.get("INFILL_DISPOSAL");
                        params["ISOLATED_COLUMNS"] = sectionThree.get("ISOLATED_COLUMNS");
                        params["MIXED"] = sectionThree.get("MIXED");
                        params["REINFORCED"] = sectionThree.get("REINFORCED");
                        params["REINFORCED_CONCRETE_FRAMES"] = sectionThree.get("REINFORCED_CONCRETE_FRAMES");
                        params["REINFORCED_CONCRETE_WALLS"] = sectionThree.get("REINFORCED_CONCRETE_WALLS");
                        params["STEEL_FRAMES"] = sectionThree.get("STEEL_FRAMES");
                        params["MASONRY_STRUCTURES"] = sectionThree.get("MASONRY_STRUCTURES");
                    }
                    if (recoverSectionFour.length > 0) {
                        var sectionFour = recoverSectionFour.at(0);
                        params["DAMAGES"] = sectionFour.get("DAMAGES");
                        params["FOUR_MEASURES_OF_EMERGENCY"] = sectionFour.get("MEASURES_OF_EMERGENCY");
                    }
                    if (recoverSectionFive.length > 0) {
                        var sectionFive = recoverSectionFive.at(0);
                        params["DAMAGE_TYPES"] = sectionFive.get("DAMAGE_TYPES");
                    }
                    if (recoverSectionSix.length > 0) {
                        var sectionSix = recoverSectionSix.at(0);
                        params["POTENTIAL_CAUSES"] = sectionSix.get("POTENTIAL_CAUSES");
                    }
                    if (recoverSectionSeven.length > 0) {
                        var sectionSeven = recoverSectionSeven.at(0);
                        params["MORPHOLOGY_SITE"] = sectionSeven.get("MORPHOLOGY_SITE");
                        params["SLOPES_LOOMING"] = sectionSeven.get("SLOPES_LOOMING");
                        params["SUBSOIL"] = sectionSeven.get("SUBSOIL");
                    }
                    if (recoverSectionEight.length > 0) {
                        var sectionEight = recoverSectionEight.at(0);
                        params["STRUCTURAL"] = sectionEight.get("STRUCTURAL");
                        params["NOT_STRUCTURAL"] = sectionEight.get("NOT_STRUCTURAL");
                        params["EXTERNAL"] = sectionEight.get("EXTERNAL");
                        params["GEOTECHNICAL"] = sectionEight.get("GEOTECHNICAL");
                        params["OUTCOME_PRACTICABILITY"] = sectionEight.get("OUTCOME_PRACTICABILITY");
                        params["HOUSING_UNITS_UNINHABITABLE"] = sectionEight.get("HOUSING_UNITS_UNINHABITABLE");
                        params["FAMILIES_EVACUATED"] = sectionEight.get("FAMILIES_EVACUATED");
                        params["EVACUEES_N"] = sectionEight.get("EVACUEES_N");
                        params["ACCURACY_VISIT"] = sectionEight.get("ACCURACY_VISIT");
                        params["OTHER"] = sectionEight.get("OTHER");
                        params["EIGHT_MEASURES_OF_EMERGENCY"] = sectionEight.get("MEASURES_OF_EMERGENCY");
                    }
                    if (recoverSectionNine.length > 0) {
                        var sectionNine = recoverSectionNine.at(0);
                        params["TOPIC"] = sectionNine.get("TOPIC");
                        params["OTHER_COMMENTS"] = sectionNine.get("OTHER_COMMENTS");
                    }
                    var media_array = AeDESModeUtils.CreateMediaArray(form_id, false);
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
                        url: "https://areeweb.polito.it/IRUSAT/ReceiveAeDESModeForm.php"
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
            current_logged_username = L("generic_welcome_online_text_msg") + Alloy.Globals.SessionUsername + "!";
            $.lblWelcome.setText(current_logged_username);
            RebuildTable();
        }
        var ContentsUploader = require("/ContentsUploader");
        var contentsUploader = new ContentsUploader();
        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        bCanClickOnTableView = false;
        for (var i = 0; i < current_upload_queue.length; i++) current_upload_queue[i].content["SID"] = Alloy.Globals.SessionId;
        var failedToUploadContents = new Array();
        contentsUploader.uploadMultiContents(current_upload_queue, "", $.aedesModeFormsWindow, function(e) {
            try {
                var error_occurred = false;
                var json = e.response_text;
                var response = JSON.parse(json);
                if (200 == e.status) if (true == response.OK) {
                    var recoverDetails = Alloy.createCollection("AeDESForms");
                    recoverDetails.fetch({
                        query: "SELECT * FROM AeDESForms where ID = " + e.content_id
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
                Alloy.Globals.createAndOpenControllerExt("TeamPersonalData");
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
    this.__controllerPath = "AeDESModeForms";
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
    $.__views.aedesModeFormsWindow = Ti.UI.createWindow({
        title: L("aedes_mode_forms_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeFormsWindow"
    });
    $.__views.aedesModeFormsWindow && $.addTopLevelView($.__views.aedesModeFormsWindow);
    OnAeDESModeFormsWindow_Close ? $.__views.aedesModeFormsWindow.addEventListener("close", OnAeDESModeFormsWindow_Close) : __defers["$.__views.aedesModeFormsWindow!close!OnAeDESModeFormsWindow_Close"] = true;
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
    $.__views.aedesModeFormsWindow.add($.__views.activity_indicator);
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
    $.__views.aedesModeFormsWindow.add($.__views.btnLogout);
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
    $.__views.aedesModeFormsWindow.add($.__views.lblWelcome);
    $.__views.viewAppButtonAdd = Ti.UI.createView({
        top: 70,
        left: 20,
        width: 60,
        height: 102,
        id: "viewAppButtonAdd"
    });
    $.__views.aedesModeFormsWindow.add($.__views.viewAppButtonAdd);
    $.__views.widgetAppButtonAdd = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonAdd",
        __parentSymbol: $.__views.viewAppButtonAdd
    });
    $.__views.widgetAppButtonAdd.setParent($.__views.viewAppButtonAdd);
    $.__views.viewAppButtonServerSynch = Ti.UI.createView({
        top: 70,
        width: 60,
        height: 102,
        id: "viewAppButtonServerSynch"
    });
    $.__views.aedesModeFormsWindow.add($.__views.viewAppButtonServerSynch);
    $.__views.widgetAppButtonServerSynch = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonServerSynch",
        __parentSymbol: $.__views.viewAppButtonServerSynch
    });
    $.__views.widgetAppButtonServerSynch.setParent($.__views.viewAppButtonServerSynch);
    $.__views.viewAppButtonETD = Ti.UI.createView({
        top: 70,
        right: 20,
        width: 60,
        height: 102,
        id: "viewAppButtonETD"
    });
    $.__views.aedesModeFormsWindow.add($.__views.viewAppButtonETD);
    $.__views.widgetAppButtonETD = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonETD",
        __parentSymbol: $.__views.viewAppButtonETD
    });
    $.__views.widgetAppButtonETD.setParent($.__views.viewAppButtonETD);
    $.__views.tableViewAeDESModeForms = Ti.UI.createTableView({
        top: 185,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "tableViewAeDESModeForms"
    });
    $.__views.aedesModeFormsWindow.add($.__views.tableViewAeDESModeForms);
    var __alloyId16 = Alloy.Collections["AeDESForms"] || AeDESForms;
    __alloyId16.on("fetch destroy change add remove reset", __alloyId17);
    OnTableViewForms_Click ? $.__views.tableViewAeDESModeForms.addEventListener("click", OnTableViewForms_Click) : __defers["$.__views.tableViewAeDESModeForms!click!OnTableViewForms_Click"] = true;
    exports.destroy = function() {
        __alloyId16.off("fetch destroy change add remove reset", __alloyId17);
    };
    _.extend($, $.__views);
    var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle();
    var controls = new Array();
    controls.push($.btnLogout);
    controls.push($.tableViewAeDESModeForms);
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
        $.aedesModeFormsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.aedesModeFormsWindow!close!OnAeDESModeFormsWindow_Close"] && $.__views.aedesModeFormsWindow.addEventListener("close", OnAeDESModeFormsWindow_Close);
    __defers["$.__views.btnLogout!click!OnBtnLogout_Click"] && $.__views.btnLogout.addEventListener("click", OnBtnLogout_Click);
    __defers["$.__views.tableViewAeDESModeForms!click!OnTableViewForms_Click"] && $.__views.tableViewAeDESModeForms.addEventListener("click", OnTableViewForms_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;