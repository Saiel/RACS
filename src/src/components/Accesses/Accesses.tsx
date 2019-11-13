import React, { useState, useEffect } from 'react';
import { APIResponse } from 'api/apiRequest';
import AccessList from 'components/AccessList/AccessList';
import { apiGet } from 'api';

const Accesses: React.FC = () => {
  const [accessList, setAccessList] = useState<APIResponse<LockAccess> | null>(null);

  useEffect(() => {
    apiGet<LockAccess>('accesses')
    .then((json) => setAccessList(json));
  }, []);

  return (
    <div>
      <div>Список доступов</div>
      { accessList && <AccessList accesses={accessList.results} /> }
    </div>
  );
};

export default Accesses;
