
import React, { useState, useEffect } from 'react';
import { Song, Participant, ServiceScale } from './types';
import { HARPA_INITIAL, CONGREGATIONAL_INITIAL } from './constants';
import SongManager from './components/SongManager';
import ParticipantManager from './components/ParticipantManager';
import ServiceScaleManager from './components/ServiceScaleManager';

type ActiveView = 'harpa' | 'congregational' | 'participants' | 'scales';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('harpa');
  const [songs, setSongs] = useState<Song[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [scales, setScales] = useState<ServiceScale[]>([]);

  useEffect(() => {
    const savedSongs = localStorage.getItem('canaa_songs');
    const savedParticipants = localStorage.getItem('canaa_participants');
    const savedScales = localStorage.getItem('canaa_scales');

    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    } else {
      setSongs([...HARPA_INITIAL, ...CONGREGATIONAL_INITIAL]);
    }

    if (savedParticipants) setParticipants(JSON.parse(savedParticipants));
    if (savedScales) setScales(JSON.parse(savedScales));
  }, []);

  useEffect(() => {
    localStorage.setItem('canaa_songs', JSON.stringify(songs));
    localStorage.setItem('canaa_participants', JSON.stringify(participants));
    localStorage.setItem('canaa_scales', JSON.stringify(scales));
  }, [songs, participants, scales]);

  const addSong = (newSong: Omit<Song, 'id'>) => {
    const song: Song = { ...newSong, id: Math.random().toString(36).substr(2, 9) };
    setSongs(prev => [...prev, song]);
  };

  const updateSong = (updatedSong: Song) => {
    setSongs(prev => prev.map(s => s.id === updatedSong.id ? updatedSong : s));
  };

  const deleteSong = (id: string) => {
    if (window.confirm('Deseja realmente excluir este louvor?')) {
      setSongs(prev => prev.filter(s => s.id !== id));
    }
  };

  const addParticipant = (p: Omit<Participant, 'id'>) => {
    const participant: Participant = { ...p, id: Math.random().toString(36).substr(2, 9) };
    setParticipants(prev => [...prev, participant]);
  };

  const updateParticipant = (updatedP: Participant) => {
    setParticipants(prev => prev.map(p => p.id === updatedP.id ? updatedP : p));
  };

  const deleteParticipant = (id: string) => {
    if (window.confirm('Excluir este integrante?')) {
      setParticipants(prev => prev.filter(p => p.id !== id));
    }
  };

  const addScale = (s: Omit<ServiceScale, 'id'>) => {
    const scale: ServiceScale = { ...s, id: Math.random().toString(36).substr(2, 9) };
    setScales(prev => [...prev, scale]);
  };

  const deleteScale = (id: string) => {
    if (window.confirm('Excluir esta escala?')) {
      setScales(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header com Identidade Oficial - Círculo Removido conforme solicitado */}
      <header className="bg-gradient-to-br from-[#0c4a6e] via-[#164e63] to-[#1e1b4b] text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <h1 className="text-3xl font-brand font-extrabold tracking-tight text-white leading-none">Louvor Canaã</h1>
              <p className="text-xs font-medium tracking-[0.2em] text-cyan-300 uppercase italic mt-2">Uma Promessa de Deus</p>
            </div>
          </div>
          <nav className="hidden lg:flex bg-black/20 backdrop-blur-md p-1 rounded-xl gap-1">
            <NavButton active={activeView === 'harpa'} onClick={() => setActiveView('harpa')}>Harpa</NavButton>
            <NavButton active={activeView === 'congregational'} onClick={() => setActiveView('congregational')}>Congregacional</NavButton>
            <NavButton active={activeView === 'participants'} onClick={() => setActiveView('participants')}>Integrantes</NavButton>
            <NavButton active={activeView === 'scales'} onClick={() => setActiveView('scales')}>Escalas</NavButton>
          </nav>
        </div>
        
        {/* Mobile/Tablet Navigation */}
        <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-2 bg-[#082f49] border-t border-white/10 no-scrollbar">
          <NavButton active={activeView === 'harpa'} onClick={() => setActiveView('harpa')}>Harpa</NavButton>
          <NavButton active={activeView === 'congregational'} onClick={() => setActiveView('congregational')}>Congregacional</NavButton>
          <NavButton active={activeView === 'participants'} onClick={() => setActiveView('participants')}>Equipe</NavButton>
          <NavButton active={activeView === 'scales'} onClick={() => setActiveView('scales')}>Escalas</NavButton>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8">
        {activeView === 'harpa' && (
          <SongManager
            type="harpa"
            songs={songs.filter(s => s.type === 'harpa')}
            onAdd={addSong}
            onUpdate={updateSong}
            onDelete={deleteSong}
          />
        )}
        {activeView === 'congregational' && (
          <SongManager
            type="congregational"
            songs={songs.filter(s => s.type === 'congregational')}
            onAdd={addSong}
            onUpdate={updateSong}
            onDelete={deleteSong}
          />
        )}
        {activeView === 'participants' && (
          <ParticipantManager
            participants={participants}
            songs={songs.filter(s => s.type === 'congregational')}
            onAdd={addParticipant}
            onUpdate={updateParticipant}
            onDelete={deleteParticipant}
          />
        )}
        {activeView === 'scales' && (
          <ServiceScaleManager
            scales={scales}
            allSongs={songs}
            participants={participants}
            onAdd={addScale}
            onDelete={deleteScale}
          />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 p-6 text-center text-xs border-t border-slate-800 mt-auto">
        <p className="font-bold text-slate-300 mb-1 tracking-widest uppercase">Ministério Canaã</p>
        <p>&copy; {new Date().getFullYear()} Gestão de Louvor - Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; children: React.ReactNode; onClick: () => void }> = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
      active ? 'bg-cyan-500 text-white shadow-lg scale-105' : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`}
  >
    {children}
  </button>
);

export default App;
