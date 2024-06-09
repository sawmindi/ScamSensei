import React from 'react'
import Image from 'next/image'

function Button({ label, type, icon, variant}) {
  return (
    <button type={type} className={`gap-3 rounded-full border flex items-center justify-center ${variant}`}>
        <p className='bold-16 whitespace-nowrap'>{ label }</p>
      {icon && <Image src={icon} alt="icon" width={24} height={24}/>}
      
    </button>
  )
}

export default Button
