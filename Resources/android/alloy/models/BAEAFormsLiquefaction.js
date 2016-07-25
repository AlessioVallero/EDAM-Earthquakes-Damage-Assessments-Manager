var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            FORM_ID: "integer",
            DATE: "TEXT",
            SITE: "TEXT",
            LATITUDE: "TEXT",
            LONGITUDE: "TEXT",
            ADDRESS: "TEXT",
            SAND_BLOWS_OR_FISSURES: "TEXT",
            GROUND_SETTLEMENT: "TEXT",
            LATERAL_SPREADING: "TEXT",
            HORIZONTAL: "TEXT",
            VERTICAL: "TEXT",
            NOTES: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "BAEAFormsLiquefaction",
            db_name: "EEM",
            idAttribute: "ID"
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

model = Alloy.M("BAEAFormsLiquefaction", exports.definition, [ function(migration) {
    migration.name = "BAEAFormsLiquefaction";
    migration.id = "20150511123000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                SITE: "TEXT",
                LATITUDE: "TEXT",
                LONGITUDE: "TEXT",
                ADDRESS: "TEXT",
                SAND_BLOWS_OR_FISSURES: "TEXT",
                GROUND_SETTLEMENT: "TEXT",
                LATERAL_SPREADING: "TEXT",
                HORIZONTAL: "TEXT",
                VERTICAL: "TEXT",
                NOTES: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "BAEAFormsLiquefaction";
    migration.id = "20150518210000";
    migration.up = function(migrator) {
        var fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("DATE" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN DATE TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET DATE = '';");
        }
    };
    migration.down = function(migrator) {
        var db = migrator.db;
        var table = migrator.table;
        db.execute("CREATE TEMPORARY TABLE BAEAFormsLiquefaction_backup( ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , SAND_BLOWS_OR_FISSURES , GROUND_SETTLEMENT , LATERAL_SPREADING , HORIZONTAL , VERTICAL , NOTES );");
        db.execute("INSERT INTO BAEAFormsLiquefaction_backup SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , SAND_BLOWS_OR_FISSURES , GROUND_SETTLEMENT , LATERAL_SPREADING , HORIZONTAL , VERTICAL , NOTES FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                SITE: "TEXT",
                LATITUDE: "TEXT",
                LONGITUDE: "TEXT",
                ADDRESS: "TEXT",
                SAND_BLOWS_OR_FISSURES: "TEXT",
                GROUND_SETTLEMENT: "TEXT",
                LATERAL_SPREADING: "TEXT",
                HORIZONTAL: "TEXT",
                VERTICAL: "TEXT",
                NOTES: "TEXT"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , SAND_BLOWS_OR_FISSURES , GROUND_SETTLEMENT , LATERAL_SPREADING , HORIZONTAL , VERTICAL , NOTES FROM BAEAFormsLiquefaction_backup;");
        db.execute("DROP TABLE BAEAFormsLiquefaction_backup;");
    };
} ]);

collection = Alloy.C("BAEAFormsLiquefaction", exports.definition, model);

exports.Model = model;

exports.Collection = collection;