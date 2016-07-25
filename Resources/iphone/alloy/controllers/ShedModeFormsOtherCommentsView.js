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
            $.navigationWindowOtherComments.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTopic_Change() {
        Alloy.Globals.ShedModeOtherComments["TOPIC"] = $.widgetAppTextFieldShedModeFormsOtherCommentsTopic.get_text_value();
    }
    function OnOtherComments_Change() {
        Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"] = $.widgetAppTextAreaShedModeFormsOtherCommentsOtherComments.get_text_value();
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsOtherCommentsView";
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
    $.__views.shedModeFormsOtherCommentsWindow = Ti.UI.createWindow({
        title: L("shed_mode_other_comments_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeFormsOtherCommentsWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.shedModeFormsOtherCommentsWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewOtherComments = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewOtherComments"
    });
    $.__views.shedModeFormsOtherCommentsWindow.add($.__views.scrollViewOtherComments);
    $.__views.viewAppTextFieldShedModeFormsOtherCommentsTopic = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsOtherCommentsTopic"
    });
    $.__views.scrollViewOtherComments.add($.__views.viewAppTextFieldShedModeFormsOtherCommentsTopic);
    $.__views.widgetAppTextFieldShedModeFormsOtherCommentsTopic = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsOtherCommentsTopic",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsOtherCommentsTopic
    });
    $.__views.widgetAppTextFieldShedModeFormsOtherCommentsTopic.setParent($.__views.viewAppTextFieldShedModeFormsOtherCommentsTopic);
    $.__views.viewAppTextAreaShedModeFormsOtherCommentsOtherComments = Ti.UI.createView({
        top: 70,
        height: 380,
        width: "90%",
        id: "viewAppTextAreaShedModeFormsOtherCommentsOtherComments"
    });
    $.__views.scrollViewOtherComments.add($.__views.viewAppTextAreaShedModeFormsOtherCommentsOtherComments);
    $.__views.widgetAppTextAreaShedModeFormsOtherCommentsOtherComments = Alloy.createWidget("com.diseg.AppTextArea", "widget", {
        id: "widgetAppTextAreaShedModeFormsOtherCommentsOtherComments",
        __parentSymbol: $.__views.viewAppTextAreaShedModeFormsOtherCommentsOtherComments
    });
    $.__views.widgetAppTextAreaShedModeFormsOtherCommentsOtherComments.setParent($.__views.viewAppTextAreaShedModeFormsOtherCommentsOtherComments);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 460,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewOtherComments.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowOtherComments = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.shedModeFormsOtherCommentsWindow,
        id: "navigationWindowOtherComments"
    });
    $.__views.navigationWindowOtherComments && $.addTopLevelView($.__views.navigationWindowOtherComments);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppTextFieldShedModeFormsOtherCommentsTopic.init(L("generic_topic_txt_hint"), OnTopic_Change);
        $.widgetAppTextFieldShedModeFormsOtherCommentsTopic.set_text_value(Alloy.Globals.ShedModeOtherComments["TOPIC"]);
        $.widgetAppTextFieldShedModeFormsOtherCommentsTopic.enabled(view_enabled);
        $.widgetAppTextAreaShedModeFormsOtherCommentsOtherComments.init(L("generic_other_comments_txt_hint"), OnOtherComments_Change);
        $.widgetAppTextAreaShedModeFormsOtherCommentsOtherComments.set_text_value(Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"]);
        $.widgetAppTextAreaShedModeFormsOtherCommentsOtherComments.enabled(view_enabled);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.shedModeFormsOtherCommentsWindow, [ $.widgetAppTextFieldShedModeFormsOtherCommentsTopic.get_text_field(), $.widgetAppTextAreaShedModeFormsOtherCommentsOtherComments.get_text_area() ]);
        $.navigationWindowOtherComments.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;