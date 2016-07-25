// This is the model for the BAEAFormsLiquefaction table on DB
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
            "SAND_BLOWS_OR_FISSURES": "TEXT" ,
            "GROUND_SETTLEMENT": "TEXT" ,
            "LATERAL_SPREADING": "TEXT" ,
            "HORIZONTAL": "TEXT" ,
            "VERTICAL": "TEXT" ,
            "NOTES": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "BAEAFormsLiquefaction" ,
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