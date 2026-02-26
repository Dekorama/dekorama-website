import { NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, telefono, email, tipoReforma, descripcion } = body

    if (!nombre?.trim() || !telefono?.trim() || !email?.trim() || !tipoReforma) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios: nombre, teléfono, email y tipo de reforma.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.BREVO_API_KEY
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'admin@dekoramagroup.com'
    const senderName = process.env.BREVO_SENDER_NAME || 'Dekorama Web'

    if (!apiKey) {
      console.error('BREVO_API_KEY no está configurada')
      return NextResponse.json(
        { error: 'Error de configuración. Inténtelo más tarde.' },
        { status: 500 }
      )
    }

    const tipoLabel = {
      integral: 'Reforma Integral',
      cocina: 'Cocina',
      bano: 'Baño',
      otro: 'Otro',
    }[tipoReforma] || tipoReforma

    const htmlContent = `
      <h2>Nueva consulta desde la web</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Tipo de reforma:</strong> ${escapeHtml(tipoLabel)}</p>
      ${descripcion?.trim() ? `<p><strong>Descripción / Mensaje:</strong></p><p>${escapeHtml(descripcion)}</p>` : ''}
      <p><em>Enviado desde el formulario de contacto de Dekorama.</em></p>
    `

    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: senderEmail, name: senderName }],
        replyTo: { email: email.trim(), name: nombre.trim() },
        subject: `[Web] Consulta: ${nombre.trim()} - ${tipoLabel}`,
        htmlContent,
      }),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      console.error('Brevo error:', res.status, errData)
      return NextResponse.json(
        { error: 'No se pudo enviar el mensaje. Inténtelo de nuevo o contacte por teléfono.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Error inesperado. Inténtelo más tarde.' },
      { status: 500 }
    )
  }
}

function escapeHtml(text) {
  if (!text) return ''
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return String(text).replace(/[&<>"']/g, (c) => map[c])
}
