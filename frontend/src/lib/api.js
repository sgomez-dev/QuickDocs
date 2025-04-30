import { BACKEND_URL } from "@/config/constants";

export async function generarPDF(tipo, datos, imagenBase64) {
    const res = await fetch(`${BACKEND_URL}/api/generar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipo, datos, image: imagenBase64 }),
    })

    const blob = await res.blob()
    return URL.createObjectURL(blob)
}