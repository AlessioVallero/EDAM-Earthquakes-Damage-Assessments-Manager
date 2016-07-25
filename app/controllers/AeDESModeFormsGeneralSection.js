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
            Alloy.Globals.AeDESModeDetails = new Array() ;
            Alloy.Globals.AeDESModeSectionOne = new Array() ;
            Alloy.Globals.AeDESModeSectionTwo = new Array() ;
            Alloy.Globals.AeDESModeSectionThree = new Array() ;
            Alloy.Globals.AeDESModeSectionFour = new Array() ;
            Alloy.Globals.AeDESModeSectionFive = new Array() ;
            Alloy.Globals.AeDESModeSectionSix = new Array() ;
            Alloy.Globals.AeDESModeSectionSeven = new Array() ;
            Alloy.Globals.AeDESModeSectionEight = new Array() ;
            Alloy.Globals.AeDESModeSectionNine = new Array() ;
            Alloy.Globals.CurrentPicsPath = null ;
            Alloy.Globals.CurrentVideosPath = null ;

            controls = null ;

            Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "aedes_mode:save" ) ;
            Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;

            // On iOS devices, the NavigationWindow will be closed.
            // Instead on Android devices, the Window will be close
            if( OS_IOS )
            {
                $.navigationWindowAeDESModeFormsGeneralSection.close() ;
            }
            else
            {
                $.aedesModeFormsGeneralSectionWindow.close() ;
            }
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var bCanClickOnTableView = true ;

// Fill the Alloy.Globals.AeDESModeDetails with default values
function CreateDefaultDetailsArray()
{
    var current_date = new Date() ;
    var current_time = current_date.getTime() ;

    var default_form_no = current_date.getFullYear().toFixed( 0 ) ;
    Alloy.Globals.AeDESModeDetails =
    {
        "FORM_NO": default_form_no ,  // ToString of the current datetime
        "DATE": current_time.toString() // Now
    } ;
}

// Load Details data
function LoadDetailsData()
{
    if( Alloy.Globals.AeDESModeDetails && _.size( Alloy.Globals.AeDESModeDetails ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverDetails = AeDESModeUtils.LoadDetailsQuery( current_form_id ) ;

            if( recoverDetails.length > 0 )
            {
                var detailsData = recoverDetails.at( 0 ) ;
                Alloy.Globals.AeDESModeDetails =
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
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsDetailsView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionOne with default values
function CreateDefaultSectionOneArray()
{
    Alloy.Globals.AeDESModeSectionOne =
    {
        "LATITUDE": "" ,           // Empty
        "LONGITUDE": "" ,          // Empty
        "ALTITUDE": "" ,           // Empty
        "PROVINCE": "" ,           // Empty
        "MUNICIPALITY": "" ,       // Empty
        "PLACE": "" ,              // Empty
        "ADDRESS": "" ,            // Empty
        "CIVIC_NO": "" ,           // Empty
        "BUILDING_POSITION": "0" , // Isolated
        "B_NAME_OR_OWNER": "" ,    // Empty
        "CODE_OF_USE": "0"         // Private housing facilities
    } ;
}

// Load Section one data
function LoadSectionOneData()
{
    if( Alloy.Globals.AeDESModeSectionOne && _.size( Alloy.Globals.AeDESModeSectionOne ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionOne = AeDESModeUtils.LoadSectionOneQuery( current_form_id ) ;

            if( recoverSectionOne.length > 0 )
            {
                var sectionOneData = recoverSectionOne.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionOne =
                {
                    "LATITUDE": sectionOneData.get( "LATITUDE" ) ,
                    "LONGITUDE": sectionOneData.get( "LONGITUDE" ) ,
                    "ALTITUDE": sectionOneData.get( "ALTITUDE" ) ,
                    "PROVINCE": sectionOneData.get( "PROVINCE" ) ,
                    "MUNICIPALITY": sectionOneData.get( "MUNICIPALITY" ) ,
                    "PLACE": sectionOneData.get( "PLACE" ) ,
                    "ADDRESS": sectionOneData.get( "ADDRESS" ) ,
                    "CIVIC_NO": sectionOneData.get( "CIVIC_NO" ) ,
                    "BUILDING_POSITION": sectionOneData.get( "BUILDING_POSITION" ) ,
                    "B_NAME_OR_OWNER": sectionOneData.get( "B_NAME_OR_OWNER" ) ,
                    "CODE_OF_USE": sectionOneData.get( "CODE_OF_USE" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionOneArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionOneArray() ;
        }
    }
}

// Section one opening
function OpenSectionOne()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionOneData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionOneView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionTwo with default values
function CreateDefaultSectionTwoArray()
{
    Alloy.Globals.AeDESModeSectionTwo =
    {
        "PLANS_NO": "0" ,                   // 1
        "AVERAGE_HEIGHT_OF_FLOOR": "1" ,    // 2,5-3,5
        "UNDERGROUND_PLANS_NO": "0" ,       // 0
        "AVERAGE_SURFACE": "1" ,            // 50-70
        "CONSTRUCTION_AGE": "0" ,           // Not detected
        "RENOVATION_AGE": "0" ,             // Not detected
        "UNIT_OF_USE_HOUSING": "" ,         // Empty
        "UNIT_OF_USE_PRODUCTIVE": "" ,      // Empty
        "UNIT_OF_USE_COMMERCE": "" ,        // Empty
        "UNIT_OF_USE_OFFICES": "" ,         // Empty
        "UNIT_OF_USE_PUBLIC_SERVICES": "" , // Empty
        "UNIT_OF_USE_DEPOSIT": "" ,         // Empty
        "UNIT_OF_USE_STRATEGIC": "" ,       // Empty
        "UNIT_OF_USE_TOURISM": "" ,         // Empty
        "UTILIZATION": "0" ,                // >65%
        "OCCUPANTS": "" ,                   // Empty
        "PROPERTY": "0"                     // Private
    } ;
}

// Load Section Two data
function LoadSectionTwoData()
{
    if( Alloy.Globals.AeDESModeSectionTwo && _.size( Alloy.Globals.AeDESModeSectionTwo ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionTwo = AeDESModeUtils.LoadSectionTwoQuery( current_form_id ) ;

            if( recoverSectionTwo.length > 0 )
            {
                var sectionTwoData = recoverSectionTwo.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionTwo =
                {
                    "PLANS_NO": sectionTwoData.get( "PLANS_NO" ) ,
                    "AVERAGE_HEIGHT_OF_FLOOR": sectionTwoData.get( "AVERAGE_HEIGHT_OF_FLOOR" ) ,
                    "UNDERGROUND_PLANS_NO": sectionTwoData.get( "UNDERGROUND_PLANS_NO" ) ,
                    "AVERAGE_SURFACE": sectionTwoData.get( "AVERAGE_SURFACE" ) ,
                    "CONSTRUCTION_AGE": sectionTwoData.get( "CONSTRUCTION_AGE" ) ,
                    "RENOVATION_AGE": sectionTwoData.get( "RENOVATION_AGE" ) ,
                    "UNIT_OF_USE_HOUSING": sectionTwoData.get( "UNIT_OF_USE_HOUSING" ) ,
                    "UNIT_OF_USE_PRODUCTIVE": sectionTwoData.get( "UNIT_OF_USE_PRODUCTIVE" ) ,
                    "UNIT_OF_USE_COMMERCE": sectionTwoData.get( "UNIT_OF_USE_COMMERCE" ) ,
                    "UNIT_OF_USE_OFFICES": sectionTwoData.get( "UNIT_OF_USE_OFFICES" ) ,
                    "UNIT_OF_USE_PUBLIC_SERVICES": sectionTwoData.get( "UNIT_OF_USE_PUBLIC_SERVICES" ) ,
                    "UNIT_OF_USE_DEPOSIT": sectionTwoData.get( "UNIT_OF_USE_DEPOSIT" ) ,
                    "UNIT_OF_USE_STRATEGIC": sectionTwoData.get( "UNIT_OF_USE_STRATEGIC" ) ,
                    "UNIT_OF_USE_TOURISM": sectionTwoData.get( "UNIT_OF_USE_TOURISM" ) ,
                    "UTILIZATION": sectionTwoData.get( "UTILIZATION" ) ,
                    "OCCUPANTS": sectionTwoData.get( "OCCUPANTS" ) ,
                    "PROPERTY": sectionTwoData.get( "PROPERTY" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionTwoArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionTwoArray() ;
        }
    }    
}

// Section two opening
function OpenSectionTwo()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionTwoData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionTwoView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionThree with default values
function CreateDefaultSectionThreeArray()
{
    Alloy.Globals.AeDESModeSectionThree =
    {
        "COVERAGE": "0" ,                                      // Pushing heavy
        "PLAN_AND_ELEVATION": "1" ,                            // Regular
        "INFILL_DISPOSAL": "1" ,                               // Regular
        "ISOLATED_COLUMNS": "1" ,                              // No
        "MIXED": "0" ,                                         // No
        "REINFORCED": "0" ,                                    // No
        "REINFORCED_CONCRETE_FRAMES": "0" ,                    // false
        "REINFORCED_CONCRETE_WALLS": "0" ,                     // false
        "STEEL_FRAMES": "0" ,                                  // false
        "MASONRY_STRUCTURES": "000000000000000000000000000000" // all false
    } ;
}

// Load Section Three data
function LoadSectionThreeData()
{
    if( Alloy.Globals.AeDESModeSectionThree && _.size( Alloy.Globals.AeDESModeSectionThree ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionThree = AeDESModeUtils.LoadSectionThreeQuery( current_form_id ) ;

            if( recoverSectionThree.length > 0 )
            {
                var sectionThreeData = recoverSectionThree.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionThree =
                {
                    "COVERAGE": sectionThreeData.get( "COVERAGE" ) ,
                    "PLAN_AND_ELEVATION": sectionThreeData.get( "PLAN_AND_ELEVATION" ) ,
                    "INFILL_DISPOSAL": sectionThreeData.get( "INFILL_DISPOSAL" ) ,
                    "ISOLATED_COLUMNS": sectionThreeData.get( "ISOLATED_COLUMNS" ) ,
                    "MIXED": sectionThreeData.get( "MIXED" ) ,
                    "REINFORCED": sectionThreeData.get( "REINFORCED" ) ,
                    "REINFORCED_CONCRETE_FRAMES": sectionThreeData.get( "REINFORCED_CONCRETE_FRAMES" ) ,
                    "REINFORCED_CONCRETE_WALLS": sectionThreeData.get( "REINFORCED_CONCRETE_WALLS" ) ,
                    "STEEL_FRAMES": sectionThreeData.get( "STEEL_FRAMES" ) ,
                    "MASONRY_STRUCTURES": sectionThreeData.get( "MASONRY_STRUCTURES" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionThreeArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionThreeArray() ;
        }
    }    
}

// Section three opening
function OpenSectionThree()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionThreeData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionThreeView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionFour with default values
function CreateDefaultSectionFourArray()
{
    Alloy.Globals.AeDESModeSectionFour =
    {
        "DAMAGES": "000000000000000000" ,                         // all false
        "MEASURES_OF_EMERGENCY": "0000000000000000000000000" // all false
    } ;
}

// Load Section Four data
function LoadSectionFourData()
{
    if( Alloy.Globals.AeDESModeSectionFour && _.size( Alloy.Globals.AeDESModeSectionFour ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionFour = AeDESModeUtils.LoadSectionFourQuery( current_form_id ) ;

            if( recoverSectionFour.length > 0 )
            {
                var sectionFourData = recoverSectionFour.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionFour =
                {
                    "DAMAGES": sectionFourData.get( "DAMAGES" ) ,
                    "MEASURES_OF_EMERGENCY": sectionFourData.get( "MEASURES_OF_EMERGENCY" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionFourArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionFourArray() ;
        }
    }    
}

// Section four opening
function OpenSectionFour()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionFourData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionFourView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionFive with default values
function CreateDefaultSectionFiveArray()
{
    Alloy.Globals.AeDESModeSectionFive =
    {
        "DAMAGE_TYPES": "000000000000000000000000000000000000" // all false
    } ;
}

// Load Section Five data
function LoadSectionFiveData()
{
    if( Alloy.Globals.AeDESModeSectionFive && _.size( Alloy.Globals.AeDESModeSectionFive ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionFive = AeDESModeUtils.LoadSectionFiveQuery( current_form_id ) ;

            if( recoverSectionFive.length > 0 )
            {
                var sectionFiveData = recoverSectionFive.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionFive =
                {
                    "DAMAGE_TYPES": sectionFiveData.get( "DAMAGE_TYPES" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionFiveArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionFiveArray() ;
        }
    }    
}

// Section five opening
function OpenSectionFive()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionFiveData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionFiveView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionSix with default values
function CreateDefaultSectionSixArray()
{
    Alloy.Globals.AeDESModeSectionSix =
    {
        "POTENTIAL_CAUSES": "0000000000" // all false
    } ;
}

// Load Section Six data
function LoadSectionSixData()
{
    if( Alloy.Globals.AeDESModeSectionSix && _.size( Alloy.Globals.AeDESModeSectionSix ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionSix = AeDESModeUtils.LoadSectionSixQuery( current_form_id ) ;

            if( recoverSectionSix.length > 0 )
            {
                var sectionSixData = recoverSectionSix.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionSix =
                {
                    "POTENTIAL_CAUSES": sectionSixData.get( "POTENTIAL_CAUSES" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionSixArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionSixArray() ;
        }
    }    
}

// Section six opening
function OpenSectionSix()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionSixData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionSixView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionSeven with default values
function CreateDefaultSectionSevenArray()
{
    Alloy.Globals.AeDESModeSectionSeven =
    {
        "MORPHOLOGY_SITE": "0" , // Plain
        "SLOPES_LOOMING": "0" ,  // Absent
        "SUBSOIL": "0"           // Absent
    } ;
}

// Load Section Seven data
function LoadSectionSevenData()
{
    if( Alloy.Globals.AeDESModeSectionSeven && _.size( Alloy.Globals.AeDESModeSectionSeven ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionSeven = AeDESModeUtils.LoadSectionSevenQuery( current_form_id ) ;

            if( recoverSectionSeven.length > 0 )
            {
                var sectionSevenData = recoverSectionSeven.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionSeven =
                {
                    "MORPHOLOGY_SITE": sectionSevenData.get( "MORPHOLOGY_SITE" ) ,
                    "SLOPES_LOOMING": sectionSevenData.get( "SLOPES_LOOMING" ) ,
                    "SUBSOIL": sectionSevenData.get( "SUBSOIL" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionSevenArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionSevenArray() ;
        }
    }    
}

// Section seven opening
function OpenSectionSeven()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionSevenData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionSevenView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionEight with default values
function CreateDefaultSectionEightArray()
{
    Alloy.Globals.AeDESModeSectionEight =
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
        "MEASURES_OF_EMERGENCY": "00000000000000000000" // all false
    } ;
}

// Load Section Eight data
function LoadSectionEightData()
{
    if( Alloy.Globals.AeDESModeSectionEight && _.size( Alloy.Globals.AeDESModeSectionEight ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionEight = AeDESModeUtils.LoadSectionEightQuery( current_form_id ) ;

            if( recoverSectionEight.length > 0 )
            {
                var sectionEightData = recoverSectionEight.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionEight =
                {
                    "STRUCTURAL": sectionEightData.get( "STRUCTURAL" ) ,
                    "NOT_STRUCTURAL": sectionEightData.get( "NOT_STRUCTURAL" ) ,
                    "EXTERNAL": sectionEightData.get( "EXTERNAL" ) ,
                    "GEOTECHNICAL": sectionEightData.get( "GEOTECHNICAL" ) ,
                    "OUTCOME_PRACTICABILITY": sectionEightData.get( "OUTCOME_PRACTICABILITY" ) ,
                    "HOUSING_UNITS_UNINHABITABLE": sectionEightData.get( "HOUSING_UNITS_UNINHABITABLE" ) ,
                    "FAMILIES_EVACUATED": sectionEightData.get( "FAMILIES_EVACUATED" ) ,
                    "EVACUEES_N": sectionEightData.get( "EVACUEES_N" ) ,
                    "ACCURACY_VISIT": sectionEightData.get( "ACCURACY_VISIT" ) ,
                    "OTHER": sectionEightData.get( "OTHER" ) ,
                    "MEASURES_OF_EMERGENCY": sectionEightData.get( "MEASURES_OF_EMERGENCY" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionEightArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionEightArray() ;
        }
    }    
}

// Section eight opening
function OpenSectionEight()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionEightData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionEightView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fill the Alloy.Globals.AeDESModeSectionNine with default values
function CreateDefaultSectionNineArray()
{
    Alloy.Globals.AeDESModeSectionNine =
    {
        "TOPIC": "" ,        // Empty
        "OTHER_COMMENTS": "" // Empty
    } ;
}

// Load Section Nine data
function LoadSectionNineData()
{
    if( Alloy.Globals.AeDESModeSectionNine && _.size( Alloy.Globals.AeDESModeSectionNine ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // If current_form_id isn't -1, then we are here on modification, so we load the values from the DB
        if( current_form_id != -1 )
        {
            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var recoverSectionNine = AeDESModeUtils.LoadSectionNineQuery( current_form_id ) ;

            if( recoverSectionNine.length > 0 )
            {
                var sectionNineData = recoverSectionNine.at( 0 ) ;
                Alloy.Globals.AeDESModeSectionNine =
                {
                    "TOPIC": sectionNineData.get( "TOPIC" ) ,
                    "OTHER_COMMENTS": sectionNineData.get( "OTHER_COMMENTS" )
                } ;
            }
            else
            {
                // If there isn't a row on the DB, we create a default array
                CreateDefaultSectionNineArray() ;
            }
        }
        else
        {
            // If current_form_id is -1, then we are here on adding new, so we create a default array
            CreateDefaultSectionNineArray() ;
        }
    }    
}

// Section nine opening
function OpenSectionNine()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "form:save_from_section" , OnBtnSave_Click ) ;
        LoadSectionNineData() ;
        // Controller creation for the Next View (inited in AeDES Mode)
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionNineView' , { is_synchronized: current_is_synchronized } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Load Team Personal data
function LoadTeamPersonalData()
{
    var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
    AeDESModeUtils.LoadTeamPersonalData() ;
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
                        OpenSectionOne() ;
                    }
                    break ;
        
                    case 2:
                    {
                        OpenSectionTwo() ;
                    }
                    break ;
        
                    case 3:
                    {
                        OpenSectionThree() ;
                    }
                    break ;

                    case 4:
                    {
                        OpenSectionFour() ;
                    }
                    break ;

                    case 5:
                    {
                        OpenSectionFive() ;
                    }
                    break ;

                    case 6:
                    {
                        OpenSectionSix() ;
                    }
                    break ;

                    case 7:
                    {
                        OpenSectionSeven() ;
                    }
                    break ;

                    case 8:
                    {
                        OpenSectionEight() ;
                    }
                    break ;

                    case 9:
                    {
                        OpenSectionNine() ;
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

                // If the array isn't null or empty, we have also some details
                // Otherwise we insert empty values
                if( Alloy.Globals.AeDESModeDetails && _.size( Alloy.Globals.AeDESModeDetails ) > 0 )
                {
                    if( Alloy.Globals.AeDESModeDetails["FORM_NO"] )
                    {
                        // We'll use the setted one
                    }
                    else
                    {
                        // A default one will be used
                        var current_date = new Date() ;
                    
                        Alloy.Globals.AeDESModeDetails["FORM_NO"] = current_date.getFullYear().toFixed( 0 ) ;
                    }
    
                    var detailsModel = Alloy.createModel( "AeDESForms" ,
                    {
                        FORM_NO: Alloy.Globals.AeDESModeDetails["FORM_NO"] ,
                        DATE: Alloy.Globals.AeDESModeDetails["DATE"] ,
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
                    var detailsModel = Alloy.createModel( "AeDESForms" ,
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
                if( Alloy.Globals.AeDESModeDetails && _.size( Alloy.Globals.AeDESModeDetails ) > 0 )
                {
                    if( Alloy.Globals.AeDESModeDetails["FORM_NO"] )
                    {
                        // We'll use the setted one
                    }
                    else
                    {
                        // A default one will be used
                        var current_date = new Date() ;
                    
                        Alloy.Globals.AeDESModeDetails["FORM_NO"] = current_date.getFullYear().toFixed( 0 ) ;
                    }

                    Ti.API.info( '\n\nDetails:' ) ;

                    var recoverDetails = Alloy.createCollection( 'AeDESForms' ) ;
                    recoverDetails.fetch(
                    {
                        query: "SELECT * FROM AeDESForms where ID = " + current_form_id
                    } ) ;
                    if( recoverDetails.length > 0 )
                    {
                        var currentDetails = recoverDetails.at( 0 ) ;
                        currentDetails.set(
                        {
                            FORM_NO: Alloy.Globals.AeDESModeDetails["FORM_NO"] ,
                            DATE: Alloy.Globals.AeDESModeDetails["DATE"] ,
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
                        var recoverDetails = Alloy.createCollection( 'AeDESForms' ) ;
                        recoverDetails.fetch(
                        {
                            query: "SELECT * FROM AeDESForms where ID = " + current_form_id
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
                var recoverID = Alloy.createCollection( 'AeDESForms' ) ;
                recoverID.fetch(
                {
                    query: "SELECT max(ID) AS MAX_ID FROM AeDESForms;"
                } ) ;
                if( recoverID.length > 0 )
                {
                    current_form_id = recoverID.at( 0 ).get( "MAX_ID" ) ;

                    recoverID = null ;
                }

                Ti.API.info( '\nNEW_ID: ' + current_form_id ) ;
            }

            // If the array isn't null or empty, we have the details of the Section one
            if( Alloy.Globals.AeDESModeSectionOne && _.size( Alloy.Globals.AeDESModeSectionOne ) > 0 )
            {
                Ti.API.info( '\nSectionOne:\n' ) ;
    
                var recoverSectionOne = Alloy.createCollection( 'AeDESFormsSectionOne' ) ;
                recoverSectionOne.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionOne where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionOne.length > 0 )
                {
                    var currentSectionOne = recoverSectionOne.at( 0 ) ;
                    currentSectionOne.set(
                    {
                        LATITUDE: Alloy.Globals.AeDESModeSectionOne["LATITUDE"] ,
                        LONGITUDE: Alloy.Globals.AeDESModeSectionOne["LONGITUDE"] ,
                        ALTITUDE: Alloy.Globals.AeDESModeSectionOne["ALTITUDE"] ,
                        PROVINCE: Alloy.Globals.AeDESModeSectionOne["PROVINCE"] ,
                        MUNICIPALITY: Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"] ,
                        PLACE: Alloy.Globals.AeDESModeSectionOne["PLACE"] ,
                        ADDRESS: Alloy.Globals.AeDESModeSectionOne["ADDRESS"] ,
                        CIVIC_NO: Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"] ,
                        BUILDING_POSITION: Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] ,
                        B_NAME_OR_OWNER: Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"] ,
                        CODE_OF_USE: Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"]
                    } ) ;
                    currentSectionOne.save() ;
                    currentSectionOne = null ;
                }
                else
                {
                    var sectionOneModel = Alloy.createModel( "AeDESFormsSectionOne" ,
                    {
                        FORM_ID: current_form_id ,
                        LATITUDE: Alloy.Globals.AeDESModeSectionOne["LATITUDE"] ,
                        LONGITUDE: Alloy.Globals.AeDESModeSectionOne["LONGITUDE"] ,
                        ALTITUDE: Alloy.Globals.AeDESModeSectionOne["ALTITUDE"] ,
                        PROVINCE: Alloy.Globals.AeDESModeSectionOne["PROVINCE"] ,
                        MUNICIPALITY: Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"] ,
                        PLACE: Alloy.Globals.AeDESModeSectionOne["PLACE"] ,
                        ADDRESS: Alloy.Globals.AeDESModeSectionOne["ADDRESS"] ,
                        CIVIC_NO: Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"] ,
                        BUILDING_POSITION: Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] ,
                        B_NAME_OR_OWNER: Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"] ,
                        CODE_OF_USE: Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"]
                    } ) ;
                    sectionOneModel.save() ;
                    sectionOneModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section two
            if( Alloy.Globals.AeDESModeSectionTwo && _.size( Alloy.Globals.AeDESModeSectionTwo ) > 0 )
            {
                Ti.API.info( '\nSectionTwo:\n' ) ;

                var recoverSectionTwo = Alloy.createCollection( 'AeDESFormsSectionTwo' ) ;
                recoverSectionTwo.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionTwo where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionTwo.length > 0 )
                {
                    var currentSectionTwo = recoverSectionTwo.at( 0 ) ;
                    currentSectionTwo.set(
                    {
                        PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] ,
                        AVERAGE_HEIGHT_OF_FLOOR: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] ,
                        UNDERGROUND_PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] ,
                        AVERAGE_SURFACE: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] ,
                        CONSTRUCTION_AGE: Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] ,
                        RENOVATION_AGE: Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] ,
                        UNIT_OF_USE_HOUSING: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"] ,
                        UNIT_OF_USE_PRODUCTIVE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"] ,
                        UNIT_OF_USE_COMMERCE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"] ,
                        UNIT_OF_USE_OFFICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"] ,
                        UNIT_OF_USE_PUBLIC_SERVICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"] ,
                        UNIT_OF_USE_DEPOSIT: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"] ,
                        UNIT_OF_USE_STRATEGIC: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"] ,
                        UNIT_OF_USE_TOURISM: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"] ,
                        UTILIZATION: Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] ,
                        OCCUPANTS: Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"] ,
                        PROPERTY: Alloy.Globals.AeDESModeSectionTwo["PROPERTY"]
                    } ) ;
                    currentSectionTwo.save() ;
                    currentSectionTwo = null ;
                }
                else
                {
                    var sectionTwoModel = Alloy.createModel( "AeDESFormsSectionTwo" ,
                    {
                        FORM_ID: current_form_id ,
                        PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] ,
                        AVERAGE_HEIGHT_OF_FLOOR: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] ,
                        UNDERGROUND_PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] ,
                        AVERAGE_SURFACE: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] ,
                        CONSTRUCTION_AGE: Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] ,
                        RENOVATION_AGE: Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] ,
                        UNIT_OF_USE_HOUSING: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"] ,
                        UNIT_OF_USE_PRODUCTIVE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"] ,
                        UNIT_OF_USE_COMMERCE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"] ,
                        UNIT_OF_USE_OFFICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"] ,
                        UNIT_OF_USE_PUBLIC_SERVICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"] ,
                        UNIT_OF_USE_DEPOSIT: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"] ,
                        UNIT_OF_USE_STRATEGIC: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"] ,
                        UNIT_OF_USE_TOURISM: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"] ,
                        UTILIZATION: Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] ,
                        OCCUPANTS: Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"] ,
                        PROPERTY: Alloy.Globals.AeDESModeSectionTwo["PROPERTY"]
                    } ) ;
                    sectionTwoModel.save() ;
                    sectionTwoModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section three
            if( Alloy.Globals.AeDESModeSectionThree && _.size( Alloy.Globals.AeDESModeSectionThree ) > 0 )
            {
                Ti.API.info( '\nSectionThree:\n' ) ;

                var recoverSectionThree = Alloy.createCollection( 'AeDESFormsSectionThree' ) ;
                recoverSectionThree.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionThree where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionThree.length > 0 )
                {
                    var currentSectionThree = recoverSectionThree.at( 0 ) ;
                    currentSectionThree.set(
                    {
                        COVERAGE: Alloy.Globals.AeDESModeSectionThree["COVERAGE"] ,
                        PLAN_AND_ELEVATION: Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] ,
                        INFILL_DISPOSAL: Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] ,
                        ISOLATED_COLUMNS: Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] ,
                        MIXED: Alloy.Globals.AeDESModeSectionThree["MIXED"] ,
                        REINFORCED: Alloy.Globals.AeDESModeSectionThree["REINFORCED"] ,
                        REINFORCED_CONCRETE_FRAMES: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"] ,
                        REINFORCED_CONCRETE_WALLS: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"] ,
                        STEEL_FRAMES: Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"] ,
                        MASONRY_STRUCTURES: Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"]
                    } ) ;
                    currentSectionThree.save() ;
                    currentSectionThree = null ;
                }
                else
                {
                    var sectionThreeModel = Alloy.createModel( "AeDESFormsSectionThree" ,
                    {
                        FORM_ID: current_form_id ,
                        COVERAGE: Alloy.Globals.AeDESModeSectionThree["COVERAGE"] ,
                        PLAN_AND_ELEVATION: Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] ,
                        INFILL_DISPOSAL: Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] ,
                        ISOLATED_COLUMNS: Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] ,
                        MIXED: Alloy.Globals.AeDESModeSectionThree["MIXED"] ,
                        REINFORCED: Alloy.Globals.AeDESModeSectionThree["REINFORCED"] ,
                        REINFORCED_CONCRETE_FRAMES: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"] ,
                        REINFORCED_CONCRETE_WALLS: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"] ,
                        STEEL_FRAMES: Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"] ,
                        MASONRY_STRUCTURES: Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"]
                    } ) ;
                    sectionThreeModel.save() ;
                    sectionThreeModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section four
            if( Alloy.Globals.AeDESModeSectionFour && _.size( Alloy.Globals.AeDESModeSectionFour ) > 0 )
            {
                Ti.API.info( '\nSectionFour:\n' ) ;

                var recoverSectionFour = Alloy.createCollection( 'AeDESFormsSectionFour' ) ;
                recoverSectionFour.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionFour where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionFour.length > 0 )
                {
                    var currentSectionFour = recoverSectionFour.at( 0 ) ;
                    currentSectionFour.set(
                    {
                        DAMAGES: Alloy.Globals.AeDESModeSectionFour["DAMAGES"] ,
                        MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"]
                    } ) ;
                    currentSectionFour.save() ;
                    currentSectionFour = null ;
                }
                else
                {
                    var sectionFourModel = Alloy.createModel( "AeDESFormsSectionFour" ,
                    {
                        FORM_ID: current_form_id ,
                        DAMAGES: Alloy.Globals.AeDESModeSectionFour["DAMAGES"] ,
                        MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"]
                    } ) ;
                    sectionFourModel.save() ;
                    sectionFourModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section five
            if( Alloy.Globals.AeDESModeSectionFive && _.size( Alloy.Globals.AeDESModeSectionFive ) > 0 )
            {
                Ti.API.info( '\nSectionFive:\n' ) ;

                var recoverSectionFive = Alloy.createCollection( 'AeDESFormsSectionFive' ) ;
                recoverSectionFive.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionFive where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionFive.length > 0 )
                {
                    var currentSectionFive = recoverSectionFive.at( 0 ) ;
                    currentSectionFive.set(
                    {
                        DAMAGE_TYPES: Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"]
                    } ) ;
                    currentSectionFive.save() ;
                    currentSectionFive = null ;
                }
                else
                {
                    var sectionFiveModel = Alloy.createModel( "AeDESFormsSectionFive" ,
                    {
                        FORM_ID: current_form_id ,
                        DAMAGE_TYPES: Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"]
                    } ) ;
                    sectionFiveModel.save() ;
                    sectionFiveModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section six
            if( Alloy.Globals.AeDESModeSectionSix && _.size( Alloy.Globals.AeDESModeSectionSix ) > 0 )
            {
                Ti.API.info( '\nSectionSix:\n' ) ;

                var recoverSectionSix = Alloy.createCollection( 'AeDESFormsSectionSix' ) ;
                recoverSectionSix.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionSix where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionSix.length > 0 )
                {
                    var currentSectionSix = recoverSectionSix.at( 0 ) ;
                    currentSectionSix.set(
                    {
                        POTENTIAL_CAUSES: Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"]
                    } ) ;
                    currentSectionSix.save() ;
                    currentSectionSix = null ;
                }
                else
                {
                    var sectionSixModel = Alloy.createModel( "AeDESFormsSectionSix" ,
                    {
                        FORM_ID: current_form_id ,
                        POTENTIAL_CAUSES: Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"]
                    } ) ;
                    sectionSixModel.save() ;
                    sectionSixModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section seven
            if( Alloy.Globals.AeDESModeSectionSeven && _.size( Alloy.Globals.AeDESModeSectionSeven ) > 0 )
            {
                Ti.API.info( '\nSectionSeven:\n' ) ;

                var recoverSectionSeven = Alloy.createCollection( 'AeDESFormsSectionSeven' ) ;
                recoverSectionSeven.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionSeven where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionSeven.length > 0 )
                {
                    var currentSectionSeven = recoverSectionSeven.at( 0 ) ;
                    currentSectionSeven.set(
                    {
                        MORPHOLOGY_SITE: Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] ,
                        SLOPES_LOOMING: Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] ,
                        SUBSOIL: Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"]
                    } ) ;
                    currentSectionSeven.save() ;
                    currentSectionSeven = null ;
                }
                else
                {
                    var sectionSevenModel = Alloy.createModel( "AeDESFormsSectionSeven" ,
                    {
                        FORM_ID: current_form_id ,
                        MORPHOLOGY_SITE: Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] ,
                        SLOPES_LOOMING: Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] ,
                        SUBSOIL: Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"]
                    } ) ;
                    sectionSevenModel.save() ;
                    sectionSevenModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section eight
            if( Alloy.Globals.AeDESModeSectionEight && _.size( Alloy.Globals.AeDESModeSectionEight ) > 0 )
            {
                Ti.API.info( '\nSectionEight:\n' ) ;

                var recoverSectionEight = Alloy.createCollection( 'AeDESFormsSectionEight' ) ;
                recoverSectionEight.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionEight where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionEight.length > 0 )
                {
                    var currentSectionEight = recoverSectionEight.at( 0 ) ;
                    currentSectionEight.set(
                    {
                        STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] ,
                        NOT_STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] ,
                        EXTERNAL: Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] ,
                        GEOTECHNICAL: Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] ,
                        OUTCOME_PRACTICABILITY: Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] ,
                        HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"] ,
                        FAMILIES_EVACUATED: Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"] ,
                        EVACUEES_N: Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"] ,
                        ACCURACY_VISIT: Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] ,
                        OTHER: Alloy.Globals.AeDESModeSectionEight["OTHER"] ,
                        MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"]
                    } ) ;
                    currentSectionEight.save() ;
                    currentSectionEight = null ;
                }
                else
                {
                    var sectionEightModel = Alloy.createModel( "AeDESFormsSectionEight" ,
                    {
                        FORM_ID: current_form_id ,
                        STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] ,
                        NOT_STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] ,
                        EXTERNAL: Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] ,
                        GEOTECHNICAL: Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] ,
                        OUTCOME_PRACTICABILITY: Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] ,
                        HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"] ,
                        FAMILIES_EVACUATED: Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"] ,
                        EVACUEES_N: Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"] ,
                        ACCURACY_VISIT: Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] ,
                        OTHER: Alloy.Globals.AeDESModeSectionEight["OTHER"] ,
                        MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"]
                    } ) ;
                    sectionEightModel.save() ;
                    sectionEightModel = null ;
                }
            }

            // If the array isn't null or empty, we have the details of the Section nine
            if( Alloy.Globals.AeDESModeSectionNine && _.size( Alloy.Globals.AeDESModeSectionNine ) > 0 )
            {
                Ti.API.info( '\nSectionNine:\n' ) ;

                var recoverSectionNine = Alloy.createCollection( 'AeDESFormsSectionNine' ) ;
                recoverSectionNine.fetch(
                {
                    query: "SELECT * FROM AeDESFormsSectionNine where FORM_ID = " + current_form_id
                } ) ;
                if( recoverSectionNine.length > 0 )
                {
                    var currentSectionNine = recoverSectionNine.at( 0 ) ;
                    currentSectionNine.set(
                    {
                        TOPIC: Alloy.Globals.AeDESModeSectionNine["TOPIC"] ,
                        OTHER_COMMENTS: Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"]
                    } ) ;
                    currentSectionNine.save() ;
                    currentSectionNine = null ;
                }
                else
                {
                    var sectionNineModel = Alloy.createModel( "AeDESFormsSectionNine" ,
                    {
                        FORM_ID: current_form_id ,
                        TOPIC: Alloy.Globals.AeDESModeSectionNine["TOPIC"] ,
                        OTHER_COMMENTS: Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"]
                    } ) ;
                    sectionNineModel.save() ;
                    sectionNineModel = null ;
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

                        var recoverImage = Alloy.createCollection( 'AeDESFormsImages' ) ;
                        recoverImage.fetch(
                        {
                            query: "SELECT * FROM AeDESFormsImages where ID = " + Alloy.Globals.CurrentPicsPath[i].id
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
                                var imageModel = Alloy.createModel( "AeDESFormsImages" ,
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

                        var recoverVideo = Alloy.createCollection( 'AeDESFormsVideos' ) ;
                        recoverVideo.fetch(
                        {
                            query: "SELECT * FROM AeDESFormsVideos where ID = " + Alloy.Globals.CurrentVideosPath[i].id
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
                                var videoModel = Alloy.createModel( "AeDESFormsVideos" ,
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
    
                Ti.App.fireEvent( "aedes_mode:save" ) ;

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
        var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
        
        var media_array = AeDESModeUtils.CreateMediaArray( current_form_id , true , true ) ;

        if( media_array && media_array.length > 0 )
        {
            // Controller creation for the Next View (inited in AeDES Mode)
            Alloy.Globals.createAndOpenControllerExt( 'DamageAssessmentsMakerView' , { type: "AeDES" , media_contents: media_array } ) ;

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
                LoadSectionOneData() ;
                LoadSectionTwoData() ;
                LoadSectionThreeData() ;
                LoadSectionFourData() ;
                LoadSectionFiveData() ;
                LoadSectionSixData() ;
                LoadSectionSevenData() ;
                LoadSectionEightData() ;
                LoadSectionNineData() ;
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
                            var filename = "scheda_aedes.pdf" ;
                            var zipname = "SchedaAeDES.zip" ;
                        }
                        else if( Titanium.Locale.currentLanguage == "es" )
                        {
                            var filename = "tarjeta_aedes.pdf" ;
                            var zipname = "TarjetaAeDES.zip" ;
                        }
                        else
                        {
                            var filename = "aedes_form.pdf" ;
                            var zipname = "AeDESForm.zip" ;
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
                        Alloy.Globals.createAndOpenControllerExt( 'SendFormView' , { type: 'AeDES' , form_id: current_form_id , pdf_native_path: file.nativePath , zip_filename: zipname , email_subject_language_msg: 'aedes_mode_send_email_dlg_subject' } ) ;
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
                                Alloy.Globals.AlertUserAndLogAsync( L( 'generic_upload_sign_1_err_msg' ) ) ;
                            }
                            break ;

                            case "ERROR_CODE_3":
                            {
                                Alloy.Globals.AlertUserAndLogAsync( L( 'generic_upload_sign_2_err_msg' ) ) ;
                            }
                            break ;

                            case "ERROR_CODE_4":
                            {
                                Alloy.Globals.AlertUserAndLogAsync( L( 'generic_upload_sign_3_err_msg' ) ) ;
                            }
                            break ;
                        }
                    }
                } ,
                 // Function called when an error occurs, including a timeout
                loader.onerror = function( e )
                {
                     EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                     Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + e.error ) ;
                } ;
                loader.timeout = Alloy.Globals.SendFormTimeoutMillisecs ;

                var tpd_name_1 = "" ;
                var tpd_sign_1_image = "" ;
                var tpd_name_2 = "" ;
                var tpd_sign_2_image = "" ;
                var tpd_name_3 = "" ;
                var tpd_sign_3_image = "" ;
                if( Alloy.Collections.AeDESModePD && _.size( Alloy.Collections.AeDESModePD ) > 0 )
                {
                    for( var i = 0 ; i < Alloy.Collections.AeDESModePD.length ; i++ )
                    {
                        var personalData = Alloy.Collections.AeDESModePD.at( i ) ;
                        switch( personalData.get( "COMPONENT_NUMBER" ) )
                        {
                            case 1:
                            {
                                tpd_name_1 = personalData.get( "NAME" ) ;
                                var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                                if( file )
                                {
                                    tpd_sign_1_image = file.read() ;
                                }
                            }
                            break ;

                            case 2:
                            {
                                tpd_name_2 = personalData.get( "NAME" ) ;
                                var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                                if( file )
                                {
                                    tpd_sign_2_image = file.read() ;
                                }
                            }
                            break ;

                            case 3:
                            {
                                tpd_name_3 = personalData.get( "NAME" ) ;
                                var file = Alloy.Globals.getFileForRead( personalData.get( "SIGN_PATH" ) ) ;
                                if( file )
                                {
                                    tpd_sign_3_image = file.read() ;
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
                    // Team Personal Data
                    TPD_NAME_1: tpd_name_1 ,
                    TPD_SIGN_1_IMAGE: tpd_sign_1_image ,
                    TPD_NAME_2: tpd_name_2 ,
                    TPD_SIGN_2_IMAGE: tpd_sign_2_image ,
                    TPD_NAME_3: tpd_name_3 ,
                    TPD_SIGN_3_IMAGE: tpd_sign_3_image ,

                    // Details
                    FORM_NO: Alloy.Globals.AeDESModeDetails["FORM_NO"] ,
                    DATE: Alloy.Globals.AeDESModeDetails["DATE"] ,

                    // Section one
                    LATITUDE: Alloy.Globals.AeDESModeSectionOne["LATITUDE"] ,
                    LONGITUDE: Alloy.Globals.AeDESModeSectionOne["LONGITUDE"] ,
                    ALTITUDE: Alloy.Globals.AeDESModeSectionOne["ALTITUDE"] ,
                    PROVINCE: Alloy.Globals.AeDESModeSectionOne["PROVINCE"] ,
                    MUNICIPALITY: Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"] ,
                    PLACE: Alloy.Globals.AeDESModeSectionOne["PLACE"] ,
                    ADDRESS: Alloy.Globals.AeDESModeSectionOne["ADDRESS"] ,
                    CIVIC_NO: Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"] ,
                    BUILDING_POSITION: Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] ,
                    B_NAME_OR_OWNER: Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"] ,
                    CODE_OF_USE: Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"] ,

                    // Section two
                    PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] ,
                    AVERAGE_HEIGHT_OF_FLOOR: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] ,
                    UNDERGROUND_PLANS_NO: Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] ,
                    AVERAGE_SURFACE: Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] ,
                    CONSTRUCTION_AGE: Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] ,
                    RENOVATION_AGE: Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] ,
                    UNIT_OF_USE_HOUSING: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"] ,
                    UNIT_OF_USE_PRODUCTIVE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"] ,
                    UNIT_OF_USE_COMMERCE: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"] ,
                    UNIT_OF_USE_OFFICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"] ,
                    UNIT_OF_USE_PUBLIC_SERVICES: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"] ,
                    UNIT_OF_USE_DEPOSIT: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"] ,
                    UNIT_OF_USE_STRATEGIC: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"] ,
                    UNIT_OF_USE_TOURISM: Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"] ,
                    UTILIZATION: Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] ,
                    OCCUPANTS: Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"] ,
                    PROPERTY: Alloy.Globals.AeDESModeSectionTwo["PROPERTY"] ,

                    // Section three
                    COVERAGE: Alloy.Globals.AeDESModeSectionThree["COVERAGE"] ,
                    PLAN_AND_ELEVATION: Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] ,
                    INFILL_DISPOSAL: Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] ,
                    ISOLATED_COLUMNS: Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] ,
                    MIXED: Alloy.Globals.AeDESModeSectionThree["MIXED"] ,
                    REINFORCED: Alloy.Globals.AeDESModeSectionThree["REINFORCED"] ,
                    REINFORCED_CONCRETE_FRAMES: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"] ,
                    REINFORCED_CONCRETE_WALLS: Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"] ,
                    STEEL_FRAMES: Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"] ,
                    MASONRY_STRUCTURES: Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] ,

                    // Section four
                    DAMAGES: Alloy.Globals.AeDESModeSectionFour["DAMAGES"] ,
                    FOUR_MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] ,

                    // Section five
                    DAMAGE_TYPES: Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] ,

                    // Section six
                    POTENTIAL_CAUSES: Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] ,

                    // Section seven
                    MORPHOLOGY_SITE: Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] ,
                    SLOPES_LOOMING: Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] ,
                    SUBSOIL: Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"] ,

                    // Section eight
                    STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] ,
                    NOT_STRUCTURAL: Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] ,
                    EXTERNAL: Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] ,
                    GEOTECHNICAL: Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] ,
                    OUTCOME_PRACTICABILITY: Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] ,
                    HOUSING_UNITS_UNINHABITABLE: Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"] ,
                    FAMILIES_EVACUATED: Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"] ,
                    EVACUEES_N: Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"] ,
                    ACCURACY_VISIT: Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] ,
                    OTHER: Alloy.Globals.AeDESModeSectionEight["OTHER"] ,
                    EIGHT_MEASURES_OF_EMERGENCY: Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] ,

                    // Section nine
                    TOPIC: Alloy.Globals.AeDESModeSectionNine["TOPIC"] ,
                    OTHER_COMMENTS: Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"]
                } ; 

                loader.open( "POST" , "https://www.edam.resiltronics.org/ManipulatePDF/AeDESMode_ManipulatePDF.php" ) ;

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

            var AeDESModeUtils = require( '/AeDESModeUtils' ) ;
            var media_array = AeDESModeUtils.CreateMediaArray( current_form_id , true ) ;

            // Controller creation for the Next View (inited in AeDES Mode)
            Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: media_array , type: 'AeDES' , is_synchronized: current_is_synchronized } ) ;

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
                    Alloy.Globals.MakeVideo( $.aedesModeFormsGeneralSectionWindow.getActivity() , "" , 0 , 0 , "" ) ;

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

    // Show alert message for taking geolocation
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

            Alloy.Globals.MakeVideo( $.aedesModeFormsGeneralSectionWindow.getActivity() , sCurrentHeading , e.coords.latitude , e.coords.longitude , "" ) ;
        }
        else
        {
            Alloy.Globals.reverseGeocodeAndUseCamera( sCurrentHeading , e.coords.latitude , e.coords.longitude , $.aedesModeFormsGeneralSectionWindow.getActivity() , RaiseEndAsyncBusyAction_CallBack ) ;
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
            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "AeDES" } ) ;
    
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
    Alloy.Globals.AeDESModeDetails = new Array() ;
    // Init with an empty array for the array used on the Section One section
    Alloy.Globals.AeDESModeSectionOne = new Array() ;
    // Init with an empty array for the array used on the Section Two section
    Alloy.Globals.AeDESModeSectionTwo = new Array() ;
    // Init with an empty array for the array used on the Section Three section
    Alloy.Globals.AeDESModeSectionThree = new Array() ;
    // Init with an empty array for the array used on the Section Four section
    Alloy.Globals.AeDESModeSectionFour = new Array() ;
    // Init with an empty array for the array used on the Section Five section
    Alloy.Globals.AeDESModeSectionFive = new Array() ;
    // Init with an empty array for the array used on the Section Six section
    Alloy.Globals.AeDESModeSectionSix = new Array() ;
    // Init with an empty array for the array used on the Section Seven section
    Alloy.Globals.AeDESModeSectionSeven = new Array() ;
    // Init with an empty array for the array used on the Section Eight section
    Alloy.Globals.AeDESModeSectionEight = new Array() ;
    // Init with an empty array for the array used on the Section Nine section
    Alloy.Globals.AeDESModeSectionNine = new Array() ;
    // Init with null for the array of the new pics
    Alloy.Globals.CurrentPicsPath = null ;
    // Init with null for the array of the new videos
    Alloy.Globals.CurrentVideosPath = null ;

    // Create our node items
    var nodes =
    [
        { menuHeader: L( 'aedes_mode_sections_slide_menu_title' ) , id: 0 , title: L( 'aedes_mode_section_details_title' ) , image: "/images/slide_menu_details.png" } ,
        { id: 1 , title: L( 'aedes_mode_section_section_one_title' ) , image: "/images/slide_menu_position.png" } ,
        { id: 2 , title: L( 'aedes_mode_section_section_two_title' ) , image: "/images/slide_menu_characteristics.png" } ,
        { id: 3 , title: L( 'aedes_mode_section_section_three_title' ) , image: "/images/slide_menu_type.png" } ,
        { id: 4 , title: L( 'aedes_mode_section_section_four_title' ) , image: "/images/slide_menu_infrastructure.png" } ,
        { id: 5 , title: L( 'aedes_mode_section_section_five_title' ) , image: "/images/slide_menu_not_structural.png" } ,
        { id: 6 , title: L( 'aedes_mode_section_section_six_title' ) , image: "/images/slide_menu_external_danger.png" } ,
        { id: 7 , title: L( 'aedes_mode_section_section_seven_title' ) , image: "/images/slide_menu_soil_and_foundations.png" } ,
        { id: 8 , title: L( 'aedes_mode_section_section_eight_title' ) , image: "/images/slide_menu_practicability.png" } ,
        { id: 9 , title: L( 'aedes_mode_section_section_nine_title' ) , image: "/images/slide_menu_comments.png" }
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
        $.navigationWindowAeDESModeFormsGeneralSection.open() ;
    }
    else
    {
        $.widgetAppButtonMakeMedia.init( '/images/make_media_normal.png' , '/images/make_media_pressed.png' , '/images/make_media_disabled.png' , L( 'btn_make_media_2_text' ) , OnBtnMakeMedia_Click ) ;
        $.viewAppButtonMakeMedia.visible = view_enabled ;
        $.widgetAppButtonMakeVideo.init( '/images/make_video_normal.png' , '/images/make_video_pressed.png' , '/images/make_video_disabled.png' , L( 'btn_make_video_text' ) , OnBtnMakeVideo_Click ) ;
        $.viewAppButtonMakeVideo.visible = view_enabled ;
        $.aedesModeFormsGeneralSectionWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}