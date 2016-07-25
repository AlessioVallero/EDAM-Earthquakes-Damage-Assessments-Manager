// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// Require the securely module
var securely = require( 'bencoding.securely' ) ;
var properties = securely.createProperties(
{
    secret: "WantToProtectOurSensibleData20140622" ,
    encryptFieldNames: true
} ) ;

Alloy.Globals.SessionId = properties.getString( 'session_id' ) ;
Alloy.Globals.SessionUsername = Ti.App.Properties.getString( 'session_username' ) ;
Alloy.Globals.SessionGroup = Ti.App.Properties.getString( 'session_group' ) ;
Alloy.Globals.RememberMeUsername = Ti.App.Properties.getString( 'remember_me_username' ) ;
Alloy.Globals.SendFormPreview = Ti.App.Properties.getString( 'send_form_preview' ) ;
Alloy.Globals.SendFormMediaContents = Ti.App.Properties.getString( 'send_form_media_contents' ) ;
Alloy.Globals.RememberMeUsername = Ti.App.Properties.getString( 'remember_me_username' ) ;
Alloy.Globals.RememberMePassword = properties.getString( 'remember_me_password' ) ;

// If a language was set, this property have a value. So we must keep it.
// Otherwise we can use the device language
var currentLanguageOnDB = Ti.App.Properties.getString( 'current_language' ) ;
if( currentLanguageOnDB )
{
    Alloy.Globals.CurrentLanguageSelectedIndex = currentLanguageOnDB ;
    if( OS_IOS )
    {
        var locale = require( "com.obscure.localehelper" ) ;

        switch( currentLanguageOnDB )
        {
            // English
            case "0":
            {
                locale.locale = "en" ;
            }
            break ;

            // Italian
            case "1":
            {
                locale.locale = "it" ;
            }
            break ;

            // Spanish
            case "2":
            {
                locale.locale = "es" ;
            }
            break ;

            // Default is english
            default:
            {
                locale.locale = "en" ;
            }
            break ;
        }
    }
    else
    {
        var locale = require( "com.shareourideas.locale" ) ;

        switch( currentLanguageOnDB )
        {
            // English
            case "0":
            {
                locale.setLocale( "en" ) ;
            }
            break ;

            // Italian
            case "1":
            {
                locale.setLocale( "it" ) ;
            }
            break ;

            // Spanish
            case "2":
            {
                locale.setLocale( "es" ) ;
            }
            break ;

            // Default is english
            default:
            {
                locale.setLocale( "en" ) ;
            }
            break ;
        }
    }
}
else
{
    if( Ti.Locale.currentLanguage == "es" )
    {
        Alloy.Globals.CurrentLanguageSelectedIndex = "2" ;
    }
    else if( Ti.Locale.currentLanguage == "it" )
    {
        Alloy.Globals.CurrentLanguageSelectedIndex = "1" ;
    }
    else
    {
        Alloy.Globals.CurrentLanguageSelectedIndex = "0" ;
    }
}

Alloy.Collections.UsersResidentsForms = Alloy.createCollection( 'UsersResidentsForms' ) ;
Alloy.Collections.UsersResidentsModePD = Alloy.createCollection( 'UsersResidentsPD' ) ;

Alloy.Collections.AeDESForms = Alloy.createCollection( 'AeDESForms' ) ;
Alloy.Collections.AeDESModePD = Alloy.createCollection( 'TeamPD' ) ;

Alloy.Collections.ShedForms = Alloy.createCollection( 'ShedForms' ) ;
Alloy.Collections.ShedModePD = Alloy.createCollection( 'ShedPD' ) ;

Alloy.Collections.ATC20Forms = Alloy.createCollection( 'ATC20Forms' ) ;
Alloy.Collections.ATC20ModePD = Alloy.createCollection( 'ATC20PD' ) ;

Alloy.Collections.BAEAForms = Alloy.createCollection( 'BAEAForms' ) ;

// The users residents current path on the file system of a sign image
Alloy.Globals.UsersResidentsCurrentSignPath = "" ;
// The users residents current sign blob
Alloy.Globals.UsersResidentsCurrentSign = null ;

// The AeDES current team path on the file system of a sign image of the component 1
Alloy.Globals.AeDESCurrentSignPath1 = "" ;
// The AeDES current team sign blob of the component 1
Alloy.Globals.AeDESCurrentSign1 = null ;

// The AeDES current team path on the file system of a sign image of the component 2
Alloy.Globals.AeDESCurrentSignPath2 = "" ;
// The AeDES current team sign blob of the component 2
Alloy.Globals.AeDESCurrentSign2 = null ;

// The AeDES current team path on the file system of a sign image of the component 3
Alloy.Globals.AeDESCurrentSignPath3 = "" ;
// The AeDES current team sign blob of the component 3
Alloy.Globals.AeDESCurrentSign3 = null ;

// The Shed current team path on the file system of a sign image of the component 1
Alloy.Globals.ShedCurrentSignPath1 = "" ;
// The Shed current team sign blob of the component 1
Alloy.Globals.ShedCurrentSign1 = null ;

// The Shed current team path on the file system of a sign image of the component 2
Alloy.Globals.ShedCurrentSignPath2 = "" ;
// The Shed current team sign blob of the component 2
Alloy.Globals.ShedCurrentSign2 = null ;

// The Shed current team path on the file system of a sign image of the component 3
Alloy.Globals.ShedCurrentSignPath3 = "" ;
// The Shed current team sign blob of the component 3
Alloy.Globals.ShedCurrentSign3 = null ;

// The ATC-20 NZ current path on the file system of a sign image
Alloy.Globals.ATC20NZCurrentSignPath = "" ;
// The ATC-20 NZ current sign blob
Alloy.Globals.ATC20NZCurrentSign = null ;

// Users Residents Mode details container
Alloy.Globals.UsersResidentsModeDetails = new Array() ;
// Users Residents Mode building position container
Alloy.Globals.UsersResidentsModeBuildingPosition = new Array() ;
// Users Residents Mode building characteristics container
Alloy.Globals.UsersResidentsModeBuildingCharacteristics = new Array() ;
// Users Residents Mode infrastructure container
Alloy.Globals.UsersResidentsModeInfrastructure = new Array() ;

// AeDES Mode details container
Alloy.Globals.AeDESModeDetails = new Array() ;
// AeDES Mode section one container
Alloy.Globals.AeDESModeSectionOne = new Array() ;
// AeDES Mode section two container
Alloy.Globals.AeDESModeSectionTwo = new Array() ;
// AeDES Mode section three container
Alloy.Globals.AeDESModeSectionThree = new Array() ;
// AeDES Mode section four container
Alloy.Globals.AeDESModeSectionFour = new Array() ;
// AeDES Mode section five container
Alloy.Globals.AeDESModeSectionFive = new Array() ;
// AeDES Mode section six container
Alloy.Globals.AeDESModeSectionSix = new Array() ;
// AeDES Mode section seven container
Alloy.Globals.AeDESModeSectionSeven = new Array() ;
// AeDES Mode section eight container
Alloy.Globals.AeDESModeSectionEight = new Array() ;
// AeDES Mode section nine container
Alloy.Globals.AeDESModeSectionNine = new Array() ;

// Shed Mode details container
Alloy.Globals.ShedModeDetails = new Array() ;
// Shed Mode shed position container
Alloy.Globals.ShedModeShedPosition = new Array() ;
// Shed Mode shed characteristics container
Alloy.Globals.ShedModeShedCharacteristics = new Array() ;
// Shed Mode infrastructure container
Alloy.Globals.ShedModeInfrastructure = new Array() ;
// Shed Mode damages container
Alloy.Globals.ShedModeDamages = new Array() ;
// Shed Mode judgment of practicability container
Alloy.Globals.ShedModeJudgmentOfPracticability = new Array() ;
// Shed Mode other comments container
Alloy.Globals.ShedModeOtherComments = new Array() ;

// ATC20 Mode inspection container
Alloy.Globals.ATC20ModeInspection = new Array() ;
// ATC20 Mode building description container
Alloy.Globals.ATC20ModeBuildingDescription = new Array() ;
// ATC20 Mode detailed evaluation container
Alloy.Globals.ATC20ModeDetailedEvaluation = new Array() ;
// ATC20 Mode detailed posting container
Alloy.Globals.ATC20ModeDetailedPosting = new Array() ;
// ATC20 Mode rapid evaluation container
Alloy.Globals.ATC20ModeRapidEvaluation = new Array() ;
// ATC20 Mode rapid posting container
Alloy.Globals.ATC20ModeRapidPosting = new Array() ;
// ATC20 Mode further actions container
Alloy.Globals.ATC20ModeFurtherActions = new Array() ;

// BAEA Mode details container
Alloy.Globals.BAEAModeDetails = new Array() ;
// BAEA Mode fault rupture container
Alloy.Globals.BAEAModeFaultRupture = new Array() ;
// BAEA Mode liquefaction container
Alloy.Globals.BAEAModeLiquefaction = new Array() ;
// BAEA Mode landslide container
Alloy.Globals.BAEAModeLandslide = new Array() ;
// BAEA Mode tsunami container
Alloy.Globals.BAEAModeTsunami = new Array() ;
// BAEA Mode lifelines container
Alloy.Globals.BAEAModeLifelines = new Array() ;
// BAEA Mode buildings container
Alloy.Globals.BAEAModeBuildings = new Array() ;
// BAEA Mode general container
Alloy.Globals.BAEAModeGeneral = new Array() ;
// BAEA Mode pics path temporary array
Alloy.Globals.CurrentTemporaryPicsPath = null ;

// Current pics path array
Alloy.Globals.CurrentPicsPath = null ;
// Current videos path array
Alloy.Globals.CurrentVideosPath = null ;

// Damage assessments maker pictures
Alloy.Globals.DamageAssessmentsMakerPics = null ;

Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex = 3 ;
Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex = 4 ;

////////////////////////////////// TIMEOUT //////////////////////////////////
Alloy.Globals.LoginRegistrationTimeoutMillisecs = 20000 ;   // 20 seconds
Alloy.Globals.SessioneControlloTimeoutMillisecs = 30000 ;   // 30 seconds
Alloy.Globals.LogoutTimeoutMillisecs = 15000 ;              // 15 seconds
Alloy.Globals.ServerSynchTimeoutMillisecs = 3600000 ;       // 1 hour
Alloy.Globals.SendFormTimeoutMillisecs = 1200000 ;          // 20 minutes
Alloy.Globals.GeolocationRequestTimeoutMillisecs = 30000 ;  // 30 seconds
Alloy.Globals.ShareMyPositionTimeoutMillisecs = 20000 ;     // 20 seconds
Alloy.Globals.ViewUsersLocationsTimeoutMillisecs = 60000 ;  // 1 minute
Alloy.Globals.BAEAExportCSVTimeoutMillisecs = 180000 ;      // 3 minutes
Alloy.Globals.ATC20ExportCSVTimeoutMillisecs = 180000 ;     // 3 minutes
/////////////////////////////////////////////////////////////////////////////

Alloy.Globals.CreateAndOpenControllerDebounceWaitPeriodMillisecs = 500 ; // Half of a second
Alloy.Globals.ShareMyPositionLoopPeriodMillisecs = 180000 ;              // 3 minutes

// Function to save the sessionId with the securely properties
// INPUT: the new sessionId
// OUTPUT: none
Alloy.Globals.SetSessionId = function( sessionId )
{
    properties.setString( 'session_id' , sessionId ) ;
} ;

// Function to save the rememberMePassword with the securely properties
// INPUT: the new rememberMePassword
// OUTPUT: none
Alloy.Globals.SetRememberMePassword = function( rememberMePassword )
{
    properties.setString( 'remember_me_password' , rememberMePassword ) ;
} ;

// Function to get the current locale
// INPUT: none
// OUTPUT: the current locale (e.g. en-US, it-IT, es-ES)
Alloy.Globals.CurrentLocale = function()
{
    var sRet = "" ;

    if( Ti.Locale.currentLanguage == 'it' )
    {
        sRet = 'it-IT' ;
    }
    else if( Ti.Locale.currentLanguage == 'es' )
    {
        sRet = 'es-ES' ;
    }
    else
    {
        sRet = 'en-US' ;
    }

    return sRet ;
} ;

// Function to open a controller's view with a debounce protection from double clicks
// INPUT: the controller's name
// OUTPUT: none
Alloy.Globals.createAndOpenControllerExt = _.debounce( function( controller_name , array_params )
{
    var controller = null ;

    if( array_params && _.size( array_params ) > 0 )
    {
        controller = Alloy.createController( controller_name , array_params ) ;
    }
    else
    {
        controller = Alloy.createController( controller_name ) ;
    }
    controller.getView().open() ;

} , Alloy.Globals.CreateAndOpenControllerDebounceWaitPeriodMillisecs , true ) ;

// Function to open a controller's view with a debounce protection from double clicks
// INPUT: the controller's name
// OUTPUT: none
Alloy.Globals.openExistingControllerExt = _.debounce( function( controller )
{
    controller.getView().open() ;
} , Alloy.Globals.CreateAndOpenControllerDebounceWaitPeriodMillisecs , true ) ;

// Loads the map module, which can be referenced by Alloy.Globals.Map
Alloy.Globals.Map = require( 'ti.map' ) ;

var events = {} ;
// Function to safely add an event listener
// INPUT: the object that will try to add the event listener, the event name and the event handler itself
//        PAY ATTENTION THAT IT WORKS ONLY WITH IDENTICAL FUNCTION REFERENCE!!!!
// OUTPUT: none
Alloy.Globals.ProtectedAddEventListener = function( context , eventName , eventHandler )
{
    // If the context already exist and the eventHandler is already inside, nothing to do
    if( events[context] && events[context][eventName] === eventHandler )
    {
        return ;
    }
    else
    {
        // Creation of the space for this context, if necessary
        if( !events[context] )
        {
            events[context] = {} ;
        }

        // If the context for this eventName already exist but there is another eventHandler inside, we'll remove it before
        if( events[context][eventName] && events[context][eventName] !== eventHandler )
        {
            context.removeEventListener( eventName , events[context][eventName] ) ;
            events[context][eventName] = null ;
        }

        // Adding the eventHandler
        events[context][eventName] = eventHandler ;
        context.addEventListener( eventName , eventHandler ) ;
    }
} ;

// Function to safely remove an event listener
// INPUT: the object that will try to remove the event listener, the event name and the event handler itself
//        PAY ATTENTION THAT IT WORKS ONLY WITH IDENTICAL FUNCTION REFERENCE!!!!
// OUTPUT: none
Alloy.Globals.ProtectedRemoveEventListener = function( context , eventName , eventHandler )
{
    // If the context exist and the eventHandler is inside, we'll remove it
    if( events[context] && events[context][eventName] === eventHandler )
    {
        context.removeEventListener( eventName , eventHandler ) ;
        events[context][eventName] = null ;
    }
} ;

// Function to clean up an event listener, if necessary
// INPUT: the object that will try to remove the event listener and the event name
// OUTPUT: none
Alloy.Globals.ProtectedCleanUpEventListener = function( context , eventName )
{
    // If the context exist and the eventHandler is inside, we'll remove it
    if( events[context] && events[context][eventName] )
    {
        context.removeEventListener( eventName , events[context][eventName] ) ;
        events[context][eventName] = null ;
    }
} ;

// Function to reset the local session
// INPUT: none
// OUTPUT: none
Alloy.Globals.ResetSession = function()
{
    Alloy.Globals.SessionId = null ;
    properties.setString( 'session_id' , '' ) ;
    Alloy.Globals.SessionUsername = null ;
    Ti.App.Properties.setString( 'session_username' , '' ) ;
    Alloy.Globals.SessionGroup = null ;
    Ti.App.Properties.setString( 'session_group' , '' ) ;
} ;

// Function to reset the local session
// INPUT: none
// OUTPUT: true if a local session exist, false otherwise
Alloy.Globals.ExistSession = function()
{
    var bRet = false ;

    if( Alloy.Globals.SessionId && Alloy.Globals.SessionUsername )
    {
        bRet = true ;
    }

    return bRet ;
} ;

// Function that creates a title based on the current authentication informations
// INPUT: none
// OUTPUT: the title based on the current authentication informations
Alloy.Globals.CurrentAuthenticationInfoTitle = function()
{
    var sRet = "" ;

    if( Alloy.Globals.ExistSession() )
    {
        sRet = L( 'generic_welcome_online_text_msg' ) + Alloy.Globals.SessionUsername ;
        if( Alloy.Globals.SessionGroup )
        {
            sRet = sRet + " - " + Alloy.Globals.SessionGroup + "!" ;
        }
        else
        {
            sRet = sRet + "!" ;
        }
    }
    else
    {
        sRet = L( 'generic_welcome_offline_text_msg' ) ;
    }

    return sRet ;
} ;

// N.B. getFileForRead & getFileForWrite:
//      From what I can tell, Titanium is not implementing this correctly. From what I can read, you need to call Context.externalFilesDir(), to get that special path. According to the Android documentation, this folder is removed upon uninstall.
//      In Titanium, the call to use is Ti.Filesystem.getExternalStorageDirectory(), but this does not entirely equal the Android Environment.getExternalStorageDirectory(), because Titanium appends the application package name.
//      This means that Ti.Filesystem.getExternalStorageDirectory returns appdata:// which is translated into something like /storage/sdcard0/com.example.testapp. This can be fine for some uses, where you want to preserve the data between application installs. If you intend the user to find the data, I would argue that you should use your apps displayname rather than the package name. You cannot get the Context.externalFilesDir() path from Titanium. You can discard the package name to get the equivalent of Environment.getExternalStorageDirectory().
//      My only solution to this was to roll a native module that simply provides access to these two system calls.
//      For devices that provides an internal SD card that is not removable (like Samsung devices), this approach will return this primary external SD card e not the inserted one.
//      I decided to not create any workaround to list the mounted points because they can change in future release of Android, so for now we accept to write in this internal SD card and not in the inserted one.
//      However, most the Android devices are following the Google specifications for this, so most of the Android devices are able to use the external SD card. For the others we must wait for future official fixing.

// Function to get a file from the file system for a reading purpose, with this behaviour:
// iOS - applicationDataDirectory only;
// Android - externalStorageDirectory first (if present), then applicationDataDirectory
// INPUT: the filename
// OUTPUT: the file if present, null otherwise
Alloy.Globals.getFileForRead = function( filename )
{
    var ret = null ;

    try
    {
        // Test if the External Storage is present (Android only)
        if( Ti.Filesystem.isExternalStoragePresent() )
        {
            ret = Ti.Filesystem.getFile( Ti.Filesystem.externalStorageDirectory , filename ) ;
            if( ret.exists() )
            {
                // OK
            }
            else
            {
                ret = null ;
            }
        }

        if( ret )
        {
            // OK
        }
        // No SD or iOS or missing file
        else
        {
            ret = Ti.Filesystem.getFile( Ti.Filesystem.applicationDataDirectory , filename ) ;
            if( ret.exists() )
            {
                // OK
            }
            else
            {
                ret = null ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        ret = null ;
    }

    return ret ;
} ;

// Function to get a file from the file system for a writing purpose, with this behaviour:
// iOS - applicationDataDirectory only;
// Android - externalStorageDirectory first (if present), then applicationDataDirectory
// INPUT: the filename
// OUTPUT: the file
Alloy.Globals.getFileForWrite = function( filename )
{
    var ret = null ;

    try
    {
        // Test if the External Storage is present (Android only)
        if( Ti.Filesystem.isExternalStoragePresent() )
        {
            ret = Ti.Filesystem.getFile( Ti.Filesystem.externalStorageDirectory , filename ) ;
        }

        if( ret )
        {
            // OK
        }
        // No SD or iOS
        else
        {
            ret = Ti.Filesystem.getFile( Ti.Filesystem.applicationDataDirectory , filename ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        ret = null ;
    }

    return ret ;
} ;

// Function to replace a particular char in a string
// INPUT: the index where replace the char, the old string and the new char to insert
// OUTPUT: the new string with the replacement
Alloy.Globals.replaceCharAt = function( index , old_string , new_character )
{
    return old_string.substr( 0 , index ) + new_character + old_string.substr( index + 1 ) ;
} ;

// Function to log into the DB what happened
// INPUT: the error message to log
Alloy.Globals.LogMessage = function( error_message )
{
    var dateNow = new Date().toString() ;
    var errorsModel = Alloy.createModel( "Errors",
    {
        DATE: dateNow ,
        ERR_MSG: error_message
    } ) ;
    // Save model to our database. If the model already exists, the save will be an "update".
    errorsModel.save() ;
} ;

// Function to alert the user about an error and log into the DB what happened
// INPUT: the error message to show in the alert dialog
// OUTPUT: none
Alloy.Globals.AlertUserAndLogAsync = function( error_message )
{
    var dateNow = new Date().toString() ;
    var errorsModel = Alloy.createModel( "Errors",
    {
        DATE: dateNow ,
        ERR_MSG: error_message
    } ) ;
    // Save model to our database. If the model already exists, the save will be an "update".
    errorsModel.save() ;

    // AlertDialog for the user
    var alertDialog = Titanium.UI.createAlertDialog(
    {
        title: L( 'generic_error_title' ) ,
        message: error_message
    } ) ;
    // Show alert message for the error
    alertDialog.show() ;
} ;

// Function to hide a previous keyboard after a click
// INPUT: the window for attaching the click event and the textfield subjects of the blur of the keyboard
// OUTPUT: none
function RegisterHideKeyboard( window , textFields )
{
    window.addEventListener( "click" , function()
    {
        if( OS_ANDROID )
        {
            Ti.UI.Android.hideSoftKeyboard() ;
        }
        else
        {
            for( var i = 0 ; i < textFields.length ; i++ )
            {
                textFields[i].blur() ; // Hiding each keyboards
            }
        }
    } ) ;
}

// Function to protect the Window with a busy state for the passed action
// INPUT: an activity_indicator to show/hide, an array of controls to disable/enable, the function to execute during the busy state and the view current enable status
// OUTPUT: none
function BusyAction( activity_indicator , controls , busy_enable_function , view_enabled )
{
    var bRet = false ;

    if( busy_enable_function )
    {
        if( typeof view_enabled == 'undefined' || view_enabled == null )
        {
            view_enabled = true ;
        }

        try
        {
            // Disable controls
            if( controls )
            {
                for( var i = 0 ; i < controls.length ; i++ )
                {
                    controls[i].enabled = false ;
                }
            }

            // Show the activity indicator
            activity_indicator.show() ;

            // Function to execute during the busy state
            bRet = busy_enable_function() ;
        }
        catch( exception )
        {
            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        }
        finally
        {
            // Hide the activity indicator
            activity_indicator.hide() ;

            // Enable controls
            if( controls && view_enabled )
            {
                for( var i = 0 ; i < controls.length ; i++ )
                {
                    controls[i].enabled = true ;
                }
            }
        }

        return bRet ;
    }
}

// Function to protect the Window with a busy state for the passed action.
// This is for the beginning of an async calls, so EndAsyncBusyAction must be called after
// INPUT: an activity_indicator to show/hide, an array of controls to disbale/enable and the function to execute during the busy state
// OUTPUT: none
function BeginAsyncBusyAction( activity_indicator , controls , busy_enable_function , failed_callback )
{
    var bRet = false ;

    if( busy_enable_function )
    {
        try
        {
            // Disable controls
            if( controls )
            {
                for( var i = 0 ; i < controls.length ; i++ )
                {
                    controls[i].enabled = false ;
                }
            }

            // Show the activity indicator
            activity_indicator.show() ;

            // Function to execute during the busy state
            bRet = busy_enable_function() ;
        }
        catch( exception )
        {
            EndAsyncBusyAction( activity_indicator , controls ) ;
            if( failed_callback )
            {
                failed_callback() ;
            }

            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        }

        return bRet ;
    }
}

// Function to protect the Window with a busy state for the passed action.
// This is for the end of an async calls
// INPUT: an activity_indicator to hide, an array of controls to disbale/enable and the function to execute during the busy state
// OUTPUT: none
function EndAsyncBusyAction( activity_indicator , controls , callback )
{
    var bRet = false ;

    try
    {
        bRet = true ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        // Hide the activity indicator
        activity_indicator.hide() ;

        // Enable controls
        if( controls )
        {
            for( var i = 0 ; i < controls.length ; i++ )
            {
                controls[i].enabled = true ;
            }
        }

        if( callback )
        {
            callback() ;
        }
    }

    return bRet ;
}

// Function to check if the passed table exists
// INPUT: the DB object in order to make the query and the table in check for the existence
// OUTPUT: true the table exists on the actual DB, false otherwise
Alloy.Globals.tableExists = function( dbObj , table )
{
    var bRet = false ;

    if( dbObj )
    {
        try
        {
            var rs = dbObj.execute( "SELECT count(*) FROM sqlite_master WHERE type = 'table' and name = '" + table + "';" ) ;
        }
        catch( exception )
        {

        }

        if( !rs || !rs.isValidRow() || rs.field(0) == 0 )
        {

        }
        else
        {
            bRet = true ;
        }

        rs.close() ;
    }
 
    return bRet ;
} ;

// Function to check if the current user is authorized to ask localization
// INPUT: nothing
// OUTPUT: true if we are authorized to ask localization, false otherwise
Alloy.Globals.isLocationAuthorized = function()
{
    var retVal = true ;

    // Check that we are allowed to use
    if( !Ti.Geolocation.locationServicesEnabled )
    {
        return false ;
    }

    // iOS devices can perform a further check on the authorization's state
    if( OS_IOS )
    {
        var authorization = Titanium.Geolocation.locationServicesAuthorization ;
    
        if( authorization == Titanium.Geolocation.AUTHORIZATION_DENIED )
        {
            // User has decided to not allow this use of location
            retVal = false ;
        }
        else if( authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED )
        {
            // A device restriction prevent us from using location services
            retVal = false ;
        }
        else
        {
            retVal = true ;
        }
    }
    else
    {
        retVal = true ;
    }

    return retVal ;
} ;

// Function to get the current heading
// INPUT: an associative array with a callback function inside success ( example: { success: setLabelText } )
// OUTPUT: none
Alloy.Globals.getHeading = function( _args )
{
    Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS ;
    // For our purposes, we need high accuracy
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST ;
    Titanium.Geolocation.showCalibration = true ;
    Titanium.Geolocation.headingFilter = 0 ;

    Ti.Geolocation.addEventListener( 'heading' , _args.success ) ;
} ;

// Function to calculate the current magnetic heading (North, South, West, East)
// INPUT: the magnetic heading degrees and if the current calculation must be kept or reversed (North become South, East become West and so on)
// OUTPUT: the calculated magnetic heading (N, S, W, E)
Alloy.Globals.CalculateMagneticHeading = function( magnetic_heading , dont_reverse_result )
{
    var currentHeading = "" ;
    // North or East
    if( magnetic_heading <= 90 )
    {
        if( magnetic_heading <= 45 )
        {
            // North
            currentHeading = "N" ;
        }
        else
        {
            // East
            currentHeading = "E" ;
        }
    }
    // East or South
    else if( magnetic_heading <= 180 )
    {
        if( magnetic_heading <= 135 )
        {
            // East
            currentHeading = "E" ;
        }
        else
        {
            // South
            currentHeading = "S" ;
        }
    }
    // South or West
    else if( magnetic_heading <= 270 )
    {
        if( magnetic_heading <= 225 )
        {
            // South
            currentHeading = "S" ;
        }
        else
        {
            // West
            currentHeading = "W" ;
        }
    }
    // West or North
    else
    {
        if( magnetic_heading <= 315 )
        {
            // West
            currentHeading = "W" ;
        }
        else
        {
            // North
            currentHeading = "N" ;
        }
    }

    if( dont_reverse_result )
    {
        // Nothing to do
    }
    else
    {
        switch( currentHeading )
        {
            case "N":
            {
                currentHeading = "S" ;
            }
            break ;

            case "E":
            {
                currentHeading = "W" ;
            }
            break ;

            case "S":
            {
                currentHeading = "N" ;
            }
            break ;

            case "W":
            {
                currentHeading = "E" ;
            }
            break ;
        }
    }

    return currentHeading ;
} ;

// Function to get the current location (it's a best practice to check if we are authorized
// first, with the isLocationAuthorized function!)
// INPUT: an associative array with a callback function inside success ( example: { success: setLabelText } )
// OUTPUT: none, but the passed callback function (if passed) is raised if everything it's ok
Alloy.Globals.getLocation = function( _args )
{
    if( OS_IOS )
    {
        Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS ;
        // For our purposes, we need high accuracy
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST ;
        Titanium.Geolocation.showCalibration = true ;
        Titanium.Geolocation.distanceFilter = 0 ;
    }
    else if( OS_ANDROID )
    {
        var providerGps = Ti.Geolocation.Android.createLocationProvider(
        {
            name: Ti.Geolocation.PROVIDER_GPS ,
            minUpdateDistance: 0.0 ,
            minUpdateTime: 0
        } ) ;
        Ti.Geolocation.Android.addLocationProvider( providerGps ) ;
        Ti.Geolocation.Android.manualMode = true ;
    }
    else
    {
        Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS ;
        // For our purposes, we need high accuracy
        Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH ;
        Titanium.Geolocation.showCalibration = true ;
        Titanium.Geolocation.distanceFilter = 0 ;
    }

    Ti.Geolocation.addEventListener( 'location' , _args.success ) ;
} ;

// Function to get the reverse geocoding of a latitude, longitude pairs
// INPUT: latitude and longitude, and the callback to call when the location it's georeversed
// OUTPUT: none, but the passed callback function (if passed) is raised if everything it's ok
Alloy.Globals.reverseGeocode = function( latitude , longitude , callback )
{
    var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + latitude + "," + longitude ;

    var addrReq = Titanium.Network.createHTTPClient() ;
    addrReq.open( "GET" , addrUrl ) ;
    addrReq.send( null ) ;
      
    addrReq.onload = function()
    {
        var response = JSON.parse( this.responseText ) ;

        var formattedResponse = Alloy.Globals.formatReverseGeocodingAnswer( response ) ;
        if( formattedResponse['status'] == "OK" )
        {
            if( callback )
            {
                callback( formattedResponse ) ;
            }
        }
        else
        {
            alert( L( 'unable_to_find_the_address_msg' ) ) ;
        }
    } ;
} ;

// Function to get the reverse geocoding of a latitude, longitude pairs
// INPUT: heading, latitude and longitude where the media content will be made, and the current activity if this is a video
// OUTPUT: none
Alloy.Globals.reverseGeocodeAndUseCamera = function( heading , latitude , longitude , current_activity , reverseGeocodeDone_Callback )
{
    var addrUrl = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=" + latitude + "," + longitude ;

    var addrReq = Titanium.Network.createHTTPClient() ;
    addrReq.open( "GET" , addrUrl ) ;
    addrReq.onload = function()
    {
        var response = JSON.parse( this.responseText ) ;

        var formattedResponse = Alloy.Globals.formatReverseGeocodingAnswer( response ) ;

        if( reverseGeocodeDone_Callback )
        {
            reverseGeocodeDone_Callback() ;
        }

        if( formattedResponse['status'] == "OK" )
        {
            if( current_activity )
            {
                Alloy.Globals.MakeVideo( current_activity , heading , formattedResponse['lat'] , formattedResponse['lng'] , formattedResponse['formatted_address'] ) ;
            }
            else
            {
                Alloy.Globals.UseCamera( heading , formattedResponse['lat'] , formattedResponse['lng'] , formattedResponse['formatted_address'] ) ;
            }
        }
        else
        {
            alert( L( 'unable_to_find_the_address_msg' ) ) ;
        }
    } ;
    addrReq.send() ;
} ;

// Function to parse and format the Google response of a reverse geocoding
// INPUT: the received response from Google
// OUTPUT: an associative array with the formatted answer
Alloy.Globals.formatReverseGeocodingAnswer = function( response )
{
    var formattedAnswer = new Array() ;

    try
    {
        if( response.status == 'OK' )
        {
            formattedAnswer['street_number'] = "" ;
            formattedAnswer['route'] = "" ;
            formattedAnswer['administrative_area_level_1'] = "" ;
            formattedAnswer['administrative_area_level_2'] = "" ;
            formattedAnswer['country'] = "" ;
            formattedAnswer['postal_code'] = "" ;
            formattedAnswer['lng'] = "" ;
            formattedAnswer['lat'] = "" ;
            formattedAnswer['formatted_address'] = "" ;
            if( response.results && response.results.length > 0 )
            {
                var firstResult = response.results[0] ;
                if( firstResult.address_components && firstResult.address_components.length > 0 )
                {
                    for( var i = 0 ; i < firstResult.address_components.length ; i++ )
                    {
                        var currentElem = firstResult.address_components[i] ;
                        switch( currentElem.types[0] )
                        {
                            case 'street_number':
                            {
                                formattedAnswer['street_number'] = currentElem['long_name'] ;
                            }
                            break ;

                            case 'route':
                            {
                                formattedAnswer['route'] = currentElem['long_name'] ;
                            }
                            break ;

                            case 'locality':
                            {
                                formattedAnswer['locality'] = currentElem['long_name'] ;
                            }
                            break ;

                            case 'administrative_area_level_1':
                            {
                                formattedAnswer['administrative_area_level_1'] = currentElem['long_name'] ;
                            }
                            break ;

                            case 'administrative_area_level_2':
                            {
                                formattedAnswer['administrative_area_level_2'] = currentElem['long_name'] ;
                            }
                            break ;

                            case 'country':
                            {
                                formattedAnswer['country'] = currentElem['long_name'] ;
                            }
                            break ;

                            case 'postal_code':
                            {
                                formattedAnswer['postal_code'] = currentElem['long_name'] ;
                            }
                            break ;
                        }
                    }

                    if( firstResult.geometry && firstResult.geometry.location )
                    {
                        formattedAnswer['lng'] = firstResult.geometry.location.lng ;
                        formattedAnswer['lat'] = firstResult.geometry.location.lat ;

                        if( firstResult.formatted_address )
                        {
                            formattedAnswer['formatted_address'] = firstResult.formatted_address ;
                        }
                    }
                }

                formattedAnswer['status'] = 'OK' ;
            }
        }
        else
        {
            formattedAnswer['status'] = 'KO' ;
        }
    }
    catch( exception )
    {
        formattedAnswer['status'] = 'KO' ;
    }

    return formattedAnswer ;
} ;

// Function to use the camera of the phone (Picture and video for iOS, only picture for Android)
// INPUT: latitude , longitude and address where the media content will be made
// OUTPUT: none
Alloy.Globals.UseCamera = function( heading , latitude , longitude , address )
{
    Titanium.Media.showCamera(
    {
        success: function( event )
        {
            // Called when media returned from the camera
            Ti.API.debug( 'Our type was: ' + event.mediaType ) ;

            if( event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO )
            {
                // Init of the array (if it's necessary)
                if( !Alloy.Globals.CurrentPicsPath )
                {
                    Alloy.Globals.CurrentPicsPath = new Array() ;
                }

                // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
                // The files in the temporary folder may not persist when the application is shut down and restarted.
                var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".png" ) ;
                if( newFile.exists )
                {
                    // A previous image will be dropped
                    newFile.deleteFile() ;
                }
                newFile.write( event.media ) ;

                var media_details = { media: newFile.getNativePath() , heading: heading , latitude: latitude , longitude: longitude , address: address } ;

                // Controller creation for the Next View
                Alloy.createController( 'MediaDamagesDetailsView' , { type: "FormPic" , media_details: media_details } ).getView().open() ;
            }
            else if( event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO )
            {
                // Init of the array (if it's necessary)
                if( !Alloy.Globals.CurrentVideosPath )
                {
                    Alloy.Globals.CurrentVideosPath = new Array() ;
                }

                // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
                // The files in the temporary folder may not persist when the application is shut down and restarted.
                var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".3gp" ) ;
                if( newFile.exists )
                {
                    // A previous video will be dropped
                    newFile.deleteFile() ;
                }
                newFile.write( event.media ) ;

                var media_details = { media: newFile.getNativePath() , heading: heading , latitude: latitude , longitude: longitude , address: address } ;

                // Controller creation for the Next View
                Alloy.createController( 'MediaDamagesDetailsView' , { type: "FormVideo" , media_details: media_details } ).getView().open() ;
            }
            else
            {
                alert( L( 'generic_type_not_supported_msg' ) ) ;
            }
        } ,
        cancel: function()
        {
            // Called when user cancels taking a media
        } ,
        error: function( error )
        {
            // Called when there's an error
            var alertDialog = Titanium.UI.createAlertDialog(
            {
                title: L( 'generic_camera_title' ) ,
                buttonNames: [ L( 'generic_ok_msg' ) ]
            } ) ;
            if( error.code == Titanium.Media.NO_CAMERA )
            {
                alertDialog.setMessage( L( 'no_camera_on_this_device_msg' ) ) ;
            }
            else
            {
                alertDialog.setMessage( L( 'generic_exception_msg' ) + error.code ) ;
            }
            alertDialog.show() ;
        },
        saveToPhotoGallery: false ,
        mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
    } ) ;
} ;

// Function to use the camera of the phone
Alloy.Globals.MakeVideo = function( current_activity , heading , latitude , longitude , address )
{
    var intent = Titanium.Android.createIntent( { action: 'android.media.action.VIDEO_CAPTURE' } ) ;
    current_activity.startActivityForResult( intent , function( e )
    {
        if( e.error )
        {
            Ti.UI.createNotification(
            {
                duration: Ti.UI.NOTIFICATION_DURATION_LONG ,
                message: 'Error ' + e.error
            } ).show() ;
        }
        else if( e.resultCode == Ti.Android.RESULT_OK )
        {
            if( e.intent.data )
            {
                // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
                // The files in the temporary folder may not persist when the application is shut down and restarted.
                var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".3gp" ) ;
                if( newFile.exists )
                {
                    // A previous video will be dropped
                    newFile.deleteFile() ;
                }

                var sourceVideo = Ti.Filesystem.getFile( e.intent.data ) ;
                // Note: sourceVideo.exists() will return false, because this is a URI into the MediaStore.
                // BUT we can still call "copy" to save the data to an actual file
                sourceVideo.copy( newFile.nativePath ) ;

                // Init of the array (if it's necessary)
                if( !Alloy.Globals.CurrentVideosPath )
                {
                    Alloy.Globals.CurrentVideosPath = new Array() ;
                }

                var media_details = { media: newFile.getNativePath() , heading: heading , latitude: latitude , longitude: longitude , address: address } ;
                // Controller creation for the Next View
                Alloy.createController( 'MediaDamagesDetailsView' , { type: "FormVideo" , media_details: media_details } ).getView().open() ;
            }
            else
            {
                // Called when there's an error
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_no_video_data_title' ) ,
                    buttonNames: [ L( 'generic_ok_msg' ) ]
                } ) ;
                alertDialog.setMessage( L( 'no_video_data_msg' ) ) ;

                alertDialog.show() ;
            }
        }
        else if( e.resultCode == Ti.Android.RESULT_CANCELED )
        {
            Ti.API.trace( 'User cancelled video capture session' ) ;
        }
        else
        {
            Ti.API.error( 'Could not record video!' ) ;
            // Called when there's an error
            var alertDialog = Titanium.UI.createAlertDialog(
            {
                title: L( 'generic_no_video_data_title' ) ,
                buttonNames: [ L( 'generic_ok_msg' ) ]
            } ) ;
            alertDialog.setMessage( L( 'generic_video_error_msg' ) ) ;

            alertDialog.show() ;
        }
    } ) ;
} ;

var backgroundTimeout = null ;

function ShareMyPosition()
{
    try
    {
        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            // Network unavailable, we cannot update the current position
            Alloy.Globals.LogMessage( "Network unavailable while trying to get the current location." ) ;
        }
        else
        {
            if( Alloy.Globals.ExistSession() )
            {
                var bContinue = true ;
                if( OS_ANDROID )
                {
                    // On Android currently there isn't a generic event that allow to keep track if EDAM is in foreground or in background,
                    // so we must use this module as a workaround
                    var platformTools = require( 'bencoding.android.tools' ).createPlatform() ;
                    bContinue = platformTools.isInForeground() ;
                }

                if( bContinue )
                {
                    // If we can ask for localization on this device
                    if( Alloy.Globals.isLocationAuthorized() )
                    {
                        // Start a new timeout to the location request
                        backgroundTimeout = setTimeout( function()
                        {
                            backgroundTimeout = null ;
                        } , Alloy.Globals.GeolocationRequestTimeoutMillisecs ) ;

                        Alloy.Globals.getLocation(
                        {
                            success: UpdateBackgroundPosition
                        } ) ;
                    }
                    else
                    {
                        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_user_not_authorized_to_ask_localization' ) ) ;
                    }
                }
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// To update current position of the user
var intervalShareMyPosition = setInterval( ShareMyPosition , Alloy.Globals.ShareMyPositionLoopPeriodMillisecs ) ;

function UpdateBackgroundPosition( e )
{
    Ti.Geolocation.removeEventListener( 'location' , UpdateBackgroundPosition ) ;

    if( !e.success || e.error )
    {
        return ;
    }

    if( e && e.coords )
    {
        var latitude = e.coords.latitude.toString() ;
        var longitude = e.coords.longitude.toString() ;

        var loader = Titanium.Network.createHTTPClient() ;
        loader.validatesSecureCertificate = false ;

        // Runs the function when the data is ready for us to process
        loader.onload = function() 
        {
            var error_occurred = false ;

            var json = this.responseText ;
            var response = JSON.parse( json ) ;
            if( loader.status == 200 )
            {
                if( response.OK == true )
                {
                    // OK
                }
                else
                {
                    error_occurred = true ;
                }
            }
            else
            {
                error_occurred = true ;
            }

            if( error_occurred )
            {
                switch( response.ErrorType )
                {
                    case "Expired":
                    {
                        // Reset the current sesion variables since the current one is expired
                        Alloy.Globals.ResetSession() ;
                        Alloy.Globals.LogMessage( L( 'generic_expired_err_msg' ) ) ;
                    }
                    break ;

                    case "ConnectionError":
                    {
                        Alloy.Globals.LogMessage( L( 'generic_connection_error_err_msg' ) ) ;
                    }
                    break ;

                    case "InvalidUser":
                    {
                        Alloy.Globals.LogMessage( L( 'generic_invalid_user_err_msg' ) ) ;
                    }
                    break ;

                    case "InsertUserLocationFailed":
                    {
                        Alloy.Globals.LogMessage( "Insert of the User Location failed!" ) ;
                    }
                    break ;

                    case "UnexpectedError":
                    {
                        Alloy.Globals.LogMessage( L( 'generic_unexpected_error_err_msg' ) ) ;
                    }
                    break ;
                }
            }

            if( backgroundTimeout !== null )
            {
                // Clear a previous timeout, if exist
                clearTimeout( backgroundTimeout ) ;

                backgroundTimeout = null ;
            }
        } ;
         // Function called when an error occurs, including a timeout
        loader.onerror = function( event )
        {
            Alloy.Globals.LogMessage( L( 'generic_exception_msg' ) + event.error ) ;

            if( backgroundTimeout !== null )
            {
                // Clear a previous timeout, if exist
                clearTimeout( backgroundTimeout ) ;

                backgroundTimeout = null ;
            }
        } ;

        var params =
        {
            // Key
            key: "EDAM" ,
            // Latitude
            LATITUDE: latitude ,
            // Longitude
            LONGITUDE: longitude ,
            // OS
            OS: Titanium.Platform.osname ,
            // Session ID
            SID: Alloy.Globals.SessionId ,
            // Don't update the timer for the session
            UPDATE_SESSION_TIMER: false
        } ;

        loader.timeout = Alloy.Globals.ShareMyPositionTimeoutMillisecs ;
        loader.open( "POST" , "https://www.edam.resiltronics.org/UpdateUserLocation.php" ) ;

        loader.send( params ) ;
    }
    else
    {
        Alloy.Globals.LogMessage( "Location coordinates empty!" ) ;
    }
}

// When EDAM is not active, ShareMyPosition must be stopped
Ti.App.addEventListener( 'app:paused' ,function()
{
    if( intervalShareMyPosition !== null )
    {
        clearInterval( intervalShareMyPosition ) ;

        intervalShareMyPosition = null ;
    }
} ) ;

// When EDAM is active again, ShareMyPosition must be started
Ti.App.addEventListener( 'app:resumed' , function()
{
    if( intervalShareMyPosition === null )
    {
        intervalShareMyPosition = setInterval( ShareMyPosition , Alloy.Globals.ShareMyPositionLoopPeriodMillisecs ) ;
    }
} ) ;

if( OS_IOS )
{
    Titanium.App.addEventListener( 'pause' , function()
    {
        Ti.App.fireEvent( 'app:paused' ) ;
    } ) ;

    Titanium.App.addEventListener( 'resumed' , function()
    {
        Ti.App.fireEvent( 'app:resumed' ) ;
    } ) ;
}

var dbVersion = Ti.App.Properties.getString( "dbVersion" ) ;

var myDb = null ;
if( typeof dbVersion == 'undefined' || dbVersion == null )
{
    // Do 1.0.7 upgrade
    dbVersion = '1.0.7' ;

    myDb = Ti.Database.open( 'EEM' ) ;
    try
    {
        myDb.execute( 'BEGIN' ) ;

        // If the table exist
        if( Alloy.Globals.tableExists( myDb , "UsersResidentsForms" ) )
        {
            var data = new Array() ;
            // If the building position exist
            if( Alloy.Globals.tableExists( myDb , "UsersResidentsFormsBuildingsPositions" ) )
            {
                // Left outer join, so in case the UsersResidentsFormsBuildingsPositions doesn't exist, we will find NULL values
                var usersResidentsFormsJoin = myDb.execute( 'SELECT * FROM UsersResidentsForms LEFT OUTER JOIN UsersResidentsFormsBuildingsPositions ON UsersResidentsForms.ID=UsersResidentsFormsBuildingsPositions.FORM_ID;' ) ;
                while( usersResidentsFormsJoin.isValidRow() )
                {
                    data.push(
                    {
                        ID: usersResidentsFormsJoin.fieldByName( 'ID' ) ,
                        FORM_NO: usersResidentsFormsJoin.fieldByName( 'FORM_NO' ) ,
                        DATE: usersResidentsFormsJoin.fieldByName( 'DATE' ) ,
                        USER: usersResidentsFormsJoin.fieldByName( 'USER' ) ,
                        SYNCHRONIZED: usersResidentsFormsJoin.fieldByName( 'SYNCHRONIZED' ) ,
                        LATITUDE: usersResidentsFormsJoin.fieldByName( 'LATITUDE' ) ,
                        LONGITUDE: usersResidentsFormsJoin.fieldByName( 'LONGITUDE' ) ,
                        ALTITUDE: usersResidentsFormsJoin.fieldByName( 'ALTITUDE' ) ,
                        PROVINCE: usersResidentsFormsJoin.fieldByName( 'PROVINCE' ) ,
                        MUNICIPALITY: usersResidentsFormsJoin.fieldByName( 'MUNICIPALITY' ) ,
                        PLACE: usersResidentsFormsJoin.fieldByName( 'PLACE' ) ,
                        ADDRESS: usersResidentsFormsJoin.fieldByName( 'ADDRESS' ) ,
                        CIVIC_NO: usersResidentsFormsJoin.fieldByName( 'CIVIC_NO' ) ,
                        COMPILER_POS: usersResidentsFormsJoin.fieldByName( 'COMPILER_POS' )
                    } ) ;

                    usersResidentsFormsJoin.next() ;
                }

                // Drop and creation of the tables
                myDb.execute( 'DROP TABLE IF EXISTS UsersResidentsFormsBuildingsPositions;' ) ;
                myDb.execute( 'DROP TABLE IF EXISTS UsersResidentsForms;' ) ;
                myDb.execute( 'CREATE TABLE IF NOT EXISTS UsersResidentsForms( ID integer PRIMARY KEY AUTOINCREMENT , FORM_NO TEXT , DATE TEXT , USER TEXT , SYNCHRONIZED TEXT );' ) ;
                myDb.execute( 'CREATE TABLE IF NOT EXISTS UsersResidentsFormsBuildingsPositions( FORM_ID integer PRIMARY KEY , LATITUDE TEXT , LONGITUDE TEXT , ALTITUDE TEXT , PROVINCE TEXT , MUNICIPALITY TEXT , PLACE TEXT , ADDRESS TEXT , CIVIC_NO TEXT , COMPILER_POS TEXT );' ) ;

                for( var i = 0 ; i < data.length ; i++ )
                {
                    var currentData = data[i] ;
                    // Insert the UsersResidentsForms and UsersResidentsFormsBuildingsPositions if they exist, or if the UsersResidentsForms contains a COMPILER_POS value different from the default one
                    myDb.execute( 'INSERT INTO UsersResidentsForms( ID , FORM_NO , DATE , USER , SYNCHRONIZED ) VALUES (?, ?, ?, ?, ?);' , data[i].ID , data[i].FORM_NO , data[i].DATE , data[i].USER , data[i].SYNCHRONIZED ) ;
                    if( currentData.FORM_ID && currentData.FORM_ID != "NULL" && currentData.FORM_ID != "null" )
                    {
                        myDb.execute( 'INSERT INTO UsersResidentsFormsBuildingsPositions( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , COMPILER_POS ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);' , currentData.LATITUDE , currentData.LONGITUDE , currentData.ALTITUDE , currentData.PROVINCE , currentData.MUNICIPALITY , currentData.PLACE , currentData.ADDRESS , currentData.CIVIC_NO , currentData.COMPILER_POS ) ;
                    }
                    else if( currentData.COMPILER_POS == "1" )
                    {
                        myDb.execute( 'INSERT INTO UsersResidentsFormsBuildingsPositions( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , COMPILER_POS ) VALUES (\'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'0\');' ) ;
                    }
                }
            }
            else
            {
                var usersResidentsForms = myDb.execute( 'SELECT * FROM UsersResidentsForms;' ) ;
                while( usersResidentsForms.isValidRow() )
                {
                    data.push(
                    {
                        ID: usersResidentsForms.fieldByName( 'ID' ) ,
                        FORM_NO: usersResidentsForms.fieldByName( 'FORM_NO' ) ,
                        DATE: usersResidentsForms.fieldByName( 'DATE' ) ,
                        COMPILER_POS: usersResidentsForms.fieldByName( 'COMPILER_POS' ) ,
                        USER: usersResidentsForms.fieldByName( 'USER' ) ,
                        SYNCHRONIZED: usersResidentsForms.fieldByName( 'SYNCHRONIZED' )
                    } ) ;

                    usersResidentsForms.next() ;
                }

                // Drop and creation of the tables
                myDb.execute( 'DROP TABLE IF EXISTS UsersResidentsForms;' ) ;
                myDb.execute( 'CREATE TABLE IF NOT EXISTS UsersResidentsForms( ID integer PRIMARY KEY AUTOINCREMENT , FORM_NO TEXT , DATE TEXT , USER TEXT , SYNCHRONIZED TEXT );' ) ;
                
                for( var i = 0 ; i < data.length ; i++ )
                {
                    var currentData = data[i] ;
                    // Insert the UsersResidentsForms and UsersResidentsFormsBuildingsPositions if the UsersResidentsForms contains a COMPILER_POS value different from the default one
                    myDb.execute( 'INSERT INTO UsersResidentsForms( ID , FORM_NO , DATE , USER , SYNCHRONIZED ) VALUES (?, ?, ?, ?, ?);' , currentData.ID , currentData.FORM_NO , currentData.DATE , currentData.USER , currentData.SYNCHRONIZED ) ;
                    if( currentData.COMPILER_POS == "1" )
                    {
                        myDb.execute( 'INSERT INTO UsersResidentsFormsBuildingsPositions( FORM_ID , LATITUDE , LONGITUDE , ALTITUDE , PROVINCE , MUNICIPALITY , PLACE , ADDRESS , CIVIC_NO , COMPILER_POS ) VALUES (\'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'\', \'0\');' ) ;
                    }
                }
            }
        }

        myDb.execute( 'COMMIT' ) ;

        Ti.App.Properties.setString( "dbVersion" , dbVersion ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        myDb.close() ;
    }
}
