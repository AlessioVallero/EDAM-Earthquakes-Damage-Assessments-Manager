var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            ID: "integer PRIMARY KEY AUTOINCREMENT",
            FORM_NO: "TEXT",
            DATE: "TEXT",
            USER: "TEXT",
            SYNCHRONIZED: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "UsersResidentsForms",
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

model = Alloy.M("UsersResidentsForms", exports.definition, [ function(migration) {
    migration.name = "UsersResidentsForms";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                ID: "integer PRIMARY KEY AUTOINCREMENT",
                FORM_NO: "TEXT",
                DATE: "TEXT",
                USER: "TEXT",
                SYNCHRONIZED: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "UsersResidentsForms";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapers';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT ID , PAPER_NO , DATE , USER , SYNCHRONIZED FROM BasicPapers;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( ID , FORM_NO , DATE , USER , SYNCHRONIZED ) VALUES (? , ? , ? , ? , ?)", rows.fieldByName("ID"), rows.fieldByName("PAPER_NO"), rows.fieldByName("DATE"), rows.fieldByName("USER"), rows.fieldByName("SYNCHRONIZED"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS BasicPapers;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("UsersResidentsForms", exports.definition, model);

exports.Model = model;

exports.Collection = collection;