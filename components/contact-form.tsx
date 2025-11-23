"use client"

import type React from "react"
import { useState } from "react"

interface FormErrors {
  question?: string
  email?: string
  phone?: string
}

interface Toast {
  id: string
  message: string
  type: "success" | "error"
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    question: "",
    email: "",
    phone: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-+()]{6,}$/
    return phoneRegex.test(phone)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.question.trim()) {
      newErrors.question = "Напишите ваш вопрос"
    } else if (formData.question.trim().length < 5) {
      newErrors.question = "Вопрос минимум 5 символов"
    } else if (formData.question.trim().length > 500) {
      newErrors.question = "Максимум 500 символов"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Укажите email"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Некорректный email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Укажите номер телефона"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Некорректный номер"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке")
      }

      addToast("✓ Сообщение отправлено! Мы скоро с вами свяжемся.", "success")
      setFormData({ question: "", email: "", phone: "" })
      setErrors({})
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Ошибка при отправке сообщения", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="forma">
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="что вы хотите спросить?"
          className={`input-field ${errors.question ? "error" : ""}`}
        />
        {errors.question && <span className="error-message">{errors.question}</span>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ваша почта"
          className={`input-field ${errors.email ? "error" : ""}`}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 999 99-99"
          className={`input-nomer ${errors.phone ? "error" : ""}`}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}

        <div className="zapis" style={{ fontSize: "1.1em" }}>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            style={{ width: "100%", textAlign: "center" }}
          >
            {loading ? "отправляем..." : "запись"}
          </button>
        </div>
      </form>

      <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.type}`}
            style={{
              padding: "15px 20px",
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: toast.type === "success" ? "#4CAF50" : "#f44336",
              color: "white",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <span className="toast-icon">{toast.type === "success" ? "✓" : "✕"}</span>
            {toast.message}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
