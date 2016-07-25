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
            $.navigationWindowDPV.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnDone_Click() {
        try {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: L("draft_save_title"),
                message: L("draft_is_done_confirm_msg"),
                buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                cancel: 1
            });
            alertDialog.addEventListener("click", function(e) {
                0 == e.index ? BusyAction($.activity_indicator, controls, function() {
                    var bRet = false;
                    var image_to_save = $.draft_paint_widget.get_current_image("Detailed_ATC20_Sketch" == current_type);
                    if (image_to_save) {
                        var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".png");
                        newFile.exists && newFile.deleteFile();
                        newFile.write(image_to_save);
                        if ("Detailed_ATC20_Sketch" == current_type) {
                            Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = newFile.getNativePath();
                            Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] = "Y";
                        } else if ("Detailed_BAEA_Sketch" == current_type) {
                            Alloy.Globals.CurrentTemporaryPicsPath || (Alloy.Globals.CurrentTemporaryPicsPath = new Array());
                            Alloy.Globals.CurrentTemporaryPicsPath.push({
                                media: newFile.getNativePath(),
                                section: current_baea_section
                            });
                        } else {
                            Alloy.Globals.CurrentPicsPath || (Alloy.Globals.CurrentPicsPath = new Array());
                            Alloy.Globals.CurrentPicsPath.push({
                                media: newFile.getNativePath(),
                                latitude: 0,
                                longitude: 0,
                                address: "",
                                heading: "",
                                damages_level: "0",
                                damages_area: "0",
                                comment: ""
                            });
                        }
                        bRet = true;
                    } else alert(L("generic_no_image_to_save_msg"));
                    return bRet;
                }) && $.navigationWindowDPV.close() : 1 == e.index;
            });
            alertDialog.show();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "DraftPaintView";
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
    $.__views.draft_paint_view_container_window = Ti.UI.createWindow({
        title: L("draft_paint_view_title"),
        backgroundColor: "#ffffcc",
        id: "draft_paint_view_container_window"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.draft_paint_view_container_window.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.draft_paint_view_container_window.add($.__views.activity_indicator);
    $.__views.draft_paint_widget = Alloy.createWidget("com.diseg.PaintView", "widget", {
        id: "draft_paint_widget",
        __parentSymbol: $.__views.draft_paint_view_container_window
    });
    $.__views.draft_paint_widget.setParent($.__views.draft_paint_view_container_window);
    $.__views.navigationWindowDPV = Ti.UI.iOS.createNavigationWindow({
        backgroundColor: "#ffffff",
        window: $.__views.draft_paint_view_container_window,
        id: "navigationWindowDPV"
    });
    $.__views.navigationWindowDPV && $.addTopLevelView($.__views.navigationWindowDPV);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_type = args.type;
    var current_baea_section = args.baea_section;
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.draft_paint_widget.get_done_button());
    try {
        $.draft_paint_widget.init(OnBtnDone_Click);
        $.navigationWindowDPV.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;