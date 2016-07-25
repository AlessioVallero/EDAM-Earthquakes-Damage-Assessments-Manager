// This is the model for the ShedForms table on DB
exports.definition = {
	config: {
		columns: {
		    "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
		    "FORM_NO": "TEXT" ,
		    "DATE": "TEXT" ,
            "USER": "TEXT" ,
            "SYNCHRONIZED": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "ShedForms" ,
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