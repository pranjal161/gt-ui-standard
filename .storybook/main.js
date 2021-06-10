module.exports = {
    'stories': [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    'addons': [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-i18n',
        '@storybook/preset-create-react-app',
        '@react-theming/storybook-addon',
    ]
}
