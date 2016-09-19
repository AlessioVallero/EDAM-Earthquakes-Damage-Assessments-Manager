migration.up = function( migrator )
{
    var fieldPublicPropertyExists = false ;
    var fieldPrivatePropertyExists = false ;

    var resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ');' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "PUBLIC_PROPERTY" )
        {
            fieldPublicPropertyExists = true ;
        }
        else if( resultSet.field(1) == "PRIVATE_PROPERTY" )
        {
            fieldPrivatePropertyExists = true ;
        }
        resultSet.next() ;
    }
    resultSet.close() ;

    if( !fieldPublicPropertyExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN PUBLIC_PROPERTY TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET PUBLIC_PROPERTY = \'0\';' ) ;
    }

    if( !fieldPrivatePropertyExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN PRIVATE_PROPERTY TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET PRIVATE_PROPERTY = \'100\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE AeDESFormsSectionTwo_backup( FORM_ID , PLANS_NO , AVERAGE_HEIGHT_OF_FLOOR , UNDERGROUND_PLANS_NO , AVERAGE_SURFACE , CONSTRUCTION_AGE , RENOVATION_AGE , UNIT_OF_USE_HOUSING , UNIT_OF_USE_PRODUCTIVE , UNIT_OF_USE_COMMERCE , UNIT_OF_USE_OFFICES , UNIT_OF_USE_PUBLIC_SERVICES , UNIT_OF_USE_DEPOSIT , UNIT_OF_USE_STRATEGIC , UNIT_OF_USE_TOURISM , UTILIZATION , OCCUPANTS , PROPERTY );' ) ;
    db.execute( 'INSERT INTO AeDESFormsSectionTwo_backup SELECT FORM_ID , PLANS_NO , AVERAGE_HEIGHT_OF_FLOOR , UNDERGROUND_PLANS_NO , AVERAGE_SURFACE , CONSTRUCTION_AGE , RENOVATION_AGE , UNIT_OF_USE_HOUSING , UNIT_OF_USE_PRODUCTIVE , UNIT_OF_USE_COMMERCE , UNIT_OF_USE_OFFICES , UNIT_OF_USE_PUBLIC_SERVICES , UNIT_OF_USE_DEPOSIT , UNIT_OF_USE_STRATEGIC , UNIT_OF_USE_TOURISM , UTILIZATION , OCCUPANTS , PUBLIC_PROPERTY FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
            "FORM_ID": "integer PRIMARY KEY" ,
            "PLANS_NO": "TEXT" ,
            "AVERAGE_HEIGHT_OF_FLOOR": "TEXT" ,
            "UNDERGROUND_PLANS_NO": "TEXT" ,
            "AVERAGE_SURFACE": "TEXT" ,
            "CONSTRUCTION_AGE": "TEXT" ,
            "RENOVATION_AGE": "TEXT" ,
            "UNIT_OF_USE_HOUSING": "TEXT" ,
            "UNIT_OF_USE_PRODUCTIVE": "TEXT" ,
            "UNIT_OF_USE_COMMERCE": "TEXT" ,
            "UNIT_OF_USE_OFFICES": "TEXT" ,
            "UNIT_OF_USE_PUBLIC_SERVICES": "TEXT" ,
            "UNIT_OF_USE_DEPOSIT": "TEXT" ,
            "UNIT_OF_USE_STRATEGIC": "TEXT" ,
            "UNIT_OF_USE_TOURISM": "TEXT" ,
            "UTILIZATION": "TEXT" ,
            "OCCUPANTS": "TEXT" ,
            "PROPERTY": "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT FORM_ID , PLANS_NO , AVERAGE_HEIGHT_OF_FLOOR , UNDERGROUND_PLANS_NO , AVERAGE_SURFACE , CONSTRUCTION_AGE , RENOVATION_AGE , UNIT_OF_USE_HOUSING , UNIT_OF_USE_PRODUCTIVE , UNIT_OF_USE_COMMERCE , UNIT_OF_USE_OFFICES , UNIT_OF_USE_PUBLIC_SERVICES , UNIT_OF_USE_DEPOSIT , UNIT_OF_USE_STRATEGIC , UNIT_OF_USE_TOURISM , UTILIZATION , OCCUPANTS , PROPERTY FROM AeDESFormsSectionTwo_backup;' ) ;
    db.execute( 'DROP TABLE AeDESFormsSectionTwo_backup;' ) ;
} ;
