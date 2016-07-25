// This is the model for the ShedFormsInfrastructure table on DB
exports.definition = {
    config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "PRIMARY_GIRDERS": "TEXT" ,
            "THICKNESS_OF_THE_TILES": "TEXT" ,
            "TYPICAL_LIGHTS": "TEXT" ,
            "COVERAGE": "TEXT" ,
            "INCLINATION_OF_THE_ROOF": "TEXT" ,
            "INFILL_ELEMENTS": "TEXT" ,
            "VERTICAL_WALLS": "TEXT" ,
            "SHELVING": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ShedFormsInfrastructure" ,
            db_name: "EEM" ,
            idAttribute: "FORM_ID"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
        });

        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here
        });

        return Collection;
    }
};
