import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BlogPost {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'createdAt' : bigint,
  'updatedAt' : [] | [bigint],
  'category' : string,
}
export interface Comment {
  'id' : bigint,
  'content' : string,
  'createdAt' : bigint,
  'postId' : bigint,
}
export type Result = { 'ok' : BlogPost } |
  { 'err' : string };
export type Result_1 = { 'ok' : Comment } |
  { 'err' : string };
export interface _SERVICE {
  'addComment' : ActorMethod<[bigint, string], Result_1>,
  'createBlogPost' : ActorMethod<[string, string, string], Result>,
  'getAllBlogPosts' : ActorMethod<[], Array<BlogPost>>,
  'getAllCategories' : ActorMethod<[], Array<string>>,
  'getBlogPost' : ActorMethod<[bigint], [] | [BlogPost]>,
  'getComments' : ActorMethod<[bigint], Array<Comment>>,
  'getPostsByCategory' : ActorMethod<[string], Array<BlogPost>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
