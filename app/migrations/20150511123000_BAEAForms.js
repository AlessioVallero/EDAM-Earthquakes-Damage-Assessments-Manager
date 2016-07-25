migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
		    ID: "integer PRIMARY KEY AUTOINCREMENT" ,
		    OPERATOR: "TEXT" ,
            USER: "TEXT" ,
            SYNCHRONIZED: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
