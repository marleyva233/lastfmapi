// http://ws.audioscrobbler.com/2.0/

function generateTop(){
	var username=document.getElementById("username").value;
	var displayResults=document.getElementById("displayResults");
	$.ajax({
		url:"http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user="+username+"&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json",
		dataType:"json",
		type:'GET',
		success:function(data){
			console.log(data);
			for (var i=0; i<50; i++){
				//storing the data
				var topArtists=data.topartists.artist[i];
				var userData=document.createElement("div");
					userData.classList.add("col-3")
				var artist=document.createElement("a");
					artist.href=topArtists.url;
					artist.innerText=topArtists.name;
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

// function generateTopTracks(){
// 	$.ajax({
// 		url:"http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=24d232cbf60df58fd0c63b29d618cbe4&format=json",
// 		dataType:"json",
// 		type: 'GET',
// 		success: function(data){
// 			console.log(data);

// 		}
// 	})
// }