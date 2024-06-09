import Post from "./Post";



const style = {
  wrapper:"space-y-2.5"
}
const Feed = ({posts}) => {
  
  const sortedPosts = posts.sort((a, b) => {
    const scoreA = (a.upvotes || 0) - (a.downvotes || 0);
    const scoreB = (b.upvotes || 0) - (b.downvotes || 0);
    return scoreB - scoreA;
  });
  console.log(sortedPosts,"posts");
  return (
    <div className="md:grid md:justify-center md:grid-cols-2 gap-20">
    {sortedPosts ? sortedPosts.map((post,id)=>{ return <Post title={post.title ? post.title: "No title"}
     id={post._id ? post._id: "No id"}
      author={post.name}
      district={post.district}
      key={id} upvotes={post.upvotes ? post.upvotes:0} downvotes={post.downvotes? post.downvotes: 0}
      content={post.scam}
      image={post.myFile ? post.myFile:""}/>}) :<div>No posts create one</div>}
   
    </div>
  );
}
export default Feed;