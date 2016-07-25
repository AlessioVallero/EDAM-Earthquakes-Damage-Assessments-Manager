var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            PLANS_NO: "TEXT",
            AVERAGE_HEIGHT_OF_FLOOR: "TEXT",
            UNDERGROUND_PLANS_NO: "TEXT",
            AVERAGE_SURFACE: "TEXT",
            CONSTRUCTION_AGE: "TEXT",
            RENOVATION_AGE: "TEXT",
            UNIT_OF_USE_HOUSING: "TEXT",
            UNIT_OF_USE_PRODUCTIVE: "TEXT",
            UNIT_OF_USE_COMMERCE: "TEXT",
            UNIT_OF_USE_OFFICES: "TEXT",
            UNIT_OF_USE_PUBLIC_SERVICES: "TEXT",
            UNIT_OF_USE_DEPOSIT: "TEXT",
            UNIT_OF_USE_STRATEGIC: "TEXT",
            UNIT_OF_USE_TOURISM: "TEXT",
            UTILIZATION: "TEXT",
            OCCUPANTS: "TEXT",
            PROPERTY: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsSectionTwo",
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

model = Alloy.M("AeDESFormsSectionTwo", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsSectionTwo";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                PLANS_NO: "TEXT",
                AVERAGE_HEIGHT_OF_FLOOR: "TEXT",
                UNDERGROUND_PLANS_NO: "TEXT",
                AVERAGE_SURFACE: "TEXT",
                CONSTRUCTION_AGE: "TEXT",
                RENOVATION_AGE: "TEXT",
                UNIT_OF_USE_HOUSING: "TEXT",
                UNIT_OF_USE_PRODUCTIVE: "TEXT",
                UNIT_OF_USE_COMMERCE: "TEXT",
                UNIT_OF_USE_OFFICES: "TEXT",
                UNIT_OF_USE_PUBLIC_SERVICES: "TEXT",
                UNIT_OF_USE_DEPOSIT: "TEXT",
                UNIT_OF_USE_STRATEGIC: "TEXT",
                UNIT_OF_USE_TOURISM: "TEXT",
                UTILIZATION: "TEXT",
                OCCUPANTS: "TEXT",
                PROPERTY: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsSectionTwo";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionTwo';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , PLANS_NO , AVERAGE_HEIGHT_OF_FLOOR , UNDERGROUND_PLANS_NO , AVERAGE_SURFACE , CONSTRUCTION_AGE , RENOVATION_AGE , UNIT_OF_USE_HOUSING , UNIT_OF_USE_PRODUCTIVE , UNIT_OF_USE_COMMERCE , UNIT_OF_USE_OFFICES , UNIT_OF_USE_PUBLIC_SERVICES , UNIT_OF_USE_DEPOSIT , UNIT_OF_USE_STRATEGIC , UNIT_OF_USE_TOURISM , UTILIZATION , OCCUPANTS , PROPERTY FROM AeDESPapersSectionTwo;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , PLANS_NO , AVERAGE_HEIGHT_OF_FLOOR , UNDERGROUND_PLANS_NO , AVERAGE_SURFACE , CONSTRUCTION_AGE , RENOVATION_AGE , UNIT_OF_USE_HOUSING , UNIT_OF_USE_PRODUCTIVE , UNIT_OF_USE_COMMERCE , UNIT_OF_USE_OFFICES , UNIT_OF_USE_PUBLIC_SERVICES , UNIT_OF_USE_DEPOSIT , UNIT_OF_USE_STRATEGIC , UNIT_OF_USE_TOURISM , UTILIZATION , OCCUPANTS , PROPERTY ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("PLANS_NO"), rows.fieldByName("AVERAGE_HEIGHT_OF_FLOOR"), rows.fieldByName("UNDERGROUND_PLANS_NO"), rows.fieldByName("AVERAGE_SURFACE"), rows.fieldByName("CONSTRUCTION_AGE"), rows.fieldByName("RENOVATION_AGE"), rows.fieldByName("UNIT_OF_USE_HOUSING"), rows.fieldByName("UNIT_OF_USE_PRODUCTIVE"), rows.fieldByName("UNIT_OF_USE_COMMERCE"), rows.fieldByName("UNIT_OF_USE_OFFICES"), rows.fieldByName("UNIT_OF_USE_PUBLIC_SERVICES"), rows.fieldByName("UNIT_OF_USE_DEPOSIT"), rows.fieldByName("UNIT_OF_USE_STRATEGIC"), rows.fieldByName("UNIT_OF_USE_TOURISM"), rows.fieldByName("UTILIZATION"), rows.fieldByName("OCCUPANTS"), rows.fieldByName("PROPERTY"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersSectionTwo;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("AeDESFormsSectionTwo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;