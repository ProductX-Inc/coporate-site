import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "パートナープログラム",
    description:
        "クライアントをProductXに紹介するだけで、受注確定後に売上の10%を紹介報酬としてお支払い。3ステップで報酬を獲得できるパートナープログラムです。",
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
