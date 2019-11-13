import React, { useCallback, useState, useEffect } from 'react';
import { getRoles } from 'api';
import { validateUser } from 'validation/validators';

interface Props {
  user: UserPOST;
  onSubmit: (state: FormData) => void;
}

const UserForm: React.FC<Props> = ({ user, onSubmit }) => {
  const [formState, setFormState] = useState<UserPOST>({ ...user });
  const [roles, setRoles] = useState<Role[]>([]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    if (!validateUser(data)) {
      alert('Проверьте корректность введенных данных');
      return;
    }

    onSubmit(data);    
  }, [onSubmit]);

  const handleFieldChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value }); 
  }, [setFormState]);

  useEffect(() => {
    async function fetchRoles() {
      const response = await getRoles();

      setRoles(response.results);
    }

    fetchRoles();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Имя
          <input
            type="text"
            value={formState.first_name}
            name="first_name"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Отчество
          <input
            type="text"
            value={formState.patronymic}
            name="patronymic"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Фамилия
          <input
            type="text"
            value={formState.last_name}
            name="last_name"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          E-Mail
          <input
            type="email"
            value={formState.email}
            name="email"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          ID карточки
          <input
            type="text"
            value={formState.card_id}
            name="card_id"
            onChange={handleFieldChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Роль
          <select name="role" value={formState.role}>
            {roles.map((role) => (
              <option key={role.r_id} value={role.name}> 
                {role.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button>Сохранить</button>
    </form>
  );
};

export default UserForm;
