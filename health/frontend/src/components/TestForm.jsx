import React, { useState } from 'react';
import axios from 'axios';

function DataQueryForm() {
    const [inputs, setInputs] = useState({
        procedureId: '',
        facilityId: ''
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
        if (!inputs.procedureId || !inputs.facilityId) {
            setError('Both Procedure ID and Facility ID are required');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/search', {
                params: {
                    procedureId: inputs.procedureId,
                    facilityId: inputs.facilityId
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
                        name="procedureId"
                        value={inputs.procedureId}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Facility ID:
                    <input
                        type="text"
                        name="facilityId"
                        value={inputs.facilityId}
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
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default DataQueryForm;
