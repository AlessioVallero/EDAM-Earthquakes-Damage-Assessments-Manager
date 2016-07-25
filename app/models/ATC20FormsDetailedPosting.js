// This is the model for the ATC20FormsDetailedPosting table on DB
exports.definition = {
	config: {
		columns: {
		    "FORM_ID": "integer PRIMARY KEY" ,
		    "PREVIOUS_POSTING": "TEXT" ,
            "PREVIOUS_POSTING_INSPECTOR_ID": "TEXT" ,
		    "PREVIOUS_POSTING_DATE": "TEXT" ,
            "POSTING": "TEXT" ,
            "CLASSIFICATION": "TEXT" ,
		    "USE_AND_ENTRY_RESTRICTIONS": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "ATC20FormsDetailedPosting" ,
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