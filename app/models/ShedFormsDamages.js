// This is the model for the ShedFormsDamages table on DB
exports.definition = {
	config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "DAMAGES": "TEXT" ,
            "MEASURES_OF_EMERGENCY": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "ShedFormsDamages" ,
            db_name: "EEM" ,
            idAttribute: "FORM_ID"
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