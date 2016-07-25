migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapersBuildingsCharacteristics';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , SITE , UNDERGROUND_PLANS_NO , NOT_UNDERGROUND_PLANS_NO , USAGE' + ' FROM BasicPapersBuildingsCharacteristics;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , SITE , UNDERGROUND_PLANS_NO , NOT_UNDERGROUND_PLANS_NO , USAGE ) VALUES (? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'SITE' ) , rows.fieldByName( 'UNDERGROUND_PLANS_NO' ) , rows.fieldByName( 'NOT_UNDERGROUND_PLANS_NO' ) , rows.fieldByName( 'USAGE' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS BasicPapersBuildingsCharacteristics;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
