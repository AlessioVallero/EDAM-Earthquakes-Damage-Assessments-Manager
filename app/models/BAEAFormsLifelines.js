// This is the model for the BAEAFormsLifelines table on DB
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
            "COMMUNICATION": "TEXT" ,
            "ELECTRIC_POWER_DELIVERY": "TEXT" ,
            "OTHER": "TEXT" ,
            "FUNCTIONALITY": "TEXT" ,
            "REPAIR_TIME": "TEXT" ,
            "RECOMMEND_FURTHER_INVESTIGATION": "TEXT" ,
            "NOTES": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "BAEAFormsLifelines" ,
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