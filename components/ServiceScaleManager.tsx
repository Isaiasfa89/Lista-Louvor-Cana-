
import React, { useState } from 'react';
import { ServiceScale, Song, Participant } from '../types';
import { Icons } from '../constants';

interface ServiceScaleManagerProps {
  scales: ServiceScale[];
  allSongs: Song[];
  participants: Participant[];
  onAdd: (s: Omit<ServiceScale, 'id'>) => void;
  onDelete: (id: string) => void;
}

const ServiceScaleManager: React.FC<ServiceScaleManagerProps> = ({ scales, allSongs, participants, onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [harpaSearch, setHarpaSearch] = useState('');
  const [congregationalSearch, setCongregationalSearch] = useState('');
  const [form, setForm] = useState<Partial<ServiceScale>>({
    date: new Date().toISOString().split('T')[0],
    harpaSongIds: [],
    congregationalSongIds: [],
    singerIds: [],
    musicianIds: [],
    notes: ''
  });

  const toggleItem = (field: keyof ServiceScale, id: string) => {
    const current = (form[field] as string[]) || [];
    const updated = current.includes(id) 
      ? current.filter(item => item !== id)
      : [...current, id];
    setForm({ ...form, [field]: updated });
  };

  const handleSave = () => {
    if (form.date && (form.harpaSongIds?.length || form.congregationalSongIds?.length)) {
      onAdd(form as Omit<ServiceScale, 'id'>);
      setIsAdding(false);
      setForm({
        date: new Date().toISOString().split('T')[0],
        harpaSongIds: [],
        congregationalSongIds: [],
        singerIds: [],
        musicianIds: [],
        notes: ''
      });
      setHarpaSearch('');
      setCongregationalSearch('');
    } else {
      alert('Selecione uma data e pelo menos um louvor.');
    }
  };

  const getSongTitle = (id: string) => allSongs.find(s => s.id === id)?.title || 'Desconhecido';
  const getPersonName = (id: string) => participants.find(p => p.id === id)?.name || 'Desconhecido';

  const filteredHarpa = allSongs
    .filter(s => s.type === 'harpa')
    .filter(s => 
      s.title.toLowerCase().includes(harpaSearch.toLowerCase()) || 
      s.number?.toString().includes(harpaSearch)
    );

  const filteredCongregational = allSongs
    .filter(s => s.type === 'congregational')
    .filter(s => 
      s.title.toLowerCase().includes(congregationalSearch.toLowerCase()) || 
      s.artist?.toLowerCase().includes(congregationalSearch.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Escala de Culto</h2>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Icons.Plus /> Nova Escala
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <h3 className="text-xl font-bold text-blue-900">Planejar Novo Culto</h3>
            <p className="text-sm text-blue-600">Escolha os louvores e a equipe para o dia</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Details & Staff */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Data do Culto</label>
                <input 
                  type="date" 
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  value={form.date}
                  onChange={e => setForm({...form, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Cantores</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                  {participants.filter(p => p.role === 'singer').map(p => (
                    <button
                      key={p.id}
                      onClick={() => toggleItem('singerIds', p.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        form.singerIds?.includes(p.id) ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Músicos</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                  {participants.filter(p => p.role === 'musician').map(p => (
                    <button
                      key={p.id}
                      onClick={() => toggleItem('musicianIds', p.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        form.musicianIds?.includes(p.id) ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Observações</label>
                <textarea 
                  className="w-full p-2.5 border border-slate-300 rounded-lg h-24 text-sm"
                  placeholder="Instruções adicionais..."
                  value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}
                />
              </div>
            </div>

            {/* Right Column: Songs Selection */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-700">Harpa Cristã</label>
                  <div className="relative w-1/2">
                    <input 
                      type="text" 
                      placeholder="Buscar na harpa..."
                      className="w-full pl-8 pr-2 py-1 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={harpaSearch}
                      onChange={e => setHarpaSearch(e.target.value)}
                    />
                    <div className="absolute left-2 top-1.5 text-slate-400">
                      <Icons.Search />
                    </div>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg h-44 overflow-y-auto bg-slate-50 divide-y divide-slate-100">
                  {filteredHarpa.map(s => (
                    <div 
                      key={s.id} 
                      className="p-2 flex items-center gap-3 cursor-pointer hover:bg-white text-sm"
                      onClick={() => toggleItem('harpaSongIds', s.id)}
                    >
                      <input type="checkbox" checked={form.harpaSongIds?.includes(s.id)} readOnly className="rounded text-blue-600" />
                      <span className="text-slate-500 font-bold w-8 text-xs">#{s.number}</span>
                      <span className="text-slate-700">{s.title}</span>
                    </div>
                  ))}
                  {filteredHarpa.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 italic">Nenhum louvor encontrado.</div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-slate-700">Congregacionais</label>
                  <div className="relative w-1/2">
                    <input 
                      type="text" 
                      placeholder="Buscar congregacional..."
                      className="w-full pl-8 pr-2 py-1 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={congregationalSearch}
                      onChange={e => setCongregationalSearch(e.target.value)}
                    />
                    <div className="absolute left-2 top-1.5 text-slate-400">
                      <Icons.Search />
                    </div>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg h-44 overflow-y-auto bg-slate-50 divide-y divide-slate-100">
                  {filteredCongregational.map(s => (
                    <div 
                      key={s.id} 
                      className="p-2 flex items-center gap-3 cursor-pointer hover:bg-white text-sm"
                      onClick={() => toggleItem('congregationalSongIds', s.id)}
                    >
                      <input type="checkbox" checked={form.congregationalSongIds?.includes(s.id)} readOnly className="rounded text-blue-600" />
                      <span className="text-slate-700">{s.title}</span>
                    </div>
                  ))}
                  {filteredCongregational.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 italic">Nenhum louvor encontrado.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t flex gap-4">
            <button onClick={handleSave} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">Confirmar Escala</button>
            <button onClick={() => setIsAdding(false)} className="px-8 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition-colors">Voltar</button>
          </div>
        </div>
      )}

      {/* List of Scales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scales.sort((a,b) => b.date.localeCompare(a.date)).map(scale => (
          <div key={scale.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Escala do dia</div>
                <div className="text-lg font-bold">{new Date(scale.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
              </div>
              <button onClick={() => onDelete(scale.id)} className="text-slate-400 hover:text-red-400">
                <Icons.Trash />
              </button>
            </div>
            
            <div className="p-5 space-y-4 flex-1">
              {/* Songs Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-2">Louvores</h4>
                  <ul className="space-y-1.5">
                    {scale.harpaSongIds.map(id => (
                      <li key={id} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded flex items-center gap-2">
                        <span className="font-bold opacity-50">H</span>
                        <span className="truncate">{getSongTitle(id)}</span>
                      </li>
                    ))}
                    {scale.congregationalSongIds.map(id => (
                      <li key={id} className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded flex items-center gap-2">
                        <span className="font-bold opacity-30">C</span>
                        <span className="truncate">{getSongTitle(id)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-2">Equipe</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {scale.singerIds.map(id => (
                      <span key={id} className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{getPersonName(id)}</span>
                    ))}
                    {scale.musicianIds.map(id => (
                      <span key={id} className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">{getPersonName(id)}</span>
                    ))}
                  </div>
                </div>
              </div>

              {scale.notes && (
                <div className="pt-3 border-t">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Notas</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 italic">{scale.notes}</p>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-slate-50 border-t text-center">
              <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">Ver PDF da Escala</button>
            </div>
          </div>
        ))}

        {scales.length === 0 && !isAdding && (
          <div className="col-span-full py-20 bg-white border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-slate-400">
            <Icons.Calendar />
            <p className="mt-4 font-medium text-lg">Nenhuma escala programada</p>
            <p className="text-sm">Comece clicando em "Nova Escala" acima.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceScaleManager;
