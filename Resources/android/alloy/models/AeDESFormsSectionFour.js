var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            DAMAGES: "TEXT",
            MEASURES_OF_EMERGENCY: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsSectionFour",
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

model = Alloy.M("AeDESFormsSectionFour", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsSectionFour";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                DAMAGES: "TEXT",
                MEASURES_OF_EMERGENCY: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsSectionFour";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionFour';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , DAMAGES , MEASURES_OF_EMERGENCY FROM AeDESPapersSectionFour;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , DAMAGES , MEASURES_OF_EMERGENCY ) VALUES (? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("DAMAGES"), rows.fieldByName("MEASURES_OF_EMERGENCY"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersSectionFour;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("AeDESFormsSectionFour", exports.definition, model);

exports.Model = model;

exports.Collection = collection;