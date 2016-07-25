function AeDESModeUtils()
{
}

// Query to retrieve the AeDESForm, given the form_id
AeDESModeUtils.LoadDetailsQuery = function( form_id )
{
    var recoverDetails = Alloy.createCollection( 'AeDESForms' ) ;

    if( form_id )
    {
        recoverDetails.fetch(
        {
            query: "SELECT * FROM AeDESForms where ID=" + form_id
        } ) ;
    }
    else
    {
        recoverDetails.fetch(
        {
            query: "SELECT * FROM AeDESForms where USER is null or USER = '' or USER=\"" + Alloy.Globals.SessionUsername + "\" and SYNCHRONIZED=\"0\""
        } ) ;
    }

    return recoverDetails ;
} ;

// Query to retrieve the SectionOne, given the form_id
AeDESModeUtils.LoadSectionOneQuery = function( form_id )
{
    var recoverSectionOne = Alloy.createCollection( 'AeDESFormsSectionOne' ) ;
    recoverSectionOne.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionOne where FORM_ID=" + form_id
    } ) ;

    return recoverSectionOne ;
} ;

// Query to retrieve the SectionTwo, given the form_id
AeDESModeUtils.LoadSectionTwoQuery = function( form_id )
{
    var recoverSectionTwo = Alloy.createCollection( 'AeDESFormsSectionTwo' ) ;
    recoverSectionTwo.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionTwo where FORM_ID=" + form_id
    } ) ;

    return recoverSectionTwo ;
} ;

// Query to retrieve the SectionThree, given the form_id
AeDESModeUtils.LoadSectionThreeQuery = function( form_id )
{
    var recoverSectionThree = Alloy.createCollection( 'AeDESFormsSectionThree' ) ;
    recoverSectionThree.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionThree where FORM_ID=" + form_id
    } ) ;

    return recoverSectionThree ;
} ;

// Query to retrieve the SectionFour, given the form_id
AeDESModeUtils.LoadSectionFourQuery = function( form_id )
{
    var recoverSectionFour = Alloy.createCollection( 'AeDESFormsSectionFour' ) ;
    recoverSectionFour.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionFour where FORM_ID=" + form_id
    } ) ;

    return recoverSectionFour ;
} ;

// Query to retrieve the SectionFive, given the form_id
AeDESModeUtils.LoadSectionFiveQuery = function( form_id )
{
    var recoverSectionFive = Alloy.createCollection( 'AeDESFormsSectionFive' ) ;
    recoverSectionFive.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionFive where FORM_ID=" + form_id
    } ) ;

    return recoverSectionFive ;
} ;

// Query to retrieve the SectionSix, given the form_id
AeDESModeUtils.LoadSectionSixQuery = function( form_id )
{
    var recoverSectionSix = Alloy.createCollection( 'AeDESFormsSectionSix' ) ;
    recoverSectionSix.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionSix where FORM_ID=" + form_id
    } ) ;

    return recoverSectionSix ;
} ;

// Query to retrieve the SectionSeven, given the form_id
AeDESModeUtils.LoadSectionSevenQuery = function( form_id )
{
    var recoverSectionSeven = Alloy.createCollection( 'AeDESFormsSectionSeven' ) ;
    recoverSectionSeven.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionSeven where FORM_ID=" + form_id
    } ) ;

    return recoverSectionSeven ;
} ;

// Query to retrieve the SectionEight, given the form_id
AeDESModeUtils.LoadSectionEightQuery = function( form_id )
{
    var recoverSectionEight = Alloy.createCollection( 'AeDESFormsSectionEight' ) ;
    recoverSectionEight.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionEight where FORM_ID=" + form_id
    } ) ;

    return recoverSectionEight ;
} ;

// Query to retrieve the SectionNine, given the form_id
AeDESModeUtils.LoadSectionNineQuery = function( form_id )
{
    var recoverSectionNine = Alloy.createCollection( 'AeDESFormsSectionNine' ) ;
    recoverSectionNine.fetch(
    {
        query: "SELECT * FROM AeDESFormsSectionNine where FORM_ID=" + form_id
    } ) ;

    return recoverSectionNine ;
} ;

// Query to retrieve the TeamPersonalData, given the form_id
AeDESModeUtils.LoadTeamPersonalData = function()
{
    if( Alloy.Collections.AeDESModePD && _.size( Alloy.Collections.AeDESModePD ) > 0 )
    {
        // If the array isn't null or empty, we use the array as is (a previous setting was done)
    }
    else
    {
        // Extraction of the AeDES data (three rows are expected)
        Alloy.Collections.AeDESModePD.fetch( { query: "SELECT * FROM TeamPD" } ) ;
    }
} ;

// Query to retrieve the Images, given the form_id
AeDESModeUtils.LoadImagesQuery = function( form_id )
{
    var recoverPictureGallery = Alloy.createCollection( 'AeDESFormsImages' ) ;
    recoverPictureGallery.fetch(
    {
        query: "SELECT ID, IMAGE_PATH, LATITUDE, LONGITUDE, ADDRESS, HEADING, DAMAGES_LEVEL, DAMAGES_AREA, COMMENT FROM AeDESFormsImages where FORM_ID=" + form_id
    } ) ;

    return recoverPictureGallery ;
} ;

// Query to retrieve the Videos, given the form_id
AeDESModeUtils.LoadVideosQuery = function( form_id )
{
    var recoverVideoGallery = Alloy.createCollection( 'AeDESFormsVideos' ) ;
    recoverVideoGallery.fetch(
    {
        query: "SELECT ID, VIDEO_PATH, LATITUDE, LONGITUDE, ADDRESS, HEADING, DAMAGES_LEVEL, DAMAGES_AREA, COMMENT FROM AeDESFormsVideos where FORM_ID=" + form_id
    } ) ;

    return recoverVideoGallery ;
} ;

// Create a media array with all pictures and videos
AeDESModeUtils.CreateMediaArray = function( form_id , not_saved_needed , only_pictures )
{
    var media_array = new Array() ;

    // If this is not a new form, we have to search on the DB
    if( form_id != -1 )
    {
        var recoverPictureGallery = AeDESModeUtils.LoadImagesQuery( form_id ) ;
        if( recoverPictureGallery.length > 0 )
        {
            for( var i = 0 ; i < recoverPictureGallery.length ; i++ )
            {
                var image = recoverPictureGallery.at( i ) ;
                var id = image.get( "ID" ) ;
                var image_path = image.get( "IMAGE_PATH" ) ;
                var latitude = image.get( "LATITUDE" ) ;
                var longitude = image.get( "LONGITUDE" ) ;
                var address = image.get( "ADDRESS" ) ;
                var heading = image.get( "HEADING" ) ;
                var damages_level = image.get( "DAMAGES_LEVEL" ) ;
                var damages_area = image.get( "DAMAGES_AREA" ) ;
                var comment = image.get( "COMMENT" ) ;

                var media_found = false ;
                var file = Alloy.Globals.getFileForRead( image_path ) ;
                var filename = null ;
                if( file )
                {
                    // OK
                    filename = file.getNativePath() ;
                    media_found = true ;
                }

                // Push in the media array
                media_array.push( { media: filename , id: id , type: "PIC" , latitude: latitude , longitude: longitude , address: address , heading: heading , damages_level: damages_level , damages_area: damages_area , comment: comment , path: image_path , media_found: media_found } ) ;
            }
        }

        if( only_pictures )
        {
        }
        else
        {
            var recoverVideoGallery = AeDESModeUtils.LoadVideosQuery( form_id ) ;
            if( recoverVideoGallery.length > 0 )
            {
                for( var i = 0 ; i < recoverVideoGallery.length ; i++ )
                {
                    var video = recoverVideoGallery.at( i ) ;
                    var id = video.get( "ID" ) ;
                    var video_path = video.get( "VIDEO_PATH" ) ;
                    var latitude = video.get( "LATITUDE" ) ;
                    var longitude = video.get( "LONGITUDE" ) ;
                    var address = video.get( "ADDRESS" ) ;
                    var heading = video.get( "HEADING" ) ;
                    var damages_level = video.get( "DAMAGES_LEVEL" ) ;
                    var damages_area = video.get( "DAMAGES_AREA" ) ;
                    var comment = video.get( "COMMENT" ) ;

                    var media_found = false ;
                    var file = Alloy.Globals.getFileForRead( video_path ) ;
                    var filename = null ;
                    if( file )
                    {
                        filename = file.getNativePath() ;
                        media_found = true ;
                    }
                    // Push in the media array
                    media_array.push( { media: filename , id: id , type: "VID" , latitude: latitude , longitude: longitude , address: address , heading: heading , damages_level: damages_level , damages_area: damages_area , comment: comment , path: video_path , media_found: media_found } ) ;
                }
            }
        }
    }

    if( not_saved_needed )
    {
        // If the array isn't null or empty, we have some not saved images
        if( Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0 )
        {
            for( var i = 0 ; i < Alloy.Globals.CurrentPicsPath.length ; i++ )
            {
                if( Alloy.Globals.CurrentPicsPath[i].media )
                {
                    // Nothing to do
                }
                else
                {
                    // The media is not set, this mean that is a modified container and we must search the corresponding DB element and update it's values
                    for( var j = 0 ; j < media_array.length ; j++ )
                    {
                        if( media_array[j].id && media_array[j].id == Alloy.Globals.CurrentPicsPath[i].id )
                        {
                            media_array[j].latitude = Alloy.Globals.CurrentPicsPath[i].latitude ;
                            media_array[j].longitude = Alloy.Globals.CurrentPicsPath[i].longitude ;
                            media_array[j].address = Alloy.Globals.CurrentPicsPath[i].address ;
                            media_array[j].heading = Alloy.Globals.CurrentPicsPath[i].heading ;
                            media_array[j].damages_level = Alloy.Globals.CurrentPicsPath[i].damages_level ;
                            media_array[j].damages_area = Alloy.Globals.CurrentPicsPath[i].damages_area ;
                            media_array[j].comment = Alloy.Globals.CurrentPicsPath[i].comment ;

                            break ;
                        }
                    }
                }

                // Push in the media array
                media_array.push( { index: i , media: Alloy.Globals.CurrentPicsPath[i].media , type: "PIC" , latitude: Alloy.Globals.CurrentPicsPath[i].latitude , longitude: Alloy.Globals.CurrentPicsPath[i].longitude , address: Alloy.Globals.CurrentPicsPath[i].address , heading: Alloy.Globals.CurrentPicsPath[i].heading , damages_level: Alloy.Globals.CurrentPicsPath[i].damages_level , damages_area: Alloy.Globals.CurrentPicsPath[i].damages_area , comment: Alloy.Globals.CurrentPicsPath[i].comment , media_found: true } ) ;
            }
        }

        if( only_pictures )
        {
        }
        else
        {
            // If the array isn't null or empty, we have some not saved videos
            if( Alloy.Globals.CurrentVideosPath && Alloy.Globals.CurrentVideosPath.length > 0 )
            {
                for( var i = 0 ; i < Alloy.Globals.CurrentVideosPath.length ; i++ )
                {
                    if( Alloy.Globals.CurrentVideosPath[i].media )
                    {
                        // Nothing to do
                    }
                    else
                    {
                        // The media is not set, this mean that is a modified container and we must search the corresponding DB element and update it's values
                        for( var j = 0 ; j < media_array.length ; j++ )
                        {
                            if( media_array[j].id && media_array[j].id == Alloy.Globals.CurrentVideosPath[i].id )
                            {
                                media_array[j].latitude = Alloy.Globals.CurrentVideosPath[i].latitude ;
                                media_array[j].longitude = Alloy.Globals.CurrentVideosPath[i].longitude ;
                                media_array[j].address = Alloy.Globals.CurrentVideosPath[i].address ;
                                media_array[j].heading = Alloy.Globals.CurrentVideosPath[i].heading ;
                                media_array[j].damages_level = Alloy.Globals.CurrentVideosPath[i].damages_level ;
                                media_array[j].damages_area = Alloy.Globals.CurrentVideosPath[i].damages_area ;
                                media_array[j].comment = Alloy.Globals.CurrentVideosPath[i].comment ;

                                break ;
                            }
                        }
                    }

                    // Push in the media array
                    media_array.push( { index: i , media: Alloy.Globals.CurrentVideosPath[i].media , type: "VID" , latitude: Alloy.Globals.CurrentVideosPath[i].latitude , longitude: Alloy.Globals.CurrentVideosPath[i].longitude , address: Alloy.Globals.CurrentVideosPath[i].address , heading: Alloy.Globals.CurrentVideosPath[i].heading , damages_level: Alloy.Globals.CurrentVideosPath[i].damages_level , damages_area: Alloy.Globals.CurrentVideosPath[i].damages_area , comment: Alloy.Globals.CurrentVideosPath[i].comment , media_found: true } ) ;
                }
            }
        }
    }

    return media_array ;
} ;

module.exports = AeDESModeUtils ;
