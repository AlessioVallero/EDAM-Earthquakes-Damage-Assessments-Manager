var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            STRUCTURAL: "TEXT",
            NOT_STRUCTURAL: "TEXT",
            EXTERNAL: "TEXT",
            GEOTECHNICAL: "TEXT",
            OUTCOME_PRACTICABILITY: "TEXT",
            HOUSING_UNITS_UNINHABITABLE: "TEXT",
            FAMILIES_EVACUATED: "TEXT",
            EVACUEES_N: "TEXT",
            ACCURACY_VISIT: "TEXT",
            OTHER: "TEXT",
            MEASURES_OF_EMERGENCY: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsSectionEight",
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

model = Alloy.M("AeDESFormsSectionEight", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsSectionEight";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                STRUCTURAL: "TEXT",
                NOT_STRUCTURAL: "TEXT",
                EXTERNAL: "TEXT",
                GEOTECHNICAL: "TEXT",
                OUTCOME_PRACTICABILITY: "TEXT",
                HOUSING_UNITS_UNINHABITABLE: "TEXT",
                FAMILIES_EVACUATED: "TEXT",
                EVACUEES_N: "TEXT",
                ACCURACY_VISIT: "TEXT",
                OTHER: "TEXT",
                MEASURES_OF_EMERGENCY: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsSectionEight";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionEight';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER , MEASURES_OF_EMERGENCY FROM AeDESPapersSectionEight;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER , MEASURES_OF_EMERGENCY ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("STRUCTURAL"), rows.fieldByName("NOT_STRUCTURAL"), rows.fieldByName("EXTERNAL"), rows.fieldByName("GEOTECHNICAL"), rows.fieldByName("OUTCOME_PRACTICABILITY"), rows.fieldByName("HOUSING_UNITS_UNINHABITABLE"), rows.fieldByName("FAMILIES_EVACUATED"), rows.fieldByName("EVACUEES_N"), rows.fieldByName("ACCURACY_VISIT"), rows.fieldByName("OTHER"), rows.fieldByName("MEASURES_OF_EMERGENCY"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersSectionEight;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("AeDESFormsSectionEight", exports.definition, model);

exports.Model = model;

exports.Collection = collection;