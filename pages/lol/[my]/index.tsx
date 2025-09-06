// /pages/lol/[my]/index.tsx
import { useRouter } from "next/router";
import Link from "next/link";
import rawData from "../../../data/lol.json";
import { LolData, Champion } from "../../../types/lol";

const data: LolData = rawData;

export default function EnemySelect() {
  const router = useRouter();
  const { my } = router.query;

  if (!my) return <p>読み込み中...</p>;

  const champions: Champion[] = data.champions.filter(c => c.name !== my);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{my} の相手キャラを選択</h1>
      <ul className="grid grid-cols-2 gap-4">
        {champions.map(champ => (
          <li key={champ.name} className="border p-4 rounded text-center">
            <img src={champ.image} alt={champ.name} className="w-16 h-16 mx-auto mb-2" />
            <Link href={`/lol/${my}/${champ.name}`}>{champ.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/lol" className="text-blue-600 hover:underline mt-4 inline-block">
        ← 自キャラ選択に戻る
      </Link>
    </div>
  );
}
