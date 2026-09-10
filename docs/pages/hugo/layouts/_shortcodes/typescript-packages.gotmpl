{{- /* Lists published Typescript packages, newest version first.
       kind="category" for category specific packages, kind="runtime" for the rest. */ -}}
{{- $root := "static/sdks/typescript" }}
{{- $wantRuntimePackages := eq (.Get "kind") "runtime" }}
{{- range $pkg := os.ReadDir $root }}
  {{- if $pkg.IsDir }}
    {{- $name := $pkg.Name }}
    {{- if eq (in site.Params.runtimePackages $name) $wantRuntimePackages }}
      {{- $versions := slice }}
      {{- range os.ReadDir (path.Join $root $name) }}
        {{- if .IsDir }}{{ $versions = $versions | append .Name }}{{ end }}
      {{- end }}
      {{- $versions = sort $versions "value" "desc" }}
      {{- with $versions | first 1 }}
        {{- $latest := index . 0 }}

### [@snap-one/{{ $name }}]({{ printf "_static/sdks/typescript/%s/%s/index.html" $name $latest | absURL }})

```bash
npm install @snap-one/{{ $name }}@latest
```

      {{- end }}

<details>
  <summary>Version List</summary>
  <ul>
  {{- range $v := $versions }}
    <li>
      <div>
        <a
          href='{{ printf "_static/sdks/typescript/%s/%s/index.html" $name $v | absURL }}'
          target="_blank"
          rel="noopener noreferrer"
        >
          v{{ $v }}
        </a>
        <span>|</span>
        <a 
          href='https://github.com/snap-one/ovrc-integration/releases/tag/{{ urls.PathEscape "@snap-one/" }}ts-{{ $name | urls.PathEscape }}-v{{ $v | urls.PathEscape }}'
          target="_blank"
          rel="noopener noreferrer"
        >
          Release Notes
        </a>
      </div>
    </li>
  {{- end }}
  </ul>
</details>
    {{- end }}
  {{- end }}
{{- end }}
