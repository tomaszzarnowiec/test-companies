## Company List Item component

This is a row of companies table. It's only display company details.

### Usage

Simple use as row element. You can iterate on this by ngFor loop passing 'company' item from companies array that fetched in `<app-company-list>` component.

```
<app-company-list-item [company]="companyItem"></app-company-list-item>
```

### Input

```
company: Company
```