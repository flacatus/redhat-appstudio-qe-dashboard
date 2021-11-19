import React, { useContext, useEffect, useState } from 'react';
import { TableComposable, Thead, Tbody, Tr, Th, Td, Caption } from '@patternfly/react-table';
import { Context } from '@app/store/store';
import { getRepositories } from '@app/utils/APIService';
import { PageSection } from '@patternfly/react-core';

export const DashboardContent = () => {
  const columns = ['Git Organization', 'Repository', 'Coverage', 'Artifacts'];

  const [repositories, setRepositories] = useState([])
  const { state, dispatch } = useContext(Context) // required to access the global state 

  useEffect(()=> {

    getRepositories().then((res) => { // making the api call here
      if(res.code === 200){
          const result = res.data;
          console.log(result)
          dispatch({ type: "SET_REPOSITORIES", data: result });
      } else {
          dispatch({ type: "SET_ERROR", data: res });
      }
    });
  }, [repositories, setRepositories, dispatch])

  const rows = state.repositories.map((repo)=>{
    return [repo.git_organization, repo.repository_name, repo.coverage.code_coverage.toFixed(2)+"%", repo.artifacts.length]
  })

  return (
    <React.Fragment>
      <PageSection style={{
        minHeight : "12%"
      }}>
        <TableComposable aria-label="Simple Table">
          <Caption>Red Hat AppStudio Quality Repositories Summary</Caption>
          <Thead>
            <Tr>
              <Th>{columns[0]}</Th>
              <Th>{columns[1]}</Th>
              <Th>{columns[2]}</Th>
              <Th>{columns[3]}</Th>
              <Th>{columns[4]}</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <Td key={`${rowIndex}_${cellIndex}`} dataLabel={columns[cellIndex]}>
                    {cell}
                  </Td>
                ))}
                <Td
                  key={`${rowIndex}`}
                  actions={{
                    items: rowIndex === 0,
                    disable: rowIndex === 3,
                  }}
                />
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </PageSection>
    </React.Fragment>
  );
};
