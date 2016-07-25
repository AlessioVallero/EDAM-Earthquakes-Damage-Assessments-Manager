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
            controls = null;
            $.damageAssessmentsMakerWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnNorthSide_Click() {
        try {
            if (north_side_array && north_side_array.length > 0) {
                var sideValue = "N";
                if (Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue]) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_side_already_completed_title"),
                        message: L("side_already_completed_text_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        0 == e.index && Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                            media_contents: north_side_array,
                            type: current_type,
                            da_msg: L("btn_north_side_text"),
                            da_value: sideValue,
                            is_damage_assessments_maker_view: true
                        });
                    });
                    alertDialog.show();
                } else Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: north_side_array,
                    type: current_type,
                    da_msg: L("btn_north_side_text"),
                    da_value: sideValue,
                    is_damage_assessments_maker_view: true
                });
            } else alert(L("no_side_media_for_the_gallery_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnEastSide_Click() {
        try {
            if (east_side_array && east_side_array.length > 0) {
                var sideValue = "E";
                if (Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue]) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_side_already_completed_title"),
                        message: L("side_already_completed_text_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        0 == e.index && Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                            media_contents: east_side_array,
                            type: current_type,
                            da_msg: L("btn_east_side_text"),
                            da_value: sideValue,
                            is_damage_assessments_maker_view: true
                        });
                    });
                    alertDialog.show();
                } else Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: east_side_array,
                    type: current_type,
                    da_msg: L("btn_east_side_text"),
                    da_value: sideValue,
                    is_damage_assessments_maker_view: true
                });
            } else alert(L("no_side_media_for_the_gallery_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSouthSide_Click() {
        try {
            if (south_side_array && south_side_array.length > 0) {
                var sideValue = "S";
                if (Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue]) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_side_already_completed_title"),
                        message: L("side_already_completed_text_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        0 == e.index && Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                            media_contents: south_side_array,
                            type: current_type,
                            da_msg: L("btn_south_side_text"),
                            da_value: sideValue,
                            is_damage_assessments_maker_view: true
                        });
                    });
                    alertDialog.show();
                } else Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: south_side_array,
                    type: current_type,
                    da_msg: L("btn_south_side_text"),
                    da_value: sideValue,
                    is_damage_assessments_maker_view: true
                });
            } else alert(L("no_side_media_for_the_gallery_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnWestSide_Click() {
        try {
            if (west_side_array && west_side_array.length > 0) {
                var sideValue = "W";
                if (Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue]) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_side_already_completed_title"),
                        message: L("side_already_completed_text_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        0 == e.index && Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                            media_contents: west_side_array,
                            type: current_type,
                            da_msg: L("btn_west_side_text"),
                            da_value: sideValue,
                            is_damage_assessments_maker_view: true
                        });
                    });
                    alertDialog.show();
                } else Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: west_side_array,
                    type: current_type,
                    da_msg: L("btn_west_side_text"),
                    da_value: sideValue,
                    is_damage_assessments_maker_view: true
                });
            } else alert(L("no_side_media_for_the_gallery_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnRoof_Click() {
        try {
            if (roof_array && roof_array.length > 0) {
                var roofValue = "R";
                if (Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[roofValue]) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_roof_already_completed_title"),
                        message: L("roof_already_completed_text_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        0 == e.index && Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                            media_contents: roof_array,
                            type: current_type,
                            da_msg: L("btn_roof_text"),
                            da_value: roofValue,
                            is_damage_assessments_maker_view: true
                        });
                    });
                    alertDialog.show();
                } else Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: roof_array,
                    type: current_type,
                    da_msg: L("btn_roof_text"),
                    da_value: roofValue,
                    is_damage_assessments_maker_view: true
                });
            } else alert(L("no_roof_media_for_the_gallery_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnIndoor_Click() {
        try {
            if (indoor_array && indoor_array.length > 0) {
                var indoorValue = "I";
                if (Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[indoorValue]) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_indoor_already_completed_title"),
                        message: L("indoor_already_completed_text_msg"),
                        buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(e) {
                        0 == e.index && Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                            media_contents: indoor_array,
                            type: current_type,
                            da_msg: L("btn_indoor_text"),
                            da_value: indoorValue,
                            is_damage_assessments_maker_view: true
                        });
                    });
                    alertDialog.show();
                } else Alloy.Globals.createAndOpenControllerExt("TableGalleryView", {
                    media_contents: indoor_array,
                    type: current_type,
                    da_msg: L("btn_indoor_text"),
                    da_value: indoorValue,
                    is_damage_assessments_maker_view: true
                });
            } else alert(L("no_indoor_media_for_the_gallery_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function InsertDAElements() {
        Alloy.Globals.CurrentPicsPath || (Alloy.Globals.CurrentPicsPath = new Array());
        var current_time = new Date().toISOString().replace(/(-)|(\.)|(:)/g, "");
        if (Alloy.Globals.DamageAssessmentsMakerPics["N"]) {
            var north_side = Alloy.Globals.DamageAssessmentsMakerPics["N"];
            Alloy.Globals.CurrentPicsPath.push({
                media: north_side.picture,
                latitude: north_side.latitude,
                longitude: north_side.longitude,
                address: north_side.address,
                heading: north_side.heading,
                damages_level: north_side.damages_level,
                damages_area: north_side.damages_area,
                comment: north_side.comment,
                path: "NorthSide_" + current_time
            });
        }
        if (Alloy.Globals.DamageAssessmentsMakerPics["E"]) {
            var east_side = Alloy.Globals.DamageAssessmentsMakerPics["E"];
            Alloy.Globals.CurrentPicsPath.push({
                media: east_side.picture,
                latitude: east_side.latitude,
                longitude: east_side.longitude,
                address: east_side.address,
                heading: east_side.heading,
                damages_level: east_side.damages_level,
                damages_area: east_side.damages_area,
                comment: east_side.comment,
                path: "EastSide_" + current_time
            });
        }
        if (Alloy.Globals.DamageAssessmentsMakerPics["S"]) {
            var south_side = Alloy.Globals.DamageAssessmentsMakerPics["S"];
            Alloy.Globals.CurrentPicsPath.push({
                media: south_side.picture,
                latitude: south_side.latitude,
                longitude: south_side.longitude,
                address: south_side.address,
                heading: south_side.heading,
                damages_level: south_side.damages_level,
                damages_area: south_side.damages_area,
                comment: south_side.comment,
                path: "SouthSide_" + current_time
            });
        }
        if (Alloy.Globals.DamageAssessmentsMakerPics["W"]) {
            var west_side = Alloy.Globals.DamageAssessmentsMakerPics["W"];
            Alloy.Globals.CurrentPicsPath.push({
                media: west_side.picture,
                latitude: west_side.latitude,
                longitude: west_side.longitude,
                address: west_side.address,
                heading: west_side.heading,
                damages_level: west_side.damages_level,
                damages_area: west_side.damages_area,
                comment: west_side.comment,
                path: "WestSide_" + current_time
            });
        }
        if (Alloy.Globals.DamageAssessmentsMakerPics["R"]) {
            var roof = Alloy.Globals.DamageAssessmentsMakerPics["R"];
            Alloy.Globals.CurrentPicsPath.push({
                media: roof.picture,
                latitude: roof.latitude,
                longitude: roof.longitude,
                address: roof.address,
                heading: roof.heading,
                damages_level: roof.damages_level,
                damages_area: roof.damages_area,
                comment: roof.comment,
                path: "Roof_" + current_time
            });
        }
        if (Alloy.Globals.DamageAssessmentsMakerPics["I"]) {
            var indoor = Alloy.Globals.DamageAssessmentsMakerPics["I"];
            Alloy.Globals.CurrentPicsPath.push({
                media: indoor.picture,
                latitude: indoor.latitude,
                longitude: indoor.longitude,
                address: indoor.address,
                heading: indoor.heading,
                damages_level: indoor.damages_level,
                damages_area: indoor.damages_area,
                comment: indoor.comment,
                path: "Indoor_" + current_time
            });
        }
    }
    function OnBtnDone_Click() {
        try {
            if (Alloy.Globals.DamageAssessmentsMakerPics && (Alloy.Globals.DamageAssessmentsMakerPics["N"] || Alloy.Globals.DamageAssessmentsMakerPics["E"] || Alloy.Globals.DamageAssessmentsMakerPics["S"] || Alloy.Globals.DamageAssessmentsMakerPics["W"] || Alloy.Globals.DamageAssessmentsMakerPics["R"] || Alloy.Globals.DamageAssessmentsMakerPics["I"])) if (Alloy.Globals.DamageAssessmentsMakerPics["N"] && Alloy.Globals.DamageAssessmentsMakerPics["E"] && Alloy.Globals.DamageAssessmentsMakerPics["S"] && Alloy.Globals.DamageAssessmentsMakerPics["W"] && Alloy.Globals.DamageAssessmentsMakerPics["R"] || Alloy.Globals.DamageAssessmentsMakerPics["I"]) {
                InsertDAElements();
                Back();
            } else {
                var alertDialog = Titanium.UI.createAlertDialog({
                    title: L("generic_da_element_missing_title"),
                    message: L("da_element_missing_text_msg"),
                    buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                    cancel: 1
                });
                alertDialog.addEventListener("click", function(e) {
                    if (0 == e.index) {
                        InsertDAElements();
                        Back();
                    }
                });
                alertDialog.show();
            } else alert(L("da_elements_not_completed_text_msg"));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "DamageAssessmentsMakerView";
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
    $.__views.damageAssessmentsMakerWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "damageAssessmentsMakerWindow"
    });
    $.__views.damageAssessmentsMakerWindow && $.addTopLevelView($.__views.damageAssessmentsMakerWindow);
    OnAndroidBackButton_Click ? $.__views.damageAssessmentsMakerWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.damageAssessmentsMakerWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.damageAssessmentsMakerWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.damageAssessmentsMakerWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.damageAssessmentsMakerWindow.add($.__views.activity_indicator);
    $.__views.lblInstructions = Ti.UI.createLabel({
        text: L("damage_assessments_manager_instructions_msg"),
        width: "auto",
        height: "auto",
        color: "#000",
        top: "5%",
        font: {
            fontSize: 14,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblInstructions"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.lblInstructions);
    $.__views.btn_north_side = Ti.UI.createButton({
        title: L("btn_north_side_text"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "22%",
        width: 112,
        height: "10%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "16"
        },
        id: "btn_north_side"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.btn_north_side);
    OnBtnNorthSide_Click ? $.__views.btn_north_side.addEventListener("click", OnBtnNorthSide_Click) : __defers["$.__views.btn_north_side!click!OnBtnNorthSide_Click"] = true;
    $.__views.btn_east_side = Ti.UI.createButton({
        title: L("btn_east_side_text"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "35%",
        width: 112,
        height: "10%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "16"
        },
        id: "btn_east_side"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.btn_east_side);
    OnBtnEastSide_Click ? $.__views.btn_east_side.addEventListener("click", OnBtnEastSide_Click) : __defers["$.__views.btn_east_side!click!OnBtnEastSide_Click"] = true;
    $.__views.btn_south_side = Ti.UI.createButton({
        title: L("btn_south_side_text"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "47%",
        width: 112,
        height: "10%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "16"
        },
        id: "btn_south_side"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.btn_south_side);
    OnBtnSouthSide_Click ? $.__views.btn_south_side.addEventListener("click", OnBtnSouthSide_Click) : __defers["$.__views.btn_south_side!click!OnBtnSouthSide_Click"] = true;
    $.__views.btn_west_side = Ti.UI.createButton({
        title: L("btn_west_side_text"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "60%",
        width: 112,
        height: "10%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "16"
        },
        id: "btn_west_side"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.btn_west_side);
    OnBtnWestSide_Click ? $.__views.btn_west_side.addEventListener("click", OnBtnWestSide_Click) : __defers["$.__views.btn_west_side!click!OnBtnWestSide_Click"] = true;
    $.__views.btn_roof = Ti.UI.createButton({
        title: L("btn_roof_text"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "73%",
        width: 112,
        height: "10%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "16"
        },
        id: "btn_roof"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.btn_roof);
    OnBtnRoof_Click ? $.__views.btn_roof.addEventListener("click", OnBtnRoof_Click) : __defers["$.__views.btn_roof!click!OnBtnRoof_Click"] = true;
    $.__views.btn_indoor = Ti.UI.createButton({
        title: L("btn_indoor_text"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        top: "86%",
        width: 112,
        height: "10%",
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "16"
        },
        id: "btn_indoor"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.btn_indoor);
    OnBtnIndoor_Click ? $.__views.btn_indoor.addEventListener("click", OnBtnIndoor_Click) : __defers["$.__views.btn_indoor!click!OnBtnIndoor_Click"] = true;
    $.__views.viewAppButtonDone = Ti.UI.createView({
        bottom: "4%",
        right: "5%",
        height: 100,
        width: 60,
        id: "viewAppButtonDone"
    });
    $.__views.damageAssessmentsMakerWindow.add($.__views.viewAppButtonDone);
    $.__views.widgetAppButtonDone = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonDone",
        __parentSymbol: $.__views.viewAppButtonDone
    });
    $.__views.widgetAppButtonDone.setParent($.__views.viewAppButtonDone);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_type = args.type;
    var current_media_contents = args.media_contents;
    var north_side_array = new Array();
    var south_side_array = new Array();
    var west_side_array = new Array();
    var east_side_array = new Array();
    var roof_array = new Array();
    var indoor_array = new Array();
    var controls = new Array();
    controls.push($.btn_north_side);
    controls.push($.btn_east_side);
    controls.push($.btn_south_side);
    controls.push($.btn_west_side);
    controls.push($.btn_roof);
    controls.push($.btn_indoor);
    controls.push($.widgetAppButtonDone.get_button());
    try {
        Alloy.Globals.DamageAssessmentsMakerPics = null;
        if (current_media_contents && current_media_contents.length > 0) for (var i = 0; i < current_media_contents.length; i++) {
            var current_media_elem = current_media_contents[i];
            if (current_media_elem.heading) switch (current_media_elem.heading) {
              case "N":
                north_side_array.push(current_media_elem);
                break;

              case "S":
                south_side_array.push(current_media_elem);
                break;

              case "W":
                west_side_array.push(current_media_elem);
                break;

              case "E":
                east_side_array.push(current_media_elem);
                break;

              case "R":
                roof_array.push(current_media_elem);
                break;

              case "I":
                indoor_array.push(current_media_elem);
            } else {
                north_side_array.push(current_media_elem);
                south_side_array.push(current_media_elem);
                west_side_array.push(current_media_elem);
                east_side_array.push(current_media_elem);
                roof_array.push(current_media_elem);
                indoor_array.push(current_media_elem);
            }
        }
        north_side_array.length < 1 && ($.btn_north_side.enabled = false);
        south_side_array.length < 1 && ($.btn_south_side.enabled = false);
        west_side_array.length < 1 && ($.btn_west_side.enabled = false);
        east_side_array.length < 1 && ($.btn_east_side.enabled = false);
        roof_array.length < 1 && ($.btn_roof.enabled = false);
        indoor_array.length < 1 && ($.btn_indoor.enabled = false);
        $.damageAssessmentsMakerWindow.setTitle("Shed" == current_type ? L("shed_damage_assessments_view_title") : L("building_damage_assessments_view_title"));
        $.widgetAppButtonDone.init("/images/done_normal.png", "/images/done_pressed.png", "/images/done_disabled.png", L("generic_done_btn_title"), OnBtnDone_Click);
        $.damageAssessmentsMakerWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.damageAssessmentsMakerWindow!android:back!OnAndroidBackButton_Click"] && $.__views.damageAssessmentsMakerWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.damageAssessmentsMakerWindow!androidback!OnAndroidBackButton_Click"] && $.__views.damageAssessmentsMakerWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btn_north_side!click!OnBtnNorthSide_Click"] && $.__views.btn_north_side.addEventListener("click", OnBtnNorthSide_Click);
    __defers["$.__views.btn_east_side!click!OnBtnEastSide_Click"] && $.__views.btn_east_side.addEventListener("click", OnBtnEastSide_Click);
    __defers["$.__views.btn_south_side!click!OnBtnSouthSide_Click"] && $.__views.btn_south_side.addEventListener("click", OnBtnSouthSide_Click);
    __defers["$.__views.btn_west_side!click!OnBtnWestSide_Click"] && $.__views.btn_west_side.addEventListener("click", OnBtnWestSide_Click);
    __defers["$.__views.btn_roof!click!OnBtnRoof_Click"] && $.__views.btn_roof.addEventListener("click", OnBtnRoof_Click);
    __defers["$.__views.btn_indoor!click!OnBtnIndoor_Click"] && $.__views.btn_indoor.addEventListener("click", OnBtnIndoor_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;