const request = require("request");

const options = {
    method: "GET",
    url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
    headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "bf137a46edmsh77140ad6be59165p110988jsne3eaca2127a6"
    }
};

function requestInfo() {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) reject("we could't find anything");
            const codStats = JSON.parse(response.body);
            resolve(codStats);
        });
    })
}



function getInfoByCountry(countries_stat, country) {
    const countryStat = countries_stat.find(stat => stat.country_name === country);
    return countryStat;
}





async function search(country, next) {
    try {
        const info = await requestInfo();
        const countries_stat = info.countries_stat;
        const country_stat = getInfoByCountry(countries_stat, country);
        next(country_stat)

    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    requestInfo: requestInfo,
    getInfoByCountry: getInfoByCountry,
    search: search
}