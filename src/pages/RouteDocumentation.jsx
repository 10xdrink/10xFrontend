import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/RouteDocumentation.css';

const RouteDocumentation = () => {
  const [activeTab, setActiveTab] = useState('backend');

  const backendRoutes = [
    {
      basePath: '/api/auth',
      endpoints: [
        { method: 'POST', path: '/register', description: 'Register a new user' },
        { method: 'POST', path: '/login', description: 'User login' },
        { method: 'POST', path: '/logout', description: 'User logout' },
        { method: 'POST', path: '/forgot-password', description: 'Request password reset' },
        { method: 'POST', path: '/reset-password/:token', description: 'Reset password with token' },
        { method: 'GET', path: '/google', description: 'Google OAuth login' },
        { method: 'GET', path: '/google/callback', description: 'Google OAuth callback' }
      ]
    },
    {
      basePath: '/api/users',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all users (admin)' },
        { method: 'GET', path: '/:id', description: 'Get user by ID' },
        { method: 'PUT', path: '/:id', description: 'Update user' },
        { method: 'DELETE', path: '/:id', description: 'Delete user' },
        { method: 'GET', path: '/profile', description: 'Get current user profile' },
        { method: 'PUT', path: '/profile', description: 'Update current user profile' }
      ]
    },
    {
      basePath: '/api/products',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all products' },
        { method: 'POST', path: '/', description: 'Create a product (admin)' },
        { method: 'GET', path: '/:id', description: 'Get product by ID' },
        { method: 'PUT', path: '/:id', description: 'Update product (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete product (admin)' }
      ]
    },
    {
      basePath: '/api/orders',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all orders (admin)' },
        { method: 'POST', path: '/', description: 'Create a new order' },
        { method: 'GET', path: '/my-orders', description: 'Get current user orders' },
        { method: 'GET', path: '/:id', description: 'Get order by ID' },
        { method: 'PUT', path: '/:id', description: 'Update order (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete order (admin)' }
      ]
    },
    {
      basePath: '/api/blogs',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all blog posts' },
        { method: 'POST', path: '/', description: 'Create a blog post (admin)' },
        { method: 'GET', path: '/:id', description: 'Get blog post by ID' },
        { method: 'PUT', path: '/:id', description: 'Update blog post (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete blog post (admin)' }
      ]
    },
    {
      basePath: '/api/faqs',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all FAQs' },
        { method: 'POST', path: '/', description: 'Create a FAQ (admin)' },
        { method: 'GET', path: '/:id', description: 'Get FAQ by ID' },
        { method: 'PUT', path: '/:id', description: 'Update FAQ (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete FAQ (admin)' }
      ]
    },
    {
      basePath: '/api/reviews',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all reviews' },
        { method: 'POST', path: '/', description: 'Create a review' },
        { method: 'GET', path: '/product/:productId', description: 'Get reviews for a product' },
        { method: 'GET', path: '/:id', description: 'Get review by ID' },
        { method: 'PUT', path: '/:id', description: 'Update review' },
        { method: 'DELETE', path: '/:id', description: 'Delete review' }
      ]
    },
    {
      basePath: '/api/coupons',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all coupons' },
        { method: 'POST', path: '/', description: 'Create a coupon (admin)' },
        { method: 'GET', path: '/:id', description: 'Get coupon by ID' },
        { method: 'PUT', path: '/:id', description: 'Update coupon (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete coupon (admin)' },
        { method: 'POST', path: '/validate', description: 'Validate a coupon code' }
      ]
    },
    {
      basePath: '/api/categories',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all categories' },
        { method: 'POST', path: '/', description: 'Create a category (admin)' },
        { method: 'GET', path: '/:id', description: 'Get category by ID' },
        { method: 'PUT', path: '/:id', description: 'Update category (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete category (admin)' }
      ]
    },
    {
      basePath: '/api/tags',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all tags' },
        { method: 'POST', path: '/', description: 'Create a tag (admin)' },
        { method: 'GET', path: '/:id', description: 'Get tag by ID' },
        { method: 'PUT', path: '/:id', description: 'Update tag (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete tag (admin)' }
      ]
    },
    {
      basePath: '/api/cart',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get user cart' },
        { method: 'POST', path: '/', description: 'Add item to cart' },
        { method: 'PUT', path: '/:itemId', description: 'Update cart item' },
        { method: 'DELETE', path: '/:itemId', description: 'Remove item from cart' },
        { method: 'DELETE', path: '/', description: 'Clear cart' }
      ]
    },
    {
      basePath: '/api/contact',
      endpoints: [
        { method: 'POST', path: '/', description: 'Submit contact form' },
        { method: 'GET', path: '/', description: 'Get all contact messages (admin)' },
        { method: 'GET', path: '/:id', description: 'Get contact message by ID (admin)' },
        { method: 'DELETE', path: '/:id', description: 'Delete contact message (admin)' }
      ]
    },
    {
      basePath: '/api/email-list',
      endpoints: [
        { method: 'POST', path: '/subscribe', description: 'Subscribe to newsletter' },
        { method: 'POST', path: '/unsubscribe', description: 'Unsubscribe from newsletter' },
        { method: 'GET', path: '/', description: 'Get all subscribers (admin)' }
      ]
    },
    {
      basePath: '/api/chatbot',
      endpoints: [
        { method: 'POST', path: '/message', description: 'Send message to chatbot' },
        { method: 'GET', path: '/conversations', description: 'Get user conversations' }
      ]
    },
    {
      basePath: '/api/settings',
      endpoints: [
        { method: 'GET', path: '/', description: 'Get all settings' },
        { method: 'PUT', path: '/', description: 'Update settings (admin)' }
      ]
    },
    {
      basePath: '/api/reports',
      endpoints: [
        { method: 'GET', path: '/sales', description: 'Get sales reports (admin)' },
        { method: 'GET', path: '/users', description: 'Get user reports (admin)' },
        { method: 'GET', path: '/products', description: 'Get product reports (admin)' }
      ]
    },
    {
      basePath: '/api/webhooks',
      endpoints: [
        { method: 'POST', path: '/payment', description: 'Payment webhook endpoint' }
      ]
    },
    {
      basePath: '/api/payments',
      endpoints: [
        { method: 'POST', path: '/process', description: 'Process payment' },
        { method: 'GET', path: '/status/:id', description: 'Check payment status' }
      ]
    },
    {
      basePath: '/api/payments/billdesk',
      endpoints: [
        { method: 'POST', path: '/initialize/:orderId', description: 'Initialize BillDesk payment' },
        { method: 'GET', path: '/status/:orderId', description: 'Check BillDesk payment status' },
        { method: 'POST', path: '/return', description: 'BillDesk payment return callback' },
        { method: 'POST', path: '/webhook', description: 'BillDesk webhook' }
      ]
    },
    {
      basePath: '/api/test',
      endpoints: [
        { method: 'POST', path: '/orders', description: 'Create test order' }
      ]
    },
    {
      basePath: '/',
      endpoints: [
        { method: 'GET', path: '/', description: 'Server running page' },
        { method: 'GET', path: '/api/health', description: 'API health check' },
        { method: 'POST', path: '/api/upload', description: 'Upload image to Cloudinary' }
      ]
    }
  ];

  const frontendRoutes = [
    { path: '/', description: 'Home page' },
    { path: '/products', description: 'Product listing page' },
    { path: '/products/:slug', description: 'Product detail page' },
    { path: '/cart', description: 'Shopping cart page' },
    { path: '/about-us', description: 'About us page' },
    { path: '/faq', description: 'FAQ page' },
    { path: '/delete-account', description: 'Delete account page' },
    { path: '/delete-account-success', description: 'Delete account success page' },
    { path: '/confirm-delete/:token', description: 'Confirm account deletion page' },
    { path: '/reset-password/:resetToken', description: 'Reset password page' },
    { path: '/contact', description: 'Contact page' },
    { path: '/billdesk-test', description: 'BillDesk test page' },
    { path: '/payment/billdesk/:orderId', description: 'BillDesk payment page' },
    { path: '/blog', description: 'Blog listing page' },
    { path: '/blog/:slug', description: 'Blog post page' },
    { path: '/thank-you', description: 'Order thank you page' },
    { path: '/payment/cancelled', description: 'Payment cancelled page' },
    { path: '/payment/failed', description: 'Payment failed page' },
    { path: '/edit-address', description: 'Edit address page' },
    { path: '/forgot-password', description: 'Forgot password page' },
    { path: '/login', description: 'Login page', auth: 'public only' },
    { path: '/register', description: 'Registration page', auth: 'public only' },
    { path: '/user-review', description: 'User review page', auth: 'protected' },
    { path: '/checkout', description: 'Checkout page', auth: 'protected' },
    { path: '/user-dashboard', description: 'User dashboard', auth: 'protected' },
    { path: '/my-orders', description: 'User orders page', auth: 'protected' },
    { path: '/route-documentation', description: 'This documentation page' }
  ];

  const adminRoutes = [
    { path: '/login', description: 'Admin login page', auth: 'public only' },
    { path: '/signup', description: 'Admin signup via invitation', auth: 'public only' },
    { path: '/dashboard', description: 'Admin dashboard', auth: 'protected' },
    { path: '/', description: 'Redirect to dashboard', auth: 'protected' },
    { path: '/users', description: 'User management', auth: 'protected' },
    { path: '/users/create', description: 'Create user', auth: 'protected' },
    { path: '/users/:id', description: 'User details', auth: 'protected' },
    { path: '/users/edit/:id', description: 'Edit user', auth: 'protected' },
    { path: '/invite-user', description: 'Invite new user', auth: 'protected' },
    { path: '/settings', description: 'System settings', auth: 'protected' },
    { path: '/admin/categories', description: 'Category management', auth: 'protected' },
    { path: '/admin/categories/:id', description: 'Category details', auth: 'protected' },
    { path: '/coupons', description: 'Coupon management', auth: 'protected' },
    { path: '/faqs', description: 'FAQ management', auth: 'protected' },
    { path: '/newsletter-subscribers', description: 'Newsletter subscribers', auth: 'protected' },
    { path: '/contact-messages', description: 'Contact messages', auth: 'protected' },
    { path: '/admin/tags', description: 'Tag management', auth: 'protected' },
    { path: '/admin/orders', description: 'Order management', auth: 'protected' },
    { path: '/admin/orders/:id', description: 'Order details', auth: 'protected' },
    { path: '/admin/reviews', description: 'Review management', auth: 'protected', roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { path: '/admin/blogs', description: 'Blog management', auth: 'protected' },
    { path: '/admin/blogs/create', description: 'Create blog post', auth: 'protected' },
    { path: '/admin/blogs/edit/:id', description: 'Edit blog post', auth: 'protected' },
    { path: '/admin/blogs/:id', description: 'Blog post details', auth: 'protected' },
    { path: '/admin/products', description: 'Product management', auth: 'protected', roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { path: '/admin/products/create', description: 'Create product', auth: 'protected', roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { path: '/admin/products/edit/:id', description: 'Edit product', auth: 'protected', roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] },
    { path: '/admin/products/:id', description: 'Product details', auth: 'protected', roles: ['SUPER_ADMIN', 'PRODUCT_MANAGER'] }
  ];

  return (
    <div className="route-documentation">
      <Helmet>
        <title>10X Drink - Route Documentation</title>
        <meta name="description" content="Documentation for all routes in the 10X Drink application" />
      </Helmet>

      <div className="container py-5">
        <h1 className="mb-4">Route Documentation</h1>
        
        <div className="tabs mb-4">
          <button 
            className={`tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
            onClick={() => setActiveTab('backend')}
          >
            Backend Routes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'frontend' ? 'active' : ''}`}
            onClick={() => setActiveTab('frontend')}
          >
            Frontend Routes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Routes
          </button>
        </div>

        {activeTab === 'backend' && (
          <div className="backend-routes">
            <h2>Backend API Routes</h2>
            <p>Base URL: <code>{window.location.origin.includes('localhost') ? 'http://localhost:5000' : window.location.origin}</code></p>
            
            {backendRoutes.map((routeGroup, index) => (
              <div key={index} className="route-group mb-4">
                <h3 className="base-path">{routeGroup.basePath}</h3>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Full Path</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeGroup.endpoints.map((endpoint, i) => (
                        <tr key={i}>
                          <td className={`method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</td>
                          <td><code>{endpoint.path}</code></td>
                          <td><code>{routeGroup.basePath === '/' ? endpoint.path : `${routeGroup.basePath}${endpoint.path}`}</code></td>
                          <td>{endpoint.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'frontend' && (
          <div className="frontend-routes">
            <h2>Frontend Routes</h2>
            <p>Base URL: <code>{window.location.origin}</code></p>
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Description</th>
                    <th>Authentication</th>
                  </tr>
                </thead>
                <tbody>
                  {frontendRoutes.map((route, index) => (
                    <tr key={index}>
                      <td><code>{route.path}</code></td>
                      <td>{route.description}</td>
                      <td>{route.auth ? (
                        route.auth === 'protected' ? 
                          <span className="badge bg-primary">Protected</span> : 
                          <span className="badge bg-secondary">Public Only</span>
                      ) : <span className="badge bg-success">Public</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="admin-routes">
            <h2>Admin Panel Routes</h2>
            <p>Base URL: <code>{window.location.origin.includes('localhost') ? 'http://localhost:3001' : 'https://admin.10xdrink.com'}</code></p>
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Description</th>
                    <th>Authentication</th>
                    <th>Roles</th>
                  </tr>
                </thead>
                <tbody>
                  {adminRoutes.map((route, index) => (
                    <tr key={index}>
                      <td><code>{route.path}</code></td>
                      <td>{route.description}</td>
                      <td>{route.auth === 'protected' ? 
                          <span className="badge bg-primary">Protected</span> : 
                          <span className="badge bg-secondary">Public Only</span>}</td>
                      <td>{route.roles ? route.roles.join(', ') : 'All Admin'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteDocumentation;
