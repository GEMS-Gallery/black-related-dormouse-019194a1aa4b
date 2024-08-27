import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BlogPost {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'createdAt' : Time,
  'updatedAt' : [] | [Time],
}
export interface Comment {
  'id' : bigint,
  'content' : string,
  'createdAt' : Time,
  'postId' : bigint,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addComment' : ActorMethod<[bigint, string], Result>,
  'createBlogPost' : ActorMethod<[string, string], Result>,
  'getAllBlogPosts' : ActorMethod<[], Array<BlogPost>>,
  'getBlogPost' : ActorMethod<[bigint], [] | [BlogPost]>,
  'getComments' : ActorMethod<[bigint], Array<Comment>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
