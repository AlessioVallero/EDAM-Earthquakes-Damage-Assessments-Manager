migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPapersInfrastructure';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , GROUND_BREAKS , WATER_LEAKS , GAS_LEAKS , ELECTRIC_CURRENT_OPERATION' + ' FROM BasicPapersInfrastructure;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , GROUND_BREAKS , WATER_LEAKS , GAS_LEAKS , ELECTRIC_CURRENT_OPERATION ) VALUES (? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'GROUND_BREAKS' ) , rows.fieldByName( 'WATER_LEAKS' ) , rows.fieldByName( 'GAS_LEAKS' ) , rows.fieldByName( 'ELECTRIC_CURRENT_OPERATION' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS BasicPapersInfrastructure;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
