import { useMemo } from 'react';
import { Enrollment, ProductType } from 'types/Joanie';
import { Enrolled } from '../DashboardItemCourseEnrolling';
import { DashboardItem } from '..';
import ProductCertificateFooter from './ProductCertificateFooter';

interface DashboardItemCourseRunProps {
  enrollment: Enrollment;
}

export const DashboardItemEnrollment = ({ enrollment }: DashboardItemCourseRunProps) => {
  const { course } = enrollment.course_run;
  if (!course) {
    throw new Error("Enrollment's course_run must provide course attribute");
  }

  const footerList = useMemo(() => {
    const partialFooterList = [
      <div data-testid={'dashboard-item__course-enrolling__' + course.code}>
        <div className="dashboard-item__course-enrolling__infos">
          <Enrolled icon={true} enrollment={enrollment} />
        </div>
      </div>,
    ];
    enrollment.products.forEach((product) => {
      if (product.type === ProductType.CERTIFICATE) {
        partialFooterList.push(
          <ProductCertificateFooter
            key={[enrollment.id, product.id].join('_')}
            product={product}
            enrollment={enrollment}
          />,
        );
      }
    });
    return partialFooterList;
  }, [enrollment, course]);

  return <DashboardItem title={course.title} code={'Ref. ' + course.code} footer={footerList} />;
};
