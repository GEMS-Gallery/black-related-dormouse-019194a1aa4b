import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor {
  type BlogPost = {
    id: Nat;
    title: Text;
    content: Text;
    createdAt: Int;
    updatedAt: ?Int;
  };

  type Comment = {
    id: Nat;
    postId: Nat;
    content: Text;
    createdAt: Int;
  };

  stable var nextPostId: Nat = 0;
  stable var nextCommentId: Nat = 0;
  stable var blogPosts: [(Nat, BlogPost)] = [];
  stable var comments: [(Nat, Comment)] = [];

  public func createBlogPost(title: Text, content: Text): async Result.Result<BlogPost, Text> {
    let id = nextPostId;
    let timestamp = Time.now();
    let post: BlogPost = {
      id;
      title;
      content;
      createdAt = timestamp;
      updatedAt = null;
    };
    blogPosts := Array.append(blogPosts, [(id, post)]);
    nextPostId += 1;
    #ok(post)
  };

  public query func getBlogPost(id: Nat): async ?BlogPost {
    Option.map<(Nat, BlogPost), BlogPost>(
      Array.find(blogPosts, func(entry: (Nat, BlogPost)) : Bool { entry.0 == id }),
      func(entry: (Nat, BlogPost)) : BlogPost { entry.1 }
    )
  };

  public query func getAllBlogPosts(): async [BlogPost] {
    Array.map(blogPosts, func(entry: (Nat, BlogPost)) : BlogPost { entry.1 })
  };

  public func addComment(postId: Nat, content: Text): async Result.Result<Comment, Text> {
    switch (Array.find(blogPosts, func(entry: (Nat, BlogPost)) : Bool { entry.0 == postId })) {
      case null { #err("Blog post not found") };
      case (?_) {
        let id = nextCommentId;
        let timestamp = Time.now();
        let comment: Comment = {
          id;
          postId;
          content;
          createdAt = timestamp;
        };
        comments := Array.append(comments, [(id, comment)]);
        nextCommentId += 1;
        #ok(comment)
      };
    }
  };

  public query func getComments(postId: Nat): async [Comment] {
    Array.mapFilter(comments, func(entry: (Nat, Comment)) : ?Comment {
      if (entry.1.postId == postId) {
        ?entry.1
      } else {
        null
      }
    })
  };
}
