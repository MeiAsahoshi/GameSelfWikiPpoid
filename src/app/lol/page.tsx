// app/lol/page.tsx
import Link from "next/link";

const champions = ["Ahri", "Yasuo", "Lux", "Zed"]; // サンプルキャラ

export default function LoLPage() {
  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>League of Legends キャラクター一覧</h1>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        {champions.map((champ) => (
          <Link key={champ} href={`/lol/${champ}/exampleEnemy`}>
            <button style={{ padding: "10px 20px", fontSize: "16px" }}>{champ}</button>
          </Link>
        ))}
      </div>
    </main>
  );
}
