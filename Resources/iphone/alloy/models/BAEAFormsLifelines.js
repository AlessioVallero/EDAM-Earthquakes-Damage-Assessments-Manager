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
            COMMUNICATION: "TEXT",
            ELECTRIC_POWER_DELIVERY: "TEXT",
            OTHER: "TEXT",
            FUNCTIONALITY: "TEXT",
            REPAIR_TIME: "TEXT",
            RECOMMEND_FURTHER_INVESTIGATION: "TEXT",
            NOTES: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "BAEAFormsLifelines",
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

model = Alloy.M("BAEAFormsLifelines", exports.definition, [ function(migration) {
    migration.name = "BAEAFormsLifelines";
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
                COMMUNICATION: "TEXT",
                ELECTRIC_POWER_DELIVERY: "TEXT",
                OTHER: "TEXT",
                FUNCTIONALITY: "TEXT",
                REPAIR_TIME: "TEXT",
                RECOMMEND_FURTHER_INVESTIGATION: "TEXT",
                NOTES: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "BAEAFormsLifelines";
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
        db.execute("CREATE TEMPORARY TABLE BAEAFormsTsunami_backup( ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , COMMUNICATION , ELECTRIC_POWER_DELIVERY , OTHER , FUNCTIONALITY , REPAIR_TIME , RECOMMEND_FURTHER_INVESTIGATION , NOTES );");
        db.execute("INSERT INTO BAEAFormsTsunami_backup SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , COMMUNICATION , ELECTRIC_POWER_DELIVERY , OTHER , FUNCTIONALITY , REPAIR_TIME , RECOMMEND_FURTHER_INVESTIGATION , NOTES FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                SITE: "TEXT",
                LATITUDE: "TEXT",
                LONGITUDE: "TEXT",
                ADDRESS: "TEXT",
                COMMUNICATION: "TEXT",
                ELECTRIC_POWER_DELIVERY: "TEXT",
                OTHER: "TEXT",
                FUNCTIONALITY: "TEXT",
                REPAIR_TIME: "TEXT",
                RECOMMEND_FURTHER_INVESTIGATION: "TEXT",
                NOTES: "TEXT"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , COMMUNICATION , ELECTRIC_POWER_DELIVERY , OTHER , FUNCTIONALITY , REPAIR_TIME , RECOMMEND_FURTHER_INVESTIGATION , NOTES FROM BAEAFormsTsunami_backup;");
        db.execute("DROP TABLE BAEAFormsTsunami_backup;");
    };
} ]);

collection = Alloy.C("BAEAFormsLifelines", exports.definition, model);

exports.Model = model;

exports.Collection = collection;