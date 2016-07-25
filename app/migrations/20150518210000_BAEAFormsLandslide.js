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
    db.execute( 'CREATE TEMPORARY TABLE BAEAFormsLandslide_backup( ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , LANDSLIDE_TYPE , MATERIAL_TYPE , AREA_AFFECTED , VULNERABLE_FACILITIES , NOTES );' ) ;
    db.execute( 'INSERT INTO BAEAFormsLandslide_backup SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , LANDSLIDE_TYPE , MATERIAL_TYPE , AREA_AFFECTED , VULNERABLE_FACILITIES , NOTES FROM ' + table + ';' ) ;
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
            LANDSLIDE_TYPE: "TEXT" ,
            MATERIAL_TYPE: "TEXT" ,
            AREA_AFFECTED: "TEXT" ,
            VULNERABLE_FACILITIES: "TEXT" ,
            NOTES: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , LANDSLIDE_TYPE , MATERIAL_TYPE , AREA_AFFECTED , VULNERABLE_FACILITIES , NOTES FROM BAEAFormsLandslide_backup;' ) ;
    db.execute( 'DROP TABLE BAEAFormsLandslide_backup;' ) ;
} ;
