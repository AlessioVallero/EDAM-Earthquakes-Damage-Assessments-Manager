// This is the model for the Errors table on DB
exports.definition = {
    config: {
        columns: {
            "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
            "DATE": "TEXT" ,
            "ERR_MSG": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "Errors" ,
            db_name: "EEM" ,
            idAttribute: "ID"
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
