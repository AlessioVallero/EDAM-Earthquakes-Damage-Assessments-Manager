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
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_landslide:landslide_type_changed", OnLandslideType_Changed);
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_landslide:material_type_changed", OnMaterialType_Changed);
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_landslide:area_affected_changed", OnAreaAffected_Changed);
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_landslide:vulnerable_facilities_changed", OnVulnerableFacilities_Changed);
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_new");
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_update");
            Alloy.Globals.CurrentTemporaryPicsPath = null;
            $.baeaModeFormsLandslideWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsLandslidePhoto_Click() {
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
                                        section: "LA"
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
                                        section: "LA"
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
                                baea_section: "LA"
                            });
                            break;

                          case 3:
                            var media_array = {
                                PERMANENT: null,
                                TEMPORARY: null
                            };
                            Alloy.Globals.BAEAModeLandslide && Alloy.Globals.BAEAModeLandslide[current_global_ar_index] && Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS);
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
                    Alloy.Globals.BAEAModeLandslide && Alloy.Globals.BAEAModeLandslide[current_global_ar_index] && Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS);
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
        $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.set_text_value(e.coords.longitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldBAEAModeFormsLandslideAddress.set_text_value(address);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            if (bViewAddress) {
                Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: {
                        LATITUDE: $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value(),
                        LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value()
                    },
                    mode: "YL"
                });
                bViewAddress = false;
            }
        }
    }
    function OnBtnViewAddress_Click() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if ($.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value() && $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value()) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                users_coordinates: {
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value()
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
    function OnLandslideType_Changed(e) {
        current_landslide_type = e.value;
    }
    function OnMaterialType_Changed(e) {
        current_material_type = e.value;
    }
    function OnAreaAffected_Changed(e) {
        current_area_affected = e.value;
    }
    function OnVulnerableFacilities_Changed(e) {
        current_vulnerable_facilities = e.value;
    }
    function OnTableViewBAEAModeFormsLandslide_Click(e) {
        try {
            BusyAction($.activity_indicator, controls, function() {
                switch (e.index) {
                  case 0:
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_landslide:landslide_type_changed", OnLandslideType_Changed);
                    Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsLandslideLandslideTypeView", {
                        landslide_type: current_landslide_type,
                        is_synchronized: current_is_synchronized
                    });
                    break;

                  case 1:
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_landslide:material_type_changed", OnMaterialType_Changed);
                    Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsLandslideMaterialTypeView", {
                        material_type: current_material_type,
                        is_synchronized: current_is_synchronized
                    });
                    break;

                  case 2:
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_landslide:area_affected_changed", OnAreaAffected_Changed);
                    Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsLandslideAreaAffectedView", {
                        area_affected: current_area_affected,
                        is_synchronized: current_is_synchronized
                    });
                    break;

                  case 3:
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_landslide:vulnerable_facilities_changed", OnVulnerableFacilities_Changed);
                    Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsLandslideVulnerableFacilitiesView", {
                        vulnerable_facilities: current_vulnerable_facilities,
                        is_synchronized: current_is_synchronized
                    });
                }
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
                    Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["PHOTOS"] || (Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["PHOTOS"] = new Array());
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["DATE"] = new Date().getTime().toString();
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.get_text_value();
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value();
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value();
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsLandslideAddress.get_text_value();
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsLandslideNotes.get_text_value();
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LANDSLIDE_TYPE"] = current_landslide_type;
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["MATERIAL_TYPE"] = current_material_type;
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["AREA_AFFECTED"] = current_area_affected;
                Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["VULNERABLE_FACILITIES"] = current_vulnerable_facilities;
                Ti.App.fireEvent("baea_mode_manage_section:record_update", {
                    index: current_global_ar_index,
                    value: Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["SITE"]
                });
            } else {
                var newLandslideItem = {
                    ID: -1,
                    DATE: new Date().getTime().toString(),
                    LANDSLIDE_TYPE: current_landslide_type,
                    MATERIAL_TYPE: current_material_type,
                    AREA_AFFECTED: current_area_affected,
                    VULNERABLE_FACILITIES: current_vulnerable_facilities,
                    SITE: $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.get_text_value(),
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value(),
                    ADDRESS: $.widgetAppTextFieldBAEAModeFormsLandslideAddress.get_text_value(),
                    NOTES: $.widgetAppTextFieldBAEAModeFormsLandslideNotes.get_text_value()
                };
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    newLandslideItem["PHOTOS"] = new Array();
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        newLandslideItem["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeLandslide.length > 0 ? Alloy.Globals.BAEAModeLandslide.splice(0, 0, newLandslideItem) : Alloy.Globals.BAEAModeLandslide.push(newLandslideItem);
                Ti.App.fireEvent("baea_mode_manage_section:record_new");
            }
            Back();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLandslideView";
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
    $.__views.baeaModeFormsLandslideWindow = Ti.UI.createWindow({
        title: L("baea_mode_landslide_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsLandslideWindow"
    });
    $.__views.baeaModeFormsLandslideWindow && $.addTopLevelView($.__views.baeaModeFormsLandslideWindow);
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsLandslideWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsLandslideWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsLandslideWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsLandslideWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.baeaModeFormsLandslideWindow.add($.__views.activity_indicator);
    $.__views.scrollViewLandslide = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewLandslide"
    });
    $.__views.baeaModeFormsLandslideWindow.add($.__views.scrollViewLandslide);
    $.__views.viewAppTextFieldBAEAModeFormsLandslideSiteName = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsLandslideSiteName"
    });
    $.__views.scrollViewLandslide.add($.__views.viewAppTextFieldBAEAModeFormsLandslideSiteName);
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideSiteName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLandslideSiteName",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLandslideSiteName
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideSiteName.setParent($.__views.viewAppTextFieldBAEAModeFormsLandslideSiteName);
    var __alloyId40 = [];
    $.__views.__alloyId41 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "landslide_photo_row",
        id: "__alloyId41"
    });
    __alloyId40.push($.__views.__alloyId41);
    $.__views.lblPhoto = Ti.UI.createLabel({
        text: L("generic_photo_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblPhoto"
    });
    $.__views.__alloyId41.add($.__views.lblPhoto);
    $.__views.tableViewBAEAModeFormsLandslidePhoto = Ti.UI.createTableView({
        top: 70,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId40,
        id: "tableViewBAEAModeFormsLandslidePhoto"
    });
    $.__views.scrollViewLandslide.add($.__views.tableViewBAEAModeFormsLandslidePhoto);
    OnTableViewBAEAModeFormsLandslidePhoto_Click ? $.__views.tableViewBAEAModeFormsLandslidePhoto.addEventListener("click", OnTableViewBAEAModeFormsLandslidePhoto_Click) : __defers["$.__views.tableViewBAEAModeFormsLandslidePhoto!click!OnTableViewBAEAModeFormsLandslidePhoto_Click"] = true;
    $.__views.btnBAEAModeFormsLandslideLoadAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsLandslideLoadAddress"
    });
    $.__views.scrollViewLandslide.add($.__views.btnBAEAModeFormsLandslideLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnBAEAModeFormsLandslideLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnBAEAModeFormsLandslideLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsLandslideLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLandslideLatitude"
    });
    $.__views.scrollViewLandslide.add($.__views.viewAppTextFieldBAEAModeFormsLandslideLatitude);
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLandslideLatitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLandslideLatitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideLatitude.setParent($.__views.viewAppTextFieldBAEAModeFormsLandslideLatitude);
    $.__views.viewAppTextFieldBAEAModeFormsLandslideLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLandslideLongitude"
    });
    $.__views.scrollViewLandslide.add($.__views.viewAppTextFieldBAEAModeFormsLandslideLongitude);
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLandslideLongitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLandslideLongitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideLongitude.setParent($.__views.viewAppTextFieldBAEAModeFormsLandslideLongitude);
    $.__views.viewAppTextFieldBAEAModeFormsLandslideAddress = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLandslideAddress"
    });
    $.__views.scrollViewLandslide.add($.__views.viewAppTextFieldBAEAModeFormsLandslideAddress);
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLandslideAddress",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLandslideAddress
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideAddress.setParent($.__views.viewAppTextFieldBAEAModeFormsLandslideAddress);
    $.__views.btnBAEAModeFormsLandslideViewAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsLandslideViewAddress"
    });
    $.__views.scrollViewLandslide.add($.__views.btnBAEAModeFormsLandslideViewAddress);
    OnBtnViewAddress_Click ? $.__views.btnBAEAModeFormsLandslideViewAddress.addEventListener("click", OnBtnViewAddress_Click) : __defers["$.__views.btnBAEAModeFormsLandslideViewAddress!click!OnBtnViewAddress_Click"] = true;
    var __alloyId42 = [];
    $.__views.__alloyId43 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "landslide_row",
        id: "__alloyId43"
    });
    __alloyId42.push($.__views.__alloyId43);
    $.__views.lblLandslideType = Ti.UI.createLabel({
        text: L("generic_landslide_type_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblLandslideType"
    });
    $.__views.__alloyId43.add($.__views.lblLandslideType);
    $.__views.__alloyId44 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "landslide_row",
        id: "__alloyId44"
    });
    __alloyId42.push($.__views.__alloyId44);
    $.__views.lblMaterialType = Ti.UI.createLabel({
        text: L("generic_material_type_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblMaterialType"
    });
    $.__views.__alloyId44.add($.__views.lblMaterialType);
    $.__views.__alloyId45 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "landslide_row",
        id: "__alloyId45"
    });
    __alloyId42.push($.__views.__alloyId45);
    $.__views.lblAreaAffected = Ti.UI.createLabel({
        text: L("generic_area_affected_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblAreaAffected"
    });
    $.__views.__alloyId45.add($.__views.lblAreaAffected);
    $.__views.__alloyId46 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "landslide_row",
        id: "__alloyId46"
    });
    __alloyId42.push($.__views.__alloyId46);
    $.__views.lblVulnerableFacilities = Ti.UI.createLabel({
        text: L("generic_vulnerable_facilities_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblVulnerableFacilities"
    });
    $.__views.__alloyId46.add($.__views.lblVulnerableFacilities);
    $.__views.tableViewBAEAModeFormsLandslide = Ti.UI.createTableView({
        top: 490,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 200,
        data: __alloyId42,
        id: "tableViewBAEAModeFormsLandslide"
    });
    $.__views.scrollViewLandslide.add($.__views.tableViewBAEAModeFormsLandslide);
    OnTableViewBAEAModeFormsLandslide_Click ? $.__views.tableViewBAEAModeFormsLandslide.addEventListener("click", OnTableViewBAEAModeFormsLandslide_Click) : __defers["$.__views.tableViewBAEAModeFormsLandslide!click!OnTableViewBAEAModeFormsLandslide_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsLandslideNotes = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLandslideNotes"
    });
    $.__views.scrollViewLandslide.add($.__views.viewAppTextFieldBAEAModeFormsLandslideNotes);
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideNotes = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLandslideNotes",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLandslideNotes
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLandslideNotes.setParent($.__views.viewAppTextFieldBAEAModeFormsLandslideNotes);
    $.__views.btnBAEAModeFormsLandslideRecord = Ti.UI.createButton({
        title: L("generic_record_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 770,
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
        id: "btnBAEAModeFormsLandslideRecord"
    });
    $.__views.scrollViewLandslide.add($.__views.btnBAEAModeFormsLandslideRecord);
    OnBtnRecord_Click ? $.__views.btnBAEAModeFormsLandslideRecord.addEventListener("click", OnBtnRecord_Click) : __defers["$.__views.btnBAEAModeFormsLandslideRecord!click!OnBtnRecord_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.form_id;
    var current_global_ar_index = args.global_ar_index;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btnBAEAModeFormsLandslideLoadAddress);
    controls.push($.btnBAEAModeFormsLandslideViewAddress);
    controls.push($.btnBAEAModeFormsLandslideRecord);
    var bIsWorkInProgress = false;
    var timeout = null;
    var bViewAddress = false;
    var current_landslide_type = "0000000";
    var current_material_type = "000";
    var current_area_affected = "00000";
    var current_vulnerable_facilities = "00000";
    try {
        Alloy.Globals.CurrentTemporaryPicsPath = null;
        $.btnBAEAModeFormsLandslideLoadAddress.enabled = view_enabled;
        $.btnBAEAModeFormsLandslideRecord.enabled = view_enabled;
        $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.init(L("generic_site_name_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.init(L("generic_latitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.init(L("generic_longitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLandslideAddress.init(L("generic_address_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLandslideAddress.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLandslideNotes.init(L("generic_notes_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLandslideNotes.enabled(view_enabled);
        if (-1 != current_global_ar_index) {
            $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.set_text_value(Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["SITE"]);
            $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.set_text_value(Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LATITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.set_text_value(Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LONGITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsLandslideAddress.set_text_value(Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["ADDRESS"]);
            $.widgetAppTextFieldBAEAModeFormsLandslideNotes.set_text_value(Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["NOTES"]);
            current_landslide_type = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LANDSLIDE_TYPE"];
            current_material_type = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["MATERIAL_TYPE"];
            current_area_affected = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["AREA_AFFECTED"];
            current_vulnerable_facilities = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["VULNERABLE_FACILITIES"];
        }
        RegisterHideKeyboard($.baeaModeFormsLandslideWindow, [ $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLandslideAddress.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLandslideNotes.get_text_field() ]);
        $.baeaModeFormsLandslideWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.baeaModeFormsLandslideWindow!android:back!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsLandslideWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.baeaModeFormsLandslideWindow!androidback!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsLandslideWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewBAEAModeFormsLandslidePhoto!click!OnTableViewBAEAModeFormsLandslidePhoto_Click"] && $.__views.tableViewBAEAModeFormsLandslidePhoto.addEventListener("click", OnTableViewBAEAModeFormsLandslidePhoto_Click);
    __defers["$.__views.btnBAEAModeFormsLandslideLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnBAEAModeFormsLandslideLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    __defers["$.__views.btnBAEAModeFormsLandslideViewAddress!click!OnBtnViewAddress_Click"] && $.__views.btnBAEAModeFormsLandslideViewAddress.addEventListener("click", OnBtnViewAddress_Click);
    __defers["$.__views.tableViewBAEAModeFormsLandslide!click!OnTableViewBAEAModeFormsLandslide_Click"] && $.__views.tableViewBAEAModeFormsLandslide.addEventListener("click", OnTableViewBAEAModeFormsLandslide_Click);
    __defers["$.__views.btnBAEAModeFormsLandslideRecord!click!OnBtnRecord_Click"] && $.__views.btnBAEAModeFormsLandslideRecord.addEventListener("click", OnBtnRecord_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;