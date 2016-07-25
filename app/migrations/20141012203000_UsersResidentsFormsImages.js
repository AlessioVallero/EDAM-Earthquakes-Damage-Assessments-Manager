migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapersImages';" ) ;
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

        var rows = migrator.db.execute( 'SELECT ID , PAPER_ID , IMAGE_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT' + ' FROM BasicPapersImages;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( ID , FORM_ID , IMAGE_PATH , LATITUDE , LONGITUDE , ADDRESS , DAMAGES_LEVEL , DAMAGES_AREA , COMMENT ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'ID' ) , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'IMAGE_PATH' ) , rows.fieldByName( 'LATITUDE' ) , rows.fieldByName( 'LONGITUDE' ) , rows.fieldByName( 'ADDRESS' ) , rows.fieldByName( 'DAMAGES_LEVEL' ) , rows.fieldByName( 'DAMAGES_AREA' ) , rows.fieldByName( 'COMMENT' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS BasicPapersImages;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
