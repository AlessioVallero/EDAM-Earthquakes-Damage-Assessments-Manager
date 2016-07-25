migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
		    FORM_ID: "integer PRIMARY KEY" ,
		    EVALUATION: "TEXT" ,
            OVERALL_HAZARDS_COMMENTS: "TEXT" ,
		    OVERALL_HAZARDS_OTHER: "TEXT" ,
            STRUCTURAL_HAZARDS_COMMENTS: "TEXT" ,
            STRUCTURAL_HAZARDS_OTHER: "TEXT" ,
            NONSTRUCTURAL_HAZARDS_COMMENTS: "TEXT" ,
            NONSTRUCTURAL_HAZARDS_OTHER: "TEXT" ,
            GEOTECHNICAL_HAZARDS_COMMENTS: "TEXT" ,
            GEOTECHNICAL_HAZARDS_OTHER: "TEXT" ,
            GENERAL_COMMENTS: "TEXT" ,
            SKETCH_PATH: "TEXT" ,
            ESTIMATED_BUILDING_DAMAGE: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
