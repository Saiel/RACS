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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          uuid
          <input
            type="text"
            value={formState.uuid}
            name="uuid"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Описание
          <input
            type="text"
            value={formState.description}
            name="description"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Версия
          <input
            type="text"
            value={formState.version}
            name="version"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Замок включен (одобрен)
          <input
            type="checkbox"
            checked={formState.is_approved}
            name="is_approved"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <button>Сохранить</button>
    </form>
  );
};

export default LockForm;
