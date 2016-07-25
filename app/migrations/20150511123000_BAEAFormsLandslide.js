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
            LANDSLIDE_TYPE: "TEXT" ,
            MATERIAL_TYPE: "TEXT" ,
            AREA_AFFECTED: "TEXT" ,
            VULNERABLE_FACILITIES: "TEXT" ,
            NOTES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
