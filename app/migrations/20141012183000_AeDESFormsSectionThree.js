migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            COVERAGE: "TEXT" ,
            PLAN_AND_ELEVATION: "TEXT" ,
            INFILL_DISPOSAL: "TEXT" ,
            ISOLATED_COLUMNS: "TEXT" ,
            MIXED: "TEXT" ,
            REINFORCED: "TEXT" ,
            REINFORCED_CONCRETE_FRAMES: "TEXT" ,
            REINFORCED_CONCRETE_WALLS: "TEXT" ,
            STEEL_FRAMES: "TEXT" ,
            MASONRY_STRUCTURES: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
