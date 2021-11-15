import React from 'react';
import { TableComposable, Thead, Tbody, Tr, Th, Td, ExpandableRowContent } from '@patternfly/react-table';
import CodeBranchIcon from '@patternfly/react-icons/dist/esm/icons/code-branch-icon';
import CodeIcon from '@patternfly/react-icons/dist/esm/icons/code-icon';
import CubeIcon from '@patternfly/react-icons/dist/esm/icons/cube-icon';
import { PageSection } from '@patternfly/react-core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function DashboardContent() {
  const columns = ['Red Hat AppStudio Repositories', 'Coverage', 'Language', 'Build Status', 'Git URL'];
  const rows = [
    ['service-provider-integration-api', '0%', 'Java', 'Passed', 'Open in Github'],
    ['managed-gitops', '0%', 'Go', 'Passed', 'Open in Github'],
    ['application-service', '0%', 'Go', 'Passed', 'Open in Github'],
    ['service-provider-integration-operator', '0%', 'Go', 'Passed', 'Open in Github'],
    ['build-service-operator', '0%', 'Unknown', 'Unknown', 'Open in Github'],
    ['build-service', '0%', 'Unknown', 'Unknown', 'Open in Github'],
    ['service-provider-integration', '0%', 'Unknown', 'Unknown', 'Open in Github'],
  ];
  // index corresponds to row index, and value corresponds to column index of the expanded, null means no cell is expanded
  const customRender = (cell, index) => {
    if (index === 0) {
      return <a href="https://github.com/redhat-appstudio/application-service">{cell}</a>;
    } else if (index === 1) {
      return (
        <React.Fragment>
          <CodeBranchIcon key="icon" /> {cell}
        </React.Fragment>
      );
    } else if (index === 2) {
      return (
        <React.Fragment>
          <CodeIcon key="icon" /> {cell}
        </React.Fragment>
      );
    } else if (index === 3) {
      return (
        <React.Fragment>
          <CubeIcon key="icon" /> {cell}
        </React.Fragment>
      );
    } else if (index === 4) {
      return <a href="https://github.com/redhat-appstudio/application-service">{cell}</a>;
    }
    return cell;
  };

  return (
    <PageSection >
      <TableComposable style={{backgroundColor: "#FAFAFA"}} color="#F5F5F5" content="wrap" aria-label="Compound expandable table">
        <Thead>
          <Tr>
            {columns.map((column, columnIndex) => (
              <Th key={columnIndex}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        {rows.map((row, rowIndex) => {
          return (
            <Tbody key={rowIndex}>
              <React.Fragment>
                <Tr>
                  {row.map((cell, cellIndex) => {
                    return (
                      <Td
                        key={`${rowIndex}_${cellIndex}`}
                        dataLabel={columns[cellIndex]}
                        component={cellIndex === 0 ? 'th' : 'td'}
                      >
                        {customRender(cell, cellIndex)}
                      </Td>
                    );
                  })}
                </Tr>
              </React.Fragment>
            </Tbody>
          );
        })}
      </TableComposable>
    </PageSection>
  );
}
