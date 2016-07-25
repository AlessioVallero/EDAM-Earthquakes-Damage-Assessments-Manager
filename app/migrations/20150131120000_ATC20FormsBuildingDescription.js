migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
		    FORM_ID: "integer PRIMARY KEY" ,
		    BUILDING_NAME: "TEXT" ,
            ALSO_KNOWN_AS: "TEXT" ,
            LOT: "TEXT" ,
            DP: "TEXT" ,
            OTHER_ID: "TEXT" ,
            CONTACT_NAME: "TEXT" ,
            ADDRESS: "TEXT" ,
		    BUILDING_CONTACT: "TEXT" ,
            UNDERGROUND_PLANS_NO: "TEXT" ,
            NOT_UNDERGROUND_PLANS_NO: "TEXT" ,
            APPROX_FT_AREA: "TEXT" ,
            RESIDENTIAL_UNITS: "TEXT" ,
            RESIDENTIAL_UNITS_UNINHABITABLE: "TEXT" ,
            TYPE_OF_CONSTRUCTION: "TEXT" ,
            OTHER_TYPE_OF_CONSTRUCTION: "TEXT" ,
            PRIMARY_OCCUPANCY: "TEXT" ,
            OTHER_PRIMARY_OCCUPANCY: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
