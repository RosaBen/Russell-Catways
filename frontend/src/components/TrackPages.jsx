import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TrackPages() {
  const location = useLocation();

  useEffect(() => {
    const currentPage = location.pathname + location.search;
    const previousPage = sessionStorage.getItem("currentPage");
    if (previousPage && previousPage !== currentPage) {
      sessionStorage.setItem("prevPage", previousPage);
    }

    sessionStorage.setItem("currentPage", currentPage);
  }, [location.pathname, location.search]);

  return null;
}
