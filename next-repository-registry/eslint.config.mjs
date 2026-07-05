import baseConfig from '@gravity-ui/eslint-config';
import a11yConfig from '@gravity-ui/eslint-config/a11y';
// import clientConfig from '@gravity-ui/eslint-config/client';
import importOrderConfig from '@gravity-ui/eslint-config/import-order';
import prettierConfig from '@gravity-ui/eslint-config/prettier';

export default [
    ...baseConfig,
    // ...clientConfig,
    ...prettierConfig,
    ...importOrderConfig,
    ...a11yConfig,
    {
        rules: {
            // Next.js / React 17+ JSX transform — React in scope not required
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
            '.prettierrc.js',
            '.prettierignore',
        ],
    },
];
