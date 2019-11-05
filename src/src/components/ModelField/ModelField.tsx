import React, { useMemo, ReactText } from 'react';

import './ModelField.css';

interface ModelFieldProps {
  field: string;
  value: string | number | boolean | undefined;
}

const ModelField: React.FC<ModelFieldProps> = ({ field, value }) => {
  const val = useMemo<ReactText>(() => {
    if (typeof value === 'undefined') {
      return '';
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Да' : 'Нет';
    }

    return value;
  }, [value]);

  return (
    <div className="ModelField">
      <div className="ModelField-Field">{field}</div>
      <div className="ModelField-Value">
        {val}
      </div>
    </div>
  )
}

export default ModelField;
