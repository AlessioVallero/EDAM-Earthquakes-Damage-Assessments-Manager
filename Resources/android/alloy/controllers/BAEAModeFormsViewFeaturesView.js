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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "baea_mode:view_features_with_login");
            $.baeaModeViewFeaturesWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function ManageMaps() {
        Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "auth:done", ManageMaps);
        Ti.App.fireEvent("baea_mode:view_features_with_login", {
            auth_done: true
        });
        try {
            var viewUsersLocationsTitle = "";
            switch (current_maps_type) {
              case 0:
                viewUsersLocationsTitle = L("generic_past_hour_text_msg");
                break;

              case 1:
                viewUsersLocationsTitle = L("generic_past_day_text_msg");
                break;

              case 2:
                viewUsersLocationsTitle = L("generic_past_week_text_msg");
                break;

              case 3:
                viewUsersLocationsTitle = L("generic_past_month_text_msg");
                break;

              case 4:
                viewUsersLocationsTitle = L("generic_all_text_msg");
            }
            var loader = Titanium.Network.createHTTPClient();
            loader.validatesSecureCertificate = false;
            loader.onload = function() {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                var error_occurred = false;
                var json = this.responseText;
                var response = JSON.parse(json);
                if (200 == loader.status) if (true == response.OK) if (response.USERS_LOCATIONS && response.USERS_LOCATIONS.length > 0) Alloy.Globals.createAndOpenControllerExt("ViewUsersLocations", {
                    users_coordinates: response.USERS_LOCATIONS,
                    mode: "BAEA",
                    title: viewUsersLocationsTitle
                }); else {
                    var dialog = Ti.UI.createAlertDialog({
                        message: L("no_observations_available_msg"),
                        ok: L("generic_ok_msg"),
                        title: L("generic_info_title")
                    });
                    dialog.show();
                } else error_occurred = true; else error_occurred = true;
                if (error_occurred) switch (response.ErrorType) {
                  case "ConnectionError":
                    Alloy.Globals.LogMessage(L("generic_connection_error_err_msg"));
                    break;

                  case "InvalidUsername":
                    Alloy.Globals.LogMessage(L("generic_invalid_user_err_msg"));
                    break;

                  case "UnexpectedError":
                    Alloy.Globals.LogMessage(L("generic_unexpected_error_err_msg"));
                }
            };
            loader.onerror = function(event) {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + event.error);
            };
            var params = {
                key: "EDAM",
                SID: Alloy.Globals.SessionId,
                TYPE: current_maps_type.toString(),
                ALL_USERS: "1" == $.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations.get_value() ? "false" : "true"
            };
            loader.timeout = Alloy.Globals.ViewUsersLocationsTimeoutMillisecs;
            loader.open("POST", "https://www.edam.resiltronics.org/LoadObservations.php");
            loader.send(params);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        }
    }
    function Maps(need_authentication, type) {
        try {
            need_authentication && Ti.App.fireEvent("baea_mode:view_features_with_login", {
                auth_done: false
            });
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                current_maps_type = type;
                if (need_authentication) {
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", ManageMaps);
                    Alloy.Globals.createAndOpenControllerExt("UserAuthenticationView");
                } else ManageMaps();
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsViewMaps_Click(e) {
        try {
            var bContinue = false;
            if (bCanClickOnTableView) {
                if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert(L("generic_no_network_msg")); else {
                    var isGooglePlayServicesAvailable = Alloy.Globals.Map.isGooglePlayServicesAvailable();
                    switch (isGooglePlayServicesAvailable) {
                      case Alloy.Globals.Map.SUCCESS:
                        bContinue = true;
                        break;

                      case Alloy.Globals.Map.SERVICE_MISSING:
                        Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_missing_msg"));
                        break;

                      case Alloy.Globals.Map.SERVICE_VERSION_UPDATE_REQUIRED:
                        Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_out_of_date_msg"));
                        break;

                      case Alloy.Globals.Map.SERVICE_DISABLED:
                        Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_disabled_msg"));
                        break;

                      case Alloy.Globals.Map.SERVICE_INVALID:
                        Alloy.Globals.AlertUserAndLogAsync(L("google_play_service_cannot_be_authenticated_msg"));
                        break;

                      default:
                        Alloy.Globals.AlertUserAndLogAsync(L("generic_unexpected_error_err_msg"));
                    }
                }
                bContinue && BeginAsyncBusyAction($.activity_indicator, controls, function() {
                    var bRet = false;
                    bCanClickOnTableView = false;
                    bIsWorkInProgress = true;
                    if (Alloy.Globals.ExistSession()) {
                        var loader = Titanium.Network.createHTTPClient();
                        loader.validatesSecureCertificate = false;
                        loader.onload = function() {
                            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                            Maps("Expired" == this.responseText, e.index);
                        };
                        loader.onerror = function(e) {
                            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                        };
                        var params = {
                            key: "EDAM",
                            SID: Alloy.Globals.SessionId,
                            ECHO_ENABLED: true
                        };
                        loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs;
                        loader.open("POST", "https://www.edam.resiltronics.org/Security/Sessione_Controllo.php");
                        loader.send(params);
                    } else {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Maps(true, e.index);
                    }
                    return bRet;
                }, EndAsyncBusyAction_CallBack);
            }
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            bCanClickOnTableView = true;
            bIsWorkInProgress = false;
        }
    }
    function ManageDownload() {
        Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "auth:done", ManageDownload);
        Ti.App.fireEvent("baea_mode:view_features_with_login", {
            auth_done: true
        });
        try {
            var fileExtension = "";
            var emailSubject = "";
            var emailMessageBody = "";
            var httpAddress = "";
            switch (current_download_type) {
              case 0:
                fileExtension = ".csv";
                emailSubject = L("send_export_csv_dlg_subject");
                emailMessageBody = L("generic_export_csv_your_export_text_msg");
                httpAddress = "https://www.edam.resiltronics.org/BAEAExportCSV.php";
                break;

              case 1:
                fileExtension = ".kml";
                emailSubject = L("send_google_earth_past_month_dlg_subject");
                emailMessageBody = L("generic_google_earth_past_month_your_kml_file_text_msg");
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGoogleEarth.php";
                break;

              case 2:
                fileExtension = ".kml";
                emailSubject = L("send_google_earth_all_dlg_subject");
                emailMessageBody = L("generic_google_earth_all_your_kml_file_text_msg");
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGoogleEarth.php";
                break;

              case 3:
                fileExtension = ".json";
                emailSubject = L("send_geojson_past_month_dlg_subject");
                emailMessageBody = L("generic_geojson_past_month_your_geojson_file_text_msg");
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGeoJSON.php";
                break;

              case 4:
                fileExtension = ".json";
                emailSubject = L("send_geojson_all_dlg_subject");
                emailMessageBody = L("generic_geojson_all_your_geojson_file_text_msg");
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGeoJSON.php";
            }
            var loader = Titanium.Network.createHTTPClient();
            loader.validatesSecureCertificate = false;
            loader.onload = function() {
                if (this.responseText && "ERROR_" != this.responseText.substring(0, 6)) {
                    var fileDownloaded = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), "fieldnotes" + fileExtension);
                    fileDownloaded.exists() && fileDownloaded.deleteFile();
                    fileDownloaded.write(0 == current_download_type ? this.responseData : this.responseText);
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    var emailDialog = Ti.UI.createEmailDialog();
                    if (emailDialog.isSupported()) {
                        emailDialog.subject = emailSubject;
                        emailDialog.addAttachment(fileDownloaded);
                        emailDialog.messageBody = emailMessageBody;
                        emailDialog.open();
                    } else alert(L("no_email_client_configured_msg"));
                } else {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    switch (this.responseText) {
                      case "ERROR_CODE_1":
                        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg"));
                        break;

                      case "ERROR_CODE_2":
                        Alloy.Globals.AlertUserAndLogAsync(L("generic_expired_err_msg"));
                        break;

                      case "ERROR_CODE_3":
                        Alloy.Globals.AlertUserAndLogAsync(L("generic_connection_error_err_msg"));
                        break;

                      case "ERROR_CODE_4":
                        Alloy.Globals.AlertUserAndLogAsync(L("generic_invalid_user_err_msg"));
                    }
                }
            };
            loader.onerror = function(e) {
                EndAsyncBusyAction($.activity_indicator, controls);
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
            };
            var params = {
                key: "EDAM",
                SID: Alloy.Globals.SessionId,
                TYPE: current_download_type.toString(),
                ALL_USERS: "1" == $.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations.get_value() ? "false" : "true"
            };
            loader.timeout = Alloy.Globals.BAEADownloadTimeoutMillisecs;
            loader.open("POST", httpAddress);
            loader.send(params);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        }
    }
    function Download(need_authentication, type) {
        try {
            need_authentication && Ti.App.fireEvent("baea_mode:view_features_with_login", {
                auth_done: false
            });
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                current_download_type = type;
                if (need_authentication) {
                    Alloy.Globals.ProtectedAddEventListener(Ti.App, "auth:done", ManageDownload);
                    Alloy.Globals.createAndOpenControllerExt("UserAuthenticationView");
                } else ManageDownload();
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsViewFeaturesDownloads_Click(e) {
        try {
            bCanClickOnTableView && (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                bCanClickOnTableView = false;
                bIsWorkInProgress = true;
                if (Alloy.Globals.ExistSession()) {
                    var loader = Titanium.Network.createHTTPClient();
                    loader.validatesSecureCertificate = false;
                    loader.onload = function() {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Download("Expired" == this.responseText, e.index);
                    };
                    loader.onerror = function(e) {
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + e.error);
                    };
                    var params = {
                        key: "EDAM",
                        SID: Alloy.Globals.SessionId,
                        ECHO_ENABLED: true
                    };
                    loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs;
                    loader.open("POST", "https://www.edam.resiltronics.org/Security/Sessione_Controllo.php");
                    loader.send(params);
                } else {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    Download(true, e.index);
                }
                return bRet;
            }, EndAsyncBusyAction_CallBack));
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            bCanClickOnTableView = true;
            bIsWorkInProgress = false;
        }
    }
    function EndAsyncBusyAction_CallBack() {
        bCanClickOnTableView = true;
        bIsWorkInProgress = false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsViewFeaturesView";
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
    $.__views.baeaModeViewFeaturesWindow = Ti.UI.createWindow({
        title: L("baea_mode_view_features_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeViewFeaturesWindow"
    });
    $.__views.baeaModeViewFeaturesWindow && $.addTopLevelView($.__views.baeaModeViewFeaturesWindow);
    OnAndroidBackButton_Click ? $.__views.baeaModeViewFeaturesWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeViewFeaturesWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.baeaModeViewFeaturesWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeViewFeaturesWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.baeaModeViewFeaturesWindow.add($.__views.activity_indicator);
    $.__views.scrollViewViewFeatures = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewViewFeatures"
    });
    $.__views.baeaModeViewFeaturesWindow.add($.__views.scrollViewViewFeatures);
    $.__views.lblBAEAModeFormsViewFeaturesDescription = Ti.UI.createLabel({
        text: L("view_features_description_text_msg"),
        top: 0,
        width: 290,
        height: 60,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblBAEAModeFormsViewFeaturesDescription"
    });
    $.__views.scrollViewViewFeatures.add($.__views.lblBAEAModeFormsViewFeaturesDescription);
    $.__views.viewAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations"
    });
    $.__views.scrollViewViewFeatures.add($.__views.viewAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations);
    $.__views.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations.setParent($.__views.viewAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations);
    var __alloyId57 = [];
    $.__views.tableViewBAEAModeFormsViewMapsRowPastHour = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewMapsRowPastHour"
    });
    __alloyId57.push($.__views.tableViewBAEAModeFormsViewMapsRowPastHour);
    $.__views.lblBAEAModeFormsViewMapsRowPastHour = Ti.UI.createLabel({
        text: L("generic_past_hour_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewMapsRowPastHour"
    });
    $.__views.tableViewBAEAModeFormsViewMapsRowPastHour.add($.__views.lblBAEAModeFormsViewMapsRowPastHour);
    $.__views.tableViewBAEAModeFormsViewMapsRowPastDay = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewMapsRowPastDay"
    });
    __alloyId57.push($.__views.tableViewBAEAModeFormsViewMapsRowPastDay);
    $.__views.lblBAEAModeFormsViewMapsRowPastDay = Ti.UI.createLabel({
        text: L("generic_past_day_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewMapsRowPastDay"
    });
    $.__views.tableViewBAEAModeFormsViewMapsRowPastDay.add($.__views.lblBAEAModeFormsViewMapsRowPastDay);
    $.__views.tableViewBAEAModeFormsViewMapsRowWeek = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewMapsRowWeek"
    });
    __alloyId57.push($.__views.tableViewBAEAModeFormsViewMapsRowWeek);
    $.__views.lblBAEAModeFormsViewMapsRowWeek = Ti.UI.createLabel({
        text: L("generic_past_week_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewMapsRowWeek"
    });
    $.__views.tableViewBAEAModeFormsViewMapsRowWeek.add($.__views.lblBAEAModeFormsViewMapsRowWeek);
    $.__views.tableViewBAEAModeFormsViewMapsRowPastMonth = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewMapsRowPastMonth"
    });
    __alloyId57.push($.__views.tableViewBAEAModeFormsViewMapsRowPastMonth);
    $.__views.lblBAEAModeFormsViewMapsRowPastMonth = Ti.UI.createLabel({
        text: L("generic_past_month_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewMapsRowPastMonth"
    });
    $.__views.tableViewBAEAModeFormsViewMapsRowPastMonth.add($.__views.lblBAEAModeFormsViewMapsRowPastMonth);
    $.__views.tableViewBAEAModeFormsViewMapsRowAll = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewMapsRowAll"
    });
    __alloyId57.push($.__views.tableViewBAEAModeFormsViewMapsRowAll);
    $.__views.lblBAEAModeFormsViewMapsRowAll = Ti.UI.createLabel({
        text: L("generic_all_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewMapsRowAll"
    });
    $.__views.tableViewBAEAModeFormsViewMapsRowAll.add($.__views.lblBAEAModeFormsViewMapsRowAll);
    $.__views.tableViewBAEAModeFormsViewMaps = Ti.UI.createTableView({
        top: 130,
        backgroundColor: "#ffffff",
        height: 250,
        width: Ti.UI.FILL,
        data: __alloyId57,
        id: "tableViewBAEAModeFormsViewMaps"
    });
    $.__views.scrollViewViewFeatures.add($.__views.tableViewBAEAModeFormsViewMaps);
    OnTableViewBAEAModeFormsViewMaps_Click ? $.__views.tableViewBAEAModeFormsViewMaps.addEventListener("click", OnTableViewBAEAModeFormsViewMaps_Click) : __defers["$.__views.tableViewBAEAModeFormsViewMaps!click!OnTableViewBAEAModeFormsViewMaps_Click"] = true;
    $.__views.lblBAEAModeFormsViewFeaturesDownloads = Ti.UI.createLabel({
        text: L("generic_downloads_text_msg"),
        top: 400,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblBAEAModeFormsViewFeaturesDownloads"
    });
    $.__views.scrollViewViewFeatures.add($.__views.lblBAEAModeFormsViewFeaturesDownloads);
    var __alloyId58 = [];
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowExportCSV = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewFeaturesDownloadsRowExportCSV"
    });
    __alloyId58.push($.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowExportCSV);
    $.__views.lblBAEAModeFormsViewFeaturesDownloadsRowExportCSV = Ti.UI.createLabel({
        text: L("baea_mode_export_csv"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewFeaturesDownloadsRowExportCSV"
    });
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowExportCSV.add($.__views.lblBAEAModeFormsViewFeaturesDownloadsRowExportCSV);
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthPastMonth = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthPastMonth"
    });
    __alloyId58.push($.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthPastMonth);
    $.__views.lblBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthPastMonth = Ti.UI.createLabel({
        text: L("generic_google_earth_past_month_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthPastMonth"
    });
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthPastMonth.add($.__views.lblBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthPastMonth);
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthAll = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthAll"
    });
    __alloyId58.push($.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthAll);
    $.__views.lblBAEAModeFormsViewFeaturesDownloadsRowPastGoogleEarthAll = Ti.UI.createLabel({
        text: L("generic_google_earth_all_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewFeaturesDownloadsRowPastGoogleEarthAll"
    });
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGoogleEarthAll.add($.__views.lblBAEAModeFormsViewFeaturesDownloadsRowPastGoogleEarthAll);
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONPastMonth = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONPastMonth"
    });
    __alloyId58.push($.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONPastMonth);
    $.__views.lblBAEAModeFormsViewFeaturesDownloadsRowGeoJSONPastMonth = Ti.UI.createLabel({
        text: L("generic_geojson_past_month_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewFeaturesDownloadsRowGeoJSONPastMonth"
    });
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONPastMonth.add($.__views.lblBAEAModeFormsViewFeaturesDownloadsRowGeoJSONPastMonth);
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONAll = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONAll"
    });
    __alloyId58.push($.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONAll);
    $.__views.lblBAEAModeFormsViewFeaturesDownloadsRowGeoJSONAll = Ti.UI.createLabel({
        text: L("generic_geojson_all_text_msg"),
        height: 50,
        color: "#000",
        id: "lblBAEAModeFormsViewFeaturesDownloadsRowGeoJSONAll"
    });
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloadsRowGeoJSONAll.add($.__views.lblBAEAModeFormsViewFeaturesDownloadsRowGeoJSONAll);
    $.__views.tableViewBAEAModeFormsViewFeaturesDownloads = Ti.UI.createTableView({
        top: 430,
        backgroundColor: "#ffffff",
        height: 250,
        width: Ti.UI.FILL,
        bottom: 10,
        data: __alloyId58,
        id: "tableViewBAEAModeFormsViewFeaturesDownloads"
    });
    $.__views.scrollViewViewFeatures.add($.__views.tableViewBAEAModeFormsViewFeaturesDownloads);
    OnTableViewBAEAModeFormsViewFeaturesDownloads_Click ? $.__views.tableViewBAEAModeFormsViewFeaturesDownloads.addEventListener("click", OnTableViewBAEAModeFormsViewFeaturesDownloads_Click) : __defers["$.__views.tableViewBAEAModeFormsViewFeaturesDownloads!click!OnTableViewBAEAModeFormsViewFeaturesDownloads_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    var bIsWorkInProgress = false;
    var bCanClickOnTableView = true;
    var current_maps_type = "0";
    var current_download_type = "0";
    try {
        $.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations.init(L("generic_only_my_observations_text_msg"), "0");
        $.baeaModeViewFeaturesWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.baeaModeViewFeaturesWindow!android:back!OnAndroidBackButton_Click"] && $.__views.baeaModeViewFeaturesWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.baeaModeViewFeaturesWindow!androidback!OnAndroidBackButton_Click"] && $.__views.baeaModeViewFeaturesWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewBAEAModeFormsViewMaps!click!OnTableViewBAEAModeFormsViewMaps_Click"] && $.__views.tableViewBAEAModeFormsViewMaps.addEventListener("click", OnTableViewBAEAModeFormsViewMaps_Click);
    __defers["$.__views.tableViewBAEAModeFormsViewFeaturesDownloads!click!OnTableViewBAEAModeFormsViewFeaturesDownloads_Click"] && $.__views.tableViewBAEAModeFormsViewFeaturesDownloads.addEventListener("click", OnTableViewBAEAModeFormsViewFeaturesDownloads_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;