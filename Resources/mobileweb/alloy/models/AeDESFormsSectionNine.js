var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            TOPIC: "TEXT",
            OTHER_COMMENTS: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsSectionNine",
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

model = Alloy.M("AeDESFormsSectionNine", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsSectionNine";
    migration.id = "20141012183000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                TOPIC: "TEXT",
                OTHER_COMMENTS: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsSectionNine";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionNine';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , TOPIC , OTHER_COMMENTS FROM AeDESPapersSectionNine;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , TOPIC , OTHER_COMMENTS ) VALUES (? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("TOPIC"), rows.fieldByName("OTHER_COMMENTS"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersSectionNine;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("AeDESFormsSectionNine", exports.definition, model);

exports.Model = model;

exports.Collection = collection;