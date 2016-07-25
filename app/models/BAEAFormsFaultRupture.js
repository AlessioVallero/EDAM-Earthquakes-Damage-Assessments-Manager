// This is the model for the BAEAFormsFaultRupture table on DB
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
            "SURFACE_RUPTURE": "TEXT" ,
            "OFFSET_FEATURE_TYPE": "TEXT" ,
            "SLIP_AZIMUT": "TEXT" ,
            "PLUNGE": "TEXT" ,
            "SLIP_LENGTH": "TEXT" ,
            "NOTES": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "BAEAFormsFaultRupture" ,
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