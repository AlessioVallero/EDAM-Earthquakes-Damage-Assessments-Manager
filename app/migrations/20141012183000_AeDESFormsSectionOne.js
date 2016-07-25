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
            CIVIC_NO: "TEXT" ,
            BUILDING_POSITION: "TEXT" ,
            B_NAME_OR_OWNER: "TEXT" ,
            CODE_OF_USE: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
