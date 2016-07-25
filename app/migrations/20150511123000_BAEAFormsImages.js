migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            FORM_ID: "integer" ,
            IMAGE_PATH: "TEXT" ,
            SECTION: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
