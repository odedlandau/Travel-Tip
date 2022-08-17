import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    locService.getLocs()
        .then(locs => {
            renderlocationTable(locs)

        })

    // renderlocationTable()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat,lng) {
    console.log('Panning the Map')
    mapService.panTo(lat,lng)
}

function renderlocationTable(locs) {
    var strHTMLs = locs.map(loc => {
        return `
        <tr>
            <td>${loc.id}</td>
            <td>${loc.name}</td>
            <td><button onclick="onPanTo(${loc.lat},${loc.lng})">Go there</button></td>
            <td><button>X</button></td>`
    })
    const elLocationTable = document.querySelector('.location-list')
    elLocationTable.innerHTML = strHTMLs.join('')
}



// function onGetUserPos(){
// console.log('onGetUserPos');
//     mapService.getUserPos()
// }