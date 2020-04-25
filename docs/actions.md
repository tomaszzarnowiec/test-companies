## NGXS Actions

Namespace:

```
CompaniesActions
```

### Actions

```
GetCompanyList
```
Fetch all the data from endpoints.

```
Apply
```
Run apply listener, sets filtered data to state.

```
Sort({
    sortBy: string,
    sortOrder: boolean    
})
```
Run sort.

```
Search({
    searchText: string
})
```
Run search by input field. Debounced by 1000 ms.

```
Paginate({
    page: number
})
```
Sets current page of table. 
