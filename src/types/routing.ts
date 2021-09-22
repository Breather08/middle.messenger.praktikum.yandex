import { Block } from '../utils';

export type Route = {
  path: string;
  name: string;
  title: string;
  component: Block;
};
