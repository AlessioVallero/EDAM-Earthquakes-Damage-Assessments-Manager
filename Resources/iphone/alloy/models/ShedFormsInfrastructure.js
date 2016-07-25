var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            PRIMARY_GIRDERS: "TEXT",
            THICKNESS_OF_THE_TILES: "TEXT",
            TYPICAL_LIGHTS: "TEXT",
            COVERAGE: "TEXT",
            INCLINATION_OF_THE_ROOF: "TEXT",
            INFILL_ELEMENTS: "TEXT",
            VERTICAL_WALLS: "TEXT",
            SHELVING: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ShedFormsInfrastructure",
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

model = Alloy.M("ShedFormsInfrastructure", exports.definition, [ function(migration) {
    migration.name = "ShedFormsInfrastructure";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                PRIMARY_GIRDERS: "TEXT",
                THICKNESS_OF_THE_TILES: "TEXT",
                TYPICAL_LIGHTS: "TEXT",
                COVERAGE: "TEXT",
                INCLINATION_OF_THE_ROOF: "TEXT",
                INFILL_ELEMENTS: "TEXT",
                VERTICAL_WALLS: "TEXT",
                SHELVING: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "ShedFormsInfrastructure";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'ShedPapersInfrastructure';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , PRIMARY_GIRDERS , THICKNESS_OF_THE_TILES , TYPICAL_LIGHTS , COVERAGE , INCLINATION_OF_THE_ROOF , INFILL_ELEMENTS , VERTICAL_WALLS , SHELVING FROM ShedPapersInfrastructure;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , PRIMARY_GIRDERS , THICKNESS_OF_THE_TILES , TYPICAL_LIGHTS , COVERAGE , INCLINATION_OF_THE_ROOF , INFILL_ELEMENTS , VERTICAL_WALLS , SHELVING ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("PRIMARY_GIRDERS"), rows.fieldByName("THICKNESS_OF_THE_TILES"), rows.fieldByName("TYPICAL_LIGHTS"), rows.fieldByName("COVERAGE"), rows.fieldByName("INCLINATION_OF_THE_ROOF"), rows.fieldByName("INFILL_ELEMENTS"), rows.fieldByName("VERTICAL_WALLS"), rows.fieldByName("SHELVING"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS ShedPapersInfrastructure;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("ShedFormsInfrastructure", exports.definition, model);

exports.Model = model;

exports.Collection = collection;