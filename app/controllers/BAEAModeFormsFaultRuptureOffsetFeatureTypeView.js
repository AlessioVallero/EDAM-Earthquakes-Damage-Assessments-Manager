var args = arguments[0] || {};
var current_offset_feature_type = args.offset_feature_type ;
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowFaultRuptureOffsetFeatureType.close() ;
        }
        else
        {
            $.baeaModeFaultRuptureOffsetFeatureTypeWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Soil checkbox event handler
function OnSoil_Change( e )
{
    try
    {
        current_offset_feature_type = Alloy.Globals.replaceCharAt( 0 , current_offset_feature_type , $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_fault_rupture:offset_feature_type_changed' , { value: current_offset_feature_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Bedrock checkbox event handler
function OnBedrock_Change( e )
{
    try
    {
        current_offset_feature_type = Alloy.Globals.replaceCharAt( 1 , current_offset_feature_type , $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_fault_rupture:offset_feature_type_changed' , { value: current_offset_feature_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// RoadOrSidewalk checkbox event handler
function OnRoadOrSidewalk_Change( e )
{
    try
    {
        current_offset_feature_type = Alloy.Globals.replaceCharAt( 2 , current_offset_feature_type , $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_fault_rupture:offset_feature_type_changed' , { value: current_offset_feature_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConcreteFoundation checkbox event handler
function OnConcreteFoundation_Change( e )
{
    try
    {
        current_offset_feature_type = Alloy.Globals.replaceCharAt( 3 , current_offset_feature_type , $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_fault_rupture:offset_feature_type_changed' , { value: current_offset_feature_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Pipeline checkbox event handler
function OnPipeline_Change( e )
{
    try
    {
        current_offset_feature_type = Alloy.Globals.replaceCharAt( 4 , current_offset_feature_type , $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_fault_rupture:offset_feature_type_changed' , { value: current_offset_feature_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Other checkbox event handler
function OnOther_Change( e )
{
    try
    {
        current_offset_feature_type = Alloy.Globals.replaceCharAt( 5 , current_offset_feature_type , $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_fault_rupture:offset_feature_type_changed' , { value: current_offset_feature_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil.init( L( 'generic_soil_text_msg' ) , current_offset_feature_type.charAt( 0 ) , OnSoil_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeSoil.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock.init( L( 'generic_bedrock_text_msg' ) , current_offset_feature_type.charAt( 1 ) , OnBedrock_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeBedrock.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk.init( L( 'generic_road_or_sidewalk_text_msg' ) , current_offset_feature_type.charAt( 2 ) , OnRoadOrSidewalk_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeRoadOrSidewalk.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation.init( L( 'generic_concrete_foundation_text_msg' ) , current_offset_feature_type.charAt( 3 ) , OnConcreteFoundation_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeConcreteFoundation.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline.init( L( 'generic_pipeline_text_msg' ) , current_offset_feature_type.charAt( 4 ) , OnPipeline_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypePipeline.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther.init( L( 'generic_other_text_msg' ) , current_offset_feature_type.charAt( 5 ) , OnOther_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsFaultRuptureOffsetFeatureTypeOther.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowFaultRuptureOffsetFeatureType.open() ;
    }
    else
    {
        $.baeaModeFaultRuptureOffsetFeatureTypeWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
