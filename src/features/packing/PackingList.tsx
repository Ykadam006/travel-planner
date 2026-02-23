import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { EmptyState } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { listItemAddRemove, staggerIn, staggerItem } from '@/motion';

const CATEGORIES = [
  'All',
  'Clothing',
  'Toiletries',
  'Electronics',
  'Documents',
  'Accessories',
] as const;
type Category = (typeof CATEGORIES)[number];

const predefinedLists: Record<string, { items: string[]; category: Category }[]> = {
  'Beach Vacation 🏖️': [
    {
      items: ['Sunscreen', 'Swimsuit', 'Beach Towel', 'Sunglasses', 'Flip Flops'],
      category: 'Accessories',
    },
  ],
  'City Tour 🏙️': [
    {
      items: ['Comfortable Shoes', 'Camera', 'Guidebook', 'Reusable Water Bottle', 'Power Bank'],
      category: 'Electronics',
    },
  ],
  'Hiking Adventure 🥾': [
    {
      items: ['Hiking Boots', 'Backpack', 'First Aid Kit', 'Snacks', 'Water Bottle'],
      category: 'Accessories',
    },
  ],
  'Winter Getaway ❄️': [
    { items: ['Warm Jacket', 'Gloves', 'Thermals', 'Beanie', 'Snow Boots'], category: 'Clothing' },
  ],
  'Business Trip 💼': [
    {
      items: ['Laptop', 'Notebook', 'Business Attire', 'Chargers', 'Travel Documents'],
      category: 'Documents',
    },
  ],
};

const WEATHER_SUGGESTIONS: Record<string, { label: string; items: string[] }> = {
  rain: {
    label: 'Rain expected ☔',
    items: ['Umbrella', 'Rain Jacket', 'Waterproof Bag', 'Quick-dry Towel'],
  },
  sunny: { label: 'Sunny & warm ☀️', items: ['Sunscreen', 'Sunglasses', 'Hat', 'Light Clothing'] },
  cold: {
    label: 'Cold weather ❄️',
    items: ['Thermals', 'Warm Jacket', 'Gloves', 'Beanie', 'Scarf'],
  },
  hot: {
    label: 'Hot & humid 🌡️',
    items: ['Sunscreen', 'Light Fabrics', 'Extra Water', 'Cooling Towel'],
  },
};

interface PackingItem {
  id: string;
  name: string;
  packed: boolean;
  category: Category;
  isSuggestion?: boolean;
}

function PackingCheckbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-theme-border bg-theme-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1"
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: checked ? [1, 1.15, 1] : 1,
        borderColor: checked ? 'rgb(11 95 255)' : undefined,
        backgroundColor: checked ? 'rgb(11 95 255)' : undefined,
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence>
        {checked && (
          <motion.svg
            viewBox="0 0 12 12"
            className="h-3.5 w-3.5 text-white"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.path
              d="M2 6l3 3 5-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.15 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const size = 56;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - progress * circumference;

  return (
    <motion.svg width={size} height={size} className="-rotate-90" aria-hidden initial={false}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-theme-border"
      />
      <g className="text-primary-600 dark:text-primary-400">
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </g>
    </motion.svg>
  );
}

export function PackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [item, setItem] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [showWeatherSuggestions, setShowWeatherSuggestions] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const genId = useId();

  const listsToShow = showMore
    ? Object.keys(predefinedLists)
    : Object.keys(predefinedLists).slice(0, 5);

  const filteredItems =
    selectedCategory === 'All' ? items : items.filter((i) => i.category === selectedCategory);

  const packedCount = items.filter((i) => i.packed).length;
  const progress = items.length > 0 ? packedCount / items.length : 0;

  const handleAdd = (name: string, category: Category = 'Accessories') => {
    if (!name.trim()) return;
    const newItem: PackingItem = {
      id: `${genId}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: name.trim(),
      packed: false,
      category,
    };
    setItems((prev) => [...prev, newItem]);
    setItem('');
    setShowAddInput(false);
  };

  const togglePacked = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i)));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const loadPredefinedList = (listName: string) => {
    const list = predefinedLists[listName];
    if (!list) return;
    const newItems: PackingItem[] = [];
    list.forEach(({ items: names, category }) => {
      names.forEach((name) => {
        newItems.push({
          id: `${genId}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name,
          packed: false,
          category,
        });
      });
    });
    setItems(newItems);
  };

  const handleGenerateList = () => {
    const sample: PackingItem[] = [
      { id: `g-1`, name: 'T-Shirts', packed: false, category: 'Clothing' },
      { id: `g-2`, name: 'Underwear', packed: false, category: 'Clothing' },
      { id: `g-3`, name: 'Toothbrush', packed: false, category: 'Toiletries' },
      { id: `g-4`, name: 'Toothpaste', packed: false, category: 'Toiletries' },
      { id: `g-5`, name: 'Phone Charger', packed: false, category: 'Electronics' },
      { id: `g-6`, name: 'Passport', packed: false, category: 'Documents' },
      { id: `g-7`, name: 'Sunglasses', packed: false, category: 'Accessories' },
    ];
    const existingNames = new Set(items.map((i) => i.name.toLowerCase()));
    const toAdd = sample.filter((s) => !existingNames.has(s.name.toLowerCase()));
    toAdd.forEach((it, i) => {
      const itemWithId = { ...it, id: `${genId}-gen-${Date.now()}-${i}` };
      setTimeout(
        () =>
          setItems((prev) =>
            [...prev, itemWithId].sort(
              (a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category)
            )
          ),
        80 + i * 100
      );
    });
  };

  const addWeatherSuggestions = (condition: keyof typeof WEATHER_SUGGESTIONS) => {
    const config = WEATHER_SUGGESTIONS[condition];
    if (!config) return;
    const { items: names } = config;
    const existing = new Set(items.map((i: PackingItem) => i.name.toLowerCase()));
    const toAdd = names.filter((n: string) => !existing.has(n.toLowerCase()));
    toAdd.forEach((name: string, i: number) => {
      setTimeout(
        () =>
          setItems((prev) => [
            ...prev,
            {
              id: `${genId}-weather-${Date.now()}-${i}`,
              name,
              packed: false,
              category: 'Accessories' as Category,
              isSuggestion: true,
            },
          ]),
        120 + i * 150
      );
    });
    setShowWeatherSuggestions(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <PageHero
        title="Packing List Planner"
        subtitle="Plan and organize your trip essentials effortlessly!"
      />

      {/* Progress + Generate */}
      <div className="mb-10 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-4">
          <ProgressRing progress={progress} />
          <div>
            <p className="text-lg font-semibold">
              {packedCount} / {items.length}
            </p>
            <p className="text-sm text-theme-text-muted">items packed</p>
          </div>
        </div>
        <Button
          onClick={handleGenerateList}
          className="recipe-lift-press"
          data-testid="generate-list-btn"
        >
          Generate list
        </Button>
      </div>

      {/* Add item — inline expand */}
      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-theme-text-main">Add Your Own Item</h2>
        <AnimatePresence mode="wait">
          {showAddInput ? (
            <motion.div
              key="input"
              initial={{ width: 48, opacity: 0.8 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: 48, opacity: 0.8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <input
                type="text"
                placeholder="Enter an item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd(item);
                  if (e.key === 'Escape') {
                    setShowAddInput(false);
                    setItem('');
                  }
                }}
                autoFocus
                className="flex-1 rounded-md border border-theme-border bg-theme-surface px-4 py-2 text-theme-text-main focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <div className="flex gap-2">
                <Button onClick={() => handleAdd(item)}>Add</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddInput(false);
                    setItem('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddInput(true)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-theme-border text-2xl text-theme-text-muted transition-colors hover:border-primary-300 hover:text-primary-600"
            >
              +
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Category chips */}
      {items.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-theme-text-muted">Filter by category</h3>
          <motion.div
            className="flex flex-wrap gap-2"
            layout
            variants={staggerIn(0.03)}
            initial="initial"
            animate="animate"
          >
            {CATEGORIES.filter((c) => c === 'All' || items.some((i) => i.category === c)).map(
              (cat) => (
                <motion.button
                  key={cat}
                  layout
                  variants={staggerItem}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-accent-100 text-accent-700 ring-2 ring-accent-200 dark:bg-accent-900/40 dark:text-accent-300 dark:ring-accent-800'
                      : 'bg-theme-surface-subtle text-theme-text-muted hover:bg-theme-surface'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cat}
                </motion.button>
              )
            )}
          </motion.div>
        </div>
      )}

      {/* Weather-aware suggestions — signature moment */}
      {showWeatherSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h3 className="mb-3 text-sm font-medium text-theme-text-muted">
            Weather-aware suggestions
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(WEATHER_SUGGESTIONS).map(([key, { label }]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addWeatherSuggestions(key)}
                className="rounded-lg border border-theme-border bg-theme-surface px-4 py-2 text-sm shadow-sm transition-colors hover:border-primary-200 hover:bg-primary-50"
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Predefined lists */}
      <div className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-theme-text-main">Predefined Lists</h2>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {listsToShow.map((listName) => (
            <motion.div
              key={listName}
              className="cursor-pointer rounded-xl border border-theme-border bg-theme-surface p-4 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loadPredefinedList(listName)}
            >
              <h3 className="font-semibold text-theme-text-main">{listName}</h3>
              <p className="text-sm text-theme-text-muted">
                {predefinedLists[listName]?.reduce((acc, g) => acc + g.items.length, 0) ?? 0} items
              </p>
            </motion.div>
          ))}
        </motion.div>
        {Object.keys(predefinedLists).length > 5 && (
          <Button variant="outline" className="mt-4" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Load Less' : 'Load More'}
          </Button>
        )}
      </div>

      {/* Packing list — FLIP reflow */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-theme-text-main">Your Packing List</h2>
        {items.length === 0 ? (
          <EmptyState
            icon="🧳"
            title="No items yet"
            description="Add items manually, use Generate list, pick weather suggestions, or choose a predefined list above."
          />
        ) : (
          <motion.ul
            className="space-y-2"
            variants={staggerIn(0.04)}
            initial="initial"
            animate="animate"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((i) => (
                <PackingItemRow
                  key={i.id}
                  item={i}
                  onToggle={() => togglePacked(i.id)}
                  onRemove={() => removeItem(i.id)}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}

function PackingItemRow({
  item,
  onToggle,
  onRemove,
}: {
  item: PackingItem;
  index?: number;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.li
      {...listItemAddRemove}
      variants={staggerItem}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 recipe-press-tap ${
        item.packed
          ? 'border-theme-border bg-theme-surface-subtle'
          : 'border-theme-border bg-theme-surface hover:border-primary-200 recipe-lift-hover'
      } ${item.isSuggestion ? 'ring-1 ring-amber-200 bg-amber-50/50 dark:ring-amber-800 dark:bg-amber-950/30' : ''}`}
      onClick={onToggle}
    >
      <PackingCheckbox checked={item.packed} onToggle={onToggle} />
      <motion.span
        className={`flex-1 ${item.packed ? 'text-theme-text-muted' : 'text-theme-text-main'}`}
        initial={false}
        animate={{
          textDecoration: item.packed ? 'line-through' : 'none',
          opacity: item.packed ? 0.7 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {item.name}
      </motion.span>
      {item.isSuggestion && (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
          Suggested
        </span>
      )}
      <Button
        variant="outline"
        size="sm"
        className="min-w-0 border-0 bg-transparent p-1 text-theme-text-muted hover:bg-red-50 hover:text-red-600"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        ×
      </Button>
    </motion.li>
  );
}
