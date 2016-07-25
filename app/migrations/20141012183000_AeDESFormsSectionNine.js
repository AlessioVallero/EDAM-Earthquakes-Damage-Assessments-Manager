migration.up = function( migrator )
{
    migrator.createTable(
    {
        "columns":
        {
            FORM_ID: "integer PRIMARY KEY" ,
            TOPIC: "TEXT" ,
            OTHER_COMMENTS: "TEXT"
        }
    } ) ;
} ;

migration.down = function( migrator )
{

} ;
