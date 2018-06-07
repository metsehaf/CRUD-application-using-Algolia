    var client = algoliasearch('APP-ID', 'Admin-API');
    var index = client.initIndex('students');
    //initialize autocomplete on search input (ID selector must match)
    autocomplete('#condition',
    { hint: false }, [
      {
    source: autocomplete.sources.hits(index, {hitsPerPage: 5}),
    //value to be displayed in input control after user's suggestion selection
    displayKey: 'StudentName',
    //hash of templates used when rendering dataset
    templates: {
        //'suggestion' templating function used to render a single suggestion
        suggestion: function(suggestion) {
            return '<span>' +
            suggestion._highlightResult.StudentName.value + '</span><span>' +
            suggestion._highlightResult.ContactatHome.value + '</span><span>' +
            suggestion._highlightResult.HomeAddress.value + '</span><span>' +
            suggestion._highlightResult.Dropoff.value + '</span><span>';
        }
      }
    } //when search suggestions are clicked, show below within list
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      var thehtml = '<li id="name">'+ suggestion.StudentName + '</li> ' + ' <br> <li id="phone">' + suggestion.ContactatHome + '</li> ' + ' <br> <li id="adress">' + suggestion.HomeAddress + '</li> ' + ' <br> <li id="dropoff">' + suggestion.Dropoff + '</li> ' +' <br> <li id="startDate">' + suggestion.StartDate + '</li> ' +' <br> <li id="id">' + suggestion.objectID + '</li><br>';
      $('#student').html(thehtml);
      console.log(suggestion); //useful for debugging, remove in production
      loadData(); //call loadData function to show street view

      //function for loading street view data from google maps
      function loadData() {
    var $student = $('#student');
    var streetStr = suggestion.HomeAddress;
    var cityStr = suggestion.City;
    var address = streetStr + ', ' + cityStr;


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $student.append('<strong>Street View:</strong><br><div class="container"><a href="https://www.google.com/maps/search/?api=1&query=' + address + '" target="_blank" class="button">View on google maps</a><img class="bgimg" src="' + streetviewUrl + '"></div>');

    return false;

  };
   
  
//edit click event
  $('.edit').click(function() {
    $(this).hide();
    // $("strong").replaceWith( "<strong>" + $(this).text() + "</strong>" );
    $(this).closest('ul + *').prev().find("li:lt(5)").addClass('editable');
    $(this).closest('ul + *').prev().find("li:lt(5)").attr('contenteditable', 'true'); 
    // $("#student").addClass('editable');
    // $("#student").attr('contenteditable', 'true'); 
    $(this).siblings('.save, .cancel').show();
  });
//cancel click event
  $('.cancel').click(function() {
    $(this).siblings('.edit').show();
    $(this).siblings('.save').hide();
    $(this).closest('ul + *').prev().find("li:lt(5)").removeClass('editable');
    $(this).closest('ul + *').prev().find("li:lt(5)").removeAttr('contenteditable'); 
    $(this).hide();
  });

   function updateAlert(msg,duration)
                              {
                                   var el = document.createElement("div");
                                   el.setAttribute("style","position:absolute;top:80%;left:10%;font-size:3em;background-color:green;color:white;");
                                   el.innerHTML = msg;
                                   setTimeout(function(){
                                    el.parentNode.removeChild(el);
                                   },duration);
                                   document.body.appendChild(el);
                              }


   function update(){
                              var $obj = $("#id").html();
                              var $name = $("#name").html();
                              var $phone = $("#phone").html();
                              var $adress = $("#adress").html();
                              var $drop = $("#dropoff").html();
                              var $start = $("#startDate").html()
                              index.partialUpdateObject({
                              StudentName: $name,
                              objectID: $obj,
                              ContactatHome: $phone,
                              HomeAddress: $adress,
                              Dropoff: $drop,
                              StartDate: $start
                            }, function(err, content) {
                              if (err) throw err;

                              console.log(content);
                            });
                            }
  //save click event
  $('.save').click(function() {
    update();
    var nom = $(this).closest('ul + *').prev().find("li:eq(0)").text();
    $(this).siblings('.edit').show();
    $(this).siblings('.cancel').hide();
    $(this).closest('ul + *').prev().find("li:lt(5)").removeClass('editable');
    $(this).closest('ul + *').prev().find("li:lt(5)").removeAttr('contenteditable'); 
    $(this).hide();
    updateAlert(nom + "'s information has been updated",3000);
  });
        });
        

       /*create map for directions below 
       for the route copy*/
        function initMap() {

        // create new DirectionRenderer and DirectionService obj, they will come handy when we calculate directions
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        
    
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: {lat: 43.7, lng: -79.4},
          gestureHandling: 'greedy',
          // Create a style for the map by assigning value to properties
      // styles: [
      //       {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      //       {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      //       {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      //       {
      //         featureType: 'administrative.locality',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'poi',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'poi.park',
      //         elementType: 'geometry',
      //         stylers: [{color: '#263c3f'}]
      //       },
      //       {
      //         featureType: 'poi.park',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#6b9a76'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'geometry',
      //         stylers: [{color: '#38414e'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'geometry.stroke',
      //         stylers: [{color: '#212a37'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#9ca5b3'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'geometry',
      //         stylers: [{color: '#746855'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'geometry.stroke',
      //         stylers: [{color: '#1f2835'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#f3d19c'}]
      //       },
      //       {
      //         featureType: 'transit',
      //         elementType: 'geometry',
      //         stylers: [{color: '#2f3948'}]
      //       },
      //       {
      //         featureType: 'transit.station',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'geometry',
      //         stylers: [{color: '#FFEB3B'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#039BE5'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'labels.text.stroke',
      //         stylers: [{color: '#039BE5'}]
      //       }
      //     ]
        });
        

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
  
   //  // var onClickHandler = function() {
   //  //       calculateAndDisplayRoute(directionsService, directionsDisplay);
   //  //     };
    
 //   document.getElementById('submit').addEventListener('click', function() {
 //          calculateAndDisplayRoute(directionsService, directionsDisplay);
 //      });
 // }

 document.getElementById('openDlg3').addEventListener('click', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      });
 }
  
      // calculate the direction by geocoding addresses from the search input
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
          
        var waypts = [];
        var city = ", Toronto";
        $('#tbdata tr:gt(0):lt(-1)').not([0]).each(function(){
          var $wptArray = $(this).find('td:eq(3)').html() + city;
          waypts.push({
          location: $wptArray,
          stopover: true
        });
        });
        var start = $('#tbdata').first('tr').find('td:eq(3)').html() + city;
        var end = $('.school').find('td:gt(1)').html();
        
        directionsService.route({
          origin: start,
          destination: end,
          waypoints: waypts,
          optimizeWaypoints: false,
          travelMode: 'DRIVING',
          avoidTolls: true
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  }
