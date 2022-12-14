import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImHome3 } from 'react-icons/im';
import { AiOutlineMenuUnfold } from 'react-icons/ai';

export function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-flow-col bg-blue-900 p-1 mx-1 my-3 sm:mx-3 rounded-lg">
        
        <div className='flex justify-start gap-1'>
          
          <div className="card w-[65px] h-[50px]">
            <a            
              className="btn btn-ghost fill-[#ffffff]" onClick={() => navigate('/')}
            >
              <svg>
                <ImHome3 className="fill-[#ffffff]" size={'30px'} x="0px" y="10px"/>
              </svg>          
            </a>
          </div>

          <div className="">
            <div className="dropdown dropdown-right">
              <label tabIndex={0}>
                <AiOutlineMenuUnfold className="btn btn-ghost pt-2 p-0.5 w-12 fill-[#ffffff] rounded-xl" size={'30px'} x="0px" y="0px"/>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content bg-blue-600 rounded-box">
                <li><button className='btn btn-ghost btn-xs normal-case content-center py-6 text-[7px] w-[120px] xs:text-[10px] xs:w-[150px] sm:py-4 sm:text-[10px] sm:w-[300px]' onClick={() => navigate('/Add')}>ADICIONAR</button></li>
                <li><button className='btn btn-ghost btn-xs normal-case content-center py-6 text-[7px] w-[120px] xs:text-[10px] xs:w-[150px] sm:py-4 sm:text-[10px] sm:w-[300px]' onClick={() => navigate('/ListRecords')}>MINHA LISTA</button></li>
                <li><button className='btn btn-ghost btn-xs normal-case content-center py-6 text-[7px] w-[120px] xs:text-[10px] xs:w-[150px] sm:py-4 sm:text-[10px] sm:w-[300px]' onClick={() => navigate('/StudyRandom')}>ESTUDAR SORTEANDO AS PALAVRAS E FRASES</button></li>
                <li><button className='btn btn-ghost btn-xs normal-case content-center py-6 text-[7px] w-[120px] xs:text-[10px] xs:w-[150px] sm:py-4 sm:text-[10px] sm:w-[300px]' onClick={() => navigate('/StudyNotRandom')}>ESTUDAR PELA ORDEM DE CADASTRO</button></li>                
              </ul>
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <button className="btn btn-ghost normal-case text-[18px] sm:text-[20px]" onClick={() => navigate('/')}>Study English</button>
        </div>

      </div>
    </>
  );
}
