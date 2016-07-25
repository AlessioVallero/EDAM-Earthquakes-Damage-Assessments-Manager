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
            Alloy.Globals.ProtectedCleanUpEventListener(Ti.App, "form:save_from_section");
            $.navigationWindowDetailedEvaluation.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnEstimatedBuildingDamage_Change(e) {
        Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"] = e.id;
    }
    function OnGeneralComments_Change() {
        Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.get_text_value();
    }
    function OnTableViewATC20ModeFormsDetailedEvaluation_Click(e) {
        try {
            switch (e.index) {
              case 0:
                Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsDetailedEvaluationOverallHazards", {
                    is_synchronized: current_is_synchronized
                });
                break;

              case 1:
                Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsDetailedEvaluationStructuralHazards", {
                    mode: current_mode,
                    is_synchronized: current_is_synchronized
                });
                break;

              case 2:
                Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsDetailedEvaluationNonstructuralHazards", {
                    mode: current_mode,
                    is_synchronized: current_is_synchronized
                });
                break;

              case 3:
                Alloy.Globals.createAndOpenControllerExt("ATC20ModeFormsDetailedEvaluationGeotechnicalHazards", {
                    is_synchronized: current_is_synchronized
                });
                break;

              case 4:
                if (Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]) if (view_enabled) {
                    var optionDialog = Ti.UI.createOptionDialog({
                        title: L("atc20_detailed_evaluation_sketch_selection_title"),
                        cancel: 3,
                        options: [ L("atc20_detailed_evaluation_new_sketch_msg"), L("atc20_detailed_evaluation_view_sketch_msg"), L("atc20_detailed_evaluation_delete_sketch_msg"), L("generic_cancel_btn_title") ],
                        selectedIndex: 1
                    });
                    optionDialog.addEventListener("click", function(e) {
                        switch (e.index) {
                          case 0:
                            Alloy.Globals.createAndOpenControllerExt("DraftPaintView", {
                                type: "Detailed_ATC20_Sketch"
                            });
                            break;

                          case 1:
                            Alloy.Globals.createAndOpenControllerExt("ViewDetailedEvaluationSketchView", {
                                image: Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]
                            });
                            break;

                          case 2:
                            Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = "";
                            Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] = "Y";
                        }
                    });
                    optionDialog.show();
                } else Alloy.Globals.createAndOpenControllerExt("ViewDetailedEvaluationSketchView", {
                    image: Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"]
                }); else Alloy.Globals.createAndOpenControllerExt("DraftPaintView", {
                    type: "Detailed_ATC20_Sketch"
                });
            }
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsDetailedEvaluationView";
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
    $.__views.atc20ModeDetailedEvaluationWindow = Ti.UI.createWindow({
        title: L("atc20_mode_detailed_evaluation_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeDetailedEvaluationWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.atc20ModeDetailedEvaluationWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewDetailedEvaluation = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewDetailedEvaluation"
    });
    $.__views.atc20ModeDetailedEvaluationWindow.add($.__views.scrollViewDetailedEvaluation);
    $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage"
    });
    $.__views.scrollViewDetailedEvaluation.add($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage);
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage",
        __parentSymbol: $.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage
    });
    $.__views.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage.setParent($.__views.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage);
    $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments"
    });
    $.__views.scrollViewDetailedEvaluation.add($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments);
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments = Alloy.createWidget("com.diseg.AppTextField", "widget", {
        id: "widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments",
        __parentSymbol: $.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments
    });
    $.__views.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.setParent($.__views.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments);
    var __alloyId18 = [];
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowOverallHazards = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewATC20ModeFormsDetailedEvaluationRowOverallHazards"
    });
    __alloyId18.push($.__views.tableViewATC20ModeFormsDetailedEvaluationRowOverallHazards);
    $.__views.lblATC20ModeFormsDetailedEvaluationRowOverallHazards = Ti.UI.createLabel({
        text: L("generic_overall_hazards_text_msg"),
        height: 50,
        color: "#000",
        id: "lblATC20ModeFormsDetailedEvaluationRowOverallHazards"
    });
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowOverallHazards.add($.__views.lblATC20ModeFormsDetailedEvaluationRowOverallHazards);
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowStructuralHazards = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewATC20ModeFormsDetailedEvaluationRowStructuralHazards"
    });
    __alloyId18.push($.__views.tableViewATC20ModeFormsDetailedEvaluationRowStructuralHazards);
    $.__views.lblATC20ModeFormsDetailedEvaluationRowStructuralHazards = Ti.UI.createLabel({
        text: L("generic_structural_hazards_text_msg"),
        height: 50,
        color: "#000",
        id: "lblATC20ModeFormsDetailedEvaluationRowStructuralHazards"
    });
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowStructuralHazards.add($.__views.lblATC20ModeFormsDetailedEvaluationRowStructuralHazards);
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowNonstructuralHazards = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewATC20ModeFormsDetailedEvaluationRowNonstructuralHazards"
    });
    __alloyId18.push($.__views.tableViewATC20ModeFormsDetailedEvaluationRowNonstructuralHazards);
    $.__views.lblATC20ModeFormsDetailedEvaluationRowNonstructuralHazards = Ti.UI.createLabel({
        text: L("generic_nonstructural_hazards_text_msg"),
        height: 50,
        color: "#000",
        id: "lblATC20ModeFormsDetailedEvaluationRowNonstructuralHazards"
    });
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowNonstructuralHazards.add($.__views.lblATC20ModeFormsDetailedEvaluationRowNonstructuralHazards);
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowGeotechnicalHazards = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewATC20ModeFormsDetailedEvaluationRowGeotechnicalHazards"
    });
    __alloyId18.push($.__views.tableViewATC20ModeFormsDetailedEvaluationRowGeotechnicalHazards);
    $.__views.lblATC20ModeFormsDetailedEvaluationRowGeotechnicalHazards = Ti.UI.createLabel({
        text: L("generic_geotechnical_hazards_text_msg"),
        height: 50,
        color: "#000",
        id: "lblATC20ModeFormsDetailedEvaluationRowGeotechnicalHazards"
    });
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowGeotechnicalHazards.add($.__views.lblATC20ModeFormsDetailedEvaluationRowGeotechnicalHazards);
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowSketch = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewATC20ModeFormsDetailedEvaluationRowSketch"
    });
    __alloyId18.push($.__views.tableViewATC20ModeFormsDetailedEvaluationRowSketch);
    $.__views.lblATC20ModeFormsDetailedEvaluationRowSketch = Ti.UI.createLabel({
        text: L("generic_sketch_text_msg"),
        height: 50,
        color: "#000",
        id: "lblATC20ModeFormsDetailedEvaluationRowSketch"
    });
    $.__views.tableViewATC20ModeFormsDetailedEvaluationRowSketch.add($.__views.lblATC20ModeFormsDetailedEvaluationRowSketch);
    $.__views.tableViewATC20ModeFormsDetailedEvaluation = Ti.UI.createTableView({
        top: 140,
        backgroundColor: "#ffffff",
        height: 250,
        width: Ti.UI.FILL,
        data: __alloyId18,
        id: "tableViewATC20ModeFormsDetailedEvaluation"
    });
    $.__views.scrollViewDetailedEvaluation.add($.__views.tableViewATC20ModeFormsDetailedEvaluation);
    OnTableViewATC20ModeFormsDetailedEvaluation_Click ? $.__views.tableViewATC20ModeFormsDetailedEvaluation.addEventListener("click", OnTableViewATC20ModeFormsDetailedEvaluation_Click) : __defers["$.__views.tableViewATC20ModeFormsDetailedEvaluation!click!OnTableViewATC20ModeFormsDetailedEvaluation_Click"] = true;
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 400,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewDetailedEvaluation.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    $.__views.navigationWindowDetailedEvaluation = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.atc20ModeDetailedEvaluationWindow,
        id: "navigationWindowDetailedEvaluation"
    });
    $.__views.navigationWindowDetailedEvaluation && $.addTopLevelView($.__views.navigationWindowDetailedEvaluation);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_mode = args.mode;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var estimatedBuildingDamageParentView = null;
        var thisView = $.getView();
        estimatedBuildingDamageParentView = thisView;
        if ("NEPAL" == current_mode) {
            $.scrollViewDetailedEvaluation.remove($.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage);
            $.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage = null;
            $.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.setTop(0);
            $.tableViewATC20ModeFormsDetailedEvaluation.setTop(70);
            $.tableViewATC20ModeFormsDetailedEvaluation.setHeight(200);
            $.viewAppButtonSave.setTop(280);
            $.tableViewATC20ModeFormsDetailedEvaluation.deleteRow(4);
        } else {
            var estimatedBuildingDamageValues = {
                0: {
                    title: L("generic_estimated_building_damage_none")
                },
                1: {
                    title: "0-1%"
                },
                2: {
                    title: "1-10%"
                },
                3: {
                    title: "10-30%"
                },
                4: {
                    title: "30-60%"
                },
                5: {
                    title: "60-100%"
                },
                6: {
                    title: "100%"
                }
            };
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage.init(L("generic_estimated_building_damage_text_msg"), estimatedBuildingDamageValues, OnEstimatedBuildingDamage_Change, null, estimatedBuildingDamageParentView);
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage.enabled(view_enabled);
            Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"] && $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage.set_selected_index(Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"]);
        }
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.init(L("generic_general_comments_txt_hint"), OnGeneralComments_Change);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.set_text_value(Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"]);
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.enabled(view_enabled);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        RegisterHideKeyboard($.atc20ModeDetailedEvaluationWindow, [ $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.get_text_field() ]);
        $.navigationWindowDetailedEvaluation.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewATC20ModeFormsDetailedEvaluation!click!OnTableViewATC20ModeFormsDetailedEvaluation_Click"] && $.__views.tableViewATC20ModeFormsDetailedEvaluation.addEventListener("click", OnTableViewATC20ModeFormsDetailedEvaluation_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;