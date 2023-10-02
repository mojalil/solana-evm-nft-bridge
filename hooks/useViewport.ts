import { useEffect, useState } from "react";


const useViewport = () => {
    const [viewPortWidth, setViewPortWidth] = useState(0);

    useEffect(() => {
      const updateWidth = () => {
        const width = window.innerWidth;
        setViewPortWidth(width);
      };
  
      // Initial set on load
      updateWidth();
  
      // Add listener
      window.addEventListener("resize", updateWidth);
  
      // Remove listener on cleanup
      return () => window.removeEventListener("resize", updateWidth);
    }, []);
  
    const isMobile = viewPortWidth <= 768;

    return { viewPortWidth, isMobile};
}


export default useViewport;