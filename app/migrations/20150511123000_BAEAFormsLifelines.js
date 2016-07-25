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
            COMMUNICATION: "TEXT" ,
            ELECTRIC_POWER_DELIVERY: "TEXT" ,
            OTHER: "TEXT" ,
            FUNCTIONALITY: "TEXT" ,
            REPAIR_TIME: "TEXT" ,
            RECOMMEND_FURTHER_INVESTIGATION: "TEXT" ,
            NOTES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
