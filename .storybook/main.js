module.exports = {
    'typescript': {
        reactDocgen: 'none'
    },
    'stories': [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    'addons': [
        '@storybook/addon-toolbars',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-i18n',
        '@storybook/preset-create-react-app',
        '@react-theming/storybook-addon',
    ]
}
