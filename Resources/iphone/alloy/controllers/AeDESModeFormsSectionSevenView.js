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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "form:save_from_section");
            $.navigationWindowSectionSeven.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnMorphologySite_Change(e) {
        Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] = e.id;
    }
    function OnSlopesLooming_Change(e) {
        Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] = e.id;
    }
    function OnSubsoil_Change(e) {
        Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"] = e.id;
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionSevenView";
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
    $.__views.aedesModeSectionSevenWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_seven_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionSevenWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.aedesModeSectionSevenWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewSectionSeven = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewSectionSeven"
    });
    $.__views.aedesModeSectionSevenWindow.add($.__views.scrollViewSectionSeven);
    $.__views.viewAppComboBoxAeDESModeFormsSectionSevenMorphologySite = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionSevenMorphologySite"
    });
    $.__views.scrollViewSectionSeven.add($.__views.viewAppComboBoxAeDESModeFormsSectionSevenMorphologySite);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionSevenMorphologySite
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionSevenMorphologySite);
    $.__views.lblAeDESModeFormsSectionSevenFailuresActualOrFeared = Ti.UI.createLabel({
        text: L("generic_failures_actual_or_feared_text_msg"),
        top: 70,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionSevenFailuresActualOrFeared"
    });
    $.__views.scrollViewSectionSeven.add($.__views.lblAeDESModeFormsSectionSevenFailuresActualOrFeared);
    $.__views.viewAppComboBoxAeDESModeFormsSectionSevenSlopesLooming = Ti.UI.createView({
        top: 100,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionSevenSlopesLooming"
    });
    $.__views.scrollViewSectionSeven.add($.__views.viewAppComboBoxAeDESModeFormsSectionSevenSlopesLooming);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionSevenSlopesLooming
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionSevenSlopesLooming);
    $.__views.viewAppComboBoxAeDESModeFormsSectionSevenSubsoil = Ti.UI.createView({
        top: 170,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionSevenSubsoil"
    });
    $.__views.scrollViewSectionSeven.add($.__views.viewAppComboBoxAeDESModeFormsSectionSevenSubsoil);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionSevenSubsoil
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionSevenSubsoil);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 240,
        width: 60,
        height: 80,
        bottom: 130,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionSeven.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowSectionSeven = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.aedesModeSectionSevenWindow,
        id: "navigationWindowSectionSeven"
    });
    $.__views.navigationWindowSectionSeven && $.addTopLevelView($.__views.navigationWindowSectionSeven);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var morphologySiteParentView = null;
        var slopesLoomingParentView = null;
        var subsoilParentView = null;
        var mainView = $.getView();
        morphologySiteParentView = mainView;
        slopesLoomingParentView = mainView;
        subsoilParentView = mainView;
        var morphologySite = {
            0: {
                title: L("generic_morphology_site_plain")
            },
            1: {
                title: L("generic_morphology_site_slight_slope")
            },
            2: {
                title: L("generic_morphology_site_strong_slope")
            },
            3: {
                title: L("generic_morphology_site_crest")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite.init(L("generic_morphology_site_text_msg"), morphologySite, OnMorphologySite_Change, null, morphologySiteParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] && $.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite.set_selected_index(Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"]);
        var slopesLoomingValues = {
            0: {
                title: L("generic_slopes_looming_absent")
            },
            1: {
                title: L("generic_slopes_looming_generated_by_the_earthquake")
            },
            2: {
                title: L("generic_slopes_looming_exacerbated_by_the_earthquake")
            },
            3: {
                title: L("generic_slopes_looming_pre_existing")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming.init(L("generic_slopes_looming_text_msg"), slopesLoomingValues, OnSlopesLooming_Change, null, slopesLoomingParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] && $.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming.set_selected_index(Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"]);
        var subsoilValues = {
            0: {
                title: L("generic_subsoil_absent")
            },
            1: {
                title: L("generic_subsoil_generated_by_the_earthquake")
            },
            2: {
                title: L("generic_subsoil_exacerbated_by_the_earthquake")
            },
            3: {
                title: L("generic_subsoil_pre_existing")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil.init(L("generic_subsoil_text_msg"), subsoilValues, OnSubsoil_Change, null, subsoilParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"] && $.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil.set_selected_index(Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.navigationWindowSectionSeven.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;