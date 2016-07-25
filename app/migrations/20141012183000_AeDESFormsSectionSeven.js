migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            MORPHOLOGY_SITE: "TEXT" ,
            SLOPES_LOOMING: "TEXT" ,
            SUBSOIL: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
