function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnD4D5_Change(e) {
        try {
            var newDamageValue = Alloy.Globals.replaceCharAt(3 * current_type_id + 30 * current_type_section, Alloy.Globals.ShedModeDamages["DAMAGES"], e.id);
            Alloy.Globals.ShedModeDamages["DAMAGES"] = newDamageValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnD2D3_Change(e) {
        try {
            var newDamageValue = Alloy.Globals.replaceCharAt(3 * current_type_id + 1 + 30 * current_type_section, Alloy.Globals.ShedModeDamages["DAMAGES"], e.id);
            Alloy.Globals.ShedModeDamages["DAMAGES"] = newDamageValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnD0D1_Change(e) {
        try {
            var newDamageValue = Alloy.Globals.replaceCharAt(3 * current_type_id + 2 + 30 * current_type_section, Alloy.Globals.ShedModeDamages["DAMAGES"], e.id);
            Alloy.Globals.ShedModeDamages["DAMAGES"] = newDamageValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnHelp_Click() {
        try {
            current_help_image && Alloy.Globals.createAndOpenControllerExt("ViewHelpView", {
                image: current_help_image,
                title: current_father_title
            });
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesTypeDetails";
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
    $.__views.shedModeDamageDetailsWindow = Ti.UI.createWindow({
        title: L("shed_mode_damage_details_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeDamageDetailsWindow"
    });
    $.__views.shedModeDamageDetailsWindow && $.addTopLevelView($.__views.shedModeDamageDetailsWindow);
    $.__views.scrollViewDamageDetails = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewDamageDetails"
    });
    $.__views.shedModeDamageDetailsWindow.add($.__views.scrollViewDamageDetails);
    $.__views.lblShedModeFormsDamageDetailsFatherTitle = Ti.UI.createLabel({
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblShedModeFormsDamageDetailsFatherTitle"
    });
    $.__views.scrollViewDamageDetails.add($.__views.lblShedModeFormsDamageDetailsFatherTitle);
    $.__views.viewAppComboBoxShedModeFormsDamageDetailsD4D5 = Ti.UI.createView({
        top: 30,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsDamageDetailsD4D5"
    });
    $.__views.scrollViewDamageDetails.add($.__views.viewAppComboBoxShedModeFormsDamageDetailsD4D5);
    $.__views.widgetAppComboBoxShedModeFormsDamageDetailsD4D5 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsDamageDetailsD4D5",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsDamageDetailsD4D5
    });
    $.__views.widgetAppComboBoxShedModeFormsDamageDetailsD4D5.setParent($.__views.viewAppComboBoxShedModeFormsDamageDetailsD4D5);
    $.__views.viewAppComboBoxShedModeFormsDamageDetailsD2D3 = Ti.UI.createView({
        top: 100,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxShedModeFormsDamageDetailsD2D3"
    });
    $.__views.scrollViewDamageDetails.add($.__views.viewAppComboBoxShedModeFormsDamageDetailsD2D3);
    $.__views.widgetAppComboBoxShedModeFormsDamageDetailsD2D3 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsDamageDetailsD2D3",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsDamageDetailsD2D3
    });
    $.__views.widgetAppComboBoxShedModeFormsDamageDetailsD2D3.setParent($.__views.viewAppComboBoxShedModeFormsDamageDetailsD2D3);
    $.__views.viewAppComboBoxShedModeFormsDamageDetailsD0D1 = Ti.UI.createView({
        top: 170,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 200,
        id: "viewAppComboBoxShedModeFormsDamageDetailsD0D1"
    });
    $.__views.scrollViewDamageDetails.add($.__views.viewAppComboBoxShedModeFormsDamageDetailsD0D1);
    $.__views.widgetAppComboBoxShedModeFormsDamageDetailsD0D1 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeFormsDamageDetailsD0D1",
        __parentSymbol: $.__views.viewAppComboBoxShedModeFormsDamageDetailsD0D1
    });
    $.__views.widgetAppComboBoxShedModeFormsDamageDetailsD0D1.setParent($.__views.viewAppComboBoxShedModeFormsDamageDetailsD0D1);
    $.__views.btnShedModeFormsDamageDetailsHelp = Ti.UI.createButton({
        top: 260,
        width: 32,
        title: "",
        height: 32,
        backgroundImage: "/images/help_normal.png",
        backgroundSelectedImage: "/images/help_pressed.png",
        backgroundDisabledImage: "/images/help_disabled.png",
        id: "btnShedModeFormsDamageDetailsHelp"
    });
    $.__views.scrollViewDamageDetails.add($.__views.btnShedModeFormsDamageDetailsHelp);
    OnBtnHelp_Click ? $.__views.btnShedModeFormsDamageDetailsHelp.addEventListener("click", OnBtnHelp_Click) : __defers["$.__views.btnShedModeFormsDamageDetailsHelp!click!OnBtnHelp_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_type_id = args.type_id;
    var current_type_section = args.type_section;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var current_help_image = args.help_image;
    try {
        $.lblShedModeFormsDamageDetailsFatherTitle.setText(current_father_title);
        var damagesValue = Alloy.Globals.ShedModeDamages["DAMAGES"];
        var d4d5ParentView = null;
        var d2d3ParentView = null;
        var d0d1ParentView = null;
        d4d5ParentView = $.viewAppComboBoxShedModeFormsDamageDetailsD4D5;
        d2d3ParentView = $.viewAppComboBoxShedModeFormsDamageDetailsD2D3;
        d0d1ParentView = $.viewAppComboBoxShedModeFormsDamageDetailsD0D1;
        var d4d5Values = {
            0: {
                title: L("generic_null_text_msg")
            },
            1: {
                title: ">2/3"
            },
            2: {
                title: "1/3-2/3"
            },
            3: {
                title: "<1/3"
            }
        };
        $.widgetAppComboBoxShedModeFormsDamageDetailsD4D5.init(L("generic_d4_d5_text_msg"), d4d5Values, OnD4D5_Change, null, d4d5ParentView);
        $.widgetAppComboBoxShedModeFormsDamageDetailsD4D5.enabled(view_enabled);
        var d2d3Values = {
            0: {
                title: L("generic_null_text_msg")
            },
            1: {
                title: ">2/3"
            },
            2: {
                title: "1/3-2/3"
            },
            3: {
                title: "<1/3"
            }
        };
        $.widgetAppComboBoxShedModeFormsDamageDetailsD2D3.init(L("generic_d2_d3_text_msg"), d2d3Values, OnD2D3_Change, null, d2d3ParentView);
        $.widgetAppComboBoxShedModeFormsDamageDetailsD2D3.enabled(view_enabled);
        var d0d1Values = {
            0: {
                title: L("generic_null_text_msg")
            },
            1: {
                title: ">2/3"
            },
            2: {
                title: "1/3-2/3"
            },
            3: {
                title: "<1/3"
            }
        };
        $.widgetAppComboBoxShedModeFormsDamageDetailsD0D1.init(L("generic_d0_d1_text_msg"), d0d1Values, OnD0D1_Change, null, d0d1ParentView);
        $.widgetAppComboBoxShedModeFormsDamageDetailsD0D1.enabled(view_enabled);
        if (damagesValue) {
            $.widgetAppComboBoxShedModeFormsDamageDetailsD4D5.set_selected_index(damagesValue.charAt(3 * current_type_id + 30 * current_type_section));
            $.widgetAppComboBoxShedModeFormsDamageDetailsD2D3.set_selected_index(damagesValue.charAt(3 * current_type_id + 1 + 30 * current_type_section));
            $.widgetAppComboBoxShedModeFormsDamageDetailsD0D1.set_selected_index(damagesValue.charAt(3 * current_type_id + 2 + 30 * current_type_section));
        }
        current_help_image || ($.btnShedModeFormsDamageDetailsHelp.visible = false);
        $.shedModeDamageDetailsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btnShedModeFormsDamageDetailsHelp!click!OnBtnHelp_Click"] && $.__views.btnShedModeFormsDamageDetailsHelp.addEventListener("click", OnBtnHelp_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;