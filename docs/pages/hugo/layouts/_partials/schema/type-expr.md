{{/* Type expression for a resolved schema: "string", "Foo[] | null".
     Enums resolve to their own type name, after the property carrying them.
     Args: schema (resolved). Optional: key (the property name). */}}
{{- $r := .schema }}
{{- $body := $r.element | default $r }}
{{- $t := $body.type | default "" }}
{{- $expr := "unknown" }}
{{- if $body.enum }}
  {{- /* Naming rule shared with schema/collect.md. */}}
  {{- $expr = printf "%sEnum" (strings.FirstUpper (.key | default "")) }}
  {{- with $body.names }}{{ $expr = index . 0 }}{{ end }}
{{- else if and $body.names (or $body.properties (eq $t "object") (eq $t "")) }}
  {{- $expr = index $body.names 0 }}
{{- else if $body.oneOf }}
  {{- $variants := slice }}
  {{- range $body.oneOf }}
    {{- $variants = $variants | append (cond (isset . "$ref") (strings.TrimPrefix "#/components/schemas/" (index . "$ref")) "unknown") }}
  {{- end }}
  {{- $expr = delimit $variants " | " }}
{{- else if eq $t "string" }}
  {{- $expr = "string" }}
  {{- with $body.format }}{{ $expr = printf "string (%s)" . }}{{ end }}
{{- else if or (eq $t "integer") (eq $t "number") }}
  {{- $expr = "number" }}
{{- else if eq $t "boolean" }}
  {{- $expr = "boolean" }}
{{- else if eq $t "object" }}
  {{- $expr = "object" }}
{{- end }}
{{- if $r.element }}{{ $expr = printf "%s[]" $expr }}{{ end }}
{{- if or $r.nullable $body.nullable }}{{ $expr = printf "%s | null" $expr }}{{ end }}
{{- return $expr }}
