// ============================================================
// ProductX お問い合わせフォーム — Google Apps Script Backend
// ============================================================
// 1. このスクリプトを GAS エディタに貼り付ける
// 2. SPREADSHEET_ID と SLACK_WEBHOOK_URL を設定する
// 3. デプロイ → ウェブアプリ → 「全員」で公開
// ============================================================

// ── 設定 ────────────────────────────────────────────────────
const SPREADSHEET_ID = "1TcPpglygBYD-INgj7OJnjwPSS2GqLopHisYWXYXaB58";
const SHEET_NAME     = "お問い合わせ";                      // シート名（無ければ自動作成）
const SLACK_WEBHOOK_URL = "YOUR_SLACK_WEBHOOK_URL_HERE";   // ← GASエディタで実際のURLに差し替えてください

// ── ヘッダー行（スプレッドシートの1行目） ───────────────────
const HEADERS = [
  "受信日時",
  "担当者名",
  "会社名",
  "ウェブサイト",
  "メールアドレス",
  "電話番号",
  "お問い合わせ内容",
];

// ── POST 受信 ───────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // バリデーション
    const required = ["name", "company", "email", "message"];
    for (const key of required) {
      if (!data[key] || data[key].trim() === "") {
        return jsonResponse(400, { error: `${key} は必須です` });
      }
    }

    // スプレッドシートに書き込み
    writeToSheet(data);

    // Slack に通知
    notifySlack(data);

    return jsonResponse(200, { result: "success" });
  } catch (err) {
    console.error(err);
    return jsonResponse(500, { error: err.message });
  }
}

// ── GET（ヘルスチェック & CORS preflight 代替） ─────────────
function doGet(e) {
  return jsonResponse(200, { status: "ok", service: "ProductX Contact Form" });
}

// ── スプレッドシート書き込み ─────────────────────────────────
function writeToSheet(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  // シートが無ければ作成してヘッダーをセット
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#4a86c8")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  const timestamp = Utilities.formatDate(
    new Date(),
    "Asia/Tokyo",
    "yyyy-MM-dd HH:mm:ss"
  );

  sheet.appendRow([
    timestamp,
    data.name      || "",
    data.company   || "",
    data.website   || "",
    data.email     || "",
    data.phone     || "",
    data.message   || "",
  ]);
}

// ── Slack 通知 ──────────────────────────────────────────────
function notifySlack(data) {
  if (!SLACK_WEBHOOK_URL || SLACK_WEBHOOK_URL === "YOUR_SLACK_WEBHOOK_URL_HERE") {
    console.log("Slack Webhook URL が未設定のためスキップしました");
    return;
  }

  const timestamp = Utilities.formatDate(
    new Date(),
    "Asia/Tokyo",
    "yyyy/MM/dd HH:mm"
  );

  const payload = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📩 新しいお問い合わせ",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*担当者名:*\n${data.name}` },
          { type: "mrkdwn", text: `*会社名:*\n${data.company}` },
          { type: "mrkdwn", text: `*メール:*\n${data.email}` },
          { type: "mrkdwn", text: `*電話番号:*\n${data.phone || "未入力"}` },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*ウェブサイト:*\n${data.website || "未入力"}`,
        },
      },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*お問い合わせ内容:*\n${data.message}`,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `🕐 ${timestamp} | ProductX Corporate Site`,
          },
        ],
      },
    ],
  };

  UrlFetchApp.fetch(SLACK_WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
}

// ── JSON レスポンスヘルパー ──────────────────────────────────
function jsonResponse(statusCode, body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
