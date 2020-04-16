import './UserForm.css';

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
  const [loadError, setLoadError] = useState<Error | null>(null);
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

    try {
      fetchRoles();
    } catch (error) {
      setLoadError(error);
    }
  }, []);

  if (loadError) {
    throw loadError;
  }

  return (
    <div className="UserFormWithHeader">
        <label className="LabelHeader">Добавление пользователя</label>
        <div className="Overlay-Content">
    <form onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="Фамилия*"
          type="text"
          value={formState.last_name}
          name="last_name"
          onChange={handleFieldChange}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder="Имя*"
          type="text"
          value={formState.first_name}
          name="first_name"
          onChange={handleFieldChange}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder="Отчество"
          type="text"
          value={formState.patronymic}
          name="patronymic"
          onChange={handleFieldChange}
        ></input>
      </div>
      
      <div>
        <input
          placeholder="E-mail*"
          type="email"
          value={formState.email}
          name="email"
          onChange={handleFieldChange}
          required={true}
        ></input>
      </div>
      <div className="InLine">
        <div>
          <input
            className="InpCompact"
            placeholder="ID-карты*"
            type="text"
            value={formState.card_id}
            name="card_id"
            onChange={handleFieldChange}
            required={true}
          ></input>
        </div>
        <div>
          <select name="role" value={formState.role} onChange={handleFieldChange}>
              <option>Роль</option>
              <option>Студент</option>
              <option>Сотрудник</option>
          </select>
        </div>
      </div>
      <div className="Form-Submit">
        <button className="Btn Btn_add">Сохранить</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default UserForm;
