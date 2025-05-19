import { Card } from '@/components/common/card/card';
import { ContentLayout } from '@/components/layouts/content-layout/content-layout';
import './main-error.scss';

/**
 * Main error boundary fallback UI with toast notification
 */
export const MainErrorFallback = () => {
  return (
    <div className="error-container">
      <Card className="card-section" as="main">
        <ContentLayout className="error-layout">
          <div className="text-center">
            <h2>Ooops, something went wrong :(</h2>
            <button
              onClick={() => window.location.assign(window.location.origin)}
              className="btn btn-primary mt-3"
            >
              Try Again
            </button>
          </div>
        </ContentLayout>
      </Card>
    </div>
  );
};
