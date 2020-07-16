'use strcit';

// 关键字合集
const KEYWORDS = ["break", "else", "new", "var", "case", "finally", "return",
    "void", "catch", "for", "switch", "while", "continue", "function",
    "this", "with", "default", "if", "throw", "delete",
    "in", "try", "do", "instranceof", "typeof",
    "abstract", "enum", "int", "short", "boolean", "export",
    "interface", "static", "byte", "extends", "long", "super",
    "char", "final", "native", "synchronized", "class", "float",
    "package", "throws", "const", "goto", "private",
    "transient", "debugger", "implements",
    "protected", "volatile", "double", "import", "public"];

module.exports = {
    meta: {
        docs: {
            description: "不能直接使用 .关键字 来做成员访问"
        },
        fixable: null
    },
    create(context) {
        return {
            'MemberExpression': (node) => {
                if (node.property.type === 'Identifier' && KEYWORDS.includes(node.property.name)) {
                    context.report({
                        node,
                        message: '不能直接使用 .关键字 来做成员访问'
                    });
                }
            }
        };
    }
};
