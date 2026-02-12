import { useState, useEffect, useRef } from "react";

const panels = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    title: "Sports Equipment"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200",
    title: "Fitness Gear"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200",
    title: "Outdoor Adventures"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200",
    title: "Team Sports"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200",
    title: "Training Tools"
  }
];

const Slider = () => {
  const [activePanel, setActivePanel] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePanel((prev) => (prev + 1) % panels.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 480px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const target = containerRef.current.children[activePanel];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  }, [activePanel, isMobile]);

  const handlePanelClick = (index) => {
    setActivePanel(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const handleScroll = (event) => {
    if (!isMobile) return;

    const container = event.currentTarget;
    const panelWidth = container.clientWidth;
    const nextIndex = Math.round(container.scrollLeft / panelWidth);

    if (nextIndex !== activePanel) {
      setActivePanel(nextIndex);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex w-[90vw] max-[480px]:w-screen max-[480px]:overflow-x-auto 
      max-[480px]:flex-nowrap max-[480px]:snap-x max-[480px]:snap-mandatory max-[480px]:scroll-smooth"
    >
      {panels.map((panel, index) => (
        <div
          key={panel.id}
          className={`
            bg-cover bg-center bg-no-repeat h-[80vh] rounded-[50px] 
            text-white cursor-pointer m-2.5 relative
            transition-all duration-700 ease-[cubic-bezier(0.5,0,0.5,1)]
            ${index === activePanel ? 'flex-5' : 'flex-[0.5]'}
            max-[480px]:min-w-full max-[480px]:flex-none max-[480px]:m-0
            max-[480px]:snap-center
          `}
          style={{ backgroundImage: `url(${panel.image})` }}
          onClick={() => handlePanelClick(index)}
        >
          <h3 
            className={`
              text-2xl absolute bottom-5 left-5 m-0
              transition-opacity duration-300 ease-in delay-400
              ${index === activePanel ? 'opacity-100' : 'opacity-0'}
              max-[480px]:opacity-100
            `}
          >
            {panel.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Slider;
