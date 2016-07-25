migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'ShedPapersJudgmentOfPracticability';" ) ;
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

        var rows = migrator.db.execute( 'SELECT PAPER_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER' + ' FROM ShedPapersJudgmentOfPracticability;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( FORM_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'PAPER_ID' ) , rows.fieldByName( 'STRUCTURAL' ) , rows.fieldByName( 'NOT_STRUCTURAL' ) , rows.fieldByName( 'EXTERNAL' ) , rows.fieldByName( 'GEOTECHNICAL' ) , rows.fieldByName( 'OUTCOME_PRACTICABILITY' ) , rows.fieldByName( 'HOUSING_UNITS_UNINHABITABLE' ) , rows.fieldByName( 'FAMILIES_EVACUATED' ) , rows.fieldByName( 'EVACUEES_N' ) , rows.fieldByName( 'ACCURACY_VISIT' ) , rows.fieldByName( 'OTHER' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS ShedPapersJudgmentOfPracticability;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
