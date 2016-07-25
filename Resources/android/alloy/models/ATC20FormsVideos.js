var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            FORM_ID: "integer",
            VIDEO_PATH: "TEXT",
            LATITUDE: "TEXT",
            LONGITUDE: "TEXT",
            ADDRESS: "TEXT",
            HEADING: "TEXT",
            DAMAGES_LEVEL: "TEXT",
            DAMAGES_AREA: "TEXT",
            COMMENT: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20FormsVideos",
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

model = Alloy.M("ATC20FormsVideos", exports.definition, [ function(migration) {
    migration.name = "ATC20FormsVideos";
    migration.id = "20150601203000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                VIDEO_PATH: "TEXT",
                LATITUDE: "TEXT",
                LONGITUDE: "TEXT",
                ADDRESS: "TEXT",
                HEADING: "TEXT",
                DAMAGES_LEVEL: "TEXT",
                DAMAGES_AREA: "TEXT",
                COMMENT: "TEXT"
            }
        });
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("ATC20FormsVideos", exports.definition, model);

exports.Model = model;

exports.Collection = collection;