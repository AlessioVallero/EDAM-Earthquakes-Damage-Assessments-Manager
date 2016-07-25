// This is the model for the ATC20PD table on DB
exports.definition = {
	config: {
		columns: {
		    "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
            "SIGN_PATH": "text" ,
		    "INSPECTOR_ID": "text" ,
		    "AFFILIATION": "text" ,
            "MODE": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "ATC20PD" ,
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