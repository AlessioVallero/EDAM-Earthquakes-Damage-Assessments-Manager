function ContentsUploader()
{   
    /**
    * Given an array of URLs make several http calls to upload them.
    *
    * Parameters:
    * uploadQueue - [{'content' : "", 'url': ""}]
    * content - The content to upload
    * url - url of the http call for the upload.
    * callBack_UploadOneContentFinished - The function that is called once each upload has finished
    * Callback return object:
    * { status, path}
    * status: integer - HTTP status for the call. 200 means successful.
    * callBack_UploadMultipleContentsFinished - The function that is called once all the contents are uploaded. This function does not accept any parameters
    *
    */
    this.uploadMultiContents = function( uploadQueue , progressTitle , currentWindow , callBack_UploadOneContentFinished , callBack_UploadMultipleContentsFinished , controlsToDisable , endAsyncBusyAction_Callback )
    {
        var queueIndex = 0 ;

        var SliderProgressBar = require( '/SliderProgressBar' ) ;
        var sliderProgressBar = new SliderProgressBar( progressTitle ) ;
        currentWindow.add( sliderProgressBar ) ;

        // The portion depends on how many things we are sending
        var singleProgressValue = 100 / uploadQueue.length ;

        // Disable controls
        if( controlsToDisable )
        {
            for( var i = 0 ; i < controlsToDisable.length ; i++ )
            {
                controlsToDisable[i].enabled = false ;
            }
        }

        var processQueue = function( upload_result )
        {
            try
            {
                // Once one of the upload is finished the we will call again the processQueue which will move the index forward and upload another thing
                if( upload_result )
                {
                    if( callBack_UploadOneContentFinished )
                    {
                        callBack_UploadOneContentFinished( upload_result ) ;
                    }
                }
        
                if( queueIndex < uploadQueue.length )
                {
                    var loader = Titanium.Network.createHTTPClient() ;
                    loader.validatesSecureCertificate = false ;

                    var currentQueueElem = uploadQueue[queueIndex] ;
                    var currentQueueIndex = queueIndex ;
                    loader.onerror = function( e )
                    {
                        processQueue(
                        {
                            status: e.error ,
                            response_text: JSON.stringify(
                            {
                                OK: false ,
                                ErrorType: "UnexpectedError" ,
                                FailedFormId: currentQueueElem.content_id
                            } ) ,
                            content_id: currentQueueElem.content.ID
                        } ) ;
                    } ;
                    loader.onload = function( e )
                    {
                        processQueue(
                        {
                            status: loader.status ,
                            response_text: this.responseText ,
                            content_id: currentQueueElem.content.ID
                        } ) ;
                    } ;
                    loader.onsendstream = function( e )
                    {
                        // Update of the ProgressBar:
                        // The portion for this file multiplied for the progress (taking in account the current index)
                        var currentValue = sliderProgressBar.getValue() ;
                        if( currentValue < 100 )
                        {
                            var newValue = singleProgressValue * ( currentQueueIndex + e.progress ) ;
                            // Only a value greater than the current one make sense
                            if( newValue >= currentValue )
                            {
                                sliderProgressBar.setValue( singleProgressValue * ( currentQueueIndex + e.progress ) ) ;
                            }
                        }
                    };
                    loader.timeout = Alloy.Globals.ServerSynchTimeoutMillisecs ;
                
                    loader.open( 'POST' , currentQueueElem.url ) ;
                    loader.send( currentQueueElem.content ) ;

                    queueIndex++ ;
                }
                else
                {
                    // If we have finished to send the contents, in any case we set the ProgressBar to 100% and then we remove it
                    if( sliderProgressBar.getValue() < 100 )
                    {
                        sliderProgressBar.setValue( 100 ) ;
                    }
                    currentWindow.remove( sliderProgressBar ) ;
                    sliderProgressBar = null ;
                    // Enable controls
                    if( controlsToDisable )
                    {
                        for( var i = 0 ; i < controlsToDisable.length ; i++ )
                        {
                            controlsToDisable[i].enabled = true ;
                        }
                    }
                    if( endAsyncBusyAction_Callback )
                    {
                        endAsyncBusyAction_Callback() ;
                    }

                    // All contents sent callback
                    if( callBack_UploadMultipleContentsFinished )
                    {
                        callBack_UploadMultipleContentsFinished() ;
                    }
                }
            }
            catch( exception )
            {
                // In case of exception we'll remove the ProgressBar and enable all the controls
                currentWindow.remove( sliderProgressBar ) ;
                // Enable controls
                if( controlsToDisable )
                {
                    for( var i = 0 ; i < controlsToDisable.length ; i++ )
                    {
                        controlsToDisable[i].enabled = true ;
                    }
                }
                if( endAsyncBusyAction_Callback )
                {
                    endAsyncBusyAction_Callback() ;
                }

                Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
            }
        } ;
        processQueue() ;
    } ;
}

module.exports = ContentsUploader ;
