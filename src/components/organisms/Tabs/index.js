import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tab from '../Tab';

import { Container, TabList, TabsContent } from "./styles"

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: props.defaultActiveIndex || 0 };
  }

  handleTabClick = (tabIndex) => {
    if (tabIndex !== this.state.activeIndex) {
      this.setState({ activeIndex: tabIndex });
    }
  }

  cloneTabElement = (tab, index = 0) => {
    const { activeIndex } = this.state;

    return (
      React.cloneElement(tab, {
        onClick: () => this.handleTabClick(index),
        tabIndex: index,
        isActive: index === activeIndex,
      })
    );
  }
  renderChildrenTabs = () => {
    const { children } = this.props;

    if (!Array.isArray(children)) {
      return this.cloneTabElement(children);
    }

    return children.map(this.cloneTabElement);
  }
  renderActiveTabContent(): any {
    const { children } = this.props;
    const { activeIndex } = this.state;

    if (children[activeIndex]) {
      return children[activeIndex].props.children;
    }

    return children.props.children;
  }
  render() {
    const { className } = this.props;
    const cssClass = cx('tabs', className);
    return (
      <Container className={cssClass}>
        <TabList className={'tabs__list'}>
          {this.renderChildrenTabs()}
        </TabList>
        <TabsContent className={'tabs__content'}>
          {this.renderActiveTabContent()}
        </TabsContent>
      </Container>
    );
  }
};

Tabs.propTypes = {
  className: PropTypes.string,
  defaultActiveIndex: PropTypes.number
};

Tabs.Tab = Tab;

export default Tabs;