import React,{Component} from 'react';
import {render} from 'react-dom';
import { Card } from 'antd';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);
const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});
export default class Basic extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    }
  }
  componentDidMount() {

  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    const title = <a href="https://github.com/clauderic/react-sortable-hoc" target={'_blank'}>拖拽（react-sortable-hoc）</a>
    return (<Card title={title}  bordered={false}>
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
    </Card>);
  }
}

