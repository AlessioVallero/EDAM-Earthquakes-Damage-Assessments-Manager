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
                title: L("sign_save_title"),
                message: L("sign_is_done_confirm_msg"),
                buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                cancel: 1
            });
            alertDialog.addEventListener("click", function(e) {
                0 == e.index ? BusyAction($.activity_indicator, controls, function() {
                    var bRet = false;
                    var image_to_save = $.paint_widget.get_current_image();
                    if (image_to_save) {
                        if (current_component_number) switch (current_component_number) {
                          case 1:
                            "AeDES" == current_mode ? Alloy.Globals.AeDESCurrentSign1 = image_to_save : Alloy.Globals.ShedCurrentSign1 = image_to_save;
                            break;

                          case 2:
                            "AeDES" == current_mode ? Alloy.Globals.AeDESCurrentSign2 = image_to_save : Alloy.Globals.ShedCurrentSign2 = image_to_save;
                            break;

                          case 3:
                            "AeDES" == current_mode ? Alloy.Globals.AeDESCurrentSign3 = image_to_save : Alloy.Globals.ShedCurrentSign3 = image_to_save;
                        } else "ATC20NZ" == current_mode ? Alloy.Globals.ATC20NZCurrentSign = image_to_save : Alloy.Globals.UsersResidentsCurrentSign = image_to_save;
                        bRet = true;
                    } else alert(L("generic_no_image_to_save_msg"));
                    return bRet;
                }) && $.paint_view_container_window.close() : 1 == e.index;
            });
            alertDialog.show();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "CreateSignPaintView";
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
    $.__views.paint_view_container_window = Ti.UI.createWindow({
        title: L("sign_paint_view_title"),
        backgroundColor: "#ffffcc",
        id: "paint_view_container_window"
    });
    $.__views.paint_view_container_window && $.addTopLevelView($.__views.paint_view_container_window);
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
    $.__views.paint_view_container_window.add($.__views.activity_indicator);
    $.__views.paint_widget = Alloy.createWidget("com.diseg.PaintView", "widget", {
        id: "paint_widget",
        __parentSymbol: $.__views.paint_view_container_window
    });
    $.__views.paint_widget.setParent($.__views.paint_view_container_window);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_component_number = args.component_number;
    var current_mode = args.mode;
    var controls = new Array();
    controls.push($.paint_widget.get_done_button());
    try {
        $.paint_widget.init(OnBtnDone_Click);
        $.paint_view_container_window.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;