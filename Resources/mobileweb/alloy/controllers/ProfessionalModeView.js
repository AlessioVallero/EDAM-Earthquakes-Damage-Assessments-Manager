function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTableViewProfessionalModeForms_Click(e) {
        try {
            bCanClickOnTableView && BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                switch (e.index) {
                  case 0:
                    Alloy.Globals.createAndOpenControllerExt("ATC20ModeForms", {
                        mode: "CA"
                    });
                    break;

                  case 1:
                    Alloy.Globals.createAndOpenControllerExt("ATC20ModeForms", {
                        mode: "NZ"
                    });
                    break;

                  case 2:
                    Alloy.Globals.createAndOpenControllerExt("AeDESModeForms");
                    break;

                  case 3:
                    Alloy.Globals.createAndOpenControllerExt("ShedModeForms");
                    break;

                  default:
                    Alloy.Globals.createAndOpenControllerExt("ComingSoonView");
                }
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ProfessionalModeView";
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
    $.__views.professionalModeFormsWindow = Ti.UI.createWindow({
        title: L("professional_mode_forms_view_title"),
        backgroundColor: "#ffffcc",
        id: "professionalModeFormsWindow"
    });
    $.__views.professionalModeFormsWindow && $.addTopLevelView($.__views.professionalModeFormsWindow);
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
    $.__views.professionalModeFormsWindow.add($.__views.activity_indicator);
    var __alloyId24 = [];
    $.__views.tableViewProfessionalModeRowATC20Forms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowATC20Forms"
    });
    __alloyId24.push($.__views.tableViewProfessionalModeRowATC20Forms);
    $.__views.imgProfessionalModeRowATC20Forms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/atc20_forms.png",
        id: "imgProfessionalModeRowATC20Forms"
    });
    $.__views.tableViewProfessionalModeRowATC20Forms.add($.__views.imgProfessionalModeRowATC20Forms);
    $.__views.lblProfessionalModeRowATC20Forms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("atc20_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowATC20Forms"
    });
    $.__views.tableViewProfessionalModeRowATC20Forms.add($.__views.lblProfessionalModeRowATC20Forms);
    $.__views.tableViewProfessionalModeRowATC20NZForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowATC20NZForms"
    });
    __alloyId24.push($.__views.tableViewProfessionalModeRowATC20NZForms);
    $.__views.imgProfessionalModeRowATC20NZForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/atc20_nz_forms.png",
        id: "imgProfessionalModeRowATC20NZForms"
    });
    $.__views.tableViewProfessionalModeRowATC20NZForms.add($.__views.imgProfessionalModeRowATC20NZForms);
    $.__views.lblProfessionalModeRowATC20NZForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("atc20_nz_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowATC20NZForms"
    });
    $.__views.tableViewProfessionalModeRowATC20NZForms.add($.__views.lblProfessionalModeRowATC20NZForms);
    $.__views.tableViewProfessionalModeRowAeDESForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowAeDESForms"
    });
    __alloyId24.push($.__views.tableViewProfessionalModeRowAeDESForms);
    $.__views.imgProfessionalModeRowAeDESForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/aedes_forms.png",
        id: "imgProfessionalModeRowAeDESForms"
    });
    $.__views.tableViewProfessionalModeRowAeDESForms.add($.__views.imgProfessionalModeRowAeDESForms);
    $.__views.lblProfessionalModeRowAeDESForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("aedes_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowAeDESForms"
    });
    $.__views.tableViewProfessionalModeRowAeDESForms.add($.__views.lblProfessionalModeRowAeDESForms);
    $.__views.tableViewProfessionalModeRowShedsForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowShedsForms"
    });
    __alloyId24.push($.__views.tableViewProfessionalModeRowShedsForms);
    $.__views.imgProfessionalModeRowShedsForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/sheds_forms.png",
        id: "imgProfessionalModeRowShedsForms"
    });
    $.__views.tableViewProfessionalModeRowShedsForms.add($.__views.imgProfessionalModeRowShedsForms);
    $.__views.lblProfessionalModeRowShedsForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("sheds_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowShedsForms"
    });
    $.__views.tableViewProfessionalModeRowShedsForms.add($.__views.lblProfessionalModeRowShedsForms);
    $.__views.tableViewProfessionalModeRowChurchesForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowChurchesForms"
    });
    __alloyId24.push($.__views.tableViewProfessionalModeRowChurchesForms);
    $.__views.imgProfessionalModeRowChurchesForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/churches_forms.png",
        id: "imgProfessionalModeRowChurchesForms"
    });
    $.__views.tableViewProfessionalModeRowChurchesForms.add($.__views.imgProfessionalModeRowChurchesForms);
    $.__views.lblProfessionalModeRowChurchesForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("churches_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowChurchesForms"
    });
    $.__views.tableViewProfessionalModeRowChurchesForms.add($.__views.lblProfessionalModeRowChurchesForms);
    $.__views.tableViewProfessionalModeRowPalacesForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowPalacesForms"
    });
    __alloyId24.push($.__views.tableViewProfessionalModeRowPalacesForms);
    $.__views.imgProfessionalModeRowPalacesForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/palaces_forms.png",
        id: "imgProfessionalModeRowPalacesForms"
    });
    $.__views.tableViewProfessionalModeRowPalacesForms.add($.__views.imgProfessionalModeRowPalacesForms);
    $.__views.lblProfessionalModeRowPalacesForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("palaces_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowPalacesForms"
    });
    $.__views.tableViewProfessionalModeRowPalacesForms.add($.__views.lblProfessionalModeRowPalacesForms);
    $.__views.tableViewProfessionalModeForms = Ti.UI.createTableView({
        top: 10,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        data: __alloyId24,
        id: "tableViewProfessionalModeForms"
    });
    $.__views.professionalModeFormsWindow.add($.__views.tableViewProfessionalModeForms);
    OnTableViewProfessionalModeForms_Click ? $.__views.tableViewProfessionalModeForms.addEventListener("click", OnTableViewProfessionalModeForms_Click) : __defers["$.__views.tableViewProfessionalModeForms!click!OnTableViewProfessionalModeForms_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var controls = new Array();
    controls.push($.tableViewProfessionalModeForms);
    var bCanClickOnTableView = true;
    try {
        $.professionalModeFormsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewProfessionalModeForms!click!OnTableViewProfessionalModeForms_Click"] && $.__views.tableViewProfessionalModeForms.addEventListener("click", OnTableViewProfessionalModeForms_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;