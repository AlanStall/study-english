import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import background from '../../src/chris-dickens-unsplash-0.webp';

export function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="hero min-h-screen"
      id="background"
      style={{ backgroundImage: `url(${background})`, height: '100%', width: '100%' }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content xs:w-10">
        <div className="max-w-md my-16 items-center">
          <h1 className="title font-bold text-base xxs:text-[24px] sm:text-[28px]">
            STUDY ENGLISH
          </h1>
          <br></br>
          <button
            className="btn btn-primary m-2 text-[10px] w-20 xxs:w-32 xxs:text-[12px] xs:w-64 xs:text-[14px] sm:text-[16px]"
            onClick={() => navigate('/Pronunciation')}
          >
            PRATICAR PRONÚNCIA
          </button>
          <button
            className="btn btn-primary m-2 text-[10px] w-20 xxs:w-32 xxs:text-[12px] xs:w-64 xs:text-[14px] sm:text-[16px]"
            onClick={() => navigate('/Study-list')}
          >
            MINHA LISTA
          </button>
        </div>
      </div>
    </div>
  );
}
