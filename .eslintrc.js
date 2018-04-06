module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
		"node": true,
		"mocha": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
		],
		"no-console": "off",
    }
};