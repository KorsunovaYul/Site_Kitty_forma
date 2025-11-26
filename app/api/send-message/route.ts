import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "7677727196:AAHKr0j9ap_miYtRW8ds3IpStxJh5P10IJY"
const TELEGRAM_CHAT_ID = "-5045396128"

interface ContactFormData {
  question: string
  email: string
  phone: string
}

function validateFormData(data: ContactFormData): { valid: boolean; error?: string } {
  if (!data.question || data.question.trim().length < 5) {
    return { valid: false, error: "Вопрос должен быть минимум 5 символов" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: "Некорректный email" }
  }

  const phoneRegex = /^[\d\s\-+()]{6,}$/
  if (!data.phone || !phoneRegex.test(data.phone)) {
    return { valid: false, error: "Некорректный номер телефона" }
  }

  return { valid: true }
}

async function sendTelegramMessage(data: ContactFormData): Promise<boolean> {
  const text = `
📨 *Новое сообщение из формы связи*

❓ *Вопрос:* ${escapeMarkdown(data.question)}
📧 *Email:* ${escapeMarkdown(data.email)}
📞 *Телефон:* ${escapeMarkdown(data.phone)}

---
Время: ${new Date().toLocaleString("ru-RU")}
  `.trim()

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("[v0] Telegram API error:", result)
      return false
    }

    console.log("[v0] Message sent to Telegram successfully")
    return true
  } catch (error) {
    console.error("[v0] Error sending message to Telegram:", error)
    return false
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&")
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    const validation = validateFormData(data)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error || "Ошибка валидации" }, { status: 400 })
    }

    const sent = await sendTelegramMessage(data)

    if (!sent) {
      return NextResponse.json({ error: "Ошибка при отправке сообщения. Попробуйте позже." }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Сообщение успешно отправлено" }, { status: 200 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
