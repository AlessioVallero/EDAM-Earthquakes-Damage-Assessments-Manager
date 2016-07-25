function BAEAModeUtils()
{
}

// Query to retrieve the BAEAForm, given the form_id
BAEAModeUtils.LoadDetailsQuery = function( form_id )
{
    var recoverDetails = Alloy.createCollection( 'BAEAForms' ) ;

    if( form_id )
    {
        recoverDetails.fetch(
        {
            query: "SELECT * FROM BAEAForms where ID=" + form_id
        } ) ;
    }
    else
    {
        recoverDetails.fetch(
        {
            query: "SELECT * FROM BAEAForms where USER is null or USER = '' or USER=\"" + Alloy.Globals.SessionUsername + "\" and SYNCHRONIZED=\"0\""
        } ) ;
    }

    return recoverDetails ;
} ;

// Query to retrieve the FaultRupture, given the form_id
BAEAModeUtils.LoadFaultRuptureQuery = function( form_id )
{
    var recoverFaultRupture = Alloy.createCollection( 'BAEAFormsFaultRupture' ) ;
    recoverFaultRupture.fetch(
    {
        query: "SELECT * FROM BAEAFormsFaultRupture where FORM_ID=" + form_id
    } ) ;

    return recoverFaultRupture ;
} ;

// Query to retrieve the Liquefaction, given the form_id
BAEAModeUtils.LoadLiquefactionQuery = function( form_id )
{
    var recoverLiquefaction = Alloy.createCollection( 'BAEAFormsLiquefaction' ) ;
    recoverLiquefaction.fetch(
    {
        query: "SELECT * FROM BAEAFormsLiquefaction where FORM_ID=" + form_id
    } ) ;

    return recoverLiquefaction ;
} ;

// Query to retrieve the Landslide, given the form_id
BAEAModeUtils.LoadLandslideQuery = function( form_id )
{
    var recoverLandslide = Alloy.createCollection( 'BAEAFormsLandslide' ) ;
    recoverLandslide.fetch(
    {
        query: "SELECT * FROM BAEAFormsLandslide where FORM_ID=" + form_id
    } ) ;

    return recoverLandslide ;
} ;

// Query to retrieve the Tsunami, given the form_id
BAEAModeUtils.LoadTsunamiQuery = function( form_id )
{
    var recoverTsunami = Alloy.createCollection( 'BAEAFormsTsunami' ) ;
    recoverTsunami.fetch(
    {
        query: "SELECT * FROM BAEAFormsTsunami where FORM_ID=" + form_id
    } ) ;

    return recoverTsunami ;
} ;

// Query to retrieve the Lifelines, given the form_id
BAEAModeUtils.LoadLifelinesQuery = function( form_id )
{
    var recoverLifelines = Alloy.createCollection( 'BAEAFormsLifelines' ) ;
    recoverLifelines.fetch(
    {
        query: "SELECT * FROM BAEAFormsLifelines where FORM_ID=" + form_id
    } ) ;

    return recoverLifelines ;
} ;

// Query to retrieve the Buildings, given the form_id
BAEAModeUtils.LoadBuildingsQuery = function( form_id )
{
    var recoverBuildings = Alloy.createCollection( 'BAEAFormsBuildings' ) ;
    recoverBuildings.fetch(
    {
        query: "SELECT * FROM BAEAFormsBuildings where FORM_ID=" + form_id
    } ) ;

    return recoverBuildings ;
} ;

// Query to retrieve the General, given the form_id
BAEAModeUtils.LoadGeneralQuery = function( form_id )
{
    var recoverGeneral = Alloy.createCollection( 'BAEAFormsGeneral' ) ;
    recoverGeneral.fetch(
    {
        query: "SELECT * FROM BAEAFormsGeneral where FORM_ID=" + form_id
    } ) ;

    return recoverGeneral ;
} ;

// Query to retrieve the Images, given the form_id
BAEAModeUtils.LoadImagesQuery = function( form_id , filter_by_section_type , filter_by_section_id )
{
    var recoverPictureGallery = Alloy.createCollection( 'BAEAFormsImages' ) ;

    if( filter_by_section_type && filter_by_section_id )
    {
        recoverPictureGallery.fetch(
        {
            query: "SELECT ID, IMAGE_PATH, SECTION , SECTION_ID FROM BAEAFormsImages where FORM_ID=" + form_id + " and SECTION='" + filter_by_section_type + "' and SECTION_ID='" + filter_by_section_id +"'"
        } ) ;
    }
    else
    {
        recoverPictureGallery.fetch(
        {
            query: "SELECT ID, IMAGE_PATH, SECTION , SECTION_ID FROM BAEAFormsImages where FORM_ID=" + form_id
        } ) ;
    }

    return recoverPictureGallery ;
} ;

// Create a media array with all pictures
BAEAModeUtils.CreateMediaArray = function( form_id , filter_by_section_type , filter_by_section_id )
{
    var media_array = new Array() ;

    // If this is not a new form, we have to search on the DB
    if( form_id != -1 )
    {
        var recoverPictureGallery = BAEAModeUtils.LoadImagesQuery( form_id , filter_by_section_type , filter_by_section_id ) ;
        if( recoverPictureGallery.length > 0 )
        {
            for( var i = 0 ; i < recoverPictureGallery.length ; i++ )
            {
                var image = recoverPictureGallery.at( i ) ;
                var id = image.get( "ID" ) ;
                var image_path = image.get( "IMAGE_PATH" ) ;
                var section = image.get( "SECTION" ) ;
                var section_id = image.get( "SECTION_ID" ) ;

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
                media_array.push( { media: filename , id: id , section: section , section_id: section_id , path: image_path , media_found: media_found } ) ;
            }
        }
    }

    return media_array ;
} ;

module.exports = BAEAModeUtils ;
