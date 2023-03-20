import axios from "axios";



const options = {
  method: 'GET',
  url: 'https://marvel-quote-api.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Key': 'dc93ee594cmsh3d384c14d13a9edp19dd7fjsn4cb68636655f',
    'X-RapidAPI-Host': 'marvel-quote-api.p.rapidapi.com'
  }
};

const getQuote = () => {
    axios.request(options).then(function (response) {
	return response.data.Quote
}).catch(function (error) {
	console.error(error);
});
}


export default getQuote

