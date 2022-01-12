import React, { useContext, useEffect, useState } from 'react';
import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import {  PageSectionVariants, TextContent, Text, ButtonVariant, PageSection} from '@patternfly/react-core';
import { Context } from '@app/store/store';
import { getRepositories } from '@app/utils/APIService';
import { FormModal } from './Modal';

export const Repositories = () => {
  const defaultActions = [
    {
      title: 'Update repository',
      variant: ButtonVariant.secondary,
      onClick: (event, rowId, rowData, extra) => console.log('clicked on extra action, on row: ', rowId),
    }
  ];

  const columns = ['Organization', 'Repositories'];
  const [repositories, setRepositories] = useState([])
  const { state, dispatch } = useContext(Context) // required to access the global state 

  useEffect(()=> {
    getRepositories().then((res) => {
      if(res.code === 200){
        console.log(res.data)
          const result = res.data;
          dispatch({ type: "SET_REPOSITORIES", data: result });
      } else {
          dispatch({ type: "SET_ERROR", data: res });
      }
    });
  }, [repositories, setRepositories, dispatch])

  const rows = state.repositories.map((repo)=> {
    return [{name: repo.git_organization}, {name: repo.repository_name, url: repo.git_url}]
  })

  return (
    <React.Fragment>
      <PageSection style={{
          minHeight : "12%",
          backgroundSize: "cover",
          backgroundColor : "black",
          marginBottom: "1%"
        }} variant={PageSectionVariants.dark}>
        <TextContent style={{color: "white"}}>
          <Text component="h2">Red Hat App Studio Quality Dashboard</Text>
          <Text component="p">Repositories list</Text>
        </TextContent>
        <FormModal/>
      </PageSection>
      <TableComposable aria-label="Actions table">
        <Thead>
          <Tr>
            <Th>{columns[0]}</Th>
            <Th>{columns[1]}</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Td key={`${rowIndex}_${cellIndex}`} dataLabel={columns[cellIndex]}>
                  {cellIndex === 1 ? <a href={cell.url}>{cell.name}</a> : cell.name }
                </Td>
              ))}
              <Td
                key={`${rowIndex}_${row}`}
                actions={{
                  items: defaultActions
                }}
              />
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};
