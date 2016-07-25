var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            FORM_ID: "integer",
            IMAGE_PATH: "TEXT",
            LATITUDE: "TEXT",
            LONGITUDE: "TEXT",
            ADDRESS: "TEXT",
            HEADING: "TEXT",
            DAMAGES_LEVEL: "TEXT",
            DAMAGES_AREA: "TEXT",
            COMMENT: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsImages",
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

model = Alloy.M("AeDESFormsImages", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsImages";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                IMAGE_PATH: "TEXT",
                LATITUDE: "TEXT",
                LONGITUDE: "TEXT",
                ADDRESS: "TEXT",
                DAMAGES_LEVEL: "TEXT",
                DAMAGES_AREA: "TEXT",
                COMMENT: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsImages";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersImages';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT ID , PAPER_ID , IMAGE_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT FROM AeDESPapersImages;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( ID , FORM_ID , IMAGE_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)", rows.fieldByName("ID"), rows.fieldByName("PAPER_ID"), rows.fieldByName("IMAGE_PATH"), rows.fieldByName("LATITUDE"), rows.fieldByName("LONGITUDE"), rows.fieldByName("ADDRESS"), rows.fieldByName("DAMAGES_LEVEL"), rows.fieldByName("DAMAGES_AREA"), rows.fieldByName("COMMENT"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersImages;");
        } else ;
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsImages";
    migration.id = "20141018140000";
    migration.up = function(migrator) {
        migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN HEADING TEXT;");
    };
    migration.down = function(migrator) {
        var db = migrator.db;
        var table = migrator.table;
        db.execute("CREATE TEMPORARY TABLE AeDESFormsImages_backup( ID , FORM_ID , IMAGE_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT );");
        db.execute("INSERT INTO AeDESFormsImages_backup SELECT ID , FORM_ID , IMAGE_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_ID: "integer",
                IMAGE_PATH: "TEXT",
                LATITUDE: "TEXT",
                LONGITUDE: "TEXT",
                ADDRESS: "TEXT",
                DAMAGES_LEVEL: "TEXT",
                DAMAGES_AREA: "TEXT",
                COMMENT: "TEXT"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT ID , FORM_ID , IMAGE_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT FROM AeDESFormsImages_backup;");
        db.execute("DROP TABLE AeDESFormsImages_backup;");
    };
} ]);

collection = Alloy.C("AeDESFormsImages", exports.definition, model);

exports.Model = model;

exports.Collection = collection;