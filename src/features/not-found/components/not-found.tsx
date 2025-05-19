import { CartSummary } from '@/components/common/cart-summary';
import { ContentLayout } from '@/components/layouts';
import React from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * NotFoundPage component for 404 errors
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card-content p-3 pb-0 not-found-page">
        <ContentLayout className="error-layout" role="alert" aria-labelledby="not-found-title">
          <h1 className="heading">404 - Page Not Found</h1>
          <p className="subheading">
            We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t exist.
          </p>
        </ContentLayout>
      </div>

      <CartSummary
        buttonText="Home"
        onClick={() => navigate('/')}
        buttonAriaLabel="Go to home page"
        className="mt-2"
      />
    </>
  );
};

export default NotFoundPage;
