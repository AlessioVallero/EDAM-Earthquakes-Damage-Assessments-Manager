migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'ShedPapersInfrastructure';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , PRIMARY_GIRDERS , THICKNESS_OF_THE_TILES , TYPICAL_LIGHTS , COVERAGE , INCLINATION_OF_THE_ROOF , INFILL_ELEMENTS , VERTICAL_WALLS , SHELVING' + ' FROM ShedPapersInfrastructure;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , PRIMARY_GIRDERS , THICKNESS_OF_THE_TILES , TYPICAL_LIGHTS , COVERAGE , INCLINATION_OF_THE_ROOF , INFILL_ELEMENTS , VERTICAL_WALLS , SHELVING ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'PRIMARY_GIRDERS' ) , rows.fieldByName( 'THICKNESS_OF_THE_TILES' ) , rows.fieldByName( 'TYPICAL_LIGHTS' ) , rows.fieldByName( 'COVERAGE' ) , rows.fieldByName( 'INCLINATION_OF_THE_ROOF' ) , rows.fieldByName( 'INFILL_ELEMENTS' ) , rows.fieldByName( 'VERTICAL_WALLS' ) , rows.fieldByName( 'SHELVING' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS ShedPapersInfrastructure;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
