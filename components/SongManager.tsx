
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0c4a6e] flex items-center gap-3">
            {type === 'harpa' ? 'Harpa Cristã' : 'Louvores Congregacionais'}
          </h2>
          <p className="text-slate-500 text-xs mt-1">Acervo oficial para consulta</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Pesquisar..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => { setIsAdding(true); setEditForm({ type, keyMen: '-', keyWomen: '-' }); }}
            className="bg-cyan-600 text-white w-10 h-10 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-100 active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="p-4 bg-cyan-50 border-b border-cyan-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in slide-in-from-top-2">
          {type === 'harpa' && (
            <input
              type="number"
              className="p-2 border rounded-lg text-sm"
              placeholder="Número"
              value={editForm.number || ''}
              onChange={e => setEditForm({...editForm, number: parseInt(e.target.value)})}
            />
          )}
          <input
            type="text"
            className="p-2 border rounded-lg text-sm"
            placeholder="Título do Louvor"
            value={editForm.title || ''}
            onChange={e => setEditForm({...editForm, title: e.target.value})}
          />
          <input
            type="text"
            className="p-2 border rounded-lg text-sm"
            placeholder="Autor/Cantor"
            value={editForm.artist || ''}
            onChange={e => setEditForm({...editForm, artist: e.target.value})}
          />
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full p-2 border rounded-lg text-sm text-center"
              placeholder="Tom (H)"
              value={editForm.keyMen || ''}
              onChange={e => setEditForm({...editForm, keyMen: e.target.value})}
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg text-sm text-center"
              placeholder="Tom (M)"
              value={editForm.keyWomen || ''}
              onChange={e => setEditForm({...editForm, keyWomen: e.target.value})}
            />
          </div>
          <div className="sm:col-span-full flex gap-2 justify-end mt-2">
            <button onClick={handleSave} className="bg-cyan-600 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase">Cadastrar</button>
            <button onClick={() => setIsAdding(false)} className="bg-slate-300 text-slate-700 px-6 py-2 rounded-lg text-xs font-bold uppercase">Cancelar</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-900 text-slate-300 text-[10px] uppercase font-bold tracking-wider">
            <tr>
              {type === 'harpa' && <th className="px-6 py-3 w-16 text-center">Nº</th>}
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Autor / Cantor</th>
              <th className="px-4 py-3 w-24 text-center">Tom (H)</th>
              <th className="px-4 py-3 w-24 text-center">Tom (M)</th>
              <th className="px-6 py-3 w-24 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSongs.map(song => (
              <tr key={song.id} className="hover:bg-slate-50 transition-colors group">
                {type === 'harpa' && (
                  <td className="px-6 py-4 text-slate-400 font-bold text-center">#{song.number}</td>
                )}
                <td className="px-6 py-4">
                  {isEditing === song.id ? (
                    <input
                      type="text"
                      className="w-full p-1.5 border border-cyan-300 rounded-lg text-sm"
                      value={editForm.title || ''}
                      onChange={e => setEditForm({...editForm, title: e.target.value})}
                      autoFocus
                    />
                  ) : (
                    <span className="text-slate-800 font-bold">{song.title}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {isEditing === song.id ? (
                    <input
                      type="text"
                      className="w-full p-1.5 border border-cyan-300 rounded-lg text-sm"
                      value={editForm.artist || ''}
                      onChange={e => setEditForm({...editForm, artist: e.target.value})}
                    />
                  ) : (
                    <span className="text-slate-500 text-sm italic">{song.artist || '-'}</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <input
                    type="text"
                    className="w-12 px-1 py-1 bg-slate-100 border rounded text-xs font-bold text-center uppercase text-blue-700 focus:ring-1 focus:ring-blue-500"
                    value={song.keyMen}
                    onChange={(e) => handleKeyChange(song.id, 'keyMen', e.target.value)}
                  />
                </td>
                <td className="px-4 py-4 text-center">
                  <input
                    type="text"
                    className="w-12 px-1 py-1 bg-slate-100 border rounded text-xs font-bold text-center uppercase text-pink-700 focus:ring-1 focus:ring-pink-500"
                    value={song.keyWomen}
                    onChange={(e) => handleKeyChange(song.id, 'keyWomen', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {isEditing === song.id ? (
                      <button onClick={handleSave} className="text-green-600 font-bold text-[10px] uppercase">Salvar</button>
                    ) : (
                      <button onClick={() => handleEditClick(song)} className="text-slate-300 hover:text-cyan-600 transition-colors">
                        <Icons.Edit />
                      </button>
                    )}
                    <button onClick={() => onDelete(song.id)} className="text-slate-200 hover:text-red-500 transition-colors">
                      <Icons.Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredSongs.length === 0 && (
        <div className="p-12 text-center text-slate-400">
          <p className="italic text-sm">Nenhum louvor encontrado para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default SongManager;
