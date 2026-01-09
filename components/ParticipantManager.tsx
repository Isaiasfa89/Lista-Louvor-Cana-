
import React, { useState } from 'react';
import { Participant, ParticipantRole, Song } from '../types';
import { Icons } from '../constants';

interface ParticipantManagerProps {
  participants: Participant[];
  songs: Song[];
  onAdd: (p: Omit<Participant, 'id'>) => void;
  onUpdate: (p: Participant) => void;
  onDelete: (id: string) => void;
}

const ParticipantManager: React.FC<ParticipantManagerProps> = ({ participants, songs, onAdd, onUpdate, onDelete }) => {
  const [roleFilter, setRoleFilter] = useState<ParticipantRole | 'all'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newParticipant, setNewParticipant] = useState<Partial<Participant>>({ role: 'singer', associatedSongIds: [] });
  const [selectedSingerId, setSelectedSingerId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const filteredParticipants = participants.filter(p => roleFilter === 'all' || p.role === roleFilter);
  
  const selectedSinger = participants.find(p => p.id === selectedSingerId);
  const associatedSongs = selectedSinger 
    ? songs.filter(s => selectedSinger.associatedSongIds.includes(s.id))
    : [];

  const handleToggleSongAssociation = (songId: string) => {
    if (!selectedSingerId) return;
    const p = participants.find(part => part.id === selectedSingerId);
    if (!p) return;

    const newIds = p.associatedSongIds.includes(songId)
      ? p.associatedSongIds.filter(id => id !== songId)
      : [...p.associatedSongIds, songId];
    
    onUpdate({ ...p, associatedSongIds: newIds });
  };

  const startEditing = (p: Participant) => {
    setEditingId(p.id);
    setEditName(p.name);
  };

  const saveEdit = (p: Participant) => {
    if (editName.trim()) {
      onUpdate({ ...p, name: editName.trim() });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Management Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Icons.User /> Equipe
            </h2>
            <div className="flex gap-2">
              <select 
                className="text-xs border rounded p-1 outline-none focus:ring-1 focus:ring-blue-500"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
              >
                <option value="all">Todos</option>
                <option value="singer">Cantores</option>
                <option value="musician">Músicos</option>
              </select>
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                title="Novo Integrante"
              >
                <Icons.Plus />
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {isAdding && (
              <div className="p-4 bg-blue-50 space-y-3 border-b border-blue-100">
                <input
                  type="text"
                  placeholder="Nome do integrante"
                  className="w-full p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={newParticipant.name || ''}
                  onChange={e => setNewParticipant({...newParticipant, name: e.target.value})}
                  autoFocus
                />
                <div className="flex gap-4 text-sm font-medium text-slate-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" className="w-4 h-4 text-blue-600" checked={newParticipant.role === 'singer'} onChange={() => setNewParticipant({...newParticipant, role: 'singer'})} /> Cantor(a)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" className="w-4 h-4 text-blue-600" checked={newParticipant.role === 'musician'} onChange={() => setNewParticipant({...newParticipant, role: 'musician'})} /> Músico
                  </label>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (newParticipant.name) {
                        onAdd(newParticipant as Omit<Participant, 'id'>);
                        setIsAdding(false);
                        setNewParticipant({ role: 'singer', associatedSongIds: [] });
                      }
                    }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 shadow-sm"
                  >Salvar</button>
                  <button onClick={() => setIsAdding(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-bold hover:bg-slate-300">Cancelar</button>
                </div>
              </div>
            )}

            {filteredParticipants.map(p => (
              <div key={p.id} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex-1 flex items-center gap-3">
                  {editingId === p.id ? (
                    <div className="flex-1 flex gap-2">
                      <input 
                        type="text"
                        className="flex-1 p-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit(p);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                      />
                      <button onClick={() => saveEdit(p)} className="text-green-600 p-1 hover:bg-green-50 rounded" title="Confirmar">
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-slate-400 p-1 hover:bg-slate-100 rounded" title="Cancelar">
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="flex-1 cursor-pointer" 
                      onClick={() => p.role === 'singer' ? setSelectedSingerId(p.id) : null}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{p.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-tighter shadow-sm ${
                          p.role === 'singer' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                        }`}>
                          {p.role === 'singer' ? 'Cantor' : 'Músico'}
                        </span>
                      </div>
                      {p.role === 'singer' && (
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Vínculos: {p.associatedSongIds.length} congregacionais</p>
                      )}
                    </div>
                  )}
                </div>
                
                {editingId !== p.id && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => startEditing(p)} 
                      className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar Nome"
                    >
                      <Icons.Edit />
                    </button>
                    <button 
                      onClick={() => onDelete(p.id)} 
                      className="text-slate-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {filteredParticipants.length === 0 && !isAdding && (
              <div className="p-8 text-center text-slate-400 italic text-sm">Nenhum integrante cadastrado.</div>
            )}
          </div>
        </div>

        {/* Singer Selection & Association Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Vincular Repertório</h3>
            <p className="text-xs text-slate-500">Selecione um cantor para definir quais louvores ele(a) costuma cantar</p>
          </div>
          
          <div className="p-4 flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Selecione o Cantor(a)</label>
              <select 
                className="w-full p-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSingerId || ''}
                onChange={(e) => setSelectedSingerId(e.target.value)}
              >
                <option value="">Selecione...</option>
                {participants.filter(p => p.role === 'singer').map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {selectedSinger ? (
              <div className="flex-1 flex flex-col min-h-0">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Louvores Congregacionais</label>
                <div className="flex-1 border rounded-lg overflow-y-auto bg-slate-50 divide-y divide-slate-100">
                  {songs.map(song => (
                    <div 
                      key={song.id} 
                      className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-white transition-colors"
                      onClick={() => handleToggleSongAssociation(song.id)}
                    >
                      <input 
                        type="checkbox" 
                        className="rounded w-4 h-4 text-blue-600 focus:ring-blue-500"
                        checked={selectedSinger.associatedSongIds.includes(song.id)}
                        readOnly
                      />
                      <span className={`text-sm ${selectedSinger.associatedSongIds.includes(song.id) ? 'font-bold text-blue-700' : 'text-slate-600'}`}>
                        {song.title}
                      </span>
                    </div>
                  ))}
                  {songs.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 italic">Cadastre louvores congregacionais primeiro.</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed rounded-lg p-6 text-center text-slate-400 italic text-sm bg-slate-50/30">
                Escolha um cantor na lista acima para ver e editar seus louvores frequentes.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary View */}
      {selectedSinger && (
        <div className="bg-blue-900 text-white rounded-xl p-6 shadow-xl border-t-4 border-cyan-400 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-cyan-300 text-[10px] font-black uppercase tracking-widest">Repertório de</span>
              <h2 className="text-2xl font-black">{selectedSinger.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-white/90 leading-none">{associatedSongs.length}</span>
              <p className="text-[10px] text-cyan-300 font-bold uppercase tracking-tight">Louvores associados</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {associatedSongs.map(s => (
              <div key={s.id} className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 text-sm flex justify-between items-center border border-white/5 hover:bg-white/20 transition-all">
                <span className="truncate font-medium">{s.title}</span>
                <span className="text-[10px] bg-cyan-500/30 text-cyan-100 px-1.5 py-0.5 rounded font-black whitespace-nowrap ml-2">
                  {s.keyMen}/{s.keyWomen}
                </span>
              </div>
            ))}
            {associatedSongs.length === 0 && <p className="text-sm text-blue-200 italic col-span-full opacity-60">Nenhum louvor associado ainda.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantManager;
