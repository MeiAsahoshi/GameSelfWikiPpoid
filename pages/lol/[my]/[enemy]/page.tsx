"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// 相対パスに変更
import { supabase } from "../../../../lib/supabaseClient";

export default function CounterPage() {
  const params = useParams();
  const { my, enemy } = params as { my: string; enemy: string };
  const [content, setContent] = useState<string>("読み込み中...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!my || !enemy) return;

    const fetchCounter = async () => {
      try {
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
          setContent("キャラクター情報が見つかりません");
          setLoading(false);
          return;
        }

        const { data: counterData } = await supabase
          .from("counters")
          .select("content")
          .eq("my_char_id", myChar.id)
          .eq("enemy_char_id", enemyChar.id)
          .single();

        setContent(counterData?.content || "記事がまだ登録されていません");
      } catch (err) {
        console.error(err);
        setContent("エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, [my, enemy]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {my} vs {enemy} の対策
      </h1>
      <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
