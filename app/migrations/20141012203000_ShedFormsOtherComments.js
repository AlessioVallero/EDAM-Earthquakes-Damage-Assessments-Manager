migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'ShedPapersOtherComments';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , TOPIC , OTHER_COMMENTS' + ' FROM ShedPapersOtherComments;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , TOPIC , OTHER_COMMENTS ) VALUES (? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'TOPIC' ) , rows.fieldByName( 'OTHER_COMMENTS' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS ShedPapersOtherComments;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
