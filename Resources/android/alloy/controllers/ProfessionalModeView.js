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
                    var optionDialog = Ti.UI.createOptionDialog({
                        title: L("usa_selection_title"),
                        cancel: 2,
                        options: [ L("usa_baea_msg"), L("usa_atc20_msg"), L("generic_cancel_btn_title") ],
                        selectedIndex: 0
                    });
                    optionDialog.addEventListener("click", function(e) {
                        switch (e.index) {
                          case 0:
                            Alloy.Globals.createAndOpenControllerExt("BAEAModeForms");
                            break;

                          case 1:
                            Alloy.Globals.createAndOpenControllerExt("ATC20ModeForms", {
                                mode: "CA"
                            });
                        }
                    });
                    optionDialog.show();
                    break;

                  case 1:
                    var optionDialog = Ti.UI.createOptionDialog({
                        title: L("nepal_selection_title"),
                        cancel: 1,
                        options: [ L("nepal_atc20_msg"), L("generic_cancel_btn_title") ],
                        selectedIndex: 0
                    });
                    optionDialog.addEventListener("click", function(e) {
                        switch (e.index) {
                          case 0:
                            Alloy.Globals.createAndOpenControllerExt("ATC20ModeForms", {
                                mode: "NEPAL"
                            });
                        }
                    });
                    optionDialog.show();
                    break;

                  case 2:
                    var optionDialog = Ti.UI.createOptionDialog({
                        title: L("nz_selection_title"),
                        cancel: 1,
                        options: [ L("nz_rapid_msg"), L("generic_cancel_btn_title") ],
                        selectedIndex: 0
                    });
                    optionDialog.addEventListener("click", function(e) {
                        switch (e.index) {
                          case 0:
                            Alloy.Globals.createAndOpenControllerExt("ATC20ModeForms", {
                                mode: "NZ"
                            });
                        }
                    });
                    optionDialog.show();
                    break;

                  case 3:
                    var optionDialog = Ti.UI.createOptionDialog({
                        title: L("italy_selection_title"),
                        cancel: 4,
                        options: [ L("italy_aedes_msg"), L("italy_shed_msg"), L("italy_churches_msg"), L("italy_palaces_msg"), L("generic_cancel_btn_title") ],
                        selectedIndex: 0
                    });
                    optionDialog.addEventListener("click", function(e) {
                        switch (e.index) {
                          case 0:
                            Alloy.Globals.createAndOpenControllerExt("AeDESModeForms");
                            break;

                          case 1:
                            Alloy.Globals.createAndOpenControllerExt("ShedModeForms");
                            break;

                          case 2:
                          case 3:
                            Alloy.Globals.createAndOpenControllerExt("ComingSoonView");
                        }
                    });
                    optionDialog.show();
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
    var __alloyId60 = [];
    $.__views.tableViewProfessionalModeRowUSAForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowUSAForms"
    });
    __alloyId60.push($.__views.tableViewProfessionalModeRowUSAForms);
    $.__views.imgProfessionalModeRowUSAForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/usa_forms.png",
        id: "imgProfessionalModeRowUSAForms"
    });
    $.__views.tableViewProfessionalModeRowUSAForms.add($.__views.imgProfessionalModeRowUSAForms);
    $.__views.lblProfessionalModeRowUSAForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("usa_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowUSAForms"
    });
    $.__views.tableViewProfessionalModeRowUSAForms.add($.__views.lblProfessionalModeRowUSAForms);
    $.__views.tableViewProfessionalModeRowNepalForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowNepalForms"
    });
    __alloyId60.push($.__views.tableViewProfessionalModeRowNepalForms);
    $.__views.imgProfessionalModeRowNepalForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/nepal_forms.png",
        id: "imgProfessionalModeRowNepalForms"
    });
    $.__views.tableViewProfessionalModeRowNepalForms.add($.__views.imgProfessionalModeRowNepalForms);
    $.__views.lblProfessionalModeRowNepalForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("nepal_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowNepalForms"
    });
    $.__views.tableViewProfessionalModeRowNepalForms.add($.__views.lblProfessionalModeRowNepalForms);
    $.__views.tableViewProfessionalModeRowNZForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowNZForms"
    });
    __alloyId60.push($.__views.tableViewProfessionalModeRowNZForms);
    $.__views.imgProfessionalModeRowNZForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/nz_forms.png",
        id: "imgProfessionalModeRowNZForms"
    });
    $.__views.tableViewProfessionalModeRowNZForms.add($.__views.imgProfessionalModeRowNZForms);
    $.__views.lblProfessionalModeRowNZForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("nz_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowNZForms"
    });
    $.__views.tableViewProfessionalModeRowNZForms.add($.__views.lblProfessionalModeRowNZForms);
    $.__views.tableViewProfessionalModeRowItalyForms = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewProfessionalModeRowItalyForms"
    });
    __alloyId60.push($.__views.tableViewProfessionalModeRowItalyForms);
    $.__views.imgProfessionalModeRowItalyForms = Ti.UI.createImageView({
        left: 5,
        width: 34,
        height: 34,
        image: "/images/italy_forms.png",
        id: "imgProfessionalModeRowItalyForms"
    });
    $.__views.tableViewProfessionalModeRowItalyForms.add($.__views.imgProfessionalModeRowItalyForms);
    $.__views.lblProfessionalModeRowItalyForms = Ti.UI.createLabel({
        left: 45,
        height: 50,
        width: 200,
        text: L("italy_forms_row_title"),
        color: "#000",
        id: "lblProfessionalModeRowItalyForms"
    });
    $.__views.tableViewProfessionalModeRowItalyForms.add($.__views.lblProfessionalModeRowItalyForms);
    $.__views.tableViewProfessionalModeForms = Ti.UI.createTableView({
        top: 10,
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        data: __alloyId60,
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