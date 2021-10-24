function checkBrackets(str) {
    const resultStack = [];
    let openElement = 0;

    for (let i = 0, lenS = str.length; i < lenS; i++) {
        if (str[i] === ")") {
            if (resultStack[openElement - 1] === "(") {
                resultStack.pop();
                openElement--;
            } else {
                resultStack.push(str[i]);
                openElement++;
            }
        } else {
            if (str[i] == "(") {
                resultStack.push(str[i]);
                openElement++;
            }
        }
    }

    return !resultStack.length;
}


function expressionCalculator(expr, myOperator = null, myPriority = null, resultOperations = null) {

    if ((myOperator && myPriority && resultOperations && resultOperations) == null) {
        myOperator = null;
        myPriority = null;
        resultOperations = null;
        resultOperations = null;
    }
    if (!checkBrackets(expr)) {
        return {'answer': 'Brackets Error'};
    }
    let exprArr = [];
    let mathSigns = ['+', '-', '*', '/', '(', ')'];

    if (myOperator) {
        mathSigns.push(String(myOperator));
    }

    let num = '';
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == ' ') continue;
        if (!mathSigns.includes(expr[i])) {
            num += expr[i];
        }
        if (mathSigns.includes(expr[i])) {
            if (num.length > 0) {
                exprArr.push(+num);
                num = '';
            }
            exprArr.push(expr[i]);
        }
    }
    if (num.length) exprArr.push(+num);

    //check brace balance
    let braceStack = [];
    for (let i = 0; i < exprArr.length; i++) {
        if (exprArr[i] == '(') {
            braceStack.push(exprArr[i]);
        }
        if (exprArr[i] == ')') {
            if (braceStack.length == 0) throw new Error("Brackets must be paired");
            braceStack.pop();
        }
    }
    if (braceStack.length != 0) throw new Error("Brackets must be paired");


    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };
    if (myPriority) {
        priority[myOperator] = Number(myPriority);
    }

    function calc(a, b, op) {
        if (op == '+') result = a + b;
        if (op == '-') result = a - b;
        if (op == '*') result = (a * b);
        if (op == '/') result = a / b;
        if (resultOperations) {
            if (op == myOperator) {
                result = eval(resultOperations); // Не безопасно от слово совсем и очень кастыльно
            }
        }
        if (result === Infinity) throw new Error("Division by zero.");
        return result;
    }


    let numStack = [];
    let signStack = [];

    for (let i = 0; i < exprArr.length; i++) {
        if (!mathSigns.includes(exprArr[i])) {
            numStack.push(exprArr[i]);
        } else {
            if (exprArr[i] in priority) {
                if ((signStack.length === 0) || (priority[exprArr[i]] > priority[signStack[signStack.length - 1]]) || (signStack[signStack.length - 1] === '(')) {
                    signStack.push(exprArr[i]);
                } else {
                    while (priority[exprArr[i]] <= priority[signStack[signStack.length - 1]]) {
                        let b = numStack.pop();
                        let a = numStack.pop();
                        let operation = signStack.pop();
                        let result = calc(a, b, operation);
                        numStack.push(result);
                    }
                    signStack.push(exprArr[i]);
                }
            }
            if (exprArr[i] == '(') {
                signStack.push(exprArr[i]);
            }
            if (exprArr[i] == ')') {
                while (signStack[signStack.length - 1] != '(') {
                    let b = numStack.pop();
                    let a = numStack.pop();
                    let operation = signStack.pop();
                    let result = calc(a, b, operation);
                    numStack.push(result);
                }
                signStack.pop();
            }
        }
    }


    while (signStack.length) {
        let b = numStack.pop();
        let a = numStack.pop();
        let operation = signStack.pop();
        let result = calc(a, b, operation);
        numStack.push(result);
    }
    let finalResult = numStack.pop();

    if (typeof finalResult === 'undefined' || isNaN(finalResult))
        return {'answer': "Error expression"};
    else
        return {'answer': finalResult};

}

module.exports = {
    expressionCalculator
}