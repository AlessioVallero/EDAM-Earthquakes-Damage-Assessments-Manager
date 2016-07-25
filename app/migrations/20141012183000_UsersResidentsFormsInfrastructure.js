migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            GROUND_BREAKS: "TEXT" ,
            WATER_LEAKS: "TEXT" ,
            GAS_LEAKS: "TEXT" ,
            ELECTRIC_CURRENT_OPERATION: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
