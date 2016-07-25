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
            $.navigationWindowGeneral.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsGeneralPhoto_Click() {
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
                                        section: "GE"
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
                                        section: "GE"
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
                                baea_section: "GE"
                            });
                            break;

                          case 3:
                            var media_array = {
                                PERMANENT: null,
                                TEMPORARY: null
                            };
                            Alloy.Globals.BAEAModeGeneral && Alloy.Globals.BAEAModeGeneral[current_global_ar_index] && Alloy.Globals.BAEAModeGeneral[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeGeneral[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeGeneral[current_global_ar_index].PHOTOS);
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
                    Alloy.Globals.BAEAModeGeneral && Alloy.Globals.BAEAModeGeneral[current_global_ar_index] && Alloy.Globals.BAEAModeGeneral[current_global_ar_index].PHOTOS && Alloy.Globals.BAEAModeGeneral[current_global_ar_index].PHOTOS.length > 0 && (media_array["PERMANENT"] = Alloy.Globals.BAEAModeGeneral[current_global_ar_index].PHOTOS);
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
        $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.set_text_value(e.coords.longitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldBAEAModeFormsGeneralAddress.set_text_value(address);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            if (bViewAddress) {
                Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: {
                        LATITUDE: $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.get_text_value(),
                        LONGITUDE: $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.get_text_value()
                    },
                    mode: "YL"
                });
                bViewAddress = false;
            }
        }
    }
    function OnBtnViewAddress_Click() {
        try {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else if ($.widgetAppTextFieldBAEAModeFormsGeneralLatitude.get_text_value() && $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.get_text_value()) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                users_coordinates: {
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.get_text_value()
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
                    Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["PHOTOS"] || (Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["PHOTOS"] = new Array());
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["DATE"] = new Date().getTime().toString();
                Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsGeneralSiteName.get_text_value();
                Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.get_text_value();
                Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.get_text_value();
                Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsGeneralAddress.get_text_value();
                Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsGeneralNotes.get_text_value();
                Ti.App.fireEvent("baea_mode_manage_section:record_update", {
                    index: current_global_ar_index,
                    value: Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["SITE"]
                });
            } else {
                var newGeneralItem = {
                    ID: -1,
                    DATE: new Date().getTime().toString(),
                    SITE: $.widgetAppTextFieldBAEAModeFormsGeneralSiteName.get_text_value(),
                    LATITUDE: $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.get_text_value(),
                    LONGITUDE: $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.get_text_value(),
                    ADDRESS: $.widgetAppTextFieldBAEAModeFormsGeneralAddress.get_text_value(),
                    NOTES: $.widgetAppTextFieldBAEAModeFormsGeneralNotes.get_text_value()
                };
                if (Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0) {
                    newGeneralItem["PHOTOS"] = new Array();
                    for (var i = 0; i < Alloy.Globals.CurrentTemporaryPicsPath.length; i++) {
                        Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true;
                        newGeneralItem["PHOTOS"].push(Alloy.Globals.CurrentTemporaryPicsPath[i]);
                    }
                    Alloy.Globals.CurrentTemporaryPicsPath = null;
                }
                Alloy.Globals.BAEAModeGeneral.length > 0 ? Alloy.Globals.BAEAModeGeneral.splice(0, 0, newGeneralItem) : Alloy.Globals.BAEAModeGeneral.push(newGeneralItem);
                Ti.App.fireEvent("baea_mode_manage_section:record_new");
            }
            Back();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsGeneralView";
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
    $.__views.baeaModeFormsGeneralWindow = Ti.UI.createWindow({
        title: L("baea_mode_general_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsGeneralWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeFormsGeneralWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.baeaModeFormsGeneralWindow.add($.__views.activity_indicator);
    $.__views.scrollViewGeneral = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewGeneral"
    });
    $.__views.baeaModeFormsGeneralWindow.add($.__views.scrollViewGeneral);
    $.__views.viewAppTextFieldBAEAModeFormsGeneralSiteName = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppTextFieldBAEAModeFormsGeneralSiteName"
    });
    $.__views.scrollViewGeneral.add($.__views.viewAppTextFieldBAEAModeFormsGeneralSiteName);
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralSiteName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsGeneralSiteName",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsGeneralSiteName
    });
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralSiteName.setParent($.__views.viewAppTextFieldBAEAModeFormsGeneralSiteName);
    var __alloyId82 = [];
    $.__views.__alloyId83 = Ti.UI.createTableViewRow({
        hasChild: "true",
        className: "general_photo_row",
        id: "__alloyId83"
    });
    __alloyId82.push($.__views.__alloyId83);
    $.__views.lblPhoto = Ti.UI.createLabel({
        text: L("generic_photo_title"),
        height: 50,
        width: 200,
        color: "#000",
        id: "lblPhoto"
    });
    $.__views.__alloyId83.add($.__views.lblPhoto);
    $.__views.tableViewBAEAModeFormsGeneralPhoto = Ti.UI.createTableView({
        top: 70,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: 50,
        data: __alloyId82,
        id: "tableViewBAEAModeFormsGeneralPhoto"
    });
    $.__views.scrollViewGeneral.add($.__views.tableViewBAEAModeFormsGeneralPhoto);
    OnTableViewBAEAModeFormsGeneralPhoto_Click ? $.__views.tableViewBAEAModeFormsGeneralPhoto.addEventListener("click", OnTableViewBAEAModeFormsGeneralPhoto_Click) : __defers["$.__views.tableViewBAEAModeFormsGeneralPhoto!click!OnTableViewBAEAModeFormsGeneralPhoto_Click"] = true;
    $.__views.btnBAEAModeFormsGeneralLoadAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsGeneralLoadAddress"
    });
    $.__views.scrollViewGeneral.add($.__views.btnBAEAModeFormsGeneralLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnBAEAModeFormsGeneralLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnBAEAModeFormsGeneralLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsGeneralLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsGeneralLatitude"
    });
    $.__views.scrollViewGeneral.add($.__views.viewAppTextFieldBAEAModeFormsGeneralLatitude);
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsGeneralLatitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsGeneralLatitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralLatitude.setParent($.__views.viewAppTextFieldBAEAModeFormsGeneralLatitude);
    $.__views.viewAppTextFieldBAEAModeFormsGeneralLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsGeneralLongitude"
    });
    $.__views.scrollViewGeneral.add($.__views.viewAppTextFieldBAEAModeFormsGeneralLongitude);
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsGeneralLongitude",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsGeneralLongitude
    });
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralLongitude.setParent($.__views.viewAppTextFieldBAEAModeFormsGeneralLongitude);
    $.__views.viewAppTextFieldBAEAModeFormsGeneralAddress = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsGeneralAddress"
    });
    $.__views.scrollViewGeneral.add($.__views.viewAppTextFieldBAEAModeFormsGeneralAddress);
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsGeneralAddress",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsGeneralAddress
    });
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralAddress.setParent($.__views.viewAppTextFieldBAEAModeFormsGeneralAddress);
    $.__views.btnBAEAModeFormsGeneralViewAddress = Ti.UI.createButton({
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
        id: "btnBAEAModeFormsGeneralViewAddress"
    });
    $.__views.scrollViewGeneral.add($.__views.btnBAEAModeFormsGeneralViewAddress);
    OnBtnViewAddress_Click ? $.__views.btnBAEAModeFormsGeneralViewAddress.addEventListener("click", OnBtnViewAddress_Click) : __defers["$.__views.btnBAEAModeFormsGeneralViewAddress!click!OnBtnViewAddress_Click"] = true;
    $.__views.viewAppTextFieldBAEAModeFormsGeneralNotes = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldBAEAModeFormsGeneralNotes"
    });
    $.__views.scrollViewGeneral.add($.__views.viewAppTextFieldBAEAModeFormsGeneralNotes);
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralNotes = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldBAEAModeFormsGeneralNotes",
        __parentSymbol: $.__views.viewAppTextFieldBAEAModeFormsGeneralNotes
    });
    $.__views.widgetAppTextFieldBAEAModeFormsGeneralNotes.setParent($.__views.viewAppTextFieldBAEAModeFormsGeneralNotes);
    $.__views.btnBAEAModeFormsGeneralRecord = Ti.UI.createButton({
        title: L("generic_record_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 560,
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
        id: "btnBAEAModeFormsGeneralRecord"
    });
    $.__views.scrollViewGeneral.add($.__views.btnBAEAModeFormsGeneralRecord);
    OnBtnRecord_Click ? $.__views.btnBAEAModeFormsGeneralRecord.addEventListener("click", OnBtnRecord_Click) : __defers["$.__views.btnBAEAModeFormsGeneralRecord!click!OnBtnRecord_Click"] = true;
    $.__views.navigationWindowGeneral = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeFormsGeneralWindow,
        id: "navigationWindowGeneral"
    });
    $.__views.navigationWindowGeneral && $.addTopLevelView($.__views.navigationWindowGeneral);
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
    controls.push($.btnBAEAModeFormsGeneralLoadAddress);
    controls.push($.btnBAEAModeFormsGeneralViewAddress);
    controls.push($.btnBAEAModeFormsGeneralRecord);
    var bIsWorkInProgress = false;
    var timeout = null;
    var bViewAddress = false;
    try {
        Alloy.Globals.CurrentTemporaryPicsPath = null;
        $.btnBAEAModeFormsGeneralLoadAddress.enabled = view_enabled;
        $.btnBAEAModeFormsGeneralRecord.enabled = view_enabled;
        $.widgetAppTextFieldBAEAModeFormsGeneralSiteName.init(L("generic_site_name_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsGeneralSiteName.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.init(L("generic_latitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.init(L("generic_longitude_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsGeneralAddress.init(L("generic_address_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsGeneralAddress.enabled(view_enabled);
        $.widgetAppTextFieldBAEAModeFormsGeneralNotes.init(L("generic_notes_txt_hint"));
        $.widgetAppTextFieldBAEAModeFormsGeneralNotes.enabled(view_enabled);
        if (-1 != current_global_ar_index) {
            $.widgetAppTextFieldBAEAModeFormsGeneralSiteName.set_text_value(Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["SITE"]);
            $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.set_text_value(Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["LATITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.set_text_value(Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["LONGITUDE"]);
            $.widgetAppTextFieldBAEAModeFormsGeneralAddress.set_text_value(Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["ADDRESS"]);
            $.widgetAppTextFieldBAEAModeFormsGeneralNotes.set_text_value(Alloy.Globals.BAEAModeGeneral[current_global_ar_index]["NOTES"]);
        }
        RegisterHideKeyboard($.baeaModeFormsGeneralWindow, [ $.widgetAppTextFieldBAEAModeFormsGeneralSiteName.get_text_field(), $.widgetAppTextFieldBAEAModeFormsGeneralLatitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsGeneralLongitude.get_text_field(), $.widgetAppTextFieldBAEAModeFormsGeneralAddress.get_text_field(), $.widgetAppTextFieldBAEAModeFormsGeneralNotes.get_text_field() ]);
        $.navigationWindowGeneral.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewBAEAModeFormsGeneralPhoto!click!OnTableViewBAEAModeFormsGeneralPhoto_Click"] && $.__views.tableViewBAEAModeFormsGeneralPhoto.addEventListener("click", OnTableViewBAEAModeFormsGeneralPhoto_Click);
    __defers["$.__views.btnBAEAModeFormsGeneralLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnBAEAModeFormsGeneralLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    __defers["$.__views.btnBAEAModeFormsGeneralViewAddress!click!OnBtnViewAddress_Click"] && $.__views.btnBAEAModeFormsGeneralViewAddress.addEventListener("click", OnBtnViewAddress_Click);
    __defers["$.__views.btnBAEAModeFormsGeneralRecord!click!OnBtnRecord_Click"] && $.__views.btnBAEAModeFormsGeneralRecord.addEventListener("click", OnBtnRecord_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;