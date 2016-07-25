// This is the model for the ATC20Forms table on DB
exports.definition = {
	config: {
		columns: {
		    "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
		    "INSPECTOR_ID": "TEXT" ,
            "AFFILIATION": "TEXT" ,
		    "DATE": "TEXT" ,
            "FINAL_POSTING": "TEXT" ,
            "MODE": "TEXT" ,
            "TYPE": "TEXT" ,
            "AREAS_INSPECTED": "TEXT" ,
            "USER": "TEXT" ,
            "SYNCHRONIZED": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "ATC20Forms" ,
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