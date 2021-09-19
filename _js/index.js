const planetasContador    = document.getElementById('planetas');
const personagensContador = document.getElementById('personagens');
const navesContador       = document.getElementById('naves');
const luasContador        = document.getElementById('luas');

preencheCont();
preencheTabe();

async function preencheTabe() {
	const response = await getReq('films/');
	const tableData = response.data.results;

	tableData.forEach(film => {
		$('#films-table').append(
			`<tr>
				<td>${film.title}</td>
				<td>${moment(film.release_date).format('DD/MM/YYYY')}</td>
				<td>${film.director}</td>
				<td>${film.episode_id}</td>
			</tr>`
		);
	})
}

function preencheCont() {
	Promise.all([getReq('planets/'), getReq('people/'), getReq('starships/'), getReq('vehicles/')])
		.then(function (response) {
			planetasContador.innerHTML    = response[0].data.count;
			personagensContador.innerHTML = response[1].data.count;
			navesContador.innerHTML       = response[2].data.count;
			luasContador.innerHTML        = response[3].data.count;
		});
}

function getReq(params) {
	return axios.get(`https://swapi.dev/api/${params}`);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
	const response = await getReq('vehicles/');
	const vehiclesArray = response.data.results;

	const dataArray = [];
	dataArray.push(["Veículos", "Passageiros"]);

	vehiclesArray.forEach(vehicle => {
		dataArray.push([vehicle.name, Number(vehicle.passengers)]);
	});

	var data = google.visualization.arrayToDataTable(dataArray);

	var options = {
		title: 'Maiores veículos',
		legend: 'none'
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
}
