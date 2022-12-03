import { useEffect, useState } from "react";

const SCROLL_BOTTOM_LIMIT = 50;

export const useInfiniteScroll = () => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
      
    const handleScroll = () => {
        const scrollTop = (document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        const scrollHeight = (document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + SCROLL_BOTTOM_LIMIT >= scrollHeight){
            setIsBottom(true);
        } else {
            setIsBottom(false);
        }
    }
      
    return { isBottom };
}