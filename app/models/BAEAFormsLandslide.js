// This is the model for the BAEAFormsLandslide table on DB
exports.definition = {
	config: {
        columns: {
            "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
            "FORM_ID": "integer" ,
            "DATE": "TEXT" ,
            "SITE": "TEXT" ,
            "LATITUDE": "TEXT" ,
            "LONGITUDE": "TEXT" ,
            "ADDRESS": "TEXT" ,
            "LANDSLIDE_TYPE": "TEXT" ,
            "MATERIAL_TYPE": "TEXT" ,
            "AREA_AFFECTED": "TEXT" ,
            "VULNERABLE_FACILITIES": "TEXT" ,
            "NOTES": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "BAEAFormsLandslide" ,
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