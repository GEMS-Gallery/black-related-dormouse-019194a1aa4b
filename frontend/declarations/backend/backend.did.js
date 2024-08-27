export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Time = IDL.Int;
  const BlogPost = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'createdAt' : Time,
    'updatedAt' : IDL.Opt(Time),
  });
  const Comment = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'createdAt' : Time,
    'postId' : IDL.Nat,
  });
  return IDL.Service({
    'addComment' : IDL.Func([IDL.Nat, IDL.Text], [Result], []),
    'createBlogPost' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'getAllBlogPosts' : IDL.Func([], [IDL.Vec(BlogPost)], ['query']),
    'getBlogPost' : IDL.Func([IDL.Nat], [IDL.Opt(BlogPost)], ['query']),
    'getComments' : IDL.Func([IDL.Nat], [IDL.Vec(Comment)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
