migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            DAMAGE_TYPES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
