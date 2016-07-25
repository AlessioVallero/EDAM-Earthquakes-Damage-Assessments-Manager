migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            STRUCTURAL: "TEXT" ,
            NOT_STRUCTURAL: "TEXT" ,
            EXTERNAL: "TEXT" ,
            GEOTECHNICAL: "TEXT" ,
            OUTCOME_PRACTICABILITY: "TEXT" ,
            HOUSING_UNITS_UNINHABITABLE: "TEXT" ,
            FAMILIES_EVACUATED: "TEXT" ,
            EVACUEES_N: "TEXT" ,
            ACCURACY_VISIT: "TEXT" ,
            OTHER: "TEXT" ,
            MEASURES_OF_EMERGENCY: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
