(function()
  {
  	navigator.webkitGetUserMedia({video:true, audio:false}, 
  	function(stream) {
  		
  		video = document.querySelector('#video-frame');
  		video.src = webkitURL.createObjectURL(stream);
  		video.autoplay = true;

  		galaxy = new World;
    	galaxy.init();
  	}, function(e) {
  		console.error(e);
  	});
    //galaxy.gui = new dat.GUI();
    //galaxy.gui.add(galaxy, 'pause');
  }
)();