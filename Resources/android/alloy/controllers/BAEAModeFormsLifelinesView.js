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
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_lifelines:communication_changed", OnCommunication_Changed);
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_lifelines:electric_power_delivery_changed", OnElectricPowerDelivery_Changed);
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_lifelines:other_changed", OnOther_Changed);
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_new");
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_update");
            Alloy.Globals.CurrentTemporaryPicsPath = null;
            $.baeaModeFormsLifelinesWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsLifelinesPhoto_Click() {
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
                                        section: "LI"
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
                                        section: "LI"
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
                                baea_section: "LI"
                            });
                            break;

                          case 3:
                            var media_array = {
                                PERMANENT: null,
                                TEMPORARY: null
                            };
                            Alloy.Globals.BAEAModeLifelines && Alloy.Globals.BAEAModeLifelines[current_global_ar_index] && Alloy.Globals.BAEAModeLifelines[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeLifelines[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeLifelines[current_global_ar_index].PHOTOS);
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
                    Alloy.Globals.BAEAModeLifelines && Alloy.Globals.BAEAModeLifelines[current_global_ar_index] && Alloy.Globals.BAEAModeLifelines[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeLifelines[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeLifelines[current_global_ar_index].PHOTOS);
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
        $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.set_text_value(e.coords.longitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldBAEAModeFormsLifelinesAddress.set_text_value(address);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            if (bViewAddress) {
                Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: {
                        LATITUDE: $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.get_text_value(),
                        LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.get_text_value()
                    },
                    mode: "YL"
                });
                bViewAddress = false;
            }
        }
    }
    function OnBtnViewAddress_Click() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if ($.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.get_text_value() && $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.get_text_value()) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                users_coordinates: {
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.get_text_value()
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
    function OnCommunication_Changed(e) {
        current_communication = e.value;
    }
    function OnElectricPowerDelivery_Changed(e) {
        current_electric_power_delivery = e.value;
    }
    function OnOther_Changed(e) {
        current_other = e.value;
    }
    function OnTableViewBAEAModeFormsLifelines_Click(e) {
        try {
            BusyAction($.activity_indicator, controls, function() {
                switch (e.index) {
                  case 0:
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_lifelines:communication_changed", OnCommunication_Changed);
                    Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsLifelinesCommunicationView", {
                        communication: current_communication,
                        is_synchronized: current_is_synchronized
                    });
                    break;

                  case 1:
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_lifelines:electric_power_delivery_changed", OnElectricPowerDelivery_Changed);
                    Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsLifelinesElectricPowerDeliveryView", {
                        electric_power_delivery: current_electric_power_delivery,
                        is_synchronized: current_is_synchronized
                    });
                    break;

                  case 2:
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_lifelines:other_changed", OnOther_Changed);
                    Alloy.Globals.createAndOpenControllerExt("BAEAModeFormsLifelinesOtherView", {
                        other: current_other,
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
    function OnFunctionality_Change(e) {
        current_functionality = e.id;
    }
    function OnRepairTime_Change(e) {
        current_repair_time = e.id;
    }
    function OnRecommendFurtherInvestigation_Change(e) {
        current_recommend_further_investigation = e.id;
    }
    function OnBtnRecord_Click() {
        try {
            if (-1 != current_global_ar_index) {
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["PHOTOS"] || (Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["PHOTOS"] = new Array());
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["DATE"] = new Date().getTime().toString();
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsLifelinesSiteName.get_text_value();
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.get_text_value();
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.get_text_value();
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsLifelinesAddress.get_text_value();
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsLifelinesNotes.get_text_value();
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["COMMUNICATION"] = current_communication;
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["ELECTRIC_POWER_DELIVERY"] = current_electric_power_delivery;
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["OTHER"] = current_other;
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["FUNCTIONALITY"] = current_functionality;
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["REPAIR_TIME"] = current_repair_time;
                Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["RECOMMEND_FURTHER_INVESTIGATION"] = current_recommend_further_investigation;
                Ti.App.fireEvent("baea_mode_manage_section:record_update", {
                    index: current_global_ar_index,
                    value: Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["SITE"]
                });
            } else {
                var newLifelinesItem = {
                    ID: -1,
                    DATE: new Date().getTime().toString(),
                    COMMUNICATION: current_communication,
                    ELECTRIC_POWER_DELIVERY: current_electric_power_delivery,
                    OTHER: current_other,
                    FUNCTIONALITY: current_functionality,
                    REPAIR_TIME: current_repair_time,
                    RECOMMEND_FURTHER_INVESTIGATION: current_recommend_further_investigation,
                    SITE: $.widgetAppTextFieldBAEAModeFormsLifelinesSiteName.get_text_value(),
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.get_text_value(),
                    ADDRESS: $.widgetAppTextFieldBAEAModeFormsLifelinesAddress.get_text_value(),
                    NOTES: $.widgetAppTextFieldBAEAModeFormsLifelinesNotes.get_text_value()
                };
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    newLifelinesItem["PHOTOS"] = new Array();
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        newLifelinesItem["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeLifelines.length > 0 ? Alloy.Globals.BAEAModeLifelines.splice(0, 0, newLifelinesItem) : Alloy.Globals.BAEAModeLifelines.push(newLifelinesItem);
                Ti.App.fireEvent("baea_mode_manage_section:record_new");
            }
            Back();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLifelinesView";
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
    $.__views.baeaModeFormsLifelinesWindow = Ti.UI.createWindow({
        title: L("baea_mode_lifelines_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsLifelinesWindow"
    });
    $.__views.baeaModeFormsLifelinesWindow && $.addTopLevelView($.__views.baeaModeFormsLifelinesWindow);
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsLifelinesWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsLifelinesWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsLifelinesWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsLifelinesWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.baeaModeFormsLifelinesWindow.add($.__views.activity_indicator);
    $.__views.scrollViewLifelines = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewLifelines"
    });
    $.__views.baeaModeFormsLifelinesWindow.add($.__views.scrollViewLifelines);
    $.__views.viewAppTextFieldBAEAModeFormsLifelinesSiteName = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsLifelinesSiteName"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppTextFieldBAEAModeFormsLifelinesSiteName);
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesSiteName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLifelinesSiteName",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLifelinesSiteName
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesSiteName.setParent($.__views.viewAppTextFieldBAEAModeFormsLifelinesSiteName);
    var __alloyId47 = [];
    $.__views.__alloyId48 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "lifelines_photo_row",
        id: "__alloyId48"
    });
    __alloyId47.push($.__views.__alloyId48);
    $.__views.lblPhoto = Ti.UI.createLabel({
        text: L("generic_photo_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblPhoto"
    });
    $.__views.__alloyId48.add($.__views.lblPhoto);
    $.__views.tableViewBAEAModeFormsLifelinesPhoto = Ti.UI.createTableView({
        top: 70,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId47,
        id: "tableViewBAEAModeFormsLifelinesPhoto"
    });
    $.__views.scrollViewLifelines.add($.__views.tableViewBAEAModeFormsLifelinesPhoto);
    OnTableViewBAEAModeFormsLifelinesPhoto_Click ? $.__views.tableViewBAEAModeFormsLifelinesPhoto.addEventListener("click", OnTableViewBAEAModeFormsLifelinesPhoto_Click) : __defers["$.__views.tableViewBAEAModeFormsLifelinesPhoto!click!OnTableViewBAEAModeFormsLifelinesPhoto_Click"] = true;
    $.__views.btnBAEAModeFormsLifelinesLoadAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsLifelinesLoadAddress"
    });
    $.__views.scrollViewLifelines.add($.__views.btnBAEAModeFormsLifelinesLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnBAEAModeFormsLifelinesLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnBAEAModeFormsLifelinesLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsLifelinesLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLifelinesLatitude"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppTextFieldBAEAModeFormsLifelinesLatitude);
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLifelinesLatitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLifelinesLatitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.setParent($.__views.viewAppTextFieldBAEAModeFormsLifelinesLatitude);
    $.__views.viewAppTextFieldBAEAModeFormsLifelinesLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLifelinesLongitude"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppTextFieldBAEAModeFormsLifelinesLongitude);
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLifelinesLongitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLifelinesLongitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.setParent($.__views.viewAppTextFieldBAEAModeFormsLifelinesLongitude);
    $.__views.viewAppTextFieldBAEAModeFormsLifelinesAddress = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLifelinesAddress"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppTextFieldBAEAModeFormsLifelinesAddress);
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLifelinesAddress",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLifelinesAddress
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesAddress.setParent($.__views.viewAppTextFieldBAEAModeFormsLifelinesAddress);
    $.__views.btnBAEAModeFormsLifelinesViewAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsLifelinesViewAddress"
    });
    $.__views.scrollViewLifelines.add($.__views.btnBAEAModeFormsLifelinesViewAddress);
    OnBtnViewAddress_Click ? $.__views.btnBAEAModeFormsLifelinesViewAddress.addEventListener("click", OnBtnViewAddress_Click) : __defers["$.__views.btnBAEAModeFormsLifelinesViewAddress!click!OnBtnViewAddress_Click"] = true;
    var __alloyId49 = [];
    $.__views.__alloyId50 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "lifelines_row",
        id: "__alloyId50"
    });
    __alloyId49.push($.__views.__alloyId50);
    $.__views.lblCommunication = Ti.UI.createLabel({
        text: L("generic_communication_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblCommunication"
    });
    $.__views.__alloyId50.add($.__views.lblCommunication);
    $.__views.__alloyId51 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "lifelines_row",
        id: "__alloyId51"
    });
    __alloyId49.push($.__views.__alloyId51);
    $.__views.lblElectricPowerDelivery = Ti.UI.createLabel({
        text: L("generic_electric_power_delivery_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblElectricPowerDelivery"
    });
    $.__views.__alloyId51.add($.__views.lblElectricPowerDelivery);
    $.__views.__alloyId52 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "lifelines_row",
        id: "__alloyId52"
    });
    __alloyId49.push($.__views.__alloyId52);
    $.__views.lblOther = Ti.UI.createLabel({
        text: L("generic_other_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblOther"
    });
    $.__views.__alloyId52.add($.__views.lblOther);
    $.__views.tableViewBAEAModeFormsLifelines = Ti.UI.createTableView({
        top: 490,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 150,
        data: __alloyId49,
        id: "tableViewBAEAModeFormsLifelines"
    });
    $.__views.scrollViewLifelines.add($.__views.tableViewBAEAModeFormsLifelines);
    OnTableViewBAEAModeFormsLifelines_Click ? $.__views.tableViewBAEAModeFormsLifelines.addEventListener("click", OnTableViewBAEAModeFormsLifelines_Click) : __defers["$.__views.tableViewBAEAModeFormsLifelines!click!OnTableViewBAEAModeFormsLifelines_Click"] = true;
    $.__views.viewAppComboBoxBAEAModeFormsLifelinesFunctionality = Ti.UI.createView({
        top: 650,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsLifelinesFunctionality"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppComboBoxBAEAModeFormsLifelinesFunctionality);
    $.__views.widgetAppComboBoxBAEAModeFormsLifelinesFunctionality = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsLifelinesFunctionality",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsLifelinesFunctionality
    });
    $.__views.widgetAppComboBoxBAEAModeFormsLifelinesFunctionality.setParent($.__views.viewAppComboBoxBAEAModeFormsLifelinesFunctionality);
    $.__views.viewAppComboBoxBAEAModeFormsLifelinesRepairTime = Ti.UI.createView({
        top: 720,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsLifelinesRepairTime"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppComboBoxBAEAModeFormsLifelinesRepairTime);
    $.__views.widgetAppComboBoxBAEAModeFormsLifelinesRepairTime = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsLifelinesRepairTime",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsLifelinesRepairTime
    });
    $.__views.widgetAppComboBoxBAEAModeFormsLifelinesRepairTime.setParent($.__views.viewAppComboBoxBAEAModeFormsLifelinesRepairTime);
    $.__views.viewAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation = Ti.UI.createView({
        top: 790,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation);
    $.__views.widgetAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation
    });
    $.__views.widgetAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation.setParent($.__views.viewAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation);
    $.__views.viewAppTextFieldBAEAModeFormsLifelinesNotes = Ti.UI.createView({
        top: 860,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLifelinesNotes"
    });
    $.__views.scrollViewLifelines.add($.__views.viewAppTextFieldBAEAModeFormsLifelinesNotes);
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesNotes = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLifelinesNotes",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLifelinesNotes
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLifelinesNotes.setParent($.__views.viewAppTextFieldBAEAModeFormsLifelinesNotes);
    $.__views.btnBAEAModeFormsLifelinesRecord = Ti.UI.createButton({
        title: L("generic_record_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 930,
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
        id: "btnBAEAModeFormsLifelinesRecord"
    });
    $.__views.scrollViewLifelines.add($.__views.btnBAEAModeFormsLifelinesRecord);
    OnBtnRecord_Click ? $.__views.btnBAEAModeFormsLifelinesRecord.addEventListener("click", OnBtnRecord_Click) : __defers["$.__views.btnBAEAModeFormsLifelinesRecord!click!OnBtnRecord_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.form_id;
    var current_global_ar_index = args.global_ar_index;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btnBAEAModeFormsLifelinesLoadAddress);
    controls.push($.btnBAEAModeFormsLifelinesViewAddress);
    controls.push($.btnBAEAModeFormsLifelinesRecord);
    var bIsWorkInProgress = false;
    var timeout = null;
    var bViewAddress = false;
    var current_communication = "000";
    var current_electric_power_delivery = "00";
    var current_other = "0000";
    var current_functionality = "1";
    var current_repair_time = "0";
    var current_recommend_further_investigation = "0";
    try {
        Alloy.Globals.CurrentTemporaryPicsPath = null;
        var functionalityView = null;
        var repairTimeView = null;
        var recommendFurtherInvestigationView = null;
        functionalityView = $.viewAppComboBoxBAEAModeFormsLifelinesFunctionality;
        repairTimeView = $.viewAppComboBoxBAEAModeFormsLifelinesRepairTime;
        recommendFurtherInvestigationView = $.viewAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation;
        $.btnBAEAModeFormsLifelinesLoadAddress.enabled = view_enabled;
        $.btnBAEAModeFormsLifelinesRecord.enabled = view_enabled;
        $.widgetAppTextFieldBAEAModeFormsLifelinesSiteName.init(L("generic_site_name_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLifelinesSiteName.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.init(L("generic_latitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.init(L("generic_longitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLifelinesAddress.init(L("generic_address_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLifelinesAddress.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLifelinesNotes.init(L("generic_notes_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLifelinesNotes.enabled(view_enabled);
        var functionalityValues = {
            0: {
                title: L("generic_functionality_fully_functional")
            },
            1: {
                title: L("generic_functionality_partially_functional")
            },
            2: {
                title: L("generic_functionality_not_functional")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsLifelinesFunctionality.init(L("generic_functionality_text_msg"), functionalityValues, OnFunctionality_Change, null, functionalityView);
        $.widgetAppComboBoxBAEAModeFormsLifelinesFunctionality.enabled(view_enabled);
        var repairTimeValues = {
            0: {
                title: L("generic_repair_time_one_to_six_days")
            },
            1: {
                title: L("generic_repair_time_one_to_four_weeks")
            },
            2: {
                title: L("generic_repair_time_one_to_twelve_months")
            },
            3: {
                title: L("generic_repair_time_one_to_three_years")
            },
            4: {
                title: L("generic_repair_time_four_plus_years")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsLifelinesRepairTime.init(L("generic_repair_time_text_msg"), repairTimeValues, OnRepairTime_Change, null, repairTimeView);
        $.widgetAppComboBoxBAEAModeFormsLifelinesRepairTime.enabled(view_enabled);
        var recommendFurtherInvestigationValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation.init(L("generic_recommend_further_investigation_text_msg"), recommendFurtherInvestigationValues, OnRecommendFurtherInvestigation_Change, null, recommendFurtherInvestigationView);
        $.widgetAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation.enabled(view_enabled);
        if (-1 != current_global_ar_index) {
            $.widgetAppTextFieldBAEAModeFormsLifelinesSiteName.set_text_value(Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["SITE"]);
            $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.set_text_value(Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["LATITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.set_text_value(Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["LONGITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsLifelinesAddress.set_text_value(Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["ADDRESS"]);
            $.widgetAppTextFieldBAEAModeFormsLifelinesNotes.set_text_value(Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["NOTES"]);
            current_communication = Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["COMMUNICATION"];
            current_electric_power_delivery = Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["ELECTRIC_POWER_DELIVERY"];
            current_other = Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["OTHER"];
            current_functionality = Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["FUNCTIONALITY"];
            $.widgetAppComboBoxBAEAModeFormsLifelinesFunctionality.set_selected_index(current_functionality);
            current_repair_time = Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["REPAIR_TIME"];
            $.widgetAppComboBoxBAEAModeFormsLifelinesRepairTime.set_selected_index(current_repair_time);
            current_recommend_further_investigation = Alloy.Globals.BAEAModeLifelines[current_global_ar_index]["RECOMMEND_FURTHER_INVESTIGATION"];
            $.widgetAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation.set_selected_index(current_recommend_further_investigation);
        } else {
            $.widgetAppComboBoxBAEAModeFormsLifelinesFunctionality.set_selected_index("1");
            $.widgetAppComboBoxBAEAModeFormsLifelinesRepairTime.set_selected_index("0");
            $.widgetAppComboBoxBAEAModeFormsLifelinesRecommendFurtherInvestigation.set_selected_index("0");
        }
        RegisterHideKeyboard($.baeaModeFormsLifelinesWindow, [ $.widgetAppTextFieldBAEAModeFormsLifelinesSiteName.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLifelinesLatitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLifelinesLongitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLifelinesAddress.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLifelinesNotes.get_text_field() ]);
        $.baeaModeFormsLifelinesWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.baeaModeFormsLifelinesWindow!android:back!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsLifelinesWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.baeaModeFormsLifelinesWindow!androidback!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsLifelinesWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewBAEAModeFormsLifelinesPhoto!click!OnTableViewBAEAModeFormsLifelinesPhoto_Click"] && $.__views.tableViewBAEAModeFormsLifelinesPhoto.addEventListener("click", OnTableViewBAEAModeFormsLifelinesPhoto_Click);
    __defers["$.__views.btnBAEAModeFormsLifelinesLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnBAEAModeFormsLifelinesLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    __defers["$.__views.btnBAEAModeFormsLifelinesViewAddress!click!OnBtnViewAddress_Click"] && $.__views.btnBAEAModeFormsLifelinesViewAddress.addEventListener("click", OnBtnViewAddress_Click);
    __defers["$.__views.tableViewBAEAModeFormsLifelines!click!OnTableViewBAEAModeFormsLifelines_Click"] && $.__views.tableViewBAEAModeFormsLifelines.addEventListener("click", OnTableViewBAEAModeFormsLifelines_Click);
    __defers["$.__views.btnBAEAModeFormsLifelinesRecord!click!OnBtnRecord_Click"] && $.__views.btnBAEAModeFormsLifelinesRecord.addEventListener("click", OnBtnRecord_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;