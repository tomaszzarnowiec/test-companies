## NGXS State

### Default values of CompaniesState state

```
defaults: {
    allCompanies: [],
    companies: [],
    pagination: {
        page: 1,
        perPage: 50,
        pages: []
    },
    sort: {
        sortBy: null,
        sortOrder: null
    },
    searching: {
        searchText: ""
    },
    isLoading: true
}
```

### Selectors

```
isLoading
```
Checked if all data is loaded. By this `<app-company-list>` shows loader label before table data loads.

```
getCompanyList
```
Gets all data filtered, sorted and paginated.

```
getSorting
```
Gets sorting settings for table header.

```
getPaging
```
Gets pagination settings for pagination in table footer.


### Listeners
```
getList
```
Fetch data from endpoints and sets it to store as source for future usage.

```
apply
```
Listener that filter, sort and paginate data after these actions are running. Sets narrowed companies array to state. 

```
sort
```
Sets sorting settings on state.

```
search
```
Sets searching settings on state.

```
pagination
```
Sets pagination settings on state.