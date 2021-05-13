import Redis, { RedisOptions } from 'ioredis';
import { Container } from 'typedi';

/**
 * The main Redis client decorator used for injecting the `Redis` object
 * into class constructors.
 */
const RedisClient =
  (config?: RedisOptions): ParameterDecorator =>
  (object: any, propertyKey, index): any => {
    const client = new Redis(config);
    const propertyName = propertyKey ? propertyKey.toString() : '';
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => client,
    });
  };

export default RedisClient;
