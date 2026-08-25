import { ChainLink } from "@/components/Logo";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-white">
      <ChainLink className="chain-spin size-8 text-ink" />
    </div>
  );
}
