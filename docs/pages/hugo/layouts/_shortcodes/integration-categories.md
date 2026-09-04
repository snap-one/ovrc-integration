{{- range resources.Match "schemas/openapi/*.json"}}
{{- $category := . | strings.TrimPrefix "/schemas/openapi/" | strings.TrimSuffix ".json" }}
- {{ $category | strings.Title }}
{{- end }}
