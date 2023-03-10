import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../src/chris-dickens-unsplash-0.webp';

export function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="hero min-h-screen"
      data-theme="emerald"
      style={{ backgroundImage: `url(${background})`, height: '100%', width: '100%' }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content xs:w-10">
        <div className="my-12 items-center">
          <div className="mb-2 grid place-items-center">
            <h1
              className="title font-bold text-base my-6 text-[#ffffff] text-[24px] sm:text-[28px] lg:text-[32px]"
              title="Study English"
            >
              STUDY ENGLISH
            </h1>
            <label
              htmlFor="my-modal-6"
              className="btn btn-active btn-info btn-sm modal-button animate-pulse text-[10px] w-12 w-32 xs:w-40 xs:text-[10px] sm:text-[12px]"
            >
              Como funciona!!!
            </label>
          </div>

          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal modal-bottom modal-middle" data-theme="dark">
            <div className="modal-box text-[15px]">
              <h3 className="font-bold text-[18px] text-[#ffffff] tracking-[.30em]">
                Como funciona!!!
              </h3>
              <div className="py-1 leading-loose">
                Você adiciona suas palavras ou frases em inglês e também em português, e pode
                estudá-las em
                <p className="btn btn-outline btn-info btn-xs text-[#000000] mx-0.5">MINHA LISTA</p>
                , ou uma a uma de forma aleatória em
                <p className="btn btn-outline btn-info btn-xs text-[#000000] mx-0.5">
                  ESTUDAR SORTEANDO AS PALAVRAS E FRASES
                </p>
                , ou uma a uma pela ordem de cadastro que você adicionou, em
                <p className="btn btn-outline btn-info btn-xs text-[#000000] mx-0.5">
                  ESTUDAR PELA ORDEM DE CADASTRO
                </p>
                ;
              </div>
              <div className="py-1 leading-loose">
                Você poderá ouvir a pronúncia correta de cada palavra ou frase em inglês, porém,
                para isso, precisará acessar a aplicação pelo navegador Google Chrome ou por
                dispositivos Android;
              </div>
              <div className="py-1 leading-loose">
                Em qualquer momento você também poderá visualizar a tradução que você cadastrou,
                pelos botões ou ícones de tradução.
              </div>
              <div className="modal-action">
                <label htmlFor="my-modal-6" className="btn">
                  Ok!
                </label>
              </div>
            </div>
          </div>

          <h3 className="title w-auto text-[#e7e7e7] font-bold tracking-wide mb-12">
            Você adiciona suas palavras ou frases em inglês, e também a tradução e outras
            observações em português
          </h3>

          <button
            className="btn btn-info leading-tight tracking-wider m-2 text-[8px] w-20 w-32 xs:w-64 xs:text-[10px] sm:text-[12px]"
            onClick={() => navigate('/Add')}
          >
            ADICIONAR
          </button>

          <button
            className="btn btn-info leading-tight tracking-wider m-2 text-[8px] w-20 w-32 xs:w-64 xs:text-[10px] sm:text-[12px]"
            onClick={() => navigate('/ListRecords')}
          >
            MINHA LISTA
          </button>

          <button
            className="btn btn-info leading-tight tracking-wider m-2 text-[8px] w-20 w-32 xs:w-64 xs:text-[10px] sm:text-[12px]"
            onClick={() => navigate('/StudyRandom')}
          >
            <p>ESTUDAR SORTEANDO</p>
            <p>AS PALAVRAS E FRASES</p>
          </button>

          <button
            className="btn btn-info leading-tight tracking-wider m-2 text-[8px] w-20 w-32 xs:w-64 xs:text-[10px] sm:text-[12px]"
            onClick={() => navigate('/StudyNotRandom')}
          >
            <p>ESTUDAR PELA</p>
            <p>ORDEM DE CADASTRO</p>
          </button>
        </div>
      </div>
    </div>
  );
}
