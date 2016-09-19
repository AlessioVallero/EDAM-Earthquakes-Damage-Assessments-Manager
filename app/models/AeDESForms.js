// This is the model for the AeDESForms table on DB
exports.definition = {
	config: {
		columns: {
		    "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
				"TEAM": "TEXT" ,
				"FORM_ID": "TEXT" ,
		    "FORM_NO": "TEXT" ,
		    "DATE": "TEXT" ,
				"ISTAT_REG": "TEXT" ,
				"ISTAT_PROV": "TEXT" ,
				"ISTAT_PUBLIC": "TEXT" ,
				"AGGREGATE_N": "TEXT" ,
				"BUILDING_N": "TEXT" ,
				"ISTAT_PLACE_CODE": "TEXT" ,
				"PAPER_TYPE": "TEXT" ,
				"PAPER_N": "TEXT" ,
				"ISTAT_CENSUS_SECTION": "TEXT" ,
				"SHEET": "TEXT" ,
				"ATTACHMENT": "TEXT" ,
				"PARTICLES": "TEXT" ,
        "USER": "TEXT" ,
        "SYNCHRONIZED": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "AeDESForms" ,
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
