// This is the model for the AeDESFormsSectionOne table on DB
exports.definition = {
	config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
						"LOCATION_TYPE": "TEXT" ,
						"LOCATION_DETAILS": "TEXT" ,
						"COORDINATES_TYPE": "TEXT" ,
						"OTHER_COORDINATES_TYPE": "TEXT" ,
						"TIMEZONE": "TEXT" ,
						"DATUM": "TEXT" ,
            "LATITUDE": "TEXT" ,
            "LONGITUDE": "TEXT" ,
            "ALTITUDE": "TEXT" ,
            "PROVINCE": "TEXT" ,
            "MUNICIPALITY": "TEXT" ,
            "PLACE": "TEXT" ,
            "ADDRESS": "TEXT" ,
            "CIVIC_NO": "TEXT" ,
            "BUILDING_POSITION": "TEXT" ,
            "B_NAME_OR_OWNER": "TEXT" ,
            "CODE_OF_USE": "TEXT" ,
						"MAP_AGGREGATE_PATH": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "AeDESFormsSectionOne" ,
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
