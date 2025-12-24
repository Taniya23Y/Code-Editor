import { useRef, useState } from "react";

const SplitPane = ({ left, right }) => {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const isDragging = useRef(false);

  const onMouseDown = () => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    if (percent > 20 && percent < 80) {
      setLeftWidth(percent);
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className="flex h-[calc(110dvh-60px)] w-full select-none"
    >
      {/* LEFT */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="h-full overflow-hidden"
      >
        {left}
      </div>

      {/* DIVIDER */}
      <div
        onMouseDown={onMouseDown}
        className="w-1 cursor-col-resize bg-zinc-700 hover:bg-cyan-400 transition"
      />

      {/* RIGHT */}
      <div
        style={{ width: `${100 - leftWidth}%` }}
        className="h-full overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
};

export default SplitPane;
