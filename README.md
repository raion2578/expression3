## UPDATE END

Добавлены роуты и контроллеры для api, с JWT авторизацией, передача токена в заголовке(токен ещё можно засунуть в бд)

Для добовления своей операции необходимо добавить в параметры запроса
myOperator Символ оператора
myPriority = Приоритет операции
resultOperations = Как интерпретировать операцию относительно 2 переменных a и b 

Пример :

myOperator : '^'
myPriority : 2
resultOperations : a ** b

myOperator : '%'
myPriority : 2
resultOperations : a % b
