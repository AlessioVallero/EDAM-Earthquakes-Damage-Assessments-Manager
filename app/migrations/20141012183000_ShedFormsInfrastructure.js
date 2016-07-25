migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            PRIMARY_GIRDERS: "TEXT" ,
            THICKNESS_OF_THE_TILES: "TEXT" ,
            TYPICAL_LIGHTS: "TEXT" ,
            COVERAGE: "TEXT" ,
            INCLINATION_OF_THE_ROOF: "TEXT" ,
            INFILL_ELEMENTS: "TEXT" ,
            VERTICAL_WALLS: "TEXT" ,
            SHELVING: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
