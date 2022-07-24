import { useMediaQuery } from "usehooks-ts";

export const useScreenSize = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return {isMobile};
}
