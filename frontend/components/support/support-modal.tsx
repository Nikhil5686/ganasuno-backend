"use client";
import Image from "next/image";

type SupportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md rounded-3xl border border-amber-400/40 bg-gradient-to-b from-[#2b0d08] to-[#120504] p-8 text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-stone-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-stone-100">
          Support the Platform to Stay Free ❤️
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          Your support helps us maintain servers and keep GanaSuno available for
          music lovers everywhere.
        </p>

        <div className="mx-auto flex w-full max-w-[340px] items-center justify-center rounded-2xl bg-white p-5">
          <Image
            src="/support/qr.jpeg"
            alt="Scan to support GanaSuno"
            width={260}
            height={360}
            className="h-auto w-full max-w-[260px] rounded-lg object-contain"
          />
        </div>

        <button
          onClick={() => {
            window.location.href =
              "upi://pay?pa=raj5686-1@oksbi&pn=NIKHIL%20RAJ";
          }}
          className="
  mt-6
  rounded-full
  bg-amber-400
  px-6
  py-3
  text-sm
  font-semibold
  text-black
  hover:bg-amber-300
  "
        >
          Scan & Support
        </button>
      </div>
    </div>
  );
}
