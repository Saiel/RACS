import React, { useCallback, useState, useEffect, ChangeEventHandler } from 'react';
import { getRoles } from 'api';
import { validateUser } from 'validation/validators';

interface Props {
  user?: UserPOST;
  onSubmit: (state: FormData) => void;
}

const defaultUser: UserPOST = {
  first_name: '',
  last_name: '',
  patronymic: '',
  card_id: '',
  email: '',
}

const UserForm: React.FC<Props> = ({ user = defaultUser, onSubmit }) => {
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

  const handleFieldChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
        </label>
        <input
          type="text"
          value={formState.first_name}
          name="first_name"
          onChange={handleFieldChange}
          required={true}
        ></input>
      </div>
      <div>
        <label>
          Отчество
        </label>
        <input
          type="text"
          value={formState.patronymic}
          name="patronymic"
          onChange={handleFieldChange}
        ></input>
      </div>
      <div>
        <label>
          Фамилия
        </label>
        <input
          type="text"
          value={formState.last_name}
          name="last_name"
          onChange={handleFieldChange}
          required={true}
        ></input>
      </div>
      <div>
        <label>
          E-Mail
        </label>
        <input
          type="email"
          value={formState.email}
          name="email"
          onChange={handleFieldChange}
          required={true}
        ></input>
      </div>
      <div>
        <label>
          ID карточки
        </label>
        <input
          type="text"
          value={formState.card_id}
          name="card_id"
          onChange={handleFieldChange}
          required={true}
        ></input>
      </div>
      <div>
        <label>
          Роль
        </label>
        <select name="role" value={formState.role} onChange={handleFieldChange} required={true}>
          {roles.map((role) => (
            <option key={role.r_id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div className="Form-Submit">
        <button className="Btn Btn_add">Сохранить</button>
      </div>
    </form>
  );
};

export default UserForm;
