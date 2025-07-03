import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from '../graphql/types/schema.js';
import depthLimit from 'graphql-depth-limit'
import { createContext } from './types/loader/createLoader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const query = parse(req.body.query);
      const validationErrors  = validate(schema, query, [ depthLimit(5)]);
      if(validationErrors  && validationErrors .length > 0 ){
        return { errors: validationErrors }
      }

      const context = createContext(prisma);

      return await graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: context,
      });
    },
  });
};

export default plugin;
