function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ViewUsersLocations";
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
    $.__views.viewUsersLocationsViewWindow = Ti.UI.createWindow({
        title: L("users_locations_view_title"),
        backgroundColor: "#ffffcc",
        id: "viewUsersLocationsViewWindow"
    });
    $.__views.viewUsersLocationsViewWindow && $.addTopLevelView($.__views.viewUsersLocationsViewWindow);
    $.__views.map = Alloy.Globals.Map.createView({
        userLocation: true,
        mapType: Alloy.Globals.Map.NORMAL_TYPE,
        top: 0,
        id: "map"
    });
    $.__views.viewUsersLocationsViewWindow.add($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_users_coordinates = args.users_coordinates;
    try {
        if (current_users_coordinates && current_users_coordinates.length > 0) for (var i = 0; i < current_users_coordinates.length; i++) {
            var currentElem = current_users_coordinates[i];
            var currentUsername = currentElem["USERNAME"];
            currentUsername == Alloy.Globals.SessionUsername && (currentUsername = L("generic_me_msg"));
            $.map.addAnnotation(Alloy.Globals.Map.createAnnotation({
                latitude: currentElem["LATITUDE"],
                longitude: currentElem["LONGITUDE"],
                pincolor: Alloy.Globals.Map.ANNOTATION_AZURE,
                image: "/images/app_icon.png",
                title: currentUsername,
                subtitle: L("user_location_last_use_text_msg") + currentElem["DATE"] + " UTC"
            }));
        }
        $.viewUsersLocationsViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;