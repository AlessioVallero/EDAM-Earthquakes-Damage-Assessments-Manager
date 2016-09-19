migration.up = function( migrator )
{
    var fieldDeepeningMotivationsAndTypeExists = false ;
    var fieldOther1Exists = false ;
    var fieldOther2Exists = false ;

    var resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ');' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "DEEPENING_MOTIVATIONS_AND_TYPE" )
        {
            fieldDeepeningMotivationsAndTypeExists = true ;
        }
        else if( resultSet.field(1) == "OTHER_1" )
        {
            fieldOther1Exists = true ;
        }
        else if( resultSet.field(1) == "OTHER_2" )
        {
            fieldOther2Exists = true ;
        }
        resultSet.next() ;
    }
    resultSet.close() ;

    if( !fieldDeepeningMotivationsAndTypeExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN DEEPENING_MOTIVATIONS_AND_TYPE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET DEEPENING_MOTIVATIONS_AND_TYPE = \'\';' ) ;
    }

    if( !fieldOther1Exists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN OTHER_1 TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET OTHER_1 = \'\';' ) ;
    }

    if( !fieldOther2Exists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN OTHER_2 TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET OTHER_2 = \'\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE AeDESFormsSectionEight_backup( FORM_ID , STRUCTURAL TEXT , NOT_STRUCTURAL TEXT , EXTERNAL TEXT , GEOTECHNICAL TEXT , OUTCOME_PRACTICABILITY TEXT , HOUSING_UNITS_UNINHABITABLE TEXT , FAMILIES_EVACUATED TEXT , EVACUEES_N TEXT , ACCURACY_VISIT TEXT , OTHER TEXT , MEASURES_OF_EMERGENCY TEXT );' ) ;
    db.execute( 'INSERT INTO AeDESFormsSectionEight_backup SELECT FORM_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER , MEASURES_OF_EMERGENCY FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
            FORM_ID: "integer PRIMARY KEY" ,
            STRUCTURAL: "TEXT" ,
            NOT_STRUCTURAL: "TEXT" ,
            EXTERNAL: "TEXT" ,
            GEOTECHNICAL: "TEXT" ,
            OUTCOME_PRACTICABILITY: "TEXT" ,
            HOUSING_UNITS_UNINHABITABLE: "TEXT" ,
            FAMILIES_EVACUATED: "TEXT" ,
            EVACUEES_N: "TEXT" ,
            ACCURACY_VISIT: "TEXT" ,
            OTHER: "TEXT" ,
            MEASURES_OF_EMERGENCY: "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT FORM_ID , STRUCTURAL , NOT_STRUCTURAL , EXTERNAL , GEOTECHNICAL , OUTCOME_PRACTICABILITY , HOUSING_UNITS_UNINHABITABLE , FAMILIES_EVACUATED , EVACUEES_N , ACCURACY_VISIT , OTHER , MEASURES_OF_EMERGENCY FROM AeDESFormsSectionEight_backup;' ) ;
    db.execute( 'DROP TABLE AeDESFormsSectionEight_backup;' ) ;
} ;
