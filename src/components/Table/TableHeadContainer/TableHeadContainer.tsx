import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

const tableHeadRowTitles = {
  history: [
    'Дата створення',
    'За подією',
    "За ім'ям",
    "Ім'я користувача",
    'Роль користувача',
    "Об'єкт дії",
    'Деталі',
  ],
  historyDetails: ['Перед змінами', 'Після змін'],
  mainPageOrders: ['Дата', 'Вартість товару', 'Номер замовлення'],
  news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
  categories: ['Зображення', 'Категорія', 'Дії'],
  patterns: ['Фото', 'Назва', 'Матеріал', 'Доступний', 'Дії'],
  businessPages: ['№', 'Код', 'Заголовок', 'Дії'],
  questionsAnswers: ['№', 'Питання', 'Дії'],
  materials: ['Назва', 'Застосування', 'Колір', 'Доступний', 'Дії'],
  materialColors: ['Фото', 'Повна назва', 'Коротка назва', 'Доступний', 'Дії'],
  products: [
    'Фото',
    'Назва',
    'Категорія',
    'Модель',
    'Гобелен',
    'Ціна(грн)',
    'Рейтинг',
    'Кількість покупок',
    'Дії',
  ],
  categoryName: ['№', 'Мова', 'Назва', 'Дії'],
  categoryImages: ['№', 'Розмір', 'Посилання', 'Дії'],
  users: {
    userTab: [
      'Аватар',
      "Ім'я",
      'Мобільний номер',
      'Пошта',
      'Роль',
      'Статус',
      'Дії',
    ],
    adminTab: ['Аватар', "Ім'я", 'Пошта', 'Роль', 'Дії'],
    orderTab: [
      'Дата',
      'Номер замовлення',
      'Вартість товару',
      'Статус оплати',
      'Статус замовлення',
      'Дії',
    ],
    commentTab: [
      'Дата',
      'Текст',
      'Видимий',
      'Кількість відповідей',
      'Продукт',
      'Дії',
    ],
    commentReplyTab: [
      'Дата',
      'Текст',
      'Видимий',
      'Перевірене замовлення',
      'Дії',
    ],
  },
  contacts: ['Номер телефону', 'Email', 'Адреса', 'Дії'],
  orderProductTitles: ['№', 'Назва', 'Кількість', 'Розмір', 'Ціна', 'Деталі'],
  comments: {
    commentPageTitles: [
      'Дата',
      'Пошта',
      'Текст',
      'Видимий',
      'Кількість відповідей',
      'Дії',
    ],
    userPageTitles: ['Дата', 'Текст', 'Дії'],
    recentCommentsPageTitle: ['Дата', "Ім'я користувача", 'Текст'],
  },
  replyComments: {
    replyCommentsPageTitles: ['Дата', 'Пошта', 'Текст', 'Видимий', 'Дії'],
  },
  emailQuestions: [
    '#',
    'Дата',
    'Користувач',
    'Поштова скринька',
    'Запитання/Відповідь',
    'Статус',
    'Дії',
  ],
  sizes: {
    sizesPageTitles: ['Назва', 'Розмір', 'Доступно', 'Дії'],
  },
  models: [
    'Фото',
    'Назва',
    'Категорія',
    'Доступна',
    'В конструкторі',
    'Пріорітет',
    'Дії',
  ],
  headers: ['Назва', 'Пріорітет', 'Посилання', 'Дії'],
  orders: [
    'Дата',
    'Номер замовлення',
    'Користувач',
    'Отримувач',
    'Вартість товару',
    'Статус оплати',
    'Статус замовлення',
    'Дії',
  ],
  homePageSlides: ['Порядок', 'Назва', 'Доступний', 'Дії'],
  actionLabel: 'Дії',
  constructor: ['Колір', 'Назва', 'Матеріал', 'Доступний', 'Дії'],
  pockets: ['Зображення', 'Назва', 'Додаткова ціна (USD)', 'Доступний', 'Дії'],
  backs: [
    'Фото',
    'Назва',
    'Матеріал',
    'Колір',
    'Ціна (USD)',
    'Доступний',
    'Дії',
  ],
  bottoms: [
    'Фото',
    'Назва',
    'Матеріал',
    'Колір',
    'Ціна (USD)',
    'Доступний',
    'Дії',
  ],
  constructorElementList: [
    'Вибрати',
    'Фото',
    'Назва',
    'Ціна (USD)',
    'Доступність',
  ],
  constructorList: ['Фото', 'Модель', 'Дії'],
  constructorPocketList: ['Фото', 'Назва', 'Позиція', 'Ціна (USD)', 'Дії'],
  basics: [
    'Фото',
    'Назва',
    'Матеріал',
    'Колір',
    'Ціна (USD)',
    'Доступна',
    'Дії',
  ],
  positions: ['Назва', 'Доступний', 'Дії'],
  closures: ['Фото', 'Назва', 'Ціна (USD)', 'Доступний', 'Дії'],
  straps: [
    'Зображення',
    'Назва',
    'Колір',
    'Додаткова ціна (USD)',
    'Доступний',
    'Дії',
  ],
};

export const TableContainerHead = ({ titles }: { titles: string[] }) => {
  const headRow = titles.map(title => (
    <TableCell variant="head" key={title}>
      {title}
    </TableCell>
  ));

  return (
    <TableHead>
      <TableRow>{headRow}</TableRow>
    </TableHead>
  );
};
