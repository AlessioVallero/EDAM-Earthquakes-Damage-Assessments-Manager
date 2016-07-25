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
controls.push( $.widgetAppButtonBuildingDamageAssessments.get_button() ) ;
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
            Alloy.Globals.UsersResidentsModeDetails = new Array() ;
            Alloy.Globals.UsersResidentsModeBuildingPosition = new Array() ;
            Alloy.Globals.UsersResidentsModeBuildingCharacteristics = new Array() ;
            Alloy.Globals.UsersResidentsModeInfrastructure = new Array() ;
            Alloy.Globals.CurrentPicsPath = null ;
            Alloy.Globals.CurrentVideosPath = null ;

            controls = null ;

            Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "users_residents_mode:save" ) ;
            Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;

            // On iOS devices, the NavigationWindow will be closed.
            // Instead on Android devices, the Window will be close
            if( OS_IOS )
            {
                $.navigationWindowUsersResidentsModeFormsGeneralSection.close() ;
            }
            else
            {
                $.usersResidentsModeFormsGeneralSectionWindow.close() ;
            }
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var bCanClickOnTableView = true ;

// Fill the Alloy.Globals.UsersResidentsModeDetails with default values
function CreateDefaultDetailsArray()
{
    var current_date = new Date() ;
    var current_time = current_date.getTime() ;

    var default_form_no = current_date.getFullYear().toFixed( 0 ) ;
    Alloy.Globals.UsersResidentsModeDetails =
    {
        "FORM_NO": default_form_no ,    // ToString of the current datetime
        "DATE": current_time.toString() // Now
    } ;
}

// Load Details data
function LoadDetailsData()
{
    if( Alloy.Globals.UsersResidentsModeDetails && _.size( Alloy.Globals.UsersResidentsModeDetails ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;
            var recoverDetails = UsersResidentsModeUtils.LoadDetailsQuery( current_form_id ) ;

            if( recoverDetails.length > 0 )
            {
                var detailsData = recoverDetails.at( 0 ) ;
                Alloy.Globals.UsersResidentsModeDetails =
                {
                    "FORM_NO": detailsData.get( "FORM_NO" ) ,
                    "DATE": detailsData.get( "DATE" ) ,
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
        // Controller creation for the Next View (inited in UsersResidents Mode)
        Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeFormsDetailsView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.UsersResidentsModeBuildingPosition with default values
function CreateDefaultBuildingPositionArray()
{
    Alloy.Globals.UsersResidentsModeBuildingPosition =
    {
        "LATITUDE": "" ,     // Empty
        "LONGITUDE": "" ,    // Empty
        "ALTITUDE": "" ,     // Empty
        "PROVINCE": "" ,     // Empty
        "MUNICIPALITY": "" , // Empty
        "PLACE": "" ,        // Empty
        "ADDRESS": "" ,      // Empty
        "CIVIC_NO": "" ,     // Empty
        "COMPILER_POS": "0"  // Outside the building
    } ;
}

// Load Building Position data
function LoadBuildingPositionData()
{
    if( Alloy.Globals.UsersResidentsModeBuildingPosition && _.size( Alloy.Globals.UsersResidentsModeBuildingPosition ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;
            var recoverBuildingsPositions = UsersResidentsModeUtils.LoadBuildingPositionQuery( current_form_id ) ;

            if( recoverBuildingsPositions.length > 0 )
            {
                var buildingPositionData = recoverBuildingsPositions.at( 0 ) ;
                Alloy.Globals.UsersResidentsModeBuildingPosition =
                {
                    "LATITUDE": buildingPositionData.get( "LATITUDE" ) ,
                    "LONGITUDE": buildingPositionData.get( "LONGITUDE" ) ,
                    "ALTITUDE": buildingPositionData.get( "ALTITUDE" ) ,
                    "PROVINCE": buildingPositionData.get( "PROVINCE" ) ,
                    "MUNICIPALITY": buildingPositionData.get( "MUNICIPALITY" ) ,
                    "PLACE": buildingPositionData.get( "PLACE" ) ,
                    "ADDRESS": buildingPositionData.get( "ADDRESS" ) ,
                    "CIVIC_NO": buildingPositionData.get( "CIVIC_NO" ) ,
                    "COMPILER_POS": buildingPositionData.get( "COMPILER_POS" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultBuildingPositionArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultBuildingPositionArray() ;
        }
    }
}

// Building position opening
function OpenBuildingPosition()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadBuildingPositionData() ;
        // Controller creation for the Next View (inited in UsersResidents Mode)
        Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeFormsBuildingPositionView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.UsersResidentsModeBuildingCharacteristics with default values
function CreateDefaultBuildingCharacteristicsArray()
{
    Alloy.Globals.UsersResidentsModeBuildingCharacteristics =
    {
        "SITE": "0" ,                     // Lowland
        "UNDERGROUND_PLANS_NO": "0" ,     // 0
        "NOT_UNDERGROUND_PLANS_NO": "1" , // 1
        "USAGE": "0"                      // Housing
    } ;
}

// Load Building Characteristics data
function LoadBuildingCharacteristicsData()
{
    if( Alloy.Globals.UsersResidentsModeBuildingCharacteristics && _.size( Alloy.Globals.UsersResidentsModeBuildingCharacteristics ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;
            var recoverBuildingCharacteristics = UsersResidentsModeUtils.LoadBuildingCharacteristicsQuery( current_form_id ) ;

            if( recoverBuildingCharacteristics.length > 0 )
            {
                var buildingCharacteristicsData = recoverBuildingCharacteristics.at( 0 ) ;
                Alloy.Globals.UsersResidentsModeBuildingCharacteristics =
                {
                    "SITE": buildingCharacteristicsData.get( "SITE" ) ,
                    "UNDERGROUND_PLANS_NO": buildingCharacteristicsData.get( "UNDERGROUND_PLANS_NO" ) ,
                    "NOT_UNDERGROUND_PLANS_NO": buildingCharacteristicsData.get( "NOT_UNDERGROUND_PLANS_NO" ) ,
                    "USAGE": buildingCharacteristicsData.get( "USAGE" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultBuildingCharacteristicsArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultBuildingCharacteristicsArray() ;
        }
    }    
}

// Building characteristics opening
function OpenBuildingCharacteristics()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadBuildingCharacteristicsData() ;
        // Controller creation for the Next View (inited in UsersResidents Mode)
        Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeFormsBuildingCharacteristicsView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.UsersResidentsModeInfrastructure with default values
function CreateDefaultInfrastructureArray()
{
    Alloy.Globals.UsersResidentsModeInfrastructure =
    {
        "GROUND_BREAKS": "1" ,            // No
        "WATER_LEAKS": "1" ,              // No
        "GAS_LEAKS": "1" ,                // No
        "ELECTRIC_CURRENT_OPERATION": "0" // Yes
    } ;
}

// Load Infrastructure data
function LoadInfrastructureData()
{
    if( Alloy.Globals.UsersResidentsModeInfrastructure && _.size( Alloy.Globals.UsersResidentsModeInfrastructure ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;
            var recoverInfrastructure = UsersResidentsModeUtils.LoadInfrastructureQuery( current_form_id ) ;

            if( recoverInfrastructure.length > 0 )
            {
                var infrastructureData = recoverInfrastructure.at( 0 ) ;
                Alloy.Globals.UsersResidentsModeInfrastructure =
                {
                    "GROUND_BREAKS": infrastructureData.get( "GROUND_BREAKS" ) ,
                    "WATER_LEAKS": infrastructureData.get( "WATER_LEAKS" ) ,
                    "GAS_LEAKS": infrastructureData.get( "GAS_LEAKS" ) ,
                    "ELECTRIC_CURRENT_OPERATION": infrastructureData.get( "ELECTRIC_CURRENT_OPERATION" )
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
        // Controller creation for the Next View (inited in UsersResidents Mode)
        Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeFormsInfrastructureView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Load Team Personal data
function LoadTeamPersonalData()
{
    var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;
    UsersResidentsModeUtils.LoadTeamPersonalData() ;
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
                        OpenBuildingPosition() ;
                    }
                    break ;
        
                    case 2:
                    {
                        OpenBuildingCharacteristics() ;
                    }
                    break ;
        
                    case 3:
                    {
                        OpenInfrastructure() ;
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
            // If the form id is equal -1, this is a new Form
            if( current_form_id == -1 )
            {   
                // If the array isn't null or empty, we have also some details
                // Otherwise we insert empty values
                if( Alloy.Globals.UsersResidentsModeDetails && _.size( Alloy.Globals.UsersResidentsModeDetails ) > 0 )
                {
                    if( Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] )
                    {
                        // We'll use the setted one
                    }
                    else
                    {
                        // A default one will be used
                        var current_date = new Date() ;
                    
                        Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] = current_date.getFullYear().toFixed( 0 ) ;
                    }

                    var detailsModel = Alloy.createModel( "UsersResidentsForms" ,
                    {
                        FORM_NO: Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] ,
                        DATE: Alloy.Globals.UsersResidentsModeDetails["DATE"] ,
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
                    var detailsModel = Alloy.createModel( "UsersResidentsForms" ,
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
                if( Alloy.Globals.UsersResidentsModeDetails && _.size( Alloy.Globals.UsersResidentsModeDetails ) > 0 )
                {
                    if( Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] )
                    {
                        // We'll use the setted one
                    }
                    else
                    {
                        // A default one will be used
                        var current_date = new Date() ;
                    
                        Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] = current_date.getFullYear().toFixed( 0 ) ;
                    }

                    var recoverDetails = Alloy.createCollection( 'UsersResidentsForms' ) ;
                    recoverDetails.fetch(
                    {
                        query: "SELECT * FROM UsersResidentsForms where ID = " + current_form_id
                    } ) ;
                    if( recoverDetails.length > 0 )
                    {
                        var currentDetails = recoverDetails.at( 0 ) ;
                        currentDetails.set(
                        {
                            FORM_NO: Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] ,
                            DATE: Alloy.Globals.UsersResidentsModeDetails["DATE"] ,
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
                        var recoverDetails = Alloy.createCollection( 'UsersResidentsForms' ) ;
                        recoverDetails.fetch(
                        {
                            query: "SELECT * FROM UsersResidentsForms where ID = " + current_form_id
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
                var recoverID = Alloy.createCollection( 'UsersResidentsForms' ) ;
                recoverID.fetch(
                {
                    query: "SELECT max(ID) AS MAX_ID FROM UsersResidentsForms;"
                } ) ;
                if( recoverID.length > 0 )
                {
                    current_form_id = recoverID.at( 0 ).get( "MAX_ID" ) ;

                    recoverID = null ;
                }

                Ti.API.info( '\nNEW_ID: ' + current_form_id ) ;
            }
    
            // If the array isn't null or empty, we have the details of the Building position
            if( Alloy.Globals.UsersResidentsModeBuildingPosition && _.size( Alloy.Globals.UsersResidentsModeBuildingPosition ) > 0 )
            {
                Ti.API.info( '\nBuildingPosition:\n' ) ;
    
                var recoverBuildingPosition = Alloy.createCollection( 'UsersResidentsFormsBuildingsPositions' ) ;
                recoverBuildingPosition.fetch(
                {
                    query: "SELECT * FROM UsersResidentsFormsBuildingsPositions where FORM_ID = " + current_form_id
                } ) ;
                if( recoverBuildingPosition.length > 0 )
                {
                    var currentBuildingPosition = recoverBuildingPosition.at( 0 ) ;
                    currentBuildingPosition.set(
                    {
                        LATITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"] ,
                        LONGITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"] ,
                        ALTITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"] ,
                        PROVINCE: Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"] ,
                        MUNICIPALITY: Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"] ,
                        PLACE: Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"] ,
                        ADDRESS: Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"] ,
                        CIVIC_NO: Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"] ,
                        COMPILER_POS: Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"]
                    } ) ;
                    currentBuildingPosition.save() ;
                    currentBuildingPosition = null ;
                }
                else
                {
                    var buildingPositionModel = Alloy.createModel( "UsersResidentsFormsBuildingsPositions" ,
                    {
                        FORM_ID: current_form_id ,
                        LATITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"] ,
                        LONGITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"] ,
                        ALTITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"] ,
                        PROVINCE: Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"] ,
                        MUNICIPALITY: Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"] ,
                        PLACE: Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"] ,
                        ADDRESS: Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"] ,
                        CIVIC_NO: Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"] ,
                        COMPILER_POS: Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"]
                    } ) ;
                    buildingPositionModel.save() ;
                    buildingPositionModel = null ;
                }
            }
    
            // If the array isn't null or empty, we have the details of the Building characteristics
            if( Alloy.Globals.UsersResidentsModeBuildingCharacteristics && _.size( Alloy.Globals.UsersResidentsModeBuildingCharacteristics ) > 0 )
            {
                Ti.API.info( '\nBuildingCharacteristics:\n' ) ;

                var recoverBuildingCharacteristics = Alloy.createCollection( 'UsersResidentsFormsBuildingsCharacteristics' ) ;
                recoverBuildingCharacteristics.fetch(
                {
                    query: "SELECT * FROM UsersResidentsFormsBuildingsCharacteristics where FORM_ID = " + current_form_id
                } ) ;
                if( recoverBuildingCharacteristics.length > 0 )
                {
                    var currentBuildingCharacteristics = recoverBuildingCharacteristics.at( 0 ) ;
                    currentBuildingCharacteristics.set(
                    {
                        SITE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] ,
                        UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] ,
                        NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ,
                        USAGE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"]
                    } ) ;
                    currentBuildingCharacteristics.save() ;
                    currentBuildingCharacteristics = null ;
                }
                else
                {
                    var buildingCharacteristicsModel = Alloy.createModel( "UsersResidentsFormsBuildingsCharacteristics" ,
                    {
                        FORM_ID: current_form_id ,
                        SITE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] ,
                        UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] ,
                        NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ,
                        USAGE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"]
                    } ) ;
                    buildingCharacteristicsModel.save() ;
                    buildingCharacteristicsModel = null ;
                }
            }
    
            // If the array isn't null or empty, we have the details of the Infrastructure
            if( Alloy.Globals.UsersResidentsModeInfrastructure && _.size( Alloy.Globals.UsersResidentsModeInfrastructure ) > 0 )
            {
                Ti.API.info( '\nInfrastructure:\n' ) ;

                var recoverInfrastructure = Alloy.createCollection( 'UsersResidentsFormsInfrastructure' ) ;
                recoverInfrastructure.fetch(
                {
                    query: "SELECT * FROM UsersResidentsFormsInfrastructure where FORM_ID = " + current_form_id
                } ) ;
                if( recoverInfrastructure.length > 0 )
                {
                    var currentInfrastructure = recoverInfrastructure.at( 0 ) ;
                    currentInfrastructure.set(
                    {
                        GROUND_BREAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] ,
                        WATER_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] ,
                        GAS_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] ,
                        ELECTRIC_CURRENT_OPERATION: Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"]
                    } ) ;
                    currentInfrastructure.save() ;
                    currentInfrastructure = null ;
                }
                else
                {
                    var infrastructureModel = Alloy.createModel( "UsersResidentsFormsInfrastructure" ,
                    {
                        FORM_ID: current_form_id ,
                        GROUND_BREAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] ,
                        WATER_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] ,
                        GAS_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] ,
                        ELECTRIC_CURRENT_OPERATION: Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"]
                    } ) ;
                    infrastructureModel.save() ;
                    infrastructureModel = null ;
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

                        var recoverImage = Alloy.createCollection( 'UsersResidentsFormsImages' ) ;
                        recoverImage.fetch(
                        {
                            query: "SELECT * FROM UsersResidentsFormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
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
                                var imageModel = Alloy.createModel( "UsersResidentsFormsImages" ,
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

                        var recoverVideo = Alloy.createCollection( 'UsersResidentsFormsVideos' ) ;
                        recoverVideo.fetch(
                        {
                            query: "SELECT * FROM UsersResidentsFormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
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
                                var videoModel = Alloy.createModel( "UsersResidentsFormsVideos" ,
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
                Ti.API.info( '\nEND' ) ;
    
                Ti.App.fireEvent( "users_residents_mode:save" ) ;
    
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

// BuildingDamageAssessments button click event handler
function OnBtnBuildingDamageAssessments_Click( e )
{
    try
    {
        var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;
        
        var media_array = UsersResidentsModeUtils.CreateMediaArray( current_form_id , true , true ) ;

        if( media_array && media_array.length > 0 )
        {
            // Controller creation for the Next View (inited in UsersResidents Mode)
            Alloy.Globals.createAndOpenControllerExt( 'DamageAssessmentsMakerView' , { type: "UsersResidents" , media_contents: media_array } ) ;

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
                LoadBuildingPositionData() ;
                LoadBuildingCharacteristicsData() ;
                LoadInfrastructureData() ;
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
                            var filename = "scheda_utenti_residenti.pdf" ;
                            var zipname = "SchedaUtentiResidenti.zip" ;
                        }
                        else if( Titanium.Locale.currentLanguage == "es" )
                        {
                            var filename = "tarjeta_usuarios_residentes.pdf" ;
                            var zipname = "TarjetaUsuariosResidentes.zip" ;
                        }
                        else
                        {
                            var filename = "users_residents_form.pdf" ;
                            var zipname = "UsersResidentsForm.zip" ;
                        }

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
                        Alloy.Globals.createAndOpenControllerExt( 'SendFormView' , { type: 'UsersResidents' , form_id: current_form_id , pdf_native_path: file.nativePath , zip_filename: zipname , email_subject_language_msg: 'users_residents_mode_send_email_dlg_subject' } ) ;
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

                            case "ERROR_CODE_3":
                            {
                                Alloy.Globals.AlertUserAndLogAsync( L( 'generic_no_language_err_msg' ) ) ;
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

                var tpd_name = "" ;
                var tpd_cell_number = "" ;
                var tpd_age = "" ;
                var tpd_job = "" ;
                var tpd_sign_image = "" ;
                if( Alloy.Collections.UsersResidentsModePD && _.size( Alloy.Collections.UsersResidentsModePD ) > 0 )
                {
                    var personalData = Alloy.Collections.UsersResidentsModePD.at( 0 ) ;

                    tpd_name = personalData.get( "NAME" ) ;
                    tpd_cell_number = personalData.get( "CELL_NUMBER" ) ;
                    tpd_age = personalData.get( "AGE" ) ;
                    tpd_job = personalData.get( "JOB" ) ;
                    var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                    if( file )
                    {
                        tpd_sign_image = file.read() ;
                    }
                }

                var params =
                {
                    // Key
                    key: "EDAM" ,
                    // Language
                    language: Titanium.Locale.currentLanguage ,

                    // Team Personal Data
                    TPD_NAME: tpd_name ,
                    TPD_CELL_NUMBER: tpd_cell_number ,
                    TPD_AGE: tpd_age ,
                    TPD_JOB: tpd_job ,
                    TPD_SIGN_IMAGE: tpd_sign_image ,

                    // Details
                    FORM_NO: Alloy.Globals.UsersResidentsModeDetails["FORM_NO"] ,
                    DATE: Alloy.Globals.UsersResidentsModeDetails["DATE"] ,

                    // Building position
                    PROVINCE: Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"] ,
                    MUNICIPALITY: Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"] ,
                    LATITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"] ,
                    LONGITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"] ,
                    ALTITUDE: Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"] ,
                    PLACE: Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"] ,
                    ADDRESS: Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"] ,
                    CIVIC_NO: Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"] ,
                    COMPILER_POS: Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"] ,

                    // Building characteristics
                    SITE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] ,
                    UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] ,
                    NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ,
                    USAGE: Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"] ,

                    // Infrastructure
                    GROUND_BREAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] ,
                    WATER_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] ,
                    GAS_LEAKS: Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] ,
                    ELECTRIC_CURRENT_OPERATION: Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"]
                } ; 

                loader.open( "POST" , "https://www.edam.resiltronics.org/ManipulatePDF/UsersResidentsMode_ManipulatePDF.php" ) ;

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

            var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;
            var media_array = UsersResidentsModeUtils.CreateMediaArray( current_form_id , true ) ;

            // Controller creation for the Next View (inited in UsersResidents Mode)
            Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: media_array , type: 'UsersResidents' , is_synchronized: current_is_synchronized } ) ;

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
                    Alloy.Globals.MakeVideo( $.usersResidentsModeFormsGeneralSectionWindow.getActivity() , "" , 0 , 0 , "" ) ;

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
            alert( L( 'generic_no_network_for_georeverse_address_msg' ) ) ;

            RaiseEndAsyncBusyAction_CallBack() ;

            Alloy.Globals.UseCamera( sCurrentHeading , e.coords.latitude , e.coords.longitude , "" ) ;
        }
        else
        {
            Alloy.Globals.reverseGeocodeAndUseCamera(  sCurrentHeading , e.coords.latitude , e.coords.longitude , null , RaiseEndAsyncBusyAction_CallBack ) ;
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

            Alloy.Globals.MakeVideo( $.usersResidentsModeFormsGeneralSectionWindow.getActivity() , sCurrentHeading , e.coords.latitude , e.coords.longitude , "" ) ;
        }
        else
        {
            Alloy.Globals.reverseGeocodeAndUseCamera( sCurrentHeading , e.coords.latitude , e.coords.longitude , $.usersResidentsModeFormsGeneralSectionWindow.getActivity() , RaiseEndAsyncBusyAction_CallBack ) ;
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
            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "UsersResidents" } ) ;
    
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
    $.widgetAppButtonBuildingDamageAssessments.init( '/images/building_damage_assessments_normal.png' , '/images/building_damage_assessments_pressed.png' , '/images/building_damage_assessments_disabled.png' , L( 'btn_building_damage_assessments_text' ) , OnBtnBuildingDamageAssessments_Click ) ;
    $.viewAppButtonBuildingDamageAssessments.visible = view_enabled ;
    $.widgetAppButtonSend.init( '/images/send_normal.png' , '/images/send_pressed.png' , '/images/send_disabled.png' , L( 'generic_send_btn_title' ) , OnBtnSend_Click ) ;
    $.widgetAppButtonMakeDraft.init( '/images/draft_normal.png' , '/images/draft_pressed.png' , '/images/draft_disabled.png' , L( 'btn_make_draft_text' ) , OnBtnMakeDraft_Click ) ;
    $.viewAppButtonMakeDraft.visible = view_enabled ;
    $.widgetAppButtonViewMedia.init( '/images/gallery_normal.png' , '/images/gallery_pressed.png' , '/images/gallery_disabled.png' , L( 'btn_view_media_text' ) , OnBtnViewMedia_Click ) ;

    // Init with an empty array for the array used on the Details section
    Alloy.Globals.UsersResidentsModeDetails = new Array() ;
    // Init with an empty array for the array used on the Building Position section
    Alloy.Globals.UsersResidentsModeBuildingPosition = new Array() ;
    // Init with an empty array for the array used on the Building Characteristics section
    Alloy.Globals.UsersResidentsModeBuildingCharacteristics = new Array() ;
    // Init with an empty array for the array used on the Infrastructure section
    Alloy.Globals.UsersResidentsModeInfrastructure = new Array() ;
    // Init with null for the array of the new pics
    Alloy.Globals.CurrentPicsPath = null ;
    // Init with null for the array of the new videos
    Alloy.Globals.CurrentVideosPath = null ;

    // Create our node items
    var nodes =
    [
        { menuHeader: L( 'users_residents_mode_sections_slide_menu_title' ) , id: 0 , title: L( 'users_residents_mode_section_details_title' ) , image: "/images/slide_menu_details.png" } ,
        { id: 1 , title: L( 'users_residents_mode_section_buildings_positions_title' ) , image: "/images/slide_menu_position.png" } ,
        { id: 2 , title: L( 'users_residents_mode_section_buildings_characteristics_title' ) , image: "/images/slide_menu_characteristics.png" } ,
        { id: 3 , title: L( 'users_residents_mode_section_infrastructure_title' ) , image: "/images/slide_menu_infrastructure.png" }
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
        $.navigationWindowUsersResidentsModeFormsGeneralSection.open() ;
    }
    else
    {
        $.widgetAppButtonMakeMedia.init( '/images/make_media_normal.png' , '/images/make_media_pressed.png' , '/images/make_media_disabled.png' , L( 'btn_make_media_2_text' ) , OnBtnMakeMedia_Click ) ;
        $.viewAppButtonMakeMedia.visible = view_enabled ;
        $.widgetAppButtonMakeVideo.init( '/images/make_video_normal.png' , '/images/make_video_pressed.png' , '/images/make_video_disabled.png' , L( 'btn_make_video_text' ) , OnBtnMakeVideo_Click ) ;
        $.viewAppButtonMakeVideo.visible = view_enabled ;
        $.usersResidentsModeFormsGeneralSectionWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}