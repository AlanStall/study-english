import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../src/chris-dickens-unsplash-0.webp';

export function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${background})`, height: '100%', width: '100%'}}
    >
      <div className="hero-overlay bg-opacity-70" ></div>
      <div className="hero-content text-center text-neutral-content xs:w-10">
        <div className="my-12 items-center">

        <div className='mb-2 grid place-items-center'>
          <h1 className="title font-bold text-base text-[#ffffff] xxs:text-[24px] sm:text-[30px]" title="Study English">STUDY ENGLISH</h1>
          <label htmlFor="my-modal-6" className="btn btn-primary btn-sm modal-button animate-pulse text-[10px] w-12 xxs:w-32 xxs:text-[10px] xs:w-40 xs:text-[12px] sm:text-[14px]">Como funciona!</label>
        </div>

        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom modal-middle">
          <div className="modal-box text-[15px]">
            <h3 className="font-bold text-[18px] text-[#ffffff] tracking-[.30em]">Como funciona!</h3>
            <div className="py-1 leading-loose">Você adiciona suas palavras ou frases em inglês e também em português, e pode estudá-las em  
              <p className='btn btn-outline btn-primary btn-xs text-[#000000]'>MINHA LISTA</p> , ou estudar uma a uma de forma aleatória em 
              <p className='btn btn-outline btn-primary btn-xs text-[#000000]'>ESTUDAR SORTEANDO PALAVRAS</p> ou estudar uma a uma pela ordem de cadastro que você cadastrou, em 
              <p className='btn btn-outline btn-primary btn-xs text-[#000000]'>ESTUDAR PELA ORDEM DE CADASTRO</p> ;
            </div>
            <div className="py-1 leading-loose">Você poderá ouvir a pronúncia correta de cada palavra em inglês, porém, para isso, você precisará acessar esta aplicação pelo navegador Google Chrome ou por dispositivos Android;</div>
            <div className="py-1 leading-loose">Em qualquer momento você também poderá visualizar a tradução que você cadastrou, pelos botões ou ícones de tradução.</div>            
            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn">Ok!</label>
            </div>
          </div>
        </div>

          <h3 className="title w-auto text-[#e7e7e7] font-bold tracking-wide mb-12">Você adiciona suas palavras ou frases em inglês, e também a tradução e outras observações em português</h3>

          <button
            className="btn btn-primary leading-tight m-2 text-[10px] w-20 xxs:w-32 xxs:text-[10px] xs:w-64 xs:text-[12px] sm:text-[14px]"
            onClick={() => navigate('/Add')}
          >
            ADICIONAR
          </button>

          <button
            className="btn btn-primary leading-tight m-2 text-[10px] w-20 xxs:w-32 xxs:text-[10px] xs:w-64 xs:text-[12px] sm:text-[14px]"
            onClick={() => navigate('/ListRecords')}
          >
            MINHA LISTA
          </button>

          <button
            className="btn btn-primary leading-tight m-2 text-[10px] w-20 xxs:w-32 xxs:text-[10px] xs:w-64 xs:text-[12px] sm:text-[14px]"
            onClick={() => navigate('/StudyRandom')}
          >
            ESTUDAR SORTEANDO PALAVRAS
          </button>

          <button
            className="btn btn-primary leading-tight m-2 text-[10px] w-20 xxs:w-32 xxs:text-[10px] xs:w-64 xs:text-[12px] sm:text-[14px]"
            onClick={() => navigate('/StudyNotRandom')}
          >
            ESTUDAR PELA ORDEM DE CADASTRO
          </button>
        </div>
      </div>
    </div>
  );
}
