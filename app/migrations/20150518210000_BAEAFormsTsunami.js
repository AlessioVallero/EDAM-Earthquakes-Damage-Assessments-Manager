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
    db.execute( 'CREATE TEMPORARY TABLE BAEAFormsTsunami_backup( ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , INUNDATION , WAVE_HEIGHT , PEAK_TO_TROUGH , WAVE_CYCLE , DAMAGE , NOTES );' ) ;
    db.execute( 'INSERT INTO BAEAFormsTsunami_backup SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , INUNDATION , WAVE_HEIGHT , PEAK_TO_TROUGH , WAVE_CYCLE , DAMAGE , NOTES FROM ' + table + ';' ) ;
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
            INUNDATION: "TEXT" ,
            WAVE_HEIGHT: "TEXT" ,
            PEAK_TO_TROUGH: "TEXT" ,
            WAVE_CYCLE: "TEXT" ,
            DAMAGE: "TEXT" ,
            NOTES: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , INUNDATION , WAVE_HEIGHT , PEAK_TO_TROUGH , WAVE_CYCLE , DAMAGE , NOTES FROM BAEAFormsTsunami_backup;' ) ;
    db.execute( 'DROP TABLE BAEAFormsTsunami_backup;' ) ;
} ;
