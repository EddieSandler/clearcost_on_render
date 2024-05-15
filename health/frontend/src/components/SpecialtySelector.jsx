import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

function SpecialtySelector({ onSelectSpecialty }) {
  const specialties = [
    "Cardiac Diagnostics",
    "Cardiac Surgery",
    "Cardiac-Intervention",
    "General Surgery",
    "Gynecology",
    "Laboratory Services",
    "Neurosurgery",
    "Obstetrics",
    "Office Visit",
    "Ophthalmology",
    "Orthopedic Surgery",
    "Orthopedics",
    "Otolaryngology",
    "Physical Therapy",
    "Psychotherapy",
    "Radiology",
    "Sleep Diagnostics",
    "Spinal Surgery",
    "Thoracic Surgery"
  ];

  return (
    <List component="nav">
      {specialties.map((specialty, index) => (
        <React.Fragment key={specialty}>
          <ListItem button onClick={() => onSelectSpecialty(specialty)}>
            <ListItemText primary={specialty} />
          </ListItem>
          {index < specialties.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

export default SpecialtySelector;
