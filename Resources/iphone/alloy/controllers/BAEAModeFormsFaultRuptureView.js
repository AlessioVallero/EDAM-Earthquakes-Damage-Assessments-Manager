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
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_fault_rupture:offset_feature_type_changed", OnOffsetFeatureType_Changed);
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_new");
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_update");
            Alloy.Globals.CurrentTemporaryPicsPath = null;
            $.navigationWindowFaultRupture.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsFaultRupturePhoto_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                if (view_enabled) {
                    var optionDialog = Ti.UI.createOptionDialog({
                        title: L("baea_photo_selection_title"),
                        cancel: 4,
                        options: [ L("baea_photo_new_photo_msg"), L("baea_photo_import_photo_msg"), L("baea_photo_new_sketch_msg"), L("baea_photo_view_photos_msg"), L("generic_cancel_btn_title") ],
                        selectedIndex: 1
                    });
                    optionDialog.addEventListener("click", function(e) {
                        switch (e.index) {
                          case 0:
                            Titanium.Media.showCamera({
                                success: function(event) {
                                    Alloy.Globals.CurrentTemporaryPicsPath || (Alloy.Globals.CurrentTemporaryPicsPath = new Array());
                                    var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".png");
                                    newFile.exists && newFile.deleteFile();
                                    newFile.write(event.media);
                                    Alloy.Globals.CurrentTemporaryPicsPath.push({
                                        media: newFile.getNativePath(),
                                        section: "FR"
                                    });
                                },
                                cancel: function() {},
                                error: function(error) {
                                    var alertDialog = Titanium.UI.createAlertDialog({
                                        title: L("generic_camera_title"),
                                        buttonNames: [ L("generic_ok_msg") ]
                                    });
                                    alertDialog.setMessage(error.code == Titanium.Media.NO_CAMERA ? L("no_camera_on_this_device_msg") : L("generic_exception_msg") + error.code);
                                    alertDialog.show();
                                },
                                saveToPhotoGallery: false,
                                mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
                            });
                            break;

                          case 1:
                            Titanium.Media.openPhotoGallery({
                                success: function(event) {
                                    var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".png");
                                    newFile.exists && newFile.deleteFile();
                                    newFile.write(event.media);
                                    var mediaDetails = {
                                        media: newFile.getNativePath(),
                                        section: "FR"
                                    };
                                    Alloy.Globals.CurrentTemporaryPicsPath || (Alloy.Globals.CurrentTemporaryPicsPath = new Array());
                                    Alloy.Globals.CurrentTemporaryPicsPath.push(mediaDetails);
                                    alert(L("generic_content_imported_msg"));
                                },
                                mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
                            });
                            break;

                          case 2:
                            Alloy.Globals.createAndOpenControllerExt("DraftPaintView", {
                                type: "Detailed_BAEA_Sketch",
                                baea_section: "FR"
                            });
                            break;

                          case 3:
                            var media_array = {
                                PERMANENT: null,
                                TEMPORARY: null
                            };
                            Alloy.Globals.BAEAModeFaultRupture && Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index] && Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS);
                            Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 && (media_array["TEMPORARY"] = Alloy.Globals.CurrentTemporaryPicsPath);
                            media_array["PERMANENT"] || media_array["TEMPORARY"] ? Alloy.Globals.createAndOpenControllerExt("BAEATableGalleryView", {
                                media_contents: media_array,
                                is_synchronized: current_is_synchronized
                            }) : alert(L("no_media_for_the_gallery_msg"));
                        }
                    });
                    optionDialog.show();
                } else {
                    var media_array = {
                        PERMANENT: null,
                        TEMPORARY: null
                    };
                    Alloy.Globals.BAEAModeFaultRupture && Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index] && Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS);
                    Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 && (media_array["TEMPORARY"] = Alloy.Globals.CurrentTemporaryPicsPath);
                    media_array["PERMANENT"] || media_array["TEMPORARY"] ? Alloy.Globals.createAndOpenControllerExt("BAEATableGalleryView", {
                        media_contents: media_array,
                        is_synchronized: current_is_synchronized
                    }) : alert(L("no_media_for_the_gallery_msg"));
                }
                bRet = true;
                return bRet;
            }, view_enabled);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnLoadAddress_Click() {
        try {
            BeginAsyncBusyAction($.activity_indicator, controls, function() {
                bIsWorkInProgress = true;
                if (Alloy.Globals.isLocationAuthorized()) {
                    timeout = setTimeout(function() {
                        timeout = null;
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        alert(L("geolocation_timeout_occurred_err_msg"));
                    }, Alloy.Globals.GeolocationRequestTimeoutMillisecs);
                    Alloy.Globals.getLocation({
                        success: UpdatePosition
                    });
                } else {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    alert(L("generic_user_not_authorized_to_ask_localization"));
                }
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function EndAsyncBusyAction_CallBack() {
        bIsWorkInProgress = false;
        if (null !== timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }
    function UpdatePosition(e) {
        Ti.Geolocation.removeEventListener("location", UpdatePosition);
        if (!e.success || e.error) {
            alert(L("unable_to_get_location_err_msg") + " " + e.error);
            return;
        }
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.set_text_value(e.coords.longitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.set_text_value(address);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            if (bViewAddress) {
                Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: {
                        LATITUDE: $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value(),
                        LONGITUDE: $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value()
                    },
                    mode: "YL"
                });
                bViewAddress = false;
            }
        }
    }
    function OnBtnViewAddress_Click() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if ($.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value() && $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value()) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                users_coordinates: {
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value()
                },
                mode: "YL"
            }); else {
                bViewAddress = true;
                OnBtnLoadAddress_Click();
            }
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOffsetFeatureType_Changed(e) {
        current_offset_feature_type = e.value;
    }
    function OnSurfaceRupture_Change(e) {
        current_surface_rupture = e.id;
    }
    function OnTableViewBAEAModeFormsFaultRuptureOffsetFeatureType_Click() {
        try {
            BusyAction($.activity_indicator, controls, function() {
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_fault_rupture:offset_feature_type_changed", OnOffsetFeatureType_Changed);
                Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsFaultRuptureOffsetFeatureTypeView", {
                    offset_feature_type: current_offset_feature_type,
                    is_synchronized: current_is_synchronized
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnRecord_Click() {
        try {
            if (-1 != current_global_ar_index) {
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PHOTOS"] || (Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PHOTOS"] = new Array());
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["DATE"] = new Date().getTime().toString();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SURFACE_RUPTURE"] = $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.get_selected_index();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_AZIMUT"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PLUNGE"] = $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_LENGTH"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.get_text_value();
                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["OFFSET_FEATURE_TYPE"] = current_offset_feature_type;
                Ti.App.fireEvent("baea_mode_manage_section:record_update", {
                    index: current_global_ar_index,
                    value: Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SITE"]
                });
            } else {
                var newFaultRuptureItem = {
                    ID: -1,
                    DATE: new Date().getTime().toString(),
                    SURFACE_RUPTURE: current_surface_rupture,
                    SITE: $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.get_text_value(),
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value(),
                    ADDRESS: $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.get_text_value(),
                    SLIP_AZIMUT: $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.get_text_value(),
                    PLUNGE: $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.get_text_value(),
                    SLIP_LENGTH: $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.get_text_value(),
                    NOTES: $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.get_text_value(),
                    OFFSET_FEATURE_TYPE: current_offset_feature_type
                };
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    newFaultRuptureItem["PHOTOS"] = new Array();
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        newFaultRuptureItem["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeFaultRupture.length > 0 ? Alloy.Globals.BAEAModeFaultRupture.splice(0, 0, newFaultRuptureItem) : Alloy.Globals.BAEAModeFaultRupture.push(newFaultRuptureItem);
                Ti.App.fireEvent("baea_mode_manage_section:record_new");
            }
            Back();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsFaultRuptureView";
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
    $.__views.baeaModeFormsFaultRuptureWindow = Ti.UI.createWindow({
        title: L("baea_mode_fault_rupture_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsFaultRuptureWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeFormsFaultRuptureWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.baeaModeFormsFaultRuptureWindow.add($.__views.activity_indicator);
    $.__views.scrollViewFaultRupture = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewFaultRupture"
    });
    $.__views.baeaModeFormsFaultRuptureWindow.add($.__views.scrollViewFaultRupture);
    $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSiteName = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsFaultRuptureSiteName"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSiteName);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSiteName
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSiteName);
    var __alloyId76 = [];
    $.__views.__alloyId77 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "fault_rupture_photo_row",
        id: "__alloyId77"
    });
    __alloyId76.push($.__views.__alloyId77);
    $.__views.lblPhoto = Ti.UI.createLabel({
        text: L("generic_photo_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblPhoto"
    });
    $.__views.__alloyId77.add($.__views.lblPhoto);
    $.__views.tableViewBAEAModeFormsFaultRupturePhoto = Ti.UI.createTableView({
        top: 70,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId76,
        id: "tableViewBAEAModeFormsFaultRupturePhoto"
    });
    $.__views.scrollViewFaultRupture.add($.__views.tableViewBAEAModeFormsFaultRupturePhoto);
    OnTableViewBAEAModeFormsFaultRupturePhoto_Click ? $.__views.tableViewBAEAModeFormsFaultRupturePhoto.addEventListener("click", OnTableViewBAEAModeFormsFaultRupturePhoto_Click) : __defers["$.__views.tableViewBAEAModeFormsFaultRupturePhoto!click!OnTableViewBAEAModeFormsFaultRupturePhoto_Click"] = true;
    $.__views.btnBAEAModeFormsFaultRuptureLoadAddress = Ti.UI.createButton({
        title: L("generic_load_address_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 140,
        height: 50,
        left: 10,
        right: 10,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnBAEAModeFormsFaultRuptureLoadAddress"
    });
    $.__views.scrollViewFaultRupture.add($.__views.btnBAEAModeFormsFaultRuptureLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnBAEAModeFormsFaultRuptureLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnBAEAModeFormsFaultRuptureLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsFaultRuptureLatitude"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLatitude);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLatitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLatitude);
    $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsFaultRuptureLongitude"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLongitude);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLongitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureLongitude);
    $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureAddress = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsFaultRuptureAddress"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureAddress);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRuptureAddress",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureAddress
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureAddress);
    $.__views.btnBAEAModeFormsFaultRuptureViewAddress = Ti.UI.createButton({
        title: L("generic_view_address_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 420,
        height: 50,
        left: 10,
        right: 10,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnBAEAModeFormsFaultRuptureViewAddress"
    });
    $.__views.scrollViewFaultRupture.add($.__views.btnBAEAModeFormsFaultRuptureViewAddress);
    OnBtnViewAddress_Click ? $.__views.btnBAEAModeFormsFaultRuptureViewAddress.addEventListener("click", OnBtnViewAddress_Click) : __defers["$.__views.btnBAEAModeFormsFaultRuptureViewAddress!click!OnBtnViewAddress_Click"] = true;
    $.__views.viewAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture = Ti.UI.createView({
        top: 490,
        height: 50,
        right: 10,
        id: "viewAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture);
    $.__views.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture
    });
    $.__views.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.setParent($.__views.viewAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture);
    var __alloyId78 = [];
    $.__views.__alloyId79 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "fault_rupture_offset_feature_type_row",
        id: "__alloyId79"
    });
    __alloyId78.push($.__views.__alloyId79);
    $.__views.lblOffsetFeatureType = Ti.UI.createLabel({
        text: L("generic_offset_feature_type_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblOffsetFeatureType"
    });
    $.__views.__alloyId79.add($.__views.lblOffsetFeatureType);
    $.__views.tableViewBAEAModeFormsFaultRuptureOffsetFeatureType = Ti.UI.createTableView({
        top: 560,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId78,
        id: "tableViewBAEAModeFormsFaultRuptureOffsetFeatureType"
    });
    $.__views.scrollViewFaultRupture.add($.__views.tableViewBAEAModeFormsFaultRuptureOffsetFeatureType);
    OnTableViewBAEAModeFormsFaultRuptureOffsetFeatureType_Click ? $.__views.tableViewBAEAModeFormsFaultRuptureOffsetFeatureType.addEventListener("click", OnTableViewBAEAModeFormsFaultRuptureOffsetFeatureType_Click) : __defers["$.__views.tableViewBAEAModeFormsFaultRuptureOffsetFeatureType!click!OnTableViewBAEAModeFormsFaultRuptureOffsetFeatureType_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth);
    $.__views.viewAppTextFieldBAEAModeFormsFaultRupturePlunge = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsFaultRupturePlunge"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRupturePlunge);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRupturePlunge",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRupturePlunge
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRupturePlunge);
    $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipLength = Ti.UI.createView({
        top: 770,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsFaultRuptureSlipLength"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipLength);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipLength
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureSlipLength);
    $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureNotes = Ti.UI.createView({
        top: 840,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsFaultRuptureNotes"
    });
    $.__views.scrollViewFaultRupture.add($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureNotes);
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsFaultRuptureNotes",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsFaultRuptureNotes
    });
    $.__views.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.setParent($.__views.viewAppTextFieldBAEAModeFormsFaultRuptureNotes);
    $.__views.btnBAEAModeFormsFaultRuptureRecord = Ti.UI.createButton({
        title: L("generic_record_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 910,
        height: 50,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnBAEAModeFormsFaultRuptureRecord"
    });
    $.__views.scrollViewFaultRupture.add($.__views.btnBAEAModeFormsFaultRuptureRecord);
    OnBtnRecord_Click ? $.__views.btnBAEAModeFormsFaultRuptureRecord.addEventListener("click", OnBtnRecord_Click) : __defers["$.__views.btnBAEAModeFormsFaultRuptureRecord!click!OnBtnRecord_Click"] = true;
    $.__views.navigationWindowFaultRupture = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeFormsFaultRuptureWindow,
        id: "navigationWindowFaultRupture"
    });
    $.__views.navigationWindowFaultRupture && $.addTopLevelView($.__views.navigationWindowFaultRupture);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.form_id;
    var current_global_ar_index = args.global_ar_index;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.btnBAEAModeFormsFaultRuptureLoadAddress);
    controls.push($.btnBAEAModeFormsFaultRuptureViewAddress);
    controls.push($.btnBAEAModeFormsFaultRuptureRecord);
    var bIsWorkInProgress = false;
    var timeout = null;
    var bViewAddress = false;
    var current_offset_feature_type = "000000";
    var current_surface_rupture = "0";
    try {
        Alloy.Globals.CurrentTemporaryPicsPath = null;
        var surfaceRuptureView = null;
        var mainView = $.getView();
        surfaceRuptureView = mainView;
        $.btnBAEAModeFormsFaultRuptureLoadAddress.enabled = view_enabled;
        $.btnBAEAModeFormsFaultRuptureRecord.enabled = view_enabled;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.init(L("generic_site_name_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.init(L("generic_latitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.init(L("generic_longitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.init(L("generic_address_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.init(L("generic_slip_azimuth_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.init(L("generic_plunge_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.init(L("generic_slip_length_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.init(L("generic_notes_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.enabled(view_enabled);
        var surfaceRuptureValues = {
            0: {
                title: L("generic_surface_rupture_scarp")
            },
            1: {
                title: L("generic_surface_rupture_en_echelon")
            },
            2: {
                title: L("generic_surface_rupture_moletrack")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.init(L("generic_surface_rupture_text_msg"), surfaceRuptureValues, OnSurfaceRupture_Change, null, surfaceRuptureView);
        $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.enabled(view_enabled);
        if (-1 != current_global_ar_index) {
            $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.set_selected_index(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SURFACE_RUPTURE"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SITE"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LATITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LONGITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["ADDRESS"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_AZIMUT"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PLUNGE"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_LENGTH"]);
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.set_text_value(Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["NOTES"]);
            current_offset_feature_type = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["OFFSET_FEATURE_TYPE"];
            current_surface_rupture = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SURFACE_RUPTURE"];
        } else {
            $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.set_selected_index("0");
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.set_text_value("0");
            $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.set_text_value("0");
            $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.set_text_value("0");
        }
        RegisterHideKeyboard($.baeaModeFormsFaultRuptureWindow, [ $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.get_text_field(), $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.get_text_field(), $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.get_text_field(), $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.get_text_field(), $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.get_text_field(), $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.get_text_field() ]);
        $.navigationWindowFaultRupture.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewBAEAModeFormsFaultRupturePhoto!click!OnTableViewBAEAModeFormsFaultRupturePhoto_Click"] && $.__views.tableViewBAEAModeFormsFaultRupturePhoto.addEventListener("click", OnTableViewBAEAModeFormsFaultRupturePhoto_Click);
    __defers["$.__views.btnBAEAModeFormsFaultRuptureLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnBAEAModeFormsFaultRuptureLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    __defers["$.__views.btnBAEAModeFormsFaultRuptureViewAddress!click!OnBtnViewAddress_Click"] && $.__views.btnBAEAModeFormsFaultRuptureViewAddress.addEventListener("click", OnBtnViewAddress_Click);
    __defers["$.__views.tableViewBAEAModeFormsFaultRuptureOffsetFeatureType!click!OnTableViewBAEAModeFormsFaultRuptureOffsetFeatureType_Click"] && $.__views.tableViewBAEAModeFormsFaultRuptureOffsetFeatureType.addEventListener("click", OnTableViewBAEAModeFormsFaultRuptureOffsetFeatureType_Click);
    __defers["$.__views.btnBAEAModeFormsFaultRuptureRecord!click!OnBtnRecord_Click"] && $.__views.btnBAEAModeFormsFaultRuptureRecord.addEventListener("click", OnBtnRecord_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;