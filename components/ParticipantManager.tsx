
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
  const [editForm, setEditForm] = useState<{name: string, role: ParticipantRole}>({name: '', role: 'singer'});

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
    setEditForm({ name: p.name, role: p.role });
  };

  const saveEdit = (p: Participant) => {
    if (editForm.name.trim()) {
      onUpdate({ ...p, name: editForm.name.trim(), role: editForm.role });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <input type="radio" checked={newParticipant.role === 'singer'} onChange={() => setNewParticipant({...newParticipant, role: 'singer'})} /> Cantor(a)
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" checked={newParticipant.role === 'musician'} onChange={() => setNewParticipant({...newParticipant, role: 'musician'})} /> Músico
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
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold"
                  >Salvar</button>
                  <button onClick={() => setIsAdding(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-bold">Cancelar</button>
                </div>
              </div>
            )}

            {filteredParticipants.map(p => (
              <div key={p.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex-1 flex items-center gap-3">
                  {editingId === p.id ? (
                    <div className="flex-1 flex flex-col gap-2">
                      <input 
                        type="text"
                        className="w-full p-1.5 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editForm.name}
                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                        autoFocus
                      />
                      <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-500">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" checked={editForm.role === 'singer'} onChange={() => setEditForm({...editForm, role: 'singer'})} /> Cantor
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" checked={editForm.role === 'musician'} onChange={() => setEditForm({...editForm, role: 'musician'})} /> Músico
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="flex-1 cursor-pointer" 
                      onClick={() => p.role === 'singer' ? setSelectedSingerId(p.id) : null}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{p.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-tighter ${
                          p.role === 'singer' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {p.role === 'singer' ? 'Cantor' : 'Músico'}
                        </span>
                      </div>
                      {p.role === 'singer' && (
                        <p className="text-[10px] text-slate-400 mt-0.5">Vínculos: {p.associatedSongIds.length} louvores</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 mt-2 sm:mt-0 justify-end">
                  {editingId === p.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => saveEdit(p)} className="bg-green-100 text-green-700 p-1.5 rounded-lg hover:bg-green-200" title="Confirmar">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </button>
                      <button onClick={() => setEditingId(null)} className="bg-slate-100 text-slate-500 p-1.5 rounded-lg hover:bg-slate-200" title="Cancelar">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <button 
                        onClick={() => startEditing(p)} 
                        className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar Integrante"
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
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Vincular Repertório</h3>
            <p className="text-xs text-slate-500">Defina quais louvores congregacionais cada cantor costuma ministrar</p>
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
                <div className="flex-1 border rounded-lg overflow-y-auto bg-slate-50 divide-y divide-slate-100">
                  {songs.map(song => (
                    <div 
                      key={song.id} 
                      className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-white transition-colors"
                      onClick={() => handleToggleSongAssociation(song.id)}
                    >
                      <input 
                        type="checkbox" 
                        className="rounded w-4 h-4 text-blue-600"
                        checked={selectedSinger.associatedSongIds.includes(song.id)}
                        readOnly
                      />
                      <span className={`text-sm ${selectedSinger.associatedSongIds.includes(song.id) ? 'font-bold text-blue-700' : 'text-slate-600'}`}>
                        {song.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed rounded-lg p-6 text-center text-slate-400 italic text-sm bg-slate-50/30">
                Escolha um cantor para gerenciar seu repertório.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedSinger && (
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl border-l-4 border-cyan-400">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Repertório Ministrado por</span>
              <h2 className="text-2xl font-black">{selectedSinger.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white">{associatedSongs.length}</span>
              <p className="text-[10px] text-slate-400 uppercase">Músicas</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {associatedSongs.map(s => (
              <div key={s.id} className="bg-white/5 rounded-lg px-3 py-2 text-sm flex justify-between items-center border border-white/5">
                <span className="truncate">{s.title}</span>
                <span className="text-[10px] font-black text-cyan-400 ml-2">{s.keyMen}/{s.keyWomen}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantManager;
