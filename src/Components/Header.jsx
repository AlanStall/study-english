import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImHome3 } from 'react-icons/im';

export function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-flow-col bg-blue-900 p-1 mx-1 my-3 sm:mx-3 rounded-lg">
        
        <div className='flex justify-start'>
          <div className="card w-[65px] h-[50px]">
            <a            
              className="btn btn-ghost rounded-md fill-[#ffffff]" onClick={() => navigate('/')}
            >
              <svg>
                <ImHome3 className="fill-[#ffffff]" size={'30px'} x="0px" y="10px"/>
              </svg>          
            </a>
          </div>


          <div className="">

            <div className="dropdown dropdown-right">

              <label tabIndex={0} className="btn btn-ghost btn-circle p-0.5 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
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
