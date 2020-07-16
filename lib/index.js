'use strict';

module.exports = {
    rules: {
        'no-keyword-member-access': require('./rules/no-keyword-member-access'),
        'setTimeout-trim': require('./rules/setTimeout-trim')
    },
    configs: {
        'recommended': require('./configs/recommended')
    },
    processors: {
        // '.vue': require('./processor')
    }
};
