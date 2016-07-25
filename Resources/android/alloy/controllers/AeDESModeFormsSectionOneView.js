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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "form:save_from_section");
            $.aedesModeFormsSectionOneWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnCodeOfUse_Change(e) {
        Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"] = e.id;
    }
    function OnBuildingPosition_Change(e) {
        Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] = e.id;
    }
    function OnBtnLoadPosition_Click() {
        try {
            BeginAsyncBusyAction($.activity_indicator, controls, function() {
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
        Alloy.Globals.AeDESModeSectionOne["LATITUDE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.get_text_value();
    }
    function OnLongitude_Change() {
        Alloy.Globals.AeDESModeSectionOne["LONGITUDE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.get_text_value();
    }
    function OnAltitude_Change() {
        Alloy.Globals.AeDESModeSectionOne["ALTITUDE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.get_text_value();
    }
    function UpdatePosition(e) {
        Ti.Geolocation.removeEventListener("location", UpdatePosition);
        if (!e.success || e.error) {
            alert(L("unable_to_get_location_err_msg") + " " + e.error);
            return;
        }
        $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.set_text_value(e.coords.latitude);
        $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.set_text_value(e.coords.longitude);
        $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.set_text_value(e.coords.altitude);
        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
            alert(L("generic_no_network_for_georeverse_address_msg"));
        } else Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.set_text_value(formattedAnswer["administrative_area_level_2"]);
            OnProvince_Change();
            $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.set_text_value(formattedAnswer["locality"]);
            OnMunicipality_Change();
            $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.set_text_value(formattedAnswer["administrative_area_level_1"]);
            OnPlace_Change();
            $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.set_text_value(formattedAnswer["postal_code"]);
            OnCivicNo_Change();
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.set_text_value(address);
            OnAddress_Change();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        }
    }
    function OnProvince_Change() {
        Alloy.Globals.AeDESModeSectionOne["PROVINCE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.get_text_value();
    }
    function OnMunicipality_Change() {
        Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"] = $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.get_text_value();
    }
    function OnPlace_Change() {
        Alloy.Globals.AeDESModeSectionOne["PLACE"] = $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.get_text_value();
    }
    function OnAddress_Change() {
        Alloy.Globals.AeDESModeSectionOne["ADDRESS"] = $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.get_text_value();
    }
    function OnCivicNo_Change() {
        Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"] = $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.get_text_value();
    }
    function OnBuildingNameOrOwner_Change() {
        Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"] = $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.get_text_value();
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionOneView";
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
    $.__views.aedesModeFormsSectionOneWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_one_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeFormsSectionOneWindow"
    });
    $.__views.aedesModeFormsSectionOneWindow && $.addTopLevelView($.__views.aedesModeFormsSectionOneWindow);
    OnAndroidBackButton_Click ? $.__views.aedesModeFormsSectionOneWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.aedesModeFormsSectionOneWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.aedesModeFormsSectionOneWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.aedesModeFormsSectionOneWindow!androidback!OnAndroidBackButton_Click"] = true;
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
    $.__views.aedesModeFormsSectionOneWindow.add($.__views.activity_indicator);
    $.__views.scrollViewSectionOne = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewSectionOne"
    });
    $.__views.aedesModeFormsSectionOneWindow.add($.__views.scrollViewSectionOne);
    $.__views.viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse = Ti.UI.createView({
        top: 0,
        height: 50,
        right: 10,
        id: "viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse);
    $.__views.viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition = Ti.UI.createView({
        top: 70,
        height: 50,
        right: 10,
        id: "viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition);
    $.__views.btnAeDESModeFormsSectionOneLoadPosition = Ti.UI.createButton({
        title: L("generic_load_location_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 140,
        height: 50,
        left: 10,
        right: 10,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnAeDESModeFormsSectionOneLoadPosition"
    });
    $.__views.scrollViewSectionOne.add($.__views.btnAeDESModeFormsSectionOneLoadPosition);
    OnBtnLoadPosition_Click ? $.__views.btnAeDESModeFormsSectionOneLoadPosition.addEventListener("click", OnBtnLoadPosition_Click) : __defers["$.__views.btnAeDESModeFormsSectionOneLoadPosition!click!OnBtnLoadPosition_Click"] = true;
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneLatitude = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneLatitude"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneLatitude);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneLatitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneLatitude",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneLatitude
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneLatitude);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneLongitude = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneLongitude"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneLongitude);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneLongitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneLongitude",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneLongitude
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneLongitude);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneAltitude = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneAltitude"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneAltitude);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneAltitude = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneAltitude",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneAltitude
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneAltitude);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneProvince = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneProvince"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneProvince);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneProvince = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneProvince",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneProvince
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneProvince.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneProvince);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneMunicipality = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneMunicipality"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneMunicipality);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneMunicipality",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneMunicipality
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneMunicipality);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOnePlace = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOnePlace"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOnePlace);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOnePlace = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOnePlace",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOnePlace
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOnePlace.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOnePlace);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneAddress = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneAddress"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneAddress);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneAddress",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneAddress
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneAddress.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneAddress);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneCivicNo = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneCivicNo"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneCivicNo);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneCivicNo",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneCivicNo
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneCivicNo);
    $.__views.viewAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner = Ti.UI.createView({
        top: 770,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 840,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionOne.add($.__views.viewAppButtonSave);
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
    var controls = new Array();
    controls.push($.btnAeDESModeFormsSectionOneLoadPosition);
    var bIsWorkInProgress = false;
    var timeout = null;
    try {
        var codeOfUseParentView = null;
        var buildingPositionView = null;
        codeOfUseParentView = $.viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse;
        buildingPositionView = $.viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition;
        $.btnAeDESModeFormsSectionOneLoadPosition.enabled = view_enabled;
        $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.init(L("generic_latitude_txt_hint"), OnLatitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.set_text_value(Alloy.Globals.AeDESModeSectionOne["LATITUDE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.init(L("generic_longitude_txt_hint"), OnLongitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.set_text_value(Alloy.Globals.AeDESModeSectionOne["LONGITUDE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.init(L("generic_altitude_txt_hint"), OnAltitude_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.set_text_value(Alloy.Globals.AeDESModeSectionOne["ALTITUDE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.init(L("generic_province_txt_hint"), OnProvince_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.set_text_value(Alloy.Globals.AeDESModeSectionOne["PROVINCE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.init(L("generic_municipality_txt_hint"), OnMunicipality_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.set_text_value(Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.init(L("generic_place_txt_hint"), OnPlace_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.set_text_value(Alloy.Globals.AeDESModeSectionOne["PLACE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.init(L("generic_address_txt_hint"), OnAddress_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.set_text_value(Alloy.Globals.AeDESModeSectionOne["ADDRESS"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.init(L("generic_civicno_txt_hint"), OnCivicNo_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.set_text_value(Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.init(L("generic_building_name_or_owner_txt_hint"), OnBuildingNameOrOwner_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.set_text_value(Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"]);
        $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.enabled(view_enabled);
        var codeOfUseValues = {
            0: {
                title: L("generic_code_of_use_private_housing_facilities")
            },
            1: {
                title: L("generic_code_of_use_educational_facilities")
            },
            2: {
                title: L("generic_code_of_use_hospitals_and_health_facilities")
            },
            3: {
                title: L("generic_code_of_use_collective_civilians_activities")
            },
            4: {
                title: L("generic_code_of_use_collective_military_activities")
            },
            5: {
                title: L("generic_code_of_use_collective_religious_activities")
            },
            6: {
                title: L("generic_code_of_use_activities_for_technology_services")
            },
            7: {
                title: L("generic_code_of_use_activities_for_mobility_and_transport")
            },
            8: {
                title: L("generic_code_of_use_nest")
            },
            9: {
                title: L("generic_code_of_use_hospital_company")
            },
            10: {
                title: L("generic_code_of_use_state_technical_department")
            },
            11: {
                title: L("generic_code_of_use_armed_barracks_forces")
            },
            12: {
                title: L("generic_code_of_use_parish_services")
            },
            13: {
                title: L("generic_code_of_use_water")
            },
            14: {
                title: L("generic_code_of_use_railway_station")
            },
            15: {
                title: L("generic_code_of_use_nursery")
            },
            16: {
                title: L("generic_code_of_use_private_nursing_homes")
            },
            17: {
                title: L("generic_code_of_use_state_administrative_department")
            },
            18: {
                title: L("generic_code_of_use_police_and_public_security")
            },
            19: {
                title: L("generic_code_of_use_churches")
            },
            20: {
                title: L("generic_code_of_use_sanitation")
            },
            21: {
                title: L("generic_code_of_use_bus_station")
            },
            22: {
                title: L("generic_code_of_use_elementary_schools")
            },
            23: {
                title: L("generic_code_of_use_clinics_and_polyclinics")
            },
            24: {
                title: L("generic_code_of_use_region")
            },
            25: {
                title: L("generic_code_of_use_firefighters_barracks")
            },
            26: {
                title: L("generic_code_of_use_electric_energy")
            },
            27: {
                title: L("generic_code_of_use_airport_station")
            },
            28: {
                title: L("generic_code_of_use_middle_school")
            },
            29: {
                title: L("generic_code_of_use_asl_locations")
            },
            30: {
                title: L("generic_code_of_use_province")
            },
            31: {
                title: L("generic_code_of_use_revenue_guard_corps")
            },
            32: {
                title: L("generic_code_of_use_gas")
            },
            33: {
                title: L("generic_code_of_use_naval_station")
            },
            34: {
                title: L("generic_code_of_use_high_school")
            },
            35: {
                title: L("generic_code_of_use_inam_inps_or_similar_location")
            },
            36: {
                title: L("generic_code_of_use_mountain_community")
            },
            37: {
                title: L("generic_code_of_use_state_forestry_corps")
            },
            38: {
                title: L("generic_code_of_use_telephony")
            },
            39: {
                title: L("generic_code_of_use_lyceum")
            },
            40: {
                title: L("generic_code_of_use_municipality")
            },
            41: {
                title: L("generic_code_of_use_installations_for_the_telecommunications")
            },
            42: {
                title: L("generic_code_of_use_vocational_school")
            },
            43: {
                title: L("generic_code_of_use_decentralized_municipal_office")
            },
            44: {
                title: L("generic_code_of_use_technical_institute")
            },
            45: {
                title: L("generic_code_of_use_prefecture")
            },
            46: {
                title: L("generic_code_of_use_university_arts_faculty")
            },
            47: {
                title: L("generic_code_of_use_posts_and_telegraphs")
            },
            48: {
                title: L("generic_code_of_use_university_science_faculty")
            },
            49: {
                title: L("generic_code_of_use_civic_center_meeting_center")
            },
            50: {
                title: L("generic_code_of_use_academy_and_conservatory")
            },
            51: {
                title: L("generic_code_of_use_library_museum_gallery")
            },
            52: {
                title: L("generic_code_of_use_rectory_and_school_board_offices")
            },
            53: {
                title: L("generic_code_of_use_inmates")
            },
            54: {
                title: L("generic_code_of_use_other")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse.init(L("generic_code_of_use_text_msg"), codeOfUseValues, OnCodeOfUse_Change, null, codeOfUseParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"] && $.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse.set_selected_index(Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"]);
        var buildingPositionValues = {
            0: {
                title: L("generic_building_position_isolated")
            },
            1: {
                title: L("generic_building_position_internal")
            },
            2: {
                title: L("generic_building_position_end")
            },
            3: {
                title: L("generic_building_position_corner")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition.init(L("generic_building_position_text_msg"), buildingPositionValues, OnBuildingPosition_Change, null, buildingPositionView);
        $.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] && $.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition.set_selected_index(Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.aedesModeFormsSectionOneWindow, [ $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.get_text_field() ]);
        $.aedesModeFormsSectionOneWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.aedesModeFormsSectionOneWindow!android:back!OnAndroidBackButton_Click"] && $.__views.aedesModeFormsSectionOneWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.aedesModeFormsSectionOneWindow!androidback!OnAndroidBackButton_Click"] && $.__views.aedesModeFormsSectionOneWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.btnAeDESModeFormsSectionOneLoadPosition!click!OnBtnLoadPosition_Click"] && $.__views.btnAeDESModeFormsSectionOneLoadPosition.addEventListener("click", OnBtnLoadPosition_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;