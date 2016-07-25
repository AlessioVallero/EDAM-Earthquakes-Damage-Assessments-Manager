// This is the model for the ATC20FormsDetailedEvaluation table on DB
exports.definition = {
	config: {
		columns: {
		    "FORM_ID": "integer PRIMARY KEY" ,
		    "EVALUATION": "TEXT" ,
            "OVERALL_HAZARDS_COMMENTS": "TEXT" ,
		    "OVERALL_HAZARDS_OTHER": "TEXT" ,
            "STRUCTURAL_HAZARDS_COMMENTS": "TEXT" ,
            "STRUCTURAL_HAZARDS_OTHER": "TEXT" ,
            "NONSTRUCTURAL_HAZARDS_COMMENTS": "TEXT" ,
            "NONSTRUCTURAL_HAZARDS_OTHER": "TEXT" ,
            "GEOTECHNICAL_HAZARDS_COMMENTS": "TEXT" ,
            "GEOTECHNICAL_HAZARDS_OTHER": "TEXT" ,
            "GENERAL_COMMENTS": "TEXT" ,
            "SKETCH_PATH": "TEXT" ,
            "ESTIMATED_BUILDING_DAMAGE": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "ATC20FormsDetailedEvaluation" ,
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