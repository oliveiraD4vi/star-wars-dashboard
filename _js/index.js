const planetasContador = document.getElementById('planetas');
const personagensContador = document.getElementById('personagens');
const navesContador = document.getElementById('naves');
const luasContador = document.getElementById('luas');

preencheCont();

function preencheCont() {
	Promise.all([getReq('planets/'), getReq('people/'), getReq('starships/'), getReq('vehicles/')])
		.then(function (response) {
			console.log("==>", response);
			planetasContador.innerHTML    = response[0].data.count;
			personagensContador.innerHTML = response[1].data.count;
			navesContador.innerHTML       = response[2].data.count;
			luasContador.innerHTML        = response[3].data.count;
		});
}

function getReq(params) {
	return axios.get(`https://swapi.dev/api/${params}`);
}
