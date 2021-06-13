import React, { useEffect, useState } from 'react';
import WindowedSelect from "react-windowed-select";

export default ({ dataSources, campaigns, onFilter }) => {
    const [state, setState] = useState({
        dataSources: [],
        campaigns: [],
        filters: {
            dataSources: [],
            campaigns: []
        }
    });

    const onChange = name => values => {
        setState({
            ...state,
            filters: {
                ...state.filters,
                [name]: values
            }
        });
    };

    useEffect(() => {
        setState({
            ...state,
            dataSources,
            campaigns
        });
    }, [dataSources, campaigns]);

    return (
        <>
            <label>Datasource</label>
            <WindowedSelect
                options={state.dataSources}
                isMulti
                closeMenuOnSelect={false}
                className={'filter'}
                name={'dataSources'}
                onChange={onChange('dataSources')}
                values={state.filters.dataSources}
            />
            <label>Campaign</label>
            <WindowedSelect
                options={state.campaigns}
                isMulti
                closeMenuOnSelect={false}
                className={'filter'}
                name={'campaigns'}
                values={state.filters.campaigns}
                onChange={onChange('campaigns')}
            />
            <button onClick={e => onFilter(state.filters)}>Apply</button>
        </>
    );
}