import 'react-native';
import React from 'react';
import {render} from '../../utils/Tests';

import {
  ITransactionTypeEnum,
  ITransactionCategoryEnum,
} from '../../models/Transaction';
import TransactionList, {AHints} from '../TransactionList';

describe('<TransactionList />', () => {
  const title = 'Title';
  const incomeTransaction = {
    id: new Date().toString(),
    title: 'Title 1',
    type: ITransactionTypeEnum.INCOME,
    amount: 100,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const outcomeFoodTransaction = {
    id: new Date().toString(),
    title: 'Title 2',
    type: ITransactionTypeEnum.OUTCOME,
    category: ITransactionCategoryEnum.FOOD,
    amount: 50,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const outcomeGeneralTransaction = {
    id: new Date().toString(),
    title: 'Title 3',
    type: ITransactionTypeEnum.OUTCOME,
    category: ITransactionCategoryEnum.GENERAL,
    amount: 25,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const data = [
    incomeTransaction,
    outcomeFoodTransaction,
    outcomeGeneralTransaction,
  ];
  it('should render properly - with data', () => {
    const {getByA11yHint} = render(
      <TransactionList title={title} data={data} />,
    );
    const titleComponent = getByA11yHint(AHints.title);
    expect(titleComponent.children[0]).toBe(title);
    try {
      getByA11yHint(AHints.emptyListText);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  it('should render properly - without data', () => {
    const {getByA11yHint} = render(<TransactionList title={title} data={[]} />);
    const emptyListText = getByA11yHint(AHints.emptyListText);
    expect(emptyListText).toBeDefined();
    try {
      getByA11yHint(AHints.title);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
