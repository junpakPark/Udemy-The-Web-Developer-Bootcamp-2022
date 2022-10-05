// fetch('https://api.tvmaze.com/search/shows?q=girls')
//     .then(res => {
//         console.log("RESPONSE, WAITING TO PARSE...", res)
//         return res.json()
//     })
//     .then(data => {
//         console.log("DATA PARSED...")
//         console.log(data[0])
//     })
//     .catch(e => {
//         console.log("OH NO! ERROR!", e)
//     })


const fetchBitcoinPrice = async () => {
    try {
        const res = await fetch('https://api.tvmaze.com/search/shows?q=girls');
        const data = await res.json();
        console.log(data[0].show.name)
    } catch (e) {
        console.log("SOMETHING WENT WRONG!!!", e)
    }
}