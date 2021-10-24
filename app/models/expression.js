class Expression {
    #mathSigns = ['+', '-', '*', '/', '(', ')', /*'^'*/];
    #prioritys = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        //'^' : 2,
    };
    #evalForOperators = {
        //'^' : 'a ** b',
        '%' : 'a % b',
    }
    // constructor(expr) {
    //     this.expr = String(expr);
    // }
    setExpr(expr){
        this.expr = expr;
    }

    searchMyOperators(a, b, op){
        if(typeof this.#evalForOperators[op] !== 'undefined'){
            return eval(String(this.#evalForOperators[op]));
        }
        return null;
    }
    printAll(){
        console.log(this.#mathSigns);
        console.log(this.#prioritys);
        console.log(this.#evalForOperators);
    }
    addSign(sign){
        this.#mathSigns.push(String(sign));
    }
    addPrioritys(newOperator, newPriority){
        this.#prioritys[newOperator] = Number(newPriority);
    }

    addEvalOperations(sign, evalOperation){
        this.#evalForOperators[String(sign)] = String(evalOperation);
    }
     #calc(a, b, op) {
        let result = null;
        if (op == '+') result = a + b;
        if (op == '-') result = a - b;
        if (op == '*') result = (a * b);
        if (op == '/') result = a / b;
        if(result == null) result = this.searchMyOperators(a, b, op);
        //if (result === Infinity) throw new Error("Division by zero.");
        return result;
    }
    #checkBrackets(str) {
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

    printExpression(){
        console.log(this.expr);
    }

    calculate(){
        if (!this.#checkBrackets(this.expr)) {
            return {'answer': 'Brackets Error'};
        }
        let exprArr = [];
        let num = '';
        for (let i = 0; i < this.expr.length; i++) {
            if (this.expr[i] == ' ') continue;
            if (!this.#mathSigns.includes(this.expr[i])) {
                num += this.expr[i];
            }
            if (this.#mathSigns.includes(this.expr[i])) {
                if (num.length > 0) {
                    exprArr.push(+num);
                    num = '';
                }
                exprArr.push(this.expr[i]);
            }
        }
        if (num.length) exprArr.push(+num);

        let numStack = [];
        let signStack = [];

        for (let i = 0; i < exprArr.length; i++) {
            if (!this.#mathSigns.includes(exprArr[i])) {
                numStack.push(exprArr[i]);
            } else {
                if (exprArr[i] in this.#prioritys) {
                    if ((signStack.length === 0) || (this.#prioritys[exprArr[i]] > this.#prioritys[signStack[signStack.length - 1]]) || (signStack[signStack.length - 1] === '(')) {
                        signStack.push(exprArr[i]);
                    } else {
                        while (this.#prioritys[exprArr[i]] <= this.#prioritys[signStack[signStack.length - 1]]) {
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
                        let result = this.#calc(a, b, operation);
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
            let result = this.#calc(a, b, operation);
            numStack.push(result);
        }
        let finalResult = numStack.pop();

        if (typeof finalResult === 'undefined' || isNaN(finalResult))
            return {'answer': "Error expression"};
        else
            return {'answer': finalResult};
    }
}

module.exports = Expression;