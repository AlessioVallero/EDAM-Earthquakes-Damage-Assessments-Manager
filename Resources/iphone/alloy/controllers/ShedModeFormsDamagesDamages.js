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
    this.__controllerPath = "ShedModeFormsDamagesDamages";
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
    $.__views.shedModeDamagesDamagesWindow = Ti.UI.createWindow({
        id: "shedModeDamagesDamagesWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.shedModeDamagesDamagesWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewDamagesDamages = Ti.UI.createScrollView({
        id: "scrollViewDamagesDamages"
    });
    $.__views.shedModeDamagesDamagesWindow.add($.__views.scrollViewDamagesDamages);
    $.__views.lblAeDESModeFormsDamagesDamage = Ti.UI.createLabel({
        id: "lblAeDESModeFormsDamagesDamage"
    });
    $.__views.scrollViewDamagesDamages.add($.__views.lblAeDESModeFormsDamagesDamage);
    $.__views.lblAeDESModeFormsDamagesDamageFatherTitle = Ti.UI.createLabel({
        id: "lblAeDESModeFormsDamagesDamageFatherTitle"
    });
    $.__views.scrollViewDamagesDamages.add($.__views.lblAeDESModeFormsDamagesDamageFatherTitle);
    $.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD4D5 = Ti.UI.createView({
        id: "viewAppComboBoxAeDESModeFormsDamagesDamagesD4D5"
    });
    $.__views.scrollViewDamagesDamages.add($.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD4D5);
    $.__views.widgetAppComboBoxAeDESModeFormsDamagesDamagesD4D5 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsDamagesDamagesD4D5",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD4D5
    });
    $.__views.widgetAppComboBoxAeDESModeFormsDamagesDamagesD4D5.setParent($.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD4D5);
    $.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD2D3 = Ti.UI.createView({
        id: "viewAppComboBoxAeDESModeFormsDamagesDamagesD2D3"
    });
    $.__views.scrollViewDamagesDamages.add($.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD2D3);
    $.__views.widgetAppComboBoxAeDESModeFormsDamagesDamagesD2D3 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsDamagesDamagesD2D3",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD2D3
    });
    $.__views.widgetAppComboBoxAeDESModeFormsDamagesDamagesD2D3.setParent($.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD2D3);
    $.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD0D1 = Ti.UI.createView({
        id: "viewAppComboBoxAeDESModeFormsDamagesDamagesD0D1"
    });
    $.__views.scrollViewDamagesDamages.add($.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD0D1);
    $.__views.widgetAppComboBoxAeDESModeFormsDamagesDamagesD0D1 = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsDamagesDamagesD0D1",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD0D1
    });
    $.__views.widgetAppComboBoxAeDESModeFormsDamagesDamagesD0D1.setParent($.__views.viewAppComboBoxAeDESModeFormsDamagesDamagesD0D1);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewDamagesDamages.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowDamagesDamages = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.shedModeDamagesDamagesWindow,
        id: "navigationWindowDamagesDamages"
    });
    $.__views.navigationWindowDamagesDamages && $.addTopLevelView($.__views.navigationWindowDamagesDamages);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;