package pdf

import (
	"bytes"
	"encoding/base64"
	"os"
	"path/filepath"
	"text/template"

	"github.com/jung-kurt/gofpdf"
)

func GenerarDesdePlantilla(tipo string, datos map[string]string, imagenBase64 string) (*bytes.Buffer, error) {
	tplPath := filepath.Join("templates", tipo+".html")
	tplContent, err := os.ReadFile(tplPath)
	if err != nil {
		return nil, err
	}

	if imagenBase64 != "" {
		imgData, err := base64.StdEncoding.DecodeString(imagenBase64)
		if err == nil {
			os.WriteFile("assets/grafico.png", imgData, 0644)
		}
	}

	tpl, err := template.New("doc").Parse(string(tplContent))
	if err != nil {
		return nil, err
	}

	var filled bytes.Buffer
	if err := tpl.Execute(&filled, datos); err != nil {
		return nil, err
	}

	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.AddUTF8Font("Roboto", "", "fonts/Roboto-Italic-VariableFont_wdth,wght.ttf")
	pdf.SetFont("Roboto", "", 12)
	pdf.MultiCell(0, 10, filled.String(), "", "", false)

	if tipo == "factura" || tipo == "gastos" {
		imagePath := filepath.Join("assets", "grafico.png")
		if _, err := os.Stat(imagePath); err == nil {
			pdf.Image(imagePath, 15, 200, 180, 0, false, "", 0, "")
		}
	}

	var buf bytes.Buffer
	err = pdf.Output(&buf)
	if err != nil {
		return nil, err
	}

	return &buf, nil

}
