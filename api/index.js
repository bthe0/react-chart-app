const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const moment = require('moment');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/**
 * Format data
 */

let data = require('./data.json');

/**
 * Convert dates to week range
 * to better display data inside chart
 */

data = data.map(entry => {
    entry.Date = moment(entry.Date, 'DD.MM.YYYY').startOf('week').format('DD.MM.YYYY');
    return entry;
});
const dataSources = _.chain(data).map(entry => entry.Datasource).uniq();
const campaigns = _.chain(data).map(entry => entry.Campaign).uniq();

app.get('/dataSources', (req, res) => res.json(dataSources));
app.get('/campaigns', (req, res) => res.json(campaigns));
app.get('/stats', (req, res) => {
    const { dataSources, campaigns } = req.query
    let result = _.chain(data).filter(entry => {
        let includesDataSource = true;
        let includesCampaign = true;

        if (dataSources && dataSources.length) {
            includesDataSource = dataSources.includes(entry.Datasource);
        }

        if (campaigns && campaigns.length) {
            includesCampaign = campaigns.includes(entry.Campaign);
        }

        return includesDataSource && includesCampaign;
    }).groupBy('Date').value();

    const days = _.keys(result);

    res.json({
        labels: days,
        clicks: days.map(key => _.sumBy(result[key], value => +value.Clicks)),
        impressions: days.map(key => _.sumBy(result[key], value => +value.Impressions))
    });
});

app.listen(8080);