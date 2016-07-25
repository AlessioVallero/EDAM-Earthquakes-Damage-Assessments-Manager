migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapers';" ) ;
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

        var rows = migrator.db.execute( 'SELECT ID , PAPER_NO , DATE , USER , SYNCHRONIZED' + ' FROM AeDESPapers;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( ID , FORM_NO , DATE , USER , SYNCHRONIZED ) VALUES (? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'ID' ) , rows.fieldByName( 'PAPER_NO' ) , rows.fieldByName( 'DATE' ) , rows.fieldByName( 'USER' ) , rows.fieldByName( 'SYNCHRONIZED' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS AeDESPapers;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
