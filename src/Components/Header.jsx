import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import backgroundHeader from '../../src/rawad-semaan-unsplash.webp';

export function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="" style={{ backgroundImage: `url(${backgroundHeader})` }}>
        <button
          className="
        btn btn-xs btn-success my-1        
        xs:btn-sm xs:p-2 xs:my-4
        sm:m-8 sm.text-sm
        "
          onClick={() => navigate('/')}
        >
          INÍCIO
        </button>
        <button
          className="
        btn btn-xs btn-success my-1        
        xs:btn-sm xs:p-2 xs:my-4
        sm:m-8 sm.text-sm
        "
          onClick={() => navigate('/Pronunciation')}
        >
          PRATICAR PRONÚNCIA
        </button>
        <button
          className="
        btn btn-xs btn-success my-1        
        xs:btn-sm xs:p-2 xs:my-4
        sm:m-8 sm.text-sm
        "
          onClick={() => navigate('/Study-list')}
        >
          MINHA LISTA
        </button>
      </div>
    </>
  );
}
