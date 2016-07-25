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
        try {
            $.navigationWindowSinglePictureView.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnSinglePictureWindow_Open() {
        RefreshHeadingSelectedIndex(current_heading_selected_value);
    }
    function OnLatitude_Change() {
        if (current_id && -1 == current_index) {
            var existingPicture = ManagePictureExistingOnTheDB();
            existingPicture && (existingPicture.latitude = $.widgetAppTextFieldLatitude.get_text_value());
        } else Alloy.Globals.CurrentPicsPath[current_index].latitude = $.widgetAppTextFieldLatitude.get_text_value();
    }
    function OnLongitude_Change() {
        if (current_id && -1 == current_index) {
            var existingPicture = ManagePictureExistingOnTheDB();
            existingPicture && (existingPicture.longitude = $.widgetAppTextFieldLongitude.get_text_value());
        } else Alloy.Globals.CurrentPicsPath[current_index].longitude = $.widgetAppTextFieldLongitude.get_text_value();
    }
    function OnAddress_Change() {
        if (current_id && -1 == current_index) {
            var existingPicture = ManagePictureExistingOnTheDB();
            existingPicture && (existingPicture.address = $.widgetAppTextFieldAddress.get_text_value());
        } else Alloy.Globals.CurrentPicsPath[current_index].address = $.widgetAppTextFieldAddress.get_text_value();
    }
    function OnHeading_Change(e) {
        current_heading_selected_value = "";
        switch (e.id) {
          case "1":
            current_heading_selected_value = "N";
            break;

          case "2":
            current_heading_selected_value = "S";
            break;

          case "3":
            current_heading_selected_value = "W";
            break;

          case "4":
            current_heading_selected_value = "E";
            break;

          case "5":
            current_heading_selected_value = "R";
            break;

          case "6":
            current_heading_selected_value = "I";
        }
        if (current_id && -1 == current_index) {
            var existingPicture = ManagePictureExistingOnTheDB();
            existingPicture && (existingPicture.heading = current_heading_selected_value);
        } else Alloy.Globals.CurrentPicsPath[current_index].heading = current_heading_selected_value;
    }
    function OnDamagesLevel_Change() {
        if (current_id && -1 == current_index) {
            var existingPicture = ManagePictureExistingOnTheDB();
            existingPicture && (existingPicture.damages_level = $.widgetAppTextFieldDamagesLevel.get_text_value());
        } else Alloy.Globals.CurrentPicsPath[current_index].damages_level = $.widgetAppTextFieldDamagesLevel.get_text_value();
    }
    function OnDamagesArea_Change() {
        if (current_id && -1 == current_index) {
            var existingPicture = ManagePictureExistingOnTheDB();
            existingPicture && (existingPicture.damages_area = $.widgetAppTextFieldDamagesArea.get_text_value());
        } else Alloy.Globals.CurrentPicsPath[current_index].damages_area = $.widgetAppTextFieldDamagesArea.get_text_value();
    }
    function OnComment_Change() {
        if (current_id && -1 == current_index) {
            var existingPicture = ManagePictureExistingOnTheDB();
            existingPicture && (existingPicture.comment = $.widgetAppTextFieldComment.get_text_value());
        } else Alloy.Globals.CurrentPicsPath[current_index].comment = $.widgetAppTextFieldComment.get_text_value();
    }
    function OnBtnExportToGallery_Click() {
        try {
            var file = Ti.Filesystem.getFile(current_image_path);
            file.exists() ? Ti.Media.saveToPhotoGallery(file, {
                success: function() {
                    alert(L("generic_content_exported_msg"));
                },
                error: function() {
                    alert(L("generic_error_while_exporting_content_msg"));
                }
            }) : alert(L("generic_no_content_to_export_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function ManagePictureExistingOnTheDB() {
        var ret = null;
        Alloy.Globals.CurrentPicsPath || (Alloy.Globals.CurrentPicsPath = new Array());
        for (var i = 0; i < Alloy.Globals.CurrentPicsPath.length; i++) {
            var currentPictureElem = Alloy.Globals.CurrentPicsPath[i];
            if (currentPictureElem.id && currentPictureElem.id == current_id) {
                ret = currentPictureElem;
                current_index = i;
                break;
            }
        }
        if (ret) ; else {
            current_index = Alloy.Globals.CurrentPicsPath.length;
            Alloy.Globals.CurrentPicsPath.push({
                id: current_id,
                latitude: $.widgetAppTextFieldLatitude.get_text_value(),
                longitude: $.widgetAppTextFieldLongitude.get_text_value(),
                address: $.widgetAppTextFieldAddress.get_text_value(),
                heading: current_heading_selected_value,
                damages_level: $.widgetAppTextFieldDamagesLevel.get_text_value(),
                damages_area: $.widgetAppTextFieldDamagesArea.get_text_value(),
                comment: $.widgetAppTextFieldComment.get_text_value()
            });
        }
        return ret;
    }
    function RefreshHeadingSelectedIndex(current_heading) {
        switch (current_heading) {
          case "N":
            $.widgetAppComboBoxHeading.set_selected_index("1");
            current_heading_selected_value = "N";
            break;

          case "S":
            $.widgetAppComboBoxHeading.set_selected_index("2");
            current_heading_selected_value = "S";
            break;

          case "W":
            $.widgetAppComboBoxHeading.set_selected_index("3");
            current_heading_selected_value = "W";
            break;

          case "E":
            $.widgetAppComboBoxHeading.set_selected_index("4");
            current_heading_selected_value = "E";
            break;

          case "R":
            $.widgetAppComboBoxHeading.set_selected_index("5");
            current_heading_selected_value = "R";
            break;

          case "I":
            $.widgetAppComboBoxHeading.set_selected_index("6");
            current_heading_selected_value = "I";
            break;

          default:
            $.widgetAppComboBoxHeading.set_selected_index("0");
            current_heading_selected_value = "";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "SinglePictureView";
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
    $.__views.singlePictureViewWindow = Ti.UI.createWindow({
        title: L("single_picture_view_title"),
        backgroundColor: "#ffffcc",
        id: "singlePictureViewWindow"
    });
    OnSinglePictureWindow_Open ? $.__views.singlePictureViewWindow.addEventListener("open", OnSinglePictureWindow_Open) : __defers["$.__views.singlePictureViewWindow!open!OnSinglePictureWindow_Open"] = true;
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.singlePictureViewWindow.leftNavButton = $.__views.btn_ios_back;
    var __alloyId165 = [];
    $.__views.viewImageView = Ti.UI.createView({
        id: "viewImageView"
    });
    __alloyId165.push($.__views.viewImageView);
    $.__views.single_picture_view = Ti.UI.createImageView({
        defaultImage: "/images/img_not_found.png",
        id: "single_picture_view"
    });
    $.__views.viewImageView.add($.__views.single_picture_view);
    $.__views.viewData = Ti.UI.createView({
        id: "viewData"
    });
    __alloyId165.push($.__views.viewData);
    $.__views.scrollViewSinglePictureView = Ti.UI.createScrollView({
        top: 0,
        scrollType: "vertical",
        id: "scrollViewSinglePictureView"
    });
    $.__views.viewData.add($.__views.scrollViewSinglePictureView);
    $.__views.viewAppTextFieldLatitude = Ti.UI.createView({
        top: 10,
        left: 5,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldLatitude"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.viewAppTextFieldLatitude);
    $.__views.widgetAppTextFieldLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldLatitude",
        __parentSymbol: $.__views.viewAppTextFieldLatitude
    });
    $.__views.widgetAppTextFieldLatitude.setParent($.__views.viewAppTextFieldLatitude);
    $.__views.viewAppTextFieldLongitude = Ti.UI.createView({
        top: 62,
        left: 5,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldLongitude"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.viewAppTextFieldLongitude);
    $.__views.widgetAppTextFieldLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldLongitude",
        __parentSymbol: $.__views.viewAppTextFieldLongitude
    });
    $.__views.widgetAppTextFieldLongitude.setParent($.__views.viewAppTextFieldLongitude);
    $.__views.viewAppTextFieldAddress = Ti.UI.createView({
        top: 114,
        left: 5,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAddress"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.viewAppTextFieldAddress);
    $.__views.widgetAppTextFieldAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAddress",
        __parentSymbol: $.__views.viewAppTextFieldAddress
    });
    $.__views.widgetAppTextFieldAddress.setParent($.__views.viewAppTextFieldAddress);
    $.__views.viewAppComboBoxHeading = Ti.UI.createView({
        top: 166,
        left: 5,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxHeading"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.viewAppComboBoxHeading);
    $.__views.widgetAppComboBoxHeading = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxHeading",
        __parentSymbol: $.__views.viewAppComboBoxHeading
    });
    $.__views.widgetAppComboBoxHeading.setParent($.__views.viewAppComboBoxHeading);
    $.__views.viewAppTextFieldDamagesLevel = Ti.UI.createView({
        top: 218,
        left: 5,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldDamagesLevel"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.viewAppTextFieldDamagesLevel);
    $.__views.widgetAppTextFieldDamagesLevel = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldDamagesLevel",
        __parentSymbol: $.__views.viewAppTextFieldDamagesLevel
    });
    $.__views.widgetAppTextFieldDamagesLevel.setParent($.__views.viewAppTextFieldDamagesLevel);
    $.__views.viewAppTextFieldDamagesArea = Ti.UI.createView({
        top: 270,
        left: 5,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldDamagesArea"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.viewAppTextFieldDamagesArea);
    $.__views.widgetAppTextFieldDamagesArea = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldDamagesArea",
        __parentSymbol: $.__views.viewAppTextFieldDamagesArea
    });
    $.__views.widgetAppTextFieldDamagesArea.setParent($.__views.viewAppTextFieldDamagesArea);
    $.__views.viewAppTextFieldComment = Ti.UI.createView({
        top: 322,
        left: 5,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 10,
        id: "viewAppTextFieldComment"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.viewAppTextFieldComment);
    $.__views.widgetAppTextFieldComment = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldComment",
        __parentSymbol: $.__views.viewAppTextFieldComment
    });
    $.__views.widgetAppTextFieldComment.setParent($.__views.viewAppTextFieldComment);
    $.__views.btnExportToGallery = Ti.UI.createButton({
        title: L("generic_export_to_gallery_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 377,
        height: 50,
        left: 10,
        right: 10,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        bottom: 10,
        id: "btnExportToGallery"
    });
    $.__views.scrollViewSinglePictureView.add($.__views.btnExportToGallery);
    OnBtnExportToGallery_Click ? $.__views.btnExportToGallery.addEventListener("click", OnBtnExportToGallery_Click) : __defers["$.__views.btnExportToGallery!click!OnBtnExportToGallery_Click"] = true;
    $.__views.scrollable_picture_data = Ti.UI.createScrollableView({
        showPagingControl: true,
        currentPage: 0,
        views: __alloyId165,
        id: "scrollable_picture_data"
    });
    $.__views.singlePictureViewWindow.add($.__views.scrollable_picture_data);
    $.__views.navigationWindowSinglePictureView = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.singlePictureViewWindow,
        id: "navigationWindowSinglePictureView"
    });
    $.__views.navigationWindowSinglePictureView && $.addTopLevelView($.__views.navigationWindowSinglePictureView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_id = null;
    args.id && (current_id = args.id);
    var current_image_path = args.image_path;
    var current_latitude = args.latitude;
    var current_longitude = args.longitude;
    var current_address = args.address;
    var current_heading = args.heading;
    var current_damages_level = args.damages_level;
    var current_damages_area = args.damages_area;
    var current_comment = args.comment;
    var current_index = args.index;
    var current_is_synchronized = args.is_synchronized;
    var current_is_enabled = args.is_enabled;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    "undefined" != typeof current_is_enabled && (view_enabled = current_is_enabled);
    var current_heading_selected_value = "";
    try {
        current_id && (current_index = -1);
        current_image_path && $.single_picture_view.setImage(current_image_path);
        var headingParentView = null;
        var thisView = $.getView();
        headingParentView = thisView;
        var headingValues = {
            0: {
                title: L("generic_heading_not_detected")
            },
            1: {
                title: L("generic_heading_north")
            },
            2: {
                title: L("generic_heading_south")
            },
            3: {
                title: L("generic_heading_west")
            },
            4: {
                title: L("generic_heading_east")
            },
            5: {
                title: L("generic_heading_roof")
            },
            6: {
                title: L("generic_heading_indoor")
            }
        };
        $.widgetAppComboBoxHeading.init(L("generic_heading_text_msg"), headingValues, OnHeading_Change, null, headingParentView);
        $.widgetAppComboBoxHeading.enabled(view_enabled);
        RefreshHeadingSelectedIndex(current_heading);
        $.widgetAppTextFieldLatitude.set_text_value(current_latitude);
        $.widgetAppTextFieldLatitude.init(L("generic_latitude_txt_hint"), OnLatitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldLatitude.enabled(view_enabled);
        $.widgetAppTextFieldLongitude.set_text_value(current_longitude);
        $.widgetAppTextFieldLongitude.init(L("generic_longitude_txt_hint"), OnLongitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldLongitude.enabled(view_enabled);
        $.widgetAppTextFieldAddress.set_text_value(current_address);
        $.widgetAppTextFieldAddress.init(L("generic_address_txt_hint"), OnAddress_Change);
        $.widgetAppTextFieldAddress.enabled(view_enabled);
        $.widgetAppTextFieldDamagesLevel.set_text_value(current_damages_level);
        $.widgetAppTextFieldDamagesLevel.init(L("generic_damages_level_txt_hint"), OnDamagesLevel_Change, Titanium.UI.KEYBOARD_NUMBER_PAD, 2, false, "5");
        $.widgetAppTextFieldDamagesLevel.enabled(view_enabled);
        $.widgetAppTextFieldDamagesArea.set_text_value(current_damages_area);
        $.widgetAppTextFieldDamagesArea.init(L("generic_damages_area_txt_hint"), OnDamagesArea_Change, Titanium.UI.KEYBOARD_NUMBER_PAD, 3);
        $.widgetAppTextFieldDamagesArea.enabled(view_enabled);
        $.widgetAppTextFieldComment.set_text_value(current_comment);
        $.widgetAppTextFieldComment.init(L("generic_comment_txt_hint"), OnComment_Change);
        $.widgetAppTextFieldComment.enabled(view_enabled);
        RegisterHideKeyboard($.singlePictureViewWindow, [ $.widgetAppTextFieldLatitude.get_text_field(), $.widgetAppTextFieldLongitude.get_text_field(), $.widgetAppTextFieldAddress.get_text_field(), $.widgetAppTextFieldDamagesLevel.get_text_field(), $.widgetAppTextFieldDamagesArea.get_text_field(), $.widgetAppTextFieldComment.get_text_field() ]);
        $.navigationWindowSinglePictureView.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.singlePictureViewWindow!open!OnSinglePictureWindow_Open"] && $.__views.singlePictureViewWindow.addEventListener("open", OnSinglePictureWindow_Open);
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btnExportToGallery!click!OnBtnExportToGallery_Click"] && $.__views.btnExportToGallery.addEventListener("click", OnBtnExportToGallery_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;