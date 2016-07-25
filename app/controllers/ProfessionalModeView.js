var args = arguments[0] || {} ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.tableViewProfessionalModeForms ) ;

var bCanClickOnTableView = true ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        controls = null ;
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowProfessionalModeForms.close() ;
        }
        else
        {
            $.professionalModeFormsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView click event handler
function OnTableViewProfessionalModeForms_Click( e )
{
    try
    {
        if( bCanClickOnTableView )
        {
            BusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                switch( e.index )
                {
                    case 0:
                    {
                        // OptionDialog to ask user about the type of U.S.A. form desired
                        var optionDialog = Ti.UI.createOptionDialog(
                        {
                            title: L( 'usa_selection_title' ) ,
                            cancel: 2 ,
                            options: [ L( 'usa_baea_msg' ) , L( 'usa_atc20_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
                            selectedIndex: 0
                        } ) ;
                        optionDialog.addEventListener( 'click' , function( e )
                        {
                            switch( e.index )
                            {
                                case 0:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( "BAEAModeForms" ) ;
                                }
                                break ;

                                case 1:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( "ATC20ModeForms" , { mode: "CA" } ) ;
                                }
                                break ;
                            }
                        } ) ;
                        // Show OptionDialog about the type of U.S.A. form
                        optionDialog.show() ;
                    }
                    break ;

                    case 1:
                    {
                        // OptionDialog to ask user about the type of Nepal form desired
                        var optionDialog = Ti.UI.createOptionDialog(
                        {
                            title: L( 'nepal_selection_title' ) ,
                            cancel: 1 ,
                            options: [ L( 'nepal_atc20_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
                            selectedIndex: 0
                        } ) ;
                        optionDialog.addEventListener( 'click' , function( e )
                        {
                            switch( e.index )
                            {
                                case 0:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( "ATC20ModeForms" , { mode: "NEPAL" } ) ;
                                }
                                break ;
                            }
                        } ) ;
                        // Show OptionDialog about the type of Nepal form
                        optionDialog.show() ;
                    }
                    break ;

                    case 2:
                    {
                        // OptionDialog to ask user about the type of New Zealand form desired
                        var optionDialog = Ti.UI.createOptionDialog(
                        {
                            title: L( 'nz_selection_title' ) ,
                            cancel: 1 ,
                            options: [ L( 'nz_rapid_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
                            selectedIndex: 0
                        } ) ;
                        optionDialog.addEventListener( 'click' , function( e )
                        {
                            switch( e.index )
                            {
                                case 0:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( "ATC20ModeForms" , { mode: "NZ" } ) ;
                                }
                                break ;
                            }
                        } ) ;
                        // Show OptionDialog about the type of New Zealand form
                        optionDialog.show() ;
                    }
                    break ;

                    case 3:
                    {
                        // OptionDialog to ask user about the type of italian form desired
                        var optionDialog = Ti.UI.createOptionDialog(
                        {
                            title: L( 'italy_selection_title' ) ,
                            cancel: 4 ,
                            options: [ L( 'italy_aedes_msg' ) , L( 'italy_shed_msg' ) , L( 'italy_churches_msg' ) , L( 'italy_palaces_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
                            selectedIndex: 0
                        } ) ;
                        optionDialog.addEventListener( 'click' , function( e )
                        {
                            switch( e.index )
                            {
                                case 0:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( "AeDESModeForms" ) ;
                                }
                                break ;

                                case 1:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( "ShedModeForms" ) ;
                                }
                                break ;

                                case 2:
                                case 3:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( "ComingSoonView" ) ;
                                }
                                break ;
                            }
                        } ) ;
                        // Show OptionDialog about the type of italian form
                        optionDialog.show() ;
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

try
{
    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowProfessionalModeForms.open() ;
    }
    else
    {
        $.professionalModeFormsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
