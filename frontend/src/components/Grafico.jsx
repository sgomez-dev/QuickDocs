import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Grafico({ datos, tipo }) {
  const campos = {
    factura: ['agua', 'luz', 'gas'],
    gastos: ['alimentacion', 'transporte', 'internet']
  }

  const data = campos[tipo]?.map((campo) => ({
    name: campo,
    valor: parseFloat(datos[campo]) || 0
  })) || []

  if (!data.length) return null

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Resumen visual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#3182ce" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}