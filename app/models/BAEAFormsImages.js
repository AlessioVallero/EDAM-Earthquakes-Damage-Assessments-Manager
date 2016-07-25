// This is the model for the BAEAFormsImages table on DB
exports.definition = {
    config: {
        columns: {
            "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
            "FORM_ID": "integer" ,
            "IMAGE_PATH": "TEXT" ,
            "SECTION": "TEXT" ,
            "SECTION_ID": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "BAEAFormsImages" ,
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
