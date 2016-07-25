migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            POTENTIAL_CAUSES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
