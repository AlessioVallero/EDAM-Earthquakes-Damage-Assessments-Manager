migration.up = function( migrator )
{
    var fieldExists = false ;
    resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ')' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "DATE" )
        {
            fieldExists = true ;
            break ;
        }
        resultSet.next() ;
    }

    if( !fieldExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN DATE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET DATE = \'\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE BAEAFormsLiquefaction_backup( ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , SAND_BLOWS_OR_FISSURES , GROUND_SETTLEMENT , LATERAL_SPREADING , HORIZONTAL , VERTICAL , NOTES );' ) ;
    db.execute( 'INSERT INTO BAEAFormsLiquefaction_backup SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , SAND_BLOWS_OR_FISSURES , GROUND_SETTLEMENT , LATERAL_SPREADING , HORIZONTAL , VERTICAL , NOTES FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
		    ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            FORM_ID: "integer" ,
            SITE: "TEXT" ,
            LATITUDE: "TEXT" ,
            LONGITUDE: "TEXT" ,
            ADDRESS: "TEXT" ,
            SAND_BLOWS_OR_FISSURES: "TEXT" ,
            GROUND_SETTLEMENT: "TEXT" ,
            LATERAL_SPREADING: "TEXT" ,
            HORIZONTAL: "TEXT" ,
            VERTICAL: "TEXT" ,
            NOTES: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , SAND_BLOWS_OR_FISSURES , GROUND_SETTLEMENT , LATERAL_SPREADING , HORIZONTAL , VERTICAL , NOTES FROM BAEAFormsLiquefaction_backup;' ) ;
    db.execute( 'DROP TABLE BAEAFormsLiquefaction_backup;' ) ;
} ;
