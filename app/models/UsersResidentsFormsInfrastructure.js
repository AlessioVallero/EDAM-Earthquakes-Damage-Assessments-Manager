// This is the model for the UsersResidentsFormsInfrastructure table on DB
exports.definition = {
    config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "GROUND_BREAKS": "TEXT" ,
            "WATER_LEAKS": "TEXT" ,
            "GAS_LEAKS": "TEXT" ,
            "ELECTRIC_CURRENT_OPERATION": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "UsersResidentsFormsInfrastructure" ,
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
