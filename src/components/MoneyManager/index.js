import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeAmount = event => {
    this.setState({amount: event.target.value})
  }

  changeType = event => {
    this.setState({optionId: event.target.value})
  }

  deleteClicked = id => {
    const {transactionList} = this.state
    const updatedTransactions = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({transactionList: updatedTransactions})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => optionId === eachTransaction.optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === 'Expenses') {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === 'Income') {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    return incomeAmount - expensesAmount
  }

  render() {
    const {title, amount, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const expensesAmount = this.getExpenses()
    const incomeAmount = this.getIncome()
    return (
      <div className="app-container">
        <div className="header">
          <h1 className="name">Hi, Richard</h1>
          <p className="para">Welcome back to your Money Manager</p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="inputs-cont">
          <form className="form" onSubmit={this.onAddTransaction}>
            <h2 className="adds">Add Transaction</h2>
            <label className="title-label" htmlFor="title">
              Title
            </label>
            <input
              className="inp"
              type="text"
              id="title"
              value={title}
              placeholder="Title"
              onChange={this.changeTitle}
            />
            <label className="amount-label" htmlFor="amount">
              Amount
            </label>
            <input
              className="inp"
              type="text"
              id="amount"
              value={amount}
              placeholder="Amount"
              onChange={this.changeAmount}
            />
            <label className="type-label" htmlFor="type">
              Type
            </label>
            <select
              className="inp"
              value={optionId}
              id="type"
              onChange={this.changeType}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <div className="hist-table">
            <h1 className="history">History</h1>
            <div className="list">
              <ul className="unorder">
                <li className="list-header">
                  <p className="list-title">Title</p>
                  <p className="list-title">Amount</p>
                  <p className="list-title">Type</p>
                  <p className="list-title">Action</p>
                </li>
                {transactionList.map(eachTrans => (
                  <TransactionItem
                    key={eachTrans.id}
                    transactionDetails={eachTrans}
                    deleteClicked={this.deleteClicked}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
