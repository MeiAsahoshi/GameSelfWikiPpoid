import { useParams } from "next/navigation";
import { lolCounters } from "@/data/lolCounters";

export default function CounterPage() {
  const params = useParams();
  const { myChamp, enemyChamp } = params;

  const content = lolCounters[myChamp as string]?.[enemyChamp as string] || "まだ記事はありません";

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{myChamp} vs {enemyChamp} の対策</h1>
      <p style={{ marginTop: "20px", fontSize: "16px" }}>{content}</p>
    </main>
  );
}