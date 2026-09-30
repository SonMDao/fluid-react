import { Label, StackLayout } from '@Fluid'
import { CATALOG_GROUPS, type CatalogId } from './catalog'

export interface ControlCatalogProps {
  /** The currently selected control (drives the visible selected state). */
  selectedId: CatalogId
  /** Fires with the id of the control the user picked. */
  onSelect: (id: CatalogId) => void
}

/**
 * The left-pane control list (FR-004): all 50 catalogued controls, grouped under the five category
 * headings, with a single selection and a visible selected state. It is keyboard-operable — every
 * option is focusable (Tab), Enter/Space selects it, and the arrow keys move the selection to the
 * next/previous control in catalog order (FR-018). It scrolls within the Splitter's left pane.
 *
 * @remarks Referenced by: `Body` (the Splitter's first pane).
 */
export default function ControlCatalog({ selectedId, onSelect }: ControlCatalogProps) {
  const orderedIds = CATALOG_GROUPS.flatMap((group) => group.controls)

  return (
    <StackLayout Orientation="Vertical" Spacing={6} Padding={10}>
      {CATALOG_GROUPS.map((group) => (
        <StackLayout key={group.category} Orientation="Vertical" Spacing={2}>
          <Label
            Text={group.category}
            FontAttributes="Bold"
            FontSize="var(--text-md)"
            TextColor="var(--text)"
            Padding={{ left: 8, top: 10, bottom: 4 }}
          />
          <StackLayout Orientation="Vertical" Spacing={2} role="listbox" aria-label={group.category}>
            {group.controls.map((id) => {
              const selected = id === selectedId
              const index = orderedIds.indexOf(id)
              const select = (next: CatalogId) => {
                if (next !== selectedId) onSelect(next)
              }
              return (
                <Label
                  key={id}
                  Text={id}
                  FontSize="var(--text-base)"
                  TextColor={selected ? 'var(--fluid-switch-thumb)' : 'var(--text)'}
                  FontAttributes={selected ? 'Bold' : 'None'}
                  BackgroundColor={selected ? 'var(--accent-blue)' : undefined}
                  Padding={{ left: 10, right: 10, top: 7, bottom: 7 }}
                  WidthRequest="100%"
                  className="fluid-catalog-option"
                  style={{ display: 'block' }}
                  role="option"
                  aria-selected={selected}
                  tabIndex={0}
                  onClick={() => select(id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      select(id)
                    } else if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      select(orderedIds[(index + 1) % orderedIds.length])
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault()
                      select(orderedIds[(index - 1 + orderedIds.length) % orderedIds.length])
                    }
                  }}
                />
              )
            })}
          </StackLayout>
        </StackLayout>
      ))}
    </StackLayout>
  )
}
