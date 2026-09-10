{{- /* mdbook's table of contents: prefix pages, then chapter parts, then suffix pages. */ -}}
# Summary
{{- with .GetPage "prefix" }}
  {{- template "PrefixOrSuffix" . }}
{{- end }}

{{- with .GetPage "chapter" }}
{{- range sort .Pages "File.Path"  }}
# {{ .Title }}
{{ template "chapters" (dict "page" . "depth" 0) }}
{{- end }}
{{- end }}

{{- with .GetPage "suffix" }}
  {{- template "PrefixOrSuffix" . }}
{{- end }}

{{- define "PrefixOrSuffix" }}
  {{- range sort .Pages "File.Path" }}
{{ template "PageMDLink" . }}
  {{- end }}
{{- end }}

{{- define "chapters" }}
  {{- $indent := strings.Repeat (mul 2 .depth) " " }}
  {{- range sort .page.Pages "File.Path" }}
{{ $indent }}- {{ template "PageMDLink" . }}{{.File.Path}}
    {{- template "chapters" (dict "page" . "depth" (add $.depth 1)) }}
  {{- end }}
{{- end }}

{{- define "PageMDLink" }}
{{- $isWIP := .Params.wip -}}
{{- $baseURLPath := (urls.Parse .Site.BaseURL).Path -}}
[{{ .Title }}{{if $isWIP}} (coming soon){{end}}]({{if not $isWIP}}{{ strings.TrimPrefix $baseURLPath .RelPermalink }}{{end}})
{{- end }}
