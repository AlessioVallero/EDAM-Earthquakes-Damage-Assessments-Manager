var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            SITE: "TEXT",
            UNDERGROUND_PLANS_NO: "TEXT",
            NOT_UNDERGROUND_PLANS_NO: "TEXT",
            USAGE: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "UsersResidentsFormsBuildingsCharacteristics",
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

model = Alloy.M("UsersResidentsFormsBuildingsCharacteristics", exports.definition, [ function(migration) {
    migration.name = "UsersResidentsFormsBuildingsCharacteristics";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                SITE: "TEXT",
                UNDERGROUND_PLANS_NO: "TEXT",
                NOT_UNDERGROUND_PLANS_NO: "TEXT",
                USAGE: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "UsersResidentsFormsBuildingsCharacteristics";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapersBuildingsCharacteristics';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , SITE , UNDERGROUND_PLANS_NO , NOT_UNDERGROUND_PLANS_NO , USAGE FROM BasicPapersBuildingsCharacteristics;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , SITE , UNDERGROUND_PLANS_NO , NOT_UNDERGROUND_PLANS_NO , USAGE ) VALUES (? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("SITE"), rows.fieldByName("UNDERGROUND_PLANS_NO"), rows.fieldByName("NOT_UNDERGROUND_PLANS_NO"), rows.fieldByName("USAGE"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS BasicPapersBuildingsCharacteristics;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("UsersResidentsFormsBuildingsCharacteristics", exports.definition, model);

exports.Model = model;

exports.Collection = collection;