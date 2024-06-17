import React, { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = -10;
let mouseY = -10;
let outlineX = 0;
let outlineY = 0;

export const Cursor: React.FC = () => {
  const cursorOutline = useRef<HTMLDivElement>(null); // Specify the type of ref
  const [hoverButton, setHoverButton] = useState<boolean>(false); // Specify the type for initial state

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX}px`;
      cursorOutline.current.style.top = `${outlineY}px`;
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const mouseEventsListener = (event: MouseEvent) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    document.addEventListener("mousemove", mouseEventsListener);

    const animateEvent = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
      cancelAnimationFrame(animateEvent);
    };
  }, []);

  useEffect(() => {
    const mouseEventListener = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLButtonElement || // Check if target is a button
        // Check if parent is a button
        (e.target instanceof HTMLElement &&
          e.target.parentElement instanceof HTMLButtonElement) ||
        // Check if target is input or textarea
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        setHoverButton(true);
      } else {
        setHoverButton(false);
      }
    };

    document.addEventListener("mouseover", mouseEventListener);

    return () => {
      document.removeEventListener("mouseover", mouseEventListener);
    };
  }, []);

  return (
    <>
      <div
        style={{
          zIndex: 50,
          position: "fixed",
          left: "50%",
          top: "50%",
          borderRadius: "50%",
          pointerEvents: "none",
          transition: "transform",
          transform: "translate(-50%, -50%)",
          background: hoverButton ? "transparent" : "#4F46E5",
          border: hoverButton ? "2px solid #4F46E5" : "none",
          width: hoverButton ? "20px" : "12px",
          height: hoverButton ? "20px" : "12px",
        }}
        ref={cursorOutline}
      ></div>
    </>
  );
};
