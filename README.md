### Простой, масштабируемый http+WebSocker сервер.
Показывает цену биткоина и статистику по воркерам.
Должен принимать рест запросы, а ответы отдавать по вебсокетам.

### Задача:

"Небольшой сервер на сокетах.
Юзер устанавливает соединение с сервером со своим уникальным id.
Сервер записывает эту сессию и id в локальный кеш.
Берем цену биткоина и кешируем так же локально, с бд не нужно заморчаиваться (дополнительно можно обновлять раз в минуту).

Делается обычный рест маршрут, чтобы можно было на сервер через post передать id юзера.
Если полученый по ресту id - уже есть в кеше, то тогда цену битка передаем в сессию, которая совпадает с id юзера.
Требования: модульность, масштабируемость. Не использовать базы данных и очереди.
Ответ по сокетами должен возвращаться тому пользователю, который инициализировал его через пост запрос."

### Реализация:

- сервер кластеризуется и встает на прослушку двух портов для http (3000) и ws соединений.
- страница генерирует id пользователя и устанавливает соединение с сервером. (Восстанавливает соединение в случае обрыва)
- на странице есть кнопка,  отправляющая на сервер POST запрос с id пользователя. Ответ приходит через ws соединение (цена биткоина).
- каждая нода кластера хранит список ws сессий у себя локально и работает по ws только со своими соединениями.
- мастер-процесс хранит ассоциацию пользователей с их нодами, к которым они привязаны
- при получении POST запроса, дочерняя нода сверяется с мастер-нодой, которая находит ws соединение пользователя и даёт команду нужной ноде отправить ответ.
- каждая страница в реалтайме отображает статистку по всем нодам. Сколько пользователей сейчас находится в кластере и на какаих нодах. (Можно открыть/закрыть несколько вкладок и посмотреть на изменения)
- не активные ws сессии регулярно проверяются и удаляются из общего списка на стороне сервера. 
- при отдаче страницы не используются щаблонизаторы и прочее. В силу своей простоты, страница отдается просто файликом по определнному url

##### Установка и запуск
- установка - npm install
- запуск -  npm run start 
- конфиги находятся в ./config и зависят от переменной окружения NODE_ENV, заданной при запуске
- http://localhost:3000 (Лучше открыть сразу много вкладок, для наглядности)




Пример кода от 2020-го года. Тут используются уже несколько устаревшие вещи.
Например деприкейтнутный модуль request, а так же отсутствуют алисы для подключения модулей




