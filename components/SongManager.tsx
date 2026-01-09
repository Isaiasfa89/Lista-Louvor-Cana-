
import React, { useState } from 'react';
import { Song, SongType } from '../types';
import { Icons } from '../constants';

interface SongManagerProps {
  type: SongType;
  songs: Song[];
  onAdd: (song: Omit<Song, 'id'>) => void;
  onUpdate: (song: Song) => void;
  onDelete: (id: string) => void;
}

const SongManager: React.FC<SongManagerProps> = ({ type, songs, onAdd, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Song>>({});
  const [isAdding, setIsAdding] = useState(false);

  const filteredSongs = songs
    .filter(s => 
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (s.artist?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.number?.toString().includes(searchTerm))
    )
    .sort((a, b) => {
      if (type === 'harpa') return (a.number || 0) - (b.number || 0);
      return a.title.localeCompare(b.title);
    });

  const handleEditClick = (song: Song) => {
    setIsEditing(song.id);
    setEditForm(song);
  };

  const handleSave = () => {
    if (isEditing && editForm.title) {
      onUpdate(editForm as Song);
      setIsEditing(null);
    } else if (isAdding && editForm.title) {
      onAdd({
        ...editForm,
        type,
        artist: editForm.artist || '-',
        keyMen: editForm.keyMen || '-',
        keyWomen: editForm.keyWomen || '-'
      } as Omit<Song, 'id'>);
      setIsAdding(false);
      setEditForm({});
    }
  };

  const handleKeyChange = (id: string, field: 'keyMen' | 'keyWomen', value: string) => {
    const song = songs.find(s => s.id === id);
    if (song) {
      onUpdate({ ...song, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0c4a6e] flex items-center gap-3">
             <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
            {type === 'harpa' ? 'Louvores da Harpa Cristã' : 'Louvores Congregacionais'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">Acervo oficial de adoração</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Pesquisar louvor ou autor..."
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => { setIsAdding(true); setEditForm({ type }); }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white w-12 h-12 rounded-xl transition-all flex items-center justify-center text-3xl font-bold shadow-lg shadow-cyan-200 active:scale-90"
            title="Adicionar Louvor (+)"
          >
            +
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#0c4a6e] text-cyan-100 text-xs uppercase font-bold tracking-wider">
            <tr>
              {type === 'harpa' && <th className="px-6 py-4 w-20 text-center">Nº</th>}
              <th className="px-6 py-4">Título do Louvor</th>
              <th className="px-6 py-4">Cantor / Autor</th>
              <th className="px-4 py-4 w-28 text-center">Tom (H)</th>
              <th className="px-4 py-4 w-28 text-center">Tom (M)</th>
              <th className="px-6 py-4 w-28 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isAdding && (
              <tr className="bg-cyan-50 border-l-4 border-cyan-500">
                {type === 'harpa' && (
                  <td className="px-6 py-3 text-center">
                    <input
                      type="number"
                      className="w-full p-2 border border-cyan-200 rounded-lg text-center text-sm outline-none"
                      placeholder="Nº"
                      value={editForm.number || ''}
                      onChange={e => setEditForm({...editForm, number: parseInt(e.target.value)})}
                    />
                  </td>
                )}
                <td className="px-6 py-3">
                  <input
                    type="text"
                    className="w-full p-2 border border-cyan-200 rounded-lg text-sm outline-none"
                    placeholder="Título"
                    value={editForm.title || ''}
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                  />
                </td>
                <td className="px-6 py-3">
                  <input
                    type="text"
                    className="w-full p-2 border border-cyan-200 rounded-lg text-sm outline-none"
                    placeholder="Cantor"
                    value={editForm.artist || ''}
                    onChange={e => setEditForm({...editForm, artist: e.target.value})}
                  />
                </td>
                <td className="px-4 py-3" colSpan={3}>
                  <div className="flex gap-2 justify-center">
                    <button onClick={handleSave} className="bg-cyan-600 text-white rounded-lg px-6 py-2 text-xs font-black uppercase shadow-md">SALVAR</button>
                    <button onClick={() => setIsAdding(false)} className="bg-slate-300 text-slate-700 rounded-lg px-6 py-2 text-xs font-black uppercase">CANCELAR</button>
                  </div>
                </td>
              </tr>
            )}
            
            {filteredSongs.map(song => (
              <tr key={song.id} className="hover:bg-cyan-50/30 transition-colors group">
                {type === 'harpa' && (
                  <td className="px-6 py-4 text-[#0c4a6e] font-black text-center text-lg opacity-40 group-hover:opacity-100">#{song.number}</td>
                )}
                <td className="px-6 py-4">
                  {isEditing === song.id ? (
                    <input
                      type="text"
                      className="w-full p-2 border border-cyan-300 rounded-lg bg-white shadow-inner"
                      value={editForm.title || ''}
                      onChange={e => setEditForm({...editForm, title: e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                      autoFocus
                    />
                  ) : (
                    <span className="text-slate-800 font-bold text-base">{song.title}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {isEditing === song.id ? (
                    <input
                      type="text"
                      className="w-full p-2 border border-cyan-300 rounded-lg bg-white shadow-inner"
                      value={editForm.artist || ''}
                      onChange={e => setEditForm({...editForm, artist: e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    />
                  ) : (
                    <span className="text-slate-500 font-medium italic text-sm">{song.artist || '-'}</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <input
                    type="text"
                    className="w-16 px-2 py-1.5 bg-slate-100 border border-transparent rounded-lg text-sm font-black focus:ring-2 focus:ring-cyan-500 text-center uppercase text-blue-700 hover:border-slate-300 transition-all"
                    value={song.keyMen}
                    onChange={(e) => handleKeyChange(song.id, 'keyMen', e.target.value)}
                  />
                </td>
                <td className="px-4 py-4 text-center">
                  <input
                    type="text"
                    className="w-16 px-2 py-1.5 bg-slate-100 border border-transparent rounded-lg text-sm font-black focus:ring-2 focus:ring-pink-500 text-center uppercase text-pink-700 hover:border-slate-300 transition-all"
                    value={song.keyWomen}
                    onChange={(e) => handleKeyChange(song.id, 'keyWomen', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    {isEditing === song.id ? (
                      <button onClick={handleSave} className="text-green-600 font-black text-xs bg-green-50 px-2 py-1 rounded">OK</button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(song)}
                        className="text-slate-400 hover:text-cyan-600 transition-all text-xl font-bold"
                        title="Editar louvor (*)"
                      >
                        *
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(song.id)}
                      className="text-slate-300 hover:text-red-500 transition-all text-xl font-bold"
                      title="Excluir (x)"
                    >
                      x
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongManager;
