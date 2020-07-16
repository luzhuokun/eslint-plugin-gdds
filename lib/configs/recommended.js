'use strict'

module.exports = {
    plugins: ["gdds"],
    env: {
        browser: true
    },
    rules: {
        "gdds/no-keyword-member-access": ["error"],
        "gdds/setTimeout-trim": ["error"]
    }
};
