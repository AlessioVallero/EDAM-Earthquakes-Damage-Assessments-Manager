// This is the model for the AeDESFormsSectionOne table on DB
exports.definition = {
	config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
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
            "CODE_OF_USE": "TEXT"
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