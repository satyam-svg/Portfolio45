import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface ScrollManagerProps {
  section: number;
  onSectionChange: (section: number) => void;
}

export const ScrollManager: React.FC<ScrollManagerProps> = ({ section, onSectionChange }) => {
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (data.fill) {
      data.fill.classList.add("top-0");
      data.fill.classList.add("absolute");
    }
  }, [data.fill]);

  useEffect(() => {
    if (data.el) {
      gsap.to(data.el, {
        duration: 1,
        scrollTop: section * data.el.clientHeight,
        onStart: () => {
          isAnimating.current = true;
        },
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }
  }, [section, data.el]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.offset;
      return;
    }

    const curSection = Math.floor(data.offset * data.pages);
    if (data.offset > lastScroll.current && curSection === 0) {
      onSectionChange(1);
    }
    if (
      data.offset < lastScroll.current &&
      data.offset < 1 / (data.pages - 1)
    ) {
      onSectionChange(0);
    }
    lastScroll.current = data.offset;
  });

  return null;
};
