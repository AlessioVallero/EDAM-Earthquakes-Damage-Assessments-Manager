migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            DAMAGES: "TEXT" ,
            MEASURES_OF_EMERGENCY: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
