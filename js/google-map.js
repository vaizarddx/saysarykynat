
var google;

function init() {
    
    var myLatlng = new google.maps.LatLng(62.039688, 129.742222);
    
    
    var mapOptions = {
        
        zoom: 2,

        
        center: myLatlng,

       
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    
    
}
google.maps.event.addDomListener(window, 'load', init);