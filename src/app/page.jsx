import CanvasPlayer from "@/components/CanvasPlayer";
import LenisWrapper from "@/components/LenisWrapper";
import VideoComp from "@/components/VideoComp";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <LenisWrapper>
        <CanvasPlayer />
      </LenisWrapper>
    </>
  );
}
