'use strict';
const RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 5 // 默认支持语法为es5 
    }
});

ruleTester.run("no-keyword-member-access", require("../lib/rules/no-keyword-member-access"), {
    // 正确的测试用例
    valid: [
        { code: 'a["class"]' },
        { code: '// a.class;' }
    ],
    // 错误的测试用例
    invalid: [
        {
            code: 'a.delete;',
            errors: [{
                message: "不能直接使用 .关键字 来做成员访问", // 与rule抛出的错误保持一致
                type: "MemberExpression" // rule监听的对应钩子
            }]
        }
    ]
});

ruleTester.run("setTimeout-trim", require("../lib/rules/setTimeout-trim"), {

    // 正确的测试用例
    valid: [
        { code: 'setTimeout(function(){},10);', options: [] },
        { code: 'setTimeout(function(){function a(){};},10);' },
        { code: 'setTimeout();' }
    ],
    // 错误的测试用例
    invalid: [
        {
            code: 'var a = function(){};setTimeout(a,10);',
            errors: [{
                message: "定时器的第一个参数必须为匿名函数", // 与rule抛出的错误保持一致
                type: "CallExpression" // rule监听的对应钩子
            }]
        },
        {
            code: 'setTimeout(function(){this;},10);',
            errors: [{
                message: "定时器内不允许直接使用this访问", // 与rule抛出的错误保持一致
                type: "CallExpression" // rule监听的对应钩子
            }]
        }
    ]
});

