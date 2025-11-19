## Table Of Contents {: #toc }

## URL Scheme

As I'm currently pondering on the idea of creating my own customized content management system, I came accross the challenge of uniquely identifying articles by a URL while still keeping said URL human-readable. A common scheme seems to be as follows:

```txt
https://your-domain.com/articles/{articleId}/sanitized-headline-of-this-article
```

The path `/articles/{articleId}` fully identifies the article, while the additional headline isn't used for lookup but only serves the human to understand what the article is roughly about, without visiting the side. I think that it would also be desirable to have the API automatically redirect to the headline-appended URL if only the article's ID has been provided, or if the headline has been updated. This way, there's no harm in out-of-date URLs, as they're being patched as soon as they're used and possibly shared further.

## Identifier Character-Set

Since the identifier will be a part of the URL, it has to be URL-safe. The following excerpt of [RFC3986](https://www.ietf.org/rfc/rfc3986.txt) states what's generally available:

```txt
2.3. Unreserved Characters

Characters that are allowed in a URI but do not have a reserved purpose are called unreserved. These include uppercase and lowercase letters, decimal digits, hyphen, period, underscore, and tilde.

unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
```

Where `ALPHA = [A-Za-z]` and `DIGIT = [0-9]`. This makes up for a total of $26 + 26 + 10 + 4 = 66$ usable characters. Personally, I would eliminate `"."` and `"~"`, since they could cause ambiguities in a few select scenarios, due to their meaning in relation to paths (`..` - parent directory, `~` - home directory) on UNIX-systems. This leaves us with a total of $66 - 2 = 64$ completely URL-safe characters that are at our disposal when computing path-IDs based on database-UUIDs.

## Case Sensitivity

I am very much aware about the general opinion that's present within the REST-design space, which states that URLs should be case *insensitive*. While this statement makes a lot of sense when it comes to paths and `UUIDv4`s, it would be just a waste of information density to remove case-sensitivity from the identifiers in this context. When identifiers are supposed to be as short as possible, sensitivity is used and preferred.

## UUIDv4 Structure

As commonly known, a `UUIDv4` is comprised of $128$ bit in total, making for $32$ nibbles. Each nibble corresponds to one hexadecimal character. There are four added dashes (`-`), so the total length in ASCII characters of a `UUIDv4` ends up at $32 + 4 = 36$. On the other hand, it's not as obvious that there are six bits which only depict a version number as well as a variant, which can be eliminated, if those constants are internally known and coherent accross the system. The structure's makeup is as follows:

| Byte Offset | Name | Datatype | Description |
|:--:|:-----------------------------:|:------:|:-----------------:|
|  0 | `time_low`                    | uint32 | timestamp: 32 LSb |
|  4 | `time_mid`                    | uint16 | timestamp: 16 mid bits |
|  6 | `time_high`/`version`         | uint16 | timestamp: 12 MSb in LSb of this field<br>version: 4 bit in MSb of this field |
|  8 | `clock_seq_high`/`reserved`   | uint8  | clock sequence: 6 MSb in LSb of this field<br>variant: 2 bit in MSb of this field |
|  9 | `clock_seq_low`               | uint8  | clock sequence: 8 LSb |
| 10 | `node`                        | uint48 | node-id: 48 bit |

## Resulting Length

As there are $128 - 6 = 122$ bits to depict and $64$ characters to do so, there will be a total of

$\lceil\frac{122}{\log_2{64}}\rceil = \lceil\frac{122}{6}\rceil = \lceil\frac{61}{3}\rceil = 21$

characters in the final ID-string. In comparison to the original $32$ (without dashes!), that's a reduction of $\approx 34\%$. There's no way to shrink it down any further, without increasing the chance of a collision, which I'm not willing to do. This is how an ID might look like:

```
fyxNY-STPkH7LVQ8SVC_y
```

## Conversion

TODO: Implement conversion for `UUIDv4` $\Leftrightarrow$ `URL-ID` in Kotlin and add an excerpt here.