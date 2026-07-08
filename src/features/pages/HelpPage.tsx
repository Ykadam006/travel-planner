import { StaticPage, InfoSection } from './StaticPage';

const SHORTCUTS = [
  { keys: 'Tab', action: 'Navigate between interactive elements' },
  { keys: 'Enter', action: 'Activate links and buttons' },
  { keys: 'Esc', action: 'Close modals, sheets, and menus' },
  { keys: 'Space', action: 'Toggle checkboxes; pick up items in drag lists' },
  { keys: '↑ ↓', action: 'Move a picked-up itinerary item' },
];

export function HelpPage() {
  return (
    <StaticPage title="Help Center" subtitle="Quick answers.">
      <InfoSection icon="⌨️" title="Keyboard shortcuts">
        <ul className="space-y-2">
          {SHORTCUTS.map((s) => (
            <li key={s.keys} className="flex items-center gap-3">
              <kbd className="min-w-14 rounded-md border border-theme-border bg-theme-surface-subtle px-2 py-1 text-center font-mono text-xs text-theme-text-main">
                {s.keys}
              </kbd>
              <span>{s.action}</span>
            </li>
          ))}
        </ul>
      </InfoSection>
      <InfoSection icon="❓" title="FAQ">
        <p>
          <strong className="text-theme-text-main">Where is my data stored?</strong> Locally in your
          browser. We don&apos;t store it on servers.
        </p>
        <p>
          <strong className="text-theme-text-main">How do I export my itinerary?</strong> Export
          feature coming soon. For now, copy from the page.
        </p>
        <p>
          <strong className="text-theme-text-main">How do I start over?</strong> Use &quot;Start New
          Trip&quot; in the footer — it clears your saved itinerary and packing list.
        </p>
      </InfoSection>
    </StaticPage>
  );
}
