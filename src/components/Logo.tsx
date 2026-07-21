import logo from "@/assets/elara-logo.webp";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="ELARA WAVE — Flow With Freshness"
      className={className}
      loading="eager"
      decoding="async"
      width={512}
      height={397}
    />
  );
}