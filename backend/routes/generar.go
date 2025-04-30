package routes

import (
	"encoding/json"
	"net/http"
	"quickdocs/pdf"
)

type PDFRequest struct {
	Tipo   string            `json:"tipo"`
	Datos  map[string]string `json:"datos"`
	Imagen string            `json:"image,omitempty"`
}

func GenerarPDFHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var req PDFRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	allowedTypes := map[string]bool{
		"factura":     true,
		"gastos":      true,
		"certificado": true,
		"invitacion":  true,
		"cupon":       true,
	}

	if !allowedTypes[req.Tipo] {
		http.Error(w, "Tipo de plantilla no permitido", http.StatusBadRequest)
		return
	}

	file, err := pdf.GenerarDesdePlantilla(req.Tipo, req.Datos, req.Imagen)
	if err != nil {
		http.Error(w, "Error al generar el PDF"+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", "inline; filename=documento.pdf")
	w.Write(file.Bytes())
}
