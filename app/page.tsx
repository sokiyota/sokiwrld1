'use client';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    contact: '', steam: '', github: '', discord: '', other: '', story: ''
  });

  const handleSubmit = async () => {
    if (!formData.contact || !formData.story) {
      alert('Пожалуйста, заполни контакт и историю');
      return;
    }
    
    setIsSending(true);
    try {
      const res = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Заявка отправлена в sokiwrld!');
        setIsOpen(false);
        setFormData({ contact: '', steam: '', github: '', discord: '', other: '', story: '' });
      } else {
        alert('Ошибка на стороне сервера. Проверь route.ts');
      }
    } catch (e) {
      console.error(e);
      alert('Ошибка соединения');
    }
    setIsSending(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 blur-[130px] rounded-full" />

      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          sokiwrld
        </h1>
        <h2 className="text-xl md:text-2xl font-light mb-6 text-gray-400 uppercase tracking-[0.3em]">Where skill meets code</h2>
        <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-12 max-w-xl mx-auto font-light">
          A private ecosystem for those who live and breathe the industry. No casuals. Pass the check-in, deposit <span className="text-white font-bold ml-2">20 $SOKI</span> and unlock the lounge.
        </p>

        <button onClick={() => setIsOpen(true)} className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:bg-gray-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] rounded-sm">
          Connect Wallet
          <div className="absolute -inset-0.5 bg-white opacity-20 blur group-hover:opacity-50 transition duration-500"></div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-white/10 p-8 md:p-12 w-full max-w-3xl relative rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors text-xl">✕</button>
            <h3 className="text-3xl font-bold mb-2 tracking-tighter uppercase">Entry Request</h3>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-10 border-b border-white/5 pb-4">Verification required. Prove your digital footprint.</p>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Contact (TG / Discord)" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:border-white/40 outline-none text-white" 
                  value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} />
                <input type="text" placeholder="Steam Profile" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:border-white/40 outline-none text-white" 
                  value={formData.steam} onChange={(e) => setFormData({...formData, steam: e.target.value})} />
                <input type="text" placeholder="GitHub" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:border-white/40 outline-none text-white" 
                  value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} />
                <input type="text" placeholder="Discord ID" className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:border-white/40 outline-none text-white" 
                  value={formData.discord} onChange={(e) => setFormData({...formData, discord: e.target.value})} />
              </div>

              <textarea rows={6} className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-white/40 outline-none transition-colors leading-relaxed resize-none text-white"
                placeholder="Your Story..." value={formData.story} onChange={(e) => setFormData({...formData, story: e.target.value})} />
              
              <button 
                onClick={handleSubmit}
                disabled={isSending}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
