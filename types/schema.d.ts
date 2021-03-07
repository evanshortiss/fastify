/**
 * Schemas in Fastify follow the JSON-Schema standard. For this reason
 * we have opted to not ship strict schema based types. Instead we provide
 * an example in our documentation on how to solve this problem. Check it
 * out here:
 */
export interface FastifySchema<T> {
  body?: unknown;
  querystring?: unknown;
  params?: unknown;
  headers?: unknown;
  response?: unknown;
}

export type SchemaType<T> = {
  [K in keyof T]: T[K]
}

export interface FastifyRouteSchemaDef<T> {
  schema: SchemaType<T>;
  method: string;
  url: string;
  httpPart?: string;
  httpStatus?: string;
}

export interface FastifySchemaValidationError {
  message?: string;
  dataPath: string;
}

export interface FastifyValidationResult {
  (data: any): boolean | PromiseLike<any> | { error?: Error, value?: any }
  errors?: FastifySchemaValidationError[] | null;
}

/**
 * Compiler for FastifySchema Type
 */
export type FastifySchemaCompiler<T> = (routeSchema: FastifyRouteSchemaDef<T>) => FastifyValidationResult

export type FastifySerializerCompiler<T> = (routeSchema: FastifyRouteSchemaDef<T>) => (data: any) => string
