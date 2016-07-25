// This is the model for the AeDESFormsVideos table on DB
exports.definition = {
    config: {
        columns: {
            "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
            "FORM_ID": "integer" ,
            "VIDEO_PATH": "TEXT" ,
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
            collection_name: "AeDESFormsVideos" ,
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
