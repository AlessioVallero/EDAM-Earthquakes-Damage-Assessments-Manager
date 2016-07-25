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
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE ATC20Forms_backup( ID , INSPECTOR_ID , AFFILIATION , DATE , FINAL_POSTING , TYPE , AREAS_INSPECTED , USER , SYNCHRONIZED );' ) ;
    db.execute( 'INSERT INTO ATC20Forms_backup SELECT ID , INSPECTOR_ID , AFFILIATION , DATE , FINAL_POSTING , TYPE , AREAS_INSPECTED , USER , SYNCHRONIZED FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
		    ID: "integer PRIMARY KEY AUTOINCREMENT" ,
		    INSPECTOR_ID: "TEXT" ,
            AFFILIATION: "TEXT" ,
		    DATE: "TEXT" ,
            FINAL_POSTING: "TEXT" ,
            TYPE: "TEXT" ,
            AREAS_INSPECTED: "TEXT" ,
            USER: "TEXT" ,
            SYNCHRONIZED: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , INSPECTOR_ID , AFFILIATION , DATE , FINAL_POSTING , TYPE , AREAS_INSPECTED , USER , SYNCHRONIZED FROM ATC20Forms_backup;' ) ;
    db.execute( 'DROP TABLE ATC20Forms_backup;' ) ;
} ;
