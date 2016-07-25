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
        Back();
    }
    function Back() {
        try {
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "da:done");
            $.navigationWindowMediaDamagesDetails.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnHeading_Change(e) {
        current_heading_selected_value = "";
        switch (e.id) {
          case "1":
            current_heading_selected_value = "N";
            break;

          case "2":
            current_heading_selected_value = "S";
            break;

          case "3":
            current_heading_selected_value = "W";
            break;

          case "4":
            current_heading_selected_value = "S";
            break;

          case "5":
            current_heading_selected_value = "R";
            break;

          case "6":
            current_heading_selected_value = "I";
        }
    }
    function OnBtnDone_Click() {
        try {
            current_media_details["heading"] = current_heading_selected_value;
            current_media_details["damages_level"] = $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.get_text_value();
            current_media_details["damages_area"] = $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.get_text_value();
            current_media_details["comment"] = $.widgetAppTextAreaMediaDamagesDetailsComment.get_text_value();
            switch (current_type) {
              case "FormPic":
                Alloy.Globals.CurrentPicsPath.push(current_media_details);
                Back();
                break;

              case "FormVideo":
                Alloy.Globals.CurrentVideosPath.push(current_media_details);
                Back();
                break;

              case "DA":
                var da_elem = current_media_details.da_value;
                var alertDialog = Titanium.UI.createAlertDialog({
                    title: L("generic_da_element_done_title"),
                    message: L("da_element_done_text_msg"),
                    buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                    cancel: 1
                });
                alertDialog.addEventListener("click", function(e) {
                    if (0 == e.index) {
                        Alloy.Globals.DamageAssessmentsMakerPics || (Alloy.Globals.DamageAssessmentsMakerPics = new Array());
                        Alloy.Globals.DamageAssessmentsMakerPics[da_elem] = current_media_details;
                        Ti.App.fireEvent("da:done", {
                            done_propagation_event_enabled: true
                        });
                        Back();
                    }
                });
                alertDialog.show();
            }
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MediaDamagesDetailsView";
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
    $.__views.mediaDamagesDetailsWindow = Ti.UI.createWindow({
        title: L("media_damages_details_view_title"),
        backgroundColor: "#ffffcc",
        id: "mediaDamagesDetailsWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.mediaDamagesDetailsWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewMediaDamagesDetails = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewMediaDamagesDetails"
    });
    $.__views.mediaDamagesDetailsWindow.add($.__views.scrollViewMediaDamagesDetails);
    $.__views.viewAppButtonDone = Ti.UI.createView({
        top: 0,
        width: 60,
        id: "viewAppButtonDone"
    });
    $.__views.scrollViewMediaDamagesDetails.add($.__views.viewAppButtonDone);
    $.__views.widgetAppButtonDone = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonDone",
        __parentSymbol: $.__views.viewAppButtonDone
    });
    $.__views.widgetAppButtonDone.setParent($.__views.viewAppButtonDone);
    $.__views.viewAppComboBoxMediaDamagesDetailsHeading = Ti.UI.createView({
        top: 90,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxMediaDamagesDetailsHeading"
    });
    $.__views.scrollViewMediaDamagesDetails.add($.__views.viewAppComboBoxMediaDamagesDetailsHeading);
    $.__views.widgetAppComboBoxMediaDamagesDetailsHeading = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxMediaDamagesDetailsHeading",
        __parentSymbol: $.__views.viewAppComboBoxMediaDamagesDetailsHeading
    });
    $.__views.widgetAppComboBoxMediaDamagesDetailsHeading.setParent($.__views.viewAppComboBoxMediaDamagesDetailsHeading);
    $.__views.viewAppTextFieldMediaDamagesDetailsDamagesLevel = Ti.UI.createView({
        top: 160,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldMediaDamagesDetailsDamagesLevel"
    });
    $.__views.scrollViewMediaDamagesDetails.add($.__views.viewAppTextFieldMediaDamagesDetailsDamagesLevel);
    $.__views.widgetAppTextFieldMediaDamagesDetailsDamagesLevel = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldMediaDamagesDetailsDamagesLevel",
        __parentSymbol: $.__views.viewAppTextFieldMediaDamagesDetailsDamagesLevel
    });
    $.__views.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.setParent($.__views.viewAppTextFieldMediaDamagesDetailsDamagesLevel);
    $.__views.viewAppTextFieldMediaDamagesDetailsDamagesArea = Ti.UI.createView({
        top: 230,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldMediaDamagesDetailsDamagesArea"
    });
    $.__views.scrollViewMediaDamagesDetails.add($.__views.viewAppTextFieldMediaDamagesDetailsDamagesArea);
    $.__views.widgetAppTextFieldMediaDamagesDetailsDamagesArea = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldMediaDamagesDetailsDamagesArea",
        __parentSymbol: $.__views.viewAppTextFieldMediaDamagesDetailsDamagesArea
    });
    $.__views.widgetAppTextFieldMediaDamagesDetailsDamagesArea.setParent($.__views.viewAppTextFieldMediaDamagesDetailsDamagesArea);
    $.__views.viewAppTextAreaMediaDamagesDetailsComment = Ti.UI.createView({
        top: 300,
        height: 380,
        width: "90%",
        id: "viewAppTextAreaMediaDamagesDetailsComment"
    });
    $.__views.scrollViewMediaDamagesDetails.add($.__views.viewAppTextAreaMediaDamagesDetailsComment);
    $.__views.widgetAppTextAreaMediaDamagesDetailsComment = Alloy.createWidget("com.diseg.AppTextArea", "widget", {
        id: "widgetAppTextAreaMediaDamagesDetailsComment",
        __parentSymbol: $.__views.viewAppTextAreaMediaDamagesDetailsComment
    });
    $.__views.widgetAppTextAreaMediaDamagesDetailsComment.setParent($.__views.viewAppTextAreaMediaDamagesDetailsComment);
    $.__views.navigationWindowMediaDamagesDetails = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.mediaDamagesDetailsWindow,
        id: "navigationWindowMediaDamagesDetails"
    });
    $.__views.navigationWindowMediaDamagesDetails && $.addTopLevelView($.__views.navigationWindowMediaDamagesDetails);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_type = args.type;
    var current_media_details = args.media_details;
    var current_heading_enabled = args.heading_enabled;
    var heading_button_enabled = true;
    "undefined" != typeof current_heading_enabled && (heading_button_enabled = current_heading_enabled);
    var current_heading_selected_value = "";
    try {
        var headingParentView = null;
        var thisView = $.getView();
        headingParentView = thisView;
        var headingValues = {
            0: {
                title: L("generic_heading_not_detected")
            },
            1: {
                title: L("generic_heading_north")
            },
            2: {
                title: L("generic_heading_south")
            },
            3: {
                title: L("generic_heading_west")
            },
            4: {
                title: L("generic_heading_east")
            },
            5: {
                title: L("generic_heading_roof")
            },
            6: {
                title: L("generic_heading_indoor")
            }
        };
        $.widgetAppComboBoxMediaDamagesDetailsHeading.init(L("generic_heading_text_msg"), headingValues, OnHeading_Change, null, headingParentView);
        $.widgetAppComboBoxMediaDamagesDetailsHeading.enabled(heading_button_enabled);
        switch (current_media_details["heading"]) {
          case "N":
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index("1");
            current_heading_selected_value = "N";
            break;

          case "S":
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index("2");
            current_heading_selected_value = "S";
            break;

          case "W":
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index("3");
            current_heading_selected_value = "W";
            break;

          case "E":
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index("4");
            current_heading_selected_value = "E";
            break;

          case "R":
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index("5");
            current_heading_selected_value = "R";
            break;

          case "I":
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index("6");
            current_heading_selected_value = "I";
            break;

          default:
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index("0");
            current_heading_selected_value = "";
        }
        $.widgetAppButtonDone.init("/images/done_normal.png", "/images/done_pressed.png", "/images/done_disabled.png", L("generic_done_btn_title"), OnBtnDone_Click);
        $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.init(L("generic_damages_level_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD, 2, false, "5");
        $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.set_text_value("0");
        $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.init(L("generic_damages_area_txt_hint"), null, Titanium.UI.KEYBOARD_NUMBER_PAD, 3);
        $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.set_text_value("0");
        $.widgetAppTextAreaMediaDamagesDetailsComment.init(L("generic_comment_txt_hint"));
        RegisterHideKeyboard($.mediaDamagesDetailsWindow, [ $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.get_text_field(), $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.get_text_field(), $.widgetAppTextAreaMediaDamagesDetailsComment.get_text_area() ]);
        $.navigationWindowMediaDamagesDetails.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;