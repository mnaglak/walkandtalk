//Define map start up options, here defined to center on Italy
		var mapOptions = {
			center: [32.776324068465605, -79.9327707746953], //set center
			zoom: 16 , //set initial zoom
			maxZoom : 18,  //set max zoom
			minZoom : 12,
			maxBounds: [ [-90, -180] , [90,180] ],
			tap: false
			}

//Creates Map according to map options
		var map = new L.map('map', mapOptions);
		L.control.pan().addTo(map);
//Examples of an externally called tiled basemap
		var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
		}).addTo(map);

			map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
			});

			var baseLayers = {
				"Street Map" : Esri_WorldTopoMap,
				};

			L.control.layers(baseLayers).addTo(map);
var hatIcon = L.icon({
	iconUrl: './images/hat.png',
	iconSize:     [40, 47], // size of the icon
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

			var hatman = L.marker([32.776324068465605, -79.9327707746953], {icon: hatIcon}).addTo(map);
			hatman.bindPopup('<b><i>All tours start at the hatman!</i></b>' + '<img src="./images/hatman.jpg" width="200px" />');

			$.get('./HighlightedLocations.csv', function(csvString) {

			    // Use PapaParse to convert string to array of objects
			    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

			    // For each row in data, create a marker and add it to the map
			    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
			    for (var i in data) {
			      var row = data[i];

			      var marker = L.marker([row.Latitude, row.Longitude], {
			        opacity: 1
			      }).bindPopup(row.Title);

			      marker.addTo(map);
			    }

			  });
