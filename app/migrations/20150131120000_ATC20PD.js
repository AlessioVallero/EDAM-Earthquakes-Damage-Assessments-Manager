migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            SIGN_PATH: "text" ,
		    INSPECTOR_ID: "text" ,
		    AFFILIATION: "text" ,
            MODE: "text"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
