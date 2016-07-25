// This is the model for the ShedFormsOtherComments table on DB
exports.definition = {
	config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "TOPIC": "TEXT" ,
            "OTHER_COMMENTS": "TEXT"
        },
		adapter: {
			type: "sql",
			collection_name: "ShedFormsOtherComments" ,
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