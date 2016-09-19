migration.up = function( migrator )
{
    var fieldLocationTypeExists = false ;
    var fieldLocationDetailsExists = false ;
    var fieldCoordinatesTypeExists = false ;
    var fieldOtherCoordinatesTypeExists = false ;
    var fieldTimezoneExists = false ;
    var fieldDatumExists = false ;
    var fieldMapAggregatePathExists = false ;

    resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ');' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "LOCATION_TYPE" )
        {
            fieldLocationTypeExists = true ;
        }
        else if( resultSet.field(1) == "LOCATION_DETAILS" )
        {
            fieldLocationDetailsExists = true ;
        }
        else if( resultSet.field(1) == "COORDINATES_TYPE" )
        {
            fieldCoordinatesTypeExists = true ;
        }
        else if( resultSet.field(1) == "OTHER_COORDINATES_TYPE" )
        {
            fieldOtherCoordinatesTypeExists = true ;
        }
        else if( resultSet.field(1) == "TIMEZONE" )
        {
            fieldTimezoneExists = true ;
        }
        else if( resultSet.field(1) == "DATUM" )
        {
            fieldDatumExists = true ;
        }
        else if( resultSet.field(1) == "MAP_AGGREGATE_PATH" )
        {
            fieldMapAggregatePathExists = true ;
        }
        resultSet.next() ;
    }
    resultSet.close() ;

    if( !fieldLocationTypeExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN LOCATION_TYPE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET LOCATION_TYPE = \'\';' ) ;
    }

    if( !fieldLocationDetailsExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN LOCATION_DETAILS TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET LOCATION_DETAILS = \'\';' ) ;
    }

    if( !fieldCoordinatesTypeExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN COORDINATES_TYPE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET COORDINATES_TYPE = \'\';' ) ;
    }

    if( !fieldOtherCoordinatesTypeExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN OTHER_COORDINATES_TYPE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET OTHER_COORDINATES_TYPE = \'\';' ) ;
    }

    if( !fieldTimezoneExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN TIMEZONE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET TIMEZONE = \'\';' ) ;
    }

    if( !fieldDatumExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN DATUM TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET DATUM = \'\';' ) ;
    }

    if( !fieldMapAggregatePathExists )
    {
      migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN MAP_AGGREGATE_PATH TEXT;' ) ;
      migrator.db.execute( 'UPDATE ' + migrator.table + ' SET MAP_AGGREGATE_PATH = \'\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE AeDESFormsSectionOne_backup( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , BUILDING_POSITION , B_NAME_OR_OWNER , CODE_OF_USE );' ) ;
    db.execute( 'INSERT INTO AeDESFormsSectionOne_backup SELECT FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , BUILDING_POSITION , B_NAME_OR_OWNER , CODE_OF_USE FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
            "FORM_ID": "integer PRIMARY KEY" ,
            "LATITUDE": "TEXT" ,
            "LONGITUDE": "TEXT" ,
            "ALTITUDE": "TEXT" ,
            "PROVINCE": "TEXT" ,
            "MUNICIPALITY": "TEXT" ,
            "PLACE": "TEXT" ,
            "ADDRESS": "TEXT" ,
            "CIVIC_NO": "TEXT" ,
            "BUILDING_POSITION": "TEXT" ,
            "B_NAME_OR_OWNER": "TEXT" ,
            "CODE_OF_USE": "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , BUILDING_POSITION , B_NAME_OR_OWNER , CODE_OF_USE FROM AeDESFormsSectionOne_backup;' ) ;
    db.execute( 'DROP TABLE AeDESFormsSectionOne_backup;' ) ;
} ;
