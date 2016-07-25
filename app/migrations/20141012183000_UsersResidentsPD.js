migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            SIGN_PATH: "text" ,
            NAME: "text" ,
            CELL_NUMBER: "text" ,
            AGE: "text" ,
            JOB: "text"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
