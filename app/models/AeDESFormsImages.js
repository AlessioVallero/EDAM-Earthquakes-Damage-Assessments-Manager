// This is the model for the AeDESFormsImages table on DB
exports.definition = {
    config: {
        columns: {
            "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
            "FORM_ID": "integer" ,
            "IMAGE_PATH": "TEXT" ,
            "LATITUDE": "TEXT" ,
            "LONGITUDE": "TEXT" ,
            "ADDRESS": "TEXT" ,
            "HEADING": "TEXT" ,
            "DAMAGES_LEVEL": "TEXT" ,
            "DAMAGES_AREA": "TEXT" ,
            "COMMENT": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "AeDESFormsImages" ,
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
