# Regras do projeto

## Código sem comentários

- Não escreva comentários no código: nem `//`, nem `/* */`, nem JSDoc, nem `{/* */}` no JSX, nem `#` em `.env.example`.
- Isso vale também para comentários de "justificativa" ou "por quê". Se algo precisa de explicação, deixe o código autoexplicativo com nomes, funções e constantes bem nomeadas.
- Exceções, por serem diretivas funcionais e não texto explicativo: `// eslint-disable-*`, `/** @jest-environment ... */` e `/** @type {...} */` em arquivos `.mjs`/`.js` de configuração.
- Não mexa nos comentários de `components/ui/*` (código gerado do shadcn) nem de `next-env.d.ts` (gerado pelo Next).

## Verificação antes de concluir

Rode `npx tsc --noEmit`, `npm run lint`, `npm test` e `npx next build`. O site está em produção: mudanças que alteram comportamento visível precisam ser testadas no navegador.
