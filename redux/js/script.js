const APIKEY =  'AIzaSyB9-C6isL_8dRIskc8JN2HXV8WttDD7Fws';

// defines a class Category
function Category(playlistid,title){
  this.playlistid = playlistid;
  this.title = title;
}

Category.prototype = {
  constructor: Category,
  showid: function(){
    return this.playlistid;
  },
  display: function(){
    getVideos(this.playlistid,this.title)
  },
  newtitle: function(title){
    this.title = title
  }
}
//api call to get videos from youtube playlist
function getVideos(playlistid,categorytitle){
  var videoArray = [];
  $.get( "https://www.googleapis.com/youtube/v3/playlistItems",{
      part: "snippet",
      playlistId: playlistid,
      maxResults: 50,
      key: APIKEY },
      function(data){
        var videoArray = new Array();
        var items = data.items;
        $.each(items,function(i, item){
          var title = item.snippet.title;
          var videoid = item.snippet.resourceId.videoId;
          var thumbnail = item.snippet.thumbnails.maxres;
          thumbnail != undefined? thumbnail = item.snippet.thumbnails.maxres.url : thumbnail = item.snippet.thumbnails.high.url;
          var temp = [title,videoid,thumbnail];
          videoArray.push(temp);
        });// end each
        dispCategory(videoArray,categorytitle);
      }//end data fxn
   );//end get
}
// create html elements and display thumbnails, title, url
function dispCategory(videoArray,categorytitle){
  const VIDEOARRAY = videoArray.reverse();
  const ROWTITLE = categorytitle.toUpperCase();
  var row = document.createElement('div');
  var channeltitle = document.createElement('div');

  row.className = "row";
  row.id = `row-${ROWTITLE}`;
  $(".container").append(row);
  channeltitle.innerHTML = ROWTITLE;
  channeltitle.className = "channel-title";
  $(`#${row.id}`).append(channeltitle);

  for(var i = 0; i < 4 ; i++){
    var videotitle = VIDEOARRAY[i][0];
    if(videotitle.length >= 37){videotitle = VIDEOARRAY[i][0].substring(0,37)+"..."};
    var videourl = VIDEOARRAY[i][1];
    var thumbnail = VIDEOARRAY[i][2];
    var divwrap  = document.createElement('div');
    var divvideo = document.createElement('div');
    var divimg   = document.createElement('img');
    var divtitle = document.createElement('div');

    $(`#${row.id}`).append(divwrap);
    divwrap.setAttribute("url", `${videourl}`);
    divwrap.className = "video-wrap";
    divvideo.className = "video";
    divimg.setAttribute("src",`${thumbnail}`);
    divimg.className = "category-img";
    divtitle.className = "video-title";
    divtitle.innerHTML = videotitle;
    divwrap.append(divvideo);
    divwrap.append(divtitle);
    divvideo.append(divimg);
  }
}//end function

music = new Category("PLrESQ_Ih_XDy02Wf925pSxZ5-OV4p8cT0","Music");
music.display();
$(document).on('click','.video-wrap', function(){
    var id = $(this).attr("url");
})

$(document).ready(function(){
  var video = document.createElement('iframe');
  video.setAttribute("src","https://www.youtube.com/embed/CNJkas_LiCM");
  video.setAttribute("height",'180px');
  video.setAttribute("width",'282px');
  $(".container").append(video)
})

/*
$(document).on('mouseenter','.video-wrap', function(){
    alert("enter")
}).on('mouseleave','.video-wrap', function(){
    alert("leave")
});
*/
