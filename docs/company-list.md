## Company List component

Component that host a panel with list of companies.
- Has functionality of table for filtering, sorting and pagination.
- this component selecting list of companies from store

### Usage

You can use component in your template as follows

```
<app-company-list><app-company-list>
```

No params neccessary.

### Functionality

This component supports the filtering, sorting and pagination of the table that is included in this component.
Methods below are running from template.

```
sort(field: string)

setPage(page: number)

search(evt)
```

Component listen on data (list of companies) from store by selector
```
CompaniesState.getCompanyList
```
and listen on table settings changed through store
```
CompaniesState.getSorting
CompaniesState.getPaging
CompaniesState.isLoading
```

### Structure

This is a panel with table inside. Please read [List](list.md) for details.


