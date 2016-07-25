var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            SIGN_PATH: "text",
            INSPECTOR_ID: "text",
            AFFILIATION: "text",
            MODE: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20PD",
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

model = Alloy.M("ATC20PD", exports.definition, [ function(migration) {
    migration.name = "ATC20PD";
    migration.id = "20150131120000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                SIGN_PATH: "text",
                INSPECTOR_ID: "text",
                AFFILIATION: "text",
                MODE: "text"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "ATC20PD";
    migration.id = "20150131130000";
    migration.up = function(migrator) {
        var fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("MODE" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN MODE TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET MODE = 'CA';");
        }
        fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("SIGN_PATH" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN SIGN_PATH TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET SIGN_PATH = '';");
        }
    };
    migration.down = function(migrator) {
        var db = migrator.db;
        var table = migrator.table;
        db.execute("CREATE TEMPORARY TABLE ATC20PD_backup( ID , INSPECTOR_ID , AFFILIATION );");
        db.execute("INSERT INTO ATC20PD_backup SELECT ID , INSPECTOR_ID , AFFILIATION FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                INSPECTOR_ID: "TEXT",
                AFFILIATION: "TEXT"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT ID , INSPECTOR_ID , AFFILIATION FROM ATC20PD_backup;");
        db.execute("DROP TABLE ATC20PD_backup;");
    };
} ]);

collection = Alloy.C("ATC20PD", exports.definition, model);

exports.Model = model;

exports.Collection = collection;