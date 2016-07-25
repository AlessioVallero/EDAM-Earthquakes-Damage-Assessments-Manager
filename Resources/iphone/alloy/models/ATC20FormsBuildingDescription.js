var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            FORM_ID: "integer PRIMARY KEY",
            BUILDING_NAME: "TEXT",
            ALSO_KNOWN_AS: "TEXT",
            LOT: "TEXT",
            DP: "TEXT",
            OTHER_ID: "TEXT",
            CONTACT_NAME: "TEXT",
            ADDRESS: "TEXT",
            BUILDING_CONTACT: "TEXT",
            UNDERGROUND_PLANS_NO: "TEXT",
            NOT_UNDERGROUND_PLANS_NO: "TEXT",
            APPROX_FT_AREA: "TEXT",
            RESIDENTIAL_UNITS: "TEXT",
            RESIDENTIAL_UNITS_UNINHABITABLE: "TEXT",
            TYPE_OF_CONSTRUCTION: "TEXT",
            OTHER_TYPE_OF_CONSTRUCTION: "TEXT",
            PRIMARY_OCCUPANCY: "TEXT",
            OTHER_PRIMARY_OCCUPANCY: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ATC20FormsBuildingDescription",
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

model = Alloy.M("ATC20FormsBuildingDescription", exports.definition, [ function(migration) {
    migration.name = "ATC20FormsBuildingDescription";
    migration.id = "20150131120000";
    migration.up = function(migrator) {
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                BUILDING_NAME: "TEXT",
                ALSO_KNOWN_AS: "TEXT",
                LOT: "TEXT",
                DP: "TEXT",
                OTHER_ID: "TEXT",
                CONTACT_NAME: "TEXT",
                ADDRESS: "TEXT",
                BUILDING_CONTACT: "TEXT",
                UNDERGROUND_PLANS_NO: "TEXT",
                NOT_UNDERGROUND_PLANS_NO: "TEXT",
                APPROX_FT_AREA: "TEXT",
                RESIDENTIAL_UNITS: "TEXT",
                RESIDENTIAL_UNITS_UNINHABITABLE: "TEXT",
                TYPE_OF_CONSTRUCTION: "TEXT",
                OTHER_TYPE_OF_CONSTRUCTION: "TEXT",
                PRIMARY_OCCUPANCY: "TEXT",
                OTHER_PRIMARY_OCCUPANCY: "TEXT"
            }
        });
    };
    migration.down = function() {};
}, function(migration) {
    migration.name = "ATC20FormsBuildingDescription";
    migration.id = "20150131130000";
    migration.up = function(migrator) {
        var fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("ALSO_KNOWN_AS" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN ALSO_KNOWN_AS TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET ALSO_KNOWN_AS = '';");
        }
        fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("LOT" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN LOT TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET LOT = '';");
        }
        fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("DP" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN DP TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET DP = '';");
        }
        fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("OTHER_ID" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN OTHER_ID TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET OTHER_ID = '';");
        }
        fieldExists = false;
        resultSet = db.execute("PRAGMA TABLE_INFO(" + migrator.table + ")");
        while (resultSet.isValidRow()) {
            if ("CONTACT_NAME" == resultSet.field(1)) {
                fieldExists = true;
                break;
            }
            resultSet.next();
        }
        if (!fieldExists) {
            migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN CONTACT_NAME TEXT;");
            migrator.db.execute("UPDATE " + migrator.table + " SET CONTACT_NAME = '';");
        }
    };
    migration.down = function(migrator) {
        var db = migrator.db;
        var table = migrator.table;
        db.execute("CREATE TEMPORARY TABLE ATC20FormsBuildingDescription_backup( FORM_ID , BUILDING_NAME , ADDRESS , BUILDING_CONTACT , UNDERGROUND_PLANS_NO , NOT_UNDERGROUND_PLANS_NO , APPROX_FT_AREA , RESIDENTIAL_UNITS , RESIDENTIAL_UNITS_UNINHABITABLE , TYPE_OF_CONSTRUCTION , OTHER_TYPE_OF_CONSTRUCTION , PRIMARY_OCCUPANCY , OTHER_PRIMARY_OCCUPANCY );");
        db.execute("INSERT INTO ATC20FormsBuildingDescription_backup SELECT FORM_ID , BUILDING_NAME , ADDRESS , BUILDING_CONTACT , UNDERGROUND_PLANS_NO , NOT_UNDERGROUND_PLANS_NO , APPROX_FT_AREA , RESIDENTIAL_UNITS , RESIDENTIAL_UNITS_UNINHABITABLE , TYPE_OF_CONSTRUCTION , OTHER_TYPE_OF_CONSTRUCTION , PRIMARY_OCCUPANCY , OTHER_PRIMARY_OCCUPANCY FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                FORM_ID: "integer PRIMARY KEY",
                BUILDING_NAME: "TEXT",
                ADDRESS: "TEXT",
                BUILDING_CONTACT: "TEXT",
                UNDERGROUND_PLANS_NO: "TEXT",
                NOT_UNDERGROUND_PLANS_NO: "TEXT",
                APPROX_FT_AREA: "TEXT",
                RESIDENTIAL_UNITS: "TEXT",
                RESIDENTIAL_UNITS_UNINHABITABLE: "TEXT",
                TYPE_OF_CONSTRUCTION: "TEXT",
                OTHER_TYPE_OF_CONSTRUCTION: "TEXT",
                PRIMARY_OCCUPANCY: "TEXT",
                OTHER_PRIMARY_OCCUPANCY: "TEXT"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT FORM_ID , BUILDING_NAME , ADDRESS , BUILDING_CONTACT , UNDERGROUND_PLANS_NO , NOT_UNDERGROUND_PLANS_NO , APPROX_FT_AREA , RESIDENTIAL_UNITS , RESIDENTIAL_UNITS_UNINHABITABLE , TYPE_OF_CONSTRUCTION , OTHER_TYPE_OF_CONSTRUCTION , PRIMARY_OCCUPANCY , OTHER_PRIMARY_OCCUPANCY FROM ATC20FormsBuildingDescription_backup;");
        db.execute("DROP TABLE ATC20FormsBuildingDescription_backup;");
    };
} ]);

collection = Alloy.C("ATC20FormsBuildingDescription", exports.definition, model);

exports.Model = model;

exports.Collection = collection;