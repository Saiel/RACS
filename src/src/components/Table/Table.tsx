import React from 'react';

import './Table.css';

interface TableProps {
  headerFields: string[];
  entries: JSX.Element[];
}

const Table: React.FC<TableProps> = ({ headerFields, entries }) => {
  return (
    <div className="Table">
      <div className="Table-Row Table-Header">
        { headerFields.map((field, idx) => 
            <div className="Table-Item" key={idx}>{field}</div>
          ) }
      </div>
      { entries.map((Entry, idx) => { 
            return (
              <div className="Table-Row" key={idx}>
                {Entry}
              </div> 
            )
          }
        ) 
      }
    </div>
  )
}

export default Table;