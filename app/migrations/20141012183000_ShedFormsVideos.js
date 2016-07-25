migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            FORM_ID: "integer" ,
            VIDEO_PATH: "TEXT" ,
            LATITUDE: "TEXT" ,
            LONGITUDE: "TEXT" ,
            ADDRESS: "TEXT" ,
            DAMAGES_LEVEL: "TEXT" ,
            DAMAGES_AREA: "TEXT" ,
            COMMENT: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
