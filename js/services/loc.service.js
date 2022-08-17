export const locService = {
    getLocs
}


const locs = [
    { id: 1, name: 'Kibutz Eilon', lat: 33.06480135516603, lng: 35.215281374047436, createdAt: Date.now(), updatedAt: Date.now() },
    { id: 2, name: 'London', lat: 51.509508157858725, lng: -0.0672295760448166, createdAt: Date.now(), updatedAt: Date.now() }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}


