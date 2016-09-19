migration.up = function( migrator )
{
    var fieldFormIdExists = false ;
    var fieldTeamExists = false ;
    var fieldIstatRegExists = false ;
    var fieldIstatProvExists = false ;
    var fieldIstatPublicExists = false ;
    var fieldAggregateNExists = false ;
    var fieldBuildingNExists = false ;
    var fieldIstatPlaceCodeExists = false ;
    var fieldPaperTypeExists = false ;
    var fieldPaperNExists = false ;
    var fieldIstatCensusExists = false ;
    var fieldSheetExists = false ;
    var fieldAttachmentExists = false ;
    var fieldParticlesExists = false ;

    resultSet = db.execute( 'PRAGMA TABLE_INFO(' + migrator.table + ');' ) ;
    while( resultSet.isValidRow() )
    {
        if( resultSet.field(1) == "FORM_ID" )
        {
            fieldFormIdExists = true ;
        }
        else if( resultSet.field(1) == "TEAM" )
        {
            fieldTeamExists = true ;
        }
        else if( resultSet.field(1) == "ISTAT_REG" )
        {
            fieldIstatRegExists = true ;
        }
        else if( resultSet.field(1) == "ISTAT_PROV" )
        {
            fieldIstatProvExists = true ;
        }
        else if( resultSet.field(1) == "ISTAT_PUBLIC" )
        {
            fieldIstatPublicExists = true ;
        }
        else if( resultSet.field(1) == "AGGREGATE_N" )
        {
            fieldAggregateNExists = true ;
        }
        else if( resultSet.field(1) == "BUILDING_N" )
        {
            fieldBuildingNExists = true ;
        }
        else if( resultSet.field(1) == "ISTAT_PLACE_CODE" )
        {
            fieldIstatPlaceCodeExists = true ;
        }
        else if( resultSet.field(1) == "PAPER_TYPE" )
        {
            fieldPaperTypeExists = true ;
        }
        else if( resultSet.field(1) == "PAPER_N" )
        {
            fieldPaperNExists = true ;
        }
        else if( resultSet.field(1) == "ISTAT_CENSUS_SECTION" )
        {
            fieldIstatCensusExists = true ;
        }
        else if( resultSet.field(1) == "SHEET" )
        {
            fieldSheetExists = true ;
        }
        else if( resultSet.field(1) == "ATTACHMENT" )
        {
            fieldAttachmentExists = true ;
        }
        else if( resultSet.field(1) == "PARTICLES" )
        {
            fieldParticlesExists = true ;
        }
        resultSet.next() ;
    }

    if( !fieldFormIdExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN FORM_ID TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET FORM_ID = \'\';' ) ;
    }

    if( !fieldTeamExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN TEAM TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET TEAM = \'\';' ) ;
    }

    if( !fieldIstatRegExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN ISTAT_REG TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET ISTAT_REG = \'\';' ) ;
    }

    if( !fieldIstatProvExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN ISTAT_PROV TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET ISTAT_PROV = \'\';' ) ;
    }

    if( !fieldIstatPublicExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN ISTAT_PUBLIC TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET ISTAT_PUBLIC = \'\';' ) ;
    }

    if( !fieldAggregateNExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN AGGREGATE_N TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET AGGREGATE_N = \'\';' ) ;
    }

    if( !fieldBuildingNExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN BUILDING_N TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET BUILDING_N = \'\';' ) ;
    }

    if( !fieldIstatPlaceCodeExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN ISTAT_PLACE_CODE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET ISTAT_PLACE_CODE = \'\';' ) ;
    }

    if( !fieldPaperTypeExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN PAPER_TYPE TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET PAPER_TYPE = \'\';' ) ;
    }

    if( !fieldPaperNExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN PAPER_N TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET PAPER_N = \'\';' ) ;
    }

    if( !fieldIstatCensusExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN ISTAT_CENSUS_SECTION TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET ISTAT_CENSUS_SECTION = \'\';' ) ;
    }

    if( !fieldSheetExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN SHEET TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET SHEET = \'\';' ) ;
    }

    if( !fieldAttachmentExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN ATTACHMENT TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET ATTACHMENT = \'\';' ) ;
    }

    if( !fieldParticlesExists )
    {
        migrator.db.execute( 'ALTER TABLE ' + migrator.table + ' ADD COLUMN PARTICLES TEXT;' ) ;
        migrator.db.execute( 'UPDATE ' + migrator.table + ' SET PARTICLES = \'\';' ) ;
    }
} ;

migration.down = function( migrator )
{
    var db = migrator.db ;
    var table = migrator.table ;
    db.execute( 'CREATE TEMPORARY TABLE AeDESForms_backup( ID , FORM_NO , DATE ,USER , SYNCHRONIZED );' ) ;
    db.execute( 'INSERT INTO AeDESForms_backup SELECT ID , FORM_NO , DATE , USER , SYNCHRONIZED FROM ' + table + ';' ) ;
    migrator.dropTable() ;
    migrator.createTable(
    {
        columns:
        {
            "ID": "integer PRIMARY KEY AUTOINCREMENT" ,
    				"FORM_NO": "TEXT" ,
    		    "DATE": "TEXT" ,
            "USER": "TEXT" ,
            "SYNCHRONIZED": "TEXT"
        } ,
    } ) ;
    db.execute( 'INSERT INTO ' + table + ' SELECT ID , FORM_ID , FORM_NO , DATE , USER , SYNCHRONIZED FROM AeDESForms_backup;' ) ;
    db.execute( 'DROP TABLE AeDESForms_backup;' ) ;
} ;
