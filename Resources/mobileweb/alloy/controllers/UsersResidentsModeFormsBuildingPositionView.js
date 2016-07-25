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
            $.usersResidentsModeFormsBuildingPositionWindow.close();
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
        Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.get_text_value();
    }
    function OnLongitude_Change() {
        Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.get_text_value();
    }
    function OnAltitude_Change() {
        Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.get_text_value();
    }
    function UpdatePosition(e) {
        Ti.Geolocation.removeEventListener("location", UpdatePosition);
        if (!e.success || e.error) {
            alert(L("unable_to_get_location_err_msg") + " " + e.error);
            return;
        }
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.set_text_value(e.coords.longitude);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.set_text_value(e.coords.altitude);
        Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.set_text_value(formattedAnswer["administrative_area_level_2"]);
            OnProvince_Change();
            $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.set_text_value(formattedAnswer["locality"]);
            OnMunicipality_Change();
            $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.set_text_value(formattedAnswer["administrative_area_level_1"]);
            OnPlace_Change();
            $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.set_text_value(formattedAnswer["postal_code"]);
            OnCivicNo_Change();
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.set_text_value(address);
            OnAddress_Change();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        }
    }
    function OnProvince_Change() {
        Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.get_text_value();
    }
    function OnMunicipality_Change() {
        Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.get_text_value();
    }
    function OnPlace_Change() {
        Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.get_text_value();
    }
    function OnAddress_Change() {
        Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.get_text_value();
    }
    function OnCivicNo_Change() {
        Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.get_text_value();
    }
    function OnCompilerPosition_Change(e) {
        Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"] = e.id;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "UsersResidentsModeFormsBuildingPositionView";
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
    $.__views.usersResidentsModeFormsBuildingPositionWindow = Ti.UI.createWindow({
        title: L("users_residents_mode_building_position_view_title"),
        backgroundColor: "#ffffcc",
        id: "usersResidentsModeFormsBuildingPositionWindow"
    });
    $.__views.usersResidentsModeFormsBuildingPositionWindow && $.addTopLevelView($.__views.usersResidentsModeFormsBuildingPositionWindow);
    OnAndroidBackButton_Click ? $.__views.usersResidentsModeFormsBuildingPositionWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.usersResidentsModeFormsBuildingPositionWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.usersResidentsModeFormsBuildingPositionWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.usersResidentsModeFormsBuildingPositionWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.usersResidentsModeFormsBuildingPositionWindow.add($.__views.activity_indicator);
    $.__views.scrollViewBuildingPosition = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewBuildingPosition"
    });
    $.__views.usersResidentsModeFormsBuildingPositionWindow.add($.__views.scrollViewBuildingPosition);
    $.__views.btnUsersResidentsModeFormsBuildingPositionLoadPosition = Ti.UI.createButton({
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
        id: "btnUsersResidentsModeFormsBuildingPositionLoadPosition"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.btnUsersResidentsModeFormsBuildingPositionLoadPosition);
    OnBtnLoadPosition_Click ? $.__views.btnUsersResidentsModeFormsBuildingPositionLoadPosition.addEventListener("click", OnBtnLoadPosition_Click) : __defers["$.__views.btnUsersResidentsModeFormsBuildingPositionLoadPosition!click!OnBtnLoadPosition_Click"] = true;
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude);
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude);
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude);
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionProvince = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionProvince"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionProvince);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionProvince
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionProvince);
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality);
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionPlace = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionPlace"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionPlace);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionPlace
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionPlace);
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAddress = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionAddress"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAddress);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAddress
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionAddress);
    $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo = Ti.UI.createView({
        top: 560,
        bottom: 10,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo);
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo",
        __parentSymbol: $.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo
    });
    $.__views.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.setParent($.__views.viewAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo);
    $.__views.viewCompilerPosition = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 100,
        id: "viewCompilerPosition"
    });
    $.__views.scrollViewBuildingPosition.add($.__views.viewCompilerPosition);
    $.__views.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition",
        __parentSymbol: $.__views.viewCompilerPosition
    });
    $.__views.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition.setParent($.__views.viewCompilerPosition);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btnUsersResidentsModeFormsBuildingPositionLoadPosition);
    var bIsWorkInProgress = false;
    var timeout = null;
    try {
        var compilerPosParentView = null;
        compilerPosParentView = $.getView();
        $.btnUsersResidentsModeFormsBuildingPositionLoadPosition.enabled = view_enabled;
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.init(L("generic_latitude_txt_hint"), OnLatitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.enabled(view_enabled);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.init(L("generic_longitude_txt_hint"), OnLongitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.enabled(view_enabled);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.init(L("generic_altitude_txt_hint"), OnAltitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.enabled(view_enabled);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.init(L("generic_province_txt_hint"), OnProvince_Change);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.enabled(view_enabled);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.init(L("generic_municipality_txt_hint"), OnMunicipality_Change);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.enabled(view_enabled);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.init(L("generic_place_txt_hint"), OnPlace_Change);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.enabled(view_enabled);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.init(L("generic_address_txt_hint"), OnAddress_Change);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.enabled(view_enabled);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.init(L("generic_civicno_txt_hint"), OnCivicNo_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.set_text_value(Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"]);
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.enabled(view_enabled);
        var compilerPositionValues = {
            0: {
                title: L("generic_compiler_position_outside_the_building")
            },
            1: {
                title: L("generic_compiler_position_inside_the_building")
            }
        };
        $.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition.init(L("generic_compiler_position_text_msg"), compilerPositionValues, OnCompilerPosition_Change, null, compilerPosParentView);
        $.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition.enabled(view_enabled);
        Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"] && $.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition.set_selected_index(Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"]);
        $.usersResidentsModeFormsBuildingPositionWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.usersResidentsModeFormsBuildingPositionWindow!android:back!OnAndroidBackButton_Click"] && $.__views.usersResidentsModeFormsBuildingPositionWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.usersResidentsModeFormsBuildingPositionWindow!androidback!OnAndroidBackButton_Click"] && $.__views.usersResidentsModeFormsBuildingPositionWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btnUsersResidentsModeFormsBuildingPositionLoadPosition!click!OnBtnLoadPosition_Click"] && $.__views.btnUsersResidentsModeFormsBuildingPositionLoadPosition.addEventListener("click", OnBtnLoadPosition_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;