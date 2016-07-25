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
        Back({
            done_propagation_event_enabled: false
        });
    }
    function Back(data) {
        try {
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "da:done");
            data.done_propagation_event_enabled ? Ti.App.fireEvent("da:done_propagation") : Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "da:done_propagation");
            $.damageAssessmentsElemWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnNext_Click() {
        try {
            var picture = null;
            picture = $.viewMainContainer.toImage().media;
            var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".png");
            newFile.exists && newFile.deleteFile();
            newFile.write(picture);
            var first_selected_pics_elem = current_selected_pics[0];
            var media_details = {
                da_value: current_da_value,
                picture: newFile.getNativePath(),
                latitude: first_selected_pics_elem.latitude,
                longitude: first_selected_pics_elem.longitude,
                address: first_selected_pics_elem.address,
                heading: current_da_value
            };
            Alloy.Globals.ProtectedAddEventListener(Ti.App, "da:done", Back);
            Alloy.Globals.createAndOpenControllerExt("MediaDamagesDetailsView", {
                type: "DA",
                media_details: media_details,
                heading_enabled: false
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnCurrentMode_Click() {
        switch (current_mode) {
          case "MovePics":
            current_mode = "Draw";
            $.paint_view.eraseMode = false;
            $.paint_view.zIndex = Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex + 1;
            $.btnCurrentMode.setTitle(L("damage_assessments_elem_draw_msg"));
            break;

          case "Draw":
            current_mode = "EraseDrawing";
            $.paint_view.eraseMode = true;
            $.btnCurrentMode.setTitle(L("damage_assessments_elem_erase_drawing_msg"));
            break;

          case "EraseDrawing":
            current_mode = "MovePics";
            $.paint_view.zIndex = 1;
            $.btnCurrentMode.setTitle(L("damage_assessments_elem_move_pics_msg"));
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "DAElementDamageAssessmentsView";
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
    $.__views.damageAssessmentsElemWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "damageAssessmentsElemWindow"
    });
    $.__views.damageAssessmentsElemWindow && $.addTopLevelView($.__views.damageAssessmentsElemWindow);
    OnAndroidBackButton_Click ? $.__views.damageAssessmentsElemWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.damageAssessmentsElemWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.damageAssessmentsElemWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.damageAssessmentsElemWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.damageAssessmentsElemWindow.add($.__views.activity_indicator);
    $.__views.viewAppButtonNext = Ti.UI.createView({
        top: 5,
        left: 5,
        width: 60,
        id: "viewAppButtonNext"
    });
    $.__views.damageAssessmentsElemWindow.add($.__views.viewAppButtonNext);
    $.__views.widgetAppButtonNext = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonNext",
        __parentSymbol: $.__views.viewAppButtonNext
    });
    $.__views.widgetAppButtonNext.setParent($.__views.viewAppButtonNext);
    $.__views.lblInstructions = Ti.UI.createLabel({
        text: L("damage_assessments_elem_instructions_msg"),
        width: "auto",
        height: 105,
        color: "#000",
        top: 5,
        left: 70,
        font: {
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblInstructions"
    });
    $.__views.damageAssessmentsElemWindow.add($.__views.lblInstructions);
    $.__views.lblCurrentMode = Ti.UI.createLabel({
        text: L("damage_assessments_elem_mode_msg"),
        width: 100,
        height: 30,
        color: "#000",
        top: 120,
        left: 0,
        font: {
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "lblCurrentMode"
    });
    $.__views.damageAssessmentsElemWindow.add($.__views.lblCurrentMode);
    $.__views.btnCurrentMode = Ti.UI.createButton({
        title: L("damage_assessments_elem_move_pics_msg"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 120,
        left: 105,
        right: 10,
        height: 30,
        width: Ti.UI.FILL,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "16"
        },
        id: "btnCurrentMode"
    });
    $.__views.damageAssessmentsElemWindow.add($.__views.btnCurrentMode);
    OnBtnCurrentMode_Click ? $.__views.btnCurrentMode.addEventListener("click", OnBtnCurrentMode_Click) : __defers["$.__views.btnCurrentMode!click!OnBtnCurrentMode_Click"] = true;
    $.__views.viewMainContainer = Ti.UI.createView({
        top: 160,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffcc",
        id: "viewMainContainer"
    });
    $.__views.damageAssessmentsElemWindow.add($.__views.viewMainContainer);
    $.__views.viewDisableDraw = Ti.UI.createView({
        top: 0,
        borderColor: "transparent",
        backgroundColor: "transparent",
        zIndex: 2,
        id: "viewDisableDraw"
    });
    $.__views.viewMainContainer.add($.__views.viewDisableDraw);
    $.__views.paint_view = (require("ti.paint").createPaintView || Ti.UI.createPaintView)({
        backgroundColor: "transparent",
        top: 0,
        strokeAlpha: 255,
        strokeColor: "red",
        strokeWidth: 8,
        eraseMode: false,
        zIndex: 1,
        id: "paint_view"
    });
    $.__views.viewMainContainer.add($.__views.paint_view);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_selected_pics = args.selected_pics;
    var current_da_msg = args.da_msg;
    var current_da_value = args.da_value;
    var current_mode = "MovePics";
    try {
        Alloy.Globals.DamageAssessmentsMakerPics && (Alloy.Globals.DamageAssessmentsMakerPics[current_da_value] = null);
        $.widgetAppButtonNext.init("/images/next_normal.png", "/images/next_pressed.png", "/images/next_disabled.png", L("generic_next_btn_title"), OnBtnNext_Click);
        $.damageAssessmentsElemWindow.setTitle(current_da_msg);
        var PinchableAndDraggableImageView = require("PinchableAndDraggableImageView");
        for (var i = 0; i < current_selected_pics.length; i++) {
            var pinchableAndDraggableImageView = new PinchableAndDraggableImageView(current_selected_pics[i].image);
            $.viewMainContainer.add(pinchableAndDraggableImageView);
        }
        $.damageAssessmentsElemWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.damageAssessmentsElemWindow!android:back!OnAndroidBackButton_Click"] && $.__views.damageAssessmentsElemWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.damageAssessmentsElemWindow!androidback!OnAndroidBackButton_Click"] && $.__views.damageAssessmentsElemWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btnCurrentMode!click!OnBtnCurrentMode_Click"] && $.__views.btnCurrentMode.addEventListener("click", OnBtnCurrentMode_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;