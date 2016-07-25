migration.up = function( migrator )
{
    try
    {
        var rs = migrator.db.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = 'BasicPD';" ) ;
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

        var rows = migrator.db.execute( 'SELECT ID , SIGN_PATH , NAME , CELL_NUMBER , AGE , JOB' + ' FROM BasicPD;' ) ;
        while( rows.isValidRow() )
        {
            migrator.db.execute( 'INSERT INTO ' + migrator.table + '( ID , SIGN_PATH , NAME , CELL_NUMBER , AGE , JOB ) VALUES (? , ? , ? , ? , ? , ?)'
                            , rows.fieldByName( 'ID' ) , rows.fieldByName( 'SIGN_PATH' ) , rows.fieldByName( 'NAME' ) , rows.fieldByName( 'CELL_NUMBER' ) , rows.fieldByName( 'AGE' ) , rows.fieldByName( 'JOB' ) ) ;

            rows.next() ;
        }
        rows.close() ;

        migrator.db.execute( 'DROP TABLE IF EXISTS BasicPD;' ) ;
    }
} ;

migration.down = function( migrator )
{

} ;
