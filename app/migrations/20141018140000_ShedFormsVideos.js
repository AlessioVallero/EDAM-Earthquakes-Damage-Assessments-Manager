migration.up = function( migrator )
{
    migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN HEADING TEXT;' ) ;
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE ShedFormsVideos_backup( ID , FORM_ID , VIDEO_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT );' ) ;
    db.execute( 'INSERT INTO ShedFormsVideos_backup SELECT ID , FORM_ID , VIDEO_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
            ID: "integer PRIMARY KEY AUTOINCREMENT" ,
            FORM_ID: "integer" ,
            VIDEO_PATH: "TEXT" ,
            LATITUDE: "TEXT" ,
            LONGITUDE: "TEXT" ,
            ADDRESS: "TEXT" ,
            DAMAGES_LEVEL: "TEXT" ,
            DAMAGES_AREA: "TEXT" ,
            COMMENT: "TEXT"
        }
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , FORM_ID , VIDEO_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT FROM ShedFormsVideos_backup;' ) ;
    db.execute( 'DROP TABLE ShedFormsVideos_backup;' ) ;
} ;
