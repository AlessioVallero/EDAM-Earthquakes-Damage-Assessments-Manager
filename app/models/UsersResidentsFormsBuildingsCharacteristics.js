// This is the model for the UsersResidentsFormsBuildingsCharacteristics table on DB
exports.definition = {
    config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "SITE": "TEXT" ,
            "UNDERGROUND_PLANS_NO": "TEXT" ,
            "NOT_UNDERGROUND_PLANS_NO": "TEXT" ,
            "USAGE": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "UsersResidentsFormsBuildingsCharacteristics" ,
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
