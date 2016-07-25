var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            FORM_ID: "integer",
            IMAGE_PATH: "TEXT",
            SECTION: "TEXT",
            SECTION_ID: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "BAEAFormsImages",
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

model = Alloy.M("BAEAFormsImages", exports.definition, [ function(migration) {
    migration.name = "BAEAFormsImages";
    migration.id = "20150511123000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                IMAGE_PATH: "TEXT",
                SECTION: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "BAEAFormsImages";
    migration.id = "20150515193000";
    migration.up = function(migrator) {
        var fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("SECTION_ID" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN SECTION_ID TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET SECTION_ID = '';");
        }
    };
    migration.down = function(migrator) {
        var db = migrator.db;
        var table = migrator.table;
        db.execute("CREATE TEMPORARY TABLE BAEAFormsImages_backup( ID , FORM_ID , IMAGE_PATH , SECTION );");
        db.execute("INSERT INTO BAEAFormsImages_backup SELECT ID , FORM_ID , IMAGE_PATH , SECTION FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                IMAGE_PATH: "TEXT",
                SECTION: "TEXT"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT ID , FORM_ID , IMAGE_PATH , SECTION FROM BAEAFormsImages_backup;");
        db.execute("DROP TABLE BAEAFormsImages_backup;");
    };
} ]);

collection = Alloy.C("BAEAFormsImages", exports.definition, model);

exports.Model = model;

exports.Collection = collection;