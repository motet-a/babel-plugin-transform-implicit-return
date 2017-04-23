
module.exports = function (babel) {
    const t = babel.types

    function addReturnToBlockStatement(path) {
        t.assertBlockStatement(path)

        const body = path.get('body')
        if (!body.length) {
            return
        }

        const last = body[body.length - 1]
        if (!t.isExpressionStatement(last)) {
            return
        }

        last.replaceWith(t.returnStatement(last.node.expression))
    }

    function shouldBlockStatementBeTransformed(path) {
        t.assertBlockStatement(path)

        const directives = path.get('directives')
        const irDirectives = directives.filter(
            d => d.node.value.value === 'implicitReturn'
        )

        if (!irDirectives.length) {
            return false
        }

        irDirectives.forEach(d => d.remove())

        return true
    }

    function visitFunction(path) {
        const block = path.get('body')

        // Some arrow functions doesn't have one
        if (!t.isBlockStatement(block)) {
            return
        }

        if (shouldBlockStatementBeTransformed(block)) {
            addReturnToBlockStatement(block)
        }
    }

    return {
        visitor: {
            FunctionExpression: visitFunction,
            FunctionDeclaration: visitFunction,
            ArrowFunctionExpression: visitFunction,
        },
    }
}
