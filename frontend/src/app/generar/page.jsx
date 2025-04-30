"use client"

import { useState } from "react"
import FormularioPDF from '@/components/FormularioPDF'
import VistaPrevia from '@/components/VistaPrevia'

export default function Generar() {
    const [pdfURL, setPDFURL] = useState('')

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-red-600">QuickDocs - Generador de Documentos</h1>
            <FormularioPDF onPDFReady={setPDFURL} />
            {pdfURL && <VistaPrevia url={pdfURL} />}
        </main>
    )
}