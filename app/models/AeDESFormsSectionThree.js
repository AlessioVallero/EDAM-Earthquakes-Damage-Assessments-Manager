// This is the model for the AeDESFormsSectionThree table on DB
exports.definition = {
	config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "COVERAGE": "TEXT" ,
            "PLAN_AND_ELEVATION": "TEXT" ,
            "INFILL_DISPOSAL": "TEXT" ,
            "ISOLATED_COLUMNS": "TEXT" ,
            "MIXED": "TEXT" ,
            "REINFORCED": "TEXT" ,
            "REINFORCED_CONCRETE_FRAMES": "TEXT" ,
            "REINFORCED_CONCRETE_WALLS": "TEXT" ,
            "STEEL_FRAMES": "TEXT" ,
            "MASONRY_STRUCTURES": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "AeDESFormsSectionThree" ,
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