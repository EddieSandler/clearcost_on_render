import React, { useState } from 'react';
import axios from 'axios';

function ProcedureQueryForm() {
    const [procedureId, setProcedureId] = useState('');
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProcedureId(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!procedureId) {
            setError('Procedure ID is required');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            console.log(`Sending request with procedureId: ${procedureId}`);
            const result = await axios.get('http://localhost:3000/test', {
                params: { procedureId }
            });
            console.log('Received response:', result);
            setResponse(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(`Server responded with status ${error.response.status}: ${error.response.data.error}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request data:', error.request);
                setError('No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                setError('Error in setting up the request');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Search Procedure Data</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Procedure ID:
                    <input
                        type="text"
                        name="procedureId"
                        value={procedureId}
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

export default ProcedureQueryForm;
