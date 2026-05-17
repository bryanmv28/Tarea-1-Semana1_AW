var calcActual = '0';
var calcExprRaw = '';
var calcExprShow = '';
var calcSoloCalc = false;
var elDisplay;
var elExpr;

document.addEventListener('DOMContentLoaded', function () {
    elDisplay = document.getElementById('calc-display');
    elExpr = document.getElementById('calc-expresion');
    document.addEventListener('keydown', manejarTeclado);
});

function mostrarResultado(valor) {
    elDisplay.textContent = valor;
    elDisplay.classList.add('actualizado');
    setTimeout(function () { elDisplay.classList.remove('actualizado'); }, 250);
}

function etiquetaOperador(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function evaluarExpresion(expresion) {
    try {
        var resultado = Function('"use strict"; return (' + expresion + ')')();
        return parseFloat(resultado.toPrecision(12));
    } catch (e) { return null; }
}

function calcNumero(n) {
    if (calcSoloCalc) {
        calcActual = n; calcExprRaw = ''; calcExprShow = ''; calcSoloCalc = false;
    } else {
        calcActual = (calcActual === '0') ? n : calcActual + n;
    }
    mostrarResultado(calcActual);
}

function calcPunto() {
    if (calcSoloCalc) {
        calcActual = '0.'; calcExprRaw = ''; calcExprShow = ''; calcSoloCalc = false;
    }
    if (!calcActual.includes('.')) calcActual += '.';
    mostrarResultado(calcActual);
}

function calcOperador(op) {
    calcSoloCalc = false;
    var evaluado = calcExprRaw ? evaluarExpresion(calcExprRaw + calcActual) : null;
    var parcial = (evaluado !== null) ? String(evaluado) : calcActual;
    calcExprRaw = parcial + op;
    calcExprShow = parcial + ' ' + etiquetaOperador(op) + ' ';
    elExpr.textContent = calcExprShow;
    calcActual = '0';
}

function calcIgual() {
    if (!calcExprRaw) return;
    var resultado = evaluarExpresion(calcExprRaw + calcActual);
    elExpr.textContent = calcExprShow + calcActual + ' =';
    if (resultado !== null) {
        calcActual = String(resultado);
        mostrarResultado(calcActual);
    } else {
        mostrarResultado('Error');
        calcActual = '0';
    }
    calcExprRaw = ''; calcExprShow = ''; calcSoloCalc = true;
}

function calcLimpiar() {
    calcActual = '0'; calcExprRaw = ''; calcExprShow = ''; calcSoloCalc = false;
    elExpr.textContent = '';
    mostrarResultado('0');
}

function calcBorrar() {
    if (calcSoloCalc) { calcLimpiar(); return; }
    calcActual = (calcActual.length > 1) ? calcActual.slice(0, -1) : '0';
    mostrarResultado(calcActual);
}

function calcSigno() {
    if (calcActual === '0') return;
    calcActual = calcActual.startsWith('-') ? calcActual.slice(1) : '-' + calcActual;
    mostrarResultado(calcActual);
}

function manejarTeclado(e) {
    if (e.key >= '0' && e.key <= '9') calcNumero(e.key);
    else if (e.key === '.') calcPunto();
    else if (e.key === '+') calcOperador('+');
    else if (e.key === '-') calcOperador('-');
    else if (e.key === '*') calcOperador('*');
    else if (e.key === '/') { e.preventDefault(); calcOperador('/'); }
    else if (e.key === 'Enter' || e.key === '=') calcIgual();
    else if (e.key === 'Backspace') calcBorrar();
    else if (e.key === 'Escape') calcLimpiar();
}