var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            BARRICADES_IN_THE_FOLLOWING_AREAS: "TEXT",
            EVALUATION_RECOMMENDED: "TEXT",
            OTHER_EVALUATION_RECOMMENDED: "TEXT",
            OTHER_RECOMMENDATIONS: "TEXT",
            COMMENTS: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20FormsFurtherActions",
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

model = Alloy.M("ATC20FormsFurtherActions", exports.definition, [ function(migration) {
    migration.name = "ATC20FormsFurtherActions";
    migration.id = "20150601203000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                BARRICADES_IN_THE_FOLLOWING_AREAS: "TEXT",
                EVALUATION_RECOMMENDED: "TEXT",
                OTHER_EVALUATION_RECOMMENDED: "TEXT",
                OTHER_RECOMMENDATIONS: "TEXT",
                COMMENTS: "TEXT"
            }
        });
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("ATC20FormsFurtherActions", exports.definition, model);

exports.Model = model;

exports.Collection = collection;