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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "form:save_from_section");
            $.navigationWindowBuildingDescription.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnLoadAddress_Click() {
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
                        success: UpdateAddress
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
    function UpdateAddress(e) {
        Ti.Geolocation.removeEventListener("location", UpdateAddress);
        if (!e.success || e.error) {
            alert(L("unable_to_get_location_err_msg") + " " + e.error);
            return;
        }
        Alloy.Globals.reverseGeocode(e.coords.latitude, e.coords.longitude, OnGeoreserve_Done);
    }
    function OnGeoreserve_Done(formattedAnswer) {
        try {
            var address = null;
            address = "en" == Titanium.Locale.currentLanguage ? formattedAnswer["street_number"] + " " + formattedAnswer["route"] : formattedAnswer["route"] + " " + formattedAnswer["street_number"];
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.set_text_value(address);
            OnAddress_Change();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        } finally {
            EndAsyncBusyAction($.activity_indicator, controls, EndAsyncBusyAction_CallBack);
        }
    }
    function OnBuildingName_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.get_text_value();
    }
    function OnAddress_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.get_text_value();
    }
    function OnAlsoKnownAs_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.get_text_value();
    }
    function OnLot_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["LOT"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.get_text_value();
    }
    function OnDP_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["DP"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.get_text_value();
    }
    function OnOtherID_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.get_text_value();
    }
    function OnContactName_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.get_text_value();
    }
    function OnBuildingContactPhone_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.get_text_value();
    }
    function OnNumberOfStoriesAboveTheGround_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.get_text_value();
    }
    function OnNumberOfStoriesBelowTheGround_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.get_text_value();
    }
    function OnApproxFootprintArea_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.get_text_value();
    }
    function OnNumberOfResidentialUnits_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.get_text_value();
    }
    function OnNumberOfResidentialUnitsNotHabitable_Change() {
        Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.get_text_value();
    }
    function OnTypeOfConstruction_Change(e) {
        Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] = e.id;
        if (14 != e.id) {
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.set_text_value("");
            Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] = "";
        }
    }
    function OnTypeOfConstructionOtherName_Change() {
        var newOtherNameValue = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.get_text_value();
        Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] = newOtherNameValue;
        if (newOtherNameValue) {
            $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.set_selected_index("14");
            Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] = "14";
        }
    }
    function OnPrimaryOccupancy_Change(e) {
        Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] = e.id;
        if (8 != e.id) {
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.set_text_value("");
            Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] = "";
        }
    }
    function OnPrimaryOccupancyOtherName_Change() {
        var newOtherNameValue = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.get_text_value();
        Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] = newOtherNameValue;
        if (newOtherNameValue) {
            $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.set_selected_index("8");
            Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] = "8";
        }
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsBuildingDescriptionView";
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
    $.__views.atc20ModeBuildingDescriptionWindow = Ti.UI.createWindow({
        title: L("atc20_mode_building_description_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeBuildingDescriptionWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.atc20ModeBuildingDescriptionWindow.leftNavButton = $.__views.btn_ios_back;
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
    $.__views.atc20ModeBuildingDescriptionWindow.add($.__views.activity_indicator);
    $.__views.scrollViewBuildingDescription = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewBuildingDescription"
    });
    $.__views.atc20ModeBuildingDescriptionWindow.add($.__views.scrollViewBuildingDescription);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName);
    $.__views.btnATC20ModeFormsBuildingDescriptionLoadAddress = Ti.UI.createButton({
        title: L("generic_load_address_btn_title"),
        backgroundImage: "/images/app_button_normal.png",
        backgroundSelectedImage: "/images/app_button_pressed.png",
        backgroundDisabledImage: "/images/app_button_disabled.png",
        top: 70,
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
        id: "btnATC20ModeFormsBuildingDescriptionLoadAddress"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.btnATC20ModeFormsBuildingDescriptionLoadAddress);
    OnBtnLoadAddress_Click ? $.__views.btnATC20ModeFormsBuildingDescriptionLoadAddress.addEventListener("click", OnBtnLoadAddress_Click) : __defers["$.__views.btnATC20ModeFormsBuildingDescriptionLoadAddress!click!OnBtnLoadAddress_Click"] = true;
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAddress = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionAddress"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAddress);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAddress
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAddress);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionLot"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionDP"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea = Ti.UI.createView({
        top: 770,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits = Ti.UI.createView({
        top: 840,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable = Ti.UI.createView({
        top: 910,
        height: 80,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable);
    $.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction = Ti.UI.createView({
        top: 1010,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction);
    $.__views.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction
    });
    $.__views.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.setParent($.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName = Ti.UI.createView({
        top: 1080,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName);
    $.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy = Ti.UI.createView({
        top: 1150,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy);
    $.__views.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy
    });
    $.__views.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.setParent($.__views.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy);
    $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName = Ti.UI.createView({
        top: 1220,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 10,
        id: "viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName);
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName
    });
    $.__views.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.setParent($.__views.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 1290,
        width: 60,
        height: 80,
        bottom: 10,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewBuildingDescription.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowBuildingDescription = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.atc20ModeBuildingDescriptionWindow,
        id: "navigationWindowBuildingDescription"
    });
    $.__views.navigationWindowBuildingDescription && $.addTopLevelView($.__views.navigationWindowBuildingDescription);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.btn_ios_back);
    controls.push($.btnATC20ModeFormsBuildingDescriptionLoadAddress);
    var bIsWorkInProgress = false;
    var timeout = null;
    try {
        var typeOfConstructionParentView = null;
        var primaryOccupancyParentView = null;
        var mainView = $.getView();
        typeOfConstructionParentView = mainView;
        primaryOccupancyParentView = mainView;
        var approx_footprint_area_msg = "";
        if ("CA" == current_mode) {
            approx_footprint_area_msg = L("generic_approx_footprint_area_txt_hint");
            var primaryOccupancyValues = {
                0: {
                    title: L("generic_primary_occupancy_dwelling")
                },
                1: {
                    title: L("generic_primary_occupancy_other_residential")
                },
                2: {
                    title: L("generic_primary_occupancy_public_assembly")
                },
                3: {
                    title: L("generic_primary_occupancy_emergency_services")
                },
                4: {
                    title: L("generic_primary_occupancy_commercial")
                },
                5: {
                    title: L("generic_primary_occupancy_offices")
                },
                6: {
                    title: L("generic_primary_occupancy_industrial")
                },
                7: {
                    title: L("generic_primary_occupancy_government")
                },
                8: {
                    title: L("generic_primary_occupancy_historic")
                },
                9: {
                    title: L("generic_primary_occupancy_school")
                },
                10: {
                    title: L("generic_primary_occupancy_other")
                }
            };
            var typeOfConstructionValues = {
                0: {
                    title: L("generic_type_of_construction_wood_frame")
                },
                1: {
                    title: L("generic_type_of_construction_steel_frame")
                },
                2: {
                    title: L("generic_type_of_construction_tilt_up_concrete")
                },
                3: {
                    title: L("generic_type_of_construction_concrete_frame")
                },
                4: {
                    title: L("generic_type_of_construction_concrete_shear_wall")
                },
                5: {
                    title: L("generic_type_of_construction_unreinforced_masonry")
                },
                6: {
                    title: L("generic_type_of_construction_reinforced_masonry")
                },
                7: {
                    title: L("generic_type_of_construction_other")
                }
            };
        } else if ("NZ" == current_mode) {
            approx_footprint_area_msg = L("generic_avg_area_m2_txt_hint");
            var primaryOccupancyValues = {
                0: {
                    title: L("generic_primary_occupancy_dwelling")
                },
                1: {
                    title: L("generic_primary_occupancy_other_residential")
                },
                2: {
                    title: L("generic_primary_occupancy_public_assembly")
                },
                3: {
                    title: L("generic_primary_occupancy_school")
                },
                4: {
                    title: L("generic_primary_occupancy_commercial_offices")
                },
                5: {
                    title: L("generic_primary_occupancy_industrial")
                },
                6: {
                    title: L("generic_primary_occupancy_government")
                },
                7: {
                    title: L("generic_primary_occupancy_heritage_listed")
                },
                8: {
                    title: L("generic_primary_occupancy_other")
                }
            };
            var typeOfConstructionValues = {
                0: {
                    title: L("generic_type_of_construction_timber_frame")
                },
                1: {
                    title: L("generic_type_of_construction_steel_frame")
                },
                2: {
                    title: L("generic_type_of_construction_tilt_up_concrete")
                },
                3: {
                    title: L("generic_type_of_construction_concrete_frame")
                },
                4: {
                    title: L("generic_type_of_construction_concrete_shear_wall")
                },
                5: {
                    title: L("generic_type_of_construction_unreinforced_masonry")
                },
                6: {
                    title: L("generic_type_of_construction_reinforced_masonry")
                },
                7: {
                    title: L("generic_type_of_construction_other")
                }
            };
        } else if ("NEPAL" == current_mode) {
            approx_footprint_area_msg = L("generic_year_of_construction_text_hint");
            var primaryOccupancyValues = {
                0: {
                    title: L("generic_housing_text_msg")
                },
                1: {
                    title: L("generic_primary_occupancy_medical_services_hospital")
                },
                2: {
                    title: L("generic_primary_occupancy_public_agency")
                },
                3: {
                    title: L("generic_primary_occupancy_emergency_services")
                },
                4: {
                    title: L("generic_primary_occupancy_commercial")
                },
                5: {
                    title: L("generic_primary_occupancy_industrial")
                },
                6: {
                    title: L("generic_primary_occupancy_offices")
                },
                7: {
                    title: L("generic_primary_occupancy_school")
                },
                8: {
                    title: L("generic_primary_occupancy_other")
                }
            };
            var typeOfConstructionValues = {
                0: {
                    title: L("generic_type_of_construction_rcc_frame_with_infill_u")
                },
                1: {
                    title: L("generic_type_of_construction_rcc_frame_with_infill_wds")
                },
                2: {
                    title: L("generic_type_of_construction_rcc_frame_with_infill_nbc")
                },
                3: {
                    title: L("generic_type_of_construction_rcc_frame_with_infill_nbc_plus")
                },
                4: {
                    title: L("generic_type_of_construction_rcc_frame_with_infill_ccp")
                },
                5: {
                    title: L("generic_type_of_construction_adobe_mud_block")
                },
                6: {
                    title: L("generic_type_of_construction_brick_masonry_mud")
                },
                7: {
                    title: L("generic_type_of_construction_stone_masonry_mud")
                },
                8: {
                    title: L("generic_type_of_construction_brick_masonry_cement")
                },
                9: {
                    title: L("generic_type_of_construction_stone_masonry_cement")
                },
                10: {
                    title: L("generic_type_of_construction_concrete_block_masonry")
                },
                11: {
                    title: L("generic_type_of_construction_rammed_earth")
                },
                12: {
                    title: L("generic_type_of_construction_wooden_bamboo")
                },
                13: {
                    title: L("generic_type_of_construction_ekra")
                },
                14: {
                    title: L("generic_type_of_construction_other")
                }
            };
        }
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.init(L("generic_type_of_construction_text_msg"), typeOfConstructionValues, OnTypeOfConstruction_Change, null, typeOfConstructionParentView);
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.enabled(view_enabled);
        Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] && $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.set_selected_index(Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"]);
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.init(L("generic_primary_occupancy_text_msg"), primaryOccupancyValues, OnPrimaryOccupancy_Change, null, primaryOccupancyParentView);
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.enabled(view_enabled);
        Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] && $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.set_selected_index(Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"]);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.init(L("generic_building_name_txt_hint"), OnBuildingName_Change);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"]);
        if ("CA" == current_mode || "NEPAL" == current_mode) {
            $.scrollViewBuildingDescription.remove($.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs = null;
            $.scrollViewBuildingDescription.remove($.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot = null;
            $.scrollViewBuildingDescription.remove($.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP = null;
            $.scrollViewBuildingDescription.remove($.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID = null;
            $.scrollViewBuildingDescription.remove($.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName = null;
            "CA" == current_mode ? $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.init(L("generic_address_txt_hint"), OnAddress_Change) : "NEPAL" == current_mode && $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.init(L("generic_village_txt_hint"), OnAddress_Change);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.init(approx_footprint_area_msg, OnApproxFootprintArea_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.init(L("generic_residential_units_not_habitable_txt_hint"), OnNumberOfResidentialUnitsNotHabitable_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.set_label_height(80);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"]);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.setTop(210);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.setTop(280);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.setTop(350);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.setTop(420);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.setTop(490);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.setTop(560);
            $.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.setTop(660);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.setTop(730);
            $.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.setTop(800);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.setTop(870);
            $.viewAppButtonSave.setTop(940);
            RegisterHideKeyboard($.atc20ModeBuildingDescriptionWindow, [ $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.get_text_field() ]);
        } else if ("NZ" == current_mode) {
            $.scrollViewBuildingDescription.remove($.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable = null;
            $.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.setTop(910);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.setTop(980);
            $.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.setTop(1050);
            $.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.setTop(1120);
            $.viewAppButtonSave.setTop(1190);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.init(L("generic_also_known_as_txt_hint"), OnAlsoKnownAs_Change);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.init(L("generic_lot_txt_hint"), OnLot_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["LOT"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.init(L("generic_dp_txt_hint"), OnDP_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["DP"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.init(L("generic_other_id_txt_hint"), OnOtherID_Change);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.init(L("generic_contact_name_txt_hint"), OnContactName_Change);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.init(L("generic_address_txt_hint"), OnAddress_Change);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"]);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.init(approx_footprint_area_msg, OnApproxFootprintArea_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.enabled(view_enabled);
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"]);
            RegisterHideKeyboard($.atc20ModeBuildingDescriptionWindow, [ $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.get_text_field(), $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.get_text_field() ]);
        }
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.init(L("generic_building_contact_phone_txt_hint"), OnBuildingContactPhone_Change, Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"]);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.init(L("generic_number_of_stories_above_the_ground_txt_hint"), OnNumberOfStoriesAboveTheGround_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"]);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.init(L("generic_number_of_stories_below_the_ground_txt_hint"), OnNumberOfStoriesBelowTheGround_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"]);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.init(L("generic_residential_units_txt_hint"), OnNumberOfResidentialUnits_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"]);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.init(L("generic_other_text_msg"), OnTypeOfConstructionOtherName_Change);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"]);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.init(L("generic_other_text_msg"), OnPrimaryOccupancyOtherName_Change);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.enabled(view_enabled);
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.set_text_value(Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.btnATC20ModeFormsBuildingDescriptionLoadAddress.enabled = view_enabled;
        $.navigationWindowBuildingDescription.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.btnATC20ModeFormsBuildingDescriptionLoadAddress!click!OnBtnLoadAddress_Click"] && $.__views.btnATC20ModeFormsBuildingDescriptionLoadAddress.addEventListener("click", OnBtnLoadAddress_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;