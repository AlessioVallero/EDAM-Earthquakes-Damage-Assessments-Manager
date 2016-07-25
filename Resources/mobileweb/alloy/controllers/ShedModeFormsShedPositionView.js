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
            $.shedModeFormsShedPositionWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnLoadPosition_Click() {
        try {
            Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? alert(L("generic_no_network_msg")) : BeginAsyncBusyAction($.activity_indicator, controls, function() {
                bIsWorkInProgress = true;
                if (Alloy.Globals.isLocationAuthorized()) {
                    timeout = setTimeout(function() {
                        timeout = null;
                        EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                        alert(L("geolocation_timeout_occurred_err_msg"));
                    }, Alloy.Globals.GeolocationRequestTimeoutMillisecs);
                    Alloy.Globals.getLocation({
                        success: UpdatePosition
                    });
                } else {
                    EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
                    alert(L("generic_user_not_authorized_to_ask_localization"));
                }
            }, EndAsyncBusyAction_CallBack);
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function EndAsyncBusyAction_CallBack() {
        bIsWorkInProgress = false;
        if (null !== timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }
    function OnLatitude_Change() {
        Alloy.Globals.ShedModeShedPosition["LATITUDE"] = $.widgetAppTextFieldShedModeFormsShedPositionLatitude.get_text_value();
    }
    function OnLongitude_Change() {
        Alloy.Globals.ShedModeShedPosition["LONGITUDE"] = $.widgetAppTextFieldShedModeFormsShedPositionLongitude.get_text_value();
    }
    function OnAltitude_Change() {
        Alloy.Globals.ShedModeShedPosition["ALTITUDE"] = $.widgetAppTextFieldShedModeFormsShedPositionAltitude.get_text_value();
    }
    function UpdatePosition(e) {
        Ti.Geolocation.removeEventListener("location", UpdatePosition);
        if (!e.success || e.error) {
            alert(L("unable_to_get_location_err_msg") + " " + e.error);
            return;
        }
        $.widgetAppTextFieldShedModeFormsShedPositionLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldShedModeFormsShedPositionLongitude.set_text_value(e.coords.longitude);
        $.widgetAppTextFieldShedModeFormsShedPositionAltitude.set_text_value(e.coords.altitude);
        Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            $.widgetAppTextFieldShedModeFormsShedPositionProvince.set_text_value(formattedAnswer["administrative_area_level_2"]);
            OnProvince_Change();
            $.widgetAppTextFieldShedModeFormsShedPositionMunicipality.set_text_value(formattedAnswer["locality"]);
            OnMunicipality_Change();
            $.widgetAppTextFieldShedModeFormsShedPositionPlace.set_text_value(formattedAnswer["administrative_area_level_1"]);
            OnPlace_Change();
            $.widgetAppTextFieldShedModeFormsShedPositionCivicNo.set_text_value(formattedAnswer["postal_code"]);
            OnCivicNo_Change();
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldShedModeFormsShedPositionAddress.set_text_value(address);
            OnAddress_Change();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        }
    }
    function OnProvince_Change() {
        Alloy.Globals.ShedModeShedPosition["PROVINCE"] = $.widgetAppTextFieldShedModeFormsShedPositionProvince.get_text_value();
    }
    function OnMunicipality_Change() {
        Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"] = $.widgetAppTextFieldShedModeFormsShedPositionMunicipality.get_text_value();
    }
    function OnPlace_Change() {
        Alloy.Globals.ShedModeShedPosition["PLACE"] = $.widgetAppTextFieldShedModeFormsShedPositionPlace.get_text_value();
    }
    function OnAddress_Change() {
        Alloy.Globals.ShedModeShedPosition["ADDRESS"] = $.widgetAppTextFieldShedModeFormsShedPositionAddress.get_text_value();
    }
    function OnCivicNo_Change() {
        Alloy.Globals.ShedModeShedPosition["CIVIC_NO"] = $.widgetAppTextFieldShedModeFormsShedPositionCivicNo.get_text_value();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsShedPositionView";
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
    $.__views.shedModeFormsShedPositionWindow = Ti.UI.createWindow({
        title: L("shed_mode_shed_position_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeFormsShedPositionWindow"
    });
    $.__views.shedModeFormsShedPositionWindow && $.addTopLevelView($.__views.shedModeFormsShedPositionWindow);
    OnAndroidBackButton_Click ? $.__views.shedModeFormsShedPositionWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.shedModeFormsShedPositionWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.shedModeFormsShedPositionWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.shedModeFormsShedPositionWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.shedModeFormsShedPositionWindow.add($.__views.activity_indicator);
    $.__views.scrollViewShedPosition = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewShedPosition"
    });
    $.__views.shedModeFormsShedPositionWindow.add($.__views.scrollViewShedPosition);
    $.__views.btnShedModeFormsShedPositionLoadPosition = Ti.UI.createButton({
        title: L("generic_load_location_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnShedModeFormsShedPositionLoadPosition"
    });
    $.__views.scrollViewShedPosition.add($.__views.btnShedModeFormsShedPositionLoadPosition);
    OnBtnLoadPosition_Click ? $.__views.btnShedModeFormsShedPositionLoadPosition.addEventListener("click", OnBtnLoadPosition_Click) : __defers["$.__views.btnShedModeFormsShedPositionLoadPosition!click!OnBtnLoadPosition_Click"] = true;
    $.__views.viewAppTextFieldShedModeFormsShedPositionLatitude = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionLatitude"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionLatitude);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionLatitude",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionLatitude
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionLatitude.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionLatitude);
    $.__views.viewAppTextFieldShedModeFormsShedPositionLongitude = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionLongitude"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionLongitude);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionLongitude",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionLongitude
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionLongitude.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionLongitude);
    $.__views.viewAppTextFieldShedModeFormsShedPositionAltitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionAltitude"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionAltitude);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionAltitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionAltitude",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionAltitude
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionAltitude.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionAltitude);
    $.__views.viewAppTextFieldShedModeFormsShedPositionProvince = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionProvince"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionProvince);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionProvince = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionProvince",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionProvince
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionProvince.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionProvince);
    $.__views.viewAppTextFieldShedModeFormsShedPositionMunicipality = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionMunicipality"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionMunicipality);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionMunicipality = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionMunicipality",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionMunicipality
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionMunicipality.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionMunicipality);
    $.__views.viewAppTextFieldShedModeFormsShedPositionPlace = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionPlace"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionPlace);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionPlace = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionPlace",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionPlace
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionPlace.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionPlace);
    $.__views.viewAppTextFieldShedModeFormsShedPositionAddress = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionAddress"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionAddress);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionAddress",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionAddress
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionAddress.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionAddress);
    $.__views.viewAppTextFieldShedModeFormsShedPositionCivicNo = Ti.UI.createView({
        top: 560,
        bottom: 10,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldShedModeFormsShedPositionCivicNo"
    });
    $.__views.scrollViewShedPosition.add($.__views.viewAppTextFieldShedModeFormsShedPositionCivicNo);
    $.__views.widgetAppTextFieldShedModeFormsShedPositionCivicNo = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldShedModeFormsShedPositionCivicNo",
        __parentSymbol: $.__views.viewAppTextFieldShedModeFormsShedPositionCivicNo
    });
    $.__views.widgetAppTextFieldShedModeFormsShedPositionCivicNo.setParent($.__views.viewAppTextFieldShedModeFormsShedPositionCivicNo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btnShedModeFormsShedPositionLoadPosition);
    var bIsWorkInProgress = false;
    var timeout = null;
    try {
        $.btnShedModeFormsShedPositionLoadPosition.enabled = view_enabled;
        $.widgetAppTextFieldShedModeFormsShedPositionLatitude.init(L("generic_latitude_txt_hint"), OnLatitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldShedModeFormsShedPositionLatitude.set_text_value(Alloy.Globals.ShedModeShedPosition["LATITUDE"]);
        $.widgetAppTextFieldShedModeFormsShedPositionLatitude.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsShedPositionLongitude.init(L("generic_longitude_txt_hint"), OnLongitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldShedModeFormsShedPositionLongitude.set_text_value(Alloy.Globals.ShedModeShedPosition["LONGITUDE"]);
        $.widgetAppTextFieldShedModeFormsShedPositionLongitude.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsShedPositionAltitude.init(L("generic_altitude_txt_hint"), OnAltitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldShedModeFormsShedPositionAltitude.set_text_value(Alloy.Globals.ShedModeShedPosition["ALTITUDE"]);
        $.widgetAppTextFieldShedModeFormsShedPositionAltitude.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsShedPositionProvince.init(L("generic_province_txt_hint"), OnProvince_Change);
        $.widgetAppTextFieldShedModeFormsShedPositionProvince.set_text_value(Alloy.Globals.ShedModeShedPosition["PROVINCE"]);
        $.widgetAppTextFieldShedModeFormsShedPositionProvince.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsShedPositionMunicipality.init(L("generic_municipality_txt_hint"), OnMunicipality_Change);
        $.widgetAppTextFieldShedModeFormsShedPositionMunicipality.set_text_value(Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"]);
        $.widgetAppTextFieldShedModeFormsShedPositionMunicipality.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsShedPositionPlace.init(L("generic_place_txt_hint"), OnPlace_Change);
        $.widgetAppTextFieldShedModeFormsShedPositionPlace.set_text_value(Alloy.Globals.ShedModeShedPosition["PLACE"]);
        $.widgetAppTextFieldShedModeFormsShedPositionPlace.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsShedPositionAddress.init(L("generic_address_txt_hint"), OnAddress_Change);
        $.widgetAppTextFieldShedModeFormsShedPositionAddress.set_text_value(Alloy.Globals.ShedModeShedPosition["ADDRESS"]);
        $.widgetAppTextFieldShedModeFormsShedPositionAddress.enabled(view_enabled);
        $.widgetAppTextFieldShedModeFormsShedPositionCivicNo.init(L("generic_civicno_txt_hint"), OnCivicNo_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldShedModeFormsShedPositionCivicNo.set_text_value(Alloy.Globals.ShedModeShedPosition["CIVIC_NO"]);
        $.widgetAppTextFieldShedModeFormsShedPositionCivicNo.enabled(view_enabled);
        $.shedModeFormsShedPositionWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.shedModeFormsShedPositionWindow!android:back!OnAndroidBackButton_Click"] && $.__views.shedModeFormsShedPositionWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.shedModeFormsShedPositionWindow!androidback!OnAndroidBackButton_Click"] && $.__views.shedModeFormsShedPositionWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btnShedModeFormsShedPositionLoadPosition!click!OnBtnLoadPosition_Click"] && $.__views.btnShedModeFormsShedPositionLoadPosition.addEventListener("click", OnBtnLoadPosition_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;