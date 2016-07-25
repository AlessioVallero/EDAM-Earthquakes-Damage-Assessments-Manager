var args = arguments[0] || {} ;
var current_form_id = args.form_id ;
var current_type = args.type ;
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

controls.push( $.tableViewBAEAModeFormsManageSection ) ;

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back() ;
}

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    // We can go back only if a saving is not in progress
    if( !bIsWorkInProgress )
    {
        Back() ;
    }
}

// Back function
function Back()
{
    try
    {
        controls = null ;

        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode_manage_section:record_new" , AddOnTopNewSectionTableViewRow ) ;
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode_manage_section:record_update" , UpdateSectionTableViewRow ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowBAEAModeFormsManageSectionView.close() ;
        }
        else
        {
            $.baeaModeFormsManageSectionViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView click event handler
function OnTableViewBAEAModeFormsManageSection_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            // If it's clicked the delete button
            if( e.source.clickName == 'deleteButton' )
            {
                if( view_enabled )
                {
                    if( e.row )
                    {
                        // AlertDialog to ask user if is sure to delete the media content, because this operation cannot be reverted in the future
                        var alertDialogDeleteMediaContent = Titanium.UI.createAlertDialog(
                        {
                            title: L( 'generic_delete_section_data_title' ) ,
                            message: L( 'delete_section_data_msg' ) ,             
                            buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                            cancel: 1
                        } ) ;
                        alertDialogDeleteMediaContent.addEventListener( 'click' , function( event )
                        {
                            if( event.index == 0 )
                            {
                                // Remove from RAM
                                var sectionData = GetSectionData() ;
                                if( sectionData.data.length > 0 )
                                {
                                    sectionData.data.splice( e.index , 1 ) ;
                                }

                                // Row in the DB
                                if( e.row.rowId && e.row.rowId != -1 )
                                {
                                    var section_table = sectionData.table ;

                                    // Delete section element from the DB
                                    var recoverMedia = Alloy.createCollection( section_table ) ;
                                    recoverMedia.fetch( { query: "SELECT * FROM " + section_table + " where ID = " + e.row.rowId } ) ;
                                    while( recoverMedia.length > 0 )
                                    {
                                        var model = recoverMedia.at( 0 ) ;
                                        recoverMedia.remove( model ) ;
                                        model.destroy() ;
                                    }
                                }

                                // Remove row from the table too
                                $.tableViewBAEAModeFormsManageSection.deleteRow( e.index ) ;

                                // Refresh of the TableView's height
                                $.tableViewBAEAModeFormsManageSection.setHeight( $.tableViewBAEAModeFormsManageSection.data[0].rows.length * 50 ) ;

                                if( $.tableViewBAEAModeFormsManageSection.data[0] && $.tableViewBAEAModeFormsManageSection.data[0].rows && $.tableViewBAEAModeFormsManageSection.data[0].rows.length > 0 )
                                {
                                    $.tableViewBAEAModeFormsManageSection.setVisible( true ) ;
                                }
                                else
                                {
                                    $.tableViewBAEAModeFormsManageSection.setVisible( false ) ;
                                }
                            }
                        } ) ;
                        // Show alert message
                        alertDialogDeleteMediaContent.show() ;
                    }
                }
            }
            else
            {
                // Get the data to open the correct view
                var sectionData = GetSectionData() ;
                if( sectionData.data.length > 0 && sectionData.view )
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_manage_section:record_new" , AddOnTopNewSectionTableViewRow ) ;
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_manage_section:record_update" , UpdateSectionTableViewRow ) ;

                    Alloy.Globals.createAndOpenControllerExt( sectionData.view , { form_id: current_form_id , global_ar_index: e.index , is_synchronized: current_is_synchronized } ) ;
                }
            }

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Add button click event handler
function OnBtnAdd_Click( e )
{
    try
    {
        // Get the data to open the correct view
        var sectionData = GetSectionData() ;
        if( sectionData.view )
        {
            Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_manage_section:record_new" , AddOnTopNewSectionTableViewRow ) ;
            Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_manage_section:record_update" , UpdateSectionTableViewRow ) ;

            Alloy.Globals.createAndOpenControllerExt( sectionData.view , { form_id: current_form_id , global_ar_index: -1 , is_synchronized: current_is_synchronized } ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Function to add a TableViewRow in the first row of the TableView based on the related array
function AddOnTopNewSectionTableViewRow()
{
    var sectionData = GetSectionData() ;
    if( $.tableViewBAEAModeFormsManageSection.data[0] && $.tableViewBAEAModeFormsManageSection.data[0].rows && $.tableViewBAEAModeFormsManageSection.data[0].rows.length > 0 )
    {
        $.tableViewBAEAModeFormsManageSection.insertRowBefore( 0 , CreateSectionTableViewRow( sectionData.data[0] ) ) ;
    }
    else
    {
        $.tableViewBAEAModeFormsManageSection.appendRow( CreateSectionTableViewRow( sectionData.data[0] ) ) ;
    }

    $.tableViewBAEAModeFormsManageSection.setVisible( true ) ;
    $.tableViewBAEAModeFormsManageSection.setHeight( $.tableViewBAEAModeFormsManageSection.data[0].rows.length * 50 ) ;
}

// Function to update a TableViewRow
function UpdateSectionTableViewRow( e )
{
    if( e.value )
    {
        $.tableViewBAEAModeFormsManageSection.data[0].rows[e.index].children[0].setText( e.value ) ;
    }
    else
    {
        $.tableViewBAEAModeFormsManageSection.data[0].rows[e.index].children[0].setText( L( "generic_empty_site_text_msg" ) ) ;
    }
}

// Function create section TableViewRow
function CreateSectionTableViewRow( section_data )
{
    var row = Ti.UI.createTableViewRow() ;
    // Set the ID if this section_data arrives from the DB
    if( "ID" in section_data )
    {
        row.rowId = section_data["ID"] ;
    }
    row.setHeight( 50 ) ;

    // Label with the SITE
    var labelMsg = null ;
    if( section_data["SITE"] )
    {
        labelMsg = section_data["SITE"] ;
    }
    else
    {
        labelMsg = L( "generic_empty_site_text_msg" ) ;
    }
    var label = Ti.UI.createLabel(
    {
        left: 5 ,
        width: 130 ,
        text: labelMsg
    } ) ;
    row.add( label ) ;

    // Delete button
    var deleteButton = Ti.UI.createButton(
    {
        color: 'black' ,
        backgroundColor: 'red' ,
        title: L( 'generic_delete_title' ) ,
        right: 8 ,
        width: 105 ,
        clickName: 'deleteButton' ,
        height: 34
    } ) ; 
    row.add( deleteButton ) ;

    // The style in the classic mode it's always the same, so we can set a className
    row.className = "SectionData" ; 

    return row ;
}

// Function to get the data of a section (depending on the type)
function GetSectionData()
{
    var arSectionData = { data: new Array() , table: "" , view: "" } ;

    switch( current_type )
    {
        // Fault Rupture
        case "FR":
        {
            arSectionData = { data: Alloy.Globals.BAEAModeFaultRupture , table: "BAEAFormsFaultRupture" , view: "BAEAModeFormsFaultRuptureView" , title: "baea_mode_section_fault_rupture_title" } ;
        }
        break ;

        // Liquefaction
        case "LQ":
        {
            arSectionData = { data: Alloy.Globals.BAEAModeLiquefaction , table: "BAEAFormsLiquefaction" , view: "BAEAModeFormsLiquefactionView" , title: "baea_mode_section_liquefaction_title" } ;
        }
        break ;

        // Landslide
        case "LA":
        {
            arSectionData = { data: Alloy.Globals.BAEAModeLandslide , table: "BAEAFormsLandslide" , view: "BAEAModeFormsLandslideView" , title: "baea_mode_section_landslide_title" } ;
        }
        break ;

        // Tsunami
        case "TS":
        {
            arSectionData = { data: Alloy.Globals.BAEAModeTsunami , table: "BAEAFormsTsunami" , view: "BAEAModeFormsTsunamiView" , title: "baea_mode_section_tsunami_title" } ;
        }
        break ;

        // Lifelines
        case "LI":
        {
            arSectionData = { data: Alloy.Globals.BAEAModeLifelines , table: "BAEAFormsLifelines" , view: "BAEAModeFormsLifelinesView" , title: "baea_mode_section_lifelines_title" } ;
        }
        break ;

        // Buildings
        case "BU":
        {
            arSectionData = { data: Alloy.Globals.BAEAModeBuildings , table: "BAEAFormsBuildings" , view: "BAEAModeFormsBuildingsView" , title: "baea_mode_section_buildings_title" } ;
        }
        break ;

        // General
        case "GE":
        {
            arSectionData = { data: Alloy.Globals.BAEAModeGeneral , table: "BAEAFormsGeneral" , view: "BAEAModeFormsGeneralView" , title: "baea_mode_section_general_title" } ;
        }
        break ;
    }

    return arSectionData ;
}

try
{
    var table_data = [] ;
    // Creating the item's array of the section (if there is any item)
    var sectionData = GetSectionData() ;
    for( var i = 0 ; i < sectionData.data.length ; i++ )
    {
        table_data.push( CreateSectionTableViewRow( sectionData.data[i] ) ) ;
    }
    $.tableViewBAEAModeFormsManageSection.setData( table_data ) ;

    // Completing the title of the Window
    $.baeaModeFormsManageSectionViewWindow.setTitle( $.baeaModeFormsManageSectionViewWindow.getTitle() + " " + L( sectionData.title ) ) ;

    // Init Add button
    $.widgetAppButtonAdd.init( '/images/add_form_normal.png' , '/images/add_form_pressed.png' , '/images/add_form_disabled.png' , L( 'generic_add_msg' ) , OnBtnAdd_Click ) ;     
    $.widgetAppButtonAdd.enabled( view_enabled ) ;

    // Init the TableView
    $.tableViewBAEAModeFormsManageSection.setHeight( table_data.length * 50 ) ;

    if( table_data.length > 0 )
    {
        $.tableViewBAEAModeFormsManageSection.setVisible( true ) ;
    }
    else
    {
        $.tableViewBAEAModeFormsManageSection.setVisible( false ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowBAEAModeFormsManageSectionView.open() ;
    }
    else
    {
        $.baeaModeFormsManageSectionViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
