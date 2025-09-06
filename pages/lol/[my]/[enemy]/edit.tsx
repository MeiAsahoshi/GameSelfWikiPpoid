import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../../../lib/supabaseClient";
import "easymde/dist/easymde.min.css";

// react-simplemde-editor は SSR 非対応なので dynamic import
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function EditCounter() {
  const router = useRouter();
  const { my, enemy } = router.query;

  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!my || !enemy) return;

    const fetchCounter = async () => {
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
        setLoading(false);
        return;
      }

      const { data: counterData } = await supabase
        .from("counters")
        .select("content")
        .eq("my_char_id", myChar.id)
        .eq("enemy_char_id", enemyChar.id)
        .single();

      setContent(counterData?.content || "");
      setLoading(false);
    };

    fetchCounter();
  }, [my, enemy]);

  const handleSave = async () => {
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      alert("パスワードが違います");
      return;
    }

    if (!my || !enemy) return;

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

    if (!myChar || !enemyChar) return;

    const { data: existing } = await supabase
      .from("counters")
      .select("id")
      .eq("my_char_id", myChar.id)
      .eq("enemy_char_id", enemyChar.id)
      .single();

    if (existing) {
      await supabase
        .from("counters")
        .update({ content })
        .eq("id", existing.id);
    } else {
      await supabase.from("counters").insert({
        my_char_id: myChar.id,
        enemy_char_id: enemyChar.id,
        content,
      });
    }

    alert("保存しました！");
  };

  if (!my || !enemy) return <p>読み込み中...</p>;
  if (loading) return <p>記事を読み込んでいます...</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {my} vs {enemy} の記事編集
      </h1>

      <input
        type="password"
        placeholder="管理パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <SimpleMDE
        value={content}
        onChange={setContent}
        options={{ spellChecker: false, placeholder: "対策記事を入力" }}
      />

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        保存
      </button>
    </div>
  );
}
