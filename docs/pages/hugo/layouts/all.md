{{ with partial "lastmod.md" . }}
# {{ .Title }}
{{ .RenderShortcodes }}
{{ end }}
