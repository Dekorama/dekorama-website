import { NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'
const BREVO_TIMEOUT_MS = 10000

// Evita que el host corte la función antes de que Brevo responda (Vercel etc.)
export const maxDuration = 15

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch (parseErr) {
    // #region agent log
    fetch('http://127.0.0.1:7358/ingest/e0cc4f80-704d-47b2-bed7-313bb0f2835c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6ab708'},body:JSON.stringify({sessionId:'6ab708',location:'route.js:parse',message:'body parse failed',data:{name:parseErr?.name,message:parseErr?.message},hypothesisId:'H4',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return NextResponse.json(
      { error: 'Cuerpo de la petición inválido o vacío.' },
      { status: 400 }
    )
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { error: 'Cuerpo de la petición inválido.' },
      { status: 400 }
    )
  }

  try {
    const { nombre, telefono, email, tipoReforma, descripcion } = body

    if (!nombre?.trim() || !telefono?.trim() || !email?.trim() || !tipoReforma) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios: nombre, teléfono, email y tipo de reforma.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.BREVO_API_KEY
    // #region agent log
    fetch('http://127.0.0.1:7358/ingest/e0cc4f80-704d-47b2-bed7-313bb0f2835c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6ab708'},body:JSON.stringify({sessionId:'6ab708',location:'route.js:env',message:'env check',data:{hasApiKey:!!apiKey},hypothesisId:'H1',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'admin@dekoramagroup.com'
    const senderName = process.env.BREVO_SENDER_NAME || 'Dekorama Web'

    if (!apiKey) {
      // #region agent log
      fetch('http://127.0.0.1:7358/ingest/e0cc4f80-704d-47b2-bed7-313bb0f2835c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6ab708'},body:JSON.stringify({sessionId:'6ab708',location:'route.js:no-api-key',message:'returning 500 no api key',data:{},hypothesisId:'H1',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
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

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), BREVO_TIMEOUT_MS)

    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      signal: controller.signal,
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
    }).finally(() => clearTimeout(timeoutId))

    // #region agent log
    fetch('http://127.0.0.1:7358/ingest/e0cc4f80-704d-47b2-bed7-313bb0f2835c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6ab708'},body:JSON.stringify({sessionId:'6ab708',location:'route.js:brevo-response',message:'brevo response',data:{ok:res.ok,status:res.status},hypothesisId:'H2',timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      // #region agent log
      fetch('http://127.0.0.1:7358/ingest/e0cc4f80-704d-47b2-bed7-313bb0f2835c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6ab708'},body:JSON.stringify({sessionId:'6ab708',location:'route.js:brevo-err',message:'brevo error body',data:{status:res.status,message:errData?.message,code:errData?.code},hypothesisId:'H2',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      console.error('Brevo API error:', res.status, JSON.stringify(errData))
      const status = res.status >= 500 ? 502 : 500
      const isDev = process.env.NODE_ENV === 'development'
      let message = 'No se pudo enviar el mensaje. Inténtelo de nuevo o contacte por teléfono.'
      if (isDev && (errData?.message || errData?.code)) {
        message = `Brevo: ${errData.message || errData.code}.`
        if (res.status === 401 || errData?.code === 'unauthorized' || /not enabled/i.test(errData?.message || '')) {
          message += ' En Brevo → SMTP & API → API keys, comprueba que la clave tenga permisos de envío por API o genera una nueva.'
        } else {
          message += ' Verifica remitente y API key en app.brevo.com'
        }
      }
      return NextResponse.json({ error: message }, { status })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    // #region agent log
    fetch('http://127.0.0.1:7358/ingest/e0cc4f80-704d-47b2-bed7-313bb0f2835c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6ab708'},body:JSON.stringify({sessionId:'6ab708',location:'route.js:catch',message:'handler exception',data:{name:err?.name,message:err?.message},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const isTimeout = err?.name === 'AbortError'
    console.error('Contact API error:', isTimeout ? 'Brevo timeout' : err)
    const isDev = process.env.NODE_ENV === 'development'
    const message = isTimeout
      ? 'El envío está tardando demasiado. Inténtelo de nuevo o contacte por teléfono.'
      : isDev && err?.message
        ? `Error: ${err.message}`
        : 'Error inesperado. Inténtelo más tarde.'
    return NextResponse.json(
      { error: message },
      { status: isTimeout ? 504 : 500 }
    )
  }
}

function escapeHtml(text) {
  if (!text) return ''
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return String(text).replace(/[&<>"']/g, (c) => map[c])
}
