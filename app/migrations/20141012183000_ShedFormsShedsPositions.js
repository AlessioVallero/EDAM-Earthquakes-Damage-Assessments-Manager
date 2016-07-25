migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            LATITUDE: "TEXT" ,
            LONGITUDE: "TEXT" ,
            ALTITUDE: "TEXT" ,
            PROVINCE: "TEXT" ,
            MUNICIPALITY: "TEXT" ,
            PLACE: "TEXT" ,
            ADDRESS: "TEXT" ,
            CIVIC_NO: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
