// This is the model for the ShedFormsShedsCharacteristics table on DB
exports.definition = {
    config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "SITE": "TEXT" ,
            "NOT_UNDERGROUND_PLANS_NO": "TEXT" ,
            "USAGE": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ShedFormsShedsCharacteristics" ,
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
