// This is the model for the AeDESFormsSectionSeven table on DB
exports.definition = {
	config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "MORPHOLOGY_SITE": "TEXT" ,
            "SLOPES_LOOMING": "TEXT" ,
            "SUBSOIL": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "AeDESFormsSectionSeven" ,
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