var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            OPERATOR: "TEXT",
            USER: "TEXT",
            SYNCHRONIZED: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "BAEAForms",
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

model = Alloy.M("BAEAForms", exports.definition, [ function(migration) {
    migration.name = "BAEAForms";
    migration.id = "20150511123000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                OPERATOR: "TEXT",
                USER: "TEXT",
                SYNCHRONIZED: "TEXT"
            }
        });
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("BAEAForms", exports.definition, model);

exports.Model = model;

exports.Collection = collection;