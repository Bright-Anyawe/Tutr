import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../styles/BreadcrumbNav.css';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive: boolean;
}

interface BreadcrumbNavProps {
  customPath?: BreadcrumbItem[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ customPath }) => {
  const location = useLocation();
  
  // If custom path is provided, use it directly
  if (customPath && customPath.length > 0) {
    return (
      <nav className="breadcrumb-container">
        <ul className="breadcrumb-list">
          {customPath.map((item, index) => (
            <React.Fragment key={index}>
              <li className={`breadcrumb-item ${item.isActive ? 'active' : ''}`}>
                {item.isActive ? (
                  <span>{item.label}</span>
                ) : (
                  <Link to={item.path}>
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
              {index < customPath.length - 1 && (
                <li className="breadcrumb-separator">
                  <span>{'>'}</span>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    );
  }

  // Otherwise, generate breadcrumbs from the current path
  const generateBreadcrumbs = () => {
    // Remove empty strings from path segments
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Always start with dashboard
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/dashboard', isActive: pathSegments.length === 0 }
    ];

    // Build up breadcrumb path
    pathSegments.forEach((segment: string, index: number) => {
      // Format the breadcrumb label to be more user-friendly
      const formattedLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      // Construct the path up to the current segment
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      
      // Add this segment to our breadcrumbs
      breadcrumbs.push({
        label: formattedLabel,
        path,
        isActive: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="breadcrumb-container">
      <ul className="breadcrumb-list">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <li className={`breadcrumb-item ${item.isActive ? 'active' : ''}`}>
              {item.isActive ? (
                <span>{item.label}</span>
              ) : (
                <Link to={item.path}>
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
            {index < breadcrumbs.length - 1 && (
              <li className="breadcrumb-separator">
                <span>{'>'}</span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default BreadcrumbNav; 