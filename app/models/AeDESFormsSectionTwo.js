// This is the model for the AeDESFormsSectionTwo table on DB
exports.definition = {
	config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "PLANS_NO": "TEXT" ,
            "AVERAGE_HEIGHT_OF_FLOOR": "TEXT" ,
            "UNDERGROUND_PLANS_NO": "TEXT" ,
            "AVERAGE_SURFACE": "TEXT" ,
            "CONSTRUCTION_AGE": "TEXT" ,
            "RENOVATION_AGE": "TEXT" ,
            "UNIT_OF_USE_HOUSING": "TEXT" ,
            "UNIT_OF_USE_PRODUCTIVE": "TEXT" ,
            "UNIT_OF_USE_COMMERCE": "TEXT" ,
            "UNIT_OF_USE_OFFICES": "TEXT" ,
            "UNIT_OF_USE_PUBLIC_SERVICES": "TEXT" ,
            "UNIT_OF_USE_DEPOSIT": "TEXT" ,
            "UNIT_OF_USE_STRATEGIC": "TEXT" ,
            "UNIT_OF_USE_TOURISM": "TEXT" ,
            "UTILIZATION": "TEXT" ,
            "OCCUPANTS": "TEXT" ,
            "PUBLIC_PROPERTY": "TEXT" ,
						"PRIVATE_PROPERTY": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "AeDESFormsSectionTwo" ,
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
