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
            var newDamageValue = Alloy.Globals.replaceCharAt(3 * current_type_id, Alloy.Globals.AeDESModeSectionFour["DAMAGES"], e.id);
            Alloy.Globals.AeDESModeSectionFour["DAMAGES"] = newDamageValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnD2D3_Change(e) {
        try {
            var newDamageValue = Alloy.Globals.replaceCharAt(3 * current_type_id + 1, Alloy.Globals.AeDESModeSectionFour["DAMAGES"], e.id);
            Alloy.Globals.AeDESModeSectionFour["DAMAGES"] = newDamageValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnD0D1_Change(e) {
        try {
            var newDamageValue = Alloy.Globals.replaceCharAt(3 * current_type_id + 2, Alloy.Globals.AeDESModeSectionFour["DAMAGES"], e.id);
            Alloy.Globals.AeDESModeSectionFour["DAMAGES"] = newDamageValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionFourDamages";
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
    $.__views.aedesModeSectionFourDamagesWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_four_damages_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionFourDamagesWindow"
    });
    $.__views.aedesModeSectionFourDamagesWindow && $.addTopLevelView($.__views.aedesModeSectionFourDamagesWindow);
    $.__views.scrollViewSectionFourDamages = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewSectionFourDamages"
    });
    $.__views.aedesModeSectionFourDamagesWindow.add($.__views.scrollViewSectionFourDamages);
    $.__views.lblAeDESModeFormsSectionFourDamage = Ti.UI.createLabel({
        text: L("generic_damage_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionFourDamage"
    });
    $.__views.scrollViewSectionFourDamages.add($.__views.lblAeDESModeFormsSectionFourDamage);
    $.__views.lblAeDESModeFormsSectionFourDamageFatherTitle = Ti.UI.createLabel({
        top: 30,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionFourDamageFatherTitle"
    });
    $.__views.scrollViewSectionFourDamages.add($.__views.lblAeDESModeFormsSectionFourDamageFatherTitle);
    $.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD4D5 = Ti.UI.createView({
        top: 60,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionFourDamagesD4D5"
    });
    $.__views.scrollViewSectionFourDamages.add($.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD4D5);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD4D5
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD4D5);
    $.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD2D3 = Ti.UI.createView({
        top: 130,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionFourDamagesD2D3"
    });
    $.__views.scrollViewSectionFourDamages.add($.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD2D3);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD2D3
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD2D3);
    $.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD0D1 = Ti.UI.createView({
        top: 200,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 200,
        id: "viewAppComboBoxAeDESModeFormsSectionFourDamagesD0D1"
    });
    $.__views.scrollViewSectionFourDamages.add($.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD0D1);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD0D1
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionFourDamagesD0D1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_type_id = args.type_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.lblAeDESModeFormsSectionFourDamageFatherTitle.setText(current_father_title);
        var damagesValue = Alloy.Globals.AeDESModeSectionFour["DAMAGES"];
        var d4d5ParentView = null;
        var d2d3ParentView = null;
        var d0d1ParentView = null;
        d4d5ParentView = $.viewAppComboBoxAeDESModeFormsSectionFourDamagesD4D5;
        d2d3ParentView = $.viewAppComboBoxAeDESModeFormsSectionFourDamagesD2D3;
        d0d1ParentView = $.viewAppComboBoxAeDESModeFormsSectionFourDamagesD0D1;
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
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5.init(L("generic_d4_d5_text_msg"), d4d5Values, OnD4D5_Change, null, d4d5ParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5.enabled(view_enabled);
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
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3.init(L("generic_d2_d3_text_msg"), d2d3Values, OnD2D3_Change, null, d2d3ParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3.enabled(view_enabled);
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
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1.init(L("generic_d0_d1_text_msg"), d0d1Values, OnD0D1_Change, null, d0d1ParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1.enabled(view_enabled);
        if (damagesValue) {
            $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5.set_selected_index(damagesValue.charAt(3 * current_type_id));
            $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3.set_selected_index(damagesValue.charAt(3 * current_type_id + 1));
            $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1.set_selected_index(damagesValue.charAt(3 * current_type_id + 2));
        }
        $.aedesModeSectionFourDamagesWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;