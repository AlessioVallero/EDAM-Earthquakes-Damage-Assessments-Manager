function ContentsUploader() {
    this.uploadMultiContents = function(uploadQueue, progressTitle, currentWindow, callBack_UploadOneContentFinished, callBack_UploadMultipleContentsFinished, controlsToDisable, endAsyncBusyAction_Callback) {
        var queueIndex = 0;
        var SliderProgressBar = require("/SliderProgressBar");
        var sliderProgressBar = new SliderProgressBar(progressTitle);
        currentWindow.add(sliderProgressBar);
        var singleProgressValue = 100 / uploadQueue.length;
        if (controlsToDisable) for (var i = 0; i < controlsToDisable.length; i++) controlsToDisable[i].enabled = false;
        var processQueue = function(upload_result) {
            try {
                upload_result && callBack_UploadOneContentFinished && callBack_UploadOneContentFinished(upload_result);
                if (queueIndex < uploadQueue.length) {
                    var loader = Titanium.Network.createHTTPClient();
                    loader.validatesSecureCertificate = false;
                    var currentQueueElem = uploadQueue[queueIndex];
                    var currentQueueIndex = queueIndex;
                    loader.onerror = function(e) {
                        processQueue({
                            status: e.error,
                            response_text: JSON.stringify({
                                OK: false,
                                ErrorType: "UnexpectedError",
                                FailedFormId: currentQueueElem.content_id
                            }),
                            content_id: currentQueueElem.content.ID
                        });
                    };
                    loader.onload = function() {
                        processQueue({
                            status: loader.status,
                            response_text: this.responseText,
                            content_id: currentQueueElem.content.ID
                        });
                    };
                    loader.onsendstream = function(e) {
                        var currentValue = sliderProgressBar.getValue();
                        if (100 > currentValue) {
                            var newValue = singleProgressValue * (currentQueueIndex + e.progress);
                            newValue >= currentValue && sliderProgressBar.setValue(singleProgressValue * (currentQueueIndex + e.progress));
                        }
                    };
                    loader.timeout = Alloy.Globals.ServerSynchTimeoutMillisecs;
                    loader.open("POST", currentQueueElem.url);
                    loader.send(currentQueueElem.content);
                    queueIndex++;
                } else {
                    sliderProgressBar.getValue() < 100 && sliderProgressBar.setValue(100);
                    currentWindow.remove(sliderProgressBar);
                    sliderProgressBar = null;
                    if (controlsToDisable) for (var i = 0; i < controlsToDisable.length; i++) controlsToDisable[i].enabled = true;
                    endAsyncBusyAction_Callback && endAsyncBusyAction_Callback();
                    callBack_UploadMultipleContentsFinished && callBack_UploadMultipleContentsFinished();
                }
            } catch (exception) {
                currentWindow.remove(sliderProgressBar);
                if (controlsToDisable) for (var i = 0; i < controlsToDisable.length; i++) controlsToDisable[i].enabled = true;
                endAsyncBusyAction_Callback && endAsyncBusyAction_Callback();
                Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
            }
        };
        processQueue();
    };
}

module.exports = ContentsUploader;