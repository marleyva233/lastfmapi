// http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=lanadelrey&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json
//generate artist info
function generateArtist(){
	var artistRequest=document.getElementById("artist").value.trim();
	var displayArtistDiv=document.getElementById("displayArtistInfo");
	$.ajax({
		url:"https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+artistRequest+"&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json",
		dataType:"json",
		type:'GET',
		success:function(data){
			console.log(data);
			displayArtistDiv.innerHTML="";
			var artistData=data.artist;
			var artistDetails=document.createElement("div");
				artistDetails.classList.add("col-10", "mx-auto", "pb-5", "text-center", "animated", "fadeInUp");
				artistDetails.innerHTML="<h5>"+artistData.name+"</h5>";
				artistDetails.innerHTML+="<p>"+artistData.bio.summary+"</p>";
				artistDetails.innerHTML+="<h5>Listeners: "+artistData.stats.listeners+ " Playcount: "+artistData.stats.playcount+"</h5>";
			var artistImage=document.createElement("img");
				artistImage.src=artistData.image[5]["#text"];
				artistImage.alt=artistRequest;
				artistImage.classList.add("mx-auto", "img-fluid", "p-2", "animated", "slideInUp");
				displayArtistDiv.appendChild(artistImage);
				displayArtistDiv.appendChild(artistDetails);
		}
	});
	document.getElementById("artist").value="";
}
//generate user top artists
function generateTop(){
	var username=document.getElementById("username").value.trim();
	var displayResults=document.getElementById("displayResults");
	$.ajax({
		url:"https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user="+username+"&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json",
		dataType:"json",
		type:'GET',
		success:function(data){
			for (var i=0; i<50; i++){
				//storing the data
				var topArtists=data.topartists.artist[i];
				var userData=document.createElement("div");
					userData.classList.add("col-3", "text-center", "mx-auto", "p-2");
				var artist=document.createElement("a");
					artist.href=topArtists.url;
					artist.innerHTML=i+1+" "+topArtists.name+ "</br>";
					artist.classList.add("links");
				var artistImage=document.createElement("img");
					artistImage.src=topArtists.image[2]["#text"];
					artistImage.alt=topArtists.name;
					artistImage.classList.add("img-fluid", "topImages");
				var playCount=document.createElement("h6");
					playCount.innerText="play count: "+topArtists.playcount;

				displayResults.appendChild(userData);
				userData.appendChild(artist);
				userData.appendChild(artistImage);
				userData.appendChild(playCount);
			}
		}
	});
	document.getElementById("username").value="";
}

// generate top tracks on last.fm
function generateTopTracks(){
	var displayTopTracks=document.getElementById("topTracks");
	$.ajax({
		url:"https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json",
		dataType:"json",
		type: 'GET',
		success:function(data){
			for (var i=0; i<15; i++){
				var topTracks=data.tracks.track[i];
				var topTrackDetails=document.createElement("li");
					topTrackDetails.innerHTML= i+1+". " + topTracks.name +" by "+ topTracks.artist.name+ "<br>";
				var topTrackImg=document.createElement("img");
					topTrackImg.src=topTracks.image[2]["#text"];
					topTrackImg.alt=topTracks.artist.name;
					topTrackImg.classList.add("pb-5", "animated", "pulse", "slower");

				displayTopTracks.appendChild(topTrackDetails);
				topTrackDetails.appendChild(topTrackImg);
			}
		}
	});
}

generateTopTracks();