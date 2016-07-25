migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionFive';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , DAMAGE_TYPES' + ' FROM AeDESPapersSectionFive;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , DAMAGE_TYPES ) VALUES (? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'DAMAGE_TYPES' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS AeDESPapersSectionFive;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
