migration.up = function( migrator )
{
    var fieldExists = false ;
    var resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ');' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "WOOD_FRAMES_WALLS" )
        {
            fieldExists = true ;
            break ;
        }
        resultSet.next() ;
    }
    resultSet.close() ;

    if( !fieldExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN WOOD_FRAMES_WALLS TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET WOOD_FRAMES_WALLS = \'0\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE AeDESFormsSectionThree_backup( FORM_ID , COVERAGE , PLAN_AND_ELEVATION , INFILL_DISPOSAL , ISOLATED_COLUMNS , MIXED , REINFORCED , REINFORCED_CONCRETE_FRAMES , REINFORCED_CONCRETE_WALLS , STEEL_FRAMES , MASONRY_STRUCTURES );' ) ;
    db.execute( 'INSERT INTO AeDESFormsSectionThree_backup SELECT FORM_ID , COVERAGE , PLAN_AND_ELEVATION , INFILL_DISPOSAL , ISOLATED_COLUMNS , MIXED , REINFORCED , REINFORCED_CONCRETE_FRAMES , REINFORCED_CONCRETE_WALLS , STEEL_FRAMES , MASONRY_STRUCTURES FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
		        FORM_ID: "integer PRIMARY KEY" ,
            COVERAGE: "TEXT" ,
            PLAN_AND_ELEVATION: "TEXT" ,
            INFILL_DISPOSAL: "TEXT" ,
            ISOLATED_COLUMNS: "TEXT" ,
            MIXED: "TEXT" ,
            REINFORCED: "TEXT" ,
            REINFORCED_CONCRETE_FRAMES: "TEXT" ,
            REINFORCED_CONCRETE_WALLS: "TEXT" ,
            STEEL_FRAMES: "TEXT" ,
            MASONRY_STRUCTURES: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT FORM_ID , COVERAGE , PLAN_AND_ELEVATION , INFILL_DISPOSAL , ISOLATED_COLUMNS , MIXED , REINFORCED , REINFORCED_CONCRETE_FRAMES , REINFORCED_CONCRETE_WALLS , STEEL_FRAMES , MASONRY_STRUCTURES FROM AeDESFormsSectionThree_backup;' ) ;
    db.execute( 'DROP TABLE AeDESFormsSectionThree_backup;' ) ;
} ;
