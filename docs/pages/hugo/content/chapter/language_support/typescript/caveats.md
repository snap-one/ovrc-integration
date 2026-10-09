---
title: Caveats and Gotchas
---

## HTTP Requests

Requests made with `fetch` or `deviceFetch` currently support HTTP/1 only.

Headers added automatically by the runtime (such as `Content-Length`) are sent with all-lowercase names
(e.g. `content-length`). HTTP header names are case-insensitive per the HTTP specification, but some
servers and devices handle them case-sensitively anyway. If the server or device being accessed
requires a specific casing, set the header explicitly on the request with the desired casing.
