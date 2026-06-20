import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Header } from '../components/Header';

/**
 * Lightweight in-frame page navigator.
 *
 * Instead of floating modal overlays, screens push full pages that slide in
 * from the right (iOS push/pop). Pages render inside the device frame, above
 * the current tab screen but below the floating bottom navigation, so the nav
 * stays visible and tapping a tab returns to that tab (via reset()).
 */

type Phase = 'enter' | 'exit';

interface PageEntry {
  key: number;
  title: string;
  node: ReactNode;
  phase: Phase;
}

interface NavValue {
  pages: PageEntry[];
  depth: number;
  push: (title: string, node: ReactNode) => void;
  pop: () => void;
  reset: () => void;
}

const NavContext = createContext<NavValue | null>(null);

export function useNav(): NavValue {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within <NavProvider>');
  return ctx;
}

let uid = 1;
const EXIT_MS = 260;

export function NavProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<PageEntry[]>([]);

  const push = useCallback((title: string, node: ReactNode) => {
    setPages((p) => [...p, { key: uid++, title, node, phase: 'enter' }]);
  }, []);

  const pop = useCallback(() => {
    setPages((p) => {
      if (!p.length) return p;
      const last = p[p.length - 1];
      window.setTimeout(() => {
        setPages((cur) => cur.filter((e) => e.key !== last.key));
      }, EXIT_MS);
      return p.map((e, i) => (i === p.length - 1 ? { ...e, phase: 'exit' } : e));
    });
  }, []);

  const reset = useCallback(() => {
    setPages((p) => {
      if (!p.length) return p;
      window.setTimeout(() => setPages([]), EXIT_MS);
      return p.map((e, i) => (i === p.length - 1 ? { ...e, phase: 'exit' } : e));
    });
  }, []);

  return (
    <NavContext.Provider value={{ pages, depth: pages.length, push, pop, reset }}>
      {children}
    </NavContext.Provider>
  );
}

/** Renders the sliding page stack. Must live inside the device frame. */
export function PageHost() {
  const { pages, pop } = useNav();
  return (
    <>
      {pages.map((pg, i) => (
        <div
          key={pg.key}
          className={`v-page ${pg.phase === 'exit' ? 'v-page-exit' : 'v-page-enter'}`}
          style={{ zIndex: 40 + i }}
        >
          <Header title={pg.title} onBack={pop} />
          <div className="v-page-scroll">{pg.node}</div>
        </div>
      ))}
    </>
  );
}
