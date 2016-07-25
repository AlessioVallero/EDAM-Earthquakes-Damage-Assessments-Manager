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
        bIsWorkInProgress || Back();
    }
    function Back() {
        try {
            controls = null;
            $.helpWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewHelp_Click(e) {
        try {
            bCanClickOnTableView && BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                bIsWorkInProgress = true;
                var currentLocale = "";
                currentLocale = "es" == Ti.Locale.currentLanguage ? "es" : "it" == Ti.Locale.currentLanguage ? "it" : "en";
                var current_pdf_native_path = "";
                var current_pdf_name = "";
                switch (e.index) {
                  case 0:
                    current_pdf_native_path = "http://www.edam.resiltronics.org/Manuals/EDAM_EERI_LFE_mobile_" + currentLocale + ".pdf";
                    current_pdf_name = "EDAM_EERI_LFE_mobile_" + currentLocale + ".pdf";
                    break;

                  case 1:
                    current_pdf_native_path = "http://www.edam.resiltronics.org/Manuals/EDAM_ATC-20_Nepal_mobile_" + currentLocale + ".pdf";
                    current_pdf_name = "EDAM_ATC-20_Nepal_mobile_" + currentLocale + ".pdf";
                }
                var file = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), current_pdf_name);
                if (file.exists()) {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: L("generic_help_download_new_version_title"),
                        message: L("help_download_new_version_confirm_msg"),
                        buttonNames: [ L("generic_download_again_msg"), L("generic_use_this_version_msg") ],
                        cancel: 1
                    });
                    alertDialog.addEventListener("click", function(event_alert_download) {
                        if (0 == event_alert_download.index) {
                            file.deleteFile();
                            DownloadHelpInstructionManual(current_pdf_native_path, file);
                        } else 1 == event_alert_download.index && ViewPDF(file);
                    });
                    alertDialog.show();
                } else DownloadHelpInstructionManual(current_pdf_native_path, file);
                bRet = true;
                return bRet;
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function DownloadHelpInstructionManual(current_pdf_url, local_file) {
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else {
            var client = Ti.Network.createHTTPClient({
                onload: function() {
                    local_file.write(this.responseData);
                    ViewPDF(local_file);
                },
                onerror: function() {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    alert(L("manual_not_available_msg"));
                }
            });
            client.open("GET", current_pdf_url);
            client.send();
        }
    }
    function ViewPDF(local_file) {
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            type: "application/pdf",
            data: local_file.nativePath
        });
        try {
            $.helpWindow.getActivity().startActivityForResult(intent, function(event) {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                event.error && alert(L("manual_not_available_msg"));
            });
        } catch (exception) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("manual_not_available_msg"));
        }
    }
    function EndAsyncBusyAction_CallBack() {
        bIsWorkInProgress = false;
        bCanClickOnTableView = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "HelpView";
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
    $.__views.helpWindow = Ti.UI.createWindow({
        title: L("help_view_title"),
        backgroundColor: "#ffffcc",
        id: "helpWindow"
    });
    $.__views.helpWindow && $.addTopLevelView($.__views.helpWindow);
    OnAndroidBackButton_Click ? $.__views.helpWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.helpWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.helpWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.helpWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.helpWindow.add($.__views.activity_indicator);
    var __alloyId59 = [];
    $.__views.tableViewHelpRowEERILFE = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewHelpRowEERILFE"
    });
    __alloyId59.push($.__views.tableViewHelpRowEERILFE);
    $.__views.imgHelpRowEERILFE = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/eeri_lfe_forms.png",
        id: "imgHelpRowEERILFE"
    });
    $.__views.tableViewHelpRowEERILFE.add($.__views.imgHelpRowEERILFE);
    $.__views.lblHelpRowEERILFE = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("eeri_lfe_row_title"),
        color: "#000",
        id: "lblHelpRowEERILFE"
    });
    $.__views.tableViewHelpRowEERILFE.add($.__views.lblHelpRowEERILFE);
    $.__views.tableViewHelpRowATC20Nepal = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewHelpRowATC20Nepal"
    });
    __alloyId59.push($.__views.tableViewHelpRowATC20Nepal);
    $.__views.imgHelpRowATC20Nepal = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/nepal_forms.png",
        id: "imgHelpRowATC20Nepal"
    });
    $.__views.tableViewHelpRowATC20Nepal.add($.__views.imgHelpRowATC20Nepal);
    $.__views.lblHelpRowATC20Nepal = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("atc20_nepal_row_title"),
        color: "#000",
        id: "lblHelpRowATC20Nepal"
    });
    $.__views.tableViewHelpRowATC20Nepal.add($.__views.lblHelpRowATC20Nepal);
    $.__views.tableViewHelp = Ti.UI.createTableView({
        top: 10,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        data: __alloyId59,
        id: "tableViewHelp"
    });
    $.__views.helpWindow.add($.__views.tableViewHelp);
    OnTableViewHelp_Click ? $.__views.tableViewHelp.addEventListener("click", OnTableViewHelp_Click) : __defers["$.__views.tableViewHelp!click!OnTableViewHelp_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    controls.push($.tableViewHelp);
    var bIsWorkInProgress = false;
    var bCanClickOnTableView = true;
    try {
        $.helpWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.helpWindow!android:back!OnAndroidBackButton_Click"] && $.__views.helpWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.helpWindow!androidback!OnAndroidBackButton_Click"] && $.__views.helpWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewHelp!click!OnTableViewHelp_Click"] && $.__views.tableViewHelp.addEventListener("click", OnTableViewHelp_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;