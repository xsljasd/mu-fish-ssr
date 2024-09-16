import type { FCRoute } from '@lomray/vite-ssr-boost/interfaces/fc-route';
import type { MouseEvent, MouseEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import MuFishImage from '@assets/images/mu-fish.png';
import MuFishAudio from '@assets/mu-fish.mp3';
import styles from './style.module.scss';

const FishKnock: FCRoute = () => {
  const [count, setCount] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const muFishPlayer = useRef<HTMLAudioElement>(null);
  type SpanType = {
    id: number;
    top: number;
    left: number;
  };
  const [spans, setSpans] = useState<SpanType[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpans((prevSpans) => prevSpans.slice(1));
    }, 2000);

    return () => clearTimeout(timer);
  }, [spans]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setCount((pre) => pre + 1);

    if (muFishPlayer.current) {
      muFishPlayer.current.currentTime = 0;
      void muFishPlayer.current.play();
    }

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // 与动画持续时间相匹配

    printText(e);
  };
  const printText = (event: MouseEvent) => {
    console.log(
      '%c [ (mouseX,mouseY) ]-24',
      'font-size:13px; background:pink; color:#bf2c9f;',
      `:(${event.clientX}, ${event.clientY})`,
    );
    const newSpan = {
      id: Date.now(),
      top: event.clientY,
      left: event.clientX,
    };

    setSpans([...spans, newSpan]);
  };

  return (
    <>
      <div>
        <h2>knock counts: {count}</h2>
      </div>
      <button
        className={`${styles.imageContainer} ${isClicked ? styles.buttonClicked : ''}`}
        type="button"
        onClick={handleClick}
      >
        <div>
          {spans.map((span) => (
            <span
              key={span.id}
              className={styles.clickSpan}
              style={{
                top: span.top,
                left: span.left,
              }}
            >
              功德+1!
            </span>
          ))}
        </div>
        <img src={MuFishImage} alt="mu fish"></img>
      </button>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio id="mu-fish-player" ref={muFishPlayer} src={MuFishAudio}></audio>
    </>
  );
};

export default FishKnock;
