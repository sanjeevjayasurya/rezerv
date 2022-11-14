import { Container } from "./Container";
import { Press_Start_2P } from "@next/font/google";

const myFont = Press_Start_2P({ subsets: "latin", weight: "400" });

export default function Balance() {
  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <div className={`${myFont.className} text-yellow`}>Connected to address</div>
    </Container>
  );
}
