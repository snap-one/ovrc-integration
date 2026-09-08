{{/* "min length 1, up to 359 items" for a resolved schema. Args: schema. */}}
  {{- $r := .schema }}
  {{- $out := slice }}
  {{- with $r.minimum }}{{ $out = $out | append (printf "minimum %v" .) }}{{ end }}
  {{- with $r.maximum }}{{ $out = $out | append (printf "maximum %v" .) }}{{ end }}
  {{- with $r.exclusiveMinimum }}{{ $out = $out | append (printf "greater than %v" .) }}{{ end }}
  {{- with $r.exclusiveMaximum }}{{ $out = $out | append (printf "less than %v" .) }}{{ end }}
  {{- with $r.multipleOf }}{{ $out = $out | append (printf "multiple of %v" .) }}{{ end }}
  {{- with $r.minLength }}{{ $out = $out | append (printf "min length %v" .) }}{{ end }}
  {{- with $r.maxLength }}{{ $out = $out | append (printf "max length %v" .) }}{{ end }}
  {{- with $r.pattern }}{{ $out = $out | append (printf "matches `%s`" .) }}{{ end }}
  {{- with $r.minItems }}{{ $out = $out | append (printf "at least %v items" .) }}{{ end }}
  {{- with $r.maxItems }}{{ $out = $out | append (printf "up to %v items" .) }}{{ end }}
  {{- if $r.uniqueItems }}{{ $out = $out | append "unique items" }}{{ end }}
  {{- with $r.default }}{{ $out = $out | append (printf "defaults to `%v`" .) }}{{ end }}
  {{- return (delimit $out ", ") }}
