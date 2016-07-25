// This is the model for the ATC20FormsRapidEvaluation table on DB
exports.definition = {
	config: {
		columns: {
		    "FORM_ID": "integer PRIMARY KEY" ,
		    "EVALUATION": "TEXT" ,
            "OTHER_OBSERVED_CONDITIONS": "TEXT" ,
		    "GENERAL_COMMENTS": "TEXT" ,
            "ESTIMATED_BUILDING_DAMAGE": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "ATC20FormsRapidEvaluation" ,
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