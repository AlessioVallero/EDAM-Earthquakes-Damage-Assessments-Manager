migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
		    FORM_ID: "integer PRIMARY KEY" ,
		    EVALUATION: "TEXT" ,
            OTHER_OBSERVED_CONDITIONS: "TEXT" ,
		    GENERAL_COMMENTS: "TEXT" ,
            ESTIMATED_BUILDING_DAMAGE: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
