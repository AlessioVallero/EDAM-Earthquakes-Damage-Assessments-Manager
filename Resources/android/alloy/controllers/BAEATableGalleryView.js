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
            controls = null;
            $.baeaTableGalleryViewWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBAEATableViewGallery_Click(e) {
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
                                if (e.row.rowPicId) {
                                    var recoverMedia = Alloy.createCollection("BAEAFormsImages");
                                    recoverMedia.fetch({
                                        query: "SELECT * FROM BAEAFormsImages where ID = " + e.row.rowPicId
                                    });
                                    while (recoverMedia.length > 0) {
                                        var model = recoverMedia.at(0);
                                        var image_path = model.get("IMAGE_PATH");
                                        var file = Alloy.Globals.getFileForRead(image_path);
                                        file && file.deleteFile();
                                        recoverMedia.remove(model);
                                        model.destroy();
                                    }
                                    current_media_contents["PERMANENT"].splice(e.row.rowIndex, 1);
                                    $.baeaTableViewGallery.deleteRow(e.index);
                                    for (var i = e.index + 1; i < $.baeaTableViewGallery.data[0].rows.length; i++) {
                                        if ($.baeaTableViewGallery.data[0].rows[i].rowIsNew) break;
                                        $.baeaTableViewGallery.data[0].rows[i].rowIndex--;
                                    }
                                } else {
                                    if (e.row.rowIsNew) {
                                        for (var i = e.index + 1; i < $.baeaTableViewGallery.data[0].rows.length; i++) $.baeaTableViewGallery.data[0].rows[i].rowIndex--;
                                        current_media_contents["TEMPORARY"].splice(e.row.rowIndex, 1);
                                    } else {
                                        for (var i = e.index + 1; i < $.baeaTableViewGallery.data[0].rows.length; i++) {
                                            if ($.baeaTableViewGallery.data[0].rows[i].rowIsNew) break;
                                            $.baeaTableViewGallery.data[0].rows[i].rowIndex--;
                                        }
                                        current_media_contents["PERMANENT"].splice(e.row.rowIndex, 1);
                                    }
                                    $.baeaTableViewGallery.deleteRow(e.index);
                                }
                                $.baeaTableViewGallery.setHeight(130 * $.baeaTableViewGallery.data[0].rows.length);
                                if ($.baeaTableViewGallery.data[0] && $.baeaTableViewGallery.data[0].rows && $.baeaTableViewGallery.data[0].rows.length > 0) $.baeaTableViewGallery.setVisible(true); else {
                                    $.baeaTableViewGallery.setVisible(false);
                                    Back();
                                }
                            }
                        });
                        alertDialogDeleteMediaContent.show();
                    }
                } else Alloy.Globals.createAndOpenControllerExt("BAEASinglePictureView", {
                    image_path: e.row.rowId
                });
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function CreateMediaContentTableViewRow(media_content, is_new, index) {
        var row = Ti.UI.createTableViewRow();
        row.rowIsNew = is_new;
        row.rowId = media_content.media;
        row.rowIndex = index;
        row.setHeight(130);
        var image_uri = media_content.media;
        row.rowPicId = media_content.id;
        var image = Ti.UI.createImageView({
            left: 5,
            width: 130,
            image: image_uri,
            defaultImage: "/images/img_not_found.png"
        });
        row.add(image);
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
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEATableGalleryView";
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
    $.__views.baeaTableGalleryViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "baeaTableGalleryViewWindow"
    });
    $.__views.baeaTableGalleryViewWindow && $.addTopLevelView($.__views.baeaTableGalleryViewWindow);
    OnAndroidBackButton_Click ? $.__views.baeaTableGalleryViewWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.baeaTableGalleryViewWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.baeaTableGalleryViewWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.baeaTableGalleryViewWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        id: "activity_indicator"
    });
    $.__views.baeaTableGalleryViewWindow.add($.__views.activity_indicator);
    $.__views.scrollViewBAEATableGalleryView = Ti.UI.createScrollView({
        top: 5,
        scrollType: "vertical",
        id: "scrollViewBAEATableGalleryView"
    });
    $.__views.baeaTableGalleryViewWindow.add($.__views.scrollViewBAEATableGalleryView);
    $.__views.baeaTableViewGallery = Ti.UI.createTableView({
        top: 0,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        id: "baeaTableViewGallery"
    });
    $.__views.scrollViewBAEATableGalleryView.add($.__views.baeaTableViewGallery);
    OnBAEATableViewGallery_Click ? $.__views.baeaTableViewGallery.addEventListener("click", OnBAEATableViewGallery_Click) : __defers["$.__views.baeaTableViewGallery!click!OnBAEATableViewGallery_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_media_contents = args.media_contents;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.baeaTableViewGallery);
    var bIsWorkInProgress = false;
    new Array();
    try {
        $.baeaTableGalleryViewWindow.setTitle(L("baea_table_gallery_view_title"));
        var table_data = [];
        for (var i = 0; current_media_contents["PERMANENT"] && i < current_media_contents["PERMANENT"].length; i++) {
            var media_content = current_media_contents["PERMANENT"][i];
            media_content.media && table_data.push(CreateMediaContentTableViewRow(media_content, false, i));
        }
        for (var i = 0; current_media_contents["TEMPORARY"] && i < current_media_contents["TEMPORARY"].length; i++) {
            var media_content = current_media_contents["TEMPORARY"][i];
            media_content.media && table_data.push(CreateMediaContentTableViewRow(media_content, true, i));
        }
        $.baeaTableViewGallery.setData(table_data);
        $.baeaTableViewGallery.setHeight(130 * table_data.length);
        $.baeaTableViewGallery.setVisible(table_data.length > 0 ? true : false);
        $.baeaTableGalleryViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.baeaTableGalleryViewWindow!android:back!OnAndroidBackButton_Click"] && $.__views.baeaTableGalleryViewWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.baeaTableGalleryViewWindow!androidback!OnAndroidBackButton_Click"] && $.__views.baeaTableGalleryViewWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.baeaTableViewGallery!click!OnBAEATableViewGallery_Click"] && $.__views.baeaTableViewGallery.addEventListener("click", OnBAEATableViewGallery_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;