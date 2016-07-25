function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnPlansNo_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] = e.id;
    }
    function OnAverageHeightOfFloor_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] = e.id;
    }
    function OnUndergroundPlansNo_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] = e.id;
    }
    function OnAverageSurface_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] = e.id;
    }
    function OnConstructionAge_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] = e.id;
    }
    function OnRenovationAge_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] = e.id;
    }
    function OnUtilization_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] = e.id;
    }
    function OnProperty_Change(e) {
        Alloy.Globals.AeDESModeSectionTwo["PROPERTY"] = e.id;
    }
    function OnUnitOfUseHousing_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.get_text_value();
    }
    function OnUnitOfUseProductive_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.get_text_value();
    }
    function OnUnitOfUseCommerce_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.get_text_value();
    }
    function OnUnitOfUseOffices_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.get_text_value();
    }
    function OnUnitOfUsePublicServices_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.get_text_value();
    }
    function OnUnitOfUseDeposit_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.get_text_value();
    }
    function OnUnitOfUseStrategic_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.get_text_value();
    }
    function OnUnitOfUseTourism_Change() {
        Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.get_text_value();
    }
    function OnOccupants_Change() {
        Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.get_text_value();
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionTwoView";
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
    $.__views.aedesModeSectionTwoWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_two_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionTwoWindow"
    });
    $.__views.aedesModeSectionTwoWindow && $.addTopLevelView($.__views.aedesModeSectionTwoWindow);
    $.__views.scrollViewSectionTwo = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewSectionTwo"
    });
    $.__views.aedesModeSectionTwoWindow.add($.__views.scrollViewSectionTwo);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoPlansNo = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoPlansNo"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoPlansNo);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoPlansNo
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoPlansNo);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageSurface = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoAverageSurface"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageSurface);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageSurface
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoAverageSurface);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoConstructionAge = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoConstructionAge"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoConstructionAge);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoConstructionAge
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoConstructionAge);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoRenovationAge = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoRenovationAge"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoRenovationAge);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoRenovationAge
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoRenovationAge);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoUtilization = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoUtilization"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoUtilization);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoUtilization",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoUtilization
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoUtilization);
    $.__views.viewAppComboBoxAeDESModeFormsSectionTwoProperty = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionTwoProperty"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppComboBoxAeDESModeFormsSectionTwoProperty);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoProperty = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionTwoProperty",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionTwoProperty
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionTwoProperty.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionTwoProperty);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing = Ti.UI.createView({
        top: 560,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive = Ti.UI.createView({
        top: 630,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce = Ti.UI.createView({
        top: 700,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices = Ti.UI.createView({
        top: 770,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices = Ti.UI.createView({
        top: 840,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit = Ti.UI.createView({
        top: 910,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic = Ti.UI.createView({
        top: 980,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism = Ti.UI.createView({
        top: 1050,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism);
    $.__views.viewAppTextFieldAeDESModeFormsSectionTwoOccupants = Ti.UI.createView({
        top: 1120,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldAeDESModeFormsSectionTwoOccupants"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppTextFieldAeDESModeFormsSectionTwoOccupants);
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldAeDESModeFormsSectionTwoOccupants",
        __parentSymbol: $.__views.viewAppTextFieldAeDESModeFormsSectionTwoOccupants
    });
    $.__views.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.setParent($.__views.viewAppTextFieldAeDESModeFormsSectionTwoOccupants);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 1190,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionTwo.add($.__views.viewAppButtonSave);
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
    try {
        var plansNoParentView = null;
        var averageHeightOfFloorParentView = null;
        var undergroundPlansNoParentView = null;
        var averageSurfaceParentView = null;
        var constructionAgeParentView = null;
        var renovationAgeParentView = null;
        var utilizationParentView = null;
        var propertyParentView = null;
        plansNoParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoPlansNo;
        averageHeightOfFloorParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor;
        undergroundPlansNoParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo;
        averageSurfaceParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoAverageSurface;
        constructionAgeParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoConstructionAge;
        renovationAgeParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoRenovationAge;
        utilizationParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoUtilization;
        propertyParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoProperty;
        var plansNoValues = {
            0: {
                title: "1"
            },
            1: {
                title: "2"
            },
            2: {
                title: "3"
            },
            3: {
                title: "4"
            },
            4: {
                title: "5"
            },
            5: {
                title: "6"
            },
            6: {
                title: "7"
            },
            7: {
                title: "8"
            },
            8: {
                title: "9"
            },
            9: {
                title: "10"
            },
            10: {
                title: "11"
            },
            11: {
                title: "12"
            },
            12: {
                title: ">12"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo.init(L("generic_plans_no_text_msg"), plansNoValues, OnPlansNo_Change, null, plansNoParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"]);
        var averageHeightOfFloorValues = {
            0: {
                title: "<=2,5"
            },
            1: {
                title: "2,5-3,5"
            },
            2: {
                title: "3,5-5"
            },
            3: {
                title: ">5"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor.init(L("generic_average_height_of_floor_text_msg"), averageHeightOfFloorValues, OnAverageHeightOfFloor_Change, null, averageHeightOfFloorParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"]);
        var undergroundPlansNoValues = {
            0: {
                title: "0"
            },
            1: {
                title: "1"
            },
            2: {
                title: "2"
            },
            3: {
                title: ">=3"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo.init(L("generic_underground_plans_no_text_msg"), undergroundPlansNoValues, OnUndergroundPlansNo_Change, null, undergroundPlansNoParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"]);
        var averageSurfaceValues = {
            0: {
                title: "<=50"
            },
            1: {
                title: "50-70"
            },
            2: {
                title: "70-100"
            },
            3: {
                title: "100-130"
            },
            4: {
                title: "130-170"
            },
            5: {
                title: "170-230"
            },
            6: {
                title: "230-300"
            },
            7: {
                title: "300-400"
            },
            8: {
                title: "400-500"
            },
            9: {
                title: "500-650"
            },
            10: {
                title: "650-900"
            },
            11: {
                title: "900-1200"
            },
            12: {
                title: "1200-1600"
            },
            13: {
                title: "1600-2200"
            },
            14: {
                title: "2200-3000"
            },
            15: {
                title: ">3000"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface.init(L("generic_average_surface_text_msg"), averageSurfaceValues, OnAverageSurface_Change, null, averageSurfaceParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"]);
        var constructionAgeValues = {
            0: {
                title: L("generic_construction_age_not_detected")
            },
            1: {
                title: "<=1919"
            },
            2: {
                title: "19-45"
            },
            3: {
                title: "46-61"
            },
            4: {
                title: "62-71"
            },
            5: {
                title: "72-81"
            },
            6: {
                title: "82-91"
            },
            7: {
                title: "92-01"
            },
            8: {
                title: ">=2002"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge.init(L("generic_construction_age_text_msg"), constructionAgeValues, OnConstructionAge_Change, null, constructionAgeParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"]);
        var renovationAgeValues = {
            0: {
                title: L("generic_renovation_age_not_detected")
            },
            1: {
                title: "<=1919"
            },
            2: {
                title: "19-45"
            },
            3: {
                title: "46-61"
            },
            4: {
                title: "62-71"
            },
            5: {
                title: "72-81"
            },
            6: {
                title: "82-91"
            },
            7: {
                title: "92-01"
            },
            8: {
                title: ">=2002"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge.init(L("generic_renovation_age_text_msg"), renovationAgeValues, OnRenovationAge_Change, null, renovationAgeParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"]);
        var utilizationValues = {
            0: {
                title: ">65%"
            },
            1: {
                title: "30-60%"
            },
            2: {
                title: "<30%"
            },
            3: {
                title: L("generic_utilization_not_used")
            },
            4: {
                title: L("generic_utilization_under_construction")
            },
            5: {
                title: L("generic_utilization_not_finished")
            },
            6: {
                title: L("generic_utilization_abandoned")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization.init(L("generic_utilization_text_msg"), utilizationValues, OnUtilization_Change, null, utilizationParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"]);
        var propertyValues = {
            0: {
                title: L("generic_property_private")
            },
            1: {
                title: L("generic_property_public")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionTwoProperty.init(L("generic_property_text_msg"), propertyValues, OnProperty_Change, null, propertyParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionTwoProperty.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionTwo["PROPERTY"] && $.widgetAppComboBoxAeDESModeFormsSectionTwoProperty.set_selected_index(Alloy.Globals.AeDESModeSectionTwo["PROPERTY"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.init(L("generic_unit_of_use_housing_txt_hint"), OnUnitOfUseHousing_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.init(L("generic_unit_of_use_productive_txt_hint"), OnUnitOfUseProductive_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.init(L("generic_unit_of_use_commerce_txt_hint"), OnUnitOfUseCommerce_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.init(L("generic_unit_of_use_offices_txt_hint"), OnUnitOfUseOffices_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.init(L("generic_unit_of_use_public_services_txt_hint"), OnUnitOfUsePublicServices_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.init(L("generic_unit_of_use_deposit_txt_hint"), OnUnitOfUseDeposit_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.init(L("generic_unit_of_use_strategic_txt_hint"), OnUnitOfUseStrategic_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.init(L("generic_unit_of_use_tourism_txt_hint"), OnUnitOfUseTourism_Change, Titanium.UI.KEYBOARD_NUMBER_PAD);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.set_text_value(Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"]);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.init(L("generic_occupants_txt_hint"), OnOccupants_Change);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.enabled(view_enabled);
        $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.set_text_value(Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.aedesModeSectionTwoWindow, [ $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.get_text_field(), $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.get_text_field() ]);
        $.aedesModeSectionTwoWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;