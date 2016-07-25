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
            INUNDATION: "TEXT" ,
            WAVE_HEIGHT: "TEXT" ,
            PEAK_TO_TROUGH: "TEXT" ,
            WAVE_CYCLE: "TEXT" ,
            DAMAGE: "TEXT" ,
            NOTES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
