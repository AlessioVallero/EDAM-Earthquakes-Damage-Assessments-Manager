var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            COMPONENT_NUMBER: "integer",
            SIGN_PATH: "text",
            NAME: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "TeamPD",
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

model = Alloy.M("TeamPD", exports.definition, []);

collection = Alloy.C("TeamPD", exports.definition, model);

exports.Model = model;

exports.Collection = collection;