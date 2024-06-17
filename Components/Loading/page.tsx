import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

interface PageProps {
  started: boolean;
  setStarted: (started: boolean) => void;
}

const Page: React.FC<PageProps> = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [progress, total, loaded, item, setStarted]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        transition: 'opacity 1000ms',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4ff',
        opacity: started ? 0 : 1,
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#4F46E5',
          position: 'relative',
        }}
        className="text-4xl md:text-9xl font-bold text-indigo-900 relative"
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'width 500ms',
            width: `${progress}%`,
          }}
        >
          Praveen Maurya
        </div>
        <div
          style={{
            opacity: 0.4,
          }}
        >
          Praveen Maurya
        </div>
      </div>
    </div>
  );
};

export default Page;
