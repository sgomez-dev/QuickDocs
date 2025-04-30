import "@/styles/globals.css";


export const metadata = {
    title: 'QuickDocs - Generador de Documentos',
    description: 'Genera documentos PDF de forma rápida y sencilla',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    )
}