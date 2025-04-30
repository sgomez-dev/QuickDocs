import { useState } from "react"
import { generarPDF } from "@/lib/api"
import { Documento } from "@/types/Documento"
import Grafico from "./Grafico"
import * as htmlToImage from "html-to-image"


export default function FormularioPDF({ onPDFReady }) {
    const [tipo, setTipo] = useState('factura')
    const [datos, setDatos] = useState({})

    const handleInputChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let image = null
        const grafico = document.getElementById('grafico')
        if (grafico) {
            const dataUrl = await htmlToImage.toPng(grafico)
            image = dataUrl.replace(/^data:image\/png;base64,/, '')
        }
        const url = await generarPDF(tipo, datos, imagenBase64)
        onPDFReady(url)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 border border-gray-600">
            <label className="block text-sm font-medium">Tipo de documento</label>
            <select 
             value={tipo}
             onChange={(e) => {
                setTipo(e.target.value)
                setDatos({})
                onPDFReady('')
             }}
             className="border p-2 rounded w-full"
            >
                {Object.keys(Documento).map((tipoKey) => (
                    <option key={tipoKey} value={tipoKey}>{tipoKey.toUpperCase()}</option>
                ))}
            </select>

            {Documento[tipo].map((campo) => (
                <div key={campo}>
                    <label className="block text-sm">{campo.toUpperCase()}</label>
                    <input 
                     type="text"
                     name={campo}
                     value={datos[campo] || ''}
                     onChange={handleInputChange}
                     placeholder={`Ingrese ${campo}`}
                     className="border p-2 rounded w-full"
                    />
                </div>
            ))}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Generar PDF</button>
            <Grafico datos={datos} tipo={tipo} />
        </form>
    )
}