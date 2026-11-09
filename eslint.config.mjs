import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  { ignores: ['.next/**', 'node_modules/**', 'coverage/**', 'components/ui/**'] },
  {
    files: ['**/*.test.{ts,tsx}', '__tests__/**', 'jest.setup.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'off', '@next/next/no-img-element': 'off' },
  },
  {
    // Hydration-safe pattern: state is read from the browser after mount to avoid SSR mismatches.
    rules: { 'react-hooks/set-state-in-effect': 'warn' },
  },
]

export default eslintConfig
