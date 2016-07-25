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
            controls = null;
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_manage_section:record_new", AddOnTopNewSectionTableViewRow);
            Alloy.Globals.ProtectedRemoveEventListener(Ti.App, "baea_mode_manage_section:record_update", UpdateSectionTableViewRow);
            $.baeaModeFormsManageSectionViewWindow.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewBAEAModeFormsManageSection_Click(e) {
        try {
            BusyAction($.activity_indicator, controls, function() {
                var bRet = false;
                if ("deleteButton" == e.source.clickName) {
                    if (view_enabled && e.row) {
                        var alertDialogDeleteMediaContent = Titanium.UI.createAlertDialog({
                            title: L("generic_delete_section_data_title"),
                            message: L("delete_section_data_msg"),
                            buttonNames: [ L("generic_yes_msg"), L("generic_no_msg") ],
                            cancel: 1
                        });
                        alertDialogDeleteMediaContent.addEventListener("click", function(event) {
                            if (0 == event.index) {
                                var sectionData = GetSectionData();
                                sectionData.data.length > 0 && sectionData.data.splice(e.index, 1);
                                if (e.row.rowId && -1 != e.row.rowId) {
                                    var section_table = sectionData.table;
                                    var recoverMedia = Alloy.createCollection(section_table);
                                    recoverMedia.fetch({
                                        query: "SELECT * FROM " + section_table + " where ID = " + e.row.rowId
                                    });
                                    while (recoverMedia.length > 0) {
                                        var model = recoverMedia.at(0);
                                        recoverMedia.remove(model);
                                        model.destroy();
                                    }
                                }
                                $.tableViewBAEAModeFormsManageSection.deleteRow(e.index);
                                $.tableViewBAEAModeFormsManageSection.setHeight(50 * $.tableViewBAEAModeFormsManageSection.data[0].rows.length);
                                $.tableViewBAEAModeFormsManageSection.setVisible($.tableViewBAEAModeFormsManageSection.data[0] && $.tableViewBAEAModeFormsManageSection.data[0].rows && $.tableViewBAEAModeFormsManageSection.data[0].rows.length > 0 ? true : false);
                            }
                        });
                        alertDialogDeleteMediaContent.show();
                    }
                } else {
                    var sectionData = GetSectionData();
                    if (sectionData.data.length > 0 && sectionData.view) {
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_manage_section:record_new", AddOnTopNewSectionTableViewRow);
                        Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_manage_section:record_update", UpdateSectionTableViewRow);
                        Alloy.Globals.createAndOpenControllerExt(sectionData.view, {
                            form_id: current_form_id,
                            global_ar_index: e.index,
                            is_synchronized: current_is_synchronized
                        });
                    }
                }
                bRet = true;
                return bRet;
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnAdd_Click() {
        try {
            var sectionData = GetSectionData();
            if (sectionData.view) {
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_manage_section:record_new", AddOnTopNewSectionTableViewRow);
                Alloy.Globals.ProtectedAddEventListener(Ti.App, "baea_mode_manage_section:record_update", UpdateSectionTableViewRow);
                Alloy.Globals.createAndOpenControllerExt(sectionData.view, {
                    form_id: current_form_id,
                    global_ar_index: -1,
                    is_synchronized: current_is_synchronized
                });
            }
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function AddOnTopNewSectionTableViewRow() {
        var sectionData = GetSectionData();
        $.tableViewBAEAModeFormsManageSection.data[0] && $.tableViewBAEAModeFormsManageSection.data[0].rows && $.tableViewBAEAModeFormsManageSection.data[0].rows.length > 0 ? $.tableViewBAEAModeFormsManageSection.insertRowBefore(0, CreateSectionTableViewRow(sectionData.data[0])) : $.tableViewBAEAModeFormsManageSection.appendRow(CreateSectionTableViewRow(sectionData.data[0]));
        $.tableViewBAEAModeFormsManageSection.setVisible(true);
        $.tableViewBAEAModeFormsManageSection.setHeight(50 * $.tableViewBAEAModeFormsManageSection.data[0].rows.length);
    }
    function UpdateSectionTableViewRow(e) {
        $.tableViewBAEAModeFormsManageSection.data[0].rows[e.index].children[0].setText(e.value ? e.value : L("generic_empty_site_text_msg"));
    }
    function CreateSectionTableViewRow(section_data) {
        var row = Ti.UI.createTableViewRow();
        "ID" in section_data && (row.rowId = section_data["ID"]);
        row.setHeight(50);
        var labelMsg = null;
        labelMsg = section_data["SITE"] ? section_data["SITE"] : L("generic_empty_site_text_msg");
        var label = Ti.UI.createLabel({
            left: 5,
            width: 130,
            text: labelMsg
        });
        row.add(label);
        var deleteButton = Ti.UI.createButton({
            color: "black",
            backgroundColor: "red",
            title: L("generic_delete_title"),
            right: 8,
            width: 105,
            clickName: "deleteButton",
            height: 34
        });
        row.add(deleteButton);
        row.className = "SectionData";
        return row;
    }
    function GetSectionData() {
        var arSectionData = {
            data: new Array(),
            table: "",
            view: ""
        };
        switch (current_type) {
          case "FR":
            arSectionData = {
                data: Alloy.Globals.BAEAModeFaultRupture,
                table: "BAEAFormsFaultRupture",
                view: "BAEAModeFormsFaultRuptureView",
                title: "baea_mode_section_fault_rupture_title"
            };
            break;

          case "LQ":
            arSectionData = {
                data: Alloy.Globals.BAEAModeLiquefaction,
                table: "BAEAFormsLiquefaction",
                view: "BAEAModeFormsLiquefactionView",
                title: "baea_mode_section_liquefaction_title"
            };
            break;

          case "LA":
            arSectionData = {
                data: Alloy.Globals.BAEAModeLandslide,
                table: "BAEAFormsLandslide",
                view: "BAEAModeFormsLandslideView",
                title: "baea_mode_section_landslide_title"
            };
            break;

          case "TS":
            arSectionData = {
                data: Alloy.Globals.BAEAModeTsunami,
                table: "BAEAFormsTsunami",
                view: "BAEAModeFormsTsunamiView",
                title: "baea_mode_section_tsunami_title"
            };
            break;

          case "LI":
            arSectionData = {
                data: Alloy.Globals.BAEAModeLifelines,
                table: "BAEAFormsLifelines",
                view: "BAEAModeFormsLifelinesView",
                title: "baea_mode_section_lifelines_title"
            };
            break;

          case "BU":
            arSectionData = {
                data: Alloy.Globals.BAEAModeBuildings,
                table: "BAEAFormsBuildings",
                view: "BAEAModeFormsBuildingsView",
                title: "baea_mode_section_buildings_title"
            };
            break;

          case "GE":
            arSectionData = {
                data: Alloy.Globals.BAEAModeGeneral,
                table: "BAEAFormsGeneral",
                view: "BAEAModeFormsGeneralView",
                title: "baea_mode_section_general_title"
            };
        }
        return arSectionData;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsManageSectionView";
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
    $.__views.baeaModeFormsManageSectionViewWindow = Ti.UI.createWindow({
        title: L("baea_mode_forms_manage_section_view_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeFormsManageSectionViewWindow"
    });
    $.__views.baeaModeFormsManageSectionViewWindow && $.addTopLevelView($.__views.baeaModeFormsManageSectionViewWindow);
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsManageSectionViewWindow.addEventListener("android:back", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsManageSectionViewWindow!android:back!OnAndroidBackButton_Click"] = true;
    OnAndroidBackButton_Click ? $.__views.baeaModeFormsManageSectionViewWindow.addEventListener("androidback", OnAndroidBackButton_Click) : __defers["$.__views.baeaModeFormsManageSectionViewWindow!androidback!OnAndroidBackButton_Click"] = true;
    $.__views.activity_indicator = Ti.UI.createActivityIndicator({
        id: "activity_indicator"
    });
    $.__views.baeaModeFormsManageSectionViewWindow.add($.__views.activity_indicator);
    $.__views.viewAppButtonAdd = Ti.UI.createView({
        top: 5,
        width: 60,
        id: "viewAppButtonAdd"
    });
    $.__views.baeaModeFormsManageSectionViewWindow.add($.__views.viewAppButtonAdd);
    $.__views.widgetAppButtonAdd = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonAdd",
        __parentSymbol: $.__views.viewAppButtonAdd
    });
    $.__views.widgetAppButtonAdd.setParent($.__views.viewAppButtonAdd);
    $.__views.scrollViewBAEAModeFormsManageSectionView = Ti.UI.createScrollView({
        top: 120,
        scrollType: "vertical",
        id: "scrollViewBAEAModeFormsManageSectionView"
    });
    $.__views.baeaModeFormsManageSectionViewWindow.add($.__views.scrollViewBAEAModeFormsManageSectionView);
    $.__views.tableViewBAEAModeFormsManageSection = Ti.UI.createTableView({
        top: 0,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        id: "tableViewBAEAModeFormsManageSection"
    });
    $.__views.scrollViewBAEAModeFormsManageSectionView.add($.__views.tableViewBAEAModeFormsManageSection);
    OnTableViewBAEAModeFormsManageSection_Click ? $.__views.tableViewBAEAModeFormsManageSection.addEventListener("click", OnTableViewBAEAModeFormsManageSection_Click) : __defers["$.__views.tableViewBAEAModeFormsManageSection!click!OnTableViewBAEAModeFormsManageSection_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_form_id = args.form_id;
    var current_type = args.type;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    var controls = new Array();
    controls.push($.tableViewBAEAModeFormsManageSection);
    var bIsWorkInProgress = false;
    try {
        var table_data = [];
        var sectionData = GetSectionData();
        for (var i = 0; i < sectionData.data.length; i++) table_data.push(CreateSectionTableViewRow(sectionData.data[i]));
        $.tableViewBAEAModeFormsManageSection.setData(table_data);
        $.baeaModeFormsManageSectionViewWindow.setTitle($.baeaModeFormsManageSectionViewWindow.getTitle() + " " + L(sectionData.title));
        $.widgetAppButtonAdd.init("/images/add_form_normal.png", "/images/add_form_pressed.png", "/images/add_form_disabled.png", L("generic_add_msg"), OnBtnAdd_Click);
        $.widgetAppButtonAdd.enabled(view_enabled);
        $.tableViewBAEAModeFormsManageSection.setHeight(50 * table_data.length);
        $.tableViewBAEAModeFormsManageSection.setVisible(table_data.length > 0 ? true : false);
        $.baeaModeFormsManageSectionViewWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.baeaModeFormsManageSectionViewWindow!android:back!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsManageSectionViewWindow.addEventListener("android:back", OnAndroidBackButton_Click);
    __defers["$.__views.baeaModeFormsManageSectionViewWindow!androidback!OnAndroidBackButton_Click"] && $.__views.baeaModeFormsManageSectionViewWindow.addEventListener("androidback", OnAndroidBackButton_Click);
    __defers["$.__views.tableViewBAEAModeFormsManageSection!click!OnTableViewBAEAModeFormsManageSection_Click"] && $.__views.tableViewBAEAModeFormsManageSection.addEventListener("click", OnTableViewBAEAModeFormsManageSection_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;