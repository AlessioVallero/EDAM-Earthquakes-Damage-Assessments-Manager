var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            SIGN_PATH: "text",
            NAME: "text",
            CELL_NUMBER: "text",
            AGE: "text",
            JOB: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "UsersResidentsPD",
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

model = Alloy.M("UsersResidentsPD", exports.definition, [ function(migration) {
    migration.name = "UsersResidentsPD";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                SIGN_PATH: "text",
                NAME: "text",
                CELL_NUMBER: "text",
                AGE: "text",
                JOB: "text"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "UsersResidentsPD";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPD';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT ID , SIGN_PATH , NAME , CELL_NUMBER , AGE , JOB FROM BasicPD;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( ID , SIGN_PATH , NAME , CELL_NUMBER , AGE , JOB ) VALUES (? , ? , ? , ? , ? , ?)", rows.fieldByName("ID"), rows.fieldByName("SIGN_PATH"), rows.fieldByName("NAME"), rows.fieldByName("CELL_NUMBER"), rows.fieldByName("AGE"), rows.fieldByName("JOB"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS BasicPD;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("UsersResidentsPD", exports.definition, model);

exports.Model = model;

exports.Collection = collection;