function BusyAction(activity_indicator, controls, busy_enable_function) {
    var bRet = false;
    if (busy_enable_function) {
        try {
            if (controls) for (var i = 0; i < controls.length; i++) controls[i].enabled = false;
            activity_indicator.show();
            bRet = busy_enable_function();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            activity_indicator.hide();
            if (controls) for (var i = 0; i < controls.length; i++) controls[i].enabled = true;
        }
        return bRet;
    }
}

function BeginAsyncBusyAction(activity_indicator, controls, busy_enable_function, failed_callback) {
    var bRet = false;
    if (busy_enable_function) {
        try {
            if (controls) for (var i = 0; i < controls.length; i++) controls[i].enabled = false;
            activity_indicator.show();
            bRet = busy_enable_function();
        } catch (exception) {
            EndAsyncBusyAction(activity_indicator, controls);
            failed_callback && failed_callback();
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
        return bRet;
    }
}

function EndAsyncBusyAction(activity_indicator, controls, callback) {
    var bRet = false;
    try {
        bRet = true;
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    } finally {
        activity_indicator.hide();
        if (controls) for (var i = 0; i < controls.length; i++) controls[i].enabled = true;
        callback && callback();
    }
    return bRet;
}

function ShareMyPosition() {
    try {
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) Alloy.Globals.LogMessage("Network unavailable while trying to get the current location."); else if (Alloy.Globals.ExistSession()) {
            var bContinue = true;
            if (bContinue) if (Alloy.Globals.isLocationAuthorized()) {
                backgroundTimeout = setTimeout(function() {
                    backgroundTimeout = null;
                }, Alloy.Globals.GeolocationRequestTimeoutMillisecs);
                Alloy.Globals.getLocation({
                    success: UpdateBackgroundPosition
                });
            } else Alloy.Globals.AlertUserAndLogAsync(L("generic_user_not_authorized_to_ask_localization"));
        }
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
}

function UpdateBackgroundPosition(e) {
    Ti.Geolocation.removeEventListener("location", UpdateBackgroundPosition);
    if (!e.success || e.error) return;
    if (e && e.coords) {
        var latitude = e.coords.latitude.toString();
        var longitude = e.coords.longitude.toString();
        var loader = Titanium.Network.createHTTPClient();
        loader.validatesSecureCertificate = false;
        loader.onload = function() {
            var error_occurred = false;
            var json = this.responseText;
            var response = JSON.parse(json);
            200 == loader.status ? true == response.OK || (error_occurred = true) : error_occurred = true;
            if (error_occurred) switch (response.ErrorType) {
              case "Expired":
                Alloy.Globals.ResetSession();
                Alloy.Globals.LogMessage(L("generic_expired_err_msg"));
                break;

              case "ConnectionError":
                Alloy.Globals.LogMessage(L("generic_connection_error_err_msg"));
                break;

              case "InvalidUser":
                Alloy.Globals.LogMessage(L("generic_invalid_user_err_msg"));
                break;

              case "InsertUserLocationFailed":
                Alloy.Globals.LogMessage("Insert of the User Location failed!");
                break;

              case "UnexpectedError":
                Alloy.Globals.LogMessage(L("generic_unexpected_error_err_msg"));
            }
            if (null !== backgroundTimeout) {
                clearTimeout(backgroundTimeout);
                backgroundTimeout = null;
            }
        };
        loader.onerror = function(event) {
            Alloy.Globals.LogMessage(L("generic_exception_msg") + event.error);
            if (null !== backgroundTimeout) {
                clearTimeout(backgroundTimeout);
                backgroundTimeout = null;
            }
        };
        var params = {
            key: "EDAM",
            LATITUDE: latitude,
            LONGITUDE: longitude,
            SID: Alloy.Globals.SessionId,
            UPDATE_SESSION_TIMER: false
        };
        loader.timeout = Alloy.Globals.ShareMyPositionTimeoutMillisecs;
        loader.open("POST", "https://areeweb.polito.it/IRUSAT/UpdateUserLocation.php");
        loader.send(params);
    } else Alloy.Globals.LogMessage("Location coordinates empty!");
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var securely;

var properties;

var properties = Ti.App.Properties;

Alloy.Globals.SessionId = properties.getString("session_id");

Alloy.Globals.SessionUsername = Ti.App.Properties.getString("session_username");

Alloy.Globals.RememberMeUsername = Ti.App.Properties.getString("remember_me_username");

Alloy.Globals.SendFormPreview = Ti.App.Properties.getString("send_form_preview");

Alloy.Globals.SendFormMediaContents = Ti.App.Properties.getString("send_form_media_contents");

Alloy.Globals.RememberMeUsername = Ti.App.Properties.getString("remember_me_username");

Alloy.Globals.RememberMePassword = properties.getString("remember_me_password");

var currentLanguageOnDB;

var locale;

var locale;

Alloy.Collections.UsersResidentsForms = Alloy.createCollection("UsersResidentsForms");

Alloy.Collections.UsersResidentsModePD = Alloy.createCollection("UsersResidentsPD");

Alloy.Collections.AeDESForms = Alloy.createCollection("AeDESForms");

Alloy.Collections.AeDESModePD = Alloy.createCollection("TeamPD");

Alloy.Collections.ShedForms = Alloy.createCollection("ShedForms");

Alloy.Collections.ShedModePD = Alloy.createCollection("ShedPD");

Alloy.Collections.ATC20Forms = Alloy.createCollection("ATC20Forms");

Alloy.Collections.ATC20ModePD = Alloy.createCollection("ATC20PD");

Alloy.Globals.UsersResidentsCurrentSignPath = "";

Alloy.Globals.UsersResidentsCurrentSign = null;

Alloy.Globals.AeDESCurrentSignPath1 = "";

Alloy.Globals.AeDESCurrentSign1 = null;

Alloy.Globals.AeDESCurrentSignPath2 = "";

Alloy.Globals.AeDESCurrentSign2 = null;

Alloy.Globals.AeDESCurrentSignPath3 = "";

Alloy.Globals.AeDESCurrentSign3 = null;

Alloy.Globals.ShedCurrentSignPath1 = "";

Alloy.Globals.ShedCurrentSign1 = null;

Alloy.Globals.ShedCurrentSignPath2 = "";

Alloy.Globals.ShedCurrentSign2 = null;

Alloy.Globals.ShedCurrentSignPath3 = "";

Alloy.Globals.ShedCurrentSign3 = null;

Alloy.Globals.ATC20NZCurrentSignPath = "";

Alloy.Globals.ATC20NZCurrentSign = null;

Alloy.Globals.UsersResidentsModeDetails = new Array();

Alloy.Globals.UsersResidentsModeBuildingPosition = new Array();

Alloy.Globals.UsersResidentsModeBuildingCharacteristics = new Array();

Alloy.Globals.UsersResidentsModeInfrastructure = new Array();

Alloy.Globals.AeDESModeDetails = new Array();

Alloy.Globals.AeDESModeSectionOne = new Array();

Alloy.Globals.AeDESModeSectionTwo = new Array();

Alloy.Globals.AeDESModeSectionThree = new Array();

Alloy.Globals.AeDESModeSectionFour = new Array();

Alloy.Globals.AeDESModeSectionFive = new Array();

Alloy.Globals.AeDESModeSectionSix = new Array();

Alloy.Globals.AeDESModeSectionSeven = new Array();

Alloy.Globals.AeDESModeSectionEight = new Array();

Alloy.Globals.AeDESModeSectionNine = new Array();

Alloy.Globals.ShedModeDetails = new Array();

Alloy.Globals.ShedModeShedPosition = new Array();

Alloy.Globals.ShedModeShedCharacteristics = new Array();

Alloy.Globals.ShedModeInfrastructure = new Array();

Alloy.Globals.ShedModeDamages = new Array();

Alloy.Globals.ShedModeJudgmentOfPracticability = new Array();

Alloy.Globals.ShedModeOtherComments = new Array();

Alloy.Globals.ATC20ModeInspection = new Array();

Alloy.Globals.ATC20ModeBuildingDescription = new Array();

Alloy.Globals.ATC20ModeDetailedEvaluation = new Array();

Alloy.Globals.ATC20ModeDetailedPosting = new Array();

Alloy.Globals.ATC20ModeRapidEvaluation = new Array();

Alloy.Globals.ATC20ModeRapidPosting = new Array();

Alloy.Globals.ATC20ModeFurtherActions = new Array();

Alloy.Globals.CurrentPicsPath = null;

Alloy.Globals.CurrentVideosPath = null;

Alloy.Globals.DamageAssessmentsMakerPics = null;

Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex = 3;

Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex = 4;

Alloy.Globals.LoginRegistrationTimeoutMillisecs = 2e4;

Alloy.Globals.SessioneControlloTimeoutMillisecs = 3e4;

Alloy.Globals.LogoutTimeoutMillisecs = 15e3;

Alloy.Globals.ServerSynchTimeoutMillisecs = 36e5;

Alloy.Globals.SendFormTimeoutMillisecs = 12e5;

Alloy.Globals.GeolocationRequestTimeoutMillisecs = 3e4;

Alloy.Globals.ShareMyPositionTimeoutMillisecs = 2e4;

Alloy.Globals.ViewUsersLocationsTimeoutMillisecs = 6e4;

Alloy.Globals.CreateAndOpenControllerDebounceWaitPeriodMillisecs = 500;

Alloy.Globals.ShareMyPositionLoopPeriodMillisecs = 18e4;

Alloy.Globals.SetSessionId = function(sessionId) {
    properties.setString("session_id", sessionId);
};

Alloy.Globals.SetRememberMePassword = function(rememberMePassword) {
    properties.setString("remember_me_password", rememberMePassword);
};

Alloy.Globals.CurrentLocale = function() {
    var sRet = "";
    sRet = "it" == Ti.Locale.currentLanguage ? "it-IT" : "es" == Ti.Locale.currentLanguage ? "es-ES" : "en-US";
    return sRet;
};

Alloy.Globals.createAndOpenControllerExt = _.debounce(function(controller_name, array_params) {
    var controller = null;
    controller = array_params && _.size(array_params) > 0 ? Alloy.createController(controller_name, array_params) : Alloy.createController(controller_name);
    controller.getView().open();
}, Alloy.Globals.CreateAndOpenControllerDebounceWaitPeriodMillisecs, true);

Alloy.Globals.Map = Titanium.Map;

var events = {};

Alloy.Globals.ProtectedAddEventListener = function(context, eventName, eventHandler) {
    if (events[context] && events[context][eventName] === eventHandler) return;
    events[context] || (events[context] = {});
    if (events[context][eventName] && events[context][eventName] !== eventHandler) {
        context.removeEventListener(eventName, events[context][eventName]);
        events[context][eventName] = null;
    }
    events[context][eventName] = eventHandler;
    context.addEventListener(eventName, eventHandler);
};

Alloy.Globals.ProtectedRemoveEventListener = function(context, eventName, eventHandler) {
    if (events[context] && events[context][eventName] === eventHandler) {
        context.removeEventListener(eventName, eventHandler);
        events[context][eventName] = null;
    }
};

Alloy.Globals.ProtectedCleanUpEventListener = function(context, eventName) {
    if (events[context] && events[context][eventName]) {
        context.removeEventListener(eventName, events[context][eventName]);
        events[context][eventName] = null;
    }
};

Alloy.Globals.ResetSession = function() {
    Alloy.Globals.SessionId = null;
    properties.setString("session_id", "");
    Alloy.Globals.SessionUsername = null;
    Ti.App.Properties.setString("session_username", "");
};

Alloy.Globals.ExistSession = function() {
    var bRet = false;
    Alloy.Globals.SessionId && Alloy.Globals.SessionUsername && (bRet = true);
    return bRet;
};

Alloy.Globals.CurrentAuthenticationInfoTitle = function() {
    var sRet = "";
    sRet = Alloy.Globals.ExistSession() ? L("generic_welcome_online_text_msg") + Alloy.Globals.SessionUsername + "!" : L("generic_welcome_offline_text_msg");
    return sRet;
};

Alloy.Globals.getFileForRead = function(filename) {
    var ret = null;
    try {
        if (Ti.Filesystem.isExternalStoragePresent()) {
            ret = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, filename);
            ret.exists() || (ret = null);
        }
        if (ret) ; else {
            ret = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
            ret.exists() || (ret = null);
        }
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        ret = null;
    }
    return ret;
};

Alloy.Globals.getFileForWrite = function(filename) {
    var ret = null;
    try {
        Ti.Filesystem.isExternalStoragePresent() && (ret = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, filename));
        ret || (ret = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename));
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        ret = null;
    }
    return ret;
};

Alloy.Globals.replaceCharAt = function(index, old_string, new_character) {
    return old_string.substr(0, index) + new_character + old_string.substr(index + 1);
};

Alloy.Globals.LogMessage = function(error_message) {
    var dateNow = new Date().toString();
    var errorsModel = Alloy.createModel("Errors", {
        DATE: dateNow,
        ERR_MSG: error_message
    });
    errorsModel.save();
};

Alloy.Globals.AlertUserAndLogAsync = function(error_message) {
    var dateNow = new Date().toString();
    var errorsModel = Alloy.createModel("Errors", {
        DATE: dateNow,
        ERR_MSG: error_message
    });
    errorsModel.save();
    var alertDialog = Titanium.UI.createAlertDialog({
        title: L("generic_error_title"),
        message: error_message
    });
    alertDialog.show();
};

Alloy.Globals.tableExists = function(dbObj, table) {
    var bRet = false;
    if (dbObj) {
        try {
            var rs = dbObj.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = '" + table + "';");
        } catch (exception) {}
        rs && rs.isValidRow() && 0 != rs.field(0) && (bRet = true);
        rs.close();
    }
    return bRet;
};

Alloy.Globals.isLocationAuthorized = function() {
    var retVal = true;
    if (!Ti.Geolocation.locationServicesEnabled) return false;
    retVal = true;
    return retVal;
};

Alloy.Globals.getHeading = function(_args) {
    Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.showCalibration = true;
    Titanium.Geolocation.headingFilter = 0;
    Ti.Geolocation.addEventListener("heading", _args.success);
};

Alloy.Globals.CalculateMagneticHeading = function(magnetic_heading, dont_reverse_result) {
    var currentHeading = "";
    currentHeading = 90 >= magnetic_heading ? 45 >= magnetic_heading ? "N" : "E" : 180 >= magnetic_heading ? 135 >= magnetic_heading ? "E" : "S" : 270 >= magnetic_heading ? 225 >= magnetic_heading ? "S" : "W" : 315 >= magnetic_heading ? "W" : "N";
    if (dont_reverse_result) ; else switch (currentHeading) {
      case "N":
        currentHeading = "S";
        break;

      case "E":
        currentHeading = "W";
        break;

      case "S":
        currentHeading = "N";
        break;

      case "W":
        currentHeading = "E";
    }
    return currentHeading;
};

Alloy.Globals.getLocation = function(_args) {
    Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;
    Titanium.Geolocation.showCalibration = true;
    Titanium.Geolocation.distanceFilter = 0;
    Ti.Geolocation.addEventListener("location", _args.success);
};

Alloy.Globals.reverseGeocode = function(latitude, longitude, callback) {
    var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + latitude + "," + longitude;
    var addrReq = Titanium.Network.createHTTPClient();
    addrReq.open("GET", addrUrl);
    addrReq.send(null);
    addrReq.onload = function() {
        var response = JSON.parse(this.responseText);
        var formattedResponse = Alloy.Globals.formatReverseGeocodingAnswer(response);
        "OK" == formattedResponse["status"] ? callback && callback(formattedResponse) : alert(L("unable_to_find_the_address_msg"));
    };
};

Alloy.Globals.reverseGeocodeAndUseCamera = function(heading, latitude, longitude, current_activity, reverseGeocodeDone_Callback) {
    var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + latitude + "," + longitude;
    var addrReq = Titanium.Network.createHTTPClient();
    addrReq.open("GET", addrUrl);
    addrReq.onload = function() {
        var response = JSON.parse(this.responseText);
        var formattedResponse = Alloy.Globals.formatReverseGeocodingAnswer(response);
        reverseGeocodeDone_Callback && reverseGeocodeDone_Callback();
        "OK" == formattedResponse["status"] ? current_activity ? Alloy.Globals.MakeVideo(current_activity, heading, formattedResponse["lat"], formattedResponse["lng"], formattedResponse["formatted_address"]) : Alloy.Globals.UseCamera(heading, formattedResponse["lat"], formattedResponse["lng"], formattedResponse["formatted_address"]) : alert(L("unable_to_find_the_address_msg"));
    };
    addrReq.send();
};

Alloy.Globals.formatReverseGeocodingAnswer = function(response) {
    var formattedAnswer = new Array();
    try {
        if ("OK" == response.status) {
            formattedAnswer["street_number"] = "";
            formattedAnswer["route"] = "";
            formattedAnswer["administrative_area_level_1"] = "";
            formattedAnswer["administrative_area_level_2"] = "";
            formattedAnswer["country"] = "";
            formattedAnswer["postal_code"] = "";
            formattedAnswer["lng"] = "";
            formattedAnswer["lat"] = "";
            formattedAnswer["formatted_address"] = "";
            if (response.results && response.results.length > 0) {
                var firstResult = response.results[0];
                if (firstResult.address_components && firstResult.address_components.length > 0) {
                    for (var i = 0; i < firstResult.address_components.length; i++) {
                        var currentElem = firstResult.address_components[i];
                        switch (currentElem.types[0]) {
                          case "street_number":
                            formattedAnswer["street_number"] = currentElem["long_name"];
                            break;

                          case "route":
                            formattedAnswer["route"] = currentElem["long_name"];
                            break;

                          case "locality":
                            formattedAnswer["locality"] = currentElem["long_name"];
                            break;

                          case "administrative_area_level_1":
                            formattedAnswer["administrative_area_level_1"] = currentElem["long_name"];
                            break;

                          case "administrative_area_level_2":
                            formattedAnswer["administrative_area_level_2"] = currentElem["long_name"];
                            break;

                          case "country":
                            formattedAnswer["country"] = currentElem["long_name"];
                            break;

                          case "postal_code":
                            formattedAnswer["postal_code"] = currentElem["long_name"];
                        }
                    }
                    if (firstResult.geometry && firstResult.geometry.location) {
                        formattedAnswer["lng"] = firstResult.geometry.location.lng;
                        formattedAnswer["lat"] = firstResult.geometry.location.lat;
                        firstResult.formatted_address && (formattedAnswer["formatted_address"] = firstResult.formatted_address);
                    }
                }
                formattedAnswer["status"] = "OK";
            }
        } else formattedAnswer["status"] = "KO";
    } catch (exception) {
        formattedAnswer["status"] = "KO";
    }
    return formattedAnswer;
};

Alloy.Globals.UseCamera = function(heading, latitude, longitude, address) {
    Titanium.Media.showCamera({
        success: function(event) {
            Ti.API.debug("Our type was: " + event.mediaType);
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                Alloy.Globals.CurrentPicsPath || (Alloy.Globals.CurrentPicsPath = new Array());
                var media_details;
                var media_details = {
                    media: event.media,
                    heading: heading,
                    latitude: latitude,
                    longitude: longitude,
                    address: address
                };
                Alloy.createController("MediaDamagesDetailsView", {
                    type: "FormPic",
                    media_details: media_details
                }).getView().open();
            } else if (event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) {
                Alloy.Globals.CurrentVideosPath || (Alloy.Globals.CurrentVideosPath = new Array());
                var media_details;
                var media_details = {
                    media: event.media,
                    heading: heading,
                    latitude: latitude,
                    longitude: longitude,
                    address: address
                };
                Alloy.createController("MediaDamagesDetailsView", {
                    type: "FormVideo",
                    media_details: media_details
                }).getView().open();
            } else alert(L("generic_type_not_supported_msg"));
        },
        cancel: function() {},
        error: function(error) {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: L("generic_camera_title"),
                buttonNames: [ L("generic_ok_msg") ]
            });
            alertDialog.setMessage(error.code == Titanium.Media.NO_CAMERA ? L("no_camera_on_this_device_msg") : L("generic_exception_msg") + error.code);
            alertDialog.show();
        },
        saveToPhotoGallery: false,
        mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
    });
};

Alloy.Globals.MakeVideo = function(current_activity, heading, latitude, longitude, address) {
    var intent = Titanium.Android.createIntent({
        action: "android.media.action.VIDEO_CAPTURE"
    });
    current_activity.startActivityForResult(intent, function(e) {
        if (e.error) Ti.UI.createNotification({
            duration: Ti.UI.NOTIFICATION_DURATION_LONG,
            message: "Error " + e.error
        }).show(); else if (e.resultCode == Ti.Android.RESULT_OK) if (e.intent.data) {
            var newFile = Titanium.Filesystem.getFile(Titanium.Filesystem.getTempDirectory(), Ti.Platform.createUUID() + ".3gp");
            newFile.exists && newFile.deleteFile();
            var sourceVideo = Ti.Filesystem.getFile(e.intent.data);
            sourceVideo.copy(newFile.nativePath);
            Alloy.Globals.CurrentVideosPath || (Alloy.Globals.CurrentVideosPath = new Array());
            var media_details = {
                media: newFile.getNativePath(),
                heading: heading,
                latitude: latitude,
                longitude: longitude,
                address: address
            };
            Alloy.createController("MediaDamagesDetailsView", {
                type: "FormVideo",
                media_details: media_details
            }).getView().open();
        } else {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: L("generic_no_video_data_title"),
                buttonNames: [ L("generic_ok_msg") ]
            });
            alertDialog.setMessage(L("no_video_data_msg"));
            alertDialog.show();
        } else if (e.resultCode == Ti.Android.RESULT_CANCELED) Ti.API.trace("User cancelled video capture session"); else {
            Ti.API.error("Could not record video!");
            var alertDialog = Titanium.UI.createAlertDialog({
                title: L("generic_no_video_data_title"),
                buttonNames: [ L("generic_ok_msg") ]
            });
            alertDialog.setMessage(L("generic_video_error_msg"));
            alertDialog.show();
        }
    });
};

var backgroundTimeout = null;

var intervalShareMyPosition = setInterval(ShareMyPosition, Alloy.Globals.ShareMyPositionLoopPeriodMillisecs);

Ti.App.addEventListener("app:paused", function() {
    if (null !== intervalShareMyPosition) {
        clearInterval(intervalShareMyPosition);
        intervalShareMyPosition = null;
    }
});

Ti.App.addEventListener("app:resumed", function() {
    null === intervalShareMyPosition && (intervalShareMyPosition = setInterval(ShareMyPosition, Alloy.Globals.ShareMyPositionLoopPeriodMillisecs));
});

Alloy.createController("index");