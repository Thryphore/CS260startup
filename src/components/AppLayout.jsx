import { Outlet, useMatches } from 'react-router-dom';
import { SiteNav } from '@/components/SiteNav';
import { useDocumentTitle } from '@/useDocumentTitle';

export function AppLayout() {
  return (
    <>
      <DocumentTitle />
      <header className="site-header">
        <SiteNav />
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <a href="https://github.com/Thryphore/CS260startup">GitHub</a>
            <span>
              <span className="footer-label">IGN:</span>Navi.5047
            </span>
            <span>
              <span className="footer-label">Another project:</span>
              <a href="https://thryphore.github.io/wvw-pip-tally/">WvW Pip Tally</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

function DocumentTitle() {
  const matches = useMatches();
  const title = matches.findLast((match) => match.handle?.title)?.handle.title ?? 'Fractal Skip Hub';
  useDocumentTitle(title);
  return null;
}
