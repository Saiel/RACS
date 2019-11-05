export type Schema<T> = Array<[keyof T, string]>;

export const UserSchema: Schema<User> = [
  ['u_id', 'ID'],
  ['email', 'E-mail'],
  ['first_name', 'Имя'],
  ['last_name', 'Фамилия'],
  ['patronymic', 'Отчество'],
  ['card_id', 'ID карточки'],
  ['role', 'Роль'],
  ['is_superuser', 'Главный администратор'],
];

export const LogSchema: Record<string, string> = {
  l_id: 'Замок',
  u_id: 'Пользователь',
  try_time: 'Время',
  result: 'Результат',
};

export const LockSchema: Record<string, string> = {
  l_id: 'ID',
  description: 'Описание',
  version: 'Версия',
  is_on: 'Замок активен',
}

export const LockAccessSchema: Record<string, string> = {
  lock: 'Замок',
  user: 'Пользователь',
  access_start: 'Начало',
  access_stop: 'Окончание',
  card_id: 'ID карточки',
}