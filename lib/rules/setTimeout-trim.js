'use strcit';

module.exports = {
    meta: {
        docs: {
            description: "对setTimeout用法的一些规则控制"
        },
        fixable: null,
        schema: [
            // {
            //     "enum": ["always", "never"]
            // },
            {
                "type": "object",
                "properties": {
                    "noCheckThis": {
                        "type": "boolean"
                    },
                    "noCheckAnonymous": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            }
        ]
    },
    create(context) {
        const [{ noCheckThis = false, noCheckAnonymous = false } = {}] = context.options;
        return {
            'CallExpression': (node) => {
                // 不是定时器过滤掉
                if (node.callee.name !== 'setTimeout') return;
                // 获取第一个参数
                const firstProp = node.arguments && node.arguments[0];
                if (!firstProp) return;
                // 不是函数表达式 报错
                if (!noCheckAnonymous && firstProp.type !== 'FunctionExpression') {
                    context.report({
                        node,
                        message: '定时器的第一个参数必须为匿名函数'
                    });
                } else if (!noCheckThis) {
                    // 函数表达式中含有this 报错
                    for (const { type, expression } of firstProp.body.body) {
                        if (type === 'ExpressionStatement' && expression.type === 'ThisExpression') {
                            context.report({
                                node,
                                message: '定时器内不允许直接使用this访问'
                            });
                        }
                    }
                }
            }
        };
    }
};
