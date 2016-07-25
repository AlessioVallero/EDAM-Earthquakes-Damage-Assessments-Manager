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
            BUILDING_POSITION: "TEXT",
            B_NAME_OR_OWNER: "TEXT",
            CODE_OF_USE: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsSectionOne",
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

model = Alloy.M("AeDESFormsSectionOne", exports.definition, [ function(migration) {
    migration.name = "AeDESFormsSectionOne";
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
                BUILDING_POSITION: "TEXT",
                B_NAME_OR_OWNER: "TEXT",
                CODE_OF_USE: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "AeDESFormsSectionOne";
    migration.id = "20141012203000";
    migration.up = function(migrator) {
        try {
            var rs = migrator.db.execute("SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionOne';");
        } catch (exception) {}
        if (rs && rs.isValidRow() && 0 != rs.field(0)) {
            rs.close();
            var rows = migrator.db.execute("SELECT PAPER_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , BUILDING_POSITION , B_NAME_OR_OWNER , CODE_OF_USE FROM AeDESPapersSectionOne;");
            while (rows.isValidRow()) {
                migrator.db.execute("INSERT INTO " + migrator.table + "( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , BUILDING_POSITION , B_NAME_OR_OWNER , CODE_OF_USE ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)", rows.fieldByName("PAPER_ID"), rows.fieldByName("LATITUDE"), rows.fieldByName("LONGITUDE"), rows.fieldByName("ALTITUDE"), rows.fieldByName("PROVINCE"), rows.fieldByName("MUNICIPALITY"), rows.fieldByName("PLACE"), rows.fieldByName("ADDRESS"), rows.fieldByName("CIVIC_NO"), rows.fieldByName("BUILDING_POSITION"), rows.fieldByName("B_NAME_OR_OWNER"), rows.fieldByName("CODE_OF_USE"));
                rows.next();
            }
            rows.close();
            migrator.db.execute("DROP TABLE IF EXISTS AeDESPapersSectionOne;");
        } else ;
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("AeDESFormsSectionOne", exports.definition, model);

exports.Model = model;

exports.Collection = collection;