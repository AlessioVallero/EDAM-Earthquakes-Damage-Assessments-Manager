migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
		    FORM_ID: "integer PRIMARY KEY" ,
		    PREVIOUS_POSTING: "TEXT" ,
            PREVIOUS_POSTING_INSPECTOR_ID: "TEXT" ,
		    PREVIOUS_POSTING_DATE: "TEXT" ,
            POSTING: "TEXT" ,
            CLASSIFICATION: "TEXT" ,
		    USE_AND_ENTRY_RESTRICTIONS: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
