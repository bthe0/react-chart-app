import React, { useEffect, useState } from "react";
import './App.css';
import Chart from './components/Chart';
import ChartFilters from './components/ChartFilters';
import { useQuery } from 'react-query';
import { getCampaigns, getDataSources, getStats } from "./queries";

const useStatsData = () => {
    const [filters, setFilters] = useState({});
    const [stats, setStats] = useState();
    const { data, isLoading } = useQuery(getStats(filters));

    useEffect(() => {
        if (data) {
            setStats(data);
        }
    }, [filters, data]);

    const filter = (filters = {}) => {
        setFilters(filters);
    };

    return {
        isLoading,
        filter,
        filters,
        data: stats
    };
};

export default () => {
  const campaigns = useQuery(getCampaigns);
  const dataSources = useQuery(getDataSources);
  const stats = useStatsData();
  const isLoading = [campaigns, dataSources].find(entry => entry.isLoading);

  if (isLoading) {
      return <p>Loading...</p>;
  }

  return (
      <>
        <ChartFilters onFilter={stats.filter} campaigns={campaigns.data} dataSources={dataSources.data} />
        <Chart data={stats.data} />
      </>
  );
};
