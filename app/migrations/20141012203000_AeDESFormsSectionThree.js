migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionThree';" ) ;
    }
    catch( exception )
    {

    }

    if( !rs || !rs.isValidRow() || rs.field(0) == 0 )
    {

    }
    else
    {
        rs.close() ;

        var rows = migrator.db.execute( 'SELECT PAPER_ID , COVERAGE , PLAN_AND_ELEVATION , INFILL_DISPOSAL , ISOLATED_COLUMNS , MIXED , REINFORCED , REINFORCED_CONCRETE_FRAMES , REINFORCED_CONCRETE_WALLS , STEEL_FRAMES , MASONRY_STRUCTURES' + ' FROM AeDESPapersSectionThree;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , COVERAGE , PLAN_AND_ELEVATION , INFILL_DISPOSAL , ISOLATED_COLUMNS , MIXED , REINFORCED , REINFORCED_CONCRETE_FRAMES , REINFORCED_CONCRETE_WALLS , STEEL_FRAMES , MASONRY_STRUCTURES ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'COVERAGE' ) , rows.fieldByName( 'PLAN_AND_ELEVATION' ) , rows.fieldByName( 'INFILL_DISPOSAL' ) , rows.fieldByName( 'ISOLATED_COLUMNS' ) , rows.fieldByName( 'MIXED' ) , rows.fieldByName( 'REINFORCED' ) , rows.fieldByName( 'REINFORCED_CONCRETE_FRAMES' ) , rows.fieldByName( 'REINFORCED_CONCRETE_WALLS' ) , rows.fieldByName( 'STEEL_FRAMES' ) , rows.fieldByName( 'MASONRY_STRUCTURES' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS AeDESPapersSectionThree;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
