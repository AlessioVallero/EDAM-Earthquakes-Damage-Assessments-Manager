var args = arguments[0] || {} ;
var current_mode = args.mode ;
var current_form_id = args.form_id ;
var current_is_synchronized = args.is_synchronized ;
var current_atc20_type = args.atc20_type ;
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
            Alloy.Globals.ATC20ModeInspection = new Array() ;
            Alloy.Globals.ATC20ModeBuildingDescription = new Array() ;
            Alloy.Globals.ATC20ModeDetailedEvaluation = new Array() ;
            Alloy.Globals.ATC20ModeDetailedPosting = new Array() ;
            Alloy.Globals.ATC20ModeRapidEvaluation = new Array() ;
            Alloy.Globals.ATC20ModeRapidPosting = new Array() ;
            Alloy.Globals.ATC20ModeFurtherActions = new Array() ;
            Alloy.Globals.CurrentPicsPath = null ;
            Alloy.Globals.CurrentVideosPath = null ;

            controls = null ;

            Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "atc20_mode:save" ) ;
            Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;

            // On iOS devices, the NavigationWindow will be closed.
            // Instead on Android devices, the Window will be close
            if( OS_IOS )
            {
                $.navigationWindowATC20ModeFormsGeneralSection.close() ;
            }
            else
            {
                $.atc20ModeFormsGeneralSectionWindow.close() ;
            }
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var bCanClickOnTableView = true ;

// Fill the Alloy.Globals.ATC20ModeInspection with default values
function CreateDefaultInspectionArray()
{
    var current_date = new Date() ;
    var current_time = current_date.getTime() ;

    Alloy.Globals.ATC20ModeInspection =
    {
        "INSPECTOR_ID": "" ,                    // Empty
        "AFFILIATION": "" ,                     // Empty
        "DATE": current_time.toString() ,       // Now
        "FINAL_POSTING": "0" ,                  // Inspected
        "MODE": current_mode.toString() ,       // Current ATC-20 mode
        "TYPE": current_atc20_type.toString() , // Current ATC-20 type
        "AREAS_INSPECTED": "0"                  // Exterior only
    } ;
}

// Load Inspection data
function LoadInspectionData()
{
    if( Alloy.Globals.ATC20ModeInspection && _.size( Alloy.Globals.ATC20ModeInspection ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var recoverInspection = ATC20ModeUtils.LoadInspectionQuery( current_form_id , current_mode ) ;

            if( recoverInspection.length > 0 )
            {
                var inspectionData = recoverInspection.at( 0 ) ;
                Alloy.Globals.ATC20ModeInspection =
                {
                    "INSPECTOR_ID": inspectionData.get( "INSPECTOR_ID" ) ,
                    "AFFILIATION": inspectionData.get( "AFFILIATION" ) ,
                    "DATE": inspectionData.get( "DATE" ) ,
                    "FINAL_POSTING": inspectionData.get( "FINAL_POSTING" ) ,
                    "TYPE": inspectionData.get( "TYPE" ) ,
                    "AREAS_INSPECTED": inspectionData.get( "AREAS_INSPECTED" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultInspectionArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultInspectionArray() ;
        }
    }
}

// Inspection opening
function OpenInspection()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadInspectionData() ;
        // Controller creation for the Next View (inited in ATC20 Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsInspectionView' , { mode: current_mode , is_synchronized: current_is_synchronized , atc20_type: current_atc20_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ATC20ModeBuildingDescription with default values
function CreateDefaultBuildingDescriptionArray()
{
    Alloy.Globals.ATC20ModeBuildingDescription =
    {
        "BUILDING_NAME": "" ,                   // Empty
        "ALSO_KNOWN_AS": "" ,                   // Empty
        "LOT": "0" ,                            // 0
        "DP": "0" ,                             // 0
        "OTHER_ID": "" ,                        // Empty
        "CONTACT_NAME": "" ,                    // Empty
        "ADDRESS": "" ,                         // Empty
        "BUILDING_CONTACT": "" ,                // Empty
        "UNDERGROUND_PLANS_NO": "0" ,           // 0
        "NOT_UNDERGROUND_PLANS_NO": "1" ,       // 1
        "APPROX_FT_AREA": "" ,                  // Empty
        "RESIDENTIAL_UNITS": "" ,               // Empty
        "RESIDENTIAL_UNITS_UNINHABITABLE": "" , // Empty
        "TYPE_OF_CONSTRUCTION": "0" ,           // Wood frame
        "OTHER_TYPE_OF_CONSTRUCTION": "" ,      // Empty
        "PRIMARY_OCCUPANCY": "0" ,              // Dwelling
        "OTHER_PRIMARY_OCCUPANCY": ""           // Empty
    } ;
}

// Load Building Description data
function LoadBuildingDescriptionData()
{
    if( Alloy.Globals.ATC20ModeBuildingDescription && _.size( Alloy.Globals.ATC20ModeBuildingDescription ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var recoverBuildingDescription = ATC20ModeUtils.LoadBuildingDescriptionQuery( current_form_id ) ;

            if( recoverBuildingDescription.length > 0 )
            {
                var buildingDescriptionData = recoverBuildingDescription.at( 0 ) ;
                Alloy.Globals.ATC20ModeBuildingDescription =
                {
                    "BUILDING_NAME": buildingDescriptionData.get( "BUILDING_NAME" ) ,
                    "ALSO_KNOWN_AS": buildingDescriptionData.get( "ALSO_KNOWN_AS" ) ,
                    "LOT": buildingDescriptionData.get( "LOT" ) ,
                    "DP": buildingDescriptionData.get( "DP" ) ,
                    "OTHER_ID": buildingDescriptionData.get( "OTHER_ID" ) ,
                    "CONTACT_NAME": buildingDescriptionData.get( "CONTACT_NAME" ) ,
                    "ADDRESS": buildingDescriptionData.get( "ADDRESS" ) ,
                    "BUILDING_CONTACT": buildingDescriptionData.get( "BUILDING_CONTACT" ) ,
                    "UNDERGROUND_PLANS_NO": buildingDescriptionData.get( "UNDERGROUND_PLANS_NO" ) ,
                    "NOT_UNDERGROUND_PLANS_NO": buildingDescriptionData.get( "NOT_UNDERGROUND_PLANS_NO" ) ,
                    "APPROX_FT_AREA": buildingDescriptionData.get( "APPROX_FT_AREA" ) ,
                    "RESIDENTIAL_UNITS": buildingDescriptionData.get( "RESIDENTIAL_UNITS" ) ,
                    "RESIDENTIAL_UNITS_UNINHABITABLE": buildingDescriptionData.get( "RESIDENTIAL_UNITS_UNINHABITABLE" ) ,
                    "TYPE_OF_CONSTRUCTION": buildingDescriptionData.get( "TYPE_OF_CONSTRUCTION" ) ,
                    "OTHER_TYPE_OF_CONSTRUCTION": buildingDescriptionData.get( "OTHER_TYPE_OF_CONSTRUCTION" ) ,
                    "PRIMARY_OCCUPANCY": buildingDescriptionData.get( "PRIMARY_OCCUPANCY" ) ,
                    "OTHER_PRIMARY_OCCUPANCY": buildingDescriptionData.get( "OTHER_PRIMARY_OCCUPANCY" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultBuildingDescriptionArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultBuildingDescriptionArray() ;
        }
    }
}

// Building description opening
function OpenBuildingDescription()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadBuildingDescriptionData() ;
        // Controller creation for the Next View (inited in ATC20 Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsBuildingDescriptionView' , { mode: current_mode , is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ATC20ModeDetailedEvaluation with default values
function CreateDefaultDetailedEvaluationArray()
{
    Alloy.Globals.ATC20ModeDetailedEvaluation =
    {
        "EVALUATION": "0000000000000000000000" , // All minor/none
        "OVERALL_HAZARDS_COMMENTS": "" ,        // Empty
        "OVERALL_HAZARDS_OTHER": "" ,           // Empty
        "STRUCTURAL_HAZARDS_COMMENTS": "" ,     // Empty
        "STRUCTURAL_HAZARDS_OTHER": "" ,        // Empty
        "NONSTRUCTURAL_HAZARDS_COMMENTS": "" ,  // Empty
        "NONSTRUCTURAL_HAZARDS_OTHER": "" ,     // Empty
        "GEOTECHNICAL_HAZARDS_COMMENTS": "" ,   // Empty
        "GEOTECHNICAL_HAZARDS_OTHER": "" ,      // Empty
        "GENERAL_COMMENTS": "" ,                // Empty
        "SKETCH_PATH": "" ,                     // Empty
        "ESTIMATED_BUILDING_DAMAGE": "0" ,      // None
        "SKETCH_MODIFIED": "N"                  // No (is not on the DB)
    } ;
}

// Load DetailedEvaluation data
function LoadDetailedEvaluationData()
{
    if( Alloy.Globals.ATC20ModeDetailedEvaluation && _.size( Alloy.Globals.ATC20ModeDetailedEvaluation ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var recoverDetailedEvaluation = ATC20ModeUtils.LoadDetailedEvaluationQuery( current_form_id ) ;

            if( recoverDetailedEvaluation.length > 0 )
            {
                var detailedEvaluationData = recoverDetailedEvaluation.at( 0 ) ;
                Alloy.Globals.ATC20ModeDetailedEvaluation =
                {
                    "EVALUATION": detailedEvaluationData.get( "EVALUATION" ) ,
                    "OVERALL_HAZARDS_COMMENTS": detailedEvaluationData.get( "OVERALL_HAZARDS_COMMENTS" ) ,
                    "OVERALL_HAZARDS_OTHER": detailedEvaluationData.get( "OVERALL_HAZARDS_OTHER" ) ,
                    "STRUCTURAL_HAZARDS_COMMENTS": detailedEvaluationData.get( "STRUCTURAL_HAZARDS_COMMENTS" ) ,
                    "STRUCTURAL_HAZARDS_OTHER": detailedEvaluationData.get( "STRUCTURAL_HAZARDS_OTHER" ) ,
                    "NONSTRUCTURAL_HAZARDS_COMMENTS": detailedEvaluationData.get( "NONSTRUCTURAL_HAZARDS_COMMENTS" ) ,
                    "NONSTRUCTURAL_HAZARDS_OTHER": detailedEvaluationData.get( "NONSTRUCTURAL_HAZARDS_OTHER" ) ,
                    "GEOTECHNICAL_HAZARDS_COMMENTS": detailedEvaluationData.get( "GEOTECHNICAL_HAZARDS_COMMENTS" ) ,
                    "GEOTECHNICAL_HAZARDS_OTHER": detailedEvaluationData.get( "GEOTECHNICAL_HAZARDS_OTHER" ) ,
                    "GENERAL_COMMENTS": detailedEvaluationData.get( "GENERAL_COMMENTS" ) ,
                    "ESTIMATED_BUILDING_DAMAGE": detailedEvaluationData.get( "ESTIMATED_BUILDING_DAMAGE" ) ,
                    "SKETCH_MODIFIED": "N" // (is not on the DB)
                } ;

                var sketchPath = detailedEvaluationData.get( "SKETCH_PATH" ) ;
                // If a sketch exists, we need the native path on the ATC20ModeDetailedEvaluation array
                if( sketchPath )
                {
                    var sketchFile = Alloy.Globals.getFileForRead( sketchPath ) ;
                    if( sketchFile )
                    {
                        Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = sketchFile.getNativePath() ;
                    }
                    else
                    {
                        Alloy.Globals.AlertUserAndLogAsync( L( "sketch_get_error_msg" ) ) ;
                    }
                }
                else
                {
                    Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = "" ;
                }
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultDetailedEvaluationArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultDetailedEvaluationArray() ;
        }
    }    
}

// Detailed evaluation opening
function OpenDetailedEvaluation()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadDetailedEvaluationData() ;
        // Controller creation for the Next View (inited in ATC20 Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsDetailedEvaluationView' , { mode: current_mode , is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ATC20ModeRapidEvaluation with default values
function CreateDefaultRapidEvaluationArray()
{
    Alloy.Globals.ATC20ModeRapidEvaluation =
    {
        "EVALUATION": "000000" ,          // All minor/none
        "OTHER_OBSERVED_CONDITIONS": "" , // Empty
        "GENERAL_COMMENTS": "" ,          // Empty
        "ESTIMATED_BUILDING_DAMAGE": "0"  // None
    } ;
}

// Load RapidEvaluation data
function LoadRapidEvaluationData()
{
    if( Alloy.Globals.ATC20ModeRapidEvaluation && _.size( Alloy.Globals.ATC20ModeRapidEvaluation ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var recoverRapidEvaluation = ATC20ModeUtils.LoadRapidEvaluationQuery( current_form_id ) ;

            if( recoverRapidEvaluation.length > 0 )
            {
                var rapidEvaluationData = recoverRapidEvaluation.at( 0 ) ;
                Alloy.Globals.ATC20ModeRapidEvaluation =
                {
                    "EVALUATION": rapidEvaluationData.get( "EVALUATION" ) ,
                    "OTHER_OBSERVED_CONDITIONS": rapidEvaluationData.get( "OTHER_OBSERVED_CONDITIONS" ) ,
                    "GENERAL_COMMENTS": rapidEvaluationData.get( "GENERAL_COMMENTS" ) ,
                    "ESTIMATED_BUILDING_DAMAGE": rapidEvaluationData.get( "ESTIMATED_BUILDING_DAMAGE" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultRapidEvaluationArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultRapidEvaluationArray() ;
        }
    }    
}

// Rapid evaluation opening
function OpenRapidEvaluation()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadRapidEvaluationData() ;
        // Controller creation for the Next View (inited in ATC20 Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsRapidEvaluationView' , { mode: current_mode , is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ATC20ModeDetailedPosting with default values
function CreateDefaultDetailedPostingArray()
{
    var current_date = new Date() ;
    current_date.setDate( current_date.getDate() - 1 ) ;
    var current_time = current_date.getTime() ;

    Alloy.Globals.ATC20ModeDetailedPosting =
    {
        "PREVIOUS_POSTING": "0" ,                          // None
        "PREVIOUS_POSTING_INSPECTOR_ID": "" ,              // Empty
        "PREVIOUS_POSTING_DATE": current_time.toString() , // Yesterday
        "POSTING": "0" ,                                   // Inspected
        "CLASSIFICATION": "0" ,                            // G1
        "USE_AND_ENTRY_RESTRICTIONS": ""                   // Empty
    } ;
}

// Load DetailedPosting data
function LoadDetailedPostingData()
{
    if( Alloy.Globals.ATC20ModeDetailedPosting && _.size( Alloy.Globals.ATC20ModeDetailedPosting ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var recoverDetailedPosting = ATC20ModeUtils.LoadDetailedPostingQuery( current_form_id ) ;

            if( recoverDetailedPosting.length > 0 )
            {
                var detailedPostingData = recoverDetailedPosting.at( 0 ) ;
                Alloy.Globals.ATC20ModeDetailedPosting =
                {
                    "PREVIOUS_POSTING": detailedPostingData.get( "PREVIOUS_POSTING" ) ,
                    "PREVIOUS_POSTING_INSPECTOR_ID": detailedPostingData.get( "PREVIOUS_POSTING_INSPECTOR_ID" ) ,
                    "PREVIOUS_POSTING_DATE": detailedPostingData.get( "PREVIOUS_POSTING_DATE" ) ,
                    "POSTING": detailedPostingData.get( "POSTING" ) ,
                    "CLASSIFICATION": detailedPostingData.get( "CLASSIFICATION" ) ,
                    "USE_AND_ENTRY_RESTRICTIONS": detailedPostingData.get( "USE_AND_ENTRY_RESTRICTIONS" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultDetailedPostingArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultDetailedPostingArray() ;
        }
    }
}

// Detailed posting opening
function OpenDetailedPosting()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadDetailedPostingData() ;
        // Controller creation for the Next View (inited in ATC20 Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsDetailedPostingView' , { mode: current_mode , is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ATC20ModeRapidPosting with default values
function CreateDefaultRapidPostingArray()
{
    Alloy.Globals.ATC20ModeRapidPosting =
    {
        "POSTING": "0" ,                 // Inspected
        "CLASSIFICATION": "0" ,          // G1
        "USE_AND_ENTRY_RESTRICTIONS": "" // Empty
    } ;
}

// Load RapidPosting data
function LoadRapidPostingData()
{
    if( Alloy.Globals.ATC20ModeRapidPosting && _.size( Alloy.Globals.ATC20ModeRapidPosting ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var recoverRapidPosting = ATC20ModeUtils.LoadRapidPostingQuery( current_form_id ) ;

            if( recoverRapidPosting.length > 0 )
            {
                var rapidPostingData = recoverRapidPosting.at( 0 ) ;
                Alloy.Globals.ATC20ModeRapidPosting =
                {
                    "POSTING": rapidPostingData.get( "POSTING" ) ,
                    "CLASSIFICATION": rapidPostingData.get( "CLASSIFICATION" ) ,
                    "USE_AND_ENTRY_RESTRICTIONS": rapidPostingData.get( "USE_AND_ENTRY_RESTRICTIONS" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultRapidPostingArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultRapidPostingArray() ;
        }
    }
}

// Rapid posting opening
function OpenRapidPosting()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadRapidPostingData() ;
        // Controller creation for the Next View (inited in ATC20 Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsRapidPostingView' , { mode: current_mode , is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.ATC20ModeFurtherActions with default values
function CreateDefaultFurtherActionsArray()
{
    Alloy.Globals.ATC20ModeFurtherActions =
    {
        "BARRICADES_IN_THE_FOLLOWING_AREAS": "" , // Empty
        "EVALUATION_RECOMMENDED": "0" ,           // None
        "OTHER_EVALUATION_RECOMMENDED": "" ,      // Empty
        "OTHER_RECOMMENDATIONS": "" ,             // Empty
        "COMMENTS": "" ,                          // Empty
    } ;
}

// Load FurtherActions data
function LoadFurtherActionsData()
{
    if( Alloy.Globals.ATC20ModeFurtherActions && _.size( Alloy.Globals.ATC20ModeFurtherActions ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var recoverFurtherActions = ATC20ModeUtils.LoadFurtherActionsQuery( current_form_id ) ;

            if( recoverFurtherActions.length > 0 )
            {
                var furtherActionsData = recoverFurtherActions.at( 0 ) ;
                Alloy.Globals.ATC20ModeFurtherActions =
                {
                    "BARRICADES_IN_THE_FOLLOWING_AREAS": furtherActionsData.get( "BARRICADES_IN_THE_FOLLOWING_AREAS" ) ,
                    "EVALUATION_RECOMMENDED": furtherActionsData.get( "EVALUATION_RECOMMENDED" ) ,
                    "OTHER_EVALUATION_RECOMMENDED": furtherActionsData.get( "OTHER_EVALUATION_RECOMMENDED" ) ,
                    "OTHER_RECOMMENDATIONS": furtherActionsData.get( "OTHER_RECOMMENDATIONS" ) ,
                    "COMMENTS": furtherActionsData.get( "COMMENTS" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultFurtherActionsArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create an empty array
            CreateDefaultFurtherActionsArray() ;
        }
    }
}

// Further actions opening
function OpenFurtherActions()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadFurtherActionsData() ;
        // Controller creation for the Next View (inited in ATC20 Mode)
        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsFurtherActionsView' , { mode: current_mode , is_synchronized: current_is_synchronized , atc20_type: current_atc20_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Load Inspector Personal data
function LoadInspectorPersonalData()
{
    var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
    ATC20ModeUtils.LoadInspectorPersonalData( current_mode ) ;
}

// Get images count
function GetImagesCount()
{
    var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
    return ATC20ModeUtils.GetImagesCount( current_form_id ) ;
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
                        OpenInspection() ;
                    }
                    break ;
        
                    case 1:
                    {
                        OpenBuildingDescription() ;
                    }
                    break ;
        
                    case 2:
                    {
                        if( current_atc20_type == "0" )
                        {
                            OpenDetailedEvaluation() ;
                        }
                        else
                        {
                            OpenRapidEvaluation() ;
                        }
                    }
                    break ;
        
                    case 3:
                    {
                        if( current_atc20_type == "0" )
                        {
                            OpenDetailedPosting() ;
                        }
                        else
                        {
                            OpenRapidPosting() ;
                        }
                    }
                    break ;

                    case 4:
                    {
                        OpenFurtherActions() ;
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

            // Inspection
            var inspectorID = "" ;
            var affiliation = "" ;
            LoadInspectorPersonalData( current_mode ) ;
            if( Alloy.Collections.ATC20ModePD && _.size( Alloy.Collections.ATC20ModePD ) > 0 )
            {
                var personalData = Alloy.Collections.ATC20ModePD.at( 0 ) ;
                inspectorID = personalData.get( "INSPECTOR_ID" ) ;
                affiliation = personalData.get( "AFFILIATION" ) ;
            }

            var finalPosting = "" ;
            if( current_atc20_type == "0" )
            {
                LoadDetailedPostingData() ;
                if( Alloy.Globals.ATC20ModeDetailedPosting && _.size( Alloy.Globals.ATC20ModeDetailedPosting ) > 0 )
                {
                    finalPosting = Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] ;
                }
            }
            // If the form id is equal -1, this is a new Form
            if( current_form_id == -1 )
            {
                // If the array isn't null or empty, we have also some inspection's data
                // Otherwise we insert empty values
                if( Alloy.Globals.ATC20ModeInspection && _.size( Alloy.Globals.ATC20ModeInspection ) > 0 )
                {
                    Alloy.Globals.ATC20ModeInspection["INSPECTOR_ID"] = inspectorID ;
                    Alloy.Globals.ATC20ModeInspection["AFFILIATION"] = affiliation ;
                    Alloy.Globals.ATC20ModeInspection["FINAL_POSTING"] = finalPosting ;

                    var inspectionModel = Alloy.createModel( "ATC20Forms" ,
                    {
                        INSPECTOR_ID: inspectorID ,
                        AFFILIATION: affiliation ,
                        DATE: Alloy.Globals.ATC20ModeInspection["DATE"] ,
                        FINAL_POSTING: finalPosting ,
                        MODE: current_mode.toString() ,
                        TYPE: current_atc20_type.toString() ,
                        AREAS_INSPECTED : Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] ,
                        USER: user ,
                        SYNCHRONIZED: "0"
                    } ) ;
                    inspectionModel.save() ;
                    inspectionModel = null ;
                }
                else
                {
                    var current_date = new Date() ;
                    var current_time = current_date.getTime() ;

                    var inspectionModel = Alloy.createModel( "ATC20Forms" ,
                    {
                        INSPECTOR_ID: inspectorID ,
                        AFFILIATION: affiliation ,
                        DATE: current_time.toString() ,
                        FINAL_POSTING: finalPosting ,
                        MODE: current_mode.toString() ,
                        TYPE: current_atc20_type.toString() ,
                        AREAS_INSPECTED: "0" ,
                        USER: user ,
                        SYNCHRONIZED: "0"
                    } ) ;
                    inspectionModel.save() ;
                    inspectionModel = null ;
                }
            }
            else
            {
                // If the array isn't null or empty, we have some inspection data to update
                // Otherwise no operations are needed
                if( Alloy.Globals.ATC20ModeInspection && _.size( Alloy.Globals.ATC20ModeInspection ) > 0 )
                {
                    Alloy.Globals.ATC20ModeInspection["INSPECTOR_ID"] = inspectorID ;
                    Alloy.Globals.ATC20ModeInspection["AFFILIATION"] = affiliation ;
                    Alloy.Globals.ATC20ModeInspection["FINAL_POSTING"] = finalPosting ;

                    var recoverInspection = Alloy.createCollection( 'ATC20Forms' ) ;
                    recoverInspection.fetch(
                    {
                        query: "SELECT * FROM ATC20Forms where ID = " + current_form_id
                    } ) ;
                    if( recoverInspection.length > 0 )
                    {
                        var currentInspection = recoverInspection.at( 0 ) ;
                        currentInspection.set(
                        {
                            INSPECTOR_ID: inspectorID ,
                            AFFILIATION: affiliation ,
                            DATE: Alloy.Globals.ATC20ModeInspection["DATE"] ,
                            FINAL_POSTING: finalPosting ,
                            MODE: current_mode.toString() ,
                            TYPE: current_atc20_type.toString() ,
                            AREAS_INSPECTED: Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] ,
                            USER: user ,
                            SYNCHRONIZED: "0"
                        } ) ;
                        currentInspection.save() ;
                        currentInspection = null ;
                    }
                }
                else
                {
                    if( user )
                    {
                        // Update of the User, if necessary
                        var recoverInspection = Alloy.createCollection( 'ATC20Forms' ) ;
                        recoverInspection.fetch(
                        {
                            query: "SELECT * FROM ATC20Forms where ID = " + current_form_id
                        } ) ;
                        if( recoverInspection.length > 0 )
                        {
                            var currentInspection = recoverInspection.at( 0 ) ;
                            currentInspection.set(
                            {
                                USER: user
                            } ) ;
                            currentInspection.save() ;
                            currentInspection = null ;
                        }
                    }
                }
            }

            // If the form_id was empty, we have to fill it with the generated one
            if( current_form_id == - 1 )
            {
                var recoverID = Alloy.createCollection( 'ATC20Forms' ) ;
                recoverID.fetch(
                {
                    query: "SELECT max(ID) AS MAX_ID FROM ATC20Forms;"
                } ) ;
                if( recoverID.length > 0 )
                {
                    current_form_id = recoverID.at( 0 ).get( "MAX_ID" ) ;

                    recoverID = null ;
                }

                Ti.API.info( '\nNEW_ID: ' + current_form_id ) ;
            }

            // If the array isn't null or empty, we have the data of the Building position
            if( Alloy.Globals.ATC20ModeBuildingDescription && _.size( Alloy.Globals.ATC20ModeBuildingDescription ) > 0 )
            {
                Ti.API.info( '\nBuildingDescription:\n' ) ;

                var recoverBuildingDescription = Alloy.createCollection( 'ATC20FormsBuildingDescription' ) ;
                recoverBuildingDescription.fetch(
                {
                    query: "SELECT * FROM ATC20FormsBuildingDescription where FORM_ID = " + current_form_id
                } ) ;
                if( recoverBuildingDescription.length > 0 )
                {
                    var currentBuildingDescription = recoverBuildingDescription.at( 0 ) ;
                    currentBuildingDescription.set(
                    {
                        BUILDING_NAME: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"] ,
                        ALSO_KNOWN_AS: Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"] ,
                        LOT: Alloy.Globals.ATC20ModeBuildingDescription["LOT"] ,
                        DP: Alloy.Globals.ATC20ModeBuildingDescription["DP"] ,
                        OTHER_ID: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"] ,
                        CONTACT_NAME: Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"] ,
                        ADDRESS: Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"] ,
                        BUILDING_CONTACT: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"] ,
                        UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"] ,
                        NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"] ,
                        APPROX_FT_AREA: Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"] ,
                        RESIDENTIAL_UNITS: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"] ,
                        RESIDENTIAL_UNITS_UNINHABITABLE: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"] ,
                        TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] ,
                        OTHER_TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] ,
                        PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] ,
                        OTHER_PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] ,
                    } ) ;
                    currentBuildingDescription.save() ;
                    currentBuildingDescription = null ;
                }
                else
                {
                    var buildingDescriptionModel = Alloy.createModel( "ATC20FormsBuildingDescription" ,
                    {
                        FORM_ID: current_form_id ,
                        BUILDING_NAME: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"] ,
                        ALSO_KNOWN_AS: Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"] ,
                        LOT: Alloy.Globals.ATC20ModeBuildingDescription["LOT"] ,
                        DP: Alloy.Globals.ATC20ModeBuildingDescription["DP"] ,
                        OTHER_ID: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"] ,
                        CONTACT_NAME: Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"] ,
                        ADDRESS: Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"] ,
                        BUILDING_CONTACT: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"] ,
                        UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"] ,
                        NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"] ,
                        APPROX_FT_AREA: Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"] ,
                        RESIDENTIAL_UNITS: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"] ,
                        RESIDENTIAL_UNITS_UNINHABITABLE: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"] ,
                        TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] ,
                        OTHER_TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] ,
                        PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] ,
                        OTHER_PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] ,
                    } ) ;
                    buildingDescriptionModel.save() ;
                    buildingDescriptionModel = null ;
                }
            }

            var current_time = new Date().toISOString().replace( /(-)|(\.)|(:)/g , "" ) ;
            // If the array isn't null or empty, we have the data of the Detailed evaluation
            if( Alloy.Globals.ATC20ModeDetailedEvaluation && _.size( Alloy.Globals.ATC20ModeDetailedEvaluation ) > 0 )
            {
                Ti.API.info( '\nDetailedEvaluation:\n' ) ;

                var recoverDetailedEvaluation = Alloy.createCollection( 'ATC20FormsDetailedEvaluation' ) ;
                recoverDetailedEvaluation.fetch(
                {
                    query: "SELECT * FROM ATC20FormsDetailedEvaluation where FORM_ID = " + current_form_id
                } ) ;
                if( recoverDetailedEvaluation.length > 0 )
                {
                    var currentDetailedEvaluation = recoverDetailedEvaluation.at( 0 ) ;

                    var sketch_path = currentDetailedEvaluation.get( "SKETCH_PATH" ) ;
                    if( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] &&
                        Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] == "Y" )
                    {
                        if( sketch_path )
                        {
                            var file = Alloy.Globals.getFileForWrite( sketch_path ) ;
                            if( file.exists() )
                            {
                                // Delete old sketch if it exists
                                file.deleteFile() ;
                            }

                            if( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] )
                            {
                            }
                            else
                            {
                                sketch_path = "" ;
                                file = null ;
                            }
                        }
                        else
                        {
                            if( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] )
                            {
                                sketch_path = current_time + "_" + "_sketch.png" ;
                                var file = Alloy.Globals.getFileForWrite( sketch_path ) ;
                            }
                            else
                            {
                                var file = null ;
                            }
                        }

                        if( file )
                        {
                            var fromFile = Ti.Filesystem.getFile( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] ) ;
                            if( file.write( fromFile.read() ) )
                            {
                                Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] = "N" ;
                            }
                            else
                            {
                                bError = true ;

                                Alloy.Globals.AlertUserAndLogAsync( L( "sketch_saving_error_msg" ) ) ;
                            }

                            // To avoid memory leaks
                            file = null ;
                        }
                    }

                    if( !bError )
                    {
                        currentDetailedEvaluation.set(
                        {
                            EVALUATION: Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] ,
                            OVERALL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"] ,
                            OVERALL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"] ,
                            STRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"] ,
                            STRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"] ,
                            NONSTRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"] ,
                            NONSTRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"] ,
                            GEOTECHNICAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"] ,
                            GEOTECHNICAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"] ,
                            GENERAL_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"] ,
                            SKETCH_PATH: sketch_path ,
                            ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                        } ) ;
                        currentDetailedEvaluation.save() ;
                        currentDetailedEvaluation = null ;
                    }
                }
                else
                {
                    var sketch_path = "" ;
                    if( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] )
                    {
                        sketch_path = current_time + "_" + "_sketch.png" ;

                        var file = Alloy.Globals.getFileForWrite( sketch_path ) ;
                        if( file.exists() )
                        {
                            // Delete old file if it exists
                            file.deleteFile() ;
                        }

                        var fromFile = Ti.Filesystem.getFile( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] ) ;
                        if( !file.write( fromFile.read() ) )
                        {
                            bError = true ;

                            Alloy.Globals.AlertUserAndLogAsync( L( "sketch_saving_error_msg" ) ) ;
                        }

                        // To avoid memory leaks
                        file = null ;
                    }

                    if( !bError )
                    {
                        var detailedEvaluationModel = Alloy.createModel( "ATC20FormsDetailedEvaluation" ,
                        {
                            FORM_ID: current_form_id ,
                            EVALUATION: Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] ,
                            OVERALL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"] ,
                            OVERALL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"] ,
                            STRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"] ,
                            STRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"] ,
                            NONSTRUCTURAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"] ,
                            NONSTRUCTURAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"] ,
                            GEOTECHNICAL_HAZARDS_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"] ,
                            GEOTECHNICAL_HAZARDS_OTHER: Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"] ,
                            GENERAL_COMMENTS: Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"] ,
                            SKETCH_PATH: sketch_path ,
                            ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                        } ) ;
                        detailedEvaluationModel.save() ;
                        detailedEvaluationModel = null ;
                    }
                }
            }

            // If the array isn't null or empty, we have the data of the Rapid evaluation
            if( Alloy.Globals.ATC20ModeRapidEvaluation && _.size( Alloy.Globals.ATC20ModeRapidEvaluation ) > 0 )
            {
                Ti.API.info( '\nRapidEvaluation:\n' ) ;

                var recoverRapidEvaluation = Alloy.createCollection( 'ATC20FormsRapidEvaluation' ) ;
                recoverRapidEvaluation.fetch(
                {
                    query: "SELECT * FROM ATC20FormsRapidEvaluation where FORM_ID = " + current_form_id
                } ) ;
                if( recoverRapidEvaluation.length > 0 )
                {
                    var currentRapidEvaluation = recoverRapidEvaluation.at( 0 ) ;
                    currentRapidEvaluation.set(
                    {
                        EVALUATION: Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] ,
                        OTHER_OBSERVED_CONDITIONS: Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"] ,
                        GENERAL_COMMENTS: Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"] ,
                        ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                    } ) ;
                    currentRapidEvaluation.save() ;
                    currentRapidEvaluation = null ;
                }
                else
                {
                    var rapidEvaluationModel = Alloy.createModel( "ATC20FormsRapidEvaluation" ,
                    {
                        FORM_ID: current_form_id ,
                        EVALUATION: Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] ,
                        OTHER_OBSERVED_CONDITIONS: Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"] ,
                        GENERAL_COMMENTS: Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"] ,
                        ESTIMATED_BUILDING_DAMAGE: Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"]
                    } ) ;
                    rapidEvaluationModel.save() ;
                    rapidEvaluationModel = null ;
                }
            }

            // If the array isn't null or empty, we have the data of the DetailedPosting
            if( Alloy.Globals.ATC20ModeDetailedPosting && _.size( Alloy.Globals.ATC20ModeDetailedPosting ) > 0 )
            {
                Ti.API.info( '\nDetailedPosting:\n' ) ;

                var recoverDetailedPosting = Alloy.createCollection( 'ATC20FormsDetailedPosting' ) ;
                recoverDetailedPosting.fetch(
                {
                    query: "SELECT * FROM ATC20FormsDetailedPosting where FORM_ID = " + current_form_id
                } ) ;
                if( recoverDetailedPosting.length > 0 )
                {
                    var currentDetailedPosting = recoverDetailedPosting.at( 0 ) ;
                    currentDetailedPosting.set(
                    {
                        PREVIOUS_POSTING: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] ,
                        PREVIOUS_POSTING_INSPECTOR_ID: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"] ,
                        PREVIOUS_POSTING_DATE: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"] ,
                        POSTING: Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] ,
                        CLASSIFICATION: Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] ,
                        USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"]
                    } ) ;
                    currentDetailedPosting.save() ;
                    currentDetailedPosting = null ;
                }
                else
                {
                    var detailedPostingModel = Alloy.createModel( "ATC20FormsDetailedPosting" ,
                    {
                        FORM_ID: current_form_id ,
                        PREVIOUS_POSTING: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] ,
                        PREVIOUS_POSTING_INSPECTOR_ID: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"] ,
                        PREVIOUS_POSTING_DATE: Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"] ,
                        POSTING: Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] ,
                        CLASSIFICATION: Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] ,
                        USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"]
                    } ) ;
                    detailedPostingModel.save() ;
                    detailedPostingModel = null ;
                }
            }

            // If the array isn't null or empty, we have the data of the RapidPosting
            if( Alloy.Globals.ATC20ModeRapidPosting && _.size( Alloy.Globals.ATC20ModeRapidPosting ) > 0 )
            {
                Ti.API.info( '\nRapidPosting:\n' ) ;

                var recoverRapidPosting = Alloy.createCollection( 'ATC20FormsRapidPosting' ) ;
                recoverRapidPosting.fetch(
                {
                    query: "SELECT * FROM ATC20FormsRapidPosting where FORM_ID = " + current_form_id
                } ) ;
                if( recoverRapidPosting.length > 0 )
                {
                    var currentRapidPosting = recoverRapidPosting.at( 0 ) ;
                    currentRapidPosting.set(
                    {
                        POSTING: Alloy.Globals.ATC20ModeRapidPosting["POSTING"] ,
                        CLASSIFICATION: Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] ,
                        USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"]
                    } ) ;
                    currentRapidPosting.save() ;
                    currentRapidPosting = null ;
                }
                else
                {
                    var rapidPostingModel = Alloy.createModel( "ATC20FormsRapidPosting" ,
                    {
                        FORM_ID: current_form_id ,
                        POSTING: Alloy.Globals.ATC20ModeRapidPosting["POSTING"] ,
                        CLASSIFICATION: Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] ,
                        USE_AND_ENTRY_RESTRICTIONS: Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"]
                    } ) ;
                    rapidPostingModel.save() ;
                    rapidPostingModel = null ;
                }
            }

            // If the array isn't null or empty, we have the data of the FurtherActions
            if( Alloy.Globals.ATC20ModeFurtherActions && _.size( Alloy.Globals.ATC20ModeFurtherActions ) > 0 )
            {
                Ti.API.info( '\nFurtherActions:\n' ) ;

                var recoverFurtherActions = Alloy.createCollection( 'ATC20FormsFurtherActions' ) ;
                recoverFurtherActions.fetch(
                {
                    query: "SELECT * FROM ATC20FormsFurtherActions where FORM_ID = " + current_form_id
                } ) ;
                if( recoverFurtherActions.length > 0 )
                {
                    var currentFurtherActions = recoverFurtherActions.at( 0 ) ;
                    currentFurtherActions.set(
                    {
                        BARRICADES_IN_THE_FOLLOWING_AREAS: Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"] ,
                        EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"] ,
                        OTHER_EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"] ,
                        OTHER_RECOMMENDATIONS: Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"] ,
                        COMMENTS: Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"]
                    } ) ;
                    currentFurtherActions.save() ;
                    currentFurtherActions = null ;
                }
                else
                {
                    var furtherActionsModel = Alloy.createModel( "ATC20FormsFurtherActions" ,
                    {
                        FORM_ID: current_form_id ,
                        BARRICADES_IN_THE_FOLLOWING_AREAS: Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"] ,
                        EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"] ,
                        OTHER_EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"] ,
                        OTHER_RECOMMENDATIONS: Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"] ,
                        COMMENTS: Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"]
                    } ) ;
                    furtherActionsModel.save() ;
                    furtherActionsModel = null ;
                }
            }

            // If the array isn't null or empty, we have some images
            if( Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0 )
            {
                Ti.API.info( '\nImages:\n\n' ) ;

                for( var i = 0 ; i < Alloy.Globals.CurrentPicsPath.length ; i++ )
                {
                    if( Alloy.Globals.CurrentPicsPath[i].id )
                    {
                        Ti.API.info( '\nPicture already present.\n' ) ;

                        var recoverImage = Alloy.createCollection( 'ATC20FormsImages' ) ;
                        recoverImage.fetch(
                        {
                            query: "SELECT * FROM ATC20FormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
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
                                var imageModel = Alloy.createModel( "ATC20FormsImages" ,
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

                        var recoverVideo = Alloy.createCollection( 'ATC20FormsVideos' ) ;
                        recoverVideo.fetch(
                        {
                            query: "SELECT * FROM ATC20FormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
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
                                var videoModel = Alloy.createModel( "ATC20FormsVideos" ,
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
    
                Ti.App.fireEvent( "atc20_mode:save" ) ;
    
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
        var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
        
        var media_array = ATC20ModeUtils.CreateMediaArray( current_form_id , true , true ) ;

        if( media_array && media_array.length > 0 )
        {
            // Controller creation for the Next View (inited in ATC20 Mode)
            Alloy.Globals.createAndOpenControllerExt( 'DamageAssessmentsMakerView' , { type: "ATC20" , media_contents: media_array } ) ;

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
                LoadInspectionData() ;
                LoadBuildingDescriptionData() ;
                if( current_atc20_type == "0" )
                {
                    LoadDetailedEvaluationData() ;
                    LoadDetailedPostingData() ;
                }
                else
                {
                    LoadRapidEvaluationData() ;
                    LoadRapidPostingData() ;
                }
                LoadFurtherActionsData() ;
                LoadInspectorPersonalData() ;

                var loader = Titanium.Network.createHTTPClient() ;
                loader.validatesSecureCertificate = false ;

                // Runs the function when the data is ready for us to process
                loader.onload = function() 
                {
                    if( this.responseText && this.responseText.substring( 0 , 6 ) != "ERROR_" )
                    {
                        if( current_atc20_type == "0" )
                        {
                            var emailSubject = "atc20_detailed_mode_send_email_dlg_subject" ;

                            if( current_mode == "CA" )
                            {
                                if( Titanium.Locale.currentLanguage == "it" )
                                {
                                    var filename = "scheda_atc20_dettagliata.pdf" ;
                                    var zipname = "SchedaATC20Dettagliata.zip" ;
                                }
                                else if( Titanium.Locale.currentLanguage == "es" )
                                {
                                    var filename = "tarjeta_atc20_detallada.pdf" ;
                                    var zipname = "TarjetaATC20Detallada.zip" ;
                                }
                                else
                                {
                                    var filename = "detailed_atc20_form.pdf" ;
                                    var zipname = "DetailedATC20Form.zip" ;
                                }
                            }
                            else if( current_mode == "NZ" )
                            {
                                emailSubject = "atc20_nz_detailed_mode_send_email_dlg_subject" ;

                                if( Titanium.Locale.currentLanguage == "it" )
                                {
                                    var filename = "scheda_livello_2.pdf" ;
                                    var zipname = "SchedaLivello2.zip" ;
                                }
                                else if( Titanium.Locale.currentLanguage == "es" )
                                {
                                    var filename = "tarjeta_de_evaluacion_rapida_nivel_2.pdf" ;
                                    var zipname = "TarjetaDeEvaluacionRapidaNivel2.zip" ;
                                }
                                else
                                {
                                    var filename = "level_2_form.pdf" ;
                                    var zipname = "Level2Form.zip" ;
                                }
                            }
                        }
                        else
                        {
                            var emailSubject = "atc20_rapid_mode_send_email_dlg_subject" ;

                            if( current_mode == "CA" )
                            {
                                if( Titanium.Locale.currentLanguage == "it" )
                                {
                                    var filename = "scheda_atc20_rapida.pdf" ;
                                    var zipname = "SchedaATC20Rapida.zip" ;
                                }
                                else if( Titanium.Locale.currentLanguage == "es" )
                                {
                                    var filename = "tarjeta_atc20_rapida.pdf" ;
                                    var zipname = "TarjetaATC20Rapida.zip" ;
                                }
                                else
                                {
                                    var filename = "rapid_atc20_form.pdf" ;
                                    var zipname = "RapidATC20Form.zip" ;
                                }
                            }
                            else if( current_mode == "NZ" )
                            {
                                emailSubject = "atc20_nz_rapid_mode_send_email_dlg_subject" ;

                                if( Titanium.Locale.currentLanguage == "it" )
                                {
                                    var filename = "scheda_livello_1.pdf" ;
                                    var zipname = "SchedaLivello1.zip" ;
                                }
                                else if( Titanium.Locale.currentLanguage == "es" )
                                {
                                    var filename = "tarjeta_de_evaluacion_rapida_nivel_1.pdf" ;
                                    var zipname = "TarjetaDeEvaluacionRapidaNivel1.zip" ;
                                }
                                else
                                {
                                    var filename = "level_1_form.pdf" ;
                                    var zipname = "Level1Form.zip" ;
                                }
                            }
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
                        Alloy.Globals.createAndOpenControllerExt( 'SendFormView' , { type: 'ATC20' , form_id: current_form_id , pdf_native_path: file.nativePath , zip_filename: zipname , email_subject_language_msg: emailSubject } ) ;
                    }
                    else
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        if( current_atc20_type == "0" )
                        {
                            switch( this.responseText )
                            {
                                case "ERROR_CODE_1":
                                {
                                    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) ) ;
                                }
                                break ;

                                case "ERROR_CODE_2":
                                {
                                    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_upload_sketch_err_msg' ) ) ;
                                }
                                break ;

                                case "ERROR_CODE_3":
                                {
                                    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_upload_sign_err_msg' ) ) ;
                                }
                                break ;
                            }
                        }
                        else
                        {
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
                    }
                } ;
                 // Function called when an error occurs, including a timeout
                loader.onerror = function( e )
                {
                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + e.error ) ;
                } ;
                loader.timeout = Alloy.Globals.SendFormTimeoutMillisecs ;
                
                var params =
                {
                    // Key
                    key: "EDAM" ,
                    // Language
                    language: Titanium.Locale.currentLanguage ,

                    // Inspection
                    INSPECTOR_ID: Alloy.Globals.ATC20ModeInspection["INSPECTOR_ID"] ,
                    AFFILIATION: Alloy.Globals.ATC20ModeInspection["AFFILIATION"] ,
                    DATE: Alloy.Globals.ATC20ModeInspection["DATE"] ,
                    FINAL_POSTING: Alloy.Globals.ATC20ModeInspection["FINAL_POSTING"] ,
                    AREAS_INSPECTED: Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] ,

                    // Building description
                    BUILDING_NAME: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"] ,
                    ALSO_KNOWN_AS: Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"] ,
                    LOT: Alloy.Globals.ATC20ModeBuildingDescription["LOT"] ,
                    DP: Alloy.Globals.ATC20ModeBuildingDescription["DP"] ,
                    OTHER_ID: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"] ,
                    CONTACT_NAME: Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"] ,
                    ADDRESS: Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"] ,
                    BUILDING_CONTACT: Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"] ,
                    UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"] ,
                    NOT_UNDERGROUND_PLANS_NO: Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"] ,
                    APPROX_FT_AREA: Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"] ,
                    RESIDENTIAL_UNITS: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"] ,
                    RESIDENTIAL_UNITS_UNINHABITABLE: Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"] ,
                    TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] ,
                    OTHER_TYPE_OF_CONSTRUCTION: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] ,
                    PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] ,
                    OTHER_PRIMARY_OCCUPANCY: Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] ,

                    // Further actions
                    BARRICADES_IN_THE_FOLLOWING_AREAS: Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"] ,
                    EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"] ,
                    OTHER_EVALUATION_RECOMMENDED: Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"] ,
                    OTHER_RECOMMENDATIONS: Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"] ,
                    COMMENTS: Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"]
                } ; 

                // NZ ATC-20 have a sign and an images count too
                if( current_mode == "NZ" )
                {
                    var tpd_sign_image = "" ;
                    if( Alloy.Collections.ATC20ModePD && _.size( Alloy.Collections.ATC20ModePD ) > 0 )
                    {
                        var personalData = Alloy.Collections.ATC20ModePD.at( 0 ) ;

                        var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                        if( file )
                        {
                            tpd_sign_image = file.read() ;
                        }
                    }

                    params["TPD_SIGN_IMAGE"] = tpd_sign_image ;

                    params["IMAGES_COUNT"] = GetImagesCount() ;
                }

                if( current_atc20_type == "0" )
                {
                    // Detailed evaluation
                    params["EVALUATION"] = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] ;
                    params["OVERALL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"] ;
                    params["OVERALL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"] ;
                    params["STRUCTURAL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"] ;
                    params["STRUCTURAL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"] ;
                    params["NONSTRUCTURAL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"] ;
                    params["NONSTRUCTURAL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"] ;
                    params["GEOTECHNICAL_HAZARDS_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"] ;
                    params["GEOTECHNICAL_HAZARDS_OTHER"] = Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"] ;
                    params["GENERAL_COMMENTS"] = Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"] ;
                    var sketch_image_content = "" ;
                    if( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] )
                    {
                        var sketchFile = Titanium.Filesystem.getFile( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] ) ;
                        if( sketchFile )
                        {
                            sketch_image_content = sketchFile.read() ;
                        }
                    }
                    params["SKETCH_IMAGE"] = sketch_image_content ;
                    params["ESTIMATED_BUILDING_DAMAGE"] = Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"] ;

                    // Detailed posting
                    params["PREVIOUS_POSTING"] = Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] ;
                    params["PREVIOUS_POSTING_INSPECTOR_ID"] = Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"] ;
                    params["PREVIOUS_POSTING_DATE"] = Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"] ;
                    params["POSTING"] = Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] ;
                    params["CLASSIFICATION"] = Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] ;
                    params["USE_AND_ENTRY_RESTRICTIONS"] = Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"] ;

                    if( current_mode == "CA" )
                    {
                        loader.open( "POST" , "https://www.edam.resiltronics.org/ManipulatePDF/ATC20DetailedMode_ManipulatePDF.php" ) ;
                    }
                    else if( current_mode == "NZ" )
                    {
                        loader.open( "POST" , "https://www.edam.resiltronics.org/ManipulatePDF/ATC20NZLevel2Mode_ManipulatePDF.php" ) ;
                    }
                }
                else
                {
                    // Rapid evaluation
                    params["EVALUATION"] = Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] ;
                    params["OTHER_OBSERVED_CONDITIONS"] = Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"] ;
                    params["GENERAL_COMMENTS"] = Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"] ;
                    params["ESTIMATED_BUILDING_DAMAGE"] = Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"] ;

                    // Rapid posting
                    params["POSTING"] = Alloy.Globals.ATC20ModeRapidPosting["POSTING"] ;
                    params["CLASSIFICATION"] = Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] ;
                    params["USE_AND_ENTRY_RESTRICTIONS"] = Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"] ;

                    if( current_mode == "CA" )
                    {
                        loader.open( "POST" , "https://www.edam.resiltronics.org/ManipulatePDF/ATC20RapidMode_ManipulatePDF.php" ) ;
                    }
                    else if( current_mode == "NZ" )
                    {
                        loader.open( "POST" , "https://www.edam.resiltronics.org/ManipulatePDF/ATC20NZLevel1Mode_ManipulatePDF.php" ) ;
                    }
                }

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

            var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;
            var media_array = ATC20ModeUtils.CreateMediaArray( current_form_id , true ) ;

            // Controller creation for the Next View (inited in ATC20 Mode)
            Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: media_array , type: 'ATC20' , is_synchronized: current_is_synchronized } ) ;

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
                    Alloy.Globals.MakeVideo( $.atc20ModeFormsGeneralSectionWindow.getActivity() , "" , 0 , 0 , "" ) ;

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
            alert( L( 'generic_no_network_for_georeverse_address_msg' ) ) ;

            RaiseEndAsyncBusyAction_CallBack() ;

            Alloy.Globals.MakeVideo( $.atc20ModeFormsGeneralSectionWindow.getActivity() , sCurrentHeading , e.coords.latitude , e.coords.longitude , "" ) ;
        }
        else
        {
            Alloy.Globals.reverseGeocodeAndUseCamera( sCurrentHeading , e.coords.latitude , e.coords.longitude , $.atc20ModeFormsGeneralSectionWindow.getActivity() , RaiseEndAsyncBusyAction_CallBack ) ;
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
            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "ATC20" } ) ;
    
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
    if( current_atc20_type == "0" )
    {
        if( current_mode == "CA" )
        {
            $.atc20ModeFormsGeneralSectionWindow.setTitle( L( 'atc20_detailed_mode_forms_general_section_view_title' ) ) ;
        }
        else if( current_mode == "NZ" )
        {
            $.atc20ModeFormsGeneralSectionWindow.setTitle( L( 'atc20_nz_detailed_mode_forms_general_section_view_title' ) ) ;
        }
        else if( current_mode == "NEPAL" )
        {
            $.atc20ModeFormsGeneralSectionWindow.setTitle( L( 'atc20_nepal_detailed_mode_forms_general_section_view_title' ) ) ;
        }
    }
    else
    {
        if( current_mode == "CA" )
        {
            $.atc20ModeFormsGeneralSectionWindow.setTitle( L( 'atc20_rapid_mode_forms_general_section_view_title' ) ) ;
        }
        else if( current_mode == "NZ" )
        {
            $.atc20ModeFormsGeneralSectionWindow.setTitle( L( 'atc20_nz_rapid_mode_forms_general_section_view_title' ) ) ;
        }
        else if( current_mode == "NEPAL" )
        {
            $.atc20ModeFormsGeneralSectionWindow.setTitle( L( 'atc20_nepal_rapid_mode_forms_general_section_view_title' ) ) ;
        }
    }

    if( current_mode == "CA" )
    {
        $.imageViewATC20Logo.setImage( '/images/ATC20_logo.png' ) ;
    }
    else if( current_mode == "NZ" )
    {
        $.imageViewATC20Logo.setImage( '/images/ATC20_NZ_logo.png' ) ;
    }
    else if( current_mode == "NEPAL" )
    {
        $.imageViewATC20Logo.setImage( '/images/ATC20_NEPAL_logo.png' ) ;

        $.viewAppButtonSend.visible = false ;
    }

    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;
    $.widgetAppButtonBuildingDamageAssessments.init( '/images/building_damage_assessments_normal.png' , '/images/building_damage_assessments_pressed.png' , '/images/building_damage_assessments_disabled.png' , L( 'btn_building_damage_assessments_text' ) , OnBtnBuildingDamageAssessments_Click ) ;
    $.viewAppButtonBuildingDamageAssessments.visible = view_enabled ;
    $.widgetAppButtonSend.init( '/images/send_normal.png' , '/images/send_pressed.png' , '/images/send_disabled.png' , L( 'generic_send_btn_title' ) , OnBtnSend_Click ) ;
    $.widgetAppButtonMakeDraft.init( '/images/draft_normal.png' , '/images/draft_pressed.png' , '/images/draft_disabled.png' , L( 'btn_make_draft_text' ) , OnBtnMakeDraft_Click ) ;
    $.viewAppButtonMakeDraft.visible = view_enabled ;
    $.widgetAppButtonViewMedia.init( '/images/gallery_normal.png' , '/images/gallery_pressed.png' , '/images/gallery_disabled.png' , L( 'btn_view_media_text' ) , OnBtnViewMedia_Click ) ;

    // Init with an empty array for the array used on the Inspection section
    Alloy.Globals.ATC20ModeInspection = new Array() ;
    // Init with an empty array for the array used on the Building Description section
    Alloy.Globals.ATC20ModeBuildingDescription = new Array() ;
    // Init with an empty array for the array used on the Detailed Evaluation section
    Alloy.Globals.ATC20ModeDetailedEvaluation = new Array() ;
    // Init with an empty array for the array used on the Detailed Posting section
    Alloy.Globals.ATC20ModeDetailedPosting = new Array() ;
    // Init with an empty array for the array used on the Rapid Evaluation section
    Alloy.Globals.ATC20ModeRapidEvaluation = new Array() ;
    // Init with an empty array for the array used on the Rapid Posting section
    Alloy.Globals.ATC20ModeRapidPosting = new Array() ;
    // Init with an empty array for the array used on the Further Actions section
    Alloy.Globals.ATC20ModeFurtherActions = new Array() ;
    // Init with null for the array of the new pics
    Alloy.Globals.CurrentPicsPath = null ;
    // Init with null for the array of the new videos
    Alloy.Globals.CurrentVideosPath = null ;

    // Create our node items
    var nodes =
    [
        { menuHeader: L( 'atc20_mode_sections_slide_menu_title' ) , id: 0 , title: L( 'atc20_mode_section_inspection_title' ) , image: "/images/slide_menu_details.png" } ,
        { id: 1 , title: L( 'atc20_mode_section_building_description_title' ) , image: "/images/slide_menu_building_description.png" } ,
        { id: 2 , title: L( 'atc20_mode_section_evaluation_title' ) , image: "/images/slide_menu_evaluation.png" } ,
        { id: 3 , title: L( 'atc20_mode_section_posting_title' ) , image: "/images/slide_menu_posting.png" } ,
        { id: 4 , title: L( 'atc20_mode_section_further_actions_title' ) , image: "/images/slide_menu_further_actions.png" }
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
        $.navigationWindowATC20ModeFormsGeneralSection.open() ;
    }
    else
    {
        $.widgetAppButtonMakeMedia.init( '/images/make_media_normal.png' , '/images/make_media_pressed.png' , '/images/make_media_disabled.png' , L( 'btn_make_media_2_text' ) , OnBtnMakeMedia_Click ) ;
        $.viewAppButtonMakeMedia.visible = view_enabled ;
        $.widgetAppButtonMakeVideo.init( '/images/make_video_normal.png' , '/images/make_video_pressed.png' , '/images/make_video_disabled.png' , L( 'btn_make_video_text' ) , OnBtnMakeVideo_Click ) ;
        $.viewAppButtonMakeVideo.visible = view_enabled ;
        $.atc20ModeFormsGeneralSectionWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}