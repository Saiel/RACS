import React, { useCallback, useState, ChangeEventHandler } from 'react';

interface Props {
  lock?: LockPOST;
  onSubmit: (state: FormData) => void;
}

const defaultLock: LockPOST = {
  description: '',
  version: '1',
  is_approved: true,
  uuid: '',
};

const LockForm: React.FC<Props> = ({ lock = defaultLock, onSubmit }) => {
  const [formState, setFormState] = useState<LockPOST>({ ...lock });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      onSubmit(data);
    },
    [onSubmit],
  );

  const handleFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: e.target.type === 'checkbox' ? e.target.checked : value,
    });
  };

  return (
    <div className="UserFormWithHeader">
        <label className="LabelHeader">Изменение данных замка</label>
        <div className="Overlay-Content">
    <form onSubmit={handleSubmit}>
      <div>
        <label className="LabelSide">uuid</label>
          <input
            className="InpCompact"
            type="text"
            value={formState.uuid}
            name="uuid"
            onChange={handleFieldChange}
          ></input>
      </div>
      <div>
        <label className="LabelSide">Описание</label>
          <input
            className="InpCompact"
            type="text"
            value={formState.description}
            name="description"
            onChange={handleFieldChange}
          ></input>
      </div>
      <div>
        <label className="LabelSide">Версия</label>
          <input
            type="text"
            className="InpCompact"
            value={formState.version}
            name="version"
            onChange={handleFieldChange}
          ></input>
      </div>
      <div>
        <label className="LabelSide">Замок включен (одобрен)</label>
          <input
            className="InpCompact"
            type="checkbox"
            checked={formState.is_approved}
            name="is_approved"
            onChange={handleFieldChange}
          ></input>
      </div>
      <button className="Btn Btn_add">Сохранить</button>
    </form>
    </div>
    </div>
  );
};

export default LockForm;
