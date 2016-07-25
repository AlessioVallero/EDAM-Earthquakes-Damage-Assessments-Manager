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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_new");
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_update");
            Alloy.Globals.CurrentTemporaryPicsPath = null;
            $.baeaModeFormsTsunamiWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsTsunamiPhoto_Click() {
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
                                        section: "TS"
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
                                        section: "TS"
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
                                baea_section: "TS"
                            });
                            break;

                          case 3:
                            var media_array = {
                                PERMANENT: null,
                                TEMPORARY: null
                            };
                            Alloy.Globals.BAEAModeTsunami && Alloy.Globals.BAEAModeTsunami[current_global_ar_index] && Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS);
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
                    Alloy.Globals.BAEAModeTsunami && Alloy.Globals.BAEAModeTsunami[current_global_ar_index] && Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS);
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
        $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.set_text_value(e.coords.longitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.set_text_value(address);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            if (bViewAddress) {
                Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: {
                        LATITUDE: $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value(),
                        LONGITUDE: $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value()
                    },
                    mode: "YL"
                });
                bViewAddress = false;
            }
        }
    }
    function OnBtnViewAddress_Click() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if ($.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value() && $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value()) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                users_coordinates: {
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value()
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
    function OnBtnRecord_Click() {
        try {
            if (-1 != current_global_ar_index) {
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PHOTOS"] || (Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PHOTOS"] = new Array());
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["DATE"] = new Date().getTime().toString();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["INUNDATION"] = $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_HEIGHT"] = $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PEAK_TO_TROUGH"] = $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_CYCLE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["DAMAGE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.get_text_value();
                Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.get_text_value();
                Ti.App.fireEvent("baea_mode_manage_section:record_update", {
                    index: current_global_ar_index,
                    value: Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["SITE"]
                });
            } else {
                var newTsunamiItem = {
                    ID: -1,
                    DATE: new Date().getTime().toString(),
                    SITE: $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.get_text_value(),
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value(),
                    ADDRESS: $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.get_text_value(),
                    INUNDATION: $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.get_text_value(),
                    WAVE_HEIGHT: $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.get_text_value(),
                    PEAK_TO_TROUGH: $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.get_text_value(),
                    WAVE_CYCLE: $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.get_text_value(),
                    DAMAGE: $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.get_text_value(),
                    NOTES: $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.get_text_value()
                };
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    newTsunamiItem["PHOTOS"] = new Array();
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        newTsunamiItem["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeTsunami.length > 0 ? Alloy.Globals.BAEAModeTsunami.splice(0, 0, newTsunamiItem) : Alloy.Globals.BAEAModeTsunami.push(newTsunamiItem);
                Ti.App.fireEvent("baea_mode_manage_section:record_new");
            }
            Back();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsTsunamiView";
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
    $.__views.baeaModeFormsTsunamiWindow = Ti.UI.createWindow({
        title: L("baea_mode_tsunami_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsTsunamiWindow"
    });
    $.__views.baeaModeFormsTsunamiWindow && $.addTopLevelView($.__views.baeaModeFormsTsunamiWindow);
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsTsunamiWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsTsunamiWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsTsunamiWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsTsunamiWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.baeaModeFormsTsunamiWindow.add($.__views.activity_indicator);
    $.__views.scrollViewTsunami = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewTsunami"
    });
    $.__views.baeaModeFormsTsunamiWindow.add($.__views.scrollViewTsunami);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiSiteName = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsTsunamiSiteName"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiSiteName);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiSiteName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiSiteName",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiSiteName
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiSiteName);
    var __alloyId55 = [];
    $.__views.__alloyId56 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "tsunami_photo_row",
        id: "__alloyId56"
    });
    __alloyId55.push($.__views.__alloyId56);
    $.__views.lblPhoto = Ti.UI.createLabel({
        text: L("generic_photo_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblPhoto"
    });
    $.__views.__alloyId56.add($.__views.lblPhoto);
    $.__views.tableViewBAEAModeFormsTsunamiPhoto = Ti.UI.createTableView({
        top: 70,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId55,
        id: "tableViewBAEAModeFormsTsunamiPhoto"
    });
    $.__views.scrollViewTsunami.add($.__views.tableViewBAEAModeFormsTsunamiPhoto);
    OnTableViewBAEAModeFormsTsunamiPhoto_Click ? $.__views.tableViewBAEAModeFormsTsunamiPhoto.addEventListener("click", OnTableViewBAEAModeFormsTsunamiPhoto_Click) : __defers["$.__views.tableViewBAEAModeFormsTsunamiPhoto!click!OnTableViewBAEAModeFormsTsunamiPhoto_Click"] = true;
    $.__views.btnBAEAModeFormsTsunamiLoadAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsTsunamiLoadAddress"
    });
    $.__views.scrollViewTsunami.add($.__views.btnBAEAModeFormsTsunamiLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnBAEAModeFormsTsunamiLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnBAEAModeFormsTsunamiLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiLatitude"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiLatitude);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiLatitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiLatitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiLatitude);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiLongitude"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiLongitude);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiLongitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiLongitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiLongitude);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiAddress = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiAddress"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiAddress);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiAddress",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiAddress
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiAddress.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiAddress);
    $.__views.btnBAEAModeFormsTsunamiViewAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsTsunamiViewAddress"
    });
    $.__views.scrollViewTsunami.add($.__views.btnBAEAModeFormsTsunamiViewAddress);
    OnBtnViewAddress_Click ? $.__views.btnBAEAModeFormsTsunamiViewAddress.addEventListener("click", OnBtnViewAddress_Click) : __defers["$.__views.btnBAEAModeFormsTsunamiViewAddress!click!OnBtnViewAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiInundation = Ti.UI.createView({
        top: 490,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsTsunamiInundation"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiInundation);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiInundation = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiInundation",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiInundation
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiInundation.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiInundation);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveHeight = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiWaveHeight"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveHeight);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveHeight
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveHeight);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiPeakToTrough = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiPeakToTrough"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiPeakToTrough);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiPeakToTrough
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiPeakToTrough);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveCycle = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiWaveCycle"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveCycle);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveCycle
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiWaveCycle);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiDamage = Ti.UI.createView({
        top: 770,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiDamage"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiDamage);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiDamage = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiDamage",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiDamage
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiDamage.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiDamage);
    $.__views.viewAppTextFieldBAEAModeFormsTsunamiNotes = Ti.UI.createView({
        top: 840,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsTsunamiNotes"
    });
    $.__views.scrollViewTsunami.add($.__views.viewAppTextFieldBAEAModeFormsTsunamiNotes);
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiNotes = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsTsunamiNotes",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsTsunamiNotes
    });
    $.__views.widgetAppTextFieldBAEAModeFormsTsunamiNotes.setParent($.__views.viewAppTextFieldBAEAModeFormsTsunamiNotes);
    $.__views.btnBAEAModeFormsTsunamiRecord = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsTsunamiRecord"
    });
    $.__views.scrollViewTsunami.add($.__views.btnBAEAModeFormsTsunamiRecord);
    OnBtnRecord_Click ? $.__views.btnBAEAModeFormsTsunamiRecord.addEventListener("click", OnBtnRecord_Click) : __defers["$.__views.btnBAEAModeFormsTsunamiRecord!click!OnBtnRecord_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.form_id;
    var current_global_ar_index = args.global_ar_index;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btnBAEAModeFormsTsunamiLoadAddress);
    controls.push($.btnBAEAModeFormsTsunamiViewAddress);
    controls.push($.btnBAEAModeFormsTsunamiRecord);
    var bIsWorkInProgress = false;
    var timeout = null;
    var bViewAddress = false;
    try {
        Alloy.Globals.CurrentTemporaryPicsPath = null;
        $.btnBAEAModeFormsTsunamiLoadAddress.enabled = view_enabled;
        $.btnBAEAModeFormsTsunamiRecord.enabled = view_enabled;
        $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.init(L("generic_site_name_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.init(L("generic_latitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.init(L("generic_longitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.init(L("generic_address_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.init(L("generic_inundation_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.init(L("generic_wave_height_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.init(L("generic_peak_to_trough_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.init(L("generic_wave_cycle_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.init(L("generic_damage_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.init(L("generic_notes_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.enabled(view_enabled);
        if (-1 != current_global_ar_index) {
            $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["SITE"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LATITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LONGITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["ADDRESS"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["INUNDATION"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_HEIGHT"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PEAK_TO_TROUGH"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_CYCLE"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["DAMAGE"]);
            $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.set_text_value(Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["NOTES"]);
        }
        RegisterHideKeyboard($.baeaModeFormsTsunamiWindow, [ $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.get_text_field(), $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.get_text_field() ]);
        $.baeaModeFormsTsunamiWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.baeaModeFormsTsunamiWindow!android:back!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsTsunamiWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.baeaModeFormsTsunamiWindow!androidback!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsTsunamiWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewBAEAModeFormsTsunamiPhoto!click!OnTableViewBAEAModeFormsTsunamiPhoto_Click"] && $.__views.tableViewBAEAModeFormsTsunamiPhoto.addEventListener("click", OnTableViewBAEAModeFormsTsunamiPhoto_Click);
    __defers["$.__views.btnBAEAModeFormsTsunamiLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnBAEAModeFormsTsunamiLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    __defers["$.__views.btnBAEAModeFormsTsunamiViewAddress!click!OnBtnViewAddress_Click"] && $.__views.btnBAEAModeFormsTsunamiViewAddress.addEventListener("click", OnBtnViewAddress_Click);
    __defers["$.__views.btnBAEAModeFormsTsunamiRecord!click!OnBtnRecord_Click"] && $.__views.btnBAEAModeFormsTsunamiRecord.addEventListener("click", OnBtnRecord_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;