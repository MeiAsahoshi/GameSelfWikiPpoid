import Link from "next/link";

const champions = ["Ahri", "Zed", "Yasuo"];

export default function LolPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">自分のキャラクターを選択</h1>
      <ul>
        {champions.map((champ) => (
          <li key={champ} className="mb-2">
            <Link href={`/lol/${champ}/enemy`}>
              {champ}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
