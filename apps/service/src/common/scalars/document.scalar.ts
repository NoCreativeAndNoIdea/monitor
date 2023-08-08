import { ASTNode, GraphQLScalarType, Kind } from 'graphql'
import { print } from 'graphql/language'

// eslint-disable-next-line complexity
function parseLiteral(typeName, ast, variables) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return Number.parseFloat(ast.value)
    case Kind.OBJECT:
      return parseObject(typeName, ast, variables)
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(typeName, n, variables))
    case Kind.NULL:
      return null
    case Kind.VARIABLE:
      return variables ? variables[ast.name.value] : undefined
    default:
      throw new TypeError(`${typeName} cannot represent value: ${print(ast)}`)
  }
}
function parseObject(typeName, ast, variables) {
  const value = Object.create(null)
  ast.fields.forEach((field) => {
    value[field.name.value] = parseLiteral(typeName, field.value, variables)
  })

  return value
}
function ensureObject(value) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`Document cannot represent non-object value: ${value}`)
  }

  return value
}

export const DocumentScalar = new GraphQLScalarType({
  name: 'Document',
  description: 'Custom scalar type for mongodb document',
  parseValue: ensureObject,
  serialize: ensureObject,
  parseLiteral(ast: ASTNode, variables): any {
    if (ast.kind !== Kind.OBJECT) {
      throw new TypeError(`Document cannot represent non-object value: ${print(ast)}`)
    }
    return parseObject('Document', ast, variables)
  }
})
