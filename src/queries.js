import _ from 'lodash';
import axios from 'axios';

const client = axios.create({
    baseURL: `http://localhost:8080/`
});

export const getCampaigns = {
    queryKey: 'campaigns',
    async queryFn() {
        const { data } = await client.get('/campaigns');

        return _.map(data, entry => ({
            value: entry,
            label: entry
        }));
    }
};

export const getDataSources = {
    queryKey: 'dataSources',
    async queryFn() {
        const { data } = await client.get('/dataSources');

        return _.map(data, entry => ({
            value: entry,
            label: entry
        }));
    }
};

export const getStats = (filters = {}) => ({
    queryKey: `getStats:${JSON.stringify(filters)}`,
    async queryFn() {
        let serializedFilters = {};

        if (filters.dataSources && filters.dataSources.length) {
            serializedFilters.dataSources = filters.dataSources.map(source => source.value);
        }

        if (filters.campaigns && filters.campaigns.length) {
            serializedFilters.campaigns = filters.campaigns.map(campaign => campaign.value);
        }

        const { data } = await client.get('/stats', {
            params: serializedFilters
        });

        return {
            labels: data.labels,
            datasets: [
                {
                    label: '# of Clicks',
                    data: data.clicks,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y',
                },
                {
                    label: '# of Impressions',
                    data: data.impressions,
                    fill: false,
                    backgroundColor: 'rgb(77,122,238)',
                    borderColor: 'rgba(79,152,246,0.2)',
                    yAxisID: 'y1',
                },
            ],
        };
    },
    options: {
        enabled: false
    }
});