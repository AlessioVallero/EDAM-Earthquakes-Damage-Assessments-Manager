function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTopic_Change() {
        Alloy.Globals.AeDESModeSectionNine["TOPIC"] = $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.get_text_value();
    }
    function OnOtherComments_Change() {
        Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"] = $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.get_text_value();
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionNineView";
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
    $.__views.aedesModeFormsSectionNineWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_nine_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeFormsSectionNineWindow"
    });
    $.__views.aedesModeFormsSectionNineWindow && $.addTopLevelView($.__views.aedesModeFormsSectionNineWindow);
    $.__views.scrollViewSectionNine = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionNine"
    });
    $.__views.aedesModeFormsSectionNineWindow.add($.__views.scrollViewSectionNine);
    $.__views.viewAppTextFieldAeDESModeFormsSectionNineTopic = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionNineTopic"
    });
    $.__views.scrollViewSectionNine.add($.__views.viewAppTextFieldAeDESModeFormsSectionNineTopic);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionNineTopic = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionNineTopic",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionNineTopic
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionNineTopic.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionNineTopic);
    $.__views.viewAppTextAreaAeDESModeFormsSectionNineOtherComments = Ti.UI.createView({
        top: 70,
        height: 380,
        width: "90%",
        id: "viewAppTextAreaAeDESModeFormsSectionNineOtherComments"
    });
    $.__views.scrollViewSectionNine.add($.__views.viewAppTextAreaAeDESModeFormsSectionNineOtherComments);
    $.__views.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments = Alloy.createWidget("com.diseg.AppTextArea", "widget", {
        id: "widgetAppTextAreaAeDESModeFormsSectionNineOtherComments",
        __parentSymbol: $.__views.viewAppTextAreaAeDESModeFormsSectionNineOtherComments
    });
    $.__views.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.setParent($.__views.viewAppTextAreaAeDESModeFormsSectionNineOtherComments);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 460,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionNine.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.init(L("generic_topic_txt_hint"), OnTopic_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.set_text_value(Alloy.Globals.AeDESModeSectionNine["TOPIC"]);
        $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.enabled(view_enabled);
        $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.init(L("generic_other_comments_txt_hint"), OnOtherComments_Change);
        $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.set_text_value(Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"]);
        $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.enabled(view_enabled);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.aedesModeFormsSectionNineWindow, [ $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.get_text_field(), $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.get_text_area() ]);
        $.aedesModeFormsSectionNineWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;