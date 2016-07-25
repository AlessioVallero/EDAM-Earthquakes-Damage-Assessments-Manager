var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            GROUND_BREAKS: "TEXT",
            WATER_LEAKS: "TEXT",
            GAS_LEAKS: "TEXT",
            ELECTRIC_CURRENT_OPERATION: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "UsersResidentsFormsInfrastructure",
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

model = Alloy.M("UsersResidentsFormsInfrastructure", exports.definition, [ function(migration) {
    migration.name = "UsersResidentsFormsInfrastructure";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                GROUND_BREAKS: "TEXT",
                WATER_LEAKS: "TEXT",
                GAS_LEAKS: "TEXT",
                ELECTRIC_CURRENT_OPERATION: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "UsersResidentsFormsInfrastructure";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapersInfrastructure';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , GROUND_BREAKS , WATER_LEAKS , GAS_LEAKS , ELECTRIC_CURRENT_OPERATION FROM BasicPapersInfrastructure;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , GROUND_BREAKS , WATER_LEAKS , GAS_LEAKS , ELECTRIC_CURRENT_OPERATION ) VALUES (? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("GROUND_BREAKS"), rows.fieldByName("WATER_LEAKS"), rows.fieldByName("GAS_LEAKS"), rows.fieldByName("ELECTRIC_CURRENT_OPERATION"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS BasicPapersInfrastructure;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("UsersResidentsFormsInfrastructure", exports.definition, model);

exports.Model = model;

exports.Collection = collection;