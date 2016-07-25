var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            PREVIOUS_POSTING: "TEXT",
            PREVIOUS_POSTING_INSPECTOR_ID: "TEXT",
            PREVIOUS_POSTING_DATE: "TEXT",
            POSTING: "TEXT",
            CLASSIFICATION: "TEXT",
            USE_AND_ENTRY_RESTRICTIONS: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20FormsDetailedPosting",
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

model = Alloy.M("ATC20FormsDetailedPosting", exports.definition, [ function(migration) {
    migration.name = "ATC20FormsDetailedPosting";
    migration.id = "20150601203000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                PREVIOUS_POSTING: "TEXT",
                PREVIOUS_POSTING_INSPECTOR_ID: "TEXT",
                PREVIOUS_POSTING_DATE: "TEXT",
                POSTING: "TEXT",
                CLASSIFICATION: "TEXT",
                USE_AND_ENTRY_RESTRICTIONS: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "ATC20FormsDetailedPosting";
    migration.id = "20150602203000";
    migration.up = function(migrator) {
        var fieldExists = false;
        var resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("CLASSIFICATION" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        resultSet.close();
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN CLASSIFICATION TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET CLASSIFICATION = '0';");
        }
    };
    migration.down = function(migrator) {
        var db = migrator.db;
        var table = migrator.table;
        db.execute("CREATE TEMPORARY TABLE ATC20FormsDetailedPosting_backup( FORM_ID , PREVIOUS_POSTING , PREVIOUS_POSTING_INSPECTOR_ID , PREVIOUS_POSTING_DATE , POSTING , USE_AND_ENTRY_RESTRICTIONS );");
        db.execute("INSERT INTO ATC20FormsDetailedPosting_backup SELECT FORM_ID , PREVIOUS_POSTING , PREVIOUS_POSTING_INSPECTOR_ID , PREVIOUS_POSTING_DATE , POSTING , USE_AND_ENTRY_RESTRICTIONS FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                PREVIOUS_POSTING: "TEXT",
                PREVIOUS_POSTING_INSPECTOR_ID: "TEXT",
                PREVIOUS_POSTING_DATE: "TEXT",
                POSTING: "TEXT",
                USE_AND_ENTRY_RESTRICTIONS: "TEXT"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT FORM_ID , PREVIOUS_POSTING , PREVIOUS_POSTING_INSPECTOR_ID , PREVIOUS_POSTING_DATE , POSTING , USE_AND_ENTRY_RESTRICTIONS FROM ATC20FormsDetailedPosting_backup;");
        db.execute("DROP TABLE ATC20FormsDetailedPosting_backup;");
    };
} ]);

collection = Alloy.C("ATC20FormsDetailedPosting", exports.definition, model);

exports.Model = model;

exports.Collection = collection;