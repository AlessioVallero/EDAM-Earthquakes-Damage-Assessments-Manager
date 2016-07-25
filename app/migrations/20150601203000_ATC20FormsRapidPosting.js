migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
		    FORM_ID: "integer PRIMARY KEY" ,
            POSTING: "TEXT" ,
            CLASSIFICATION: "TEXT" ,
		    USE_AND_ENTRY_RESTRICTIONS: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
