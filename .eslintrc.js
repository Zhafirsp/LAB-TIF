module.exports = {
    "settings": {
        "react": {
        "version": "detect",
        },
    },
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
    ],
    "ignorePatterns": [
        "*.css"
    ],
    "rules": {
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-redeclare": "off",
        "react/react-in-jsx-scope": "off",
        "semi": 0,
        "quotes": "off",
        "react/prop-types": "off",
        "react/no-unescaped-entities": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "off",
        "no-duplicate-values/no-duplicate-values": "off" ,
    },
}
