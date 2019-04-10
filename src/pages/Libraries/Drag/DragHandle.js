import React,{Component} from 'react';
import {render} from 'react-dom';
import { Card } from 'antd';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandles = sortableHandle(() => <span>::++::</span>);

const SortableItem = sortableElement(({value}) => (
  <li>
    <DragHandles />
    {value}
  </li>
));

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});
export default class DragHandle extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    const {items} = this.state;
    return (<Card title={'Drag-handle'}  bordered={false}>
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </SortableContainer>
    </Card>);
  }
}