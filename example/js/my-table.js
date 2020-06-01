document.addEventListener("DOMContentLoaded", function () {
  let table = new TableDrag(
    ["Фамилия", "Имя", "Год рождения", "Адрес"],
    [
      {
        lastName: "Маккарти",
        firstName: "Джон",
        year: "1927",
        adress: "Бостон",
      },
      {
        lastName: "Кэй",
        firstName: "Алан Кёртис",
        year: "1940",
        adress: "Массачусетс",
      },
      {
        lastName: "Вирт",
        firstName: "Никлаус",
        year: "1934",
        adress: " Цюрих",
      },
      {
        lastName: "Гослинг",
        firstName: "Джеймс",
        year: "1955",
        adress: "Калгари",
      },
      {
        lastName: "Ван Россум",
        firstName: "Гвидо",
        year: "1956",
        adress: "Харлем",
      },
      {
        lastName: "Кнут",
        firstName: "Дональд",
        year: "1938",
        adress: "Висконсин",
      },
      {
        lastName: "Кармак",
        firstName: "Джон",
        year: "1970",
        adress: "Канзас",
      },
      {
        lastName: "Паттерсон",
        firstName: "Дэвид",
        year: "1947",
        adress: "Калифорния",
      },
    ]
  );

  let data = table.build();
  table.pushTable("#my", data);

  let table2 = new TableDrag(
    ["Фамилия", "Имя", "Год рождения", "Адрес"],
    [
      {
        lastName: "Страуструп",
        firstName: "Бьёрн",
        year: "1950",
        adress: "Орхус",
      },
      {
        lastName: "Бернерс-Ли",
        firstName: "Тим",
        year: "1955",
        adress: "Лондон",
      },
      {
        lastName: "Томпсон",
        firstName: "Кен",
        year: "1943",
        adress: "Новый Орлеан",
      },
      {
        lastName: "Керниган",
        firstName: "Брайан",
        year: "1948",
        adress: "Торонто",
      },
      {
        lastName: "Бэкус",
        firstName: "Джон",
        year: "1924",
        adress: "Филадельфия",
      },
      {
        lastName: "Хоппер",
        firstName: "Грейс",
        year: "1906",
        adress: "Нью-Йорк",
      },
      {
        lastName: "Кемени",
        firstName: "Джон Джордж",
        year: "1926",
        adress: "Будапешт",
      },
      {
        lastName: "Курц",
        firstName: "Томас",
        year: "1928",
        adress: "Кук",
      },
    ]
  );

  let data2 = table2.build();
  table2.pushTable("#my2", data2);
});
