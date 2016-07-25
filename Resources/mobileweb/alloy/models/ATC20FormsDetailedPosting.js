var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            PREVIOUS_POSTING: "TEXT",
            PREVIOUS_POSTING_INSPECTOR_ID: "TEXT",
            PREVIOUS_POSTING_DATE: "TEXT",
            POSTING: "TEXT",
            USE_AND_ENTRY_RESTRICTIONS: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20FormsDetailedPosting",
            db_name: "EEM",
            idAttribute: "FORM_ID"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("ATC20FormsDetailedPosting", exports.definition, []);

collection = Alloy.C("ATC20FormsDetailedPosting", exports.definition, model);

exports.Model = model;

exports.Collection = collection;