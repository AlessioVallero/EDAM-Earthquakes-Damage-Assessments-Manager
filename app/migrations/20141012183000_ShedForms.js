migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            FORM_NO: "TEXT" ,
            DATE: "TEXT" ,
            USER: "TEXT" ,
            SYNCHRONIZED: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
