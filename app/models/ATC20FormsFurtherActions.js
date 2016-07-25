// This is the model for the ATC20FormsFurtherActions table on DB
exports.definition = {
	config: {
		columns: {
		    "FORM_ID": "integer PRIMARY KEY" ,
		    "BARRICADES_IN_THE_FOLLOWING_AREAS": "TEXT" ,
            "EVALUATION_RECOMMENDED": "TEXT" ,
		    "OTHER_EVALUATION_RECOMMENDED": "TEXT" ,
            "OTHER_RECOMMENDATIONS": "TEXT" ,
		    "COMMENTS": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "ATC20FormsFurtherActions" ,
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