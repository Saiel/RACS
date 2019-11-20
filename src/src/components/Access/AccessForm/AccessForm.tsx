import React, { useCallback, useState, ChangeEventHandler } from 'react';

interface Props {
  lockAccess?: LockAccessPOST;
  users: User[];
  locks: Lock[];
  onSubmit: (state: FormData) => void;
}

const defaultLockAccess: LockAccessPOST = {
  access_start: '',
  access_stop: '',
  lock: 0,
  user: 0,
};

function parseDateTime(dt: string) {
  const [date, time] = dt.split(' ');
  const [day, month, year] = date.split('.');
  const [hours, minutes] = time.split(':');
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

const LockAccessForm: React.FC<Props> = ({ lockAccess = defaultLockAccess, onSubmit, users, locks }) => {
  const [formState, setFormState] = useState<LockAccessPOST>({ ...lockAccess });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      const access_start = data.get('access_start');
      const access_stop = data.get('access_stop');
      if (access_start) data.set('access_start', new Date(Date.parse(parseDateTime(access_start as string))).toISOString()); 
      if (access_stop) data.set('access_stop', new Date(Date.parse(parseDateTime(access_stop as string))).toISOString()); 
      onSubmit(data);
    },
    [onSubmit],
  );

  const handleFieldChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Пользователь
          <select name="user" value={formState.user} onChange={handleFieldChange} required={true}>
            {users.map((user) => <option key={user.u_id} value={user.u_id}>{`${user.first_name} ${user.last_name} (${user.email})`}</option>)}
          </select>
        </label>
      </div>
      <div>
        <label>
          Замок
          <select name="lock" value={formState.lock} onChange={handleFieldChange} required={true}>
            {locks.map((lock) => <option key={lock.l_id} value={lock.l_id}>{lock.description}</option>)}
          </select>
        </label>
      </div>
      <div>
        <label>
          Начало
          <input
            type="text"
            value={formState.access_start}
            name="access_start"
            placeholder="дд.мм.гг часы:минуты"
            onChange={handleFieldChange}
            required={true}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Окончание
          <input
            type="text"
            value={formState.access_stop}
            name="access_stop"
            placeholder="дд.мм.гг часы:минуты"
            onChange={handleFieldChange}
            required={true}
          ></input>
        </label>
      </div>
      <button>Сохранить</button>
    </form>
  );
};

export default LockAccessForm;
