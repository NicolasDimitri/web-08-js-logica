# Projeto 08 – Lógica de Programação (JavaScript) · Nível ⭐⭐ → 🔥

Treino de lógica com **condicionais, laços, strings, arrays e funções**. São 15 funções pequenas, em ordem crescente de dificuldade. As três últimas (🔥) são o desafio de verdade: exigem planejar a solução antes de escrever.

## Como funciona

- Você escreve tudo em **`solucao.js`** (as funções já estão lá, vazias).
- O robô chama as suas funções com vários valores e compara com o resultado esperado. Quando algo falha, a tabela do PR diz **qual chamada** deu errado e **o que era esperado**, por exemplo: `fizzBuzz(15) deveria retornar [...], mas retornou [...]`.
- Use `module.exports = { ... }` (já está no arquivo). Não mude os nomes das funções.

## Requisitos

1. **R1** – O `solucao.js` carrega sem erro e exporta as 15 funções.
2. **R2** – Sem `var`: use `const` (valor que não muda) e `let` (valor que muda).
3. **R3** – `classificarIMC(peso, altura)`: IMC = peso ÷ altura². Devolve exatamente `'Abaixo do peso'` (IMC < 18,5), `'Peso normal'` (< 25), `'Sobrepeso'` (< 30) ou `'Obesidade'` (≥ 30).
4. **R4** – `ehBissexto(ano)`: `true` se o ano é divisível por 4, **exceto** os divisíveis por 100, **a menos que** também sejam divisíveis por 400.
5. **R5** – `fizzBuzz(n)`: array de **textos** de 1 até `n`. Múltiplos de 3 viram `'Fizz'`, de 5 viram `'Buzz'`, de ambos viram `'FizzBuzz'`; os demais viram o número em texto (`'1'`, `'2'`...). `fizzBuzz(0)` devolve `[]`.
6. **R6** – `somarDigitos(n)`: soma dos algarismos de um inteiro não negativo (`123` → `6`).
7. **R7** – `inverterTexto(texto)`: o texto de trás para frente (`'abc'` → `'cba'`).
8. **R8** – `ehPalindromo(texto)`: ignora maiúsculas, espaços, pontuação e **acentos** (`'Socorram-me, subi no ônibus em Marrocos'` → `true`). Texto vazio é palíndromo.
9. **R9** – `contarVogais(texto)`: conta `a e i o u`, maiúsculas, minúsculas e acentuadas (`'Olá, você'` → `4`).
10. **R10** – `ehPrimo(n)`: `true` se `n` é primo (`n < 2` é `false`). Tem de ser **rápida**: `ehPrimo(2147483647)` precisa responder em menos de 1,5 segundo.
11. **R11** – `primosAte(n)`: array com todos os primos de 2 até `n` (`primosAte(10)` → `[2, 3, 5, 7]`).
12. **R12** – `mdc(a, b)`: máximo divisor comum (`mdc(12, 18)` → `6`; `mdc(0, 5)` → `5`).
13. **R13** – `converterBase(n, base)`: converte um inteiro decimal para as bases 2 a 16, em **MAIÚSCULAS** (`converterBase(255, 16)` → `'FF'`; `converterBase(0, 2)` → `'0'`). **Proibido** usar `toString(base)` e `parseInt`: faça com divisões sucessivas.
14. **R14** – 🔥 `parentesesBalanceados(texto)`: `true` se todo `(`, `[` e `{` é fechado na ordem certa; ignora os outros caracteres. `'{[()]}'` → `true`; `'([)]'` → `false`; `''` → `true`.
15. **R15** – 🔥 Números romanos: `paraRomano(n)` (1 a 3999; `1994` → `'MCMXCIV'`) e `deRomano(texto)` (`'MCMXCIV'` → `1994`). Fora do intervalo ou número não inteiro: `paraRomano` deve **lançar um erro** (`throw new Error(...)`). O robô testa os 3999 números: `deRomano(paraRomano(n))` tem que voltar a `n` sempre.
16. **R16** – 🔥 `cpfValido(cpf)`: `true` se o CPF é válido, com ou sem pontos e traço (`'529.982.247-25'` e `'52998224725'` → `true`). Devolve `false` para dígitos verificadores errados, para sequências repetidas (`'111.111.111-11'`), para tamanho errado e para qualquer valor que **não seja texto** (número, `null`...), sem lançar erro.

<details>
<summary>💡 Dicas (abra só se travar)</summary>

**Nível 1 – Pensando antes de codar**
- Escreva no papel 3 exemplos e o que a função deve responder. Depois pense: "qual é o passo que se repete?"
- Quase todo laço tem três partes: **começo**, **condição de parada** e **o que muda a cada volta**. Se a condição nunca fica falsa, o laço é infinito.
- Para texto sem acentos: o JavaScript tem `normalize('NFD')`, que separa a letra do acento (pesquise "remover acentos javascript").
- Primo grande: se `n` tem um divisor maior que a sua raiz quadrada, ele também tem um menor. Até onde você realmente precisa testar?
- **R14**: o último parêntese que abriu é o primeiro que tem que fechar. Que estrutura de dados funciona assim? (Se não lembra, pesquise "pilha / stack").
- **R15**: monte uma tabela de pares valor→símbolo, do maior para o menor (`1000 M`, `900 CM`, `500 D`...). Para ler, o símbolo menor **antes** de um maior é subtração.

**Nível 2 – Ferramentas**
- Dígitos de um número: `n % 10` pega o último; `Math.floor(n / 10)` descarta o último.
- Base N: o resto de `n % base` é o último dígito; guarde os restos e junte do último para o primeiro. Os símbolos podem vir de uma string: `'0123456789ABCDEF'[resto]`.
- `Number.isInteger(n)` ajuda a validar números.
- **R16 – como se calcula o CPF:** para o 1º dígito verificador, multiplique os 9 primeiros dígitos por 10, 9, 8, ..., 2 e some tudo; o dígito é `(soma × 10) % 11` (se der 10, vira 0). O 2º dígito é igual, mas com os 10 primeiros dígitos multiplicados por 11, 10, ..., 2.
- `typeof x === 'string'` confere se é texto; `/^\d{11}$/.test(texto)` confere 11 dígitos.
</details>

---

## Como entregar

1. Clone o repositório: `git clone https://github.com/NicolasDimitri/web-08-js-logica.git` e entre na pasta.
2. Crie uma branch: `git switch -c meu-projeto`
3. Abra o arquivo **`solucao.js`**: ele já vem com todas as funções/classes prontas para você preencher (troque o `throw` pelo seu código). **É o único arquivo que você edita.**
4. `git add .` → `git commit -m "mensagem"` → `git push -u origin meu-projeto`
5. No GitHub, clique em **Compare & pull request** → **Create pull request**.
6. A cada commit, o robô adiciona **um novo comentário** no PR com uma **tabela de requisitos** (✅ passou / ❌ não passou, com a dica do que falta) e a **porcentagem concluída**.
   Os comentários anteriores ficam como histórico do seu progresso. Corrija, faça novo commit + `git push` e uma nova tabela aparece.
7. Com tudo ✅, sua entrega está concluída. **O PR não será mesclado na `main`**: ele fica aberto só para a avaliação e para o instrutor revisar.

## Testar no seu computador (opcional, mas recomendado: o feedback é bem mais rápido!)

Você precisa do Node 22 instalado. **Não é preciso instalar navegador.**

```bash
npm install
npm test
```

Para fazer experimentos soltos, crie um arquivo `teste.js` (e não faça commit dele):

```js
const s = require('./solucao');
console.log(s.fizzBuzz(5));
```

e rode `node teste.js`.

> Não altere as pastas `tests/`, `scripts/` e `.github/`.
>
> ⏱️ Cada requisito roda isolado e com limite de tempo: se o seu código entrar em um laço infinito, só aquele requisito fica ❌ (com um aviso), e os outros continuam sendo avaliados.
