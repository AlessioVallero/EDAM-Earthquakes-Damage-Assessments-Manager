migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            FORM_ID: "integer" ,
            SITE: "TEXT" ,
            LATITUDE: "TEXT" ,
            LONGITUDE: "TEXT" ,
            ADDRESS: "TEXT" ,
            SAND_BLOWS_OR_FISSURES: "TEXT" ,
            GROUND_SETTLEMENT: "TEXT" ,
            LATERAL_SPREADING: "TEXT" ,
            HORIZONTAL: "TEXT" ,
            VERTICAL: "TEXT" ,
            NOTES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
