migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapersBuildingsPositions';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , COMPILER_POS' + ' FROM BasicPapersBuildingsPositions;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , COMPILER_POS) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'LATITUDE' ) , rows.fieldByName( 'LONGITUDE' ) , rows.fieldByName( 'ALTITUDE' ) , rows.fieldByName( 'PROVINCE' ) , rows.fieldByName( 'MUNICIPALITY' ) , rows.fieldByName( 'PLACE' ) , rows.fieldByName( 'ADDRESS' ) , rows.fieldByName( 'CIVIC_NO' ) , rows.fieldByName( 'COMPILER_POS' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS BasicPapersBuildingsPositions;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
