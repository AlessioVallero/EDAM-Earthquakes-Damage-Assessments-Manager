var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            POSTING: "TEXT",
            USE_AND_ENTRY_RESTRICTIONS: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20FormsRapidPosting",
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

model = Alloy.M("ATC20FormsRapidPosting", exports.definition, []);

collection = Alloy.C("ATC20FormsRapidPosting", exports.definition, model);

exports.Model = model;

exports.Collection = collection;