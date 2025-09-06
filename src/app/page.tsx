// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ゲームを選択してください</h1>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link href="/lol">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>League of Legends</button>
        </Link>
        <Link href="/tekken">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>鉄拳</button>
        </Link>
      </div>
    </main>
  );
}
