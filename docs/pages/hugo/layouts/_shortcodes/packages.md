{{- /* Lists published Typescript packages, newest version first.
       kind="high" for category specific packages, kind="low" for the rest. */ -}}
{{- $root := "static/sdks/typescript" }}
{{- $wantLow := eq (.Get "kind") "low" }}
{{- range $pkg := os.ReadDir $root }}
  {{- if $pkg.IsDir }}
    {{- $name := $pkg.Name }}
    {{- if eq (in site.Params.lowLevelPackages $name) $wantLow }}
      {{- $versions := slice }}
      {{- range os.ReadDir (path.Join $root $name) }}
        {{- if .IsDir }}{{ $versions = $versions | append .Name }}{{ end }}
      {{- end }}
      {{- $versions = sort $versions }}
      {{- with $versions | last 1 }}
        {{- $latest := index . 0 }}

<h3>
<a href="/ovrc-integration/_static/sdks/typescript/{{ $name }}/{{ $latest }}/index.html" target="_blank" rel="noopener noreferrer">
@snap-one/{{ $name }}
</a>
</h3>

```bash
npm install @snap-one/{{ $name }}@latest
```

or

```bash
npm install @snap-one/{{ $name }}@{{ $latest }}
```
      {{- end }}

<details>
  <summary>Full version list</summary>
  <ul>
  {{- range $v := $versions }}
    <li>
      <a
        href="/ovrc-integration/_static/sdks/typescript/{{ $name }}/{{ $v }}/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        v{{ $v }}
      </a>
    </li>
  {{- end }}
  </ul>
</details>
    {{- end }}
  {{- end }}
{{- end }}
