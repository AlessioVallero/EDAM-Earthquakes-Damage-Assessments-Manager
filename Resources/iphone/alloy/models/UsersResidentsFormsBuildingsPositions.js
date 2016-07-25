var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            LATITUDE: "TEXT",
            LONGITUDE: "TEXT",
            ALTITUDE: "TEXT",
            PROVINCE: "TEXT",
            MUNICIPALITY: "TEXT",
            PLACE: "TEXT",
            ADDRESS: "TEXT",
            CIVIC_NO: "TEXT",
            COMPILER_POS: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "UsersResidentsFormsBuildingsPositions",
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

model = Alloy.M("UsersResidentsFormsBuildingsPositions", exports.definition, [ function(migration) {
    migration.name = "UsersResidentsFormsBuildingsPositions";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                LATITUDE: "TEXT",
                LONGITUDE: "TEXT",
                ALTITUDE: "TEXT",
                PROVINCE: "TEXT",
                MUNICIPALITY: "TEXT",
                PLACE: "TEXT",
                ADDRESS: "TEXT",
                CIVIC_NO: "TEXT",
                COMPILER_POS: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "UsersResidentsFormsBuildingsPositions";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapersBuildingsPositions';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , COMPILER_POS FROM BasicPapersBuildingsPositions;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , COMPILER_POS) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("LATITUDE"), rows.fieldByName("LONGITUDE"), rows.fieldByName("ALTITUDE"), rows.fieldByName("PROVINCE"), rows.fieldByName("MUNICIPALITY"), rows.fieldByName("PLACE"), rows.fieldByName("ADDRESS"), rows.fieldByName("CIVIC_NO"), rows.fieldByName("COMPILER_POS"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS BasicPapersBuildingsPositions;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("UsersResidentsFormsBuildingsPositions", exports.definition, model);

exports.Model = model;

exports.Collection = collection;