const { test, expect } = require('@playwright/test');
const { rodar, casos, casosErro, fontesDe, codigoDoAluno } = require('./helpers');

const FUNCOES = [
  'classificarIMC', 'ehBissexto', 'fizzBuzz', 'somarDigitos', 'inverterTexto', 'ehPalindromo', 'contarVogais',
  'ehPrimo', 'primosAte', 'mdc', 'converterBase', 'parentesesBalanceados', 'paraRomano', 'deRomano', 'cpfValido',
];

test('R1 – O solucao.js carrega sem erro e exporta as 15 funções pedidas', () => {
  const tipos = rodar((s, nomes) => nomes.map((n) => typeof s[n]), FUNCOES);
  const faltam = FUNCOES.filter((n, i) => tipos[i] !== 'function');
  expect(faltam, `Faltam exportar: ${faltam.join(', ')} (module.exports = { ... })`).toEqual([]);
});

test('R2 – Sem "var": use const e let', () => {
  expect(codigoDoAluno(), 'Troque todo "var" por const (valor que não muda) ou let (valor que muda)').not.toMatch(/\bvar\b/);
});

test('R3 – classificarIMC(peso, altura): Abaixo do peso, Peso normal, Sobrepeso ou Obesidade', () => {
  casos('classificarIMC', [
    [[50, 1.7], 'Abaixo do peso'],
    [[70, 1.75], 'Peso normal'],
    [[85, 1.75], 'Sobrepeso'],
    [[100, 1.75], 'Obesidade'],
    [[18.4, 1], 'Abaixo do peso'],
    [[18.5, 1], 'Peso normal'],
    [[24.99, 1], 'Peso normal'],
    [[25, 1], 'Sobrepeso'],
    [[29.9, 1], 'Sobrepeso'],
    [[30, 1], 'Obesidade'],
  ]);
});

test('R4 – ehBissexto(ano): regra dos anos bissextos', () => {
  casos('ehBissexto', [
    [[2024], true], [[2023], false], [[2000], true], [[1900], false],
    [[2100], false], [[1600], true], [[4], true], [[100], false], [[2400], true], [[2001], false],
  ]);
});

test('R5 – fizzBuzz(n): lista de 1 até n trocando múltiplos de 3, 5 e 15', () => {
  casos('fizzBuzz', [
    [[0], []],
    [[1], ['1']],
    [[5], ['1', '2', 'Fizz', '4', 'Buzz']],
    [[15], ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']],
  ]);
});

test('R6 – somarDigitos(n): soma dos algarismos de um número inteiro não negativo', () => {
  casos('somarDigitos', [[[0], 0], [[7], 7], [[123], 6], [[1000], 1], [[99999], 45], [[987654321], 45]]);
});

test('R7 – inverterTexto(texto): devolve o texto de trás para frente', () => {
  casos('inverterTexto', [[['abc'], 'cba'], [[''], ''], [['a'], 'a'], [['Olá mundo'], 'odnum álO'], [['12 34'], '43 21']]);
});

test('R8 – ehPalindromo(texto): ignora maiúsculas, espaços, pontuação e acentos', () => {
  casos('ehPalindromo', [
    [['arara'], true], [['ovo'], true], [['javascript'], false], [['abca'], false],
    [['Roma me tem amor'], true],
    [['Anotaram a data da maratona'], true],
    [['Socorram-me, subi no ônibus em Marrocos'], true],
    [['12321'], true], [[''], true], [['ab'], false],
    [['aíbia'], true], [['Aíbiá'], true], [['aéb'], false],
  ]);
});

test('R9 – contarVogais(texto): conta a, e, i, o, u (maiúsculas, minúsculas e acentuadas)', () => {
  casos('contarVogais', [
    [['banana'], 3], [['JAVASCRIPT'], 3], [['xyz'], 0], [[''], 0],
    [['AEIOU aeiou'], 10], [['Olá, você'], 4], [['ÁÉÍÓÚ'], 5], [['ãõ'], 2],
  ]);
});

test('R10 – ehPrimo(n): e rápida o bastante para números grandes', () => {
  casos('ehPrimo', [
    [[0], false], [[1], false], [[2], true], [[3], true], [[4], false], [[17], true], [[18], false],
    [[97], true], [[100], false], [[7919], true], [[7917], false], [[-3], false],
  ]);
  casos('ehPrimo', [[[2147483647], true], [[2147483641], false]], {
    ms: 1500,
    dica: 'Dica: para saber se n é primo basta testar divisores até a raiz quadrada de n.',
  });
});

test('R11 – primosAte(n): lista de todos os primos de 2 até n', () => {
  casos('primosAte', [
    [[0], []], [[1], []], [[2], [2]], [[10], [2, 3, 5, 7]],
    [[30], [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]],
    [[100], [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]],
  ]);
});

test('R12 – mdc(a, b): máximo divisor comum', () => {
  casos('mdc', [[[12, 18], 6], [[17, 5], 1], [[0, 5], 5], [[5, 0], 5], [[100, 10], 10], [[48, 180], 12], [[7, 7], 7], [[270, 192], 6]]);
});

test('R13 – converterBase(n, base): decimal para base 2 a 16, SEM usar toString(base)', () => {
  casos('converterBase', [
    [[10, 2], '1010'], [[0, 2], '0'], [[5, 2], '101'], [[255, 16], 'FF'], [[31, 16], '1F'],
    [[255, 8], '377'], [[1000, 7], '2626'], [[4095, 16], 'FFF'],
  ]);
  const [fonte] = fontesDe(['converterBase']);
  expect(/toString\s*\(\s*[^)\s]/.test(fonte), 'Não vale usar toString(base): faça a conversão com divisões sucessivas (/ e %)').toBe(false);
  expect(/parseInt|toString/.test(fonte), 'Não use parseInt/toString nesta função').toBe(false);
});

test('R14 – 🔥 parentesesBalanceados(texto): (), [] e {} abrem e fecham na ordem certa (dica: pilha)', () => {
  casos('parentesesBalanceados', [
    [['()'], true], [['([]{})'], true], [['{[()]}'], true], [[''], true], [['a(b[c]{d}e)f'], true],
    [['([)]'], false], [['(('], false], [['))(('], false], [['(()'], false], [['}'], false], [['{[}]'], false],
  ]);
});

test('R15 – 🔥 Números romanos: paraRomano(n) e deRomano(texto) (1 a 3999)', () => {
  casos('paraRomano', [
    [[1], 'I'], [[4], 'IV'], [[9], 'IX'], [[14], 'XIV'], [[40], 'XL'], [[90], 'XC'], [[400], 'CD'],
    [[1994], 'MCMXCIV'], [[2024], 'MMXXIV'], [[3999], 'MMMCMXCIX'],
  ]);
  casos('deRomano', [[['III'], 3], [['LVIII'], 58], [['IV'], 4], [['CDXLIV'], 444], [['MCMXCIV'], 1994], [['MMMCMXCIX'], 3999]]);
  casosErro('paraRomano', [[0], [4000], [-5], [1.5]]);
  const volta = rodar((s) => {
    const ida = pegar('paraRomano');
    const vinda = pegar('deRomano');
    for (let n = 1; n <= 3999; n++) {
      const rom = ida(n);
      const v = vinda(rom);
      if (v !== n) return { n, rom, v };
    }
    return null;
  });
  expect(volta, `deRomano(paraRomano(${volta && volta.n})) deveria voltar a ${volta && volta.n}, mas paraRomano deu "${volta && volta.rom}" e deRomano devolveu ${volta && volta.v}`).toBeNull();
});

test('R16 – 🔥 cpfValido(cpf): confere os dois dígitos verificadores (com ou sem pontos e traço)', () => {
  casos('cpfValido', [
    [['529.982.247-25'], true], [['52998224725'], true], [['111.444.777-35'], true], [['123.456.789-09'], true],
    [['529.982.247-24'], false], [['123.456.789-10'], false],
    [['000.000.000-00'], false], [['111.111.111-11'], false],
    [['1234567890'], false], [['123.456.789-099'], false], [['abc'], false], [[''], false],
    [[12345678909], false], [[null], false],
  ]);
});
