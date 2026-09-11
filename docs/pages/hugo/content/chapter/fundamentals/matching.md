---
title: Integration Matching
weight: 0
---

## Details

Once an integration has been authored and published, OvrC needs a way
to know when the integration should be suggested
or automatically used for a given device.
This is determined by reconciling discovery data received from a device against
the [discovery matchers](./manifest.md#identification)
specified in the integration's `manifest.json` file.

Each data point specified in an integration manifest is assigned
a weight. Within a single discovery matcher object, all data points must
match the concrete data received for the target device. If one or more
of those data points do not match,
the match confidence is assigned a score of zero.

If each field specified in the matcher object matches data received from the device,
the sum of each field's weight is calculated, resulting in a non-zero score.
Most fields support pattern matching via `fnmatch`.
However, the use of pattern matching within a field will decrease its total weight.

It should be every integration author's goal to define discovery matchers
in such a way that devices matching it yield a high score,
as a consequence of matched field weights.

> [!IMPORTANT]
> Every effort should be taken to structure discovery matchers
> in such a way that an incompatible device never would yield
> a non-zero score.

## Examples

The examples below use a fictitious device — an "Acme" television
reporting on a documentation-only network (`192.0.2.0/24`).
Real discovery payloads contain device identifiers,
serial numbers, MAC addresses and keys; those are omitted here.

### Device Discovery Data

The following (trimmed) payload is the shape of the discovery data
OvrC reconciles matchers against. Each top level key is the
source that produced the data.

```json
{
  "ssdp": {
    "services": [
      {
        "st": "urn:schemas-acme-com:service:AcmeWebAPI:1",
        "usn": "uuid:00000000-0000-0000-0000-000000000001",
        "location": "http://192.0.2.10:1938/acme/ssdp/dd.xml",
        "server": "Linux/4.19 UPnP/1.0 AcmeOS/1.0"
      },
      {
        "st": "urn:schemas-upnp-org:device:MediaRenderer:1",
        "usn": "uuid:00000000-0000-0000-0000-000000000002",
        "location": "http://192.0.2.10:52323/MediaRenderer.xml",
        "server": "Android/1.6 UPnP/1.0 Acme DMR/0.1"
      }
    ]
  },
  "UPnP": {
    "source": "UPnP",
    "devices": [
      {
        "deviceType": "urn:schemas-upnp-org:device:MediaRenderer:1",
        "friendlyName": "Acme TV",
        "modelName": "MediaRenderer",
        "modelNumber": "100",
        "manufacturer": "Acme Corporation",
        "manufacturerURL": "http://www.example.com/",
        "location": "http://192.0.2.10:52323/MediaRenderer.xml",
        "services": [
          {
            "serviceType": "urn:schemas-upnp-org:service:AVTransport:1",
            "serviceId": "urn:upnp-org:serviceId:AVTransport",
            "controlURL": "http://192.0.2.10:52323/upnp/control/AVTransport",
            "actions": ["Play", "Pause", "Stop", "Seek"]
          },
          {
            "serviceType": "urn:schemas-upnp-org:service:RenderingControl:1",
            "serviceId": "urn:upnp-org:serviceId:RenderingControl",
            "controlURL": "http://192.0.2.10:52323/upnp/control/RenderingControl",
            "actions": ["SetVolume", "GetVolume", "SetMute", "GetMute"]
          }
        ]
      }
    ]
  },
  "mDNS": {
    "source": "mDNS",
    "deviceName": "acme-tv.local"
  },
  "DNS-SD": {
    "source": "DNS-SD",
    "services": [
      {
        "serviceName": "Acme TV._airplay._tcp.local",
        "port": "7000",
        "protocol": "tcp",
        "txtRecords": [
          "manufacturer=Acme",
          "model=ACME-TV-100",
          "protovers=1.1",
          "srcvers=377.40.00"
        ]
      },
      {
        "serviceName": "Acme TV._acmecast._tcp.local",
        "port": "37759",
        "protocol": "tcp",
        "txtRecords": [
          "fname=Acme TV",
          "imname=ACME-TV-100"
        ]
      }
    ]
  }
}
```

### OR'd Matcher

Given the following manifest discovery matcher definition:

```jsonc
{
  "discovery": {
    // $or is used to define multiple
    // discovery matcher objects.
    //
    // The highest scoring matcher is used
    // for the final score.
    "$or": [
      {
        "dnssd": {
          "services": [
            // all services listed here must be present
            // in a device's DNS-SD service list.
            // However, this list does not need to be exhaustive.
            // The device may surface additional services.
            {
              "serviceType": "_acmecast._tcp.local",
            },
            {
              "serviceType": "_airplay._tcp.local",
              "txtRecords": ["manufacturer=Acme"],
            },
          ],
        },
      },
      {
        "ssdp": {
          "services": [
            // all services listed here must be present
            // in a device's SSDP service list.
            // However, this list does not need to be exhaustive.
            // The device may surface additional services.
            {
              "st": "urn:schemas-acme-com:service:AcmeWebAPI:1",
            },
          ],
        },
      },
    ],
  },
}
```

Both branches score non-zero against the device data above:

- the `dnssd` branch matches two services, one of them on a TXT record as well
- the `ssdp` branch matches a single `st`

Since every field is an exact match in both branches,
the `dnssd` branch matches more fields and therefore scores higher.
Its score is the one used for the integration.

### AND'd Fields

Fields within a single matcher object are AND'd together,
so the matcher below only scores if the device reports
both the UPnP device type _and_ the service.

```jsonc
{
  "discovery": {
    "upnp": {
      "deviceType": "urn:schemas-upnp-org:device:MediaRenderer:1",
      "modelNumber": "100",
      "services": [
        {
          "serviceType": "urn:schemas-upnp-org:service:AVTransport:1",
        },
      ],
    },
  },
}
```

Adding `modelNumber` raises the score when it matches —
and drops the whole matcher to zero when it does not.
Only specify fields the device is guaranteed to report.

### Patterns Lower The Score

`fnmatch` patterns are useful for covering a product line,
but a matched pattern contributes less weight than a matched literal.

```jsonc
{
  "discovery": {
    "dnssd": {
      "services": [
        {
          "serviceType": "_airplay._tcp.local",
          // matches ACME-TV-100, ACME-TV-200, ...
          // but scores lower than the literal "model=ACME-TV-100"
          "txtRecords": ["model=ACME-TV-*"],
        },
      ],
    },
  },
}
```

Prefer literals where the value is stable,
and reach for patterns only where the value genuinely varies
(firmware revisions, model suffixes, etc...).

### Non-Matching Example

```jsonc
{
  "discovery": {
    "dnssd": {
      "services": [
        {
          "serviceType": "_airplay._tcp.local",
          "txtRecords": ["manufacturer=Globex"],
        },
      ],
    },
  },
}
```

The device does advertise `_airplay._tcp.local`,
but its TXT records report `manufacturer=Acme`.
One unmatched data point zeroes the entire matcher,
so this integration is never suggested for the device —
which is exactly the intent.
