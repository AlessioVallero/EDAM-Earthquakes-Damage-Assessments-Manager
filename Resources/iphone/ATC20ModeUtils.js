function ATC20ModeUtils() {}

ATC20ModeUtils.LoadInspectionQuery = function(form_id, mode) {
    var recoverInspection = Alloy.createCollection("ATC20Forms");
    recoverInspection.fetch(form_id ? {
        query: "SELECT * FROM ATC20Forms where ID=" + form_id + " and MODE='" + mode + "'"
    } : {
        query: "SELECT * FROM ATC20Forms where USER is null or USER = '' or USER=\"" + Alloy.Globals.SessionUsername + '" and SYNCHRONIZED="0" and MODE=\'' + mode + "'"
    });
    return recoverInspection;
};

ATC20ModeUtils.LoadBuildingDescriptionQuery = function(form_id) {
    var recoverBuildingDescription = Alloy.createCollection("ATC20FormsBuildingDescription");
    recoverBuildingDescription.fetch({
        query: "SELECT * FROM ATC20FormsBuildingDescription where FORM_ID=" + form_id
    });
    return recoverBuildingDescription;
};

ATC20ModeUtils.LoadDetailedEvaluationQuery = function(form_id) {
    var recoverDetailedEvaluation = Alloy.createCollection("ATC20FormsDetailedEvaluation");
    recoverDetailedEvaluation.fetch({
        query: "SELECT * FROM ATC20FormsDetailedEvaluation where FORM_ID=" + form_id
    });
    return recoverDetailedEvaluation;
};

ATC20ModeUtils.LoadDetailedPostingQuery = function(form_id) {
    var recoverDetailedPosting = Alloy.createCollection("ATC20FormsDetailedPosting");
    recoverDetailedPosting.fetch({
        query: "SELECT * FROM ATC20FormsDetailedPosting where FORM_ID=" + form_id
    });
    return recoverDetailedPosting;
};

ATC20ModeUtils.LoadRapidEvaluationQuery = function(form_id) {
    var recoverRapidEvaluation = Alloy.createCollection("ATC20FormsRapidEvaluation");
    recoverRapidEvaluation.fetch({
        query: "SELECT * FROM ATC20FormsRapidEvaluation where FORM_ID=" + form_id
    });
    return recoverRapidEvaluation;
};

ATC20ModeUtils.LoadRapidPostingQuery = function(form_id) {
    var recoverRapidPosting = Alloy.createCollection("ATC20FormsRapidPosting");
    recoverRapidPosting.fetch({
        query: "SELECT * FROM ATC20FormsRapidPosting where FORM_ID=" + form_id
    });
    return recoverRapidPosting;
};

ATC20ModeUtils.LoadFurtherActionsQuery = function(form_id) {
    var recoverFurtherActions = Alloy.createCollection("ATC20FormsFurtherActions");
    recoverFurtherActions.fetch({
        query: "SELECT * FROM ATC20FormsFurtherActions where FORM_ID=" + form_id
    });
    return recoverFurtherActions;
};

ATC20ModeUtils.LoadInspectorPersonalData = function(mode) {
    Alloy.Collections.ATC20ModePD && _.size(Alloy.Collections.ATC20ModePD) > 0 || Alloy.Collections.ATC20ModePD.fetch({
        query: "SELECT * FROM ATC20PD where MODE='" + mode + "'"
    });
};

ATC20ModeUtils.LoadImagesQuery = function(form_id) {
    var recoverPictureGallery = Alloy.createCollection("ATC20FormsImages");
    recoverPictureGallery.fetch({
        query: "SELECT ID, IMAGE_PATH, LATITUDE, LONGITUDE, ADDRESS, HEADING, DAMAGES_LEVEL, DAMAGES_AREA, COMMENT FROM ATC20FormsImages where FORM_ID=" + form_id
    });
    return recoverPictureGallery;
};

ATC20ModeUtils.LoadVideosQuery = function(form_id) {
    var recoverVideoGallery = Alloy.createCollection("ATC20FormsVideos");
    recoverVideoGallery.fetch({
        query: "SELECT ID, VIDEO_PATH, LATITUDE, LONGITUDE, ADDRESS, HEADING, DAMAGES_LEVEL, DAMAGES_AREA, COMMENT FROM ATC20FormsVideos where FORM_ID=" + form_id
    });
    return recoverVideoGallery;
};

ATC20ModeUtils.GetImagesCount = function(form_id) {
    var count = "0";
    if (-1 != form_id) {
        var recoverImagesCount = Alloy.createCollection("ATC20FormsImages");
        recoverImagesCount.fetch({
            query: "SELECT COUNT(*) as ImagesCount FROM ATC20FormsImages where FORM_ID=" + form_id
        });
        count = recoverImagesCount.at(0).get("ImagesCount");
    }
    return count;
};

ATC20ModeUtils.CreateMediaArray = function(form_id, not_saved_needed, only_pictures) {
    var media_array = new Array();
    if (-1 != form_id) {
        var recoverPictureGallery = ATC20ModeUtils.LoadImagesQuery(form_id);
        if (recoverPictureGallery.length > 0) for (var i = 0; i < recoverPictureGallery.length; i++) {
            var image = recoverPictureGallery.at(i);
            var id = image.get("ID");
            var image_path = image.get("IMAGE_PATH");
            var latitude = image.get("LATITUDE");
            var longitude = image.get("LONGITUDE");
            var address = image.get("ADDRESS");
            var heading = image.get("HEADING");
            var damages_level = image.get("DAMAGES_LEVEL");
            var damages_area = image.get("DAMAGES_AREA");
            var comment = image.get("COMMENT");
            var media_found = false;
            var file = Alloy.Globals.getFileForRead(image_path);
            if (file) {
                filename = file.getNativePath();
                media_found = true;
            }
            media_array.push({
                media: filename,
                id: id,
                type: "PIC",
                latitude: latitude,
                longitude: longitude,
                address: address,
                heading: heading,
                damages_level: damages_level,
                damages_area: damages_area,
                comment: comment,
                path: image_path,
                media_found: media_found
            });
        }
        if (only_pictures) ; else {
            var recoverVideoGallery = ATC20ModeUtils.LoadVideosQuery(form_id);
            if (recoverVideoGallery.length > 0) for (var i = 0; i < recoverVideoGallery.length; i++) {
                var video = recoverVideoGallery.at(i);
                var id = video.get("ID");
                var video_path = video.get("VIDEO_PATH");
                var latitude = video.get("LATITUDE");
                var longitude = video.get("LONGITUDE");
                var address = video.get("ADDRESS");
                var heading = video.get("HEADING");
                var damages_level = video.get("DAMAGES_LEVEL");
                var damages_area = video.get("DAMAGES_AREA");
                var comment = video.get("COMMENT");
                var media_found = false;
                var file = Alloy.Globals.getFileForRead(video_path);
                var filename = null;
                if (file) {
                    filename = file.getNativePath();
                    media_found = true;
                }
                media_array.push({
                    media: filename,
                    id: id,
                    type: "VID",
                    latitude: latitude,
                    longitude: longitude,
                    address: address,
                    heading: heading,
                    damages_level: damages_level,
                    damages_area: damages_area,
                    comment: comment,
                    path: video_path,
                    media_found: media_found
                });
            }
        }
    }
    if (not_saved_needed) {
        if (Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0) for (var i = 0; i < Alloy.Globals.CurrentPicsPath.length; i++) {
            if (Alloy.Globals.CurrentPicsPath[i].media) ; else for (var j = 0; j < media_array.length; j++) if (media_array[j].id && media_array[j].id == Alloy.Globals.CurrentPicsPath[i].id) {
                media_array[j].latitude = Alloy.Globals.CurrentPicsPath[i].latitude;
                media_array[j].longitude = Alloy.Globals.CurrentPicsPath[i].longitude;
                media_array[j].address = Alloy.Globals.CurrentPicsPath[i].address;
                media_array[j].heading = Alloy.Globals.CurrentPicsPath[i].heading;
                media_array[j].damages_level = Alloy.Globals.CurrentPicsPath[i].damages_level;
                media_array[j].damages_area = Alloy.Globals.CurrentPicsPath[i].damages_area;
                media_array[j].comment = Alloy.Globals.CurrentPicsPath[i].comment;
                break;
            }
            media_array.push({
                index: i,
                media: Alloy.Globals.CurrentPicsPath[i].media,
                type: "PIC",
                latitude: Alloy.Globals.CurrentPicsPath[i].latitude,
                longitude: Alloy.Globals.CurrentPicsPath[i].longitude,
                address: Alloy.Globals.CurrentPicsPath[i].address,
                heading: Alloy.Globals.CurrentPicsPath[i].heading,
                damages_level: Alloy.Globals.CurrentPicsPath[i].damages_level,
                damages_area: Alloy.Globals.CurrentPicsPath[i].damages_area,
                comment: Alloy.Globals.CurrentPicsPath[i].comment,
                media_found: true
            });
        }
        if (only_pictures) ; else if (Alloy.Globals.CurrentVideosPath && Alloy.Globals.CurrentVideosPath.length > 0) for (var i = 0; i < Alloy.Globals.CurrentVideosPath.length; i++) {
            if (Alloy.Globals.CurrentVideosPath[i].media) ; else for (var j = 0; j < media_array.length; j++) if (media_array[j].id && media_array[j].id == Alloy.Globals.CurrentVideosPath[i].id) {
                media_array[j].latitude = Alloy.Globals.CurrentVideosPath[i].latitude;
                media_array[j].longitude = Alloy.Globals.CurrentVideosPath[i].longitude;
                media_array[j].address = Alloy.Globals.CurrentVideosPath[i].address;
                media_array[j].heading = Alloy.Globals.CurrentVideosPath[i].heading;
                media_array[j].damages_level = Alloy.Globals.CurrentVideosPath[i].damages_level;
                media_array[j].damages_area = Alloy.Globals.CurrentVideosPath[i].damages_area;
                media_array[j].comment = Alloy.Globals.CurrentVideosPath[i].comment;
                break;
            }
            media_array.push({
                index: i,
                media: Alloy.Globals.CurrentVideosPath[i].media,
                type: "VID",
                latitude: Alloy.Globals.CurrentVideosPath[i].latitude,
                longitude: Alloy.Globals.CurrentVideosPath[i].longitude,
                address: Alloy.Globals.CurrentVideosPath[i].address,
                heading: Alloy.Globals.CurrentVideosPath[i].heading,
                damages_level: Alloy.Globals.CurrentVideosPath[i].damages_level,
                damages_area: Alloy.Globals.CurrentVideosPath[i].damages_area,
                comment: Alloy.Globals.CurrentVideosPath[i].comment,
                media_found: true
            });
        }
    }
    return media_array;
};

module.exports = ATC20ModeUtils;