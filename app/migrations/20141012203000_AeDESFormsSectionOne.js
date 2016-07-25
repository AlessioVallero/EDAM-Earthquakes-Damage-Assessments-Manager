migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'AeDESPapersSectionOne';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , BUILDING_POSITION , B_NAME_OR_OWNER , CODE_OF_USE' + ' FROM AeDESPapersSectionOne;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , BUILDING_POSITION , B_NAME_OR_OWNER , CODE_OF_USE ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'LATITUDE' ) , rows.fieldByName( 'LONGITUDE' ) , rows.fieldByName( 'ALTITUDE' ) , rows.fieldByName( 'PROVINCE' ) , rows.fieldByName( 'MUNICIPALITY' ) , rows.fieldByName( 'PLACE' ) , rows.fieldByName( 'ADDRESS' ) , rows.fieldByName( 'CIVIC_NO' ) , rows.fieldByName( 'BUILDING_POSITION' ) , rows.fieldByName( 'B_NAME_OR_OWNER' ) , rows.fieldByName( 'CODE_OF_USE' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS AeDESPapersSectionOne;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
