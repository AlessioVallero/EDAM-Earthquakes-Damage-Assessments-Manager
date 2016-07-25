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
            BUILDING_TYPE: "TEXT" ,
            OCCUPANCY_USE: "TEXT" ,
            STORIES: "TEXT" ,
            DAMAGE: "TEXT" ,
            RECOMMEND_FURTHER_INVESTIGATION: "TEXT" ,
            NOTES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
