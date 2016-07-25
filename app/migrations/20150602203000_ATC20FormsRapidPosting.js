migration.up = function( migrator )
{
    var fieldExists = false ;
    var resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ')' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "CLASSIFICATION" )
        {
            fieldExists = true ;
            break ;
        }
        resultSet.next() ;
    }
    resultSet.close() ;

    if( !fieldExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN CLASSIFICATION TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET CLASSIFICATION = \'0\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE ATC20FormsRapidPosting_backup( FORM_ID , POSTING , USE_AND_ENTRY_RESTRICTIONS );' ) ;
    db.execute( 'INSERT INTO ATC20FormsRapidPosting_backup SELECT FORM_ID , POSTING , USE_AND_ENTRY_RESTRICTIONS FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
		    FORM_ID: "integer PRIMARY KEY" ,
            POSTING: "TEXT" ,
            USE_AND_ENTRY_RESTRICTIONS: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT FORM_ID , POSTING , USE_AND_ENTRY_RESTRICTIONS FROM ATC20FormsRapidPosting_backup;' ) ;
    db.execute( 'DROP TABLE ATC20FormsRapidPosting_backup;' ) ;
} ;
