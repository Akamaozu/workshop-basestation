var socket = io( 'https://torontojs-basestation.herokuapp.com/' ),
viewport = document.getElementById( 'uploaded' ),
uploads = 0;



socket.on('display-time',function(data){
  var timeport =  document.querySelector('.our-time');
  var shouldPrepend = false;
  if(!timeport){
    timeport = document.createElement('div');
    shouldPrepend= true;
  }
  timeport.className  = 'our-time';
  timeport.textContent = `Server running: ${data.dateDiff}`;
  if(shouldPrepend) viewport.prepend(timeport);

} )

socket.on( 'new-upload', function ( file ){  
  uploads += 1;

  var upload_markup = '<div id="upload-' + uploads + '" class="upload">' +
                        '<img class="image" src="data:image/jpeg;base64,'+ file.content +'">' +
                        '<div class="description">Satellite: ' + file.uploader + '</div>' +
                        '<div class="description">Date Taken: ' + file.timestamp + '</div>' +
                      '</div>';  

  viewport.innerHTML = upload_markup + viewport.innerHTML;                    
});  

