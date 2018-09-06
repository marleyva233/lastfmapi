// http://ws.audioscrobbler.com/2.0/

function generateTop(){
	var username=document.getElementById("username").value;
	var displayResults=document.getElementById("displayResults");
	$.ajax({
		url:"https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user="+username+"&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json",
		dataType:"json",
		type:'GET',
		success:function(data){
			console.log(data);
			for (var i=0; i<50; i++){
				//storing the data
				var topArtists=data.topartists.artist[i];
				var userData=document.createElement("div");
					userData.classList.add("col-3", "text-center", "mx-auto")
				var artist=document.createElement("a");
					artist.href=topArtists.url;
					artist.innerHTML=topArtists.name+ "<br>";
				var artistImage=document.createElement("img");
					artistImage.src=topArtists.image[2]["#text"];
					artistImage.alt=topArtists.name;
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

function generateTopTracks(){
	var displayTopTracks=document.getElementById("topTracks");
	$.ajax({
		url:"https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json",
		dataType:"json",
		type: 'GET',
		success: function(data){
			console.log(data);
			for (var i=0; i<15; i++){
				var topTracks=data.tracks.track[i];
				
				var topTrackDetails=document.createElement("li");
					topTrackDetails.innerHTML= i+1+". " + topTracks.name +" by "+ topTracks.artist.name+ "<br>";
				var topTrackImg=document.createElement("img");
					topTrackImg.src=topTracks.image[2]["#text"];
					topTrackImg.classList.add("pb-5");

				displayTopTracks.appendChild(topTrackDetails);
				topTrackDetails.appendChild(topTrackImg);
			}
		}
	});
}

generateTopTracks();