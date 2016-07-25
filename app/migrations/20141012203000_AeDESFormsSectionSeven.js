migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionSeven';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , MORPHOLOGY_SITE , SLOPES_LOOMING , SUBSOIL' + ' FROM AeDESPapersSectionSeven;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , MORPHOLOGY_SITE , SLOPES_LOOMING , SUBSOIL ) VALUES (? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'MORPHOLOGY_SITE' ) , rows.fieldByName( 'SLOPES_LOOMING' ) , rows.fieldByName( 'SUBSOIL' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS AeDESPapersSectionSeven;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
