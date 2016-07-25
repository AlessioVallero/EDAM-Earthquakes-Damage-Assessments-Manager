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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_new");
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode_manage_section:record_update");
            Alloy.Globals.CurrentTemporaryPicsPath = null;
            $.navigationWindowBuildings.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsBuildingsPhoto_Click() {
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
                                        section: "BU"
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
                                        section: "BU"
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
                                baea_section: "BU"
                            });
                            break;

                          case 3:
                            var media_array = {
                                PERMANENT: null,
                                TEMPORARY: null
                            };
                            Alloy.Globals.BAEAModeBuildings && Alloy.Globals.BAEAModeBuildings[current_global_ar_index] && Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS);
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
                    Alloy.Globals.BAEAModeBuildings && Alloy.Globals.BAEAModeBuildings[current_global_ar_index] && Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS);
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
        $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.set_text_value(e.coords.longitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.set_text_value(address);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            if (bViewAddress) {
                Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: {
                        LATITUDE: $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value(),
                        LONGITUDE: $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value()
                    },
                    mode: "YL"
                });
                bViewAddress = false;
            }
        }
    }
    function OnBtnViewAddress_Click() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if ($.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value() && $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value()) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                users_coordinates: {
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value()
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
    function OnBuildingType_Change(e) {
        current_building_type = e.id;
    }
    function OnOccupancyUse_Change(e) {
        current_occupancy_use = e.id;
    }
    function OnDamage_Change(e) {
        current_damage = e.id;
    }
    function OnRecommendFurtherInvestigation_Change(e) {
        current_recommend_further_investigation = e.id;
    }
    function OnBtnRecord_Click() {
        try {
            if (-1 != current_global_ar_index) {
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["PHOTOS"] || (Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["PHOTOS"] = new Array());
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["DATE"] = new Date().getTime().toString();
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.get_text_value();
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value();
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value();
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.get_text_value();
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["STORIES"] = $.widgetAppTextFieldBAEAModeFormsBuildingsStories.get_text_value();
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.get_text_value();
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["BUILDING_TYPE"] = current_building_type;
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["OCCUPANCY_USE"] = current_occupancy_use;
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["DAMAGE"] = current_damage;
                Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["RECOMMEND_FURTHER_INVESTIGATION"] = current_recommend_further_investigation;
                Ti.App.fireEvent("baea_mode_manage_section:record_update", {
                    index: current_global_ar_index,
                    value: Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["SITE"]
                });
            } else {
                var newBuildingsItem = {
                    ID: -1,
                    DATE: new Date().getTime().toString(),
                    SITE: $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.get_text_value(),
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value(),
                    ADDRESS: $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.get_text_value(),
                    STORIES: $.widgetAppTextFieldBAEAModeFormsBuildingsStories.get_text_value(),
                    NOTES: $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.get_text_value(),
                    BUILDING_TYPE: current_building_type,
                    OCCUPANCY_USE: current_occupancy_use,
                    DAMAGE: current_damage,
                    RECOMMEND_FURTHER_INVESTIGATION: current_recommend_further_investigation
                };
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    newBuildingsItem["PHOTOS"] = new Array();
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        newBuildingsItem["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeBuildings.length > 0 ? Alloy.Globals.BAEAModeBuildings.splice(0, 0, newBuildingsItem) : Alloy.Globals.BAEAModeBuildings.push(newBuildingsItem);
                Ti.App.fireEvent("baea_mode_manage_section:record_new");
            }
            Back();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsBuildingsView";
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
    $.__views.baeaModeFormsBuildingsWindow = Ti.UI.createWindow({
        title: L("baea_mode_buildings_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsBuildingsWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeFormsBuildingsWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.baeaModeFormsBuildingsWindow.add($.__views.activity_indicator);
    $.__views.scrollViewBuildings = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewBuildings"
    });
    $.__views.baeaModeFormsBuildingsWindow.add($.__views.scrollViewBuildings);
    $.__views.viewAppTextFieldBAEAModeFormsBuildingsSiteName = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsBuildingsSiteName"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppTextFieldBAEAModeFormsBuildingsSiteName);
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsSiteName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsBuildingsSiteName",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsBuildingsSiteName
    });
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.setParent($.__views.viewAppTextFieldBAEAModeFormsBuildingsSiteName);
    var __alloyId72 = [];
    $.__views.__alloyId73 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "buildings_photo_row",
        id: "__alloyId73"
    });
    __alloyId72.push($.__views.__alloyId73);
    $.__views.lblPhoto = Ti.UI.createLabel({
        text: L("generic_photo_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblPhoto"
    });
    $.__views.__alloyId73.add($.__views.lblPhoto);
    $.__views.tableViewBAEAModeFormsBuildingsPhoto = Ti.UI.createTableView({
        top: 70,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId72,
        id: "tableViewBAEAModeFormsBuildingsPhoto"
    });
    $.__views.scrollViewBuildings.add($.__views.tableViewBAEAModeFormsBuildingsPhoto);
    OnTableViewBAEAModeFormsBuildingsPhoto_Click ? $.__views.tableViewBAEAModeFormsBuildingsPhoto.addEventListener("click", OnTableViewBAEAModeFormsBuildingsPhoto_Click) : __defers["$.__views.tableViewBAEAModeFormsBuildingsPhoto!click!OnTableViewBAEAModeFormsBuildingsPhoto_Click"] = true;
    $.__views.btnBAEAModeFormsBuildingsLoadAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsBuildingsLoadAddress"
    });
    $.__views.scrollViewBuildings.add($.__views.btnBAEAModeFormsBuildingsLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnBAEAModeFormsBuildingsLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnBAEAModeFormsBuildingsLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsBuildingsLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsBuildingsLatitude"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppTextFieldBAEAModeFormsBuildingsLatitude);
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsBuildingsLatitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsBuildingsLatitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.setParent($.__views.viewAppTextFieldBAEAModeFormsBuildingsLatitude);
    $.__views.viewAppTextFieldBAEAModeFormsBuildingsLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsBuildingsLongitude"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppTextFieldBAEAModeFormsBuildingsLongitude);
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsBuildingsLongitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsBuildingsLongitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.setParent($.__views.viewAppTextFieldBAEAModeFormsBuildingsLongitude);
    $.__views.viewAppTextFieldBAEAModeFormsBuildingsAddress = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsBuildingsAddress"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppTextFieldBAEAModeFormsBuildingsAddress);
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsBuildingsAddress",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsBuildingsAddress
    });
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsAddress.setParent($.__views.viewAppTextFieldBAEAModeFormsBuildingsAddress);
    $.__views.btnBAEAModeFormsBuildingsViewAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsBuildingsViewAddress"
    });
    $.__views.scrollViewBuildings.add($.__views.btnBAEAModeFormsBuildingsViewAddress);
    OnBtnViewAddress_Click ? $.__views.btnBAEAModeFormsBuildingsViewAddress.addEventListener("click", OnBtnViewAddress_Click) : __defers["$.__views.btnBAEAModeFormsBuildingsViewAddress!click!OnBtnViewAddress_Click"] = true;
    $.__views.viewAppComboBoxBAEAModeFormsBuildingsBuildingType = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsBuildingsBuildingType"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppComboBoxBAEAModeFormsBuildingsBuildingType);
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsBuildingsBuildingType",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsBuildingsBuildingType
    });
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.setParent($.__views.viewAppComboBoxBAEAModeFormsBuildingsBuildingType);
    $.__views.viewAppComboBoxBAEAModeFormsBuildingsOccupancyUse = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsBuildingsOccupancyUse"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppComboBoxBAEAModeFormsBuildingsOccupancyUse);
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsBuildingsOccupancyUse
    });
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.setParent($.__views.viewAppComboBoxBAEAModeFormsBuildingsOccupancyUse);
    $.__views.viewAppTextFieldBAEAModeFormsBuildingsStories = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsBuildingsStories"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppTextFieldBAEAModeFormsBuildingsStories);
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsStories = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsBuildingsStories",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsBuildingsStories
    });
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsStories.setParent($.__views.viewAppTextFieldBAEAModeFormsBuildingsStories);
    $.__views.viewAppComboBoxBAEAModeFormsBuildingsDamage = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsBuildingsDamage"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppComboBoxBAEAModeFormsBuildingsDamage);
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsDamage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsBuildingsDamage",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsBuildingsDamage
    });
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsDamage.setParent($.__views.viewAppComboBoxBAEAModeFormsBuildingsDamage);
    $.__views.viewAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation = Ti.UI.createView({
        top: 770,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation);
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation
    });
    $.__views.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.setParent($.__views.viewAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation);
    $.__views.viewAppTextFieldBAEAModeFormsBuildingsNotes = Ti.UI.createView({
        top: 840,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsBuildingsNotes"
    });
    $.__views.scrollViewBuildings.add($.__views.viewAppTextFieldBAEAModeFormsBuildingsNotes);
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsNotes = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsBuildingsNotes",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsBuildingsNotes
    });
    $.__views.widgetAppTextFieldBAEAModeFormsBuildingsNotes.setParent($.__views.viewAppTextFieldBAEAModeFormsBuildingsNotes);
    $.__views.btnBAEAModeFormsBuildingsRecord = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsBuildingsRecord"
    });
    $.__views.scrollViewBuildings.add($.__views.btnBAEAModeFormsBuildingsRecord);
    OnBtnRecord_Click ? $.__views.btnBAEAModeFormsBuildingsRecord.addEventListener("click", OnBtnRecord_Click) : __defers["$.__views.btnBAEAModeFormsBuildingsRecord!click!OnBtnRecord_Click"] = true;
    $.__views.navigationWindowBuildings = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeFormsBuildingsWindow,
        id: "navigationWindowBuildings"
    });
    $.__views.navigationWindowBuildings && $.addTopLevelView($.__views.navigationWindowBuildings);
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
    controls.push($.btnBAEAModeFormsBuildingsLoadAddress);
    controls.push($.btnBAEAModeFormsBuildingsViewAddress);
    controls.push($.btnBAEAModeFormsBuildingsRecord);
    var bIsWorkInProgress = false;
    var timeout = null;
    var bViewAddress = false;
    var current_building_type = "0";
    var current_occupancy_use = "1";
    var current_damage = "2";
    var current_recommend_further_investigation = "0";
    try {
        Alloy.Globals.CurrentTemporaryPicsPath = null;
        var buildingTypeView = null;
        var occupancyUseView = null;
        var damageView = null;
        var recommendFurtherInvestigationView = null;
        var mainView = $.getView();
        buildingTypeView = mainView;
        occupancyUseView = mainView;
        damageView = mainView;
        recommendFurtherInvestigationView = mainView;
        $.btnBAEAModeFormsBuildingsLoadAddress.enabled = view_enabled;
        $.btnBAEAModeFormsBuildingsRecord.enabled = view_enabled;
        $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.init(L("generic_site_name_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.init(L("generic_latitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.init(L("generic_longitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.init(L("generic_address_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsBuildingsStories.init(L("generic_stories_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldBAEAModeFormsBuildingsStories.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.init(L("generic_notes_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.enabled(view_enabled);
        var buildingTypeValues = {
            0: {
                title: L("generic_building_type_steel")
            },
            1: {
                title: L("generic_building_type_concrete")
            },
            2: {
                title: L("generic_building_type_timber")
            },
            3: {
                title: L("generic_building_type_masonry")
            },
            4: {
                title: L("generic_building_type_other")
            },
            5: {
                title: L("generic_building_type_unknown")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.init(L("generic_building_type_text_msg"), buildingTypeValues, OnBuildingType_Change, null, buildingTypeView);
        $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.enabled(view_enabled);
        var occupancyUseValues = {
            0: {
                title: L("generic_occupancy_use_unknown")
            },
            1: {
                title: L("generic_occupancy_use_residential")
            },
            2: {
                title: L("generic_occupancy_use_commercial")
            },
            3: {
                title: L("generic_occupancy_use_public_government")
            },
            4: {
                title: L("generic_occupancy_use_industrial")
            },
            5: {
                title: L("generic_occupancy_use_hotel_motel")
            },
            6: {
                title: L("generic_occupancy_use_hospital_healthcare")
            },
            7: {
                title: L("generic_occupancy_use_agricultural")
            },
            8: {
                title: L("generic_occupancy_use_religious")
            },
            9: {
                title: L("generic_occupancy_use_education")
            },
            10: {
                title: L("generic_occupancy_use_utility")
            },
            11: {
                title: L("generic_occupancy_use_mixed_use")
            },
            12: {
                title: L("generic_occupancy_use_other")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.init(L("generic_occupancy_use_text_msg"), occupancyUseValues, OnOccupancyUse_Change, null, occupancyUseView);
        $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.enabled(view_enabled);
        var damageValues = {
            0: {
                title: L("generic_damage_none")
            },
            1: {
                title: L("generic_damage_slight")
            },
            2: {
                title: L("generic_damage_moderate")
            },
            3: {
                title: L("generic_damage_severe")
            },
            4: {
                title: L("generic_damage_total_collapse")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.init(L("generic_damage_text_msg"), damageValues, OnDamage_Change, null, damageView);
        $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.enabled(view_enabled);
        var recommendFurtherInvestigationValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.init(L("generic_recommend_further_investigation_text_msg"), recommendFurtherInvestigationValues, OnRecommendFurtherInvestigation_Change, null, recommendFurtherInvestigationView);
        $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.enabled(view_enabled);
        if (-1 != current_global_ar_index) {
            $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.set_text_value(Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["SITE"]);
            $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.set_text_value(Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LATITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.set_text_value(Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LONGITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.set_text_value(Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["ADDRESS"]);
            $.widgetAppTextFieldBAEAModeFormsBuildingsStories.set_text_value(Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["STORIES"]);
            $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.set_text_value(Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["NOTES"]);
            current_building_type = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["BUILDING_TYPE"];
            $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.set_selected_index(current_building_type);
            current_occupancy_use = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["OCCUPANCY_USE"];
            $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.set_selected_index(current_occupancy_use);
            current_damage = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["DAMAGE"];
            $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.set_selected_index(current_damage);
            current_recommend_further_investigation = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["RECOMMEND_FURTHER_INVESTIGATION"];
            $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.set_selected_index(current_recommend_further_investigation);
        } else {
            $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.set_selected_index("0");
            $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.set_selected_index("1");
            $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.set_selected_index("2");
            $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.set_selected_index("0");
        }
        RegisterHideKeyboard($.baeaModeFormsBuildingsWindow, [ $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.get_text_field(), $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.get_text_field(), $.widgetAppTextFieldBAEAModeFormsBuildingsStories.get_text_field(), $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.get_text_field() ]);
        $.navigationWindowBuildings.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewBAEAModeFormsBuildingsPhoto!click!OnTableViewBAEAModeFormsBuildingsPhoto_Click"] && $.__views.tableViewBAEAModeFormsBuildingsPhoto.addEventListener("click", OnTableViewBAEAModeFormsBuildingsPhoto_Click);
    __defers["$.__views.btnBAEAModeFormsBuildingsLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnBAEAModeFormsBuildingsLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    __defers["$.__views.btnBAEAModeFormsBuildingsViewAddress!click!OnBtnViewAddress_Click"] && $.__views.btnBAEAModeFormsBuildingsViewAddress.addEventListener("click", OnBtnViewAddress_Click);
    __defers["$.__views.btnBAEAModeFormsBuildingsRecord!click!OnBtnRecord_Click"] && $.__views.btnBAEAModeFormsBuildingsRecord.addEventListener("click", OnBtnRecord_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;