import React from 'react';
import { Flag } from 'lucide-react';

const Prioridades = ({ priority }) => {
  const iconColors = {
    Alta: '#FF6B6B',    // Vermelho para Alta
    Media: '#FCA311',   // Laranja para Média
  };

  return (
    <Flag 
      color={iconColors[priority]} 
      size={24} 
      strokeWidth={2}
    />
  );
};

export default Prioridades;