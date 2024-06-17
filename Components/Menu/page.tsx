import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import sound from './sound.png';
import Mute from './Mute.png';

interface PageProps {
  onSectionChange: (section: number) => void;
  menuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
}

const Page: React.FC<PageProps> = ({ onSectionChange, menuOpened, setMenuOpened }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [stopSound, setStopSound] = useState<HTMLAudioElement | null>(null);
  const [playSound, setPlaySound] = useState<HTMLAudioElement | null>(null);
  const [menuSound, setMenuSound] = useState<HTMLAudioElement | null>(null);
  const [closeMenuSound, setCloseMenuSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudio(new Audio('/sound/developer.mp3'));
      setStopSound(new Audio('/sound/stopping.mp3'));
      setPlaySound(new Audio('/sound/Playing.mp3'));
      setMenuSound(new Audio('/sound/Menu.mp3'));
      setCloseMenuSound(new Audio('/sound/Closing.mp3'));
    }
  }, []);

  useEffect(() => {
    const playButton = document.getElementById('play');
    const menuButton = document.getElementById('menu-button');

    const togglePlayPause = () => {
      if (isPlaying) {
        audio?.pause();
        stopSound?.play();
      } else {
        playSound?.play();
        setTimeout(() => {
          audio?.play();
        }, 1200);
        stopSound?.pause();
        stopSound && (stopSound.currentTime = 0);
      }
      setIsPlaying(!isPlaying);
    };

    const handleMenuClick = () => {
      if (menuOpened) {
        closeMenuSound?.play();
      } else {
        menuSound?.play();
      }
    };

    playButton?.addEventListener('click', togglePlayPause);
    menuButton?.addEventListener('click', handleMenuClick);

    return () => {
      playButton?.removeEventListener('click', togglePlayPause);
      menuButton?.removeEventListener('click', handleMenuClick);
    };
  }, [audio, isPlaying, stopSound, playSound, menuSound, closeMenuSound, menuOpened]);

  return (
    <>
      <button
        id="play"
        style={{
          zIndex: 20,
          position: 'fixed',
          top: '3rem',
          left: '1rem',
          padding: '0.75rem',
          backgroundColor: isPlaying ? 'white' : 'grey',
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '50%',
        }}
      >
        {isPlaying ? (
          <Image src={sound} alt="playing-sound" width={24} height={24} />
        ) : (
          <Image src={Mute} alt="muted-sound" width={24} height={24} />
        )}
      </button>

      <button
        onClick={() => setMenuOpened(!menuOpened)}
        id="menu-button"
        style={{
          zIndex: 20,
          position: 'fixed',
          top: '3rem',
          right: '3rem',
          padding: '0.75rem',
          backgroundColor: 'white',
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '0.375rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'black',
            height: '0.2rem',
            borderRadius: '0.125rem',
            width: '100%',
            transition: 'all 0.3s',
            transform: menuOpened ? 'rotate(45deg) translateY(0.125rem)' : 'none',
          }}
        />
        <div
          style={{
            backgroundColor: 'black',
            height: '0.2rem',
            borderRadius: '0.125rem',
            width: '100%',
            margin: '0.25rem 0',
            display: menuOpened ? 'none' : 'block',
          }}
        />
        <div
          style={{
            backgroundColor: 'black',
            height: '0.2rem',
            borderRadius: '0.125rem',
            width: '100%',
            transition: 'all 0.3s',
            transform: menuOpened ? 'rotate(-45deg)' : 'none',
          }}
        />
      </button>

      <div
        style={{
          zIndex: 10,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          transition: 'all 0.3s',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          width: menuOpened ? '20rem' : '0',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '2rem',
          }}
        >
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
        </div>
      </div>
    </>
  );
};

interface MenuButtonProps {
  label: string;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'color 0.3s',
      }}
    >
      {label}
    </button>
  );
};

export default Page;
