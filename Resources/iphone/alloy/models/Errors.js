var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            DATE: "TEXT",
            ERR_MSG: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "Errors",
            db_name: "EEM",
            idAttribute: "ID"
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

model = Alloy.M("Errors", exports.definition, []);

collection = Alloy.C("Errors", exports.definition, model);

exports.Model = model;

exports.Collection = collection;