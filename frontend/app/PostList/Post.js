
'use client'
import Vote from "./Vote";
import Image from "next/image";

const style = {
  post: 'flex flex-col space-y-1 cursor-pointer',
  wrapper: 'flex mx-auto space-x-3 max-w-full   sm:w-full lg:w-50 p-6  border rounded-lg shadow   border-gray-700 hover:bg-gray-900',
  postTitle: 'text-lg font-medium text-[#FFFFFF]',
  postContent: "text-sm font-light text-[#d7dadc]/80",
};

const Post = ({id,title,author,upvotes,downvotes,content,district,image}) => {
 

  return (
  
  <div
          className={`flex flex-col my-4  rounded-lg text-surface shadow-secondary-1 bg-zinc-800 text-white sm:shrink-0 sm:grow sm:basis-0 `}
        >
         
          <div className="flex-shrink-0 flex  mx-auto  object-fill min-h-[50vh] content-center justify-center items-center">
            <Image
              className={`rounded-t-lg max-h-[50vh] max-w-[30vw]`}
              src={image ? image : "/noimage.jpg"}
              alt={title}
              width={500}
              height={300}
            />
           
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-2xl leading-tight">{title}</h5>
            <p className="mb-4 text-xl">{content}</p>
            <div className="mb-4 text-base text-surface/75 dark:text-neutral-300 ">
             
            <div className="flex justify-between items-center">
          <span className="text-surface/75 dark:text-neutral-300 mt-2">{author} from {district}</span>
          <Vote upvotes={upvotes} downvotes={downvotes} id={id}/>
        </div>
            
            </div>

          </div>
        </div>
   
  )
};

export default Post;
