migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
		    FORM_ID: "integer PRIMARY KEY" ,
		    BARRICADES_IN_THE_FOLLOWING_AREAS: "TEXT" ,
            EVALUATION_RECOMMENDED: "TEXT" ,
		    OTHER_EVALUATION_RECOMMENDED: "TEXT" ,
            OTHER_RECOMMENDATIONS: "TEXT" ,
		    COMMENTS: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
