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
        try {
            $.navigationWindowViewUsersLocationsView.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ViewUsersLocations";
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
    $.__views.viewUsersLocationsViewWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "viewUsersLocationsViewWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.viewUsersLocationsViewWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.map = Alloy.Globals.Map.createView({
        userLocation: true,
        mapType: Alloy.Globals.Map.NORMAL_TYPE,
        top: 0,
        id: "map"
    });
    $.__views.viewUsersLocationsViewWindow.add($.__views.map);
    $.__views.navigationWindowViewUsersLocationsView = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.viewUsersLocationsViewWindow,
        id: "navigationWindowViewUsersLocationsView"
    });
    $.__views.navigationWindowViewUsersLocationsView && $.addTopLevelView($.__views.navigationWindowViewUsersLocationsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_users_coordinates = args.users_coordinates;
    var current_mode = args.mode;
    var current_title = args.title;
    "undefined" == typeof current_mode && (current_mode = "EITW");
    try {
        if ("YL" == current_mode) {
            $.viewUsersLocationsViewWindow.setTitle(L("generic_your_location_title"));
            $.map.addAnnotation(Alloy.Globals.Map.createAnnotation({
                latitude: current_users_coordinates["LATITUDE"],
                longitude: current_users_coordinates["LONGITUDE"],
                pincolor: Alloy.Globals.Map.ANNOTATION_AZURE,
                image: "/images/app_icon.png"
            }));
        } else if (current_users_coordinates && current_users_coordinates.length > 0) if ("EITW" == current_mode) {
            $.viewUsersLocationsViewWindow.setTitle(L("users_locations_view_title"));
            for (var i = 0; i < current_users_coordinates.length; i++) {
                var currentElem = current_users_coordinates[i];
                var currentUsername = currentElem["USERNAME"];
                currentUsername == Alloy.Globals.SessionUsername && (currentUsername = L("generic_me_msg"));
                var subtitleMsg = null;
                subtitleMsg = "undefined" != typeof currentElem["OS"] && currentElem["OS"] && "null" != currentElem["OS"].toLowerCase() ? L("user_location_last_use_text_msg") + currentElem["DATE"] + " UTC " + L("generic_on_msg") + currentElem["OS"] : L("user_location_last_use_text_msg") + currentElem["DATE"] + " UTC";
                $.map.addAnnotation(Alloy.Globals.Map.createAnnotation({
                    latitude: currentElem["LATITUDE"],
                    longitude: currentElem["LONGITUDE"],
                    pincolor: Alloy.Globals.Map.ANNOTATION_AZURE,
                    image: "/images/app_icon.png",
                    title: currentUsername,
                    subtitle: subtitleMsg
                }));
            }
        } else if ("BAEA" == current_mode) {
            $.viewUsersLocationsViewWindow.setTitle(current_title);
            for (var i = 0; i < current_users_coordinates.length; i++) {
                var currentElem = current_users_coordinates[i];
                var annotationTitle = "";
                switch (currentElem["SECTION"]) {
                  case "FR":
                    annotationTitle = L("baea_mode_section_fault_rupture_title");
                    break;

                  case "LQ":
                    annotationTitle = L("baea_mode_section_liquefaction_title");
                    break;

                  case "LA":
                    annotationTitle = L("baea_mode_section_landslide_title");
                    break;

                  case "TS":
                    annotationTitle = L("baea_mode_section_tsunami_title");
                    break;

                  case "LI":
                    annotationTitle = L("baea_mode_section_lifelines_title");
                    break;

                  case "BU":
                    annotationTitle = L("baea_mode_section_buildings_title");
                    break;

                  case "GE":
                    annotationTitle = L("baea_mode_section_general_title");
                }
                $.map.addAnnotation(Alloy.Globals.Map.createAnnotation({
                    latitude: currentElem["LATITUDE"],
                    longitude: currentElem["LONGITUDE"],
                    pincolor: Alloy.Globals.Map.ANNOTATION_AZURE,
                    image: "/images/pin-m-feature+00c.png",
                    title: annotationTitle,
                    subtitle: currentElem["DATE"] + " UTC - " + L("generic_site_name_txt_hint") + ": " + currentElem["SITE"] + " - " + L("generated_created_by_text_msg") + " " + currentElem["OPERATOR"]
                }));
            }
        }
        $.navigationWindowViewUsersLocationsView.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;