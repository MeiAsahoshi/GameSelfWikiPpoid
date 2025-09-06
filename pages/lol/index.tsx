import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">ゲームを選択</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/lol" className="text-blue-600 hover:underline">League of Legends</Link>
        </li>
        <li>
          <Link href="/tekken" className="text-blue-600 hover:underline">鉄拳</Link>
        </li>
      </ul>
    </div>
  );
}