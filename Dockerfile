#FROM node:14-alpine
#
## устанавливаем простой HTTP-сервер для статики
#RUN npm config set strict-ssl false
#RUN npm install -g http-server --unsafe-perm
#
## делаем каталог 'app' текущим рабочим каталогом
#WORKDIR /app
#
## копируем оба 'package.json' и 'package-lock.json' (если есть)
#COPY package*.json ./
#
## устанавливаем зависимости проекта
#RUN npm install --registry=https://registry.npmjs.org
#
## копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
#COPY . .
#
## собираем приложение для production с минификацией
#RUN npx browserslist@latest --update-db
#RUN npm run build
#
#EXPOSE 8080
#CMD ["http-server", "dist"]

FROM node:14-alpine

# Устанавливаем простой HTTP-сервер для статики
RUN npm config set strict-ssl false
RUN npm install -g http-server --unsafe-perm

# Делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# Копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install --registry=https://registry.npmjs.org

# Копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# Собираем приложение для production с минификацией
RUN npm run build

# Обновляем базу данных браузеров
RUN npx browserslist@latest --update-db
RUN npm install -g serve
# Публикуем порт 8080
EXPOSE 8070

# Запускаем HTTP-сервер и обслуживаем каталог dist
CMD ["serve", "-s", "dist", "-l", "8070"]
