function val(n) {
    if (n === 0 || n === '0') {
        return '(+[])';
    }
    if (n < 10) {
        return '(' + '+!+[]'.repeat(n) + ')';
    }

    return '(' + [...n.toString()].map(x => `(${val(x)}+[])`).join('+') + ')';

}


const trueString = '(!![]+[])';
const falseString = '(![]+[])';
const undefinedString = '([][[]]+[])';
const emptyString = '([]+[])'

const a = `(${falseString}[${val(1)}])`;
const d = `(${undefinedString}[${val(2)}])`;
const e = `(${trueString}[${val(3)}])`;
const f = `(${falseString}[${val(0)}])`;
const i = `(${undefinedString}[${val(5)}])`;
const l = `(${falseString}[${val(2)}])`;
const n = `(${undefinedString}[${val(1)}])`;
const r = `(${trueString}[${val(1)}])`;
const s = `(${falseString}[${val(3)}])`;
const t = `(${trueString}[${val(0)}])`;
const u = `(${undefinedString}[${val(0)}])`;

const flatString = [f, l, a, t].join('+');

// "function flat() { [native code] }"
const flatFunctionString = `([][${flatString}]+[])`
const c = `(${flatFunctionString}[${val(3)}])`;
const o = `(${flatFunctionString}[${val(6)}])`;
const v = `(${flatFunctionString}[${val(23)}])`;

const _space = `(${flatFunctionString}[${val(8)}])`;
const _openParen = `(${flatFunctionString}[${val(13)}])`;
const _closeParen = `(${flatFunctionString}[${val(14)}])`;
const _openCurly = `(${flatFunctionString}[${val(16)}])`;
const _closeCurly = `(${flatFunctionString}[${val(32)}])`;
const _openSquare = `(${flatFunctionString}[${val(18)}])`;
const _closeSquare = `(${flatFunctionString}[${val(30)}])`;


// "fontcolor"
const fontcolorString = [f, o, n, t, c, o, l, o, r].join('+');
// "<font color="undefined"></font>"
const fontcolorStringString = `(${emptyString}[${fontcolorString}]())`;
const _doubleQuote = `(${fontcolorStringString}[${val(12)}])`;
const _equals = `(${fontcolorStringString}[${val(11)}])`;
const _lessthan = `(${fontcolorStringString}[${val(0)}])`;
const _greaterthan = `(${fontcolorStringString}[${val(23)}])`;
const _forwardSlash = `(${fontcolorStringString}[${val(25)}])`;


const constructorString = [c, o, n, s, t, r, u, c, t, o, r].join('+');

// "function String() { [native code] }"
const stringConstructorString = `(${emptyString}[${constructorString}]+[])`;
const g = `(${stringConstructorString}[${val(14)}])`;
const S = `(${stringConstructorString}[${val(9)}])`;

// "function Array() { [native code] }"
const arrayConstructorString = `([][${constructorString}]+[])`;
const y = `(${arrayConstructorString}[${val(13)}])`;
const A = `(${arrayConstructorString}[${val(9)}])`;

// "function Number() { [native code] }"
const numberConstructorString = `((+[])[${constructorString}]+[])`;
const b = `(${numberConstructorString}[${val(12)}])`;
const m = `(${numberConstructorString}[${val(11)}])`;
const N = `(${numberConstructorString}[${val(9)}])`;

// "function Boolean() { [native code] }"
const booleanConstructorString = `((![])[${constructorString}]+[])`;
const B = `(${booleanConstructorString}[${val(9)}])`;



// "function Function() { [native code] }"
const functionConstructorString = `([][${flatString}][${constructorString}]+[])`;
const F = `(${functionConstructorString}[${val(9)}])`;

// `function anonymous(
//     ) {
//
//     }`
const anonymousFunctionString
    = `(([])[${flatString}][${constructorString}]()+[])`;
const _newLine = `(${anonymousFunctionString}[${val(19)}])`;


const entriesString = [e, n, t, r, i, e, s].join('+');
// "[object Array Iterator]"
const objectArrayIteratorString = `([][${entriesString}]()+[])`;
const j = `(${objectArrayIteratorString}[${val(3)}])`;
const I = `(${objectArrayIteratorString}[${val(14)}])`;


const object = `([][${entriesString}]()[${constructorString}]())`;

// "[object Object]"
const objectObjectString = `(${object}+[])`;
const O = `(${objectObjectString}[${val(8)}])`;


const returnString = [r, e, t, u, r, n].join('+');

const functionMaker = (func) =>
    `([])[${flatString}][${constructorString}](${func})()`;

// "/f/"
const regExpObjectString = [_forwardSlash, f, _forwardSlash].join('+');
// "return /f/"
const returnRegExpString = `(${returnString}+${_space}+${regExpObjectString})`;
const regExpObject = `(${functionMaker(returnRegExpString)})`;

// "function RegExp() { [native code] }"
const regExpConstructorString = `(${regExpObject}[${constructorString}]+[])`;
const p = `(${regExpConstructorString}[${val(14)}])`;
const x = `(${regExpConstructorString}[${val(13)}])`;
const E = `(${regExpConstructorString}[${val(12)}])`;

const atobString = [a, t, o, b].join('+');
// "return atob"
const returnAtobString = `(${returnString}+${_space}+${atobString})`;
const atobFunction = `(${functionMaker(returnAtobString)})`;

const btoaString = [b, t, o, a].join('+');
// "return btoa"
const returnBtoaString = `(${returnString}+${_space}+${btoaString})`;
const btoaFunction = `(${functionMaker(returnBtoaString)})`;

// "d2to"
const d2toString = [d, val(2), t, o].join('+');
// "wkh"
const wkhString = `${atobFunction}(${d2toString})`;
const w = `(${wkhString}[${val(0)}])`;
const k = `(${wkhString}[${val(1)}])`;
const h = `(${wkhString}[${val(2)}])`;

// "enEi"
const enEiString = [e, n, E, i].join('+');
// 'zq"'
const zqDoubleQuoteString = `${atobFunction}(${enEiString})`;
const z = `(${zqDoubleQuoteString}[${val(0)}])`;
const q = `(${zqDoubleQuoteString}[${val(1)}])`;

// "YQ=="
const YQequalsString = `${btoaFunction}(${a})`;
const Y = `(${YQequalsString}[${val(0)}])`;
const Q = `(${YQequalsString}[${val(1)}])`;


const ddIString = [d, d, I].join('+');
const ZGRJString = `${btoaFunction}(${ddIString})`;
const Z = `(${ZGRJString}[${val(0)}])`;
const G = `(${ZGRJString}[${val(1)}])`;
const R = `(${ZGRJString}[${val(2)}])`;
const J = `(${ZGRJString}[${val(3)}])`;

// ")e"
const paren_eString = [_closeParen, e].join('+');
// "KWU=""
const KWUString = `${btoaFunction}(${paren_eString})`;
const K = `(${KWUString}[${val(0)}])`;
const W = `(${KWUString}[${val(1)}])`;
const U = `(${KWUString}[${val(2)}])`;

// "<("
const less_parenString = [_lessthan, _openParen].join('+');
// "PCg="
const PCgString = `${btoaFunction}(${less_parenString})`;
const P = `(${PCgString}[${val(0)}])`;
const C = `(${PCgString}[${val(1)}])`;

// ""WFY""
const WFYString = [W, F, Y].join('+');
// "XV"
const XVString = `${atobFunction}(${WFYString})`;
const X = `(${XVString}[${val(0)}])`;
const V = `(${XVString}[${val(1)}])`;

// "1/2"
const halfString = [val(1), _forwardSlash, val(2)].join('+');
// "return 1/2"
const returnHalfString = `(${returnString}+${_space}+${halfString})`;
const zeroPointFive = `(${functionMaker(returnHalfString)})`;
const zeroPointFiveString = `(${zeroPointFive}+[])`;
const _period = `(${zeroPointFiveString}[${val(1)}])`;

const documentString = [d, o, c, u, m, e, n, t].join('+');
// "return document"
const returnDocumentString = `(${returnString}+${_space}+${documentString})`;
const documentObject = `(${functionMaker(returnDocumentString)})`;
// "function HTMLDocument() { [native code] }"
const documentConstructorString = `(${documentObject}+[])`;
const H = `(${documentConstructorString}[${val(8)}])`;
const T = `(${documentConstructorString}[${val(9)}])`;
const M = `(${documentConstructorString}[${val(10)}])`;
const L = `(${documentConstructorString}[${val(11)}])`;
const D = `(${documentConstructorString}[${val(12)}])`;


//===========================================================



const garboMap = new Map();
garboMap.set('a', a);
garboMap.set('b', b);
garboMap.set('c', c);
garboMap.set('d', d);
garboMap.set('e', e);
garboMap.set('f', f);
garboMap.set('g', g);
garboMap.set('h', h);
garboMap.set('i', i);
garboMap.set('j', j);
garboMap.set('k', k);
garboMap.set('l', l);
garboMap.set('m', m);
garboMap.set('n', n);
garboMap.set('o', o);
garboMap.set('p', p);
garboMap.set('q', q);
garboMap.set('r', r);
garboMap.set('s', s);
garboMap.set('t', t);
garboMap.set('u', u);
garboMap.set('v', v);
garboMap.set('w', w);
garboMap.set('x', x);
garboMap.set('y', y);
garboMap.set('z', z);
garboMap.set('A', A);
garboMap.set('B', B);
garboMap.set('C', C);
garboMap.set('D', D);
garboMap.set('E', E);
garboMap.set('F', F);
garboMap.set('G', G);
garboMap.set('H', H);
garboMap.set('I', I);
garboMap.set('J', J);
garboMap.set('K', K);
garboMap.set('L', L);
garboMap.set('M', M);
garboMap.set('N', N);
garboMap.set('O', O);
garboMap.set('P', P);
garboMap.set('Q', Q);
garboMap.set('R', R);
garboMap.set('S', S);
garboMap.set('T', T);
garboMap.set('U', U);
garboMap.set('V', V);
garboMap.set('W', W);
garboMap.set('X', X);
garboMap.set('Y', Y);
garboMap.set('Z', Z);

garboMap.set('1', `(${val(1)}+[])`);
garboMap.set('2', `(${val(2)}+[])`);
garboMap.set('3', `(${val(3)}+[])`);
garboMap.set('4', `(${val(4)}+[])`);
garboMap.set('5', `(${val(5)}+[])`);
garboMap.set('6', `(${val(6)}+[])`);
garboMap.set('7', `(${val(7)}+[])`);
garboMap.set('8', `(${val(8)}+[])`);
garboMap.set('9', `(${val(9)}+[])`);
garboMap.set('0', `(${val(0)}+[])`);

garboMap.set(" ", _space);
garboMap.set("(", _openParen);
garboMap.set(")", _closeParen);
garboMap.set("{", _openCurly);
garboMap.set("}", _closeCurly);
garboMap.set("[", _openSquare);
garboMap.set("]", _closeSquare);
garboMap.set("<", _lessthan);
garboMap.set(">", _greaterthan);
garboMap.set("/", _forwardSlash);
garboMap.set("=", _equals);
garboMap.set('"', _doubleQuote);
garboMap.set('.', _period);

garboMap.set(`
`, _newLine);

//=================================

const fromCodePointFunction =
    [
        S, t, r, i, n, g,
        _openSquare, _doubleQuote,
        f, r, o, m, C, o, d, e, P, o, i, n, t,
        _doubleQuote, _closeSquare
    ].join('+');

const returnFromCodePointFunction = `(${returnString}+${_space}+${fromCodePointFunction})`;

function convertText(val) {
    return [...val]
        .map(x => garboMap.get(x) || codePoint(x))
        .join`+`;
}


function codePoint(x) {
    const codepointString = x.codePointAt(0) + [];
    const convertedPointString = convertText(codepointString);
    return `(${functionMaker(returnFromCodePointFunction)})(${convertedPointString})`;
}

function convertCode(text) {
    return functionMaker(convertText(`${text}`))
}

// diagonstics ======================================================================================
const sizeMap = [];
garboMap.forEach((v, k) => sizeMap.push([k, v.length]));
sizeMap.push(['@', codePoint('@').length]);
console.log(sizeMap);

const testString1 = 'abcdefghijklmnopqrstuvwxyz';
const testString2 = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
const testString3 = '1234567890';


// ==================================================================================================

// HTML/CSS

function garbonate() { document.getElementById('o').innerText = convertText(document.getElementById('i').value) };

document.body.style.background = 'black';
document.body.style.fontFamily = 'Consolas';

const hr = document.createElement('div');
hr.style.display = 'flex';
hr.style.flexDirection = 'row';

const ht = document.createElement('textarea');
ht.id = 'i';
ht.style.width = "calc(100vw - 320px)";
ht.style.height = '70px';
ht.style.background = 'black';
ht.style.color = '#00beef';
ht.style.border = '1px solid ' + '#00beef';
ht.style.borderImage = 'none';
ht.style.resize = 'none';

const ho = document.createElement('p');
ho.id = 'o';
ho.style.width = '100%';
ho.style.height = '80%';
ho.style.color = '#00beef';
ho.style.fontSize = '14px';
ho.style.fontFamily = 'Consolas';

const hb = document.createElement('button');
hb.onclick = garbonate;
hb.style.background = '#00beef';
hb.style.border = 'none';
hb.style.fontFamily = 'fantasy';
hb.style.fontSize = '45px';
hb.style.width = '320px';
hb.style.cursor = 'pointer';
hb.innerText = 'GARBONATE';
hb.style.display = 'flex';
hb.style.flexDirection = 'row';
hb.style.justifyContent = 'space-around';

const hg = document.createElement('div');
hg.style.flexDirection = 'column';
hg.style.width = '50px';
hg.style.paddingLeft = '10px';

const hh = document.createElement('div');
hh.style.flex = '0 1 5%';
hh.style.background = 'black';
hh.style.width = '30%';
hh.style.borderTopLeftRadius = '5px';
hh.style.borderTopRightRadius = '5px';
hh.style.left = '50%';
hh.style.transform = 'translateX(-50%)';
hh.style.height = '5px';
hh.style.position = 'relative';
hh.style.top = '1px';

const hl = document.createElement('div');
hl.style.flex = '0 1 10%';
hl.style.background = 'black';
hl.style.width = '100%';
hl.style.borderTopLeftRadius = '5px';
hl.style.borderTopRightRadius = '5px';
hl.style.height = '10px';
hl.style.borderBottom = '2px solid ' + '#00beef';

const hc = document.createElement('div');
hc.style.display = 'flex';
hc.style.flexDirection = 'row';
hc.style.justifyContent = 'space-around';
hc.style.background = 'black';
hc.style.width = '95%';
hc.style.left = '50%';
hc.style.transform = 'translateX(-50%)';
hc.style.flex = '0 1 85%';
hc.style.borderBottomLeftRadius = '5px';
hc.style.borderBottomRightRadius = '5px';
hc.style.position = 'relative';

const hv1 = document.createElement('div');
hv1.style.height = '29px';
hv1.style.width = '5%';
hv1.style.borderRadius = '5px';
hv1.style.background = '#00beef';
hv1.style.marginTop = '5px';
hv1.style.marginBottom = '5px';

hv2 = hv1.cloneNode();
hv3 = hv1.cloneNode();

hc.appendChild(hv1);
hc.appendChild(hv2);
hc.appendChild(hv3);
hg.appendChild(hh);
hg.appendChild(hl);
hg.appendChild(hc);
hb.appendChild(hg);

hr.appendChild(ht);
hr.appendChild(hb);
document.body.appendChild(hr);
document.body.appendChild(ho);
