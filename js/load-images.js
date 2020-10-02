/*
    Aditya Kumar
    Contact: adityabehera23@gmail.com
    
    MIT Licensed - see http://opensource.org/licenses/MIT for details.
    Anyone may freely use this code. Just don't sue me if it breaks stuff.
    Created: October 1st, 2020
    Last Updated: 
    
    
    ** Useful URLs **
    GitHub API Docs:    https://developer.github.com/v3/
    jQuery.ajax() Docs: https://api.jquery.com/jquery.ajax/
    nanogallery2 Docs:  https://nanogallery2.nanostudio.org/quickstart.html
    .replace all: https://stackoverflow.com/questions/2116558/fastest-method-to-replace-all-instances-of-a-character-in-a-string
*/

// List of image paths for displaying in the nanogallery2 image gallery
var imgList = [];

// GitHub API End Point URL / Path
var githubApiVersion = "application/vnd.github.v3+json";
var githubApiBaseUrl = "https://api.github.com";
var githubRepo = "Trekking";
var githubPath = "img/album/";
var githubBranch = "master";

$( document ).ready(function() {
  
  /* 
      So turns out GitHub Pages, which is how I host the majority of my web pages,
      doesn't let me access a directory like "img/album/" mentioned above. 
      They do however have a REST API! So, let's use that instead.
     
      jQuery.ajax can be used to GET the Contents of a directory via the GitHub REST API.
  */
  
  // GET /repos/:owner/:repo/contents/:path
  var githubGetRequest = githubApiBaseUrl + "/repos/Adityansh2334/" + githubRepo + "/contents/" + githubPath;
  
  // API docs page for Getting Repository Contents: https://developer.github.com/v3/repos/contents/
  var request = $.ajax({
    
    // Example: https://api.github.com/repos/Adityansh2334/Trekking/contents/img/album/
    url: githubGetRequest,
    
    // Need to provide the branch so we pull from gh-pages and NOT master
    data: {"ref": githubBranch},
    
    // Make sure to request API V3, just in case GitHub releases a future version 
    // which breaks this code. This also gets us JSON too.
    headers: { "accept": githubApiVersion },
    type: "GET"
  });
  
  /* 
      Once we get the results back, we can run through the Array of Objects we get back. 
      It'll look something like:
      [
        {
          name: "something.jpg",
          path: "img/album/something.jpg"
          .. more data we can ignore ..
        },
        
        ... tons more file objects like above ...
      ]
  */
  request.done(function(data) {
    // Using for instead of foreach for performance
    // https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead
    for (var x = 0, len = data.length; x < len; x++)
    {
      var imgPath = data[x].path;
      
      // Using the img name to dynamically populate a description
      // Replace underscores (_'s) with spaces, and remove the file extension too (".jpg")
      // And I like slashes instead of dashes so let's replace those too!
      var imgName = data[x].name;
      imgName = imgName.replace(/_/g, " ").replace(/-/g, "/").replace(".jpg", " "); 
      
      imgList.push( { "src": imgPath,
                      "srct": imgPath,
                      "title": imgName } );
    }
    
    // Debugging
    console.log(imgList);
  
    $("#nanogallery").nanogallery2({
      // GALLERY AND THUMBNAIL LAYOUT
      galleryMosaic : [                       // default layout
        { w: 2, h: 2, c: 1, r: 1 },
        { w: 1, h: 1, c: 3, r: 1 },
        { w: 1, h: 1, c: 3, r: 2 },
        { w: 1, h: 2, c: 4, r: 1 },
        { w: 2, h: 1, c: 5, r: 1 },
        { w: 2, h: 2, c: 5, r: 2 },
        { w: 1, h: 1, c: 4, r: 3 },
        { w: 2, h: 1, c: 2, r: 3 },
        { w: 1, h: 2, c: 1, r: 3 },
        { w: 1, h: 1, c: 2, r: 4 },
        { w: 2, h: 1, c: 3, r: 4 },
        { w: 1, h: 1, c: 5, r: 4 },
        { w: 1, h: 1, c: 6, r: 4 }
      ],
      galleryMosaicXS : [                     // layout for XS width
        { w: 2, h: 2, c: 1, r: 1 },
        { w: 1, h: 1, c: 3, r: 1 },
        { w: 1, h: 1, c: 3, r: 2 },
        { w: 1, h: 2, c: 1, r: 3 },
        { w: 2, h: 1, c: 2, r: 3 },
        { w: 1, h: 1, c: 2, r: 4 },
        { w: 1, h: 1, c: 3, r: 4 }
      ],
      galleryMosaicSM : [                     // layout for SM width
        { w: 2, h: 2, c: 1, r: 1 },
        { w: 1, h: 1, c: 3, r: 1 },
        { w: 1, h: 1, c: 3, r: 2 },
        { w: 1, h: 2, c: 1, r: 3 },
        { w: 2, h: 1, c: 2, r: 3 },
        { w: 1, h: 1, c: 2, r: 4 },
        { w: 1, h: 1, c: 3, r: 4 }
      ],
      galleryMaxRows: 1,
      galleryDisplayMode: 'rows',
      gallerySorting: 'random',
      thumbnailDisplayOrder: 'random',

      thumbnailHeight: '180', thumbnailWidth: '220',
      thumbnailAlignment: 'scaled',
      thumbnailGutterWidth: 0, thumbnailGutterHeight: 0,
      thumbnailBorderHorizontal: 0, thumbnailBorderVertical: 0,

      thumbnailToolbarImage: null,
      thumbnailToolbarAlbum: null,
      thumbnailLabel: { display: false },

      // DISPLAY ANIMATION
      // for gallery
      galleryDisplayTransitionDuration: 1500,
      // for thumbnails
      thumbnailDisplayTransition: 'imageSlideUp',
      thumbnailDisplayTransitionDuration: 1200,
      thumbnailDisplayTransitionEasing: 'easeInOutQuint',
      thumbnailDisplayInterval: 60,

      // THUMBNAIL HOVER ANIMATION
      thumbnailBuildInit2: 'image_scale_1.15',
      thumbnailHoverEffect2: 'thumbnail_scale_1.00_1.05_300|image_scale_1.15_1.00',
      touchAnimation: true,
      touchAutoOpenDelay: 500,

      // LIGHTBOX
      viewerToolbar: { display: false },
      viewerTools:    {
        topLeft:   'label',
        topRight:  'shareButton, rotateLeft, rotateRight, fullscreenButton, closeButton'
      },

      // GALLERY THEME
      galleryTheme : { 
        thumbnail: { background: '#111' },
      },
      
      // DEEP LINKING
      locationHash: true,

      //Images from GitHub
      items: imgList
    });
  });
});
