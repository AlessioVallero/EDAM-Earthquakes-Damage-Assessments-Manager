migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'ShedPapersDamages';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , DAMAGES , MEASURES_OF_EMERGENCY' + ' FROM ShedPapersDamages;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , DAMAGES , MEASURES_OF_EMERGENCY ) VALUES (? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'DAMAGES' ) , rows.fieldByName( 'MEASURES_OF_EMERGENCY' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS ShedPapersDamages;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
