import { Cluster, ClusterNode, ClusterOptions } from 'ioredis';
import { Container } from 'typedi';

/**
 * The main Redis Cluster client decorator used for injecting the
 * `Redis.Cluster` object into class constructors.
 */
const RedisClusterClient =
  (nodes: ClusterNode[], config?: ClusterOptions): ParameterDecorator =>
  (object: any, propertyKey, index): any => {
    const client = new Cluster(nodes, config);
    const propertyName = propertyKey ? propertyKey.toString() : '';
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => client,
    });
  };

export default RedisClusterClient;
