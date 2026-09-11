# {{ strings.Title .Params.category }} Methods
{{- .Content }}

{{- $oapi := printf "/schemas/openapi/%s.json" .Params.category | resources.Get }}
{{- $transformOpts := dict "format" "json"}}
{{- $oapi = transform.Unmarshal  $transformOpts $oapi }}
{{- $typeDefs := $oapi.components.schemas }}
{{- $rpcMethod := $typeDefs.RPCMethod }}
{{- $methodToTypeMapping := $rpcMethod.discriminator.mapping }}
{{- $methods := slice }}
{{- range $method, $methodType := $methodToTypeMapping }}
  {{- $methodType = strings.TrimPrefix "#/components/schemas/" $methodType }}
  {{- $methodDef := dict
  "method" $method
  "methodType" $methodType
  "params" (printf "%sParams" $methodType)
  "args" (printf "%sArgs" $methodType)
  "result" (printf "%sResult" $methodType)
  "response" (printf "%sResponse" $methodType)
  }}
  {{- $methods = append $methodDef $methods }}
{{- end }}

{{- range $methods }}
  {{- $methodDef := index $typeDefs .methodType }}

---

### {{ .method }}
  {{- with $methodDef.description }}

<span class="method-desc">

  {{. | htmlEscape }}

</span>
    {{- end }}

#### Parameter
<details>
  <summary>Type Definitions</summary>
    {{- partial "inline/PrettyPrintType" (dict "types" $typeDefs "typeName" .params "level" 5) | safeHTML }}
</details>

#### Result
<details>
  <summary>Type Definitions</summary>
    {{- partial "inline/PrettyPrintType" (dict "types" $typeDefs "typeName" .result "level" 5) | safeHTML }}
</details>
{{- end }}

{{/* ---------------------------------------------------------------------- */}}
{{/* PrettyPrintType: document a type, then every named type it references,   */}}
{{/* each as a titled property table.                                         */}}
{{/* Args: types, typeName. Optional: level (heading level, default 5).       */}}
{{/* ---------------------------------------------------------------------- */}}
{{- define "_partials/inline/PrettyPrintType" }}
  {{- $types := .types }}
  {{- $hashes := strings.Repeat (.level | default 5) "#" }}
  {{- $root := dict "$ref" (printf "#/components/schemas/%s" .typeName) }}
  {{- range partial "schema/collect.md" (dict
    "types" $types
    "schema" $root
    "found" (slice (dict "name" .typeName "schema" $root))) }}
    {{- $r := partial "schema/resolve.md" (dict "types" $types "schema" .schema) }}
    {{- $body := $r.element | default $r }}
{{ printf "\n%s `%s`" $hashes .name | safeHTML }}
    {{- with $r.description | default $body.description }}
{{ printf "\n%s" (trim . "\n") | safeHTML }}
    {{- end }}

    {{- if $body.properties }}
{{ "\n| Property | Type | Required | Description |" | safeHTML }}
{{ "|---|---|---|---|" | safeHTML }}
      {{- $keys := slice }}
      {{- range $k, $v := $body.properties }}{{ $keys = $keys | append $k }}{{ end }}
      {{- range $keys }}
        {{- $p := partial "schema/resolve.md" (dict "types" $types "schema" (index $body.properties .)) }}
        {{- $pbody := $p.element | default $p }}
        {{- $cell := slice }}
        {{- with $p.description | default $pbody.description }}{{ $cell = $cell | append (trim . "\n") }}{{ end }}
        {{- with partial "schema/constraints.md" (dict "schema" $p) }}
          {{- $cell = $cell | append (printf "%s." (strings.FirstUpper .)) }}
        {{- end }}
        {{- with $p.element }}
          {{- with partial "schema/constraints.md" (dict "schema" .) }}
            {{- $cell = $cell | append (printf "Each item: %s." .) }}
          {{- end }}
        {{- end }}
{{ printf "| `%s` | `%s` | %s | %s |"
  .
  (replace (partial "schema/type-expr.md" (dict "schema" $p "key" .)) "|" "\\|")
  (cond (in $body.required .) "✓" "")
  (replace (replace (delimit $cell "\n") "|" "\\|") "\n" "<br>") | safeHTML }}
      {{- end }}
    {{- else if $body.enum }}
{{ "\n`enum`" | safeHTML }}
      {{- $values := slice }}
      {{- range $body.enum }}{{ $values = $values | append (printf "`%v`" .) }}{{ end }}
{{ printf "\nOne of: %s." (delimit $values ", ") | safeHTML }}
    {{- else if or $body.oneOf (ne ($body.type | default "object") "object") }}
      {{- /* Not an object: document the shape itself. */}}
{{ printf "\n`%s`" (partial "schema/type-expr.md" (dict "schema" $r)) | safeHTML }}
    {{- else }}
{{ "\n_No properties._" | safeHTML }}
    {{- end }}
  {{- end }}
{{- end }}
