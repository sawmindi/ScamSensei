import Link from 'next/link'
import { MdOutlinePostAdd } from "react-icons/md";
import Image from 'next/image'

const style = {
  wrapper: `flex items-center mx-auto space-x-3 max-w-full p-6  border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`,
  redirectContainer: `flex flex-1 w-full items-center cursor-pointer`, // Updated
  redirectButton: ` mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white flex items-center`, // Updated
  iconsContainer: `flex items-center space-x-1 px-1`,
  icon: `h-9 w-9  rounded stroke-[1.5px] p-1.5 text-gray-400 hover:bg-[#343536]`,
}

const CreatePost = () => {
  return (
    <div className={style.wrapper}>
       <Link legacyBehavior href={`/New`}>
      <div className={style.redirectContainer}>
       
          <a className={style.redirectButton}>
            <Image src="/letter.png" alt="Create Post" width={30} height={30} className='mr-5 ml-5' />
            Create Post
          </a>
      
      </div>
      </Link>
    </div>
  )
}

export default CreatePost
