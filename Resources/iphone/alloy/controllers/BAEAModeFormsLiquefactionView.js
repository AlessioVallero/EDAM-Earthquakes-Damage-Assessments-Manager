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
            $.navigationWindowLiquefaction.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsLiquefactionPhoto_Click() {
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
                                        section: "LQ"
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
                                        section: "LQ"
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
                                baea_section: "LQ"
                            });
                            break;

                          case 3:
                            var media_array = {
                                PERMANENT: null,
                                TEMPORARY: null
                            };
                            Alloy.Globals.BAEAModeLiquefaction && Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index] && Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index].PHOTOS);
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
                    Alloy.Globals.BAEAModeLiquefaction && Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index] && Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index].PHOTOS);
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
        $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.set_text_value(e.coords.longitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.set_text_value(address);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            if (bViewAddress) {
                Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: {
                        LATITUDE: $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.get_text_value(),
                        LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.get_text_value()
                    },
                    mode: "YL"
                });
                bViewAddress = false;
            }
        }
    }
    function OnBtnViewAddress_Click() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if ($.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.get_text_value() && $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.get_text_value()) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                users_coordinates: {
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.get_text_value()
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
    function OnSandBlowsOrFissures_Change(e) {
        current_sand_blows_or_fissures = e.id;
    }
    function OnGroundSettlement_Change(e) {
        current_ground_settlement = e.id;
    }
    function OnLateralSpreading_Change(e) {
        current_lateral_spreading = e.id;
    }
    function OnBtnRecord_Click() {
        try {
            if (-1 != current_global_ar_index) {
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["PHOTOS"] || (Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["PHOTOS"] = new Array());
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["DATE"] = new Date().getTime().toString();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName.get_text_value();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.get_text_value();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.get_text_value();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.get_text_value();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["HORIZONTAL"] = $.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.get_text_value();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["VERTICAL"] = $.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.get_text_value();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsLiquefactionNotes.get_text_value();
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["SAND_BLOWS_OR_FISSURES"] = current_sand_blows_or_fissures;
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["GROUND_SETTLEMENT"] = current_ground_settlement;
                Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["LATERAL_SPREADING"] = current_lateral_spreading;
                Ti.App.fireEvent("baea_mode_manage_section:record_update", {
                    index: current_global_ar_index,
                    value: Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["SITE"]
                });
            } else {
                var newLiquefactionItem = {
                    ID: -1,
                    DATE: new Date().getTime().toString(),
                    SITE: $.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName.get_text_value(),
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.get_text_value(),
                    ADDRESS: $.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.get_text_value(),
                    HORIZONTAL: $.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.get_text_value(),
                    VERTICAL: $.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.get_text_value(),
                    NOTES: $.widgetAppTextFieldBAEAModeFormsLiquefactionNotes.get_text_value(),
                    SAND_BLOWS_OR_FISSURES: current_sand_blows_or_fissures,
                    GROUND_SETTLEMENT: current_ground_settlement,
                    LATERAL_SPREADING: current_lateral_spreading
                };
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    newLiquefactionItem["PHOTOS"] = new Array();
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        newLiquefactionItem["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeLiquefaction.length > 0 ? Alloy.Globals.BAEAModeLiquefaction.splice(0, 0, newLiquefactionItem) : Alloy.Globals.BAEAModeLiquefaction.push(newLiquefactionItem);
                Ti.App.fireEvent("baea_mode_manage_section:record_new");
            }
            Back();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLiquefactionView";
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
    $.__views.baeaModeFormsLiquefactionWindow = Ti.UI.createWindow({
        title: L("baea_mode_liquefaction_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsLiquefactionWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeFormsLiquefactionWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.baeaModeFormsLiquefactionWindow.add($.__views.activity_indicator);
    $.__views.scrollViewLiquefaction = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewLiquefaction"
    });
    $.__views.baeaModeFormsLiquefactionWindow.add($.__views.scrollViewLiquefaction);
    $.__views.viewAppTextFieldBAEAModeFormsLiquefactionSiteName = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsLiquefactionSiteName"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppTextFieldBAEAModeFormsLiquefactionSiteName);
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLiquefactionSiteName",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLiquefactionSiteName
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName.setParent($.__views.viewAppTextFieldBAEAModeFormsLiquefactionSiteName);
    var __alloyId107 = [];
    $.__views.__alloyId108 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "fault_rupture_photo_row",
        id: "__alloyId108"
    });
    __alloyId107.push($.__views.__alloyId108);
    $.__views.lblPhoto = Ti.UI.createLabel({
        text: L("generic_photo_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblPhoto"
    });
    $.__views.__alloyId108.add($.__views.lblPhoto);
    $.__views.tableViewBAEAModeFormsLiquefactionPhoto = Ti.UI.createTableView({
        top: 70,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId107,
        id: "tableViewBAEAModeFormsLiquefactionPhoto"
    });
    $.__views.scrollViewLiquefaction.add($.__views.tableViewBAEAModeFormsLiquefactionPhoto);
    OnTableViewBAEAModeFormsLiquefactionPhoto_Click ? $.__views.tableViewBAEAModeFormsLiquefactionPhoto.addEventListener("click", OnTableViewBAEAModeFormsLiquefactionPhoto_Click) : __defers["$.__views.tableViewBAEAModeFormsLiquefactionPhoto!click!OnTableViewBAEAModeFormsLiquefactionPhoto_Click"] = true;
    $.__views.btnBAEAModeFormsLiquefactionLoadAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsLiquefactionLoadAddress"
    });
    $.__views.scrollViewLiquefaction.add($.__views.btnBAEAModeFormsLiquefactionLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnBAEAModeFormsLiquefactionLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnBAEAModeFormsLiquefactionLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsLiquefactionLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLiquefactionLatitude"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppTextFieldBAEAModeFormsLiquefactionLatitude);
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLiquefactionLatitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLiquefactionLatitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.setParent($.__views.viewAppTextFieldBAEAModeFormsLiquefactionLatitude);
    $.__views.viewAppTextFieldBAEAModeFormsLiquefactionLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLiquefactionLongitude"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppTextFieldBAEAModeFormsLiquefactionLongitude);
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLiquefactionLongitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLiquefactionLongitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.setParent($.__views.viewAppTextFieldBAEAModeFormsLiquefactionLongitude);
    $.__views.viewAppTextFieldBAEAModeFormsLiquefactionAddress = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLiquefactionAddress"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppTextFieldBAEAModeFormsLiquefactionAddress);
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLiquefactionAddress",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLiquefactionAddress
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.setParent($.__views.viewAppTextFieldBAEAModeFormsLiquefactionAddress);
    $.__views.btnBAEAModeFormsLiquefactionViewAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsLiquefactionViewAddress"
    });
    $.__views.scrollViewLiquefaction.add($.__views.btnBAEAModeFormsLiquefactionViewAddress);
    OnBtnViewAddress_Click ? $.__views.btnBAEAModeFormsLiquefactionViewAddress.addEventListener("click", OnBtnViewAddress_Click) : __defers["$.__views.btnBAEAModeFormsLiquefactionViewAddress!click!OnBtnViewAddress_Click"] = true;
    $.__views.viewAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures);
    $.__views.widgetAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures
    });
    $.__views.widgetAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures.setParent($.__views.viewAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures);
    $.__views.viewAppComboBoxBAEAModeFormsLiquefactionGroundSettlement = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsLiquefactionGroundSettlement"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppComboBoxBAEAModeFormsLiquefactionGroundSettlement);
    $.__views.widgetAppComboBoxBAEAModeFormsLiquefactionGroundSettlement = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsLiquefactionGroundSettlement",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsLiquefactionGroundSettlement
    });
    $.__views.widgetAppComboBoxBAEAModeFormsLiquefactionGroundSettlement.setParent($.__views.viewAppComboBoxBAEAModeFormsLiquefactionGroundSettlement);
    $.__views.viewAppComboBoxBAEAModeFormsLiquefactionLateralSpreading = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxBAEAModeFormsLiquefactionLateralSpreading"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppComboBoxBAEAModeFormsLiquefactionLateralSpreading);
    $.__views.widgetAppComboBoxBAEAModeFormsLiquefactionLateralSpreading = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxBAEAModeFormsLiquefactionLateralSpreading",
        __parentSymbol: $.__views.viewAppComboBoxBAEAModeFormsLiquefactionLateralSpreading
    });
    $.__views.widgetAppComboBoxBAEAModeFormsLiquefactionLateralSpreading.setParent($.__views.viewAppComboBoxBAEAModeFormsLiquefactionLateralSpreading);
    $.__views.viewAppTextFieldBAEAModeFormsLiquefactionHorizontal = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLiquefactionHorizontal"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppTextFieldBAEAModeFormsLiquefactionHorizontal);
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLiquefactionHorizontal
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.setParent($.__views.viewAppTextFieldBAEAModeFormsLiquefactionHorizontal);
    $.__views.viewAppTextFieldBAEAModeFormsLiquefactionVertical = Ti.UI.createView({
        top: 770,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLiquefactionVertical"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppTextFieldBAEAModeFormsLiquefactionVertical);
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionVertical = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLiquefactionVertical",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLiquefactionVertical
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.setParent($.__views.viewAppTextFieldBAEAModeFormsLiquefactionVertical);
    $.__views.viewAppTextFieldBAEAModeFormsLiquefactionNotes = Ti.UI.createView({
        top: 840,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsLiquefactionNotes"
    });
    $.__views.scrollViewLiquefaction.add($.__views.viewAppTextFieldBAEAModeFormsLiquefactionNotes);
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionNotes = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsLiquefactionNotes",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsLiquefactionNotes
    });
    $.__views.widgetAppTextFieldBAEAModeFormsLiquefactionNotes.setParent($.__views.viewAppTextFieldBAEAModeFormsLiquefactionNotes);
    $.__views.btnBAEAModeFormsLiquefactionRecord = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsLiquefactionRecord"
    });
    $.__views.scrollViewLiquefaction.add($.__views.btnBAEAModeFormsLiquefactionRecord);
    OnBtnRecord_Click ? $.__views.btnBAEAModeFormsLiquefactionRecord.addEventListener("click", OnBtnRecord_Click) : __defers["$.__views.btnBAEAModeFormsLiquefactionRecord!click!OnBtnRecord_Click"] = true;
    $.__views.navigationWindowLiquefaction = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeFormsLiquefactionWindow,
        id: "navigationWindowLiquefaction"
    });
    $.__views.navigationWindowLiquefaction && $.addTopLevelView($.__views.navigationWindowLiquefaction);
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
    controls.push($.btnBAEAModeFormsLiquefactionLoadAddress);
    controls.push($.btnBAEAModeFormsLiquefactionViewAddress);
    controls.push($.btnBAEAModeFormsLiquefactionRecord);
    var bIsWorkInProgress = false;
    var timeout = null;
    var bViewAddress = false;
    var current_sand_blows_or_fissures = "1";
    var current_ground_settlement = "1";
    var current_lateral_spreading = "1";
    try {
        Alloy.Globals.CurrentTemporaryPicsPath = null;
        var sandBlowsOrFissuresView = null;
        var groundSettlementView = null;
        var lateralSpreadingView = null;
        var mainView = $.getView();
        sandBlowsOrFissuresView = mainView;
        groundSettlementView = mainView;
        lateralSpreadingView = mainView;
        $.btnBAEAModeFormsLiquefactionLoadAddress.enabled = view_enabled;
        $.btnBAEAModeFormsLiquefactionRecord.enabled = view_enabled;
        $.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName.init(L("generic_site_name_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.init(L("generic_latitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.init(L("generic_longitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.init(L("generic_address_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.init(L("generic_horizontal_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.init(L("generic_vertical_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsLiquefactionNotes.init(L("generic_notes_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsLiquefactionNotes.enabled(view_enabled);
        var sandBlowsOrFissuresValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures.init(L("generic_sand_blows_or_fissures_text_msg"), sandBlowsOrFissuresValues, OnSandBlowsOrFissures_Change, null, sandBlowsOrFissuresView);
        $.widgetAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures.enabled(view_enabled);
        var groundSettlementValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsLiquefactionGroundSettlement.init(L("generic_ground_settlement_text_msg"), groundSettlementValues, OnGroundSettlement_Change, null, groundSettlementView);
        $.widgetAppComboBoxBAEAModeFormsLiquefactionGroundSettlement.enabled(view_enabled);
        var lateralSpreadingValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            }
        };
        $.widgetAppComboBoxBAEAModeFormsLiquefactionLateralSpreading.init(L("generic_lateral_spreading_text_msg"), lateralSpreadingValues, OnLateralSpreading_Change, null, lateralSpreadingView);
        $.widgetAppComboBoxBAEAModeFormsLiquefactionLateralSpreading.enabled(view_enabled);
        if (-1 != current_global_ar_index) {
            $.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName.set_text_value(Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["SITE"]);
            $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.set_text_value(Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["LATITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.set_text_value(Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["LONGITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.set_text_value(Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["ADDRESS"]);
            $.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.set_text_value(Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["HORIZONTAL"]);
            $.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.set_text_value(Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["VERTICAL"]);
            $.widgetAppTextFieldBAEAModeFormsLiquefactionNotes.set_text_value(Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["NOTES"]);
            current_sand_blows_or_fissures = Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["SAND_BLOWS_OR_FISSURES"];
            $.widgetAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures.set_selected_index(current_sand_blows_or_fissures);
            current_ground_settlement = Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["GROUND_SETTLEMENT"];
            $.widgetAppComboBoxBAEAModeFormsLiquefactionGroundSettlement.set_selected_index(current_ground_settlement);
            current_lateral_spreading = Alloy.Globals.BAEAModeLiquefaction[current_global_ar_index]["LATERAL_SPREADING"];
            $.widgetAppComboBoxBAEAModeFormsLiquefactionLateralSpreading.set_selected_index(current_lateral_spreading);
        } else {
            $.widgetAppComboBoxBAEAModeFormsLiquefactionSandBlowsOrFissures.set_selected_index("1");
            $.widgetAppComboBoxBAEAModeFormsLiquefactionGroundSettlement.set_selected_index("1");
            $.widgetAppComboBoxBAEAModeFormsLiquefactionLateralSpreading.set_selected_index("1");
            $.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.set_text_value("0");
            $.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.set_text_value("0");
        }
        RegisterHideKeyboard($.baeaModeFormsLiquefactionWindow, [ $.widgetAppTextFieldBAEAModeFormsLiquefactionSiteName.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLiquefactionLatitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLiquefactionLongitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLiquefactionAddress.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLiquefactionHorizontal.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLiquefactionVertical.get_text_field(), $.widgetAppTextFieldBAEAModeFormsLiquefactionNotes.get_text_field() ]);
        $.navigationWindowLiquefaction.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewBAEAModeFormsLiquefactionPhoto!click!OnTableViewBAEAModeFormsLiquefactionPhoto_Click"] && $.__views.tableViewBAEAModeFormsLiquefactionPhoto.addEventListener("click", OnTableViewBAEAModeFormsLiquefactionPhoto_Click);
    __defers["$.__views.btnBAEAModeFormsLiquefactionLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnBAEAModeFormsLiquefactionLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    __defers["$.__views.btnBAEAModeFormsLiquefactionViewAddress!click!OnBtnViewAddress_Click"] && $.__views.btnBAEAModeFormsLiquefactionViewAddress.addEventListener("click", OnBtnViewAddress_Click);
    __defers["$.__views.btnBAEAModeFormsLiquefactionRecord!click!OnBtnRecord_Click"] && $.__views.btnBAEAModeFormsLiquefactionRecord.addEventListener("click", OnBtnRecord_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;