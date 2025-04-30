
export default function VistaPrevia({ url }) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Vista previa del documento</h2>
            <iframe src={url} className="w-full h-[600px] border" />
            <a
             href={url}
             download="documento.pdf"
             className="block mt-4 text-blue-600 underline"
            >Descargar PDF</a>
        </div>
    )
}