import React from 'react'
import cell from "../../../assets/imgs/Celular.png"

const CellBox = ({children}) =>{

    return(
        <div className='min-w-[360px] min-h-[680px] max-w-[360px] max-h-[680px] rounded-[55px] overflow-x-hidden'>
            <img className='absolute h-auto min-w-[370px] min-h-[674px] max-w-[360px] max-h-[670px]' src={cell} alt="cell-box" />
            <div className='w-full h-full rounded-[55px]  '>
                <div className='flex flex-col rounded-t-[52px] rounded-b-[50px] w-full h-[full] items-center scroll-my-1'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CellBox;