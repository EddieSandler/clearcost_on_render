import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import InsuranceForm from './InsuranceForm';
import SpecialtySelector from './SpecialtySelector';
import ProcedureSelector from './ProcedureSelector';

function MainComponent() {
    const [section, setSection] = useState(1);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedProcedure, setSelectedProcedure] = useState('');

    const handleSelectSpecialty = (specialty) => {
        setSelectedSpecialty(specialty);
        setSection(3);
    };

    const handleProcedureSelect = (procedure) => {
        setSelectedProcedure(procedure);
        // Move to confirmation or next relevant section
        console.log(`Selected procedure: ${procedure}`);
    };

    return (
        <Container>
            {section === 1 && <InsuranceForm onNext={() => setSection(2)} />}
            {section === 2 && <SpecialtySelector onSelectSpecialty={handleSelectSpecialty} />}
            {section === 3 && <ProcedureSelector specialty={selectedSpecialty} onProcedureSelect={handleProcedureSelect} />}
        </Container>
    );
}

export default MainComponent;
