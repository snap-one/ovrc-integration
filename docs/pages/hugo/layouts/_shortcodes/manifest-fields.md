| Field Name | Description | Type |
| ---------- | ----------- | ---- |
{{- with resources.Get "schemas/json/manifest.schema.json" | transform.Unmarshal }}
{{- $required := .required }}
{{- $props := .properties }}
{{- range $key, $def := $props }}
| {{ $key | htmlEscape }} | {{ $def.description | htmlEscape  }} | {{template "DefType" $def }} |
{{- end }}
{{- end }}

{{- define "DefType" }}
{{- if .enum }}enum: {{ delimit .enum ", " | htmlEscape }}
{{- else }}
{{- .type }}
{{- end }}
{{- end}}
