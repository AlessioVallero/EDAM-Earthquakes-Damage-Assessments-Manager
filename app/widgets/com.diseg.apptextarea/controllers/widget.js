$.init = function( text_msg , on_textarea_change , keyboardType , voice_recognition_disabled )
{
    try
    {
        // Set the text of the label (with a white space at the end to increase the offset
        // between the label and the TextField)
        $.lblAppTextArea.setText( text_msg + ' ' ) ;
        // Set the hintText of the TextField
        $.txtAppTextArea.setHintText( text_msg ) ;

        // Set the TextArea change event handler
        if( on_textarea_change )
        {
            $.txtAppTextArea.addEventListener( 'change' , on_textarea_change ) ;
        }

        // Set the keyboardType
        if( keyboardType )
        {
            $.txtAppTextArea.setKeyboardType( keyboardType ) ;
            switch( keyboardType )
            {
                case Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD:
                {
                    // For the number keyboard, we also check that only numbers are inserted
                    $.txtAppTextArea.addEventListener( 'change' , function( e )
                    {
                        var val = e.source.value ;
                        !!( /[^0-9]/.test(val) ) ? e.source.value = val.replace( /[^0-9]/gi , '' ) : false ;
                        //e.source.value = e.source.value.slice( 0 , customer_phone_limit ) ;
                    } ) ;
                }
                break ;

                case Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION:
                {
                    // For the number keyboard, we also check that only numbers and punctuation are inserted
                    $.txtAppTextArea.addEventListener( 'change' , function( e )
                    {
                        var val = e.source.value ;
                        !!( /[^0-9.-]/.test(val) ) ? e.source.value = val.replace( /[^0-9.-]/gi , '' ) : false ;
                        //e.source.value = e.source.value.slice( 0 , customer_phone_limit ) ;
                    } ) ;
                }
                break ;
            }
        }

        if( voice_recognition_disabled )
        {
            // Hide the voice recognition button and move the textarea to the left position of the button, to recover space
            $.btnAppTextAreaSpeechRecognition.visible = false ;
            $.txtAppTextArea.setLeft( $.btnAppTextAreaSpeechRecognition.getLeft() ) ;
        }
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.get_text_area = function()
{
    var text_area_ret = null ;

    try
    {
        // Get the TextArea
        text_area_ret = $.txtAppTextArea ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }

    return text_area_ret ;
} ;

$.get_text_value = function()
{
    var text_value_ret = "" ;

    try
    {
        // Get the value of the TextArea
        text_value_ret = $.txtAppTextArea.getValue() ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }

    return text_value_ret ;
} ;

$.set_text_value = function( text_msg )
{
    try
    {
        // Set the value of the TextArea
        $.txtAppTextArea.setValue( text_msg ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.set_label_height = function( new_height )
{
    try
    {
        // Set the height of the label
        $.lblAppTextArea.setHeight( new_height ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

function OnBtnSpeechRecognition_Click( e )
{
    // Voice recognition proxy module test
    if( OS_ANDROID )
    {
        var speechModule = require( 'org.mumumu.ti.android.speech' ) ;
        var voiceRecognitionProxy = speechModule.createVoiceRecognition() ;
        voiceRecognitionProxy.voiceRecognition(
        {
            "android.speech.extra.PROMPT": L( 'generic_voice_recognition_textfield_msg' ) ,
            "android.speech.extra.LANGUAGE_MODEL": "free_form" ,
            "android.speech.extra.LANGUAGE": Ti.Locale.currentLanguage ,
            "callback": function( event_args )
            {
                var voice_recognition_enabled = event_args.voice_enabled ;
                var voice_results = event_args.voice_results ;
                if( event_args.voice_canceled )
                {
                    alert( L( 'generic_voice_recognition_canceled_msg' ) ) ;
                }
                else
                {
                    if( voice_recognition_enabled )
                    {
                        $.set_text_value( voice_results[0] ) ;
                    }
                    else
                    {
                        alert( L( 'generic_voice_recognition_disabled_msg' ) ) ;
                    }
                }
            }
        } ) ;
    }
    else // iSpeech for iOS devices
    {
        var ispeech = require( 'ti.ispeech' ) ;
        ispeech.setAPIKey( "d5a9d3cda1b1b8c6e4fe90bd8e897db1" ) ;

        var dictate = ispeech.createDictation() ;

        if( ispeech.requestPermission() )
        {
            if( ispeech.isAvailable() )
            {
                if( dictate.isRecording() )
                {
                    alert( L( 'generic_voice_recognition_already_recording_msg' ) ) ;
                }
                else
                {
                    dictate.start(
                    {
                        locale: Ti.Locale.currentLocale ,
                        onComplete: function( event_args )
                        {
                            if( event_args.success )
                            {
                                // Set the value of the TextArea
                                $.set_text_value( event_args.text ) ;
                            }
                        }
                    } ) ;
                }
            }
            else
            {
                alert( L( 'generic_voice_recognition_disabled_msg' ) ) ;
            }
        }
        else
        {
            alert( L( 'generic_voice_recognition_no_microphone_permission_msg' ) ) ;
        }
    }
} ;

$.enabled = function( enabled )
{
    try
    {
        // Set the enabled value of the TextArea
        $.txtAppTextArea.setEditable( enabled ) ;

        // Set the enabled value of the voice recognition Button
        $.btnAppTextAreaSpeechRecognition.enabled = enabled ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;
