import Image from "next/image";

import { Button } from "./Button";
import { Container } from "./Container";
import logoLaravel from "./images/logos/laravel.svg";
import logoMirage from "./images/logos/mirage.svg";
import logoStatamic from "./images/logos/statamic.svg";
import logoStaticKit from "./images/logos/statickit.svg";
import logoTransistor from "./images/logos/transistor.svg";
import logoTuple from "./images/logos/tuple.svg";
import { Press_Start_2P } from "@next/font/google";

const myFont = Press_Start_2P({ subsets: "latin", weight: "400" });

export function Hero() {
  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <h1
        // className={myFont.className + " text-white"}
        className={`${myFont.className} mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-[#fce303] sm:text-7xl`}
      >
        Rezerv
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Distribute assets with less gas fees
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="/register">Connect Wallet</Button>
      </div>
    </Container>
  );
}
