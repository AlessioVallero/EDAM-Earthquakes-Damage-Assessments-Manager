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
            SURFACE_RUPTURE: "TEXT" ,
            OFFSET_FEATURE_TYPE: "TEXT" ,
            SLIP_AZIMUT: "TEXT" ,
            PLUNGE: "TEXT" ,
            SLIP_LENGTH: "TEXT" ,
            NOTES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
