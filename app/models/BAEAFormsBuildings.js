// This is the model for the BAEAFormsBuildings table on DB
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
            "BUILDING_TYPE": "TEXT" ,
            "OCCUPANCY_USE": "TEXT" ,
            "STORIES": "TEXT" ,
            "DAMAGE": "TEXT" ,
            "RECOMMEND_FURTHER_INVESTIGATION": "TEXT" ,
            "NOTES": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "BAEAFormsBuildings" ,
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