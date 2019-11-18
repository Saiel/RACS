import React, { PropsWithChildren } from 'react';

import ModelField from 'components/ModelField/ModelField';

export interface Props {
  lock: Lock 
}

const LockInfo: React.FC<PropsWithChildren<Props>> = ({ lock }) => {
  return (
    <div className="Flex">
      <ModelField field='ID' value={lock.l_id} />
      <ModelField field='Описание' value={lock.description} />
      <ModelField field='Версия' value={lock.version} />
      <ModelField field='Замок включен (одобрен)' value={lock.is_approved} />
    </div>
  );
};

export default LockInfo;
