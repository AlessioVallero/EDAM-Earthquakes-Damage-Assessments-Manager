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
    db.execute( 'CREATE TEMPORARY TABLE BAEAFormsBuildings_backup( ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , BUILDING_TYPE , OCCUPANCY_USE , STORIES , DAMAGE , REPAIR_TIME , RECOMMEND_FURTHER_INVESTIGATION , NOTES );' ) ;
    db.execute( 'INSERT INTO BAEAFormsBuildings_backup SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , BUILDING_TYPE , OCCUPANCY_USE , STORIES , DAMAGE , REPAIR_TIME , RECOMMEND_FURTHER_INVESTIGATION , NOTES FROM ' + table + ';' ) ;
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
            BUILDING_TYPE: "TEXT" ,
            OCCUPANCY_USE: "TEXT" ,
            STORIES: "TEXT" ,
            DAMAGE: "TEXT" ,
            RECOMMEND_FURTHER_INVESTIGATION: "TEXT" ,
            NOTES: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , FORM_ID , SITE , LATITUDE , LONGITUDE , ADDRESS , BUILDING_TYPE , OCCUPANCY_USE , STORIES , DAMAGE , REPAIR_TIME , RECOMMEND_FURTHER_INVESTIGATION , NOTES FROM BAEAFormsBuildings_backup;' ) ;
    db.execute( 'DROP TABLE BAEAFormsBuildings_backup;' ) ;
} ;
