{{/* Follow $ref and flatten allOf into a single schema map, plus:
       names   — every named type it came from, outermost first, for labels
                 and cycle detection
       element — the resolved element schema, when this is an array
     Enums are normalised too: a null member becomes nullable instead.
     Args: types, schema. Only one return statement: Hugo rewrites the first. */}}
{{- $types := .types }}
{{- $schema := .schema | default dict }}
{{- $names := .names | default slice }}
{{- $resolved := dict }}
{{- $ref := index $schema "$ref" }}
{{- if $ref }}
  {{- $n := strings.TrimPrefix "#/components/schemas/" $ref }}
  {{- $resolved = partial "schema/resolve.md" (dict "types" $types "schema" (index $types $n) "names" ($names | append $n)) }}
{{- else }}
  {{- $out := dict }}
  {{- $required := slice }}
  {{- range $schema.allOf }}
    {{- $part := partial "schema/resolve.md" (dict "types" $types "schema" .) }}
    {{- range $part.names }}{{ $names = $names | append . }}{{ end }}
    {{- range $part.required }}{{ $required = $required | append . }}{{ end }}
    {{- $out = merge $out $part }}
  {{- end }}
  {{- range $k, $v := $schema }}
    {{- if ne $k "allOf" }}{{ $out = merge $out (dict $k $v) }}{{ end }}
  {{- end }}
  {{- range (default slice $schema.required) }}{{ $required = $required | append . }}{{ end }}
  {{- $resolved = merge $out (dict "required" $required "names" $names) }}
{{- end }}
{{- with $resolved.enum }}
  {{- $values := slice }}
  {{- $nullable := $resolved.nullable }}
  {{- range . }}
    {{- if eq . nil }}{{ $nullable = true }}{{ else }}{{ $values = $values | append . }}{{ end }}
  {{- end }}
  {{- $resolved = merge $resolved (dict "enum" $values "nullable" $nullable) }}
{{- end }}
{{- if eq ($resolved.type | default "") "array" }}
  {{- $resolved = merge $resolved (dict "element"
    (partial "schema/resolve.md" (dict "types" $types "schema" ($resolved.items | default dict)))) }}
{{- end }}
{{- return $resolved }}
