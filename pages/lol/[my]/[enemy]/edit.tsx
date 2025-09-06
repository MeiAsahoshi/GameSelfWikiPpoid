"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
// 相対パスに変更
import { supabase } from "../../../../lib/supabaseClient";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

export default function EditCounterPage() {
  const params = useParams();
  const router = useRouter();
  const { my, enemy } = params as { my: string; enemy: string };

  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!my || !enemy) return;

    const fetchContent = async () => {
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

      const { data: counterData } = await supabase
        .from("counters")
        .select("content")
        .eq("my_char_id", myChar.id)
        .eq("enemy_char_id", enemyChar.id)
        .single();

      setContent(counterData?.content || "");
    };

    fetchContent();
  }, [my, enemy]);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert("パスワードが違います");
    }
  };

  const handleSave = async () => {
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
      alert("キャラクター情報が見つかりません");
      return;
    }

    await supabase.from("counters").upsert({
      my_char_id: myChar.id,
      enemy_char_id: enemyChar.id,
      content,
    });

    alert("保存しました！");
    router.push(`/lol/${my}/${enemy}`);
  };

  if (!isAdmin)
    return (
      <div className="p-10">
        <h2>管理者ログイン</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="border p-2"
        />
        <button
          onClick={handleLogin}
          className="ml-2 px-4 py-2 bg-blue-500 text-white"
        >
          ログイン
        </button>
      </div>
    );

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {my} vs {enemy} 対策編集
      </h1>
      <SimpleMDE value={content} onChange={setContent} />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white"
      >
        保存
      </button>
    </div>
  );
}
