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
            controls = null;
            $.navigationWindowHelp.close();
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
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_msg"));
        } else {
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
        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        var docViewer = Ti.UI.iOS.createDocumentViewer({
            url: local_file.nativePath
        });
        docViewer.show({
            animated: true
        });
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
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.helpWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.helpWindow.add($.__views.activity_indicator);
    var __alloyId126 = [];
    $.__views.tableViewHelpRowEERILFE = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewHelpRowEERILFE"
    });
    __alloyId126.push($.__views.tableViewHelpRowEERILFE);
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
    __alloyId126.push($.__views.tableViewHelpRowATC20Nepal);
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
        data: __alloyId126,
        id: "tableViewHelp"
    });
    $.__views.helpWindow.add($.__views.tableViewHelp);
    OnTableViewHelp_Click ? $.__views.tableViewHelp.addEventListener("click", OnTableViewHelp_Click) : __defers["$.__views.tableViewHelp!click!OnTableViewHelp_Click"] = true;
    $.__views.navigationWindowHelp = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.helpWindow,
        id: "navigationWindowHelp"
    });
    $.__views.navigationWindowHelp && $.addTopLevelView($.__views.navigationWindowHelp);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.tableViewHelp);
    var bIsWorkInProgress = false;
    var bCanClickOnTableView = true;
    try {
        $.navigationWindowHelp.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewHelp!click!OnTableViewHelp_Click"] && $.__views.tableViewHelp.addEventListener("click", OnTableViewHelp_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;