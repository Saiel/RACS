import React, { useState, useEffect } from 'react';
import { APIResponse } from 'api/apiRequest';
import AccessList from 'components/AccessList/AccessList';
import { apiGet } from 'api';

import './Accesses.scss';

const Accesses: React.FC = () => {
  const [accessList, setAccessList] = useState<APIResponse<LockAccess> | null>(null);

  useEffect(() => {
    apiGet<LockAccess>('accesses')
    .then((json) => { console.log(json); setAccessList(json) });
  }, []);

  return (
    <div className="Accesses Layout">
      <div className="Page-Title">Список доступов</div>
      { accessList && <AccessList accesses={accessList.results} /> }
    </div>
  );
};

export default Accesses;
