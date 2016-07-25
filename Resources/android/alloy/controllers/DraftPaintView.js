function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
                }) && $.draft_paint_view_container_window.close() : 1 == e.index;
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
    $.__views.draft_paint_view_container_window = Ti.UI.createWindow({
        title: L("draft_paint_view_title"),
        backgroundColor: "#ffffcc",
        id: "draft_paint_view_container_window"
    });
    $.__views.draft_paint_view_container_window && $.addTopLevelView($.__views.draft_paint_view_container_window);
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
    $.__views.draft_paint_view_container_window.add($.__views.activity_indicator);
    $.__views.draft_paint_widget = Alloy.createWidget("com.diseg.PaintView", "widget", {
        id: "draft_paint_widget",
        __parentSymbol: $.__views.draft_paint_view_container_window
    });
    $.__views.draft_paint_widget.setParent($.__views.draft_paint_view_container_window);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_type = args.type;
    var current_baea_section = args.baea_section;
    var controls = new Array();
    controls.push($.draft_paint_widget.get_done_button());
    try {
        $.draft_paint_widget.init(OnBtnDone_Click);
        $.draft_paint_view_container_window.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;