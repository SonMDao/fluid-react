## What this changes

<!-- One or two sentences. Which control(s), and what behaviour changes for someone using them. -->

## Native mobile behaviour being matched

<!-- Which native layout property or behaviour is the reference? A link to the platform
     documentation is ideal. Delete this section if the change does not touch a control's
     public props. -->

## Checklist

- [ ] Props still mirror the native layout names 1:1 (PascalCase, same value vocabulary)
- [ ] Property-driven styling is inline; `style.css` holds only the static remainder
- [ ] Every selector in `style.css` is namespaced `fluid-<control>`
- [ ] The `| native | here |` mapping table in the component's doc comment is up to date
- [ ] A sample exists in `Samples/src/samples/` and is registered in the catalog
- [ ] `npm run typecheck`, `npm run build` and `npm run samples:build` all pass
