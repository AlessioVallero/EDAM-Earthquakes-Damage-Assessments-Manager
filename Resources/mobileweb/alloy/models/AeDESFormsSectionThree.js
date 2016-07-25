var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            COVERAGE: "TEXT",
            PLAN_AND_ELEVATION: "TEXT",
            INFILL_DISPOSAL: "TEXT",
            ISOLATED_COLUMNS: "TEXT",
            MIXED: "TEXT",
            REINFORCED: "TEXT",
            REINFORCED_CONCRETE_FRAMES: "TEXT",
            REINFORCED_CONCRETE_WALLS: "TEXT",
            STEEL_FRAMES: "TEXT",
            MASONRY_STRUCTURES: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsSectionThree",
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

model = Alloy.M("AeDESFormsSectionThree", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsSectionThree";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                COVERAGE: "TEXT",
                PLAN_AND_ELEVATION: "TEXT",
                INFILL_DISPOSAL: "TEXT",
                ISOLATED_COLUMNS: "TEXT",
                MIXED: "TEXT",
                REINFORCED: "TEXT",
                REINFORCED_CONCRETE_FRAMES: "TEXT",
                REINFORCED_CONCRETE_WALLS: "TEXT",
                STEEL_FRAMES: "TEXT",
                MASONRY_STRUCTURES: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsSectionThree";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionThree';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , COVERAGE , PLAN_AND_ELEVATION , INFILL_DISPOSAL , ISOLATED_COLUMNS , MIXED , REINFORCED , REINFORCED_CONCRETE_FRAMES , REINFORCED_CONCRETE_WALLS , STEEL_FRAMES , MASONRY_STRUCTURES FROM AeDESPapersSectionThree;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , COVERAGE , PLAN_AND_ELEVATION , INFILL_DISPOSAL , ISOLATED_COLUMNS , MIXED , REINFORCED , REINFORCED_CONCRETE_FRAMES , REINFORCED_CONCRETE_WALLS , STEEL_FRAMES , MASONRY_STRUCTURES ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )", rows.fieldByName("PAPER_ID"), rows.fieldByName("COVERAGE"), rows.fieldByName("PLAN_AND_ELEVATION"), rows.fieldByName("INFILL_DISPOSAL"), rows.fieldByName("ISOLATED_COLUMNS"), rows.fieldByName("MIXED"), rows.fieldByName("REINFORCED"), rows.fieldByName("REINFORCED_CONCRETE_FRAMES"), rows.fieldByName("REINFORCED_CONCRETE_WALLS"), rows.fieldByName("STEEL_FRAMES"), rows.fieldByName("MASONRY_STRUCTURES"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersSectionThree;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("AeDESFormsSectionThree", exports.definition, model);

exports.Model = model;

exports.Collection = collection;