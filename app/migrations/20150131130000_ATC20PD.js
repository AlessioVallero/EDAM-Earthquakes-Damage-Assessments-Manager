migration.up = function( migrator )
{
    var fieldExists = false ;
    resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ')' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "MODE" )
        {
            fieldExists = true ;
            break ;
        }
        resultSet.next() ;
    }

    if( !fieldExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN MODE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET MODE = \'CA\';' ) ;
    }

    fieldExists = false ;
    resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ')' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "SIGN_PATH" )
        {
            fieldExists = true ;
            break ;
        }
        resultSet.next() ;
    }

    if( !fieldExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN SIGN_PATH TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET SIGN_PATH = \'\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE ATC20PD_backup( ID , INSPECTOR_ID , AFFILIATION );' ) ;
    db.execute( 'INSERT INTO ATC20PD_backup SELECT ID , INSPECTOR_ID , AFFILIATION FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
		    ID: "integer PRIMARY KEY AUTOINCREMENT" ,
		    INSPECTOR_ID: "TEXT" ,
            AFFILIATION: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , INSPECTOR_ID , AFFILIATION FROM ATC20PD_backup;' ) ;
    db.execute( 'DROP TABLE ATC20PD_backup;' ) ;
} ;
