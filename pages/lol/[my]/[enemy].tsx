import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../../lib/supabaseClient";

export default function CounterPage() {
  const router = useRouter();
  const { my, enemy } = router.query;
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (!my || !enemy) return;

    const fetchCounter = async () => {
      // myとenemyのキャラID取得（名前から）
      const { data: myChar } = await supabase
        .from("characters")
        .select("id")
        .eq("name", my)
        .single();
      const { data: enemyChar } = await supabase
        .from("characters")
        .select("id")
        .eq("name", enemy)
        .single();

      if (!myChar || !enemyChar) {
        setContent("キャラクター情報が見つかりません。");
        return;
      }

      const { data: counterData } = await supabase
        .from("counters")
        .select("content")
        .eq("my_char_id", myChar.id)
        .eq("enemy_char_id", enemyChar.id)
        .single();

      setContent(counterData?.content || "対策記事はまだありません。");
    };

    fetchCounter();
  }, [my, enemy]);

  if (!my || !enemy) return <p>読み込み中...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{my} vs {enemy}</h1>
      <div className="prose">
        <ReactMarkdown>{content || "読み込み中..."}</ReactMarkdown>
      </div>
    </div>
  );
}
