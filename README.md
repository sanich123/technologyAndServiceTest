# Тестовое задание ЖКХ трекер сотрудников

1. У меня на сервере много записанных активностей с геопозициями, я не стал создавать вручную JSON файл с моковыми данными, а просто получаю активности выборочных пользователей. Соответственно, при тестировании нужно иметь доступ в интернет.
2. В проекте используется yarn как пакетный менеджер, под npm/bun/pnpm не проверялось.
3. Команды запуска указываются, как в package.json, чем их запускать - на Ваш выбор (npm/bun/pnpm/yarn).
4. Папку android можно создать командой ```prebuild```. Дебаг сборка через ```android``` запускается в эмуляторе.
5. Через eas-cli сборку не собирал, только через Android Studio.
6. Запустить проект в дебаг сборку можно через ```start```.
7. Используются карты @rn-mapbox.
8. Дополнительно добавил функционал, когда происходит клик по иконке юзера на карте, выводится модальное окно с возможностью позвонить/написать ему



