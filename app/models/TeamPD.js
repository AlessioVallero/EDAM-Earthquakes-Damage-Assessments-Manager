// This is the model for the TeamPD table on DB
exports.definition = {
	config: {
		columns: {
		    "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
            "COMPONENT_NUMBER": "integer" ,
		    "SIGN_PATH": "text" ,
		    "NAME": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "TeamPD" ,
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