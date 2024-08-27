export const idlFactory = ({ IDL }) => {
  const Comment = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'createdAt' : IDL.Int,
    'postId' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'ok' : Comment, 'err' : IDL.Text });
  const BlogPost = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'createdAt' : IDL.Int,
    'updatedAt' : IDL.Opt(IDL.Int),
    'category' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : BlogPost, 'err' : IDL.Text });
  return IDL.Service({
    'addComment' : IDL.Func([IDL.Nat, IDL.Text], [Result_1], []),
    'createBlogPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
    'getAllBlogPosts' : IDL.Func([], [IDL.Vec(BlogPost)], ['query']),
    'getAllCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getBlogPost' : IDL.Func([IDL.Nat], [IDL.Opt(BlogPost)], ['query']),
    'getComments' : IDL.Func([IDL.Nat], [IDL.Vec(Comment)], ['query']),
    'getPostsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(BlogPost)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
