import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImHome3 } from 'react-icons/im';

export function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-blue-900 p-4 m-8 rounded-lg grid grid-flow-col">
        
        <div className='flex justify-start'>
          <div className="card w-[80px] h-[50px]">
            <a            
              className="btn btn-ghost rounded-md fill-[#ffffff] normal-case text-[20px]" onClick={() => navigate('/')}
            >
              <svg size={'60px'}>
                <ImHome3 className="fill-[#ffffff]" size={'40px'} x="3px" y="0px"/>
              </svg>          
            </a>
          </div>


          <div className="">

            <div className="dropdown">

              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </label>

              <ul tabIndex={0} className="menu menu-compact dropdown-content bg-blue-600 rounded-box">
                <li><button className='btn btn-ghost normal-case text-[9px] h-1 w-56' onClick={() => navigate('/Add')}>ADICIONAR</button></li>
                <li><button className='btn btn-ghost normal-case text-[9px] h-1 w-56' onClick={() => navigate('/ListRecords')}>MINHA LISTA</button></li>
                <li><button className='btn btn-ghost normal-case text-[9px] h-1 w-56' onClick={() => navigate('/StudyRandom')}><p>ESTUDAR SORTEANDO SUAS ANOTAÇÕES</p></button></li>
                <li><button className='btn btn-ghost normal-case text-[9px] h-1 w-56' onClick={() => navigate('/StudyNotRandom')}><p>ESTUDAR PELA ORDEM DE CADASTRO</p></button></li>                
              </ul>
            </div>

          </div>
        </div>

        
        

        

        <div className="flex justify-end">
          <button className="btn btn-ghost normal-case text-[20px]" onClick={() => navigate('/')}>Study English</button>
        </div>

      </div>
    </>
  );
}
