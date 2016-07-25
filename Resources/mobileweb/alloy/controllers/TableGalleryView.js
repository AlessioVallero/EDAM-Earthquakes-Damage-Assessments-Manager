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
        Back();
    }
    function Back() {
        try {
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "da:done_propagation", Back);
            controls = null;
            selectedPics = null;
            $.tableGalleryViewWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewGallery_Click(e) {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                if ("deleteButton" == e.source.clickName) {
                    if (view_enabled && e.row) {
                        var alertDialogDeleteMediaContent = Titanium.UI.createAlertDialog({
                            title: L("generic_delete_media_content_title"),
                            message: L("delete_media_content_msg"),
                            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                            cancel: 1
                        });
                        alertDialogDeleteMediaContent.addEventListener("click", function(event) {
                            if (0 == event.index) {
                                if (e.row.rowPicId || e.row.rowVidId) {
                                    var media_table = null;
                                    var media_id = null;
                                    if ("PIC" == e.row.rowType) {
                                        media_id = e.row.rowPicId;
                                        "UsersResidents" == current_type ? media_table = "UsersResidentsFormsImages" : "AeDES" == current_type ? media_table = "AeDESFormsImages" : "Shed" == current_type ? media_table = "ShedFormsImages" : "ATC20" == current_type && (media_table = "ATC20FormsImages");
                                        if (Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0) for (var i = 0; i < Alloy.Globals.CurrentPicsPath.length; i++) Alloy.Globals.CurrentPicsPath[i].id != media_id || Alloy.Globals.CurrentPicsPath[i].media || Alloy.Globals.CurrentPicsPath.splice(i, 1);
                                    } else {
                                        media_id = e.row.rowVidId;
                                        "UsersResidents" == current_type ? media_table = "UsersResidentsFormsVideos" : "AeDES" == current_type ? media_table = "AeDESFormsVideos" : "Shed" == current_type ? media_table = "ShedFormsVideos" : "ATC20" == current_type && (media_table = "ATC20FormsVideos");
                                        if (Alloy.Globals.CurrentVideosPath && Alloy.Globals.CurrentVideosPath.length > 0) for (var i = 0; i < Alloy.Globals.CurrentVideosPath.length; i++) Alloy.Globals.CurrentVideosPath[i].id != media_id || Alloy.Globals.CurrentVideosPath[i].media || Alloy.Globals.CurrentVideosPath.splice(i, 1);
                                    }
                                    if (media_table && media_id) {
                                        var recoverMedia = Alloy.createCollection(media_table);
                                        recoverMedia.fetch({
                                            query: "SELECT * FROM " + media_table + " where ID = " + media_id
                                        });
                                        while (recoverMedia.length > 0) {
                                            var model = recoverMedia.at(0);
                                            recoverMedia.remove(model);
                                            model.destroy();
                                        }
                                        $.tableViewGallery.deleteRow(e.index);
                                    }
                                } else {
                                    if ("PIC" == e.row.rowType) {
                                        for (var i = e.row.rowIndex + 1; i < $.tableViewGallery.data[0].rows.length; i++) "PIC" == $.tableViewGallery.data[0].rows[i].rowType && $.tableViewGallery.data[0].rows[i].rowIndex--;
                                        Alloy.Globals.CurrentPicsPath.splice(e.row.rowIndex, 1);
                                    } else {
                                        for (var i = e.row.rowIndex + 1; i < $.tableViewGallery.data[0].rows.length; i++) "VID" == $.tableViewGallery.data[0].rows[i].rowType && $.tableViewGallery.data[0].rows[i].rowIndex--;
                                        Alloy.Globals.CurrentVideosPath.splice(e.row.rowIndex, 1);
                                    }
                                    $.tableViewGallery.deleteRow(e.index);
                                }
                                $.tableViewGallery.setHeight(130 * $.tableViewGallery.data[0].rows.length);
                                $.tableViewGallery.setVisible($.tableViewGallery.data[0] && $.tableViewGallery.data[0].rows && $.tableViewGallery.data[0].rows.length > 0 ? true : false);
                            }
                        });
                        alertDialogDeleteMediaContent.show();
                    }
                } else if ("selectedButton" == e.source.clickName) {
                    if (e.row) {
                        if ("0" == e.source.value) {
                            e.source.backgroundColor = "#007690";
                            e.source.title = "✓";
                            e.source.value = "1";
                            selectedPics.push({
                                image: e.row.rowId,
                                latitude: e.row.rowLatitude,
                                longitude: e.row.rowLongitude,
                                address: e.row.rowAddress
                            });
                        } else {
                            e.source.backgroundColor = "#aaa";
                            e.source.title = "";
                            e.source.value = "0";
                            var index = -1;
                            for (var i = 0; i < selectedPics.length; i++) if (selectedPics[i].image == e.row.rowId) {
                                index = i;
                                break;
                            }
                            -1 != index && selectedPics.splice(index, 1);
                        }
                        $.tableViewGallery.setData($.tableViewGallery.getData());
                    }
                } else if ("PIC" == e.row.rowType) {
                    var current_controller = null;
                    for (var i = 0; i < picture_controllers.length; i++) if (picture_controllers[i].id == e.row.rowId) {
                        current_controller = picture_controllers[i].controller;
                        break;
                    }
                    if (null == current_controller) {
                        var is_enabled = current_is_damage_assessments_maker_view ? !current_is_damage_assessments_maker_view : void 0;
                        current_controller = Alloy.Globals.createAndOpenControllerExt("SinglePictureView", {
                            image_path: e.row.rowId,
                            latitude: e.row.rowLatitude,
                            longitude: e.row.rowLongitude,
                            address: e.row.rowAddress,
                            heading: e.row.rowHeading,
                            damages_level: e.row.rowDamagesLevel,
                            damages_area: e.row.rowDamagesArea,
                            comment: e.row.rowComment,
                            index: e.row.rowIndex,
                            id: e.row.rowPicId,
                            is_synchronized: current_is_synchronized,
                            is_enabled: is_enabled
                        });
                        picture_controllers.push({
                            id: e.row.rowId,
                            controller: current_controller
                        });
                    }
                    current_controller;
                } else {
                    var current_controller = null;
                    for (var i = 0; i < video_controllers.length; i++) if (video_controllers[i].id == e.row.rowId) {
                        current_controller = video_controllers[i].controller;
                        break;
                    }
                    if (null == current_controller) {
                        var is_enabled = current_is_damage_assessments_maker_view ? !current_is_damage_assessments_maker_view : void 0;
                        current_controller = Alloy.Globals.createAndOpenControllerExt("SingleVideoView", {
                            video_path: e.row.rowId,
                            latitude: e.row.rowLatitude,
                            longitude: e.row.rowLongitude,
                            address: e.row.rowAddress,
                            heading: e.row.rowHeading,
                            damages_level: e.row.rowDamagesLevel,
                            damages_area: e.row.rowDamagesArea,
                            comment: e.row.rowComment,
                            index: e.row.rowIndex,
                            id: e.row.rowVidId,
                            is_synchronized: current_is_synchronized,
                            is_enabled: is_enabled
                        });
                        video_controllers.push({
                            id: e.row.rowId,
                            controller: current_controller
                        });
                    }
                    current_controller;
                }
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnNext_Click() {
        try {
            if (selectedPics && selectedPics.length > 0) {
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "da:done_propagation", Back);
                Alloy.Globals.createAndOpenControllerExt("DAElementDamageAssessmentsView", {
                    selected_pics: selectedPics,
                    da_msg: current_da_msg,
                    da_value: current_da_value
                });
            } else alert(L("no_pic_selected_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnImportFromGallery_Click() {
        try {
            Titanium.Media.openPhotoGallery({
                success: function(event) {
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".png");
                        newFile.exists && newFile.deleteFile();
                        newFile.write(event.media);
                        var mediaDetails = {
                            media: newFile.getNativePath(),
                            latitude: 0,
                            longitude: 0,
                            address: "",
                            damages_level: "0",
                            damages_area: "0",
                            comment: "",
                            media_found: true
                        };
                        Alloy.Globals.CurrentPicsPath || (Alloy.Globals.CurrentPicsPath = new Array());
                        mediaDetails["index"] = Alloy.Globals.CurrentPicsPath.length;
                        mediaDetails["type"] = "PIC";
                        Alloy.Globals.CurrentPicsPath.push(mediaDetails);
                    } else if (event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) {
                        var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".3gp");
                        newFile.exists && newFile.deleteFile();
                        newFile.write(event.media);
                        var mediaDetails = {
                            media: newFile.getNativePath(),
                            latitude: 0,
                            longitude: 0,
                            address: "",
                            damages_level: "0",
                            damages_area: "0",
                            comment: "",
                            media_found: true
                        };
                        Alloy.Globals.CurrentVideosPath || (Alloy.Globals.CurrentVideosPath = new Array());
                        mediaDetails["index"] = Alloy.Globals.CurrentVideosPath.length;
                        mediaDetails["type"] = "VID";
                        Alloy.Globals.CurrentVideosPath.push(mediaDetails);
                    }
                    $.tableViewGallery.setVisible(true);
                    $.tableViewGallery.appendRow(CreateMediaContentTableViewRow(mediaDetails));
                    $.tableViewGallery.setHeight(130 * $.tableViewGallery.data[0].rows.length);
                    alert(L("generic_content_imported_msg"));
                },
                mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnImportVideoFromGallery_Click() {
        try {
            var intent = Titanium.Android.createIntent({
                action: Ti.Android.ACTION_PICK,
                type: "video/*"
            });
            intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
            $.tableGalleryViewWindow.getActivity().startActivityForResult(intent, function(e) {
                if (e.error) Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
                    message: "Error " + e.error
                }).show(); else if (e.resultCode == Ti.Android.RESULT_OK && e.intent.data) {
                    var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".3gp");
                    newFile.exists && newFile.deleteFile();
                    var sourceVideo = Ti.Filesystem.getFile(e.intent.data);
                    sourceVideo.copy(newFile.nativePath);
                    Alloy.Globals.CurrentVideosPath || (Alloy.Globals.CurrentVideosPath = new Array());
                    var mediaDetails = {
                        media: newFile.getNativePath(),
                        latitude: 0,
                        longitude: 0,
                        address: "",
                        damages_level: "0",
                        damages_area: "0",
                        comment: "",
                        media_found: true
                    };
                    mediaDetails["index"] = Alloy.Globals.CurrentVideosPath.length;
                    mediaDetails["type"] = "VID";
                    Alloy.Globals.CurrentVideosPath.push(mediaDetails);
                    $.tableViewGallery.setVisible(true);
                    $.tableViewGallery.appendRow(CreateMediaContentTableViewRow(mediaDetails));
                    $.tableViewGallery.setHeight(130 * $.tableViewGallery.data[0].rows.length);
                    alert(L("generic_content_imported_msg"));
                }
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateMediaContentTableViewRow(media_content) {
        var row = Ti.UI.createTableViewRow();
        row.rowId = media_content.media;
        row.rowType = media_content.type;
        row.rowLatitude = media_content.latitude;
        row.rowLongitude = media_content.longitude;
        row.rowAddress = media_content.address;
        row.rowHeading = media_content.heading;
        row.rowDamagesLevel = media_content.damages_level;
        row.rowDamagesArea = media_content.damages_area;
        row.rowComment = media_content.comment;
        row.rowIndex = media_content.index;
        row.setHeight(130);
        var image_uri = "/images/generic_video.png";
        if ("PIC" == media_content.type) {
            image_uri = media_content.media;
            row.rowPicId = media_content.id;
        } else row.rowVidId = media_content.id;
        var image = Ti.UI.createImageView({
            left: 5,
            width: 130,
            image: image_uri,
            defaultImage: "/images/img_not_found.png"
        });
        row.add(image);
        if (current_is_damage_assessments_maker_view) {
            var selectedButton = Ti.UI.createButton({
                right: 20,
                width: 30,
                title: "",
                height: 30,
                borderColor: "#666",
                borderWidth: 2,
                borderRadius: 3,
                backgroundColor: "#aaa",
                backgroundImage: "none",
                color: "#fff",
                clickName: "selectedButton",
                font: {
                    fontSize: 22,
                    fontWeight: "bold"
                },
                value: "0"
            });
            row.add(selectedButton);
        } else {
            var deleteButton = Ti.UI.createButton({
                color: "black",
                backgroundColor: "red",
                title: L("generic_delete_title"),
                right: 8,
                width: 105,
                clickName: "deleteButton",
                height: 34
            });
            row.add(deleteButton);
            row.className = "Media";
        }
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TableGalleryView";
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
    $.__views.tableGalleryViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "tableGalleryViewWindow"
    });
    $.__views.tableGalleryViewWindow && $.addTopLevelView($.__views.tableGalleryViewWindow);
    OnAndroidBackButton_Click ? $.__views.tableGalleryViewWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.tableGalleryViewWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.tableGalleryViewWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.tableGalleryViewWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        id: "activity_indicator"
    });
    $.__views.tableGalleryViewWindow.add($.__views.activity_indicator);
    $.__views.viewAppButtonNext = Ti.UI.createView({
        top: 5,
        width: 60,
        id: "viewAppButtonNext"
    });
    $.__views.tableGalleryViewWindow.add($.__views.viewAppButtonNext);
    $.__views.widgetAppButtonNext = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonNext",
        __parentSymbol: $.__views.viewAppButtonNext
    });
    $.__views.widgetAppButtonNext.setParent($.__views.viewAppButtonNext);
    $.__views.viewAppButtonImport = Ti.UI.createView({
        top: 5,
        width: 140,
        id: "viewAppButtonImport"
    });
    $.__views.tableGalleryViewWindow.add($.__views.viewAppButtonImport);
    $.__views.viewAppButtonImportPicFromGallery = Ti.UI.createView({
        top: 0,
        left: 0,
        width: 60,
        id: "viewAppButtonImportPicFromGallery"
    });
    $.__views.viewAppButtonImport.add($.__views.viewAppButtonImportPicFromGallery);
    $.__views.widgetAppButtonImportPicFromGallery = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonImportPicFromGallery",
        __parentSymbol: $.__views.viewAppButtonImportPicFromGallery
    });
    $.__views.widgetAppButtonImportPicFromGallery.setParent($.__views.viewAppButtonImportPicFromGallery);
    $.__views.viewAppButtonImportVideoFromGallery = Ti.UI.createView({
        top: 0,
        left: 80,
        width: 60,
        id: "viewAppButtonImportVideoFromGallery"
    });
    $.__views.viewAppButtonImport.add($.__views.viewAppButtonImportVideoFromGallery);
    $.__views.widgetAppButtonImportVideoFromGallery = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonImportVideoFromGallery",
        __parentSymbol: $.__views.viewAppButtonImportVideoFromGallery
    });
    $.__views.widgetAppButtonImportVideoFromGallery.setParent($.__views.viewAppButtonImportVideoFromGallery);
    $.__views.scrollViewTableGalleryView = Ti.UI.createScrollView({
        top: 120,
        scrollType: "vertical",
        id: "scrollViewTableGalleryView"
    });
    $.__views.tableGalleryViewWindow.add($.__views.scrollViewTableGalleryView);
    $.__views.tableViewGallery = Ti.UI.createTableView({
        top: 0,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        id: "tableViewGallery"
    });
    $.__views.scrollViewTableGalleryView.add($.__views.tableViewGallery);
    OnTableViewGallery_Click ? $.__views.tableViewGallery.addEventListener("click", OnTableViewGallery_Click) : __defers["$.__views.tableViewGallery!click!OnTableViewGallery_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_media_contents = args.media_contents;
    var current_type = args.type;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var current_is_damage_assessments_maker_view = args.is_damage_assessments_maker_view;
    var current_da_msg = args.da_msg;
    var current_da_value = args.da_value;
    var controls = new Array();
    controls.push($.tableViewGallery);
    var picture_controllers = new Array();
    var video_controllers = new Array();
    var selectedPics = new Array();
    try {
        var table_data = [];
        for (var i = 0; i < current_media_contents.length; i++) {
            var media_content = current_media_contents[i];
            media_content.media && table_data.push(CreateMediaContentTableViewRow(media_content));
        }
        $.tableViewGallery.setData(table_data);
        if (current_is_damage_assessments_maker_view) {
            $.tableGalleryViewWindow.setTitle(L("table_gallery_view_da_title"));
            $.tableGalleryViewWindow.remove($.viewAppButtonImportPicFromGallery);
            $.viewAppButtonImportPicFromGallery = null;
            $.tableGalleryViewWindow.remove($.viewAppButtonImportVideoFromGallery);
            $.viewAppButtonImportVideoFromGallery = null;
            $.tableGalleryViewWindow.remove($.viewAppButtonImport);
            $.viewAppButtonImport = null;
            $.widgetAppButtonNext.init("/images/next_normal.png", "/images/next_pressed.png", "/images/next_disabled.png", L("generic_next_btn_title"), OnBtnNext_Click);
        } else {
            $.tableGalleryViewWindow.setTitle(L("table_gallery_view_standard_title"));
            $.tableGalleryViewWindow.remove($.viewAppButtonNext);
            $.viewAppButtonNext = null;
            $.widgetAppButtonImportPicFromGallery.init("/images/import_pic_normal.png", "/images/import_pic_pressed.png", "/images/import_pic_disabled.png", L("generic_import_pic_from_gallery_btn_title"), OnBtnImportFromGallery_Click);
            $.widgetAppButtonImportPicFromGallery.set_label_height(42);
            $.widgetAppButtonImportVideoFromGallery.init("/images/import_video_normal.png", "/images/import_video_pressed.png", "/images/import_video_disabled.png", L("generic_import_video_from_gallery_btn_title"), OnBtnImportVideoFromGallery_Click);
            $.widgetAppButtonImportVideoFromGallery.set_label_height(42);
        }
        $.tableViewGallery.setData(table_data);
        $.tableViewGallery.setHeight(130 * table_data.length);
        $.tableViewGallery.setVisible(table_data.length > 0 ? true : false);
        $.tableGalleryViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableGalleryViewWindow!android:back!OnAndroidBackButton_Click"] && $.__views.tableGalleryViewWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.tableGalleryViewWindow!androidback!OnAndroidBackButton_Click"] && $.__views.tableGalleryViewWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewGallery!click!OnTableViewGallery_Click"] && $.__views.tableViewGallery.addEventListener("click", OnTableViewGallery_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;