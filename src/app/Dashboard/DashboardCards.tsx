import * as React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Divider,
  Flex,
  FlexItem,
  Gallery,
  Grid,
  GridItem,
  Stack
} from '@patternfly/react-core';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/js/icons/info-circle-icon';
import GoFore from '@patternfly/react-icons/dist/js/icons/gofore-icon';
import JavaIcon from '@patternfly/react-icons/dist/js/icons/java-icon';

const cardData = {
  iconOnly: [
    {
        title: 'Language',
        content: [
          {
            icon: <GoFore color="var(--pf-global--danger-color--100)" />,
            status: 'Golang',
          },
        ],
        layout: 'withSubtitle'
    },
    {
      title: 'Code Coverage percentage',
      content: [
        {
          icon: <ExclamationTriangleIcon color="var(--pf-global--danger-color--100)" />,
          status: '0%',
        },
      ],
      layout: 'withSubtitle'
  },
    {
      title: 'Container CVEs',
      content: [
        {
          icon: <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />,
          status: 0,
        }
      ],
      layout: 'withSubtitle'
    },
  ],
};

const cardData1 = {
  iconOnly: [
    {
        title: 'Language',
        content: [
          {
            icon: <JavaIcon color="var(--pf-global--danger-color--100)" />,
            status: 'Java',
          },
        ],
        layout: 'withSubtitle'
    },
    {
      title: 'Code Coverage Percentage',
      content: [
        {
          icon: <ExclamationTriangleIcon color="var(--pf-global--danger-color--100)" />,
          status: '0%',
        },
      ],
      layout: 'withSubtitle'
    },
    {
      title: 'Container CVEs',
      content: [
        {
          icon: <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />,
          status: 3,
        }
      ],
      layout: 'withSubtitle'
    },
    {
      title: 'Coverage Provider',
      content: [
        {
          icon: <ExclamationTriangleIcon />,
          status: 'CodeCov',
        },
      ],
      layout: 'withSubtitle'
    },
  ],
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DashboardCards: React.FunctionComponent = () => {
  const renderContent = (content, layout) => {
    if (layout === 'icon') {
      return content[0].icon;
    }
    if (layout === 'multiIcon') {
      return (
        <Flex display={{ default: 'inlineFlex' }}>
          {content.map(({ icon, count }, index: number) => (
            <React.Fragment key={index}>
              <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                <FlexItem>{icon}</FlexItem>
                <FlexItem>
                  <a >{count}</a>
                </FlexItem>
              </Flex>
              {content.length > 1 && index === 0 && <Divider key={`${index}_d`} isVertical />}
            </React.Fragment>
          ))}
        </Flex> 
      );
    }
    if (layout === 'withSubtitle') {
      return (
        <Flex justifyContent={{ default: 'justifyContentSpaceAround' }}>
          {content.map(({ icon, status, subtitle }, index) => (
            <Flex key={index}>
              <FlexItem>{icon}</FlexItem>
              <Stack style = {{alignContent : "left"}}>
                <a>{status}</a>
                <span>{subtitle}</span>
              </Stack>
            </Flex>
          ))}
        </Flex>
      );
    }
  };
  return (
    <Grid hasGutter>
      {Object.keys(cardData).map((cardGroup, groupIndex) => {
        let galleryWidth;
        let cardAlign;
        let titleAlign;
        if (cardGroup === 'withSubtitle') {
          galleryWidth = '260px';
          cardAlign = '';
          titleAlign = 'center';
        } else {
          cardAlign = 'center';
        }
        return (
          <GridItem key={groupIndex}>
            <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': galleryWidth } as any}>
              {cardData[cardGroup].map(({ title, content, layout }, cardIndex) => (
                <Card style={{ textAlign: cardAlign }} key={`${groupIndex}${cardIndex}`} component="div">
                  <CardTitle style={{ textAlign: titleAlign }}>{title}</CardTitle>
                  <CardBody >{renderContent(content, layout)}</CardBody>
                </Card>
              ))}
            </Gallery>
          </GridItem>
        );
      })}
    </Grid>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DashboardCards2: React.FunctionComponent = () => {
  const renderContent = (content, layout) => {
    if (layout === 'icon') {
      return content[0].icon;
    }
    if (layout === 'multiIcon') {
      return (
        <Flex display={{ default: 'inlineFlex' }}>
          {content.map(({ icon, count }, index: number) => (
            <React.Fragment key={index}>
              <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                <FlexItem>{icon}</FlexItem>
                <FlexItem>
                  <span>{count}</span>
                </FlexItem>
              </Flex>
              {content.length > 1 && index === 0 && <Divider key={`${index}_d`} isVertical />}
            </React.Fragment>
          ))}
        </Flex> 
      );
    }
    if (layout === 'withSubtitle') {
      return (
        <Flex justifyContent={{ default: 'justifyContentSpaceAround' }}>
          {content.map(({ icon, status, subtitle }, index) => (
            <Flex key={index}>
              <FlexItem>{icon}</FlexItem>
              <Stack style = {{alignContent : "left"}}>
                <span>{status}</span>
                <span>{subtitle}</span>
              </Stack>
            </Flex>
          ))}
        </Flex>
      );
    }
  };
  return (
    <Grid hasGutter>
      {Object.keys(cardData).map((cardGroup, groupIndex) => {
        let galleryWidth;
        let cardAlign;
        let titleAlign;
        if (cardGroup === 'withSubtitle') {
          galleryWidth = '260px';
          cardAlign = '';
          titleAlign = 'center';
        } else {
          cardAlign = 'center';
        }
        return (
          <GridItem key={groupIndex}>
            <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': galleryWidth } as any}>
              {cardData1[cardGroup].map(({ title, content, layout }, cardIndex) => (
                <Card style={{ textAlign: cardAlign }} key={`${groupIndex}${cardIndex}`} component="div">
                  <CardTitle style={{ textAlign: titleAlign }}>{title}</CardTitle>
                  <CardBody >{renderContent(content, layout)}</CardBody>
                </Card>
              ))}
            </Gallery>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export {DashboardCards, DashboardCards2}
