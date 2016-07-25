var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            MORPHOLOGY_SITE: "TEXT",
            SLOPES_LOOMING: "TEXT",
            SUBSOIL: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsSectionSeven",
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

model = Alloy.M("AeDESFormsSectionSeven", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsSectionSeven";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                MORPHOLOGY_SITE: "TEXT",
                SLOPES_LOOMING: "TEXT",
                SUBSOIL: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsSectionSeven";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionSeven';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , MORPHOLOGY_SITE , SLOPES_LOOMING , SUBSOIL FROM AeDESPapersSectionSeven;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , MORPHOLOGY_SITE , SLOPES_LOOMING , SUBSOIL ) VALUES (? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("MORPHOLOGY_SITE"), rows.fieldByName("SLOPES_LOOMING"), rows.fieldByName("SUBSOIL"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersSectionSeven;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("AeDESFormsSectionSeven", exports.definition, model);

exports.Model = model;

exports.Collection = collection;