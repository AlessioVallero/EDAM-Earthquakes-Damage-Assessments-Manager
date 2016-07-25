migration.up = function( migrator )
{
    var fieldExists = false ;
    resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ')' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "SECTION_ID" )
        {
            fieldExists = true ;
            break ;
        }
        resultSet.next() ;
    }

    if( !fieldExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN SECTION_ID TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET SECTION_ID = \'\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE BAEAFormsImages_backup( ID , FORM_ID , IMAGE_PATH , SECTION );' ) ;
    db.execute( 'INSERT INTO BAEAFormsImages_backup SELECT ID , FORM_ID , IMAGE_PATH , SECTION FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
		    ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            FORM_ID: "integer" ,
            IMAGE_PATH: "TEXT" ,
            SECTION: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , FORM_ID , IMAGE_PATH , SECTION FROM BAEAFormsImages_backup;' ) ;
    db.execute( 'DROP TABLE BAEAFormsImages_backup;' ) ;
} ;
