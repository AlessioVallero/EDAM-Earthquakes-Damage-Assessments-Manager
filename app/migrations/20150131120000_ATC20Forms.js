migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
		    INSPECTOR_ID: "TEXT" ,
            AFFILIATION: "TEXT" ,
		    DATE: "TEXT" ,
            FINAL_POSTING: "TEXT" ,
            MODE: "TEXT" ,
            TYPE: "TEXT" ,
            AREAS_INSPECTED: "TEXT" ,
            USER: "TEXT" ,
            SYNCHRONIZED: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
