const express = require('express');
const app = express();
const path = require('path');
const request = require('request-promise')
const moment = require('moment');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Retrieves a list of upcoming concerts from the specified artist
 * uses Bandsintown public api
 * @param {string} req.query.artist - name of artist to return list of concerts
 * @return {Object} html list of links to concerts or error string
 */
app.get('/get', (req, res) => {
	(async function get() {
		if (!req.query.artist) {
			return res.send({err: 'Please enter artist name.'})
		}
		const data = await request({
			uri: `https://rest.bandsintown.com/artists/${encodeURIComponent(req.query.artist)}/events`,
			qs: {
				app_id: 'nm-example',
			},
			headers: {
				'User-Agent': 'Request-promise',
			},
			json: true,
		});
		if (!data.length) {
			return res.send({err: 'No events found for the specified artist.'})
		}
		let html='';
		for (const item of data) {
			html += `<a href="${item.url}" class="list-group-item">${moment(item.datetime).format("dddd, MMMM Do YYYY, h:mm a")} - ${item.venue.name} - ${item.venue.city}, ${item.venue.region || item.venue.country}</a>`
		}
		res.send({html});
	})().catch((ex) => res.send({err: ex.message || ex.name || ex}));
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
