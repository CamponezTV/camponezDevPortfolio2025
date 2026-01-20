# Testing Guide

Comprehensive testing documentation for Camponez DEV.

## Overview

The project uses Jest and React Testing Library for unit and component testing. Tests focus on:
- Component rendering and props handling
- Context and hook behavior
- User interactions
- Accessibility
- Integration between components

## Test Structure

```
__tests__/
├── components/
│   ├── logo.test.tsx
│   └── navigation.test.tsx
├── context/
│   └── language-context.test.tsx
└── hooks/
    └── use-translations.test.ts
```

## Running Tests

### Execute all tests

```bash
pnpm test
```

### Watch mode (auto-rerun on file changes)

```bash
pnpm test:watch
```

### Generate coverage report

```bash
pnpm test:coverage
```

### Run specific test file

```bash
pnpm test -- logo.test.tsx
```

## Test Configuration

Jest configuration in `package.json`:

```json
{
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

## Test Categories

### 1. Component Tests

Test component rendering, props, and user interactions.

**Example: Logo Component**

```typescript
describe('Logo Component', () => {
  it('should render logo image', () => {
    render(<Logo size="md" />)
    const img = screen.getByAltText('Logo')
    expect(img).toBeInTheDocument()
  })

  it('should apply correct size classes', () => {
    render(<Logo size="lg" />)
    const img = screen.getByAltText('Logo')
    expect(img).toHaveAttribute('width', '64')
  })
})
```

**Example: Navigation Component**

```typescript
describe('Navigation Component', () => {
  it('should render navigation menu', () => {
    render(<Navigation />, { wrapper })
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('should handle language change', async () => {
    const user = userEvent.setup()
    render(<Navigation />, { wrapper })
    const ptButton = screen.getByRole('button', { name: 'PT' })
    await user.click(ptButton)
    expect(ptButton).toHaveClass('bg-primary')
  })
})
```

### 2. Hook Tests

Test custom hooks and their state management.

**Example: useTranslations Hook**

```typescript
describe('useTranslations', () => {
  it('should return translations object', () => {
    const { result } = renderHook(() => useTranslations(), { wrapper })
    expect(result.current).toBeDefined()
    expect(typeof result.current).toBe('object')
  })

  it('should have nav translations', () => {
    const { result } = renderHook(() => useTranslations(), { wrapper })
    expect(result.current.nav).toBeDefined()
    expect(result.current.nav.home).toBeDefined()
  })
})
```

### 3. Context Tests

Test context providers and state management.

**Example: Language Context**

```typescript
describe('Language Context', () => {
  it('should provide language context', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    const language = screen.getByTestId('language')
    expect(language).toBeInTheDocument()
  })

  it('should update language state', async () => {
    const user = userEvent.setup()
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    const button = screen.getByRole('button', { name: /set english/i })
    await user.click(button)
    await waitFor(() => {
      const language = screen.getByTestId('language')
      expect(language.textContent).toBe('en')
    })
  })
})
```

## Best Practices

### 1. Use semantic queries

Prefer queries that reflect how users interact with components:

```typescript
// Good
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Username')
screen.getByPlaceholderText('Enter text')

// Avoid
screen.getByTestId('submit-btn')
container.querySelector('.submit-button')
```

### 2. Avoid testing implementation details

```typescript
// Bad - testing internal state
expect(component.state.isOpen).toBe(true)

// Good - testing user-visible behavior
expect(screen.getByText('Modal Content')).toBeVisible()
```

### 3. Use userEvent for interactions

```typescript
// Good
const user = userEvent.setup()
await user.click(button)

// Avoid
fireEvent.click(button)
```

### 4. Test accessibility

```typescript
it('should have proper ARIA labels', () => {
  render(<Component />)
  const button = screen.getByRole('button', { name: /submit/i })
  expect(button).toHaveAttribute('aria-label')
})
```

## Test Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| Statements | 80% | 75% |
| Branches | 75% | 70% |
| Functions | 80% | 75% |
| Lines | 80% | 75% |

View coverage report:

```bash
pnpm test:coverage
open coverage/lcov-report/index.html
```

## Mocking

### Mock Next.js modules

```typescript
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))
```

### Mock API calls

```typescript
jest.mock('@/lib/api', () => ({
  fetchProjects: jest.fn(() => Promise.resolve(mockProjects)),
}))
```

### Mock router

```typescript
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    pathname: '/',
  }),
}))
```

## Debugging Tests

### Run single test

```bash
pnpm test -- --testNamePattern="should render logo"
```

### Debug in browser

```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

### Log queries

```typescript
import { screen, debug } from '@testing-library/react'

render(<Component />)
debug() // Prints rendered DOM
screen.logTestingPlaygroundURL() // Open in Testing Playground
```

## Common Issues

### 1. "Cannot find module" errors

Ensure path aliases in `jest.config.js` match `tsconfig.json`:

```json
{
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
}
```

### 2. Hydration warnings in tests

Add to test setup:

```typescript
// Suppress hydration warnings in tests
jest.spyOn(console, 'warn').mockImplementation((message) => {
  if (!message.includes('Hydration')) {
    console.warn(message)
  }
})
```

### 3. Async test timeouts

Increase timeout for slow tests:

```typescript
it('should load data', async () => {
  // test code
}, 10000) // 10 second timeout
```

## CI/CD Integration

### GitHub Actions example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v3
```

## Writing New Tests

### Component test template

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { YourComponent } from '@/components/your-component'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    render(<YourComponent />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(screen.getByText('Updated Text')).toBeInTheDocument()
  })
})
```

### Hook test template

```typescript
import { renderHook, act } from '@testing-library/react'
import { useYourHook } from '@/hooks/use-your-hook'

describe('useYourHook', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useYourHook())
    expect(result.current.value).toBe(initialValue)
  })

  it('should update value', () => {
    const { result } = renderHook(() => useYourHook())
    
    act(() => {
      result.current.setValue(newValue)
    })
    
    expect(result.current.value).toBe(newValue)
  })
})
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Vitest (Alternative)](https://vitest.dev/)
    ├── custom-cursor.test.tsx     # Testes do cursor customizado
    ├── footer.test.tsx            # Testes do footer
    ├── loading-screen.test.tsx    # Testes de tela de carregamento
    ├── smooth-scroll.test.tsx     # Testes de scroll suave
    ├── theme-provider.test.tsx    # Testes do provedor de tema
    └── ui/
        ├── card.test.tsx          # Testes do componente Card
        ├── button.test.tsx        # Testes do componente Button
        ├── badge.test.tsx         # Testes do componente Badge
        └── input.test.tsx         # Testes do componente Input
```

---

## ✅ Testes Criados

### Utilitários (`lib/utils.test.ts`)
- ✓ Merge de class names
- ✓ Remoção de classes conflitantes do Tailwind
- ✓ Tratamento de classes condicionais
- ✓ Handling de valores undefined e false
- ✓ Suporte a arrays e objetos
- ✓ Testes com utilities complexas do Tailwind

### Hooks (`hooks/use-mobile.test.ts` e `hooks/use-toast.test.ts`)
- ✓ Detectar tamanho de tela (mobile/desktop)
- ✓ Limpeza de event listeners
- ✓ Criar e descartar toasts
- ✓ ID único para cada toast
- ✓ Dismiss de toasts específicas e globais

### Componentes UI
- ✓ **Card**: Renderização, estrutura completa, custom classes
- ✓ **Button**: Variantes, tamanhos, tipos, click handler
- ✓ **Badge**: Variantes, renderização múltipla
- ✓ **Input**: Tipos, placeholder, disabled, value

---

## 🎯 Como Adicionar Testes a Novas Funcionalidades

### Passo 1: Criar o arquivo de teste
```
Nova funcionalidade criada → Criar arquivo `[arquivo].test.tsx` no mesmo diretório
```

### Passo 2: Escrever os testes
```typescript
import { render, screen } from '@testing-library/react'
import { MinhaNovaFuncionalidade } from '@/components/minha-nova-funcionalidade'

describe('MinhaNovaFuncionalidade', () => {
  it('deve renderizar o componente', () => {
    render(<MinhaNovaFuncionalidade />)
    expect(screen.getByText(/texto esperado/i)).toBeInTheDocument()
  })

  it('deve executar ação ao clicar', async () => {
    const handleClick = jest.fn()
    render(<MinhaNovaFuncionalidade onClick={handleClick} />)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Passo 3: Rodar os testes
```bash
npm test

# Ou em modo watch durante o desenvolvimento
npm run test:watch
```

### Passo 4: Atualizar testes ao modificar funcionalidades
Sempre que você alterar uma funcionalidade existente, atualize os testes correspondentes!

---

## 🔧 Boas Práticas

### 1. Arrange-Act-Assert Pattern
```typescript
it('deve fazer algo', () => {
  // ARRANGE - Preparar dados e componentes
  const mockFn = jest.fn()
  
  // ACT - Executar a ação
  render(<Component onClick={mockFn} />)
  
  // ASSERT - Verificar os resultados
  expect(mockFn).toHaveBeenCalled()
})
```

### 2. Usar `data-testid` para seletores complexos
```typescript
// Bom ❌
render(<Component className="complex-selector">Content</Component>)
screen.getByText('Content') // Funciona se o texto for único

// Melhor ✅
render(<Component data-testid="component-id">Content</Component>)
screen.getByTestId('component-id') // Mais específico e confiável
```

### 3. Testar comportamento, não implementação
```typescript
// Evitar ❌
expect(component.state.isOpen).toBe(true)

// Fazer ✅
expect(screen.getByRole('dialog')).toBeInTheDocument()
```

### 4. Testar casos de erro e edge cases
```typescript
it('deve lidar com estado vazio', () => {
  render(<Component items={[]} />)
  expect(screen.getByText('Nenhum item')).toBeInTheDocument()
})

it('deve desabilitar quando em carregamento', () => {
  render(<Button loading={true} />)
  expect(screen.getByRole('button')).toBeDisabled()
})
```

---

## 📊 Cobertura de Testes

Para visualizar a cobertura de testes:
```bash
npm run test:coverage
```

Isso gerará um relatório mostrando:
- **Statements**: % de linhas de código executadas
- **Branches**: % de ramificações (if/else) executadas
- **Functions**: % de funções executadas
- **Lines**: % de linhas executadas

---

## 🚨 Resolução de Problemas

### "Cannot find module"
- Verifique se o alias `@/` está correto no `jest.config.ts`
- Confirme que os caminhos correspondem ao `tsconfig.json`

### Testes falhando com componentes Radix UI
- Adicione mocks para componentes que usam portals
- Use `jest.mock()` para dependências externas complexas

### Erro com "window is not defined"
- O Jest já fornece um ambiente jsdom, mas adicione:
```typescript
// No topo do arquivo de teste, se necessário
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn(),
})
```

---

## 📝 Checklist para Novas Features

- [ ] Funcionalidade desenvolvida
- [ ] Testes unitários criados
- [ ] Todos os testes passando (`npm test`)
- [ ] Cobertura > 80% para novos componentes
- [ ] Testes para casos de erro inclusos
- [ ] Código documentado com comentários

---

## 🎓 Recursos

- [Jest Docs](https://jestjs.io/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Seu projeto está pronto para desenvolvimento com testes! 🎉**
