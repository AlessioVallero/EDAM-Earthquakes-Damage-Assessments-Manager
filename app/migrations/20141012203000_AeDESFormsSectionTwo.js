migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionTwo';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , PLANS_NO , AVERAGE_HEIGHT_OF_FLOOR , UNDERGROUND_PLANS_NO , AVERAGE_SURFACE , CONSTRUCTION_AGE , RENOVATION_AGE , UNIT_OF_USE_HOUSING , UNIT_OF_USE_PRODUCTIVE , UNIT_OF_USE_COMMERCE , UNIT_OF_USE_OFFICES , UNIT_OF_USE_PUBLIC_SERVICES , UNIT_OF_USE_DEPOSIT , UNIT_OF_USE_STRATEGIC , UNIT_OF_USE_TOURISM , UTILIZATION , OCCUPANTS , PROPERTY' + ' FROM AeDESPapersSectionTwo;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , PLANS_NO , AVERAGE_HEIGHT_OF_FLOOR , UNDERGROUND_PLANS_NO , AVERAGE_SURFACE , CONSTRUCTION_AGE , RENOVATION_AGE , UNIT_OF_USE_HOUSING , UNIT_OF_USE_PRODUCTIVE , UNIT_OF_USE_COMMERCE , UNIT_OF_USE_OFFICES , UNIT_OF_USE_PUBLIC_SERVICES , UNIT_OF_USE_DEPOSIT , UNIT_OF_USE_STRATEGIC , UNIT_OF_USE_TOURISM , UTILIZATION , OCCUPANTS , PROPERTY ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'PLANS_NO' ) , rows.fieldByName( 'AVERAGE_HEIGHT_OF_FLOOR' ) , rows.fieldByName( 'UNDERGROUND_PLANS_NO' ) , rows.fieldByName( 'AVERAGE_SURFACE' ) , rows.fieldByName( 'CONSTRUCTION_AGE' ) , rows.fieldByName( 'RENOVATION_AGE' ) , rows.fieldByName( 'UNIT_OF_USE_HOUSING' ) , rows.fieldByName( 'UNIT_OF_USE_PRODUCTIVE' ) , rows.fieldByName( 'UNIT_OF_USE_COMMERCE' ) , rows.fieldByName( 'UNIT_OF_USE_OFFICES' ) , rows.fieldByName( 'UNIT_OF_USE_PUBLIC_SERVICES' ) , rows.fieldByName( 'UNIT_OF_USE_DEPOSIT' ) , rows.fieldByName( 'UNIT_OF_USE_STRATEGIC' ) , rows.fieldByName( 'UNIT_OF_USE_TOURISM' ) , rows.fieldByName( 'UTILIZATION' ) , rows.fieldByName( 'OCCUPANTS' ) , rows.fieldByName( 'PROPERTY' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS AeDESPapersSectionTwo;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
