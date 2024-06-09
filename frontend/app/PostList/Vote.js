
'use client'

import {useAuth} from '../context/AuthContext'
import {useState} from 'react'
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
const style = {
    votes:"py-1 font-bold text-white text-2xl",
    wrapper:'flex flex-row items-center'
}
const Vote =({upvotes,downvotes,id})=>{
    const auth = useAuth()
    const [upvotesstate, setUpvotes] = useState(upvotes);
    const [downvotesstate, setDownvotes] = useState(downvotes);
    const handleupvote = async () => {
        const data = await auth.upvote(id);
        if (data) {
            setUpvotes(prevUpvotes => prevUpvotes + 1);
        }
   
      };
  
      const handledownvote = async () => {
        const data = await auth.downvote(id);
        if (data) {
            setDownvotes(prevDownvotes => prevDownvotes + 1);
        }
    
      };
    return (
        <div className={style.wrapper}>
            <button onClick={handleupvote}>
                <BiUpvote className=' text-3xl hover:text-slate-950'/>
            </button>
            <p className={style.votes}>{upvotesstate - downvotesstate}</p>
            <button onClick={handledownvote}>
                <BiDownvote className=' text-3xl hover:text-slate-950'/>
            </button>
        </div>
    )
}

export default Vote