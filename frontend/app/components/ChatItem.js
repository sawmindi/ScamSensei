import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import logos from "../../public/logos.png";

function ChatItem({ content, role }) {
    const auth = useAuth();
    return role === "assistant" ? (
      <div className="flex items-center p-2 bg-slate-800 text-white rounded-lg gap-2">
        <div className="shrink-0 bg-white rounded-full p-1">
          <Image src={logos} alt="AI" width={30} height={30} />
        </div>
        <div className="flex-1 min-w-0 p-2 m-2">
          <p className="text-white text-lg break-words">{content}</p>
        </div>
      </div>
    ) : (
      <div className="flex items-center p-2  gap-2">
        <div className="shrink-0 w-10 h-10 bg-black border border-white text-white rounded-full flex justify-center items-center text-lg">
          {auth?.user?.name[0]}
          
        </div>
        <div className="self-end  text-white rounded-lg p-2 m-2">
          <p className="text-white text-lg break-words">{content}</p>
        </div>
      </div>
    );
  }
  
  export default ChatItem;
  