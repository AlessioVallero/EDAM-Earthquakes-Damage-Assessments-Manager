// This is the model for the ShedFormsJudgmentOfPracticability table on DB
exports.definition = {
    config: {
        columns: {
            "FORM_ID": "integer PRIMARY KEY" ,
            "STRUCTURAL": "TEXT" ,
            "NOT_STRUCTURAL": "TEXT" ,
            "EXTERNAL": "TEXT" ,
            "GEOTECHNICAL": "TEXT" ,
            "OUTCOME_PRACTICABILITY": "TEXT" ,
            "HOUSING_UNITS_UNINHABITABLE": "TEXT" ,
            "FAMILIES_EVACUATED": "TEXT" ,
            "EVACUEES_N": "TEXT" ,
            "ACCURACY_VISIT": "TEXT" ,
            "OTHER": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "ShedFormsJudgmentOfPracticability" ,
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
