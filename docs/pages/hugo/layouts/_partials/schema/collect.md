{{/* Every type worth its own definition, in the order first seen: named object
     types, plus enums (which are inlined in the schema, so they are named after
     the property that carries them, suffixed with Enum).
     Recurses through properties and array elements, skipping types already
     found so self-referential schemas terminate.
     Returns a slice of {name, schema} dicts.
     Args: types, schema. Optional: found (types already collected — seed it
     with the root's own entry to get the root back first). */}}
{{- $types := .types }}
{{- $found := .found | default slice }}
{{- $r := partial "schema/resolve.md" (dict "types" $types "schema" (.schema | default dict)) }}
{{- $root := $r.element | default $r }}
{{- range $k, $v := ($root.properties | default dict) }}
  {{- $p := partial "schema/resolve.md" (dict "types" $types "schema" $v) }}
  {{- $p = $p.element | default $p }}
  {{- $seen := slice }}
  {{- range $found }}{{ $seen = $seen | append .name }}{{ end }}
  {{- if $p.enum }}
    {{- /* Naming rule shared with schema/type-expr.md. */}}
    {{- $n := printf "%sEnum" (strings.FirstUpper $k) }}
    {{- with $p.names }}{{ $n = index . 0 }}{{ end }}
    {{- if not (in $seen $n) }}
      {{- $found = $found | append (dict "name" $n "schema" $p) }}
    {{- end }}
  {{- else if and $p.names (or $p.properties (eq ($p.type | default "") "object")) }}
    {{- $n := index $p.names 0 }}
    {{- if not (in $seen $n) }}
      {{- $ref := dict "$ref" (printf "#/components/schemas/%s" $n) }}
      {{- $found = $found | append (dict "name" $n "schema" $ref) }}
      {{- $found = partial "schema/collect.md" (dict "types" $types "schema" $ref "found" $found) }}
    {{- end }}
  {{- end }}
{{- end }}
{{- return $found }}
