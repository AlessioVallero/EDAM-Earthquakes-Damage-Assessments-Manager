var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            EVALUATION: "TEXT",
            OTHER_OBSERVED_CONDITIONS: "TEXT",
            GENERAL_COMMENTS: "TEXT",
            ESTIMATED_BUILDING_DAMAGE: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20FormsRapidEvaluation",
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

model = Alloy.M("ATC20FormsRapidEvaluation", exports.definition, [ function(migration) {
    migration.name = "ATC20FormsRapidEvaluation";
    migration.id = "20150601203000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                EVALUATION: "TEXT",
                OTHER_OBSERVED_CONDITIONS: "TEXT",
                GENERAL_COMMENTS: "TEXT",
                ESTIMATED_BUILDING_DAMAGE: "TEXT"
            }
        });
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("ATC20FormsRapidEvaluation", exports.definition, model);

exports.Model = model;

exports.Collection = collection;