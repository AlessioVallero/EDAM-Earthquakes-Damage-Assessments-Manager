var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            SITE: "TEXT",
            NOT_UNDERGROUND_PLANS_NO: "TEXT",
            USAGE: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ShedFormsShedsCharacteristics",
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

model = Alloy.M("ShedFormsShedsCharacteristics", exports.definition, [ function(migration) {
    migration.name = "ShedFormsShedsCharacteristics";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                SITE: "TEXT",
                NOT_UNDERGROUND_PLANS_NO: "TEXT",
                USAGE: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "ShedFormsShedsCharacteristics";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'ShedPapersShedsCharacteristics';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , SITE , NOT_UNDERGROUND_PLANS_NO , USAGE FROM ShedPapersShedsCharacteristics;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , SITE , NOT_UNDERGROUND_PLANS_NO , USAGE ) VALUES (? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("SITE"), rows.fieldByName("NOT_UNDERGROUND_PLANS_NO"), rows.fieldByName("USAGE"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS ShedPapersShedsCharacteristics;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("ShedFormsShedsCharacteristics", exports.definition, model);

exports.Model = model;

exports.Collection = collection;