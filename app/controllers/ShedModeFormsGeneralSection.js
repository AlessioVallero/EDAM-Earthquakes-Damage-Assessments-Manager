var args = arguments[0] || {};
var current_form_id = args.form_id ;
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Array of controls to disable/enable during a busy state
var controls = new Array() ;
if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}
else
{
    controls.push( $.widgetAppButtonMakeVideo.get_button() ) ;
}
controls.push( $.widgetAppButtonSave.get_button() ) ;
controls.push( $.widgetAppButtonSend.get_button() ) ;
controls.push( $.widgetAppButtonShedDamageAssessments.get_button() ) ;
controls.push( $.widgetAppButtonMakeDraft.get_button() ) ;
controls.push( $.widgetAppButtonViewMedia.get_button() ) ;
controls.push( $.widgetAppButtonMakeMedia.get_button() ) ;

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;

// The current heading direction
var sCurrentHeading = "" ;
var timeout = null ;

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    // We can go back only if a saving is not in progress
    if( !bIsWorkInProgress )
    {
        Back() ;
    }
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back() ;
}

// Back function
function Back()
{
    try
    {
        Save( 'generic_lose_changes_title' , 'lose_changes_confirm_msg' , function()
        {
            Alloy.Globals.ShedModeDetails = new Array() ;
            Alloy.Globals.ShedModeShedPosition = new Array() ;
            Alloy.Globals.ShedModeShedCharacteristics = new Array() ;
            Alloy.Globals.ShedModeInfrastructure = new Array() ;
            Alloy.Globals.ShedModeDamages = new Array() ;
            Alloy.Globals.ShedModeJudgmentOfPracticability = new Array() ;
            Alloy.Globals.ShedModeOtherComments = new Array() ;
            Alloy.Globals.CurrentPicsPath = null ;
            Alloy.Globals.CurrentVideosPath = null ;

            controls = null ;

            Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "shed_mode:save" ) ;
            Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;

            // On iOS devices, the NavigationWindow will be closed.
            // Instead on Android devices, the Window will be close
            if( OS_IOS )
            {
                $.navigationWindowShedModeFormsGeneralSection.close() ;
            }
            else
            {
                $.shedModeFormsGeneralSectionWindow.close() ;
            }
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var bCanClickOnTableView = true ;

// Fill the Alloy.Globals.ShedModeDetails with default values
function CreateDefaultDetailsArray()
{
    var current_date = new Date() ;
    var current_time = current_date.getTime() ;

    var default_form_no = current_date.getFullYear().toFixed( 0 ) ;
    Alloy.Globals.ShedModeDetails =
    {
        "FORM_NO": default_form_no ,  // ToString of the current datetime
        "DATE": current_time.toString() // Now
    } ;
}

// Load Details data
function LoadDetailsData()
{
    if( Alloy.Globals.ShedModeDetails && _.size( Alloy.Globals.ShedModeDetails ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var recoverDetails = ShedModeUtils.LoadDetailsQuery( current_form_id ) ;

            if( recoverDetails.length > 0 )
            {
                var detailsData = recoverDetails.at( 0 ) ;
                Alloy.Globals.ShedModeDetails =
                {
                    "FORM_NO": detailsData.get( "FORM_NO" ) ,
                    "DATE": detailsData.get( "DATE" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultDetailsArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultDetailsArray() ;
        }
    }
}

// Details opening
function OpenDetails()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadDetailsData() ;
        // Controller creation for the Next View (inited in Shed Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDetailsView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ShedModeShedPosition with default values
function CreateDefaultShedPositionArray()
{
    Alloy.Globals.ShedModeShedPosition =
    {
        "LATITUDE": "" ,     // Empty
        "LONGITUDE": "" ,    // Empty
        "ALTITUDE": "" ,     // Empty
        "PROVINCE": "" ,     // Empty
        "MUNICIPALITY": "" , // Empty
        "PLACE": "" ,        // Empty
        "ADDRESS": "" ,      // Empty
        "CIVIC_NO": ""       // Empty
    } ;
}

// Load Building Position data
function LoadShedPositionData()
{
    if( Alloy.Globals.ShedModeShedPosition && _.size( Alloy.Globals.ShedModeShedPosition ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var recoverBuildingsPositions = ShedModeUtils.LoadShedPositionQuery( current_form_id ) ;

            if( recoverBuildingsPositions.length > 0 )
            {
                var shedPositionData = recoverBuildingsPositions.at( 0 ) ;
                Alloy.Globals.ShedModeShedPosition =
                {
                    "LATITUDE": shedPositionData.get( "LATITUDE" ) ,
                    "LONGITUDE": shedPositionData.get( "LONGITUDE" ) ,
                    "ALTITUDE": shedPositionData.get( "ALTITUDE" ) ,
                    "PROVINCE": shedPositionData.get( "PROVINCE" ) ,
                    "MUNICIPALITY": shedPositionData.get( "MUNICIPALITY" ) ,
                    "PLACE": shedPositionData.get( "PLACE" ) ,
                    "ADDRESS": shedPositionData.get( "ADDRESS" ) ,
                    "CIVIC_NO": shedPositionData.get( "CIVIC_NO" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultShedPositionArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultShedPositionArray() ;
        }
    }
}

// Building position opening
function OpenShedPosition()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadShedPositionData() ;
        // Controller creation for the Next View (inited in Shed Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsShedPositionView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ShedModeShedCharacteristics with default values
function CreateDefaultShedCharacteristicsArray()
{
    Alloy.Globals.ShedModeShedCharacteristics =
    {
        "SITE": "0" ,                     // Lowland
        "NOT_UNDERGROUND_PLANS_NO": "0" , // 1
        "USAGE": "0"                      // Productive
    } ;
}

// Load Building Characteristics data
function LoadShedCharacteristicsData()
{
    if( Alloy.Globals.ShedModeShedCharacteristics && _.size( Alloy.Globals.ShedModeShedCharacteristics ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var recoverShedCharacteristics = ShedModeUtils.LoadShedCharacteristicsQuery( current_form_id ) ;

            if( recoverShedCharacteristics.length > 0 )
            {
                var shedCharacteristicsData = recoverShedCharacteristics.at( 0 ) ;
                Alloy.Globals.ShedModeShedCharacteristics =
                {
                    "SITE": shedCharacteristicsData.get( "SITE" ) ,
                    "NOT_UNDERGROUND_PLANS_NO": shedCharacteristicsData.get( "NOT_UNDERGROUND_PLANS_NO" ) ,
                    "USAGE": shedCharacteristicsData.get( "USAGE" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultShedCharacteristicsArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultShedCharacteristicsArray() ;
        }
    }    
}

// Building characteristics opening
function OpenShedCharacteristics()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadShedCharacteristicsData() ;
        // Controller creation for the Next View (inited in Shed Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsShedCharacteristicsView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ShedModeInfrastructure with default values
function CreateDefaultInfrastructureArray()
{
    Alloy.Globals.ShedModeInfrastructure =
    {
        "PRIMARY_GIRDERS": "0" ,          // Inverted T
        "THICKNESS_OF_THE_TILES": "1" ,   // <=5
        "TYPICAL_LIGHTS": "0" ,           // <=10
        "COVERAGE": "0" ,                 // Ribbed dual slope
        "INCLINATION_OF_THE_ROOF": "0" ,  // <=10%
        "INFILL_ELEMENTS": "0" ,          // Internal of the pillar
        "VERTICAL_WALLS": "0" ,           // Masonry blocks
        "SHELVING": "0"                   // Indoor SDI
    } ;
}

// Load Infrastructure data
function LoadInfrastructureData()
{
    if( Alloy.Globals.ShedModeInfrastructure && _.size( Alloy.Globals.ShedModeInfrastructure ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var recoverInfrastructure = ShedModeUtils.LoadInfrastructureQuery( current_form_id ) ;

            if( recoverInfrastructure.length > 0 )
            {
                var infrastructureData = recoverInfrastructure.at( 0 ) ;
                Alloy.Globals.ShedModeInfrastructure =
                {
                    "PRIMARY_GIRDERS": infrastructureData.get( "PRIMARY_GIRDERS" ) ,
                    "THICKNESS_OF_THE_TILES": infrastructureData.get( "THICKNESS_OF_THE_TILES" ) ,
                    "TYPICAL_LIGHTS": infrastructureData.get( "TYPICAL_LIGHTS" ) ,
                    "COVERAGE": infrastructureData.get( "COVERAGE" ) ,
                    "INCLINATION_OF_THE_ROOF": infrastructureData.get( "INCLINATION_OF_THE_ROOF" ) ,
                    "INFILL_ELEMENTS": infrastructureData.get( "INFILL_ELEMENTS" ) ,
                    "VERTICAL_WALLS": infrastructureData.get( "VERTICAL_WALLS" ) ,
                    "SHELVING": infrastructureData.get( "SHELVING" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultInfrastructureArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultInfrastructureArray() ;
        }
    }
}

// Infrastructure opening
function OpenInfrastructure()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadInfrastructureData() ;
        // Controller creation for the Next View (inited in Shed Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsInfrastructureView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ShedModeDamages with default values
function CreateDefaultDamagesArray()
{
    Alloy.Globals.ShedModeDamages =
    {
        "DAMAGES": "000000000000000000000000000000000000000000000000000000000" , // all false
        "MEASURES_OF_EMERGENCY": "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" // all false
    } ;
}

// Load Damages data
function LoadDamagesData()
{
    if( Alloy.Globals.ShedModeDamages && _.size( Alloy.Globals.ShedModeDamages ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var recoverDamages = ShedModeUtils.LoadDamagesQuery( current_form_id ) ;

            if( recoverDamages.length > 0 )
            {
                var damagesData = recoverDamages.at( 0 ) ;
                Alloy.Globals.ShedModeDamages =
                {
                    "DAMAGES": damagesData.get( "DAMAGES" ) ,
                    "MEASURES_OF_EMERGENCY": damagesData.get( "MEASURES_OF_EMERGENCY" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultDamagesArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultDamagesArray() ;
        }
    }
}

// Damages opening
function OpenDamages()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadDamagesData() ;
        // Controller creation for the Next View (inited in Shed Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ShedModeJudgmentOfPracticability with default values
function CreateDefaultJudgmentOfPracticabilityArray()
{
    Alloy.Globals.ShedModeJudgmentOfPracticability =
    {
        "STRUCTURAL": "0" ,                             // Low
        "NOT_STRUCTURAL": "0" ,                         // Low
        "EXTERNAL": "0" ,                               // Low
        "GEOTECHNICAL": "0" ,                           // Low
        "OUTCOME_PRACTICABILITY": "0" ,                 // Accessible
        "HOUSING_UNITS_UNINHABITABLE": "" ,             // Empty
        "FAMILIES_EVACUATED": "" ,                      // Empty
        "EVACUEES_N": "" ,                              // Empty
        "ACCURACY_VISIT": "0" ,                         // Complete (>2/3)
        "OTHER": "" ,                                   // Empty
    } ;
}

// Load JudgmentOfPracticability data
function LoadJudgmentOfPracticabilityData()
{
    if( Alloy.Globals.ShedModeJudgmentOfPracticability && _.size( Alloy.Globals.ShedModeJudgmentOfPracticability ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var recoverJudgmentOfPracticability = ShedModeUtils.LoadJudgmentOfPracticabilityQuery( current_form_id ) ;

            if( recoverJudgmentOfPracticability.length > 0 )
            {
                var judgmentOfPracticabilityData = recoverJudgmentOfPracticability.at( 0 ) ;
                Alloy.Globals.ShedModeJudgmentOfPracticability =
                {
                    "STRUCTURAL": judgmentOfPracticabilityData.get( "STRUCTURAL" ) ,
                    "NOT_STRUCTURAL": judgmentOfPracticabilityData.get( "NOT_STRUCTURAL" ) ,
                    "EXTERNAL": judgmentOfPracticabilityData.get( "EXTERNAL" ) ,
                    "GEOTECHNICAL": judgmentOfPracticabilityData.get( "GEOTECHNICAL" ) ,
                    "OUTCOME_PRACTICABILITY": judgmentOfPracticabilityData.get( "OUTCOME_PRACTICABILITY" ) ,
                    "HOUSING_UNITS_UNINHABITABLE": judgmentOfPracticabilityData.get( "HOUSING_UNITS_UNINHABITABLE" ) ,
                    "FAMILIES_EVACUATED": judgmentOfPracticabilityData.get( "FAMILIES_EVACUATED" ) ,
                    "EVACUEES_N": judgmentOfPracticabilityData.get( "EVACUEES_N" ) ,
                    "ACCURACY_VISIT": judgmentOfPracticabilityData.get( "ACCURACY_VISIT" ) ,
                    "OTHER": judgmentOfPracticabilityData.get( "OTHER" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultJudgmentOfPracticabilityArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultJudgmentOfPracticabilityArray() ;
        }
    }
}

// JudgmentOfPracticability opening
function OpenJudgmentOfPracticability()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadJudgmentOfPracticabilityData() ;
        // Controller creation for the Next View (inited in Shed Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsJudgmentOfPracticabilityView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ShedModeOtherComments with default values
function CreateDefaultOtherCommentsArray()
{
    Alloy.Globals.ShedModeOtherComments =
    {
        "TOPIC": "" ,        // Empty
        "OTHER_COMMENTS": "" // Empty
    } ;
}

// Load OtherComments data
function LoadOtherCommentsData()
{
    if( Alloy.Globals.ShedModeOtherComments && _.size( Alloy.Globals.ShedModeOtherComments ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var recoverOtherComments = ShedModeUtils.LoadOtherCommentsQuery( current_form_id ) ;

            if( recoverOtherComments.length > 0 )
            {
                var otherCommentsData = recoverOtherComments.at( 0 ) ;
                Alloy.Globals.ShedModeOtherComments =
                {
                    "TOPIC": otherCommentsData.get( "TOPIC" ) ,
                    "OTHER_COMMENTS": otherCommentsData.get( "OTHER_COMMENTS" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultOtherCommentsArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultOtherCommentsArray() ;
        }
    }
}

// OtherComments opening
function OpenOtherComments()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadOtherCommentsData() ;
        // Controller creation for the Next View (inited in Shed Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsOtherCommentsView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Load Team Personal data
function LoadTeamPersonalData()
{
    var ShedModeUtils = require( '/ShedModeUtils' ) ;
    ShedModeUtils.LoadTeamPersonalData() ;
}

// Handle the click event on a node
function handleMenuClick( _event )
{
    try
    {
        if( bCanClickOnTableView )
        {
            BusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                // Open the corresponding controller
                switch( _event.row.id )
                {
                    case 0:
                    {
                        OpenDetails() ;
                    }
                    break ;
        
                    case 1:
                    {
                        OpenShedPosition() ;
                    }
                    break ;
        
                    case 2:
                    {
                        OpenShedCharacteristics() ;
                    }
                    break ;
        
                    case 3:
                    {
                        OpenInfrastructure() ;
                    }
                    break ;

                    case 4:
                    {
                        OpenDamages() ;
                    }
                    break ;

                    case 5:
                    {
                        OpenJudgmentOfPracticability() ;
                    }
                    break ;

                    case 6:
                    {
                        OpenOtherComments() ;
                    }
                    break ;
                }

                bRet = true ;

                return bRet ;
            } ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Save( 'generic_save_title' , 'save_confirm_msg' ) ;
}

// Save function
function Save( title , message , callbackFnt )
{
    if( view_enabled )
    {
        // AlertDialog to ask user if it's sure about saving
        var alertDialog = Titanium.UI.createAlertDialog(
        {
            title: L( title ) ,
            message: L( message ) ,             
            buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
            cancel: 1
        } ) ;
        alertDialog.addEventListener( 'click' , function( e )
        {
            if( e.index == 0 )
            {
                SaveInternal() ;
            }
            else if( e.index == 1 )
            {
                // Clicked "NO"
            }

            if( callbackFnt )
            {
                callbackFnt() ;
            }
        } ) ;
        // Show alert message for saving
        alertDialog.show() ;
    }
    else
    {
        if( callbackFnt )
        {
            callbackFnt() ;
        }
    }
}

// Save internal function
function SaveInternal()
{
    BusyAction( $.activity_indicator , controls , function()
    {
        var bRet = false ;

        try
        {
            bCanClickOnTableView = false ;
            bIsWorkInProgress = true ;

            var bError = false ;

            var user = "" ;
            if( Alloy.Globals.ExistSession() )
            {
                user = Alloy.Globals.SessionUsername ;
            }
            // Details
            var queryDetails = null ;
            // If the form id is equal -1, this is a new Form
            if( current_form_id == -1 )
            {
                Ti.API.info( '\n\nDetails:' ) ;
                queryDetails = "INSERT INTO ShedForms( FORM_NO, DATE, USER, SYNCHRONIZED ) VALUES( " ;
    
                // If the array isn't null or empty, we have also some details
                // Otherwise we insert empty values
                if( Alloy.Globals.ShedModeDetails && _.size( Alloy.Globals.ShedModeDetails ) > 0 )
                {
                    if( Alloy.Globals.ShedModeDetails["FORM_NO"] )
                    {
                        // We'll use the setted one
                    }
                    else
                    {
                        // A default one will be used
                        var current_date = new Date() ;
                    
                        Alloy.Globals.ShedModeDetails["FORM_NO"] = current_date.getFullYear().toFixed( 0 ) ;
                    }

                    var detailsModel = Alloy.createModel( "ShedForms" ,
                    {
                        FORM_NO: Alloy.Globals.ShedModeDetails["FORM_NO"] ,
                        DATE: Alloy.Globals.ShedModeDetails["DATE"] ,
                        USER: user ,
                        SYNCHRONIZED: "0"
                    } ) ;
                    detailsModel.save() ;
                    detailsModel = null ;
                }
                else
                {
                    // A default form_no will be used
                    var current_date = new Date() ;
                    var current_time = current_date.getTime() ;
                
                    var default_form_no = current_date.getFullYear().toFixed( 0 ) ;
                    var detailsModel = Alloy.createModel( "ShedForms" ,
                    {
                        FORM_NO: default_form_no ,
                        DATE: current_time.toString() ,
                        USER: user ,
                        SYNCHRONIZED: "0"
                    } ) ;
                    detailsModel.save() ;
                    detailsModel = null ;
                }
            }
            else
            {
                // If the array isn't null or empty, we have some details to update
                // Otherwise no operations are needed
                if( Alloy.Globals.ShedModeDetails && _.size( Alloy.Globals.ShedModeDetails ) > 0 )
                {
                    if( Alloy.Globals.ShedModeDetails["FORM_NO"] )
                    {
                        // We'll use the setted one
                    }
                    else
                    {
                        // A default one will be used
                        var current_date = new Date() ;
                    
                        Alloy.Globals.ShedModeDetails["FORM_NO"] = current_date.getFullYear().toFixed( 0 ) ;
                    }

                    var recoverDetails = Alloy.createCollection( 'ShedForms' ) ;
                    recoverDetails.fetch(
                    {
                        query: "SELECT * FROM ShedForms where ID = " + current_form_id
                    } ) ;
                    if( recoverDetails.length > 0 )
                    {
                        var currentDetails = recoverDetails.at( 0 ) ;
                        currentDetails.set(
                        {
                            FORM_NO: Alloy.Globals.ShedModeDetails["FORM_NO"] ,
                            DATE: Alloy.Globals.ShedModeDetails["DATE"] ,
                            USER: user ,
                            SYNCHRONIZED: "0"
                        } ) ;
                        currentDetails.save() ;
                        currentDetails = null ;
                    }
                }
                else
                {
                    if( user )
                    {
                        // Update of the User, if necessary
                        var recoverDetails = Alloy.createCollection( 'ShedForms' ) ;
                        recoverDetails.fetch(
                        {
                            query: "SELECT * FROM ShedForms where ID = " + current_form_id
                        } ) ;
                        if( recoverDetails.length > 0 )
                        {
                            var currentDetails = recoverDetails.at( 0 ) ;
                            currentDetails.set(
                            {
                                USER: user
                            } ) ;
                            currentDetails.save() ;
                            currentDetails = null ;
                        }
                    }
                }
            }
    
            // If the form_id was empty, we have to fill it with the generated one
            if( current_form_id == - 1 )
            {
                var recoverID = Alloy.createCollection( 'ShedForms' ) ;
                recoverID.fetch(
                {
                    query: "SELECT max(ID) AS MAX_ID FROM ShedForms;"
                } ) ;
                if( recoverID.length > 0 )
                {
                    current_form_id = recoverID.at( 0 ).get( "MAX_ID" ) ;

                    recoverID = null ;
                }

                Ti.API.info( '\nNEW_ID: ' + current_form_id ) ;
            }
    
            // If the array isn't null or empty, we have the details of the Shed position
            if( Alloy.Globals.ShedModeShedPosition && _.size( Alloy.Globals.ShedModeShedPosition ) > 0 )
            {
                Ti.API.info( '\nShedPosition:\n' ) ;
    
                var recoverShedPosition = Alloy.createCollection( 'ShedFormsShedsPositions' ) ;
                recoverShedPosition.fetch(
                {
                    query: "SELECT * FROM ShedFormsShedsPositions where FORM_ID = " + current_form_id
                } ) ;
                if( recoverShedPosition.length > 0 )
                {
                    var currentShedPosition = recoverShedPosition.at( 0 ) ;
                    currentShedPosition.set(
                    {
                        LATITUDE: Alloy.Globals.ShedModeShedPosition["LATITUDE"] ,
                        LONGITUDE: Alloy.Globals.ShedModeShedPosition["LONGITUDE"] ,
                        ALTITUDE: Alloy.Globals.ShedModeShedPosition["ALTITUDE"] ,
                        PROVINCE: Alloy.Globals.ShedModeShedPosition["PROVINCE"] ,
                        MUNICIPALITY: Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"] ,
                        PLACE: Alloy.Globals.ShedModeShedPosition["PLACE"] ,
                        ADDRESS: Alloy.Globals.ShedModeShedPosition["ADDRESS"] ,
                        CIVIC_NO: Alloy.Globals.ShedModeShedPosition["CIVIC_NO"]
                    } ) ;
                    currentShedPosition.save() ;
                    currentShedPosition = null ;
                }
                else
                {
                    var shedPositionModel = Alloy.createModel( "ShedFormsShedsPositions" ,
                    {
                        FORM_ID: current_form_id ,
                        LATITUDE: Alloy.Globals.ShedModeShedPosition["LATITUDE"] ,
                        LONGITUDE: Alloy.Globals.ShedModeShedPosition["LONGITUDE"] ,
                        ALTITUDE: Alloy.Globals.ShedModeShedPosition["ALTITUDE"] ,
                        PROVINCE: Alloy.Globals.ShedModeShedPosition["PROVINCE"] ,
                        MUNICIPALITY: Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"] ,
                        PLACE: Alloy.Globals.ShedModeShedPosition["PLACE"] ,
                        ADDRESS: Alloy.Globals.ShedModeShedPosition["ADDRESS"] ,
                        CIVIC_NO: Alloy.Globals.ShedModeShedPosition["CIVIC_NO"]
                    } ) ;
                    shedPositionModel.save() ;
                    shedPositionModel = null ;
                }
            }
    
            // If the array isn't null or empty, we have the details of the Shed characteristics
            if( Alloy.Globals.ShedModeShedCharacteristics && _.size( Alloy.Globals.ShedModeShedCharacteristics ) > 0 )
            {
                Ti.API.info( '\nShedCharacteristics:\n' ) ;

                var recoverShedCharacteristics = Alloy.createCollection( 'ShedFormsShedsCharacteristics' ) ;
                recoverShedCharacteristics.fetch(
                {
                    query: "SELECT * FROM ShedFormsShedsCharacteristics where FORM_ID = " + current_form_id
                } ) ;
                if( recoverShedCharacteristics.length > 0 )
                {
                    var currentShedCharacteristics = recoverShedCharacteristics.at( 0 ) ;
                    currentShedCharacteristics.set(
                    {
                        SITE: Alloy.Globals.ShedModeShedCharacteristics["SITE"] ,
                        NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ,
                        USAGE: Alloy.Globals.ShedModeShedCharacteristics["USAGE"]
                    } ) ;
                    currentShedCharacteristics.save() ;
                    currentShedCharacteristics = null ;
                }
                else
                {
                    var shedCharacteristicsModel = Alloy.createModel( "ShedFormsShedsCharacteristics" ,
                    {
                        FORM_ID: current_form_id ,
                        SITE: Alloy.Globals.ShedModeShedCharacteristics["SITE"] ,
                        NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ,
                        USAGE: Alloy.Globals.ShedModeShedCharacteristics["USAGE"]
                    } ) ;
                    shedCharacteristicsModel.save() ;
                    shedCharacteristicsModel = null ;
                }
            }
    
            // If the array isn't null or empty, we have the details of the Infrastructure
            if( Alloy.Globals.ShedModeInfrastructure && _.size( Alloy.Globals.ShedModeInfrastructure ) > 0 )
            {
                Ti.API.info( '\nInfrastructure:\n' ) ;

                var recoverInfrastructure = Alloy.createCollection( 'ShedFormsInfrastructure' ) ;
                recoverInfrastructure.fetch(
                {
                    query: "SELECT * FROM ShedFormsInfrastructure where FORM_ID = " + current_form_id
                } ) ;
                if( recoverInfrastructure.length > 0 )
                {
                    var currentInfrastructure = recoverInfrastructure.at( 0 ) ;
                    currentInfrastructure.set(
                    {
                        PRIMARY_GIRDERS: Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] ,
                        THICKNESS_OF_THE_TILES: Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] ,
                        TYPICAL_LIGHTS: Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] ,
                        COVERAGE: Alloy.Globals.ShedModeInfrastructure["COVERAGE"] ,
                        INCLINATION_OF_THE_ROOF: Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] ,
                        INFILL_ELEMENTS: Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] ,
                        VERTICAL_WALLS: Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] ,
                        SHELVING: Alloy.Globals.ShedModeInfrastructure["SHELVING"]
                    } ) ;
                    currentInfrastructure.save() ;
                    currentInfrastructure = null ;
                }
                else
                {
                    var infrastructureModel = Alloy.createModel( "ShedFormsInfrastructure" ,
                    {
                        FORM_ID: current_form_id ,
                        PRIMARY_GIRDERS: Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] ,
                        THICKNESS_OF_THE_TILES: Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] ,
                        TYPICAL_LIGHTS: Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] ,
                        COVERAGE: Alloy.Globals.ShedModeInfrastructure["COVERAGE"] ,
                        INCLINATION_OF_THE_ROOF: Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] ,
                        INFILL_ELEMENTS: Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] ,
                        VERTICAL_WALLS: Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] ,
                        SHELVING: Alloy.Globals.ShedModeInfrastructure["SHELVING"]
                    } ) ;
                    infrastructureModel.save() ;
                    infrastructureModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Damages
            if( Alloy.Globals.ShedModeDamages && _.size( Alloy.Globals.ShedModeDamages ) > 0 )
            {
                Ti.API.info( '\nDamages:\n' ) ;

                var recoverDamages = Alloy.createCollection( 'ShedFormsDamages' ) ;
                recoverDamages.fetch(
                {
                    query: "SELECT * FROM ShedFormsDamages where FORM_ID = " + current_form_id
                } ) ;
                if( recoverDamages.length > 0 )
                {
                    var currentDamages = recoverDamages.at( 0 ) ;
                    currentDamages.set(
                    {
                        DAMAGES: Alloy.Globals.ShedModeDamages["DAMAGES"] ,
                        MEASURES_OF_EMERGENCY: Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"]
                    } ) ;
                    currentDamages.save() ;
                    currentDamages = null ;
                }
                else
                {
                    var damagesModel = Alloy.createModel( "ShedFormsDamages" ,
                    {
                        FORM_ID: current_form_id ,
                        DAMAGES: Alloy.Globals.ShedModeDamages["DAMAGES"] ,
                        MEASURES_OF_EMERGENCY: Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"]
                    } ) ;
                    damagesModel.save() ;
                    damagesModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the JudgmentOfPracticability
            if( Alloy.Globals.ShedModeJudgmentOfPracticability && _.size( Alloy.Globals.ShedModeJudgmentOfPracticability ) > 0 )
            {
                Ti.API.info( '\nJudgmentOfPracticability:\n' ) ;

                var recoverJudgmentOfPracticability = Alloy.createCollection( 'ShedFormsJudgmentOfPracticability' ) ;
                recoverJudgmentOfPracticability.fetch(
                {
                    query: "SELECT * FROM ShedFormsJudgmentOfPracticability where FORM_ID = " + current_form_id
                } ) ;
                if( recoverJudgmentOfPracticability.length > 0 )
                {
                    var currentJudgmentOfPracticability = recoverJudgmentOfPracticability.at( 0 ) ;
                    currentJudgmentOfPracticability.set(
                    {
                        STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] ,
                        NOT_STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] ,
                        EXTERNAL: Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] ,
                        GEOTECHNICAL: Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] ,
                        OUTCOME_PRACTICABILITY: Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] ,
                        HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"] ,
                        FAMILIES_EVACUATED: Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"] ,
                        EVACUEES_N: Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"] ,
                        ACCURACY_VISIT: Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] ,
                        OTHER: Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"]
                    } ) ;
                    currentJudgmentOfPracticability.save() ;
                    currentJudgmentOfPracticability = null ;
                }
                else
                {
                    var judgmentOfPracticabilityModel = Alloy.createModel( "ShedFormsJudgmentOfPracticability" ,
                    {
                        FORM_ID: current_form_id ,
                        STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] ,
                        NOT_STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] ,
                        EXTERNAL: Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] ,
                        GEOTECHNICAL: Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] ,
                        OUTCOME_PRACTICABILITY: Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] ,
                        HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"] ,
                        FAMILIES_EVACUATED: Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"] ,
                        EVACUEES_N: Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"] ,
                        ACCURACY_VISIT: Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] ,
                        OTHER: Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"]
                    } ) ;
                    judgmentOfPracticabilityModel.save() ;
                    judgmentOfPracticabilityModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the OtherComments
            if( Alloy.Globals.ShedModeOtherComments && _.size( Alloy.Globals.ShedModeOtherComments ) > 0 )
            {
                Ti.API.info( '\nOtherComments:\n' ) ;

                var recoverOtherComments = Alloy.createCollection( 'ShedFormsOtherComments' ) ;
                recoverOtherComments.fetch(
                {
                    query: "SELECT * FROM ShedFormsOtherComments where FORM_ID = " + current_form_id
                } ) ;
                if( recoverOtherComments.length > 0 )
                {
                    var currentOtherComments = recoverOtherComments.at( 0 ) ;
                    currentOtherComments.set(
                    {
                        TOPIC: Alloy.Globals.ShedModeOtherComments["TOPIC"] ,
                        OTHER_COMMENTS: Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"]
                    } ) ;
                    currentOtherComments.save() ;
                    currentOtherComments = null ;
                }
                else
                {
                    var otherCommentsModel = Alloy.createModel( "ShedFormsOtherComments" ,
                    {
                        FORM_ID: current_form_id ,
                        TOPIC: Alloy.Globals.ShedModeOtherComments["TOPIC"] ,
                        OTHER_COMMENTS: Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"]
                    } ) ;
                    otherCommentsModel.save() ;
                    otherCommentsModel = null ;
                }
            }

            var current_time = new Date().toISOString().replace( /(-)|(\.)|(:)/g , "" ) ;
            // If the array isn't null or empty, we have some images
            if( Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0 )
            {
                Ti.API.info( '\nImages:\n\n' ) ;

                for( var i = 0 ; i < Alloy.Globals.CurrentPicsPath.length ; i++ )
                {
                    if( Alloy.Globals.CurrentPicsPath[i].id )
                    {
                        Ti.API.info( '\nPicture already present.\n' ) ;

                        var recoverImage = Alloy.createCollection( 'ShedFormsImages' ) ;
                        recoverImage.fetch(
                        {
                            query: "SELECT * FROM ShedFormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
                        } ) ;
                        var currentImage = recoverImage.at( 0 ) ;
                        currentImage.set(
                        {
                            LATITUDE: Alloy.Globals.CurrentPicsPath[i].latitude ,
                            LONGITUDE: Alloy.Globals.CurrentPicsPath[i].longitude ,
                            ADDRESS: Alloy.Globals.CurrentPicsPath[i].address ,
                            HEADING: Alloy.Globals.CurrentPicsPath[i].heading ,
                            DAMAGES_LEVEL: Alloy.Globals.CurrentPicsPath[i].damages_level ,
                            DAMAGES_AREA: Alloy.Globals.CurrentPicsPath[i].damages_area ,
                            COMMENT: Alloy.Globals.CurrentPicsPath[i].comment
                        } ) ;
                        currentImage.save() ;
                        currentImage = null ;
                    }
                    else
                    {
                        var image_path = "" ;
                        if( Alloy.Globals.CurrentPicsPath[i].path )
                        {
                            image_path = Alloy.Globals.CurrentPicsPath[i].path ;
                        }
                        else
                        {
                            // The time now, concatenated with the image number and _image
                            image_path = current_time ;
                        }
                        image_path = image_path + "_" + ( i + 1 ) + "_image.png" ;

                        var file = Alloy.Globals.getFileForWrite( image_path ) ;
                        if( file.exists() )
                        {
                            // Nothing to do, the file is already present
                        }
                        else
                        {
                            var fromFile = Ti.Filesystem.getFile( Alloy.Globals.CurrentPicsPath[i].media ) ;
                            if( file.write( fromFile.read() ) )
                            {
                                // OK
                                var imageModel = Alloy.createModel( "ShedFormsImages" ,
                                {
                                    FORM_ID: current_form_id ,
                                    IMAGE_PATH: image_path ,
                                    LATITUDE: Alloy.Globals.CurrentPicsPath[i].latitude ,
                                    LONGITUDE: Alloy.Globals.CurrentPicsPath[i].longitude ,
                                    ADDRESS: Alloy.Globals.CurrentPicsPath[i].address ,
                                    HEADING: Alloy.Globals.CurrentPicsPath[i].heading ,
                                    DAMAGES_LEVEL: Alloy.Globals.CurrentPicsPath[i].damages_level ,
                                    DAMAGES_AREA: Alloy.Globals.CurrentPicsPath[i].damages_area ,
                                    COMMENT: Alloy.Globals.CurrentPicsPath[i].comment
                                } ) ;
                                imageModel.save() ;
                                imageModel = null ;
                            }
                            else
                            {
                                bError = true ;
            
                                Alloy.Globals.AlertUserAndLogAsync( L( "image_saving_error_msg" ) ) ;
                            }
                        }
                        
                        // To avoid memory leaks
                        file = null ;
                    }

                    if( bError )
                    {
                        break ;
                    }
                }

                if( !bError )
                {
                    // This saving also avoid problem regarding the images association 
                    Alloy.Globals.CurrentPicsPath = null ;
                }
            }

            // If the array isn't null or empty, we have some videos
            if( Alloy.Globals.CurrentVideosPath && Alloy.Globals.CurrentVideosPath.length > 0 )
            {
                Ti.API.info( '\nVideos:\n\n' ) ;

                for( var i = 0 ; i < Alloy.Globals.CurrentVideosPath.length ; i++ )
                {
                    if( Alloy.Globals.CurrentVideosPath[i].id )
                    {
                        Ti.API.info( '\nVideo already present.\n' ) ;

                        var recoverVideo = Alloy.createCollection( 'ShedFormsVideos' ) ;
                        recoverVideo.fetch(
                        {
                            query: "SELECT * FROM ShedFormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
                        } ) ;
                        var currentVideo = recoverVideo.at( 0 ) ;
                        currentVideo.set(
                        {
                            LATITUDE: Alloy.Globals.CurrentVideosPath[i].latitude ,
                            LONGITUDE: Alloy.Globals.CurrentVideosPath[i].longitude ,
                            ADDRESS: Alloy.Globals.CurrentVideosPath[i].address ,
                            HEADING: Alloy.Globals.CurrentVideosPath[i].heading ,
                            DAMAGES_LEVEL: Alloy.Globals.CurrentVideosPath[i].damages_level ,
                            DAMAGES_AREA: Alloy.Globals.CurrentVideosPath[i].damages_area ,
                            COMMENT: Alloy.Globals.CurrentVideosPath[i].comment
                        } ) ;
                        currentVideo.save() ;
                        currentVideo = null ;
                    }
                    else
                    {
                        var video_path = "" ;
                        if( Alloy.Globals.CurrentVideosPath[i].path )
                        {
                            video_path = Alloy.Globals.CurrentVideosPath[i].path ;
                        }
                        else
                        {
                            // The time now, concatenated with the video number and _video
                            video_path = current_time ;
                        }
                        video_path = video_path + "_" + ( i + 1 ) + "_video.3gp" ;

                        // Writing on the file system
                        var file = Alloy.Globals.getFileForWrite( video_path ) ;
                        if( file.exists() )
                        {
                            // Nothing to do, the file is already present
                        }
                        else
                        {
                            var video_file = Ti.Filesystem.getFile( Alloy.Globals.CurrentVideosPath[i].media ) ;
                            if( file.write( video_file.read() ) )
                            {
                                // OK
                                var videoModel = Alloy.createModel( "ShedFormsVideos" ,
                                {
                                    FORM_ID: current_form_id ,
                                    VIDEO_PATH: video_path ,
                                    LATITUDE: Alloy.Globals.CurrentVideosPath[i].latitude ,
                                    LONGITUDE: Alloy.Globals.CurrentVideosPath[i].longitude ,
                                    ADDRESS: Alloy.Globals.CurrentVideosPath[i].address ,
                                    HEADING: Alloy.Globals.CurrentVideosPath[i].heading ,
                                    DAMAGES_LEVEL: Alloy.Globals.CurrentVideosPath[i].damages_level ,
                                    DAMAGES_AREA: Alloy.Globals.CurrentVideosPath[i].damages_area ,
                                    COMMENT: Alloy.Globals.CurrentVideosPath[i].comment
                                } ) ;
                                videoModel.save() ;
                                videoModel = null ;
                            }
                            else
                            {
                                bError = true ;
            
                                Alloy.Globals.AlertUserAndLogAsync( L( "video_saving_error_msg" ) ) ;
                            }
                        }
        
                        // To avoid memory leaks
                        file = null ;
                    }
    
                    if( bError )
                    {
                        break ;
                    }
                }
    
                if( !bError )
                {
                    // This saving also avoid problem regarding the videos association 
                    Alloy.Globals.CurrentVideosPath = null ;
                }
            }

            if( bError )
            {
                Ti.API.info( 'ERROR.\nEND' ) ;
            }
            else
            {
                // Commit the transaction
                Ti.API.info( 'COMMIT.\nEND' ) ;
    
                Ti.App.fireEvent( "shed_mode:save" ) ;
    
                bRet = true ;
            }
        }
        catch( exception )
        {
            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        }
        finally
        {
            bCanClickOnTableView = true ;
            bIsWorkInProgress = false ;
        }

        return bRet ;
    } ) ;
}

// ShedDamageAssessments button click event handler
function OnShedDamageAssessments_Click( e )
{
    try
    {
        var ShedModeUtils = require( '/ShedModeUtils' ) ;
        
        var media_array = ShedModeUtils.CreateMediaArray( current_form_id , true , true ) ;

        if( media_array && media_array.length > 0 )
        {
            // Controller creation for the Next View (inited in Shed Mode)
            Alloy.Globals.createAndOpenControllerExt( 'DamageAssessmentsMakerView' , { type: "Shed" , media_contents: media_array } ) ;

            bRet = true ;
        }
        else
        {
            alert( L( 'no_media_for_the_gallery_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Send button click event handler
function OnBtnSend_Click( e )
{
    try
    {
        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                bCanClickOnTableView = false ;
                bIsWorkInProgress = true ;

                // Load all the data to send
                LoadDetailsData() ;
                LoadShedPositionData() ;
                LoadShedCharacteristicsData() ;
                LoadInfrastructureData() ;
                LoadDamagesData() ;
                LoadJudgmentOfPracticabilityData() ;
                LoadOtherCommentsData() ;
                LoadTeamPersonalData() ;

                var loader = Titanium.Network.createHTTPClient() ;
                loader.validatesSecureCertificate = false ;

                // Runs the function when the data is ready for us to process
                loader.onload = function() 
                {
                    if( this.responseText && this.responseText.substring( 0 , 6 ) != "ERROR_" )
                    {
                        if( Titanium.Locale.currentLanguage == "it" )
                        {
                            var filename = "scheda_capannone.pdf" ;
                            var zipname = "SchedaCapannone.zip" ;
                        }
                        else if( Titanium.Locale.currentLanguage == "es" )
                        {
                            var filename = "tarjeta_cobertizo.pdf" ;
                            var zipname = "TarjetaCobertizo.zip" ;
                        }
                        else
                        {
                            var filename = "shed_form.pdf" ;
                            var zipname = "ShedForm.zip" ;
                        }

                        // The file will be stored in the temporary directory 
                        var file = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , filename ) ;

                        if( file.exists() )
                        {
                            // Delete old file if it exists
                            file.deleteFile() ;
                        }
                        // Write the file data
                        file.write( this.responseData ) ;

                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        // Controller creation for the Next View
                        Alloy.Globals.createAndOpenControllerExt( 'SendFormView' , { type: 'Shed' , form_id: current_form_id , pdf_native_path: file.nativePath , zip_filename: zipname , email_subject_language_msg: 'shed_mode_send_email_dlg_subject' } ) ;
                    }
                    else
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        switch( this.responseText )
                        {
                            case "ERROR_CODE_1":
                            {
                                Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) ) ;
                            }
                            break ;

                            case "ERROR_CODE_2":
                            {
                                Alloy.Globals.AlertUserAndLogAsync( L( 'generic_upload_sign_err_msg' ) ) ;
                            }
                            break ;
                        }
                    }
                } ;
                 // Function called when an error occurs, including a timeout
                loader.onerror = function( e )
                {
                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + e.error ) ;
                } ;
                loader.timeout = Alloy.Globals.SendFormTimeoutMillisecs ;

                var spd_name_1 = "" ;
                var spd_sign_1_image = "" ;
                var spd_name_2 = "" ;
                var spd_sign_2_image = "" ;
                var spd_name_3 = "" ;
                var spd_sign_3_image = "" ;
                if( Alloy.Collections.ShedModePD && _.size( Alloy.Collections.ShedModePD ) > 0 )
                {
                    for( var i = 0 ; i < Alloy.Collections.ShedModePD.length ; i++ )
                    {
                        var personalData = Alloy.Collections.ShedModePD.at( i ) ;
                        switch( personalData.get( "COMPONENT_NUMBER" ) )
                        {
                            case 1:
                            {
                                spd_name_1 = personalData.get( "NAME" ) ;
                                var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                                if( file )
                                {
                                    spd_sign_1_image = file.read() ;
                                }
                            }
                            break ;

                            case 2:
                            {
                                spd_name_2 = personalData.get( "NAME" ) ;
                                var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                                if( file )
                                {
                                    spd_sign_2_image = file.read() ;
                                }
                            }
                            break ;

                            case 3:
                            {
                                spd_name_3 = personalData.get( "NAME" ) ;
                                var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                                if( file )
                                {
                                    spd_sign_3_image = file.read() ;
                                }
                            }
                            break ;
                        }
                    }
                }

                var params =
                {
                    // Key
                    key: "EDAM" ,
                    // Shed Personal Data
                    TPD_NAME_1: spd_name_1 ,
                    TPD_SIGN_1_IMAGE: spd_sign_1_image ,
                    TPD_NAME_2: spd_name_2 ,
                    TPD_SIGN_2_IMAGE: spd_sign_2_image ,
                    TPD_NAME_3: spd_name_3 ,
                    TPD_SIGN_3_IMAGE: spd_sign_3_image ,

                    // Details
                    FORM_NO: Alloy.Globals.ShedModeDetails["FORM_NO"] ,
                    DATE: Alloy.Globals.ShedModeDetails["DATE"] ,

                    // Shed position
                    PROVINCE: Alloy.Globals.ShedModeShedPosition["PROVINCE"] ,
                    MUNICIPALITY: Alloy.Globals.ShedModeShedPosition["MUNICIPALITY"] ,
                    LATITUDE: Alloy.Globals.ShedModeShedPosition["LATITUDE"] ,
                    LONGITUDE: Alloy.Globals.ShedModeShedPosition["LONGITUDE"] ,
                    ALTITUDE: Alloy.Globals.ShedModeShedPosition["ALTITUDE"] ,
                    PLACE: Alloy.Globals.ShedModeShedPosition["PLACE"] ,
                    ADDRESS: Alloy.Globals.ShedModeShedPosition["ADDRESS"] ,
                    CIVIC_NO: Alloy.Globals.ShedModeShedPosition["CIVIC_NO"] ,

                    // Shed characteristics
                    SITE: Alloy.Globals.ShedModeShedCharacteristics["SITE"] ,
                    NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ,
                    USAGE: Alloy.Globals.ShedModeShedCharacteristics["USAGE"] ,

                    // Infrastructure
                    PRIMARY_GIRDERS: Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] ,
                    THICKNESS_OF_THE_TILES: Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] ,
                    TYPICAL_LIGHTS: Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] ,
                    COVERAGE: Alloy.Globals.ShedModeInfrastructure["COVERAGE"] ,
                    INCLINATION_OF_THE_ROOF: Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] ,
                    INFILL_ELEMENTS: Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] ,
                    VERTICAL_WALLS: Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] ,
                    SHELVING: Alloy.Globals.ShedModeInfrastructure["SHELVING"] ,

                    // Damages
                    DAMAGES: Alloy.Globals.ShedModeDamages["DAMAGES"] ,
                    MEASURES_OF_EMERGENCY: Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] ,

                    // Judgment of practicability
                    STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] ,
                    NOT_STRUCTURAL: Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] ,
                    EXTERNAL: Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] ,
                    GEOTECHNICAL: Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] ,
                    OUTCOME_PRACTICABILITY: Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] ,
                    HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"] ,
                    FAMILIES_EVACUATED: Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"] ,
                    EVACUEES_N: Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"] ,
                    ACCURACY_VISIT: Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] ,
                    OTHER: Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"] ,

                    // Other comments
                    TOPIC: Alloy.Globals.ShedModeOtherComments["TOPIC"] ,
                    OTHER_COMMENTS: Alloy.Globals.ShedModeOtherComments["OTHER_COMMENTS"]
                } ; 

                loader.open( "POST" , "https://www.edam.resiltronics.org/ManipulatePDF/ShedMode_ManipulatePDF.php" ) ;

                loader.send( params ) ;

                bRet = true ;

                return bRet ;
            } , EndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Callback for EndAsyncBusyAction
function EndAsyncBusyAction_CallBack()
{
    bCanClickOnTableView = true ;
    bIsWorkInProgress = false ;

    if( timeout !== null )
    {
        // Clear a previous timeout, if exist
        clearTimeout( timeout ) ;

        timeout = null ;
    }
}

// View photos button click event handler
function OnBtnViewMedia_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            bCanClickOnTableView = false ;

            var ShedModeUtils = require( '/ShedModeUtils' ) ;
            var media_array = ShedModeUtils.CreateMediaArray( current_form_id , true ) ;

            // Controller creation for the Next View (inited in Shed Mode)
            Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: media_array , type: 'Shed' , is_synchronized: current_is_synchronized } ) ;

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        bCanClickOnTableView = true ;
    }
}

// Make video button click event handler (Android only)
function OnBtnMakeVideo_Click( e )
{
    // AlertDialog to ask user if it's sure about taking geolocation
    var alertDialog = Titanium.UI.createAlertDialog(
    {
        title: L( 'generic_need_gps_title' ) ,
        message: L( 'vid_need_gps_confirm_msg' ) ,             
        buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
        cancel: 1
    } ) ;
    alertDialog.addEventListener( 'click' , function( e )
    {
        try
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                bCanClickOnTableView = false ;
                bIsWorkInProgress = true ;

                if( e.index == 0 )
                {
                    // If we can ask for localization on this device
                    if( Alloy.Globals.isLocationAuthorized() )
                    {
                        // Start a new timeout to the complete location request
                        timeout = setTimeout( function()
                        {
                            timeout = null ;

                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                            alert( L( 'geolocation_timeout_occurred_err_msg' ) ) ;
                        } , Alloy.Globals.GeolocationRequestTimeoutMillisecs ) ;

                        if( Titanium.Geolocation.hasCompass )
                        {
                            Alloy.Globals.getHeading(
                            {
                                success: UpdateVideoHeading
                            } ) ;
                        }
                        else
                        {
                            var dialog = Ti.UI.createAlertDialog(
                            {
                                message: L( 'generic_compass_not_available_info_msg' ) ,
                                ok: L( 'generic_ok_msg' ) ,
                                title: L( 'generic_info_title' )
                            } ) ;
                            dialog.addEventListener( 'click', function( event )
                            {
                                Alloy.Globals.getLocation(
                                {
                                    success: UpdateVideoPosition
                                } ) ;
                            } ) ;
                            dialog.show() ;
                        }

                        bRet = true ;
                    }
                    else
                    {
                        alert( L( 'generic_user_not_authorized_to_ask_localization' ) ) ;
                    }
                }
                else if( e.index == 1 )
                {
                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    // Clicked "NO"
                    Alloy.Globals.MakeVideo( $.shedModeFormsGeneralSectionWindow.getActivity() , "" , 0 , 0 , "" ) ;

                    bRet = true ;
                }
        
                return bRet ;
            } , EndAsyncBusyAction_CallBack ) ;
        }
        catch( exception )
        {
            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        }
        finally
        {
            bCanClickOnTableView = true ;
        }
    } ) ;

    // Show alert message for taking geolocation
    alertDialog.show() ;
}

// Make media button click event handler
function OnBtnMakeMedia_Click( e )
{
    var message = null ;
     // On iOS devices will be used a generic message, on Android the picture message because the video functionality is on another button
    if( OS_IOS )
    {
        message = L( 'media_need_gps_confirm_msg' ) ;
    }
    else
    {
        message = L( 'pic_need_gps_confirm_msg' ) ;
    }

    // AlertDialog to ask user if it's sure about taking geolocation
    var alertDialog = Titanium.UI.createAlertDialog(
    {
        title: L( 'generic_need_gps_title' ) ,
        message: message ,             
        buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
        cancel: 1
    } ) ;
    alertDialog.addEventListener( 'click' , function( e )
    {
        try
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                bCanClickOnTableView = false ;
                bIsWorkInProgress = true ;

                if( e.index == 0 )
                {
                    // If we can ask for localization on this device
                    if( Alloy.Globals.isLocationAuthorized() )
                    {
                        // Start a new timeout to the complete location request
                        timeout = setTimeout( function()
                        {
                            timeout = null ;

                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                            alert( L( 'geolocation_timeout_occurred_err_msg' ) ) ;
                        } , Alloy.Globals.GeolocationRequestTimeoutMillisecs ) ;

                        if( Titanium.Geolocation.hasCompass )
                        {
                            Alloy.Globals.getHeading(
                            {
                                success: UpdatePictureHeading
                            } ) ;
                        }
                        else
                        {
                            var dialog = Ti.UI.createAlertDialog(
                            {
                                message: L( 'generic_compass_not_available_info_msg' ) ,
                                ok: L( 'generic_ok_msg' ) ,
                                title: L( 'generic_info_title' )
                            } ) ;
                            dialog.addEventListener( 'click', function( event )
                            {
                                Alloy.Globals.getLocation(
                                {
                                    success: UpdatePicturePosition
                                } ) ;
                            } ) ;
                            dialog.show() ;
                        }

                        bRet = true ;
                    }
                    else
                    {
                        alert( L( 'generic_user_not_authorized_to_ask_localization' ) ) ;
                    }
                }
                else if( e.index == 1 )
                {
                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    // Clicked "NO"
                    Alloy.Globals.UseCamera( "" , 0 , 0 , "" ) ;

                    bRet = true ;
                }

                return bRet ;
            } , EndAsyncBusyAction_CallBack ) ;
        }
        catch( exception )
        {
            alert( L( 'generic_exception_msg' ) + exception.message ) ;
        }
        finally
        {
            bCanClickOnTableView = true ;
        }
    } ) ;
    // Show alert message
    alertDialog.show() ;
}

function UpdatePictureHeading( e )
{
    try
    {
        Ti.Geolocation.removeEventListener( 'heading' , UpdatePictureHeading ) ;

        if( e.success === undefined || e.success )
        {
            sCurrentHeading = Alloy.Globals.CalculateMagneticHeading( e.heading.magneticHeading ) ;

            Alloy.Globals.getLocation(
            {
                success: UpdatePicturePosition
            } ) ;
        }
        else
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            alert( L( 'unable_to_get_heading_err_msg' ) + " " + e.error ) ;
        }
    }
    catch( exception )
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

function UpdatePicturePosition( e )
{
    try
    {
        Ti.Geolocation.removeEventListener( 'location' , UpdatePicturePosition ) ;

        if( !e.success || e.error )
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
            alert( L( 'unable_to_get_location_err_msg' ) + " " + e.error ) ;
            return ;
        }

        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            RaiseEndAsyncBusyAction_CallBack() ;

            alert( L( 'generic_no_network_for_georeverse_address_msg' ) ) ;

            Alloy.Globals.UseCamera( sCurrentHeading , e.coords.latitude , e.coords.longitude , "" ) ;
        }
        else
        {
            Alloy.Globals.reverseGeocodeAndUseCamera( sCurrentHeading , e.coords.latitude , e.coords.longitude , null , RaiseEndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

function UpdateVideoHeading( e )
{
    try
    {
        Ti.Geolocation.removeEventListener( 'heading' , UpdateVideoHeading ) ;

        if( e.success === undefined || e.success )
        {
            sCurrentHeading = Alloy.Globals.CalculateMagneticHeading( e.heading.magneticHeading ) ;

            Alloy.Globals.getLocation(
            {
                success: UpdateVideoPosition
            } ) ;
        }
        else
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            alert( L( 'unable_to_get_heading_err_msg' ) + " " + e.error ) ;
        }
    }
    catch( exception )
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

function UpdateVideoPosition( e )
{
    try
    {
        Ti.Geolocation.removeEventListener( 'location' , UpdateVideoPosition ) ;

        if( !e.success || e.error )
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
            alert( L( 'unable_to_get_location_err_msg' ) + " " + e.error ) ;
            return ;
        }

        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            RaiseEndAsyncBusyAction_CallBack() ;

            alert( L( 'generic_no_network_for_georeverse_address_msg' ) ) ;

            Alloy.Globals.MakeVideo( $.shedModeFormsGeneralSectionWindow.getActivity() , sCurrentHeading , e.coords.latitude , e.coords.longitude , "" ) ;
        }
        else
        {
            Alloy.Globals.reverseGeocodeAndUseCamera( sCurrentHeading , e.coords.latitude , e.coords.longitude , $.shedModeFormsGeneralSectionWindow.getActivity() , RaiseEndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

function RaiseEndAsyncBusyAction_CallBack()
{
    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
}

// Make draft button click event handler
function OnBtnMakeDraft_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            bCanClickOnTableView = false ;

            // Controller creation for the Next View
            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "Shed" } ) ;
    
            bRet = true ;
    
            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        bCanClickOnTableView = true ;
    }
}

var slider_menu_opened = false ;
function openMenu()
{
    $.appWrapper.animate(
    {
        left: "200dp" ,
        duration: 250 ,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    } ) ;

    $.slideMenu.Wrapper.animate(
    {
        left: "0dp" ,
        duration: 250 ,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    } ) ;

    $.lbl_slider_menu.setText( L( 'slider_menu_hide_text_msg' ) ) ;

    slider_menu_opened = true ;
}

function closeMenu()
{
    $.appWrapper.animate(
    {
        left: "0dp" ,
        duration: 250 ,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    } ) ;

    $.slideMenu.Wrapper.animate(
    {
        left: "-200dp" ,
        duration: 250 ,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    } ) ;

    $.lbl_slider_menu.setText( L( 'slider_menu_show_text_msg' ) ) ;

    slider_menu_opened = false ;
}

function OnBtnSliderMenu_Click( e )
{
    if( slider_menu_opened )
    {
        closeMenu() ;
    }
    else
    {
        openMenu() ;
    }
}

try
{
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;
    $.widgetAppButtonShedDamageAssessments.init( '/images/shed_damage_assessments_normal.png' , '/images/shed_damage_assessments_pressed.png' , '/images/shed_damage_assessments_disabled.png' , L( 'btn_shed_damage_assessments_text' ) , OnShedDamageAssessments_Click ) ;
    $.viewAppButtonShedDamageAssessments.visible = view_enabled ;
    $.widgetAppButtonSend.init( '/images/send_normal.png' , '/images/send_pressed.png' , '/images/send_disabled.png' , L( 'generic_send_btn_title' ) , OnBtnSend_Click ) ;
    $.widgetAppButtonMakeDraft.init( '/images/draft_normal.png' , '/images/draft_pressed.png' , '/images/draft_disabled.png' , L( 'btn_make_draft_text' ) , OnBtnMakeDraft_Click ) ;
    $.viewAppButtonMakeDraft.visible = view_enabled ;
    $.widgetAppButtonViewMedia.init( '/images/gallery_normal.png' , '/images/gallery_pressed.png' , '/images/gallery_disabled.png' , L( 'btn_view_media_text' ) , OnBtnViewMedia_Click ) ;

    // Init with an empty array for the array used on the Details section
    Alloy.Globals.ShedModeDetails = new Array() ;
    // Init with an empty array for the array used on the Building Position section
    Alloy.Globals.ShedModeShedPosition = new Array() ;
    // Init with an empty array for the array used on the Building Characteristics section
    Alloy.Globals.ShedModeShedCharacteristics = new Array() ;
    // Init with an empty array for the array used on the Infrastructure section
    Alloy.Globals.ShedModeInfrastructure = new Array() ;
    // Init with an empty array for the array used on the Damages section
    Alloy.Globals.ShedModeDamages = new Array() ;
    // Init with an empty array for the array used on the Judgment of practicability section
    Alloy.Globals.ShedModeJudgmentOfPracticability = new Array() ;
    // Init with an empty array for the array used on the Other comments section
    Alloy.Globals.ShedModeOtherComments = new Array() ;
    // Init with an empty array for the array of the new pics
    Alloy.Globals.CurrentPicsPath = null ;
    // Init with null for the array of the new videos
    Alloy.Globals.CurrentVideosPath = null ;

    // Create our node items
    var nodes =
    [
        { menuHeader: L( 'shed_mode_sections_slide_menu_title' ) , id: 0 , title: L( 'shed_mode_section_details_title' ) , image: "/images/slide_menu_details.png" } ,
        { id: 1 , title: L( 'shed_mode_section_sheds_positions_title' ) , image: "/images/slide_menu_position.png" } ,
        { id: 2 , title: L( 'shed_mode_section_sheds_characteristics_title' ) , image: "/images/slide_menu_characteristics.png" } ,
        { id: 3 , title: L( 'shed_mode_section_infrastructure_title' ) , image: "/images/slide_menu_infrastructure.png" } ,
        { id: 4 , title: L( 'shed_mode_section_damages_title' ) , image: "/images/slide_menu_damages.png" } ,
        { id: 5 , title: L( 'shed_mode_section_judgment_of_practicability_title' ) , image: "/images/slide_menu_practicability.png" } ,
        { id: 6 , title: L( 'shed_mode_section_other_comments_title' ) , image: "/images/slide_menu_comments.png" }
    ] ;

    // Initialize the slide menu
    $.slideMenu.init(
    {
        nodes: nodes,
        color:
        {
            headingBackground: "#000",
            headingText: "#FFF"
        }
    } ) ;

    // Add an event listener on the nodes
    $.slideMenu.Nodes.addEventListener( "click" , handleMenuClick ) ;

    $.appWrapper.addEventListener( "swipe" , function( _event )
    {
        if( _event.direction == "right" )
        {
            openMenu() ;
        }
        else if( _event.direction == "left" )
        {
            closeMenu() ;
        }
    } ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    if( OS_IOS )
    {
        $.widgetAppButtonMakeMedia.init( '/images/make_media_normal.png' , '/images/make_media_pressed.png' , '/images/make_media_disabled.png' , L( 'btn_make_media_text' ) , OnBtnMakeMedia_Click ) ;
        $.viewAppButtonMakeMedia.visible = view_enabled ;
        $.navigationWindowShedModeFormsGeneralSection.open() ;
    }
    else
    {
        $.widgetAppButtonMakeMedia.init( '/images/make_media_normal.png' , '/images/make_media_pressed.png' , '/images/make_media_disabled.png' , L( 'btn_make_media_2_text' ) , OnBtnMakeMedia_Click ) ;
        $.viewAppButtonMakeMedia.visible = view_enabled ;
        $.widgetAppButtonMakeVideo.init( '/images/make_video_normal.png' , '/images/make_video_pressed.png' , '/images/make_video_disabled.png' , L( 'btn_make_video_text' ) , OnBtnMakeVideo_Click ) ;
        $.viewAppButtonMakeVideo.visible = view_enabled ;
        $.shedModeFormsGeneralSectionWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}