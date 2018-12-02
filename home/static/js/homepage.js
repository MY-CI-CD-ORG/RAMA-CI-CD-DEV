//*********************************** Get mapbox API and get data from HTML *****************************************************

mapboxgl.accessToken = 'pk.eyJ1IjoibG9va3VwbWFuIiwiYSI6ImNqbW41cmExODBxaTEzeHF0MjhoZGg1MnoifQ.LGL5d5zGa1z6ms-IVyn7sw';
var colorcode = ['#17f3d1', '#65dc1e', '#1743f3', '#ba55d3', '#e55e5e', '#FFFF00']
var showlist = [] //the array of layerIDs, used to categorize layers
var base = "show"
var Missionarea = JSON.parse(document.getElementById('missionlist').textContent);
for (var i = 0; i < Missionarea.length; i++) { //populate showlist array
    var text = base + i
    showlist.push(text)
}
var CommunityType = JSON.parse(document.getElementById('CommTypelist').textContent);
var CampusPartnerlist = JSON.parse(document.getElementById('campusPartner-list').textContent);
var communityData = JSON.parse(document.getElementById('commPartner-data').textContent);
var yearlist = JSON.parse(document.getElementById('year-list').textContent);
//*********************************** Add id variable to Community Data GEOJSON for search function later *****************************************************

var count = 0;
communityData.features.forEach(function(feature) {
        feature.properties["id"] = count;
        feature.properties["campustest"] = 0 //this variable will be used to filter by campus partners
        feature.properties["yeartest"] = 0 //this variable will be used to filter by academic years
        count++;
    })
    //*********************************** Load the map *****************************************************

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-95.957309, 41.276479],
    // initial zoom
    zoom: 6
});
map.addControl(new mapboxgl.NavigationControl());
var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true,
});
//*********************************** clickable legends *****************************************************

var select = '';
select += '<a href="#" ' + 'id=' + '"all" ' + 'value=' + '"allmissions"><span style="background-color: black"></span><b>All Mission Areas</b></a>' + "<br>";
for (var i = 0; i < Missionarea.length; i++) {
    var color = colorcode[i]
    var mission = Missionarea[i]
    select += `<a href="#" id="${mission.valueOf()}" value="${mission.valueOf()}"><span style="background-color: ${color}" ></span><b>${mission.toString()}</b></a>` + "<br>";
}
$('#legend').html(select);
//*********************************** Add the districts *****************************************************

var select1 = '';
select1 += '<option val=' + "all" + '>' + "All District" + '</option>';
for (i = 1; i <= 49; i++) {
    select1 += '<option val=' + i + '>' + i + '</option>';
}
$('#selectDistrict').html(select1);

//*********************************** Add the community type drop-down *****************************************************

var select2 = '';
select2 += '<option val=' + "alltypes" + '>' + 'All Community Types' + '</option>';
for (i = 0; i < CommunityType.length; i++) {
    select2 += '<option val=' + CommunityType[i] + '>' + CommunityType[i] + '</option>';
}
$('#selectCommtype').html(select2);
//*********************************** Add id variable to Community Data GEOJSON for search function later *****************************************************

var select3 = '';
select3 += '<option val=' + 0 + '>' + 'All Campus Partners' + '</option>';
for (i = 0; i < CampusPartnerlist.length; i++) {
    select3 += '<option val=' + i + '>' + CampusPartnerlist[i] + '</option>';
}
$('#selectCampus').html(select3);

//*********************************** Add year filter *****************************************************

var select4 = '';
select4 += '<option val=' + 0 + '>' + 'All Academic Years' + '</option>';
for (i = 0; i < yearlist.length; i++) {
    select4 += '<option val=' + i + '>' + yearlist[i] + '</option>';
}
$('#selectYear').html(select4);

//*********************************** Format the popup *****************************************************

var formatter = new Intl.NumberFormat('en-US', { //this is to format the current on the pop-up
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

function parseDescription(message) {
    var string = "";

    for (var i in message) {


        if (i == "CommunityPartner") {
            string += '<span style="font-weight:bold">' + 'Community Partner' + '</span>' + ": " + message[i] + "<br>";
        }
        if (i == "K-12 Partner") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Address") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Mission Area") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "City") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "  ";
        } else if (i == "State") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "STATE") {
            string += '<span style="font-weight:bold">' + 'State' + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "NAME") {
            string += '<span style="font-weight:bold">' + 'County' + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Income") {
            if (message[i]) {
                string += '<span style="font-weight:bold">' + 'Household Income' + '</span>' + ": " + formatter.format(message[i]) + "<br>";
            }
        } else if (i == "income") {
            if (message[i]) {
                string += '<span style="font-weight:bold">' + "Household Income" + '</span>' + ": " + formatter.format(message[i]) + "<br>"
            }
        } else if (i == "County") {
            if (message[i]) {
                string += '<span style="font-weight:bold">' + "County" + '</span>' + ": " + message[i] + "<br>"
            }
        } else if (i == "Legislative District Number") {
            if (message[i] !== 0) {
                string += '<span style="font-weight:bold">' + "Legislative District Number" + '</span>' + ": " + message[i] + "<br>"
            }
        } else if (i == "CommunityType") {
            string += '<span style="font-weight:bold">' + "Community Type" + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Campus Partner") {
            if (message[i]) {
                string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
            }
        } else if (i == "Number of projects") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Academic Year") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Website") {
            var website = message[i];
            var base = "http://";
            if (!website.includes("http")) {
                website = base.concat(website);
            }
            string += `<a target="_blank" href="${website}" class="popup" style="color:darkblue">View ${i}</a><br>`;
        }
    }
    return string;
};


//*********************************** Load the map *****************************************************

map.on("load", function() {

    map.addSource('communityData', {
        type: 'geojson',
        data: communityData,
    });
    //*********************************** Load partners *****************************************************

    communityData.features.forEach(function(feature) {
        var primary = feature.properties["Mission Area"];
        var commType = feature.properties["CommunityType"]
            // var base = "show"
        for (var i = 0; i < Missionarea.length; i++) {
            if (primary == Missionarea[i]) {
                layerID = showlist[i];
                if (!map.getLayer(layerID)) {
                    map.addLayer({
                        "id": layerID,
                        "type": "circle",
                        "source": "communityData",
                        "paint": {
                            "circle-radius": 8,
                            "circle-opacity": 1,
                            "circle-color": colorcode[i],
                        },
                        "filter": ["all", ["==", "Mission Area", primary]]
                    })
                }
            }
        }
    });
    //*********************************** function to show pop-up when clicking on the partner *****************************************************

    for (var i = 0; i < showlist.length; i++) {
        map.on("click", showlist[i], function(e) { //go through every layer. Refer to showlist
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties;
            description = parseDescription(description);
            map.flyTo({
                center: e.features[0].geometry.coordinates
            });
            popup.setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            close();
        });
    }

    //*********************************** Community Type filter *****************************************************

    var selectCommtype = document.getElementById('selectCommtype');
    selectCommtype.addEventListener("change", function(e) {
        var value = e.target.value.trim();
        if (!CommunityType.includes(value)) {
            for (var i = 0; i < showlist.length; i++) {
                map.setFilter(showlist[i], ["all", ["==", "Mission Area", Missionarea[i]]])
            }
            //get the number of markers and show it on the HTML
            var totalnumber = ''
            var quantity = calculation()
            totalnumber += quantity
            $('#totalnumber').html(totalnumber)
        } else {
            for (var i = 0; i <= CommunityType.length; i++) {
                if (value == CommunityType[i]) {
                    for (var j = 0; j < showlist.length; j++) {
                        map.setFilter(showlist[j], ["all", ["==", "Mission Area", Missionarea[j]],
                            ["==", "CommunityType", CommunityType[i]]
                        ])
                    }
                    // get the number of markers that fit the requirement and show on the HTML
                    var totalnumber = '';
                    var number = 0;
                    communityData.features.forEach(function(e) {
                        if (e.properties['CommunityType'] == CommunityType[i]) {
                            number += 1;
                        }
                    })
                    var totalnumber = ''
                    var quantity = calculation()
                    totalnumber += quantity
                    $('#totalnumber').html(totalnumber)

                }
            }
        }
    })

    //*********************************** Campus Partner filter *****************************************************

    var selectCampus = document.getElementById('selectCampus'); //get the element on HTML
    selectCampus.addEventListener("change", function(e) {
        var value = e.target.value.trim(); //get the value of the drop-down. In this case, the text on the drop-down
        if (!CampusPartnerlist.includes(value)) { // in the case of all Campus partners
            for (var i = 0; i < showlist.length; i++) { //return all
                map.setFilter(showlist[i], ["all", ["==", "Mission Area", Missionarea[i]]])
            }
        } else { //in case a campus partner is chosen
            communityData.features.forEach(function(feature) { //iterate through the dataset
                var campuspartner = feature.properties["Campus Partner"] //get the campus partner
                if (campuspartner.includes(value)) { // if the partner has that campus partner
                    feature.properties["campustest"] = 1 // assign this value 1
                } else {
                    feature.properties["campustest"] = 0 //if not, assign this value 0
                }
            })
            map.getSource('communityData').setData(communityData) // update the dataset
            communityData.features.forEach(function(feature) { //iterate through the dataset and draw the layers again
                var primary = feature.properties["Mission Area"];
                for (var i = 0; i < Missionarea.length; i++) {
                    if (primary == Missionarea[i]) {
                        layerID = showlist[i];
                        if (!map.getLayer(layerID)) {
                            map.addLayer({
                                "id": layerID,
                                "type": "circle",
                                "source": "communityData",
                                "paint": {
                                    "circle-radius": 8,
                                    "circle-opacity": 1,
                                    "circle-color": colorcode[i],
                                },
                                "filter": ["all", ["==", "Mission Area", primary]]
                            })
                        }
                    }
                }
            })
            for (var j = 0; j < showlist.length; j++) { // filter the map with campustest being 1
                map.setFilter(showlist[j], ["all", ["==", "Mission Area", Missionarea[j]],
                    ["==", "campustest", 1]
                ])
            }
        }
    })

    //*********************************** Academic Year filter *****************************************************

    var selectYear = document.getElementById('selectYear'); //same concept as campus partner. Just for years
    selectYear.addEventListener("change", function(e) {
        var value = e.target.value.trim();
        if (!yearlist.includes(value)) {
            for (var i = 0; i < showlist.length; i++) {
                map.setFilter(showlist[i], ["all", ["==", "Mission Area", Missionarea[i]]])
            }
        } else {
            communityData.features.forEach(function(feature) {
                var year = feature.properties["Academic Year"]
                if (year.includes(value)) {
                    feature.properties["yeartest"] = 1
                } else {
                    feature.properties["yeartest"] = 0
                }
            })
            map.getSource('communityData').setData(communityData)
            communityData.features.forEach(function(feature) {
                var primary = feature.properties["Mission Area"];
                for (var i = 0; i < Missionarea.length; i++) {
                    if (primary == Missionarea[i]) {
                        layerID = showlist[i];
                        if (!map.getLayer(layerID)) {
                            map.addLayer({
                                "id": layerID,
                                "type": "circle",
                                "source": "communityData",
                                "paint": {
                                    "circle-radius": 8,
                                    "circle-opacity": 1,
                                    "circle-color": colorcode[i],
                                },
                                "filter": ["all", ["==", "Mission Area", primary]]
                            })
                        }
                    }
                }
            })
            for (var j = 0; j < showlist.length; j++) {
                map.setFilter(showlist[j], ["all", ["==", "Mission Area", Missionarea[j]],
                    ["==", "yeartest", 1]
                ])
            }
        }
    })

    //*********************************** District filter *****************************************************

    var selectDistrict = document.getElementById('selectDistrict');
    selectDistrict.addEventListener("change", function(e) {
        var value = e.target.value.trim().toLowerCase();
        value = parseInt(value)
        if (isNaN(value)) {
            for (var i = 0; i < showlist.length; i++) {
                map.setFilter(showlist[i], ["all", ["==", "Mission Area", Missionarea[i]]])
            }
            // get the number of markers that fit the requirement and show on the HTML
            var totalnumber = ''
            var quantity = calculation()
            totalnumber += quantity
            $('#totalnumber').html(totalnumber)

        } else {
            for (var j = 0; j < showlist.length; j++) {
                map.setFilter(showlist[j], ["all", ["==", "Mission Area", Missionarea[j]],
                    ["==", "Legislative District Number", value]
                ])
            }
            // get the number of markers that fit the requirement and show on the HTML
            var totalnumber = '';
            var number = 0;
            communityData.features.forEach(function(e) {
                if (e.properties['Legislative District Number'] == value) {
                    number += 1;
                }
            })
            var totalnumber = ''
            var quantity = calculation()
            totalnumber += quantity
            $('#totalnumber').html(totalnumber)

        }

    })

    //*********************************** Search function *****************************************************
    var valueFilter = document.getElementById("valueFilter");

    //Press the listening button
    valueFilter.addEventListener("keydown", function(e) {
        if (e.keyCode == 8) {
            for (var j = 0; j < Missionarea.length; j++) {
                map.setFilter(showlist[j], ["==", "Mission Area", Missionarea[j]]);
            }
        }
    });

    // the listening button off

    valueFilter.addEventListener("keyup", function(e) {
        //get the input value
        var value = e.target.value.trim().toLowerCase();

        if (value == "") {
            renderListings([]);
        } else {
            //get geojosn data from the map
            var cmValue = [];
            for (var j = 0; j < Missionarea.length; j++) {
                cmValue[j] = map.queryRenderedFeatures({
                    layers: [showlist[j]]
                });
            }
            var filtered = [];
            var filtereds = [];
            for (var j = 0; j < Missionarea.length; j++) {
                filtered[j] = cmValue[j].filter(function(feature) {
                    var name = normalize(feature.properties.CommunityPartner);
                    return name.indexOf(value) == 0;
                });
                filtereds = filtereds.concat(filtered[j]);
            }

            console.log(filtereds);
            renderListings(filtereds);

            for (var j = 0; j < Missionarea.length; j++) {
                if (filtered[j].length > 0) {
                    map.setFilter(showlist[j], ['match', ['get', 'id'], filtered[j].map(function(feature) {
                        console.log(feature.properties.id);
                        return feature.properties.id;
                    }), true, false]);
                } else {
                    console.log("111111111111");
                    map.setFilter(showlist[j], ['match', ['get', 'id'], -1, true, false]);
                }
            }

        }
    });

})


//***********************************search function*****************************************************
function normalize(string) {
    return string.trim().toLowerCase();
}


function renderListings(features) {
    var parent = document.getElementById("sidebar");
    console.log(parent);
    var listings = document.getElementById("listings");
    console.log(listings);
    if (listings != null) {
        parent.removeChild(listings);
    }


    if (features.length) {

        listings = document.createElement("div");
        console.log(listings);
        listings.setAttribute("id", "listings");
        listings.setAttribute("class", "listings");

        parent.appendChild(listings);
        listings.innerHTML = '';

        var i = 0;

        features.forEach(function(feature) {
            listings.style.display = 'block';

            var prop = feature.properties;
            var description = parseDescription(prop);

            var listing = listings.appendChild(document.createElement('div'));
            listing.className = 'item';
            listing.id = 'listing-' + i;

            var link = listing.appendChild(document.createElement('a'));
            link.href = '#';
            link.className = 'title';
            link.dataPosition = i;
            link.innerHTML = prop.CommunityPartner;
            link.addEventListener('click', function(e) {
                // Update the currentFeature to the store associated with the clicked link
                var clickedListing = features[this.dataPosition];
                // 1. Fly to the point associated with the clicked link
                flyToStore(clickedListing);
                // 2. Close all other popups and display popup for clicked store
                createPopUp(clickedListing);
                // 3. Highlight listing in sidebar (and remove highlight for all other listings)
                var activeItem = document.getElementsByClassName('active');
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                this.parentNode.classList.add('active');
            });


            //			var details = listing.appendChild(document.createElement('div'));
            //			details.innerHTML = description;
            i++;
        });

    } else {
        var empty = document.createElement('p');
        empty.textContent = 'Drag the map to populate results';
        listings.appendChild(empty);
        listings.style.display = 'none';
    }
}

//***********************************filter by clickable legends*****************************************************


var edu = document.getElementById("all"); //get the total number of dots
edu.addEventListener("click", function(e) {
    showlist.forEach(function(com) {
        map.setLayoutProperty(com, 'visibility', 'visible');
    })
    var totalnumber = ''
        // var number = 0
        // communityData.features.forEach(function(e) {
        //     console.log(Missionarea[i])
        //     if (e.properties['Mission Area'] == clickedValue) {
        //         number += 1
        //     }
        // })
    totalnumber += communityData.features.length
    $('#totalnumber').html(totalnumber);
})

$('#legend a').click(function(e) { //filter dots by mission areas and show the number
    var clickedValue = $(e.target).text(); //get the value from the choice
    console.log(clickedValue)
    var i = Missionarea.indexOf(clickedValue);
    if (i > -1) {
        var show = showlist[i];
        showlist.forEach(function(com) {
            if (com == show) {
                map.setLayoutProperty(com, 'visibility', 'visible');
                // var features1 = map.queryRenderedFeatures({layers: [showlist[i]]});
                // console.log(features1)
            } else {
                map.setLayoutProperty(com, 'visibility', 'none');
            }
        })



        // var totalnumber = ''
        // var number = 0
        // communityData.features.forEach(function(e) {
        //     console.log(Missionarea[i])
        //     if (e.properties['Mission Area'] == clickedValue) {
        //         number += 1
        //     }
        // })
        var totalnumber = ''
        var number = calculation()
        totalnumber += number
        $('#totalnumber').html(totalnumber)
    }
});
//
function calculation() {
    var features1 = map.queryRenderedFeatures({
        layers: showlist
    });
    return features1.length
}