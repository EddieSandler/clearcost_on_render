import React, { useState } from 'react';
import axios from 'axios';

function DataQueryForm() {
    const [inputs, setInputs] = useState({
        procedure_id: '',
        facility_id: ''
    });
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputs.procedure_id || !inputs.facility_id) {
            setError('Both Procedure ID and Facility ID are required');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/search', {
                params: {
                    procedureId: inputs.procedure_id,
                    planId: inputs.plan_id
                }
            });
            setResponse(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
            setIsLoading(false);
            setResponse(null);
        }
    };

    return (
        <div>
            <h1>Search Data</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Procedure ID:
                    <input
                        type="text"
                        name="procedure_id"
                        value={inputs.procedure_id}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    facility:
                    <input
                        type="text"
                        name="facility_id"
                        value={inputs.facility_id}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Response</h2>
                    <h2><pre>{JSON.stringify(response, null, 2)}</pre></h2>
                </div>
            )}
        </div>
    );
}

export default DataQueryForm;
