migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionSix';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , POTENTIAL_CAUSES' + ' FROM AeDESPapersSectionSix;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , POTENTIAL_CAUSES ) VALUES (? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'POTENTIAL_CAUSES' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS AeDESPapersSectionSix;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
