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
            OTHER: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ShedFormsJudgmentOfPracticability",
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

model = Alloy.M("ShedFormsJudgmentOfPracticability", exports.definition, [ function(migration) {
    migration.name = "ShedFormsJudgmentOfPracticability";
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
                OTHER: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "ShedFormsJudgmentOfPracticability";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'ShedPapersJudgmentOfPracticability';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER FROM ShedPapersJudgmentOfPracticability;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("STRUCTURAL"), rows.fieldByName("NOT_STRUCTURAL"), rows.fieldByName("EXTERNAL"), rows.fieldByName("GEOTECHNICAL"), rows.fieldByName("OUTCOME_PRACTICABILITY"), rows.fieldByName("HOUSING_UNITS_UNINHABITABLE"), rows.fieldByName("FAMILIES_EVACUATED"), rows.fieldByName("EVACUEES_N"), rows.fieldByName("ACCURACY_VISIT"), rows.fieldByName("OTHER"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS ShedPapersJudgmentOfPracticability;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("ShedFormsJudgmentOfPracticability", exports.definition, model);

exports.Model = model;

exports.Collection = collection;