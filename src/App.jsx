import { useState, useRef, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MiniPlayer from './components/MiniPlayer';
import Toast from './components/Toast';
import Home from './pages/Home';
import LiveRadio from './pages/LiveRadio';
import LiveTV from './pages/LiveTV';
import Programs from './pages/Programs';
import Presenters from './pages/Presenters';
import News from './pages/News';
import Podcasts from './pages/Podcasts';
import Videos from './pages/Videos';
import About from './pages/About';
import Contact from './pages/Contact';
import Advertise from './pages/Advertise';
import { STREAMS } from './config/streams';

export default function App() {
  // Global radio state shared across all pages
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [streamUrl, setStreamUrl] = useState(STREAMS.radio.url);
  const [radioError, setRadioError] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const audioRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }, []);

  const toggleRadio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      showToast('📻 Radio paused');
    } else {
      setRadioError(null);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          showToast('🔴 Tuned in to Enduata FM 88.5 Narok • LIVE');
        })
        .catch((err) => {
          console.error('Playback error:', err);
          setRadioError('Could not connect to stream. Check your connection.');
          showToast('⚠️ Could not connect to radio stream');
        });
    }
  }, [isPlaying, showToast]);

  const handleVolumeChange = useCallback((val) => {
    const v = typeof val === 'number' ? val : parseFloat(val);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : v;
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) audioRef.current.volume = next ? 0 : volume;
  }, [isMuted, volume]);

  // Shared radio props to pass to pages and components
  const radioProps = {
    isPlaying, toggleRadio, volume, handleVolumeChange, isMuted, toggleMute,
    streamUrl, setStreamUrl, radioError, showToast, audioRef,
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 flex flex-col font-sans">
      {/* Hidden audio element for persistent radio playback */}
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          if (isPlaying) {
            setRadioError('Stream connection lost');
            showToast('⚠️ Stream connection interrupted');
          }
        }}
      />

      <Navbar radioProps={radioProps} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home radioProps={radioProps} />} />
          <Route path="/live-radio" element={<LiveRadio radioProps={radioProps} />} />
          <Route path="/radio" element={<LiveRadio radioProps={radioProps} />} />
          <Route path="/live-tv" element={<LiveTV showToast={showToast} />} />
          <Route path="/tv" element={<LiveTV showToast={showToast} />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/presenters" element={<Presenters />} />
          <Route path="/news" element={<News />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="/ceo" element={<About />} />
          <Route path="/contact" element={<Contact showToast={showToast} />} />
          <Route path="/advertise" element={<Advertise showToast={showToast} />} />
        </Routes>
      </main>

      <Footer />
      <MiniPlayer radioProps={radioProps} />
      <Toast message={toastMsg} />
    </div>
  );
}
