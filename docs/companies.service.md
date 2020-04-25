## Companies service

### Get companies data 

```
getList()

=> [
    {
        id: number,
        name: string,
        city: string
    }
    ...
]
```

### Get company incomes 
response mapped to array for return incomes only

```
getIncome(companyId: number)

=> [
    {
        value: string,
        date: string,
    }
    ...
]
```
